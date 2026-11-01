import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {fileURLToPath} from 'node:url';
import {randomBytes,timingSafeEqual} from 'node:crypto';
import {spawn} from 'node:child_process';
import {FileAssistant} from './lib/files.mjs';
import {parseCommand} from './lib/commands.mjs';
import {WindowsBridge} from './lib/windows.mjs';
import {LocalModel} from './lib/local-model.mjs';
const APP=path.dirname(fileURLToPath(import.meta.url));
const HELP=['Organiza Descargas','Organiza Descargas por fecha','Busca factura en Documentos','Mueve informe.pdf de Descargas a Documentos','Mueve los PDF de Descargas a Documentos','Renombra informe.pdf como informe final.pdf en Documentos','Elimina borrador.pdf de Descargas','Deshaz el último cambio','Abre Documentos'];
export async function createApp({dataDir,appDir=APP,port=0,bridgeFactory=null,modelFactory=null}={}){
 const engine=await new FileAssistant({dataDir:dataDir||process.env.MINIJARVIS_DATA_DIR||path.join(process.env.LOCALAPPDATA||os.homedir(),'MiniJarvis','datos'),appDir}).init();
 const model=modelFactory?modelFactory():new LocalModel();
 const token=randomBytes(32).toString('hex');let origin='',queue=Promise.resolve(),lastResult={seq:0,kind:'help',message:'Elige tus carpetas para empezar. Di «Jarvis» antes de cada orden de voz.',examples:HELP},working=false,closed=false;
 const publish=result=>{lastResult={...result,seq:lastResult.seq+1};return lastResult;};
 const serialize=fn=>{const p=queue.then(async()=>{working=true;try{return await fn();}finally{working=false;}});queue=p.catch(()=>{});return p;};
 const command=async(text,voice=false)=>{if(typeof text!=='string'||!text.trim()||text.length>1200)throw Error('Escribe una instrucción de hasta 1200 caracteres.');let c;try{c=parseCommand(text,{voice});}catch(error){if(!model.enabled)throw error;if(voice&&!/^\s*(?:hola[,\s]+)?(?:jarvis|yarvis)[,.:\s]+/i.test(text))return null;c=await model.interpret(text,engine.roots);}if(c.kind==='ignored')return null;if(c.kind==='help')return publish({kind:'help',message:c.needsDetails?'La IA necesita una petición más concreta, con los nombres de archivos y carpetas. Solo preparo acciones de archivos; puedes usar estos ejemplos.':'Puedo buscar nombres, mover, renombrar, organizar y enviar a mi papelera. Cada cambio se revisa antes de confirmarlo.',examples:HELP});if(c.kind==='cancel'){engine.pending=null;return publish({kind:'info',message:'Plan cancelado. No cambié archivos.'});}if(c.kind==='search')return publish(await engine.search(engine.root(c.root),c.query));if(c.kind==='open'){const root=engine.root(c.root);await engine.checkRoot(root);bridge.openFolder(root.path);return publish({kind:'info',message:'Abrí '+root.alias+' en el Explorador.'});}if(c.kind==='confirm'){if(!engine.pending)throw Error('No hay un plan pendiente.');return publish(await engine.apply(engine.pending.id,c.code,{reviewed:true}));}return publish(await engine.prepare(c));};
 const bridge=(bridgeFactory||((opts)=>new WindowsBridge(opts)))({appDir,onVoice:data=>{serialize(async()=>{if(typeof data.confidence!=='number'||!Number.isFinite(data.confidence)||data.confidence<0.65){if(/jarvis|yarvis/i.test(data.text))publish({kind:'error',message:'No reconocí esa frase con suficiente seguridad. Repite la orden o escríbela.'});return;}try{await command(data.text,true);}catch(e){publish({kind:'error',message:e.message});}}).catch(()=>{});},onStatus:()=>{}});
 const validToken=header=>{const b=Buffer.from(header||'');const expected=Buffer.from('Bearer '+token);return b.length===expected.length&&timingSafeEqual(b,expected);};
 const json=(res,status,data)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8'});res.end(JSON.stringify(data));};
 const server=http.createServer(async(req,res)=>{
  res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','no-referrer');res.setHeader('Cross-Origin-Resource-Policy','same-origin');res.setHeader('Content-Security-Policy',"default-src 'none'; script-src 'self'; style-src 'self'; connect-src 'self'; img-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'");
  try{
   if(req.headers.host!==new URL(origin).host)return json(res,403,{error:'Host no permitido.'});
   const url=new URL(req.url,origin),route=url.pathname;
   if(req.headers.origin&&req.headers.origin!==origin)return json(res,403,{error:'Origen no permitido.'});
   if(route.startsWith('/api/')){
    if(!validToken(req.headers.authorization))return json(res,401,{error:'Abre la aplicación desde Iniciar Mini Jarvis.bat. Esta sesión no tiene acceso.'});
    if(req.method==='GET'&&route==='/api/state')return json(res,200,{...engine.publicState(),voice:bridge.status,result:lastResult,working,platform:process.platform,model:model.state()});
    if(req.method!=='POST')return json(res,405,{error:'Método no permitido.'});
    if(!String(req.headers['content-type']||'').startsWith('application/json'))return json(res,415,{error:'Envía JSON.'});
    let body='',size=0;for await(const chunk of req){size+=chunk.length;if(size>16000){json(res,413,{error:'La solicitud es demasiado grande.'});req.resume();return;}body+=chunk;}
    let data;try{data=JSON.parse(body||'{}');}catch{return json(res,400,{error:'JSON no válido.'});}
    let result;
    if(route==='/api/command')result=await serialize(()=>command(data.text));
    else if(route==='/api/roots/add')result=await serialize(async()=>({root:await engine.addRoot(data.alias,data.path)}));
    else if(route==='/api/roots/remove')result=await serialize(async()=>{await engine.removeRoot(data.id);return {ok:true};});
    else if(route==='/api/roots/pick')result={path:await bridge.chooseFolder()};
    else if(route==='/api/apply')result=await serialize(async()=>publish(await engine.apply(data.id,data.code,{reviewed:data.reviewed===true})));
    else if(route==='/api/cancel')result=await serialize(async()=>{engine.pending=null;return {ok:true};});
    else if(route==='/api/voice/start')result=await bridge.listen();
    else if(route==='/api/voice/stop')result=bridge.stop();
    else if(route==='/api/model/discover')result=await model.discover();
    else if(route==='/api/model/configure')result=await serialize(()=>model.configure(data.enabled===true,data.model));
    else if(route==='/api/speak'){await bridge.speak(lastResult.message);result={ok:true};}
    else return json(res,404,{error:'Acción no disponible.'});
    return json(res,200,result||{ok:true});
   }
   if(req.method!=='GET')return json(res,405,{error:'Método no permitido.'});
   const assets={'/':['index.html','text/html; charset=utf-8'],'/app.js':['app.js','text/javascript; charset=utf-8'],'/style.css':['style.css','text/css; charset=utf-8']};
   if(!Object.hasOwn(assets,route))return json(res,404,{error:'No encontrado.'});
   const [file,type]=assets[route];res.writeHead(200,{'Content-Type':type});res.end(await fs.readFile(path.join(appDir,'public',file)));
  }catch(e){if(!res.headersSent)json(res,400,{error:e.message||'No se pudo completar la tarea.'});else res.end();}
 });
 await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(port,'127.0.0.1',resolve);});origin='http://127.0.0.1:'+server.address().port;
 return {server,engine,bridge,model,origin,token,url:origin+'/#token='+token,close:async()=>{if(closed)return;closed=true;bridge.close();await queue;await new Promise(resolve=>server.close(resolve));}};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{const app=await createApp();console.log('Mini Jarvis local. No cierres esta ventana mientras lo usas.');console.log('Si no se abre el navegador, copia esta direccion SOLO en este PC:');console.log(app.url);console.log('Pulsa Ctrl+C para cerrar y apagar el microfono.');
  if(process.platform==='win32'&&!process.env.MINIJARVIS_NO_BROWSER){const p=spawn(path.join(process.env.SystemRoot||'C:\\Windows','explorer.exe'),[app.url],{stdio:'ignore',detached:true,windowsHide:true});p.on('error',()=>{});p.unref();}
  for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>{app.close().then(()=>process.exit(0));});
 }catch(e){console.error('No pude iniciar Mini Jarvis: '+e.message);process.exitCode=1;}
}

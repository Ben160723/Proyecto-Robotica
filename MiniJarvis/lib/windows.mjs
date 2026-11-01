import {spawn} from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import readline from 'node:readline';
const powershell=()=>path.join(process.env.SystemRoot||'C:\\Windows','System32','WindowsPowerShell','v1.0','powershell.exe');
export class WindowsBridge{
 constructor({appDir,onVoice=()=>{},onStatus=()=>{}}){this.appDir=appDir;this.onVoice=onVoice;this.onStatus=onStatus;this.process=null;this.speaker=null;this.starting=false;this.speaking=false;this.generation=0;this.closed=false;this.children=new Set();this.status={state:'off',message:process.platform==='win32'?'Micrófono apagado':'La voz nativa necesita Windows 10 u 11.'};}
 async launch(file,{stdin='',sta=false}={}){
  if(this.closed)throw Error('La aplicación está cerrada.');if(process.platform!=='win32')throw Error('Esta función necesita Windows. Los comandos escritos funcionan también en este equipo.');
  const script=await fs.readFile(path.join(this.appDir,'native',file),'utf8');if(this.closed)throw Error('La aplicación está cerrada.');
  // Constant application code only. File names, user commands and speech text
  // never become executable PowerShell; speech text travels as JSON on stdin.
  const child=spawn(powershell(),['-NoLogo','-NoProfile','-NonInteractive',...(sta?['-STA']:[]),'-Command',script],{windowsHide:true,stdio:['pipe','pipe','pipe']});
  this.children.add(child);child.once('exit',()=>this.children.delete(child));child.once('error',()=>this.children.delete(child));child.stdin.on('error',()=>{});child.stdin.end(stdin);return child;
 }
 update(state,message){this.status={state,message};this.onStatus(this.status);}
 async listen(){if(this.closed||this.process||this.starting||this.speaking)return this.status;this.starting=true;const generation=++this.generation;this.update('starting','Preparando el reconocimiento local de Windows…');try{
  const child=await this.launch('voice.ps1');if(this.closed||generation!==this.generation){child.kill();return this.status;}this.process=child;this.starting=false;const lines=readline.createInterface({input:child.stdout});let reported=false;
  lines.on('line',line=>{if(this.process!==child)return;try{const data=JSON.parse(line);if(data.kind==='ready'){reported=true;this.update('listening',`Escuchando en ${data.culture}. Empieza diciendo «Jarvis».`);}if(data.kind==='error'){reported=true;this.update('error',data.message);}if(data.kind==='recognized'&&typeof data.text==='string'){this.onVoice(data);}}catch{}});
  child.on('error',e=>{if(this.process===child){this.process=null;this.update('error','No pude abrir la voz de Windows. '+e.message);}});
  child.on('exit',()=>{lines.close();if(this.process===child){this.process=null;if(this.status.state!=='error')this.update(reported?'off':'error',reported?'Micrófono apagado':'Windows no pudo iniciar la voz. Revisa el idioma y permisos; puedes escribir los comandos.');}});child.stderr.resume();return this.status;
 }catch(e){if(generation===this.generation){this.starting=false;this.update('error',e.message);}return this.status;}}
 stop(){this.generation++;this.starting=false;const child=this.process;this.process=null;child?.kill();this.update('off','Micrófono apagado');return this.status;}
 async chooseFolder(){const child=await this.launch('pick-folder.ps1',{sta:true});let output='',errors='';child.stdout.on('data',b=>output+=b);child.stderr.on('data',b=>errors+=b);return new Promise((resolve,reject)=>{child.on('error',reject);child.on('close',code=>{try{const result=JSON.parse(output.trim());if(code||result?.error)throw Error(result?.error||errors||'No se pudo abrir el selector de carpetas.');resolve(result?.path||'');}catch(e){reject(e);}});});}
 async speak(text){if(typeof text!=='string'||!text.trim()||text.length>1500)throw Error('La respuesta de voz debe tener hasta 1500 caracteres.');if(this.closed)throw Error('La aplicación está cerrada.');if(this.speaker||this.speaking)throw Error('Espera a que termine la respuesta actual.');this.speaking=true;const resume=!!this.process||this.starting;this.stop();try{const child=await this.launch('speak.ps1',{stdin:JSON.stringify({text})});if(this.closed){child.kill();throw Error('La aplicación está cerrada.');}this.speaker=child;child.stdout.resume();child.stderr.resume();await new Promise((resolve,reject)=>{child.on('error',reject);child.on('close',code=>code?reject(Error('No pude reproducir la voz de Windows.')):resolve());});}finally{this.speaker=null;this.speaking=false;if(resume&&!this.closed)await this.listen();}}
 openFolder(folder){if(process.platform!=='win32')throw Error('Abrir el Explorador necesita Windows.');const child=spawn(path.join(process.env.SystemRoot||'C:\\Windows','explorer.exe'),[folder],{detached:true,stdio:'ignore',windowsHide:true});child.on('error',()=>{});child.unref();}
 close(){this.closed=true;this.stop();this.speaker?.kill();for(const child of this.children)child.kill();this.children.clear();}
}

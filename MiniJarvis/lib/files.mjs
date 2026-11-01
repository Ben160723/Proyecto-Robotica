import fs from 'node:fs/promises';
import {constants,createReadStream} from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {randomUUID,randomInt,createHash} from 'node:crypto';
import {normalize,category} from './commands.mjs';

const TRASH='.mini-jarvis-papelera',MAX_ACTIONS=200;
const SKIP=new Set(['.git','.ssh','.aws','.azure','.config','.codex','node_modules','appdata','windows','program files','program files (x86)','programdata','$recycle.bin','system volume information','desktop.ini','thumbs.db','ehthumbs.db','ntuser.dat','ntuser.ini','ntuser.pol','ntuser.dat.log1','ntuser.dat.log2',TRASH]);
const inside=(root,target)=>{const rel=path.relative(root,target);return rel===''||!path.isAbsolute(rel)&&rel!=='..'&&!rel.startsWith('..'+path.sep);};
const missing=e=>e.code==='ENOENT';
async function exists(p){try{await fs.lstat(p);return true;}catch(e){if(missing(e))return false;throw e;}}
async function stamp(p){const s=await fs.lstat(p,{bigint:true});if(s.isSymbolicLink())throw Error('No sigo enlaces simbólicos ni uniones de carpetas.');return {kind:s.isDirectory()?'directory':s.isFile()?'file':'other',size:String(s.size),mtime:String(s.mtimeNs),ino:String(s.ino),dev:String(s.dev)};}
const equal=(a,b)=>a.kind===b.kind&&a.size===b.size&&a.mtime===b.mtime&&a.ino===b.ino&&a.dev===b.dev;
async function digest(p){const h=createHash('sha256');for await(const block of createReadStream(p))h.update(block);return h.digest('hex');}
async function writeJSON(file,data){const tmp=file+'.'+randomUUID()+'.tmp';try{const h=await fs.open(tmp,'wx',0o600);try{await h.writeFile(JSON.stringify(data,null,2));await h.sync();}finally{await h.close();}await fs.rename(tmp,file);}finally{await fs.unlink(tmp).catch(()=>{});}}
export class FileAssistant{
 constructor({dataDir,appDir,clock=()=>Date.now(),moveHook=null}={}){this.dataDir=path.resolve(dataDir||path.join(os.homedir(),'.mini-jarvis'));this.appDir=path.resolve(appDir||process.cwd());this.clock=clock;this.moveHook=moveHook;this.roots=[];this.jobs=[];this.pending=null;}
 async init(){
  await fs.mkdir(this.dataDir,{recursive:true});
  const read=async(name,blank)=>{try{return JSON.parse(await fs.readFile(path.join(this.dataDir,name),'utf8'));}catch(e){if(missing(e))return blank;throw Error(`No pude leer ${name}. Conserva esa carpeta de datos antes de restaurar una copia.`);}};
  const config=await read('carpetas.json',{version:1,roots:[]}),journal=await read('historial.json',{version:1,jobs:[]});
  if(config.version!==1||!Array.isArray(config.roots)||config.roots.length>1000||journal.version!==1||!Array.isArray(journal.jobs))throw Error('Los datos locales de Mini Jarvis no son válidos.');
  for(const r of config.roots)if(!r||typeof r.id!=='string'||typeof r.alias!=='string'||typeof r.path!=='string')throw Error('Hay una carpeta configurada no válida.');
  this.roots=config.roots;this.jobs=journal.jobs;
  for(const j of this.jobs)if(j.status==='running'){j.status='interrupted';j.error='La aplicación se cerró durante este cambio. Revisa las rutas del historial antes de continuar.';}
  await this.saveJobs();return this;
 }
 async saveRoots(){await writeJSON(path.join(this.dataDir,'carpetas.json'),{version:1,roots:this.roots});}
 async saveJobs(){await writeJSON(path.join(this.dataDir,'historial.json'),{version:1,jobs:this.jobs});}
 publicState(){return {roots:this.roots.filter(r=>r.active!==false).map(r=>({id:r.id,alias:r.alias,path:r.path})),pending:this.pending?{id:this.pending.id,code:this.pending.code,expiresAt:this.pending.expiresAt,title:this.pending.title,kind:this.pending.kind,operations:this.pending.operations.map(o=>({from:o.from,to:o.to,type:o.type})),notes:this.pending.notes}:null,history:this.jobs.slice(-30).reverse().map(j=>({id:j.id,title:j.title,status:j.status,at:j.at,undone:!!j.undone,error:j.error||'',operations:j.operations.map(o=>({from:o.from,to:o.to,status:o.status}))}))};}
 protected(target,parents=true){
  if(inside(this.dataDir,target)||inside(this.appDir,target)||parents&&(inside(target,this.dataDir)||inside(target,this.appDir)))return true;
  if(path.parse(target).root===target)return true;
  return target.split(/[\\/]/).some(x=>SKIP.has(x.toLowerCase()));
 }
 async addRoot(alias,location){
  if(typeof alias!=='string'||!alias.trim()||alias.length>50||/[\\/<>:"|?*\x00-\x1f]/.test(alias))throw Error('Pon un nombre sencillo para la carpeta, como Descargas.');
  if(typeof location!=='string'||!path.isAbsolute(location)||location.length>2000)throw Error('Elige una ruta absoluta de tu PC.');
  const actual=await fs.realpath(location),s=await stamp(actual);if(s.kind!=='directory'||this.protected(actual,false))throw Error('Elige una carpeta de archivos personales; las carpetas del sistema y de la aplicación están protegidas.');
  if(this.roots.some(r=>r.active!==false&&normalize(r.alias)===normalize(alias)))throw Error('Ya existe una carpeta con ese nombre.');
  if(this.roots.some(r=>r.active!==false&&(inside(r.path,actual)||inside(actual,r.path))))throw Error('Esta carpeta ya está autorizada o se superpone con otra.');
  if(this.roots.filter(r=>r.active!==false).length>=30)throw Error('Puedes autorizar hasta 30 carpetas.');const before=structuredClone(this.roots),revived=this.roots.find(r=>r.path===actual&&r.active===false);const root={id:revived?.id||randomUUID(),alias:alias.trim(),path:actual,active:true,identity:{dev:s.dev,ino:s.ino}};this.roots=this.roots.filter(r=>r.id!==root.id).concat(root);try{await this.saveRoots();}catch(e){this.roots=before;throw e;}this.pending=null;return root;
 }
 async removeRoot(id){const before=this.roots;this.roots=this.roots.map(r=>r.id===id?{...r,active:false}:r);try{await this.saveRoots();}catch(e){this.roots=before;throw e;}this.pending=null;}
 root(alias){const matches=this.roots.filter(r=>r.active!==false&&normalize(r.alias)===normalize(alias));if(matches.length!==1)throw Error(`Añade primero la carpeta «${alias}» con ese nombre. Solo trabajo en las carpetas que elijas.`);return matches[0];}
 async checkRoot(root){const actual=await fs.realpath(root.path),s=await stamp(root.path);if(actual!==root.path||s.kind!=='directory'||root.identity&&(s.dev!==root.identity.dev||s.ino!==root.identity.ino))throw Error(`La carpeta ${root.alias} cambió de ubicación o identidad. Vuelve a añadirla.`);}
 async checked(root,relative,{allowMissing=false,internal=false}={}){
  await this.checkRoot(root);if(typeof relative!=='string'||!relative||relative.length>2000||path.isAbsolute(relative)||path.win32.isAbsolute(relative)||/[\x00-\x1f:*?"<>|]/.test(relative))throw Error('Especifica un nombre o ruta relativa dentro de la carpeta autorizada.');
  const pieces=relative.split(/[\\/]/);if(pieces.some(p=>!p||p==='.'||p==='..'||/[. ]$/.test(p)||/^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(p)))throw Error('Ese nombre o ruta no es válido.');
  if(!internal&&pieces.some(p=>SKIP.has(p.toLowerCase())||p.startsWith('.')))throw Error('Las carpetas ocultas, del sistema y la papelera están protegidas.');
  const target=path.join(root.path,...pieces);if(!inside(root.path,target)||!internal&&this.protected(target))throw Error('La ruta queda fuera de las carpetas permitidas.');
  let part=root.path;for(const piece of pieces){part=path.join(part,piece);try{const s=await fs.lstat(part);if(s.isSymbolicLink())throw Error('No sigo enlaces simbólicos ni uniones de carpetas.');}catch(e){if(allowMissing&&missing(e))continue;throw e;}}
  return target;
 }
 async entries(root,recursive=false){await this.checkRoot(root);const files=[];let scanned=0,truncated=false;const walk=async(dir,depth)=>{
  if(depth>8){truncated=true;return;}if(dir!==root.path){try{await this.checked(root,path.relative(root.path,dir));}catch{truncated=true;return;}}let entries;try{entries=await fs.readdir(dir,{withFileTypes:true});}catch(e){if(dir===root.path)throw e;truncated=true;return;}
  for(const ent of entries){if(++scanned>10000){truncated=true;return;}if(ent.name.startsWith('.')||SKIP.has(ent.name.toLowerCase())||ent.isSymbolicLink())continue;
   const full=path.join(dir,ent.name);if(this.protected(full))continue;
   if(ent.isDirectory()){if(recursive)await walk(full,depth+1);}else if(ent.isFile()){const s=await fs.lstat(full);files.push({name:ent.name,relative:path.relative(root.path,full),size:s.size,modified:s.mtime.toISOString()});}
   if(scanned>10000)return;
  }
 };await walk(root.path,0);return {files,truncated};}
 async search(root,query){if(typeof query!=='string'||!query.trim()||query.length>200)throw Error('Indica qué nombre buscas.');const found=await this.entries(root,true),matches=found.files.filter(f=>normalize(f.name).includes(normalize(query)));return {kind:'search',files:matches.slice(0,500).map(f=>({...f,root:root.alias})),truncated:found.truncated||matches.length>500,message:`Encontré ${matches.length} ${matches.length===1?'archivo':'archivos'} con ese nombre${found.truncated?' en la parte que pude revisar':''}.`};}
 async unique(root,relative,reserved){let candidate=relative,n=2;const ext=path.extname(relative),base=relative.slice(0,relative.length-ext.length);while(reserved.has(candidate.toLowerCase())||await exists(await this.checked(root,candidate,{allowMissing:true}))){candidate=`${base} (${n++})${ext}`;if(n>10000)throw Error('Hay demasiados nombres repetidos.');}reserved.add(candidate.toLowerCase());return candidate;}
 async prepare(command){
  this.pending=null;
  const operations=[],reserved=new Set(),notes=[];let title='';
  const operation=async(fromRoot,fromRel,toRoot,toRel,type='move',internal=false)=>{if(operations.length>=MAX_ACTIONS)throw Error(`Divide la tarea: puedes revisar hasta ${MAX_ACTIONS} archivos a la vez.`);const from=await this.checked(fromRoot,fromRel),expected=await stamp(from);if(!['file','directory'].includes(expected.kind))throw Error('Ese elemento no es un archivo o carpeta normal.');const to=await this.checked(toRoot,toRel,{allowMissing:true,internal});if(from===to)throw Error('El origen y destino son iguales.');if(expected.kind==='directory'&&inside(from,to))throw Error('No se puede mover una carpeta dentro de sí misma.');if(await exists(to))throw Error('El destino ya existe. Elige otro nombre; no sobrescribo archivos.');operations.push({fromRoot:fromRoot.id,toRoot:toRoot.id,fromRel,toRel,from,to,type,internal,expected,status:'planned'});};
  if(command.kind==='organize'){
   const r=this.root(command.root),list=await this.entries(r);title=`Organizar ${r.alias} por ${command.by}`;if(list.truncated)throw Error('La carpeta es demasiado grande. Elige una subcarpeta para organizarla.');
   for(const f of list.files){const dest=command.by==='fecha'?`${new Date(f.modified).getFullYear()}-${String(new Date(f.modified).getMonth()+1).padStart(2,'0')}`:category(f.name);await operation(r,f.relative,r,await this.unique(r,path.join(dest,f.name),reserved));}
   notes.push('Solo archivos sueltos de esta carpeta. Las subcarpetas se conservan. La fecha es la última modificación.');
  }else if(command.kind==='move'||command.kind==='moveType'){
   const from=this.root(command.from),to=this.root(command.to);if(from.id===to.id)throw Error('El origen y destino son la misma carpeta. Usa renombra para cambiar un nombre.');title=`Mover de ${from.alias} a ${to.alias}`;
   const found=command.kind==='moveType'?await this.entries(from):null;if(found?.truncated)throw Error('La carpeta es demasiado grande. Elige una subcarpeta.');const list=command.kind==='moveType'?found.files.filter(f=>path.extname(f.name).toLowerCase()==='.'+command.extension):[{relative:command.name,name:path.basename(command.name.replaceAll('\\','/'))}];
   for(const f of list)await operation(from,f.relative,to,await this.unique(to,f.name,reserved));
  }else if(command.kind==='rename'){
   if(/[\\/]/.test(command.newName))throw Error('El nuevo nombre no puede contener carpetas.');const r=this.root(command.root);title=`Renombrar ${command.name}`;await operation(r,command.name,r,path.join(path.dirname(command.name),command.newName));
  }else if(command.kind==='trash'){
   const r=this.root(command.root);title=`Enviar ${command.name} a la papelera de Mini Jarvis`;await operation(r,command.name,r,path.join(TRASH,randomUUID(),path.basename(command.name.replaceAll('\\','/'))),'trash',true);notes.push('Se mueve a la papelera de Mini Jarvis dentro de la misma unidad. No se borra definitivamente. Puedes deshacerlo.');
  }else if(command.kind==='undo'){
   const job=[...this.jobs].reverse().find(j=>!j.undone&&j.kind!=='undo'&&['done','partial'].includes(j.status)&&j.operations.some(o=>o.status==='done'));
   if(!job)throw Error('No hay cambios anteriores que pueda deshacer automáticamente.');title=`Deshacer: ${job.title}`;
   for(const old of [...job.operations].reverse().filter(o=>o.status==='done')){const a=this.roots.find(r=>r.id===old.toRoot&&r.active!==false),b=this.roots.find(r=>r.id===old.fromRoot&&r.active!==false);if(!a||!b)throw Error('Autoriza de nuevo las carpetas originales antes de deshacer.');const from=await this.checked(a,old.toRel,{internal:old.internal}),to=await this.checked(b,old.fromRel,{allowMissing:true});if(!equal(await stamp(from),old.after))throw Error('Un archivo cambió después de moverlo. No lo sobrescribiré al deshacer.');if(await exists(to))throw Error('El nombre original está ocupado. Renombra ese archivo antes de deshacer.');operations.push({fromRoot:a.id,toRoot:b.id,fromRel:old.toRel,toRel:old.fromRel,from,to,type:'undo',sourceInternal:old.internal,internal:false,expected:old.after,status:'planned'});}
   command.undoId=job.id;
  }else throw Error('Esta operación no está disponible.');
  if(!operations.length)throw Error('No encontré archivos para esa tarea. No cambié nada.');
  this.pending={id:randomUUID(),code:String(randomInt(1000,10000)),expiresAt:this.clock()+300000,title,kind:command.kind,undoId:command.undoId||null,operations,notes};return {kind:'plan',message:`Preparé ${operations.length} ${operations.length===1?'cambio':'cambios'}. Revisa los nombres y destinos y confirma el código que aparece en pantalla.`};
 }
 async preflight(op){const a=this.roots.find(r=>r.id===op.fromRoot&&r.active!==false),b=this.roots.find(r=>r.id===op.toRoot&&r.active!==false);if(!a||!b)throw Error('Se retiró una carpeta del permiso de acceso.');if(await this.checked(a,op.fromRel,{internal:!!op.sourceInternal})!==op.from||await this.checked(b,op.toRel,{allowMissing:true,internal:!!op.internal})!==op.to)throw Error('La ruta del plan cambió.');if(!equal(await stamp(op.from),op.expected))throw Error('Un archivo cambió desde la vista previa. Pide un plan nuevo.');if(await exists(op.to))throw Error('Apareció un archivo en el destino. No se sobrescribió. Pide un plan nuevo.');}
 async move(op){
  if(this.moveHook)await this.moveHook(op);
  if(op.expected.kind==='directory'){try{await fs.rename(op.from,op.to);}catch(e){if(e.code==='EXDEV')throw Error('Las carpetas completas entre unidades se deben mover con el Explorador. Los archivos sí pueden cruzar unidades.');throw e;}return;}
  // A new hard link claims the destination exclusively; it never replaces it.
  // Cross-volume/non-link filesystems use an exclusive, verified copy instead.
  let linked=false;try{await fs.link(op.from,op.to);linked=true;}catch(e){if(!['EXDEV','EPERM','EOPNOTSUPP','ENOTSUP'].includes(e.code))throw e;await fs.copyFile(op.from,op.to,constants.COPYFILE_EXCL);}
  let created=await stamp(op.to);
  try{
   if(!equal(await stamp(op.from),op.expected))throw Error('El archivo cambió durante el traslado.');
   if(!linked){if(await digest(op.from)!==await digest(op.to))throw Error('La copia no coincide con el original.');const s=await fs.stat(op.from);await fs.utimes(op.to,s.atime,s.mtime);created=await stamp(op.to);}
   if(!equal(await stamp(op.from),op.expected))throw Error('El archivo cambió durante el traslado.');await fs.unlink(op.from);
  }catch(e){try{const current=await stamp(op.to),source=await stamp(op.from);const sameFile=current.ino===created.ino&&current.dev===created.dev;if(sameFile&&(linked?source.ino===current.ino&&source.dev===current.dev:equal(current,created)))await fs.unlink(op.to);}catch{}throw e;}
 }
 async apply(id,code,{reviewed=false}={}){
  const plan=this.pending;if(!reviewed||!plan||id!==plan.id||code!==plan.code)throw Error('Revisa el plan y confirma su código actual.');if(this.clock()>plan.expiresAt){this.pending=null;throw Error('El plan caducó. Pídelo de nuevo antes de cambiar archivos.');}
  for(const op of plan.operations)await this.preflight(op);
  const job={id:randomUUID(),kind:plan.kind,undoId:plan.undoId,title:plan.title,at:new Date().toISOString(),status:'running',operations:structuredClone(plan.operations)};this.jobs.push(job);await this.saveJobs();this.pending=null;
  try{
   for(const op of job.operations){await this.preflight(op);await fs.mkdir(path.dirname(op.to),{recursive:true});await this.preflight(op);op.status='running';await this.saveJobs();await this.move(op);op.status='moved';op.after=await stamp(op.to);op.status='done';await this.saveJobs();}
   job.status='done';if(job.kind==='undo'){const original=this.jobs.find(j=>j.id===job.undoId);if(original)original.undone=true;}await this.saveJobs();
   return {kind:'done',message:`Completé ${job.operations.length} ${job.operations.length===1?'cambio':'cambios'}. ${job.kind==='trash'?'El elemento está en la papelera de Mini Jarvis.':'Puedes deshacerlos desde el historial.'}`};
  }catch(e){
   job.error=e.message;let partial=false;for(const op of job.operations.filter(o=>['running','moved'].includes(o.status))){try{if(await exists(op.from)&&equal(await stamp(op.from),op.expected)&&!await exists(op.to))op.status='failed';else{op.status='uncertain';partial=true;}}catch{op.status='uncertain';partial=true;}}
   for(const op of [...job.operations].reverse().filter(o=>o.status==='done')){try{if(await exists(op.from)||!equal(await stamp(op.to),op.after))throw Error('El archivo original o destino cambió.');const reverse={...op,from:op.to,to:op.from,expected:op.after};await this.move(reverse);op.status='rolled-back';}catch(err){partial=true;job.error+=' No pude devolver '+path.basename(op.from)+': '+err.message;}}
   job.status=partial?'partial':'failed';await this.saveJobs().catch(()=>{});throw Error(`La tarea se interrumpió. ${partial?'Revisa el historial: algunos elementos cambiaron o necesitan recuperación manual.':'Se devolvieron los cambios completados al origen.'} ${job.error}`);
  }
 }
}
export {inside,stamp,equal,TRASH};

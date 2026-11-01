export const normalize=text=>String(text).normalize('NFD').replace(/\p{Diacritic}/gu,'').toLowerCase().replace(/\s+/g,' ').trim();
const clean=s=>s.trim().replace(/^["“”']|["“”']$/g,'').trim();
export function parseCode(text){const words={cero:'0',uno:'1',un:'1',dos:'2',tres:'3',cuatro:'4',cinco:'5',seis:'6',siete:'7',ocho:'8',nueve:'9'};return normalize(text).split(/[\s,.-]+/).map(t=>words[t]??t).join('');}
export function parseCommand(input,{voice=false}={}){
 if(typeof input!=='string'||!input.trim()||input.length>1200)throw Error('Escribe o di una instrucción de hasta 1200 caracteres.');
 const wake=/^\s*(?:hola[,\s]+)?(?:jarvis|yarvis)[,.:\s]+/i;
 if(voice&&!wake.test(input))return {kind:'ignored'};
 const text=input.replace(wake,'').trim().replace(/[.!?]+$/,''),n=normalize(text);let m;
 if(/^(ayuda|que puedes hacer|que sabes hacer)$/.test(n))return {kind:'help'};
 if(/^(cancela|cancelar|cancela el plan)$/.test(n))return {kind:'cancel'};
 if(/^(deshaz|deshacer)( el)? ultimo (cambio|plan)$/.test(n))return {kind:'undo'};
 if((m=text.match(/^confirm(?:a|ar)\s+(.+)$/i)))return {kind:'confirm',code:parseCode(m[1])};
 if((m=text.match(/^(?:organiza|ordenar|ordena|organizar)\s+(.+?)(?:\s+por\s+(tipo|fecha))?$/i)))return {kind:'organize',root:clean(m[1]),by:normalize(m[2]||'tipo')};
 if((m=text.match(/^(?:busca|buscar|encuentra)\s+(.+?)\s+en\s+(.+)$/i)))return {kind:'search',query:clean(m[1]),root:clean(m[2])};
 if((m=text.match(/^(?:abre|abrir)\s+(.+)$/i)))return {kind:'open',root:clean(m[1])};
 if((m=text.match(/^(?:mueve|mover)\s+los?\s+(?:archivos?\s+)?([a-z0-9.]+)\s+de\s+(.+?)\s+a\s+(.+)$/i)))return {kind:'moveType',extension:m[1].replace(/^\./,'').toLowerCase(),from:clean(m[2]),to:clean(m[3])};
 if((m=text.match(/^(?:mueve|mover)\s+(.+?)\s+de\s+(.+?)\s+a\s+(.+)$/i)))return {kind:'move',name:clean(m[1]),from:clean(m[2]),to:clean(m[3])};
 if((m=text.match(/^(?:elimina|eliminar|borra|borrar)\s+(.+?)\s+de\s+(.+)$/i)))return {kind:'trash',name:clean(m[1]).replace(/^el archivo\s+/i,''),root:clean(m[2])};
 if((m=text.match(/^(?:renombra|renombrar)\s+(.+?)\s+como\s+(.+?)\s+en\s+(.+)$/i)))return {kind:'rename',name:clean(m[1]),newName:clean(m[2]),root:clean(m[3])};
 throw Error('No entendí esa orden. Prueba «organiza Descargas», «busca factura en Documentos» o «mueve informe.pdf de Descargas a Documentos».');
}
export function category(name){const ext=name.toLowerCase().split('.').at(-1);for(const [label,extensions]of Object.entries({Documentos:'pdf doc docx odt txt rtf csv xls xlsx ods ppt pptx epub',Imagenes:'jpg jpeg png gif webp svg bmp heic heif avif tif tiff',Videos:'mp4 mkv mov avi webm m4v',Audio:'mp3 wav m4a ogg flac aac',Comprimidos:'zip rar 7z gz bz2 tar',Instaladores:'exe msi msix appx'}))if(extensions.split(' ').includes(ext))return label==='Imagenes'?'Imágenes':label;return 'Otros';}

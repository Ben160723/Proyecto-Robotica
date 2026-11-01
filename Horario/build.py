from pathlib import Path
import hashlib
root=Path(__file__).parent
html=(root/'index.template.html').read_text().replace('/* APP_CSS */',(root/'style.css').read_text()).replace('/* APP_JS */',(root/'app.js').read_text())
(root/'Rumbo.html').write_text(html)
(root/'index.html').write_text(html)
version=hashlib.sha256(html.encode()).hexdigest()[:12]
(root/'sw.js').write_text('''const CACHE='rumbo-VERSION';
const ASSETS=['./','./index.html','./Rumbo.html','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('rumbo-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
 const url=new URL(event.request.url);const asset=event.request.mode==='navigate'||ASSETS.some(a=>new URL(a,self.registration.scope).pathname===url.pathname);
 if(!asset)return;event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)));});
'''.replace('VERSION',version))
print(f'Built {root/"Rumbo.html"}: {len(html.encode()):,} bytes')

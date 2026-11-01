const CACHE='rumbo-8588e45cea70';
const ASSETS=['./','./index.html','./Rumbo.html','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('rumbo-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
 const url=new URL(event.request.url);const asset=event.request.mode==='navigate'||ASSETS.some(a=>new URL(a,self.registration.scope).pathname===url.pathname);
 if(!asset)return;event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)));});

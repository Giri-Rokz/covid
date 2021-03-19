const cacheName = 'v1';

self.addEventListener('install',(e)=> {
    console.log(`SW installed - ${e}`);
});

self.addEventListener('activate',(e)=> {
    console.log(`SW activated - ${e}`);
    e.waitUntil(
        caches.keys()
        .then(cacheArray=> {
            cacheArray.map(cache => {
                if(cache !== cacheName) {
                    caches.delete(cache);
                }
            });
        })
        .then(()=>self.skipWaiting())
    );
});

self.addEventListener('fetch',(e)=> {
    console.log(`Fetch event - ${e}`);
    e.respondWith(
        fetch(e.request)
        .then(res => {
            const clone = res.clone();
            caches.open(cacheName).then(cache => {
                cache.put(e.request,clone);                
            });
            return res;            
        }).catch(err => caches.match(e.request))
    );
});
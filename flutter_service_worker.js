'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "2614628c8a908b374368e32b2c1c21cc",
"assets/AssetManifest.bin.json": "033c7f05d8587c54e278275af74986c4",
"assets/AssetManifest.json": "2c82e24e2ce9dbd57e5f91b0849e1037",
"assets/assets/collage.png": "35ab01a59d0b162cca4c14e0a6a4b2f4",
"assets/assets/diu.png": "d7e7f4f233221f607f74e1d8e05f2893",
"assets/assets/e1.jpg": "4ffcd30706f64e9ccdbfc7107b0f48a6",
"assets/assets/e1.png": "331c00c7fcf6a797c11ff3cac9439559",
"assets/assets/e2.jpg": "18cd3c02a30fed443c6b2c4d0cf545d9",
"assets/assets/e3.jpg": "ab56862432cbf0e19c68c3db2eb1728c",
"assets/assets/e4.jpg": "3c176d41035367a395d43ce16b530ff9",
"assets/assets/e5.jpg": "79efa3926df0a9936b5b2cf48a62deda",
"assets/assets/e6.jpg": "ac874ff1e8b8f0d1a459f37d8e3a234d",
"assets/assets/f1.jpg": "6c5b972f837c0fe93421bc22bdf7c73e",
"assets/assets/f2.jpg": "b5085ecf0a9913c1700e67b0eccde5cd",
"assets/assets/f3.jpg": "74f873368f593ca5ac2d3cfadfcbee40",
"assets/assets/f4.jpg": "b0f8db6cb49ccdc74d8b9e18dc5b9e97",
"assets/assets/f5.jpg": "c34ad59ceec1f3ee29da4a7d8ef2cc02",
"assets/assets/f6.jpg": "ac6985b4e4304f03bca279f130b3bb34",
"assets/assets/f7.jpg": "6a3ad121281b1b06b4652cec708ab8cb",
"assets/assets/ihelpbd.png": "b4426851832b0281c11b4707032a866d",
"assets/assets/logo.png": "4a28307cb4881293d29fa26f224037c9",
"assets/assets/nayeem1.jpg": "f5a1c947228cf1b6b19f545a9f5df72b",
"assets/assets/nayeem2.png": "2dbe1984f0f7a7e9fc007e270561d725",
"assets/assets/nexttech.png": "658b7c56b61b8ca6a7b9959db9e36923",
"assets/assets/sk.png": "19447229e1d13c083a4908d48d066a89",
"assets/assets/t1.jpg": "b9e07abe7757b1d55502d873cbba55b3",
"assets/assets/t2.jpg": "11de0f1a1fbb4a8b1b3ff86454c46abc",
"assets/assets/t3.jpg": "aefe5ca46c03dfa20ca4af8ee3e9d9c4",
"assets/assets/t4.jpg": "f400cb529163b4d8589c00973be76b6b",
"assets/assets/todo.png": "1b9b6e794bd0e97eb81ac2be5678820d",
"assets/assets/todo1.png": "62310c652b1fcc2fdd0860380353d781",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "316c2caea84b6db2b44a108a6ec5bc32",
"assets/NOTICES": "d537c456e189149327e2e922d96377d1",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "c86fbd9e7b17accae76e5ad116583dc4",
"canvaskit/canvaskit.js.symbols": "38cba9233b92472a36ff011dc21c2c9f",
"canvaskit/canvaskit.wasm": "3d2a2d663e8c5111ac61a46367f751ac",
"canvaskit/chromium/canvaskit.js": "43787ac5098c648979c27c13c6f804c3",
"canvaskit/chromium/canvaskit.js.symbols": "4525682ef039faeb11f24f37436dca06",
"canvaskit/chromium/canvaskit.wasm": "f5934e694f12929ed56a671617acd254",
"canvaskit/skwasm.js": "445e9e400085faead4493be2224d95aa",
"canvaskit/skwasm.js.symbols": "741d50ffba71f89345996b0aa8426af8",
"canvaskit/skwasm.wasm": "e42815763c5d05bba43f9d0337fa7d84",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "c71a09214cb6f5f8996a531350400a9a",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "143241fd1842c1495b885dd53e6bc134",
"/": "143241fd1842c1495b885dd53e6bc134",
"main.dart.js": "9212fb75fdf3c007169521b2dfdb47ff",
"manifest.json": "75382f7ea106840ee39190e8fda77524",
"version.json": "dddc0ea9340a7e59f9f9afc188ac4fcb"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}

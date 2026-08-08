(function () {
  if (typeof THREE === 'undefined') return;
  try {
    /* ---------- NOISE ---------- */
    function makeNoise(seed) {
      var perm = new Uint8Array(512), p = new Uint8Array(256);
      for (var i = 0; i < 256; i++) p[i] = i;
      var s = seed >>> 0;
      for (var i = 255; i > 0; i--) { s = (s * 1664525 + 1013904223) >>> 0; var j = s % (i + 1); var tt = p[i]; p[i] = p[j]; p[j] = tt; }
      for (var i = 0; i < 512; i++) perm[i] = p[i & 255];
      function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
      function lerp(a, b, t) { return a + t * (b - a); }
      function grad(h, x, y) { switch (h & 7) { case 0: return x + y; case 1: return -x + y; case 2: return x - y; case 3: return -x - y; case 4: return x; case 5: return -x; case 6: return y; default: return -y; } }
      function n2(x, y) {
        var X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
        x -= Math.floor(x); y -= Math.floor(y);
        var u = fade(x), v = fade(y);
        var a = perm[X] + Y, b = perm[X + 1] + Y;
        return lerp(lerp(grad(perm[a], x, y), grad(perm[b], x - 1, y), u), lerp(grad(perm[a + 1], x, y - 1), grad(perm[b + 1], x - 1, y - 1), u), v);
      }
      return n2;
    }
    var noise2 = makeNoise(20240807);
    function fbm(x, y, oct) {
      var v = 0, amp = 0.5, freq = 1, tot = 0;
      for (var i = 0; i < oct; i++) { v += amp * noise2(x * freq, y * freq); tot += amp; amp *= 0.5; freq *= 2; }
      return v / tot;
    }

    var canvas = document.getElementById('scene');
    var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.8));
    renderer.setSize(innerWidth, innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    var scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x161233, 300, 1200);
    var camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 3000);
    camera.position.set(60, 235, 340);

    /* sky */
    scene.background = new THREE.Color(0x161233);
    (function () {
      var c = document.createElement('canvas'); c.width = c.height = 64;
      var ctx = c.getContext('2d');
      var g = ctx.createLinearGradient(0, 0, 0, 64);
      g.addColorStop(0, '#2b2458'); g.addColorStop(0.55, '#1a1638'); g.addColorStop(1, '#07060f');
      ctx.fillStyle = g; ctx.fillRect(0, 0, 64, 64);
      scene.add(new THREE.Mesh(new THREE.SphereGeometry(1800, 24, 24),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), side: THREE.BackSide, fog: false })));
    })();

    /* stars */
    (function () {
      var n = 700, pos = new Float32Array(n * 3);
      for (var i = 0; i < n; i++) {
        var r = 1300 + Math.random() * 400, th = Math.random() * Math.PI * 2, ph = Math.random() * Math.PI * 0.5;
        pos[i*3] = r * Math.cos(ph) * Math.cos(th); pos[i*3+1] = r * Math.sin(ph) * 0.6 + 120; pos[i*3+2] = r * Math.cos(ph) * Math.sin(th);
      }
      var g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      scene.add(new THREE.Points(g, new THREE.PointsMaterial({ color: 0xffffff, size: 1.6, sizeAttenuation: false, transparent: true, opacity: 0.75, fog: false })));
    })();

    /* moon glow */
    (function () {
      var c = document.createElement('canvas'); c.width = c.height = 256;
      var ctx = c.getContext('2d');
      var g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
      g.addColorStop(0, 'rgba(245,158,11,0.65)'); g.addColorStop(0.35, 'rgba(245,158,11,0.18)'); g.addColorStop(1, 'rgba(245,158,11,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, 256, 256);
      var spr = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c), transparent: true, fog: false }));
      spr.position.set(700, 380, -900); spr.scale.set(700, 700, 1);
      scene.add(spr);
    })();

    /* mountains */
    var M = 200, maxH = 200, sigma = 300;
    var plane = new THREE.PlaneGeometry(2400, 2400, M, M);
    plane.rotateX(-Math.PI / 2);
    var posAttr = plane.attributes.position, nv = posAttr.count;
    var colors = new Float32Array(nv * 3);
    var cLow = new THREE.Color(0x141414), cMid = new THREE.Color(0x4a4a4a), cHi = new THREE.Color(0x9d9d9d), snow = new THREE.Color(0xffffff);
    var maxHFound = 0;
    for (var i = 0; i < nv; i++) {
      var x = posAttr.getX(i), z = posAttr.getZ(i);
      var fall = Math.exp(-(x * x) / (2 * sigma * sigma));
      var ridge = 1 - Math.abs(fbm(x * 0.0045, z * 0.0045, 4));
      var detail = fbm(x * 0.02, z * 0.02, 3);
      var h = (ridge * ridge * 0.55 + ridge * 0.45) * fall * maxH + detail * 14 * fall;
      posAttr.setY(i, h);
      if (h > maxHFound) maxHFound = h;
      var t = Math.min(1, Math.max(0, h / maxH));
      var col = t < 0.42 ? cLow.clone().lerp(cMid, t / 0.42) : cMid.clone().lerp(cHi, (t - 0.42) / 0.58);
      var m = 0.82 + 0.18 * (0.5 + 0.5 * fbm(x * 0.01, z * 0.01, 2));
      colors[i*3] = col.r * m; colors[i*3+1] = col.g * m; colors[i*3+2] = col.b * m;
    }
    var snowT = maxHFound * 0.66;
    for (var i = 0; i < nv; i++) {
      var hh = posAttr.getY(i);
      if (hh > snowT) {
        var k = Math.min(1, (hh - snowT) / (maxHFound - snowT) * 2.2);
        colors[i*3] += (snow.r - colors[i*3]) * k; colors[i*3+1] += (snow.g - colors[i*3+1]) * k; colors[i*3+2] += (snow.b - colors[i*3+2]) * k;
      }
    }
    plane.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    plane.computeVertexNormals();
    scene.add(new THREE.Mesh(plane, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.85, metalness: 0.05 })));

    /* prayer flags (monochrome) */
    var palette = [0x8B5CF6, 0xF59E0B, 0x22D3EE, 0xEC4899, 0xffffff];
    function makeFlags(x1, y1, z1, x2, y2, z2, n) {
      var g = new THREE.Group();
      var dx = x2 - x1, dy = y2 - y1, dz = z2 - z1;
      for (var i = 0; i < n; i++) {
        var t = (i + 0.5) / n;
        var cx = x1 + dx * t, cy = y1 + dy * t - 0.18 * Math.sin(t * Math.PI) * (Math.abs(dz) * 0.02 + 1), cz = z1 + dz * t;
        var geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([0, 1.5, 0, -1.9, 0, 0, 1.9, 0, 0]), 3));
        geo.computeVertexNormals();
        var dir = new THREE.Vector3(dx, dy, dz).normalize();
        var m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: palette[i % 5], side: THREE.DoubleSide }));
        m.position.set(cx, cy, cz);
        m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), dir);
        g.add(m);
      }
      return g;
    }
    var flagGroups = [];
    flagGroups.push(makeFlags(-160, 42, 80, -150, 42, 260, 18));
    flagGroups.push(makeFlags(150, 46, -60, 165, 46, 120, 18));
    flagGroups.push(makeFlags(-40, 38, 140, -30, 38, 300, 16));
    flagGroups.forEach(function (f) { scene.add(f); });

    /* clouds */
    (function () {
      var cloudMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.08, depthWrite: false });
      for (var i = 0; i < 8; i++) for (var j = 0; j < 12; j++) {
        var s = 20 + Math.random() * 34;
        var m = new THREE.Mesh(new THREE.SphereGeometry(s, 10, 10), cloudMat);
        m.position.set((Math.random() - 0.5) * 900, 220 + Math.random() * 140, -200 + Math.random() * 500);
        scene.add(m);
      }
    })();

    /* lights */
    scene.add(new THREE.HemisphereLight(0x8B5CF6, 0x07060f, 0.9));
    var sunLight = new THREE.DirectionalLight(0xffd9a0, 1.3);
    sunLight.position.set(700, 380, -900);
    scene.add(sunLight);

    /* camera path */
    var mouse = { x: 0, y: 0 };
    addEventListener('mousemove', function (e) { mouse.x = (e.clientX / innerWidth) * 2 - 1; mouse.y = (e.clientY / innerHeight) * 2 - 1; });
    function cameraFromScroll(p) {
      var e = p < 0 ? 0 : p > 1 ? 1 : p;
      var x = 60 + e * 200 + Math.sin(e * Math.PI) * 40 + mouse.x * 16;
      var y = 235 - e * 75 + mouse.y * 8;
      var z = 340 - e * 700;
      camera.position.set(x, y, z);
      camera.lookAt(x * 0.85, 45 + Math.sin(e * Math.PI * 3) * 7, z - 170);
    }

    /* loop */
    function loop() {
      var max = document.documentElement.scrollHeight - innerHeight;
      var p = max > 0 ? scrollY / max : 0;
      cameraFromScroll(p);
      var fnow = performance.now() * 0.0004;
      flagGroups.forEach(function (f, i) { f.rotation.y = Math.sin(fnow + i * 2) * 0.12; });
      renderer.render(scene, camera);
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
    addEventListener('resize', function () {
      camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    });
  } catch (err) {
    document.documentElement.classList.add('no3d');
  }
})();

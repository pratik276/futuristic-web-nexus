(function () {
  var pre = document.getElementById('preloader');
  var preCount = document.getElementById('preCount');
  var start = performance.now();
  function preloadLoop(now) {
    var t = Math.min(1, (now - start) / 1600);
    var eased = 1 - Math.pow(1 - t, 3);
    preCount.textContent = Math.round(eased * 100) + '%';
    if (t < 1) { requestAnimationFrame(preloadLoop); }
    else { setTimeout(function () { pre.classList.add('done'); document.body.classList.add('loaded'); }, 120); }
  }
  requestAnimationFrame(preloadLoop);
  setTimeout(function () {
    if (!pre.classList.contains('done')) { pre.classList.add('done'); document.body.classList.add('loaded'); }
  }, 2800);

  var reveals = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
  function updateReveals() {
    var vh = innerHeight;
    for (var i = 0; i < reveals.length; i++) {
      var r = reveals[i].getBoundingClientRect();
      var c = r.top + r.height / 2;
      var t = 1 - Math.min(1, Math.max(0, (c - vh * 0.5) / (vh * 0.9)));
      if (t > 0.08) reveals[i].classList.add('in'); else reveals[i].classList.remove('in');
    }
  }
  updateReveals();
  addEventListener('scroll', updateReveals, { passive: true });

  var header = document.querySelector('header');
  addEventListener('scroll', function () { header.classList.toggle('scrolled', scrollY > 40); }, { passive: true });

  var cursor = document.getElementById('cursor');
  var cx = innerWidth / 2, cy = innerHeight / 2, tx = cx, ty = cy;
  addEventListener('mousemove', function (e) { tx = e.clientX; ty = e.clientY; });
  var hoverable = 'a, button, .mail-pill, .proj, .cap, .stat, .ind, .cred';
  document.addEventListener('mouseover', function (e) { if (e.target.closest(hoverable)) cursor.classList.add('grow'); });
  document.addEventListener('mouseout', function (e) { if (e.target.closest(hoverable)) cursor.classList.remove('grow'); });
  function cursorLoop() {
    cx += (tx - cx) * 0.14; cy += (ty - cy) * 0.14;
    cursor.style.left = cx + 'px'; cursor.style.top = cy + 'px';
    requestAnimationFrame(cursorLoop);
  }
  requestAnimationFrame(cursorLoop);
})();
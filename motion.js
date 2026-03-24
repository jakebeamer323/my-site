(function () {
  'use strict';

  /* ── 1. Page fade-in ──────────────────────────────────────────────*/
  function fadeIn() { document.body.classList.add('page-loaded'); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fadeIn);
  } else { fadeIn(); }
  window.addEventListener('pageshow', function (e) { if (e.persisted) fadeIn(); });

  /* ── 2. Page fade-out on link click ──────────────────────────────*/
  document.addEventListener('click', function (e) {
    const a = e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') ||
        href.startsWith('//') || href.startsWith('mailto') ||
        href.startsWith('tel') || a.hasAttribute('download') ||
        a.getAttribute('target') === '_blank') return;
    e.preventDefault();
    document.body.classList.remove('page-loaded');
    setTimeout(function () { window.location.href = href; }, 290);
  });

  /* ── 3. PCB / Blueprint background overlay ────────────────────────
     Injected before the cursor glow so the glow (drawn later) sits
     on top and illuminates the traces via screen blend mode.
  ------------------------------------------------------------------ */
  var pcbSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">' +
    '<g fill="none" stroke="rgba(77,166,255,0.6)" stroke-linecap="round" stroke-linejoin="round">' +

    // Trace highway 1 (top)
    '<polyline points="0,70 200,70 240,30 500,30 500,100 540,140 800,140" stroke-width="1.5"/>' +
    '<line x1="200" y1="0" x2="200" y2="70" stroke-width="1.5"/>' +
    '<line x1="500" y1="0" x2="500" y2="30" stroke-width="1.5"/>' +

    // Trace highway 2 (middle-left)
    '<polyline points="0,200 80,200 120,160 350,160 350,180" stroke-width="1.5"/>' +
    '<polyline points="80,200 80,320 120,360 260,360" stroke-width="1.5"/>' +

    // Trace highway 3 (bottom)
    '<polyline points="0,450 130,450 170,410 380,410 420,450 800,450" stroke-width="1.5"/>' +
    '<line x1="380" y1="410" x2="380" y2="600" stroke-width="1.5"/>' +

    // Right side vertical network
    '<polyline points="680,0 680,140 640,180 640,380 680,420 800,420" stroke-width="1.5"/>' +
    '<polyline points="640,280 580,280 540,320 540,450" stroke-width="1.5"/>' +

    // IC chip body (QFP)
    '<rect x="270" y="210" width="120" height="100" rx="4" stroke-width="1.5"/>' +
    // Pin 1 marker dot
    '<circle cx="280" cy="220" r="3" fill="rgba(77,166,255,0.9)" stroke="none"/>' +
    // Left pins
    '<line x1="270" y1="232" x2="240" y2="232" stroke-width="1.2"/>' +
    '<line x1="270" y1="252" x2="240" y2="252" stroke-width="1.2"/>' +
    '<line x1="270" y1="272" x2="240" y2="272" stroke-width="1.2"/>' +
    '<line x1="270" y1="292" x2="240" y2="292" stroke-width="1.2"/>' +
    // Right pins
    '<line x1="390" y1="232" x2="420" y2="232" stroke-width="1.2"/>' +
    '<line x1="390" y1="252" x2="420" y2="252" stroke-width="1.2"/>' +
    '<line x1="390" y1="272" x2="420" y2="272" stroke-width="1.2"/>' +
    '<line x1="390" y1="292" x2="420" y2="292" stroke-width="1.2"/>' +
    // Top pins
    '<line x1="294" y1="210" x2="294" y2="182" stroke-width="1.2"/>' +
    '<line x1="318" y1="210" x2="318" y2="182" stroke-width="1.2"/>' +
    '<line x1="342" y1="210" x2="342" y2="182" stroke-width="1.2"/>' +
    '<line x1="366" y1="210" x2="366" y2="182" stroke-width="1.2"/>' +
    // Bottom pins
    '<line x1="294" y1="310" x2="294" y2="340" stroke-width="1.2"/>' +
    '<line x1="318" y1="310" x2="318" y2="340" stroke-width="1.2"/>' +
    '<line x1="342" y1="310" x2="342" y2="340" stroke-width="1.2"/>' +
    '<line x1="366" y1="310" x2="366" y2="340" stroke-width="1.2"/>' +
    // IC pin traces connecting to highways
    '<polyline points="240,232 200,232 200,160" stroke-width="1.2"/>' +
    '<polyline points="240,272 200,272 170,310" stroke-width="1.2"/>' +
    '<polyline points="420,252 452,252 452,140" stroke-width="1.2"/>' +
    '<polyline points="294,182 294,140 500,140" stroke-width="1.2"/>' +
    '<polyline points="318,340 318,360 260,360" stroke-width="1.2"/>' +
    '<polyline points="366,340 366,410" stroke-width="1.2"/>' +

    // Pads (large)
    '<circle cx="200" cy="70" r="5" stroke-width="2"/>' +
    '<circle cx="200" cy="70" r="2.5" fill="rgba(77,166,255,0.8)" stroke="none"/>' +
    '<circle cx="240" cy="30" r="4" stroke-width="1.5"/>' +
    '<circle cx="500" cy="30" r="4" stroke-width="1.5"/>' +
    '<circle cx="500" cy="100" r="4" stroke-width="1.5"/>' +
    '<circle cx="80" cy="200" r="4" stroke-width="1.5"/>' +
    '<circle cx="380" cy="410" r="5" stroke-width="2"/>' +
    '<circle cx="380" cy="410" r="2.5" fill="rgba(77,166,255,0.8)" stroke="none"/>' +
    '<circle cx="640" cy="280" r="4" stroke-width="1.5"/>' +
    '<circle cx="130" cy="450" r="4" stroke-width="1.5"/>' +

    // Vias (small rings with center dot)
    '<circle cx="540" cy="140" r="3.5" stroke-width="1.5"/>' +
    '<circle cx="540" cy="140" r="1.2" fill="rgba(77,166,255,0.7)" stroke="none"/>' +
    '<circle cx="640" cy="180" r="3.5" stroke-width="1.5"/>' +
    '<circle cx="640" cy="180" r="1.2" fill="rgba(77,166,255,0.7)" stroke="none"/>' +
    '<circle cx="452" cy="140" r="3" stroke-width="1.5"/>' +
    '<circle cx="200" cy="232" r="3" stroke-width="1.5"/>' +

    // Capacitor pair
    '<rect x="560" y="318" width="14" height="22" rx="2" stroke-width="1.2"/>' +
    '<rect x="582" y="318" width="14" height="22" rx="2" stroke-width="1.2"/>' +
    '<polyline points="567,340 567,358 589,358 589,340" stroke-width="1"/>' +

    // Resistor
    '<rect x="118" y="378" width="42" height="16" rx="4" stroke-width="1.2"/>' +
    '<line x1="118" y1="386" x2="94" y2="386" stroke-width="1.2"/>' +
    '<line x1="160" y1="386" x2="184" y2="386" stroke-width="1.2"/>' +
    '<circle cx="94" cy="386" r="2.5" stroke-width="1.2"/>' +
    '<circle cx="184" cy="386" r="2.5" stroke-width="1.2"/>' +

    // Ground plane (dashed outline)
    '<rect x="20" y="510" width="180" height="68" rx="6" stroke-width="0.8" stroke-dasharray="6,3" opacity="0.6"/>' +

    '</g></svg>';

  var pcbEl = document.createElement('div');
  pcbEl.id = 'pcb-bg';
  pcbEl.setAttribute('aria-hidden', 'true');
  pcbEl.style.backgroundImage = 'url("data:image/svg+xml,' + encodeURIComponent(pcbSvg) + '")';
  var pcbHiddenMask = 'radial-gradient(circle 0px at 0px 0px, transparent 100%)';
  pcbEl.style.maskImage = pcbHiddenMask;
  pcbEl.style.webkitMaskImage = pcbHiddenMask;
  document.body.appendChild(pcbEl);

  /* ── 4. Cursor glow ───────────────────────────────────────────────
     Appended AFTER pcb-bg so the glow sits on top and illuminates
     the traces beneath via screen blend on the pcb layer.
     Lerp at 0.13 for snappy-but-smooth feel.
  ------------------------------------------------------------------ */
  var glow = document.createElement('div');
  glow.id = 'cursor-glow';
  glow.setAttribute('aria-hidden', 'true');
  document.body.appendChild(glow);

  var mx = 0, my = 0, gx = -300, gy = -300, glowActive = false;

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX;
    my = e.clientY;
    if (!glowActive) { gx = mx; gy = my; glowActive = true; glow.style.opacity = '1'; }
  });
  document.addEventListener('mouseleave', function () {
    glow.style.opacity = '0';
    glowActive = false;
    pcbEl.style.maskImage = pcbHiddenMask;
    pcbEl.style.webkitMaskImage = pcbHiddenMask;
  });

  function tickGlow() {
    gx += (mx - gx) * 0.13;
    gy += (my - gy) * 0.13;
    glow.style.transform = 'translate(' + (gx - 225) + 'px, ' + (gy - 225) + 'px)';
    if (glowActive) {
      var mask = 'radial-gradient(circle 180px at ' + gx + 'px ' + gy + 'px, black 0%, transparent 100%)';
      pcbEl.style.maskImage = mask;
      pcbEl.style.webkitMaskImage = mask;
    }
    requestAnimationFrame(tickGlow);
  }
  tickGlow();

  /* ── 5. Per-card unique hue shift ─────────────────────────────────
     Each card on the page gets its own dark tinted bg color,
     assigned in order from a curated palette.
  ------------------------------------------------------------------ */
  var CARD_HUES = [
    '#071220', // deep blue
    '#0c0715', // deep purple
    '#071a14', // deep teal
    '#18100a', // deep amber
    '#07131c', // deep cyan
    '#160713', // deep magenta
    '#0b1508', // deep forest
    '#1a0a0a', // deep rust
    '#0a0c1a', // deep indigo
    '#0f1508', // dark olive
  ];

  function initBgTints() {
    var cards = document.querySelectorAll(
      '.card, .feature-card, .how-step, .platform-card, .dl-card'
    );
    cards.forEach(function (el, i) {
      var tint = CARD_HUES[i % CARD_HUES.length];
      el.addEventListener('mouseenter', function () {
        document.body.style.backgroundColor = tint;
      });
      el.addEventListener('mouseleave', function () {
        document.body.style.backgroundColor = '';
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBgTints);
  } else { initBgTints(); }

  /* ── 6. Scroll reveal ────────────────────────────────────────────*/
  var REVEAL_SELECTORS = [
    '.card', '.feature-card', '.section-heading', '.subtitle',
    '.project-header', '.project-body', '.tech-tags',
    '.project-downloads', '.back-link', '.how-step',
    '.platform-card', '.requirements', '.roadmap', '.how-it-works', '.dl-card',
  ];
  var STAGGER_PARENTS = [
    '.project-grid', '.features', '.how-steps', '.platform-guides', '.dl-grid',
  ];

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -24px 0px' });

  function initReveal() {
    REVEAL_SELECTORS.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        if (el.closest('.hero')) return;
        el.classList.add('reveal');
        io.observe(el);
      });
    });
    STAGGER_PARENTS.forEach(function (sel) {
      var parent = document.querySelector(sel);
      if (!parent) return;
      Array.from(parent.children).forEach(function (child, i) {
        child.style.transitionDelay = (i * 0.09) + 's';
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReveal);
  } else { initReveal(); }

  /* ── 7. Nav scroll tint ──────────────────────────────────────────*/
  var nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('nav-scrolled', window.scrollY > 12);
    }, { passive: true });
  }

  /* ── 8. Nav name scramble ─────────────────────────────────────── */
  var navName = document.querySelector('.nav-name');
  if (navName) {
    var SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>#/!';
    var navScrambling = false;

    navName.addEventListener('click', function () {
      if (navScrambling) return;
      navScrambling = true;

      var original = navName.textContent;
      var chars = original.split('');
      var SHUFFLE_MS = 30;
      var INITIAL_MS = 300;
      var RESOLVE_MS = 75;
      var startTime  = Date.now();

      var interval = setInterval(function () {
        var elapsed = Date.now() - startTime;
        var result = chars.map(function (c, i) {
          if (c === ' ') return ' ';
          var resolveAt = INITIAL_MS + i * RESOLVE_MS;
          if (elapsed >= resolveAt) return c;
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        });
        navName.textContent = result.join('');

        var lastIdx = chars.length - 1;
        while (lastIdx > 0 && chars[lastIdx] === ' ') lastIdx--;
        var doneAt = INITIAL_MS + lastIdx * RESOLVE_MS + 120;

        if (elapsed >= doneAt) {
          clearInterval(interval);
          navName.textContent = original;
          navScrambling = false;
          document.body.classList.remove('page-loaded');
          setTimeout(function () { window.location.href = 'index.html'; }, 290);
        }
      }, SHUFFLE_MS);
    });
  }

  /* ── 9. Nav link scramble ────────────────────────────────────────
     Same speed/style as the nav-name scramble, single color.
     Attached directly on each <a> so stopPropagation() prevents the
     section-2 fade handler from also firing on the same click.
  ------------------------------------------------------------------ */
  function initNavLinkScramble() {
    var navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        var href = link.getAttribute('href');
        var SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>#/!';
        var SHUFFLE_MS = 30;
        var INITIAL_MS = 300;
        var RESOLVE_MS = 75;

        var original = link.textContent;
        var chars    = original.split('');
        var startTime = Date.now();

        var interval = setInterval(function () {
          var elapsed = Date.now() - startTime;
          var result = chars.map(function (c, i) {
            if (c === ' ') return ' ';
            var resolveAt = INITIAL_MS + i * RESOLVE_MS;
            if (elapsed >= resolveAt) return c;
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          });
          link.textContent = result.join('');

          var lastIdx = chars.length - 1;
          while (lastIdx > 0 && chars[lastIdx] === ' ') lastIdx--;
          var doneAt = INITIAL_MS + lastIdx * RESOLVE_MS + 120;

          if (elapsed >= doneAt) {
            clearInterval(interval);
            link.textContent = original;
            document.body.classList.remove('page-loaded');
            setTimeout(function () { window.location.href = href; }, 290);
          }
        }, SHUFFLE_MS);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavLinkScramble);
  } else { initNavLinkScramble(); }

  /* ── 10. Hero eyebrow rainbow scramble ──────────────────────────
     Runs on page load after a short delay, then loops every ~8s.
     Each scrambled character gets a unique hue that shifts per frame.
  ------------------------------------------------------------------ */
  var eyebrow = document.querySelector('.hero-eyebrow');
  if (eyebrow) {
    var EB_CHARS    = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>#/!';
    var EB_HUES     = [38, 60, 120, 200, 260, 320, 14, 180, 280, 340];
    var ebScrambling = false;

    function runEyebrowScramble() {
      if (ebScrambling) return;
      ebScrambling = true;

      var original = eyebrow.textContent;
      var chars    = original.split('');
      var SHUFFLE_MS  = 28;
      var INITIAL_MS  = 500;
      var RESOLVE_MS  = 90;
      var startTime   = Date.now();
      var hueOffset   = 0;

      var interval = setInterval(function () {
        var elapsed = Date.now() - startTime;
        hueOffset += 4;

        var spans = chars.map(function (c, i) {
          if (c === ' ') return ' ';
          var resolveAt = INITIAL_MS + i * RESOLVE_MS;
          if (elapsed >= resolveAt) {
            return '<span style="color:var(--blue-mid)">' + c + '</span>';
          }
          var hue = (EB_HUES[i % EB_HUES.length] + hueOffset) % 360;
          var sat = 85 + Math.round(Math.sin(elapsed / 80 + i) * 10);
          var lit = 62 + Math.round(Math.cos(elapsed / 60 + i * 0.7) * 8);
          var randomChar = EB_CHARS[Math.floor(Math.random() * EB_CHARS.length)];
          return '<span style="color:hsl(' + hue + ',' + sat + '%,' + lit + '%)">' + randomChar + '</span>';
        });
        eyebrow.innerHTML = spans.join('');

        var lastIdx = chars.length - 1;
        while (lastIdx > 0 && chars[lastIdx] === ' ') lastIdx--;
        var doneAt = INITIAL_MS + lastIdx * RESOLVE_MS + 150;

        if (elapsed >= doneAt) {
          clearInterval(interval);
          eyebrow.textContent = original;
          ebScrambling = false;
        }
      }, SHUFFLE_MS);
    }

    // Fire once on load, then repeat every 8 seconds
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        setTimeout(runEyebrowScramble, 1200);
      });
    } else {
      setTimeout(runEyebrowScramble, 1200);
    }
    setInterval(function () {
      setTimeout(runEyebrowScramble, 0);
    }, 8000);
  }

})();

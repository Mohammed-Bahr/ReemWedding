/* ============================================================
   1) إخفاء شاشة التحميل بعد اكتمال تحميل الصفحة
============================================================ */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hide');
  }, 900);
});

/* ============================================================
   2) تشغيل تسلسل الافتتاح جملة بجملة + ظهور تدريجي عند التمرير
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const lines = [
    { el: document.getElementById('bismillah'), delay: 1400 },
    { el: document.getElementById('ayah'), delay: 3400 },
    { el: document.getElementById('sadaqallah'), delay: 6600 },
  ];
  lines.forEach(item => {
    setTimeout(() => item.el.classList.add('show'), item.delay);
  });
  setTimeout(() => document.getElementById('scrollHint').classList.add('show'), 7600);

  /* الكلمة الرئيسية تظهر جملة بجملة عند وصولها للشاشة */
  const speechParas = document.querySelectorAll('#speechText p');
  let speechRevealed = false;
  const speechObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !speechRevealed) {
        speechRevealed = true;
        speechParas.forEach((p, i) => {
          setTimeout(() => p.classList.add('show'), i * 550);
        });
      }
    });
  }, { threshold: 0.25 });
  speechObserver.observe(document.getElementById('speech'));

  /* ظهور تدريجي لعناصر .reveal عند التمرير */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
});

/* ============================================================
   3) توليد الجسيمات الذهبية العائمة والبتلات
============================================================ */
(function spawnParticles() {
  const container = document.getElementById('particles');
  const petals = ['❀', '✿', '❁'];

  function makeParticle() {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = 3 + Math.random() * 5;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.setProperty('--drift', (Math.random() * 80 - 40) + 'px');
    p.style.animationDuration = (8 + Math.random() * 10) + 's';
    container.appendChild(p);
    setTimeout(() => p.remove(), 19000);
  }

  function makePetal() {
    const p = document.createElement('div');
    p.className = 'petal';
    p.textContent = petals[Math.floor(Math.random() * petals.length)];
    p.style.left = Math.random() * 100 + 'vw';
    p.style.fontSize = (12 + Math.random() * 12) + 'px';
    p.style.animationDuration = (10 + Math.random() * 8) + 's';
    container.appendChild(p);
    setTimeout(() => p.remove(), 19000);
  }

  setInterval(makeParticle, 700);
  setInterval(makePetal, 2200);
  for (let i = 0; i < 12; i++) setTimeout(makeParticle, i * 300);
})();

/* ============================================================
   4) طيور متحركة (Bird Spawner)
============================================================ */
(function spawnBirds() {
  const BIRD_CONFIG = {
    spawnInterval: 8000,
    speedRange: [8, 15],
    sizeRange: [0.6, 1.2],
    yRange: [20, 75],
    flapDurationRange: [0.3, 0.6],
  };

  function birdSvg() {
    return '<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M5 25 Q20 5 30 18 Q40 5 55 25 Q40 22 30 28 Q20 22 5 25Z" fill="currentColor" />' +
      '</svg>';
  }

  function createBird() {
    const b = document.createElement('div');
    b.className = 'bird';
    const size = 28 + Math.random() * 24;
    const flyDuration = BIRD_CONFIG.speedRange[0] + Math.random() * (BIRD_CONFIG.speedRange[1] - BIRD_CONFIG.speedRange[0]);
    const yPos = BIRD_CONFIG.yRange[0] + Math.random() * (BIRD_CONFIG.yRange[1] - BIRD_CONFIG.yRange[0]);
    const flapDuration = BIRD_CONFIG.flapDurationRange[0] + Math.random() * (BIRD_CONFIG.flapDurationRange[1] - BIRD_CONFIG.flapDurationRange[0]);
    const drift = -60 + Math.random() * 120;
    const rtl = Math.random() > 0.5;

    b.style.width = size + 'px';
    b.style.height = size * 0.67 + 'px';
    b.style.top = yPos + 'vh';
    b.style.setProperty('--fly-duration', flyDuration + 's');
    b.style.setProperty('--flap-speed', flapDuration + 's');
    b.style.setProperty('--fly-drift', drift + 'px');
    b.innerHTML = birdSvg();

    if (rtl) {
      b.style.right = '-20vw';
      b.classList.add('bird-fly-rtl');
    } else {
      b.style.left = '-20vw';
      b.classList.add('bird-fly');
    }

    const container = document.getElementById('particles');
    container.appendChild(b);

    setTimeout(() => b.remove(), (flyDuration + 1) * 1000);
  }

  setInterval(createBird, BIRD_CONFIG.spawnInterval);
  setTimeout(createBird, 3000);
  setTimeout(createBird, 6000);
})();

/* ============================================================
   5) العد التنازلي حتى موعد الحفل
   ملاحظة: التاريخ الموضوع هنا هو تاريخ افتراضي (placeholder)
   يجب استبداله بتاريخ الحفل الفعلي عند التخصيص
============================================================ */
(function countdown() {
  const weddingDate = new Date("2026-07-31T20:00:00").getTime();

  const els = {
    days: document.getElementById('cd-days'),
    hours: document.getElementById('cd-hours'),
    minutes: document.getElementById('cd-minutes'),
    seconds: document.getElementById('cd-seconds'),
  };
  let prev = {};

  function tick() {
    const now = Date.now();
    let diff = weddingDate - now;
    if (diff < 0) diff = 0;

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    const vals = { days: d, hours: h, minutes: m, seconds: s };
    Object.keys(vals).forEach(key => {
      const formatted = String(vals[key]).padStart(2, '0');
      if (prev[key] !== formatted) {
        els[key].textContent = formatted;
        els[key].classList.remove('tick');
        void els[key].offsetWidth; /* إعادة تشغيل الأنيميشن */
        els[key].classList.add('tick');
        prev[key] = formatted;
      }
    });
  }
  tick();
  setInterval(tick, 1000);
})();

/* ============================================================
   5) تشغيل الموسيقى تلقائيًا عند فتح الصفحة
   ------------------------------------------------------------
   ملاحظة تقنية مهمة:
   تفرض جميع المتصفحات الحديثة (Chrome, Safari, Firefox, Edge)
   سياسة أمان تمنع تشغيل أي صوت تلقائيًا بصوت مسموع قبل أي
   تفاعل من المستخدم مع الصفحة أو الموقع. هذا القيد يُفرض على
   مستوى المتصفح نفسه ولا يمكن تجاوزه بأي كود برمجي.
   لذلك الكود أدناه:
   1) يحاول تشغيل الموسيقى تلقائيًا فور تحميل الصفحة مباشرة.
   2) إن نجحت المحاولة (بعض المتصفحات تسمح بذلك) ستُسمع الموسيقى
      فورًا دون أي ضغط على أي زر.
   3) إن منعها المتصفح، سيتم تشغيلها تلقائيًا مع أول تفاعل
      يقوم به الزائر مع الصفحة (تمرير، لمس، ضغطة في أي مكان)
      دون الحاجة لوجود أو الضغط على زر تشغيل مخصص.
   المؤشر الصغير أسفل يسار الشاشة هو فقط لعرض الحالة (تشغيل/كتم)
   وليس شرطًا للتشغيل.
============================================================ */
(function autoPlayMusic() {
  const audio = document.getElementById('bgMusic');
  const indicator = document.getElementById('music-indicator');
  const icon = document.getElementById('musicIcon');
  let started = false;

  function markPlaying() {
    started = true;
    indicator.classList.remove('muted');
    icon.textContent = '🔊';
  }
  function markMuted() {
    started = false;
    indicator.classList.add('muted');
    icon.textContent = '🔈';
  }

  function tryPlay() {
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.then(markPlaying).catch(markMuted);
    }
  }

  /* المحاولة الفورية عند تحميل الصفحة */
  window.addEventListener('DOMContentLoaded', tryPlay);

  /* شبكة أمان: أول تفاعل من أي نوع في أي مكان بالصفحة يشغّل
     الموسيقى تلقائيًا إن كان المتصفح قد منع التشغيل الفوري */
  const fallbackEvents = ['click', 'touchstart', 'keydown', 'scroll', 'mousemove'];
  function fallbackStart() {
    if (!started) tryPlay();
    fallbackEvents.forEach(evt => document.removeEventListener(evt, fallbackStart));
  }
  fallbackEvents.forEach(evt => document.addEventListener(evt, fallbackStart, { once: false, passive: true }));

  /* زر المؤشر: تشغيل / إيقاف الموسيقى */
  indicator.addEventListener('click', (e) => {
    e.stopPropagation();
    if (audio.paused) {
      tryPlay();
    } else {
      audio.pause();
      markMuted();
    }
  });
})();

/* ============================================================
   6) الزهور المتساقطة من الجانبين أثناء التمرير
============================================================ */
(function initSideFlowers() {
  'use strict';

  /* --- الزهور والأنماط اللونية --- */
  var FLOWER_TYPES = ['❀', '✿', '❁', '🌸', '🌺'];
  var FLOWER_COLORS = [
    'var(--gold)', 'var(--gold-light)', 'var(--gold-dark)',
    'var(--cream)', 'var(--ivory)', '#e8b4b8'
  ];

  /**
   * Obtient la configuration selon la largeur de l'écran
   */
  function getConfig() {
    var w = window.innerWidth;
    if (w > 1024) {
      return { maxFlowers: 20, intervalLeft: [400, 700], intervalRight: [500, 900], sizeMin: 16, sizeMax: 28, speedMin: 6, speedMax: 14 };
    } else if (w > 480) {
      return { maxFlowers: 14, intervalLeft: [500, 900], intervalRight: [600, 1000], sizeMin: 14, sizeMax: 24, speedMin: 6, speedMax: 12 };
    } else {
      return { maxFlowers: 10, intervalLeft: [600, 1000], intervalRight: [700, 1200], sizeMin: 12, sizeMax: 20, speedMin: 5, speedMax: 10 };
    }
  }

  function rand(min, max) { return Math.random() * (max - min) + min; }
  function randInt(min, max) { return Math.floor(rand(min, max + 1)); }

  /* --- حالة المولّد --- */
  var container = document.getElementById('side-flowers');
  if (!container) return;

  var config = getConfig();
  var activeFlowers = 0;
  var leftTimer = null;
  var rightTimer = null;
  var isRunning = false;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- إنشاء زهرة واحدة --- */
  function spawnFlower(side) {
    if (reducedMotion) return null;
    if (activeFlowers >= config.maxFlowers) return null;

    var el = document.createElement('div');
    el.className = 'side-flower side-flower--' + side;
    el.textContent = FLOWER_TYPES[randInt(0, FLOWER_TYPES.length - 1)];
    el.style.color = FLOWER_COLORS[randInt(0, FLOWER_COLORS.length - 1)];
    el.style.fontSize = rand(config.sizeMin, config.sizeMax) + 'px';

    /* valeurs aléatoires pour l'animation CSS */
    var speed = rand(config.speedMin, config.speedMax);
    el.style.animationDuration = speed + 's';
    el.style.setProperty('--flower-opacity', rand(0.4, 0.75));
    el.style.setProperty('--sway-1', rand(-25, 25) + 'px');
    el.style.setProperty('--sway-2', rand(-20, 20) + 'px');
    el.style.setProperty('--sway-3', rand(-30, 30) + 'px');
    el.style.setProperty('--sway-4', rand(-15, 15) + 'px');
    el.style.setProperty('--sway-5', rand(-10, 10) + 'px');
    el.style.setProperty('--rot-1', rand(20, 50) + 'deg');
    el.style.setProperty('--rot-2', rand(60, 110) + 'deg');
    el.style.setProperty('--rot-3', rand(100, 160) + 'deg');
    el.style.setProperty('--rot-4', rand(150, 200) + 'deg');
    el.style.setProperty('--rot-5', rand(180, 250) + 'deg');

    /* position verticale de départ aléatoire sur le bord */
    el.style.top = rand(0, 90) + 'vh';

    container.appendChild(el);
    activeFlowers++;

    /* nettoyage automatique à la fin de l'animation */
    el.addEventListener('animationend', function onEnd() {
      el.removeEventListener('animationend', onEnd);
      el.remove();
      activeFlowers = Math.max(0, activeFlowers - 1);
    });

    return el;
  }

  /* --- démarrage des intervalles --- */
  function start() {
    if (isRunning || reducedMotion) return;
    isRunning = true;

    var c = getConfig();
    function leftSpawn() { spawnFlower('left'); }
    function rightSpawn() { spawnFlower('right'); }

    leftTimer = setInterval(leftSpawn, rand(c.intervalLeft[0], c.intervalLeft[1]));
    rightTimer = setInterval(rightSpawn, rand(c.intervalRight[0], c.intervalRight[1]));
  }

  /* --- arrêt des intervalles --- */
  function stop() {
    isRunning = false;
    if (leftTimer) { clearInterval(leftTimer); leftTimer = null; }
    if (rightTimer) { clearInterval(rightTimer); rightTimer = null; }
  }

  /* --- destruction complète --- */
  function destroy() {
    stop();
    var flowers = container.querySelectorAll('.side-flower');
    for (var i = 0; i < flowers.length; i++) { flowers[i].remove(); }
    activeFlowers = 0;
  }

  /* --- ré-écoute du redimensionnement --- */
  var resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
      config = getConfig();
      if (activeFlowers > config.maxFlowers) {
        /* réduire le nombre de fleurs si nécessaire */
        var flowers = container.querySelectorAll('.side-flower');
        var toRemove = activeFlowers - config.maxFlowers;
        for (var i = 0; i < toRemove && i < flowers.length; i++) {
          flowers[i].classList.add('side-flower--exiting');
          setTimeout(function(el) { el.remove(); activeFlowers = Math.max(0, activeFlowers - 1); }, 600, flowers[i]);
        }
      }
    }, 300);
  });

  /* --- ré-écoute des préférences de mouvement --- */
  var motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
  motionMedia.addEventListener('change', function(e) {
    reducedMotion = e.matches;
    if (reducedMotion) { destroy(); }
    else { start(); }
  });

  /* --- intégration au cycle de vie de la page --- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(start, 1200); /* après le loader */
    });
  } else {
    setTimeout(start, 1200);
  }
})();

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
  function markBlocked() {
    indicator.classList.add('muted');
    icon.textContent = '🔈';
  }

  function tryPlay() {
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.then(markPlaying).catch(markBlocked);
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

  /* المؤشر يسمح بكتم/إعادة تشغيل الصوت يدويًا لمن يرغب فقط */
  indicator.addEventListener('click', () => {
    if (audio.paused) {
      tryPlay();
    } else {
      audio.pause();
      markBlocked();
    }
  });
})();

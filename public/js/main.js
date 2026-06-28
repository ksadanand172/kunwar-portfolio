/* ══════════════════════════════════════════════
   Kunwar Sadanand — Portfolio JavaScript
   ══════════════════════════════════════════════ */

/* ══ EASE ══ */
const EASE = t => 1 - Math.pow(1 - t, 3);

/* ══ CURSOR ══ */
const csrEl = document.getElementById('csr');
const dot = document.getElementById('csr-dot');
const trail = document.getElementById('csr-trail');
let mx = -100, my = -100, tx = -100, ty = -100;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function animCsr() {
  tx += (mx - tx) * 0.14; ty += (my - ty) * 0.14;
  csrEl.style.transform = `translate(${mx}px,${my}px)`;
  trail.style.transform = `translate(${tx - mx}px,${ty - my}px) translate(-50%,-50%)`;
  requestAnimationFrame(animCsr);
})();

/* ══ HERO TITLE CHAR SPLIT ══ */
(function () {
  const el = document.getElementById('heroTitle');
  const words = ['Kunwar', 'Sadanand'];
  const delays = [0.5, 0.75];
  el.innerHTML = words.map((w, wi) =>
    `<span class="word">${[...w].map((c, ci) =>
      `<span class="char" style="animation-delay:${delays[wi] + ci * 0.045}s">${c}</span>`
    ).join('')}</span>${wi < words.length - 1 ? ' ' : ''}`
  ).join('<br/>');
})();

/* ══ MARQUEE DUPLICATE ══ */
(function () {
  const t = document.getElementById('marqueeTrack');
  t.innerHTML += t.innerHTML;
})();

/* ══ SCROLL PROGRESS ══ */
const prog = document.getElementById('scroll-progress');
const navEl = document.getElementById('nav');
window.addEventListener('scroll', () => {
  const s = window.scrollY;
  const max = document.body.scrollHeight - window.innerHeight;
  prog.style.width = (s / max * 100) + '%';
  navEl.classList.toggle('scrolled', s > 60);
}, { passive: true });

/* ══ SCROLL REVEAL ══ */
const srObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
}, { threshold: 0.08, rootMargin: '0px 0px -36px 0px' });
document.querySelectorAll('.sr').forEach(el => srObs.observe(el));

/* ══ COUNTERS ══ */
const cntObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = +el.dataset.t, dur = 1400, s0 = performance.now();
    (function tick(now) {
      const p = Math.min((now - s0) / dur, 1);
      el.textContent = Math.round(EASE(p) * target);
      if (p < 1) requestAnimationFrame(tick);
    })(s0);
    cntObs.unobserve(el);
  });
}, { threshold: 0.3 });
document.querySelectorAll('.counter').forEach(el => cntObs.observe(el));

/* ══ VIDEO PARALLAX ON HERO ══ */
const heroVid = document.getElementById('hero-video');
const heroOverlay = document.getElementById('hero-overlay');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y < window.innerHeight) {
    heroVid.style.transform = `scale(1.05) translateY(${y * 0.18}px)`;
    heroOverlay.style.opacity = Math.min(1, 0.7 + y / window.innerHeight * 0.5);
  }
}, { passive: true });

/* ══ PROJECT CARD MINI CANVASES ══ */
(function () {
  const cfgs = [
    { id: 'pc1', color: [123, 104, 238], style: 'rings' },
    { id: 'pc2', color: [0, 212, 255], style: 'grid' },
    { id: 'pc3', color: [162, 146, 247], style: 'neural' },
    { id: 'pc4', color: [255, 179, 71], style: 'bars' },
    { id: 'pc5', color: [0, 232, 122], style: 'particles' },
    { id: 'pc6', color: [244, 114, 182], style: 'radar' },
  ];
  cfgs.forEach(({ id, color: [r, g, b], style }) => {
    const cv = document.getElementById(id);
    if (!cv) return;
    cv.width = cv.parentElement.offsetWidth || 340;
    cv.height = 196;
    const ctx = cv.getContext('2d');
    let t = 0;
    const pts = style === 'particles'
      ? Array.from({ length: 22 }, () => ({
        x: Math.random() * cv.width, y: Math.random() * cv.height,
        vx: (Math.random() - .5) * 0.45, vy: (Math.random() - .5) * 0.45
      }))
      : null;

    function frame() {
      ctx.clearRect(0, 0, cv.width, cv.height);
      const cx = cv.width / 2, cy = cv.height / 2;
      const c = (a) => `rgba(${r},${g},${b},${a})`;

      if (style === 'rings') {
        for (let i = 5; i >= 0; i--) {
          const rad = 20 + i * 26 + Math.sin(t * 0.7 + i * 0.6) * 7;
          ctx.beginPath();
          ctx.arc(cx + Math.cos(t * 0.25 + i) * 12, cy + Math.sin(t * 0.3 + i) * 9, rad, 0, Math.PI * 2);
          ctx.strokeStyle = c(0.05 + 0.04 * Math.sin(t * 0.4 + i));
          ctx.lineWidth = 1.2; ctx.stroke();
        }
        const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 85);
        grd.addColorStop(0, c(0.14)); grd.addColorStop(1, c(0));
        ctx.fillStyle = grd; ctx.fillRect(0, 0, cv.width, cv.height);
      }
      else if (style === 'grid') {
        const off = (t * 14) % 38;
        ctx.strokeStyle = c(0.08); ctx.lineWidth = 0.6;
        for (let x = -38; x < cv.width + 38; x += 38) { ctx.beginPath(); ctx.moveTo(x + off, 0); ctx.lineTo(x + off, cv.height); ctx.stroke(); }
        for (let y = -38; y < cv.height + 38; y += 38) { ctx.beginPath(); ctx.moveTo(0, y + off); ctx.lineTo(cv.width, y + off); ctx.stroke(); }
        const g2 = ctx.createLinearGradient(0, 0, cv.width, cv.height);
        g2.addColorStop(0, c(0.06)); g2.addColorStop(.5, c(0.15)); g2.addColorStop(1, c(0.03));
        ctx.fillStyle = g2; ctx.fillRect(0, 0, cv.width, cv.height);
      }
      else if (style === 'neural') {
        const p5 = [
          { x: cx - 85, y: cy - 28 }, { x: cx - 25, y: cy + 42 },
          { x: cx + 42, y: cy - 48 }, { x: cx + 88, y: cy + 18 }, { x: cx, y: cy }
        ].map((p, i) => ({
          x: p.x + Math.sin(t * 0.7 + i * 1.3) * 5,
          y: p.y + Math.cos(t * 0.5 + i * 0.9) * 5
        }));
        p5.forEach((p, i) => p5.forEach((q, j) => {
          if (i >= j) return;
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 170) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = c((1 - d / 170) * 0.14); ctx.lineWidth = 0.9; ctx.stroke();
          }
        }));
        p5.forEach(p => { ctx.beginPath(); ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2); ctx.fillStyle = c(0.55); ctx.fill(); });
      }
      else if (style === 'bars') {
        for (let i = 0; i < 9; i++) {
          const h = 35 + Math.sin(t * 1.1 + i * 0.85) * 32 + 28;
          const x = cx - 9 * 13 + i * 26;
          ctx.fillStyle = c(0.08 + 0.09 * Math.sin(t * 0.8 + i * 0.6));
          ctx.fillRect(x, cy + 42 - h, 18, h);
        }
      }
      else if (style === 'particles') {
        pts.forEach(p => {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > cv.width) p.vx *= -1;
          if (p.y < 0 || p.y > cv.height) p.vy *= -1;
          ctx.beginPath(); ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = c(0.45); ctx.fill();
        });
        pts.forEach((p, i) => pts.forEach((q, j) => {
          if (i >= j) return;
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 82) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.strokeStyle = c((1 - d / 82) * 0.16); ctx.lineWidth = 0.6; ctx.stroke(); }
        }));
      }
      else if (style === 'radar') {
        [28, 56, 84, 112].forEach(rad => { ctx.beginPath(); ctx.arc(cx, cy, rad, 0, Math.PI * 2); ctx.strokeStyle = c(0.07); ctx.lineWidth = 0.8; ctx.stroke(); });
        const sw = (t * 0.9) % (Math.PI * 2);
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, 112, sw - 0.9, sw); ctx.closePath();
        ctx.fillStyle = c(0.1); ctx.fill();
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(sw) * 112, cy + Math.sin(sw) * 112);
        ctx.strokeStyle = c(0.55); ctx.lineWidth = 1.5; ctx.stroke();
        const bx = cx + Math.cos(sw - 0.35) * 74, by = cy + Math.sin(sw - 0.35) * 74;
        ctx.beginPath(); ctx.arc(bx, by, 3.5, 0, Math.PI * 2); ctx.fillStyle = c(0.85); ctx.fill();
      }
      t += 0.016;
      requestAnimationFrame(frame);
    }
    frame();
  });
})();

/* ══ 3D TILT & GLOW (Desktop Only) ══ */
const isTouch = window.matchMedia('(pointer: coarse)').matches;
if (!isTouch) {
  document.querySelectorAll('.exp-card, .proj-card, .hl-card, .test-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(700px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateZ(6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
  });
}

/* ══ NAV SECTION HIGHLIGHT ══ */
const navAs = document.querySelectorAll('.nav-links a');
new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navAs.forEach(a => a.style.color = '');
      const a = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (a) a.style.color = 'var(--ink)';
    }
  });
}, { threshold: 0.35 }).observe(document.getElementById('about'));
['about', 'experience', 'projects', 'highlights', 'expertise', 'contact'].forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      navAs.forEach(a => a.style.color = '');
      const a = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (a) a.style.color = 'var(--ink)';
    }
  }, { threshold: 0.3 }).observe(el);
});

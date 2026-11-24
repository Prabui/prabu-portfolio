/* ═══════════════════════════════════════════════════════════
   script.js — Prabu I Portfolio Animations
═══════════════════════════════════════════════════════════ */

// ── Always start at top on load/refresh ────────────────────
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);
document.documentElement.scrollTop = 0;
document.body.scrollTop = 0;

// ── Navbar scroll effect ────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Typewriter ──────────────────────────────────────────────
const phrases = [
  'Senior Automation Developer',
  'InDesign Script Expert',
  'Enfocus Switch Workflow Creator',
  'Photoshop API Developer',
  'UXP Plugin Builder',
  'Python Automation Engineer',
  'Creative Tech Specialist',
];
let pIdx = 0, cIdx = 0, deleting = false;
const tw = document.getElementById('typewriter');

function typewrite() {
  const phrase = phrases[pIdx];
  if (!deleting) {
    tw.textContent = phrase.slice(0, ++cIdx);
    if (cIdx === phrase.length) {
      deleting = true;
      setTimeout(typewrite, 2000);
      return;
    }
    setTimeout(typewrite, 70);
  } else {
    tw.textContent = phrase.slice(0, --cIdx);
    if (cIdx === 0) {
      deleting = false;
      pIdx = (pIdx + 1) % phrases.length;
    }
    setTimeout(typewrite, 35);
  }
}
typewrite();

// ── Code animation ──────────────────────────────────────────
const codeLines = [
  '<span style="color:#ff7b72">var</span> <span style="color:#79c0ff">doc</span> = app.activeDocument;',
  '',
  '<span style="color:#ff7b72">function</span> <span style="color:#d2a8ff">autoLayout</span>(doc) {',
  '  <span style="color:#79c0ff">doc</span>.pages.<span style="color:#ffa657">everyItem</span>().getElements()',
  '    .<span style="color:#ffa657">forEach</span>(<span style="color:#ff7b72">function</span>(page) {',
  '      applyMasterStyle(page);',
  '      fixTextFrames(page);',
  '      exportAsset(page);',
  '  });',
  '}',
  '',
  '<span style="color:#7ee787">// 90% manual effort eliminated ✓</span>',
  '<span style="color:#d2a8ff">autoLayout</span>(doc);',
];
const codeEl = document.getElementById('code-anim');
let lineIdx = 0, charIdx = 0, codeStr = '';

function typeCode() {
  if (lineIdx >= codeLines.length) return;
  const line = codeLines[lineIdx];
  if (charIdx <= line.length) {
    codeStr = codeLines.slice(0, lineIdx).join('\n')
      + (lineIdx > 0 ? '\n' : '')
      + line.slice(0, charIdx);
    codeEl.innerHTML = codeStr;
    charIdx++;
    setTimeout(typeCode, charIdx === 1 ? 200 : 22);
  } else {
    lineIdx++; charIdx = 0;
    setTimeout(typeCode, 100);
  }
}
setTimeout(typeCode, 800);

// ── Particle canvas ─────────────────────────────────────────
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const SNIPPETS = [
  'var doc=', '.jsx', 'ExtendScript', 'app.open()', '.forEach()', 'Python',
  'InDesign', '.py', 'automate()', 'Enfocus Switch', 'XML', 'XSLT', 'preflight',
  '//script', 'function()', 'return', 'new File()', '.pdf', 'batch()',
  'Illustrator', 'Photoshop', 'TypeScript', '.tsx', 'artLayer',
  'activeLayer', '.psd', 'pathItems', 'const ps=', 'async()', 'await',
  'swatchGroup', 'selection', 'interface{}', 'export default', '.ai',
];

const COLORS = [
  '#60a5fa',  // bright blue
  '#ff6b9d',  // bright pink
  '#a78bfa',  // bright purple
  '#34d399',  // bright green
  '#fbbf24',  // bright amber
  '#38bdf8',  // bright sky
  '#f472b6',  // bright rose
  '#4ade80',  // bright emerald
  '#fb923c',  // bright orange
  '#e879f9',  // bright fuchsia
];

const particles = Array.from({ length: 65 }, () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  vx: (Math.random() - 0.5) * 0.4,
  vy: -Math.random() * 0.7 - 0.2,
  alpha: Math.random() * 0.18 + 0.08,
  size: Math.random() * 13 + 10,
  text: SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)],
  color: COLORS[Math.floor(Math.random() * COLORS.length)],
}));

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;
    ctx.font = `${p.size}px 'Fira Code', monospace`;
    ctx.fillText(p.text, p.x, p.y);
    ctx.restore();
    p.x += p.vx; p.y += p.vy;
    if (p.y < -20) { p.y = canvas.height + 20; p.x = Math.random() * canvas.width; }
    if (p.x < -100 || p.x > canvas.width + 100) p.x = Math.random() * canvas.width;
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

// ── Scroll reveal ───────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObs.observe(el));

// ── Counter animation ───────────────────────────────────────
const statNums = document.querySelectorAll('.stat-num');
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.dataset.target;
      const dur = 1800;
      const step = dur / target;
      let cur = 0;
      const timer = setInterval(() => {
        cur++;
        el.textContent = cur;
        if (cur >= target) clearInterval(timer);
      }, step);
      counterObs.unobserve(el);
    }
  });
}, { threshold: 0.5 });
statNums.forEach(el => counterObs.observe(el));

// ── Skill bar animation ─────────────────────────────────────
const skillFills = document.querySelectorAll('.skill-fill');
const skillObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      setTimeout(() => { el.style.width = el.dataset.w + '%'; }, 200);
      skillObs.unobserve(el);
    }
  });
}, { threshold: 0.3 });
skillFills.forEach(el => skillObs.observe(el));

// ── Adobe app tooltip pulse ─────────────────────────────────
document.querySelectorAll('.adobe-app').forEach(app => {
  app.addEventListener('mouseenter', () => {
    app.querySelector('.app-icon').style.animation = 'none';
  });
});

// ── Active nav link highlight on scroll ────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? '#fff' : '';
  });
});

// ── Timeline scroll animations ──────────────────────────────
const timelineEl    = document.querySelector('.timeline');
const timelineItems = document.querySelectorAll('.timeline-item');

const tlObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const item  = entry.target;
    const index = [...timelineItems].indexOf(item);
    setTimeout(() => item.classList.add('tl-visible'), index * 150);
    tlObs.unobserve(item);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

timelineItems.forEach(item => tlObs.observe(item));

function growTimelineLine() {
  if (!timelineEl) return;
  const rect  = timelineEl.getBoundingClientRect();
  const pct   = Math.min(100, Math.max(0, ((window.innerHeight - rect.top) / rect.height) * 100));
  timelineEl.style.setProperty('--line-pct', pct + '%');
}
window.addEventListener('scroll', growTimelineLine, { passive: true });
growTimelineLine();

// ── Smooth hover tilt on project cards ─────────────────────
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    card.querySelector('.project-card-inner').style.transform =
      `rotateY(${180 + dx * 5}deg) rotateX(${-dy * 5}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.querySelector('.project-card-inner').style.transform = 'rotateY(180deg)';
    setTimeout(() => {
      card.querySelector('.project-card-inner').style.transform = '';
    }, 600);
  });
});

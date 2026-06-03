/* ═══════════════════════════════════════════════════════
   NEHA BHOYAR PORTFOLIO — script.js
   ═══════════════════════════════════════════════════════ */

// ─── Loader ───────────────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 1800);
});

// ─── Particles Canvas ─────────────────────────────────
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], mouse = { x: -999, y: -999 };

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const COLORS = ['168,85,247', '6,182,212', '236,72,153'];

  class Particle {
    constructor() { this.reset(true); }
    reset(init = false) {
      this.x  = Math.random() * W;
      this.y  = init ? Math.random() * H : H + 10;
      this.r  = Math.random() * 1.5 + 0.5;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = -(Math.random() * 0.4 + 0.1);
      this.alpha = Math.random() * 0.5 + 0.1;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      // Slight attraction to mouse
      const dx = mouse.x - this.x, dy = mouse.y - this.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 200) {
        this.x += dx * 0.0005;
        this.y += dy * 0.0005;
      }
      if (this.y < -10) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 120; i++) particles.push(new Particle());

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < 80) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(168,85,247,${(1 - d/80) * 0.07})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(animate);
  }
  animate();

  document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
})();

// ─── Typed Effect ──────────────────────────────────────
(function initTyped() {
  const el = document.getElementById('typed-text');
  if (!el) return;
  const strings = [
    'AI/ML Engineer',
    'Data Analyst',
    'Software Developer',
    'Python Developer',
    'Power BI Developer'
  ];
  let si = 0, ci = 0, deleting = false;

  function tick() {
    const current = strings[si];
    if (deleting) {
      el.textContent = current.substring(0, ci - 1);
      ci--;
      if (ci === 0) {
        deleting = false;
        si = (si + 1) % strings.length;
        setTimeout(tick, 400);
        return;
      }
      setTimeout(tick, 60);
    } else {
      el.textContent = current.substring(0, ci + 1);
      ci++;
      if (ci === current.length) {
        deleting = true;
        setTimeout(tick, 2200);
        return;
      }
      setTimeout(tick, 90);
    }
  }
  setTimeout(tick, 1200);
})();

// ─── Navbar scroll ──────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 30);
});

// ─── Scroll Progress ────────────────────────────────────
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  if (!progressBar) return;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const pct = window.scrollY / total;
  progressBar.style.transform = `scaleX(${pct})`;
});

// ─── Back to Top ────────────────────────────────────────
const btt = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  btt?.classList.toggle('visible', window.scrollY > 400);
});
btt?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ─── Mobile Menu ────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu?.classList.toggle('open');
});
mobileMenu?.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger?.classList.remove('active');
    mobileMenu.classList.remove('open');
  });
});

// ─── Theme Toggle ───────────────────────────────────────
const themeBtn = document.getElementById('theme-toggle');
const themeIcon = themeBtn?.querySelector('.theme-icon');
let darkMode = true;
themeBtn?.addEventListener('click', () => {
  darkMode = !darkMode;
  document.body.classList.toggle('light-mode', !darkMode);
  if (themeIcon) themeIcon.textContent = darkMode ? '☀' : '🌙';
});

// ─── Scroll Reveal ──────────────────────────────────────
(function initReveal() {
  const els = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  els.forEach(el => obs.observe(el));
})();

// ─── Skill Bars ─────────────────────────────────────────
(function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const w = target.getAttribute('data-width') || '0';
        target.style.width = w + '%';
        obs.unobserve(target);
      }
    });
  }, { threshold: 0.3 });
  fills.forEach(f => obs.observe(f));
})();

// ─── GitHub Contribution Grid ───────────────────────────
(function buildContribGrid() {
  const grid = document.getElementById('contrib-grid');
  if (!grid) return;
  const levels = [0,0,0,1,0,0,2,1,0,3,2,1,0,0,2,3,4,2,1,0,0,1,2,3,2,1,0,0,1,2,0,0,1,3,4,3,2,1,0,0,2,3,2,1,0,0,1,2,3,2,1,0,0,1];
  const total = 52 * 7;
  for (let i = 0; i < total; i++) {
    const cell = document.createElement('div');
    cell.className = 'contrib-cell';
    const base = levels[i % levels.length];
    const jitter = Math.floor(Math.random() * 2);
    const lvl = Math.min(4, Math.max(0, base + (Math.random() > 0.85 ? jitter : 0)));
    cell.classList.add(`cc${lvl}`);
    cell.title = `${lvl > 0 ? lvl + ' contribution' + (lvl > 1 ? 's' : '') : 'No contributions'}`;
    grid.appendChild(cell);
  }
})();

// ─── Contact Form ───────────────────────────────────────
document.getElementById('contact-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  const original = btn.textContent;
  btn.textContent = '✓ Message Sent!';
  btn.style.background = 'linear-gradient(135deg, #10b981, #06b6d4)';
  setTimeout(() => {
    btn.textContent = original;
    btn.style.background = '';
    this.reset();
  }, 3000);
});

// ─── Smooth Scroll for anchor links ─────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── Active nav link highlight ──────────────────────────
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(a => {
          a.style.color = '';
          if (a.getAttribute('href') === `#${id}`) {
            a.style.color = 'var(--accent-cyan)';
          }
        });
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => obs.observe(s));
})();

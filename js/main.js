/* ═══════════════════════════════════════════════════════════════
   PURE JOY EMPOWERMENT — MAIN JS
   Version: 2.0 | Production Ready
═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Scroll Reveal ─────────────────────────────────────────── */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* ── Navbar scroll state ───────────────────────────────────── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  /* ── Mobile menu toggle ─────────────────────────────────────── */
  const hamburger = document.querySelector('.nav-hamburger');
  const navMenu   = document.querySelector('.nav-menu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', navMenu.classList.contains('open'));
    });
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('open');
      }
    });
  }

  /* ── Counter animation ──────────────────────────────────────── */
  function animateCount(el) {
    const raw    = el.textContent.replace(/[^\d]/g, '');
    const suffix = el.textContent.replace(/[\d]/g, '');
    const target = parseInt(raw, 10);
    if (!target) return;
    let current = 0;
    const step  = target / 55;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.round(current) + suffix;
      if (current >= target) clearInterval(timer);
    }, 20);
  }
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.impact-num').forEach(animateCount);
        countObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.impact-strip').forEach(el => countObserver.observe(el));

  /* ── Toast helper ───────────────────────────────────────────── */
  window.showToast = function(msg, duration = 4000) {
    let t = document.querySelector('.toast');
    if (!t) {
      t = document.createElement('div');
      t.className = 'toast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    requestAnimationFrame(() => {
      t.classList.add('show');
      setTimeout(() => t.classList.remove('show'), duration);
    });
  };

  /* ── Contact form ───────────────────────────────────────────── */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.textContent = 'Sending…';
      btn.disabled = true;
      // Replace with your form handler (Formspree / EmailJS / backend)
      await new Promise(r => setTimeout(r, 1200));
      showToast('✅ Message received! We\'ll respond within 48 hours.');
      contactForm.reset();
      btn.textContent = 'Send Message';
      btn.disabled = false;
    });
  }

  /* ── Newsletter form ─────────────────────────────────────────── */
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button');
      btn.textContent = 'Subscribing…';
      btn.disabled = true;
      await new Promise(r => setTimeout(r, 900));
      showToast('🎉 You\'re subscribed! Welcome to the Pure Joy family.');
      form.reset();
      btn.textContent = 'Subscribe';
      btn.disabled = false;
    });
  });

  /* ── Smooth anchor scroll ────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 90;
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
        if (navMenu) navMenu.classList.remove('open');
      }
    });
  });

  /* ── Active nav link ─────────────────────────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach(a => {
    if (a.getAttribute('href') === currentPage) a.classList.add('active');
  });

});

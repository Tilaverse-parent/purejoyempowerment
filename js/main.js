/* ═══════════════════════════════════════════════════════════════
   PURE JOY EMPOWERMENT — MAIN JS  v2.1
   Production Ready | Mobile-first
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
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* ── Navbar scroll state ───────────────────────────────────── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          navbar.classList.toggle('scrolled', window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ── Mobile menu toggle — with body scroll lock ────────────── */
  const hamburger = document.getElementById('nav-hamburger');
  const navMenu   = document.getElementById('nav-menu');

  function openMenu() {
    navMenu.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // lock scroll
    hamburger.querySelector('span:nth-child(1)').style.transform = 'rotate(45deg) translate(5px,6px)';
    hamburger.querySelector('span:nth-child(2)').style.opacity   = '0';
    hamburger.querySelector('span:nth-child(3)').style.transform = 'rotate(-45deg) translate(5px,-6px)';
  }
  function closeMenu() {
    navMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.contains('open') ? closeMenu() : openMenu();
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') &&
          !hamburger.contains(e.target) &&
          !navMenu.contains(e.target)) {
        closeMenu();
      }
    });
    // Close on nav link click
    navMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        if (window.innerWidth <= 768) closeMenu();
      });
    });
    // Close on resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) closeMenu();
    });
    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) closeMenu();
    });
  }

  /* ── Counter animation ──────────────────────────────────────── */
  function animateCount(el) {
    const raw    = el.textContent.replace(/[^\d]/g, '');
    const suffix = el.textContent.replace(/[\d]/g, '');
    const target = parseInt(raw, 10);
    if (!target) return;
    let current = 0;
    const step  = Math.max(target / 55, 1);
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
  window.showToast = function(msg, duration = 4500) {
    let t = document.querySelector('.toast');
    if (!t) {
      t = document.createElement('div');
      t.className = 'toast';
      t.setAttribute('role', 'status');
      t.setAttribute('aria-live', 'polite');
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
      const orig = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;
      /* 
        Replace the simulation below with your real handler:
        Option A — Formspree: change <form action="https://formspree.io/f/YOUR_ID" method="POST">
        Option B — EmailJS:   emailjs.send('SERVICE', 'TEMPLATE', formData)
      */
      await new Promise(r => setTimeout(r, 1200));
      showToast('✅ Message received! We\'ll respond within 48 hours.');
      contactForm.reset();
      btn.textContent = orig;
      btn.disabled = false;
    });
  }

  /* ── Newsletter forms ───────────────────────────────────────── */
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn  = form.querySelector('button');
      const orig = btn.textContent;
      btn.textContent = 'Subscribing…';
      btn.disabled = true;
      await new Promise(r => setTimeout(r, 900));
      showToast('🎉 You\'re subscribed! Welcome to the Pure Joy family.');
      form.reset();
      btn.textContent = orig;
      btn.disabled = false;
    });
  });

  /* ── Smooth anchor scroll ────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - offset,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ── Active nav link ─────────────────────────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu > a, .nav-menu .drop-panel a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && href.split('#')[0] === currentPage) {
      a.classList.add('active');
      const parentMenu = a.closest('.dropdown');
      if (parentMenu) parentMenu.querySelector(':scope > a')?.classList.add('active');
    }
  });

  /* ── Touch: tap outside dropdown to close ────────────────────── */
  if ('ontouchstart' in window) {
    document.querySelectorAll('.dropdown').forEach(dd => {
      dd.addEventListener('click', (e) => e.stopPropagation());
    });
  }

});

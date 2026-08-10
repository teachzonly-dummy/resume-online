document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('is-open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('is-open'));
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Hero console typing animation ---------- */
  const typedEl = document.getElementById('typedPrompt');
  const cursorEl = document.getElementById('cursor');
  const resultEl = document.getElementById('consoleResult');
  const promptText = 'Build me a clean, professional portfolio site using my name, skills and 3 projects.';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function typePrompt() {
    if (!typedEl) return;

    if (prefersReducedMotion) {
      typedEl.textContent = promptText;
      if (resultEl) resultEl.classList.add('is-shown');
      if (cursorEl) cursorEl.style.display = 'none';
      return;
    }

    let i = 0;
    typedEl.textContent = '';

    function step() {
      if (i < promptText.length) {
        typedEl.textContent += promptText.charAt(i);
        i++;
        setTimeout(step, 28);
      } else {
        setTimeout(() => {
          if (resultEl) resultEl.classList.add('is-shown');
        }, 450);
      }
    }
    step();
  }

  const consoleEl = document.getElementById('console');
  if (consoleEl && 'IntersectionObserver' in window) {
    let hasTyped = false;
    const consoleObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasTyped) {
          hasTyped = true;
          typePrompt();
          consoleObserver.disconnect();
        }
      });
    }, { threshold: 0.4 });
    consoleObserver.observe(consoleEl);
  } else {
    typePrompt();
  }

  /* ---------- FAQ accordion ---------- */
  const triggers = document.querySelectorAll('.accordion__trigger');
  triggers.forEach(trigger => {
    const panel = trigger.nextElementSibling;
    trigger.setAttribute('aria-expanded', 'false');

    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      // Close all other panels
      triggers.forEach(other => {
        if (other !== trigger) {
          other.setAttribute('aria-expanded', 'false');
          other.nextElementSibling.style.maxHeight = null;
        }
      });

      trigger.setAttribute('aria-expanded', String(!isOpen));
      panel.style.maxHeight = isOpen ? null : panel.scrollHeight + 'px';
    });
  });

  /* ---------- Nav background on scroll (subtle) ---------- */
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        nav.style.boxShadow = '0 8px 24px -12px rgba(0,0,0,.4)';
      } else {
        nav.style.boxShadow = 'none';
      }
    });
  }

});

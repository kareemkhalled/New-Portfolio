// UI interactions: theme toggle, nav behavior, scroll reveal, back-to-top.
(function () {
  const root = document.documentElement;
  const THEME_KEY = 'portfolio-theme';

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  const storedTheme = localStorage.getItem(THEME_KEY);
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  applyTheme(storedTheme || (prefersLight ? 'light' : 'dark'));

  const themeToggle = document.getElementById('theme-toggle');
  themeToggle?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });

  // Navbar scrolled state
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('back-to-top');
  const onScroll = () => {
    navbar?.classList.toggle('is-scrolled', window.scrollY > 12);
    backToTop?.classList.toggle('is-visible', window.scrollY > 500);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  navToggle?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle?.classList.remove('is-open');
      navToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('main section[id], header[id]');
  const navAnchors = document.querySelectorAll('.nav-link');
  const setActiveLink = () => {
    let current = '';
    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) current = section.id;
    });
    navAnchors.forEach((a) => {
      a.classList.toggle('is-active', a.getAttribute('href') === `#${current}`);
    });
  };
  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Scroll-reveal animations
  const revealTargets = document.querySelectorAll('.reveal');
  revealTargets.forEach((el, i) => el.style.setProperty('--reveal-i', i % 6));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }

  // Expose a shared observer helper so main.js can reveal dynamically-added content
  window.__revealObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              window.__revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      )
    : null;
})();

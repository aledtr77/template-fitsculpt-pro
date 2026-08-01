/**
 * UI Interactions & Animations Module
 */

export function initAnimations() {
  initHeaderScroll();
  initMobileNav();
  initScrollSpy();
  initProgramTabs();
  initFaqAccordion();
  initPricingToggle();
}

/**
 * Coalesces bursts of scroll events into one callback per animation frame.
 * Scroll fires far more often than the screen repaints, and both listeners
 * below read layout, so running them raw thrashes the layout engine.
 */
function onScrollFrame(callback) {
  let queued = false;

  const handler = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      callback();
    });
  };

  window.addEventListener('scroll', handler, { passive: true });
  callback();
}

function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  onScrollFrame(() => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  });
}

function initScrollSpy() {
  const sections = [...document.querySelectorAll('main section[id]')];
  const linkFor = new Map();

  document.querySelectorAll('.nav-link').forEach((link) => {
    const href = link.getAttribute('href') || '';
    if (href.startsWith('#') && href.length > 1) {
      linkFor.set(href.slice(1), link);
    }
  });

  if (sections.length === 0 || linkFor.size === 0) return;

  let current = null;

  onScrollFrame(() => {
    const probe = window.scrollY + 120;

    // Walk backwards and take the first section that starts above the probe
    // line, so the last section still highlights at the bottom of the page.
    let activeId = sections[0].id;
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      if (probe >= sections[i].offsetTop) {
        activeId = sections[i].id;
        break;
      }
    }

    if (activeId === current) return;
    current = activeId;

    linkFor.forEach((link, id) => {
      link.classList.toggle('active', id === activeId);
    });
  });
}

function initMobileNav() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navBackdrop = document.getElementById('navBackdrop');

  if (!mobileToggle || !navMenu) return;

  const setMenu = (show) => {
    mobileToggle.setAttribute('aria-expanded', String(show));
    navMenu.classList.toggle('active', show);
    navBackdrop?.classList.toggle('active', show);
    // Lock the page behind the drawer, otherwise the body scrolls under it.
    document.body.style.overflow = show ? 'hidden' : '';
  };

  const isOpen = () => mobileToggle.getAttribute('aria-expanded') === 'true';

  mobileToggle.addEventListener('click', () => setMenu(!isOpen()));
  navBackdrop?.addEventListener('click', () => setMenu(false));

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) {
      setMenu(false);
      mobileToggle.focus();
    }
  });

  // Leaving the drawer breakpoint while it is open would otherwise strand the
  // page with a locked body scroll.
  const breakpoint = window.matchMedia('(min-width: 869px)');
  breakpoint.addEventListener('change', (e) => {
    if (e.matches && isOpen()) setMenu(false);
  });
}

function initProgramTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const programCards = document.querySelectorAll('.program-card');

  if (tabBtns.length === 0 || programCards.length === 0) return;

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      tabBtns.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));

      programCards.forEach((card) => {
        // `hidden` also removes the card from the accessibility tree, which
        // inline `display` juggling does not.
        card.hidden = filter !== 'all' && card.dataset.category !== filter;
      });
    });
  });
}

function initFaqAccordion() {
  const headers = document.querySelectorAll('.accordion-header');

  headers.forEach((header) => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      if (!item) return;

      const willOpen = !item.classList.contains('active');

      document.querySelectorAll('.accordion-item').forEach((el) => {
        el.classList.remove('active');
        el.querySelector('.accordion-header')?.setAttribute('aria-expanded', 'false');
      });

      if (willOpen) {
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

function initPricingToggle() {
  const toggleSwitch = document.getElementById('pricingToggle');
  if (!toggleSwitch) return;

  const labels = document.querySelectorAll('.billing-label');

  const setYearly = (yearly) => {
    toggleSwitch.setAttribute('aria-checked', String(yearly));

    // Drive each card from its own price box, so periods belonging to cards
    // without yearly pricing are left alone.
    document.querySelectorAll('.price-box').forEach((box) => {
      const amount = box.querySelector('.price-amount');
      const period = box.querySelector('.price-period');
      const next = amount?.dataset[yearly ? 'yearly' : 'monthly'];
      if (!next) return;

      amount.textContent = next;
      if (period) period.textContent = yearly ? '/year (Save 20%)' : '/month';
    });

    labels.forEach((label, i) => {
      label.classList.toggle('active', yearly ? i === 1 : i === 0);
    });
  };

  toggleSwitch.addEventListener('click', () => {
    setYearly(toggleSwitch.getAttribute('aria-checked') !== 'true');
  });

  setYearly(false);
}

/**
 * UI Interactions & Animations Module
 */

export function initAnimations() {
  initHeaderScroll();
  initMobileNav();
  initProgramTabs();
  initFaqAccordion();
  initPricingToggle();
}

function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll();
}

function initMobileNav() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navBackdrop = document.getElementById('navBackdrop');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!mobileToggle || !navMenu) return;

  const toggleMenu = (show) => {
    const isActive = show !== undefined ? show : !navMenu.classList.contains('active');
    mobileToggle.classList.toggle('active', isActive);
    navMenu.classList.toggle('active', isActive);
    if (navBackdrop) {
      navBackdrop.classList.toggle('active', isActive);
    }
  };

  mobileToggle.addEventListener('click', () => toggleMenu());

  if (navBackdrop) {
    navBackdrop.addEventListener('click', () => toggleMenu(false));
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => toggleMenu(false));
  });
}

function initProgramTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const programCards = document.querySelectorAll('.program-card');

  if (tabBtns.length === 0 || programCards.length === 0) return;

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      tabBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      programCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

function initFaqAccordion() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach((header) => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');

      // Close all accordion items
      document.querySelectorAll('.accordion-item').forEach((el) => el.classList.remove('active'));

      // If it wasn't active, open it
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

function initPricingToggle() {
  const toggleSwitch = document.getElementById('pricingToggle');
  const priceAmounts = document.querySelectorAll('.price-amount');
  const pricePeriods = document.querySelectorAll('.price-period');

  if (!toggleSwitch) return;

  toggleSwitch.addEventListener('click', () => {
    toggleSwitch.classList.toggle('yearly');
    const isYearly = toggleSwitch.classList.contains('yearly');

    priceAmounts.forEach((el) => {
      const monthlyPrice = el.getAttribute('data-monthly');
      const yearlyPrice = el.getAttribute('data-yearly');
      if (monthlyPrice && yearlyPrice) {
        el.textContent = isYearly ? yearlyPrice : monthlyPrice;
      }
    });

    pricePeriods.forEach((el) => {
      el.textContent = isYearly ? '/year (Save 20%)' : '/month';
    });
  });
}

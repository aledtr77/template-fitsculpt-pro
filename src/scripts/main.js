import { initTheme } from './theme.js';
import { initCalculator } from './calculator.js';
import { initContactForm } from './contact-form.js';
import { initModal } from './modal.js';
import { initAnimations } from './animations.js';

function init() {
  initTheme();
  initCalculator();
  initContactForm();
  initModal();
  initAnimations();
}

// A `type="module"` script is deferred, so DOMContentLoaded may already have
// fired by the time this runs — waiting on it unconditionally can hang init.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}

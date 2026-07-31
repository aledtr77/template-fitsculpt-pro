import '../styles/main.css';
import { initTheme } from './theme.js';
import { initCalculator } from './calculator.js';
import { initModal } from './modal.js';
import { initAnimations } from './animations.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCalculator();
  initModal();
  initAnimations();
});

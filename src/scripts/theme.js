/**
 * Theme Switcher Module
 *
 * The stored theme is applied by a blocking snippet in each page's <head>, not
 * here — this module runs after the document has already painted, so setting it
 * here would flash the wrong theme on every load. What is left is the toggle.
 */

const STORAGE_KEY = 'theme';

const ICONS = {
  // Moon: shown in light mode, since the button switches you to dark.
  light: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z',
  dark: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
};

export function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (!themeToggleBtn) return;

  const current = () => document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';

  render(themeToggleBtn, current());

  themeToggleBtn.addEventListener('click', () => {
    const next = current() === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', next);
    render(themeToggleBtn, next);

    // Private-mode Safari throws on setItem; the theme should still switch.
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* persistence is a nicety, not a requirement */
    }
  });
}

function render(button, theme) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '20');
  svg.setAttribute('height', '20');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('aria-hidden', 'true');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', ICONS[theme]);
  path.setAttribute('stroke-width', '2');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');

  svg.append(path);
  button.replaceChildren(svg);

  // Announce the action, not the current state — "Switch to dark theme".
  button.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`);
}

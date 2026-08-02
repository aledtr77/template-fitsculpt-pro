/**
 * Shared plumbing for the two things that cover the page: the booking dialog
 * and the mobile drawer.
 *
 * Both freeze the page behind them and both have to keep the keyboard inside
 * themselves. The scroll lock is reference-counted because the two can overlap:
 * the header sits above the drawer, so its CTA stays clickable while the drawer
 * is open, and whichever closed first used to unfreeze the page underneath the
 * other one.
 */

export const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(', ');

let locks = 0;

export function lockScroll() {
  if (locks === 0) document.body.style.overflow = 'hidden';
  locks += 1;
}

export function unlockScroll() {
  if (locks === 0) return;
  locks -= 1;
  if (locks === 0) document.body.style.overflow = '';
}

/**
 * Keeps Tab and Shift+Tab inside `root`. Call it from a keydown handler while
 * the overlay is open.
 *
 * @param {HTMLElement} root
 * @param {KeyboardEvent} e
 */
export function trapTab(root, e) {
  if (e.key !== 'Tab') return;

  const items = [...root.querySelectorAll(FOCUSABLE)];
  if (items.length === 0) return;

  const first = items[0];
  const last = items[items.length - 1];

  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

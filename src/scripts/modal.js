/**
 * Booking Dialog
 *
 * The dialog is a plain element rather than <dialog>, so the backdrop blur and
 * scale-in transition stay under CSS control. That makes focus management ours
 * to handle: trap it while open, hand it back on close.
 *
 * Every CTA declares the offer it belongs to via `data-open-modal="<value>"`,
 * and that value preselects the interest field. Without it, a visitor who
 * clicked "Apply For VIP" landed in exactly the same blank form as one who
 * clicked a programme card, and the single fact worth knowing about the lead —
 * what they were looking at when they decided — was thrown away.
 */

import { showFormSuccess } from './forms.js';
import { lockScroll, unlockScroll, trapTab, FOCUSABLE } from './overlay.js';

export function initModal() {
  const modalOverlay = document.getElementById('consultationModal');
  if (!modalOverlay) return;

  const openModalBtns = document.querySelectorAll('[data-open-modal]');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const bookingForm = document.getElementById('bookingForm');
  const interest = modalOverlay.querySelector('[data-interest-select]');
  let lastFocused = null;

  const isOpen = () => modalOverlay.classList.contains('active');

  /** Selects `value` only if the dialog actually offers it. */
  const presetInterest = (value) => {
    if (!interest || !value) return;
    if ([...interest.options].some((o) => o.value === value)) interest.value = value;
  };

  const openModal = (value) => {
    lastFocused = document.activeElement;
    presetInterest(value);
    modalOverlay.classList.add('active');
    lockScroll();

    // focus() on a still-hidden element is silently ignored, which would also
    // strand the tab trap below (it keys off activeElement being inside the
    // dialog). The overlay's `visibility` is stepped to `visible` with no
    // delay on open, so one forced style flush is enough to make it focusable.
    void modalOverlay.offsetHeight;

    // Prefer the first form field over the close button: this is a lead form,
    // and dropping the caret straight into it saves the visitor a tab.
    const target = modalOverlay.querySelector('input, select, textarea')
      || modalOverlay.querySelector(FOCUSABLE);
    if (target) target.focus();
  };

  const closeModal = () => {
    if (!isOpen()) return;
    modalOverlay.classList.remove('active');
    unlockScroll();

    // Hand focus back to whatever opened the dialog, or keyboard users land
    // at the top of the document with no idea where they are.
    if (lastFocused instanceof HTMLElement) lastFocused.focus();
    lastFocused = null;
  };

  openModalBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(btn.dataset.openModal);
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (!isOpen()) return;

    if (e.key === 'Escape') {
      closeModal();
      return;
    }

    trapTab(modalOverlay, e);
  });

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = bookingForm.querySelector('#clientName');
      if (!name) return;

      showFormSuccess(bookingForm, {
        title: 'Consultation requested',
        message: `Thanks ${name.value.trim()} — Coach Elena will review your request and reach out within 24 hours.`,
        actionLabel: 'Close window',
        onAction: closeModal
      });
    });
  }
}

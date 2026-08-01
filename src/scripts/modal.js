/**
 * Modal & Lead Booking Module
 *
 * The dialog is a plain element rather than <dialog>, so the backdrop blur and
 * scale-in transition stay under CSS control. That makes focus management ours
 * to handle: trap it while open, hand it back on close.
 */

import { showFormSuccess } from './forms.js';

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(', ');

export function initModal() {
  const modalOverlay = document.getElementById('consultationModal');
  if (!modalOverlay) return;

  const openModalBtns = document.querySelectorAll('[data-open-modal]');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const bookingForm = document.getElementById('bookingForm');
  let lastFocused = null;

  const isOpen = () => modalOverlay.classList.contains('active');

  const openModal = () => {
    lastFocused = document.activeElement;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

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
    document.body.style.overflow = '';

    // Hand focus back to whatever opened the dialog, or keyboard users land
    // at the top of the document with no idea where they are.
    if (lastFocused instanceof HTMLElement) lastFocused.focus();
    lastFocused = null;
  };

  openModalBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
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

    if (e.key !== 'Tab') return;

    const focusable = [...modalOverlay.querySelectorAll(FOCUSABLE)];
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = bookingForm.querySelector('#clientName');
      if (!name) return;

      showFormSuccess(bookingForm, {
        title: 'Consultation requested',
        message: `Thanks ${name.value.trim()} — Coach Elena will review your fitness profile and reach out within 24 hours.`,
        actionLabel: 'Close window',
        onAction: closeModal
      });
    });
  }
}

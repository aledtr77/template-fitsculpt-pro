/**
 * Contact Page Form
 *
 * The template ships without a backend, so this confirms locally instead of
 * letting the form fall through to a native GET submit — which reloaded the
 * page and leaked the visitor's name, email and message into the URL.
 */

import { showFormSuccess } from './forms.js';

export function initContactForm() {
  const form = document.getElementById('pageContactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#contactName');

    showFormSuccess(form, {
      title: 'Message sent',
      message: `Thanks ${name?.value.trim() || 'there'} — Coach Elena's team will reply within 24 hours.`,
      actionLabel: 'Send another message'
    });
  });
}

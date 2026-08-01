/**
 * Shared Form Feedback
 *
 * Builds the post-submit success panel with DOM APIs instead of an innerHTML
 * template. Visitor-supplied text goes in through textContent, so a name like
 * `<img src=x onerror=...>` renders as characters and never as markup.
 */

const CHECK_PATH = 'M5 13l4 4L19 7';

function checkIcon() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '32');
  svg.setAttribute('height', '32');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('aria-hidden', 'true');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', CHECK_PATH);
  path.setAttribute('stroke-width', '2');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');

  svg.append(path);
  return svg;
}

/**
 * Replaces a form with a confirmation panel.
 *
 * The form is detached rather than overwritten, so `reset()` can put it back —
 * overwriting the form's innerHTML destroys the fields permanently and every
 * later visit to the dialog shows a stale success message.
 *
 * @param {HTMLFormElement} form
 * @param {{title: string, message: string, actionLabel?: string, onAction?: () => void}} options
 */
export function showFormSuccess(form, { title, message, actionLabel, onAction }) {
  const panel = document.createElement('div');
  panel.className = 'form-success';
  panel.setAttribute('role', 'status');

  const icon = document.createElement('div');
  icon.className = 'form-success-icon';
  icon.append(checkIcon());

  const heading = document.createElement('h3');
  heading.textContent = title;

  const body = document.createElement('p');
  body.textContent = message;

  panel.append(icon, heading, body);

  if (actionLabel) {
    const action = document.createElement('button');
    action.type = 'button';
    action.className = 'btn btn-primary';
    action.textContent = actionLabel;
    action.addEventListener('click', () => {
      restore();
      if (onAction) onAction();
    });
    panel.append(action);
  }

  function restore() {
    panel.replaceWith(form);
    form.reset();
  }

  form.replaceWith(panel);
  panel.querySelector('button')?.focus();

  return restore;
}

/**
 * Modal & Lead Booking Module
 */

export function initModal() {
  const modalOverlay = document.getElementById('consultationModal');
  const openModalBtns = document.querySelectorAll('[data-open-modal]');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const bookingForm = document.getElementById('bookingForm');

  if (!modalOverlay) return;

  openModalBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('clientName');
      const emailInput = document.getElementById('clientEmail');

      if (!nameInput || !emailInput || !nameInput.value || !emailInput.value) {
        alert('Please fill in all required fields.');
        return;
      }

      bookingForm.innerHTML = `
        <div class="text-center" style="padding: 2rem 1rem;">
          <div style="width: 64px; height: 64px; background: var(--gradient-accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto; color: #fff;">
            <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">Consultation Requested!</h3>
          <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">Thank you ${nameInput.value}! Coach will review your fitness profile and reach out within 24 hours.</p>
          <button class="btn btn-primary" onclick="document.getElementById('consultationModal').classList.remove('active'); document.body.style.overflow = '';">Close Window</button>
        </div>
      `;
    });
  }
}

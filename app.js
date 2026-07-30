/* ==========================================================================
   OTB Agency — Official JavaScript Interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initModal();
});

/* 1. Navbar Scroll Effect */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* 2. Strategy Consultation Modal Form Handler */
function initModal() {
  const overlay = document.getElementById('modalOverlay');
  const form = document.getElementById('bookingForm');

  window.openModal = function() {
    overlay.classList.add('active');
  };

  window.closeModal = function() {
    overlay.classList.remove('active');
  };

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeModal();
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you! Your request has been received by OTB Agency (+20 10 08080295). Our team will get back to you shortly.');
    closeModal();
    form.reset();
  });
}

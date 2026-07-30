/* ==========================================================================
   OTB Agency (وكالة OTB) — Arabic Interactive JavaScript Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCalculator();
  initModal();
});

/* 1. Navbar Scroll Blur Effect */
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

/* 2. Interactive ROI / Ad Budget Estimator for E-Commerce & Services in EGP/USD */
function initCalculator() {
  const slider = document.getElementById('budgetSlider');
  const budgetDisplay = document.getElementById('budgetDisplay');
  const industrySelect = document.getElementById('industrySelect');

  const resImpressions = document.getElementById('resImpressions');
  const resLeads = document.getElementById('resLeads');
  const resRevenue = document.getElementById('resRevenue');

  const industryMultipliers = {
    ecommerce: { roas: 4.2, leadRate: 0.03, cpm: 45 },
    services: { roas: 3.5, leadRate: 0.02, cpm: 60 },
    realestate: { roas: 5.0, leadRate: 0.015, cpm: 80 },
    clinic: { roas: 4.0, leadRate: 0.025, cpm: 50 }
  };

  function updateEstimates() {
    const budget = parseFloat(slider.value);
    const indKey = industrySelect.value;
    const config = industryMultipliers[indKey] || industryMultipliers.ecommerce;

    // Formatting EGP currency
    budgetDisplay.textContent = budget.toLocaleString('ar-EG') + ' ج.م';

    // Calculations
    const impressions = Math.round((budget / config.cpm) * 1000);
    const leads = Math.round((impressions * config.leadRate) / 10);
    const revenue = Math.round(budget * config.roas);

    // Render results in Arabic
    resImpressions.textContent = impressions.toLocaleString('ar-EG') + '+ مشاهدة';
    resLeads.textContent = leads.toLocaleString('ar-EG') + ' عميل محتمل';
    resRevenue.textContent = revenue.toLocaleString('ar-EG') + ' ج.م';
  }

  slider.addEventListener('input', updateEstimates);
  industrySelect.addEventListener('change', updateEstimates);
  updateEstimates();
}

/* 3. Strategy Consultation Modal Form Handler */
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
    alert('شكراً لك! تم استلام طلب الجلسة الاستشارية بوكالة OTB Agency بنجاح. سيتواصل معك أحد متخصصي الفريق التسويقي عبر الرقم الموضح فوراً.');
    closeModal();
    form.reset();
  });
}

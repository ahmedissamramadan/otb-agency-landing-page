/* ==========================================================================
   OTB Agency — Landing Page Interactive JavaScript Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCalculator();
  initPortfolioFilters();
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

/* 2. Interactive ROI / Ad Budget Estimator */
function initCalculator() {
  const slider = document.getElementById('budgetSlider');
  const budgetDisplay = document.getElementById('budgetDisplay');
  const industrySelect = document.getElementById('industrySelect');

  const resImpressions = document.getElementById('resImpressions');
  const resLeads = document.getElementById('resLeads');
  const resRevenue = document.getElementById('resRevenue');

  const industryMultipliers = {
    ecommerce: { roas: 4.2, leadRate: 0.125, cpm: 20 },
    b2b: { roas: 3.5, leadRate: 0.08, cpm: 35 },
    realestate: { roas: 5.0, leadRate: 0.05, cpm: 40 },
    education: { roas: 3.8, leadRate: 0.15, cpm: 18 }
  };

  function updateEstimates() {
    const budget = parseFloat(slider.value);
    const indKey = industrySelect.value;
    const config = industryMultipliers[indKey] || industryMultipliers.ecommerce;

    // Formatting currency
    budgetDisplay.textContent = '$' + budget.toLocaleString('en-US');

    // Calculations
    const impressions = Math.round((budget / config.cpm) * 1000);
    const leads = Math.round(budget * config.leadRate);
    const revenue = Math.round(budget * config.roas);

    // Render results
    resImpressions.textContent = impressions.toLocaleString('en-US') + '+';
    resLeads.textContent = leads.toLocaleString('en-US');
    resRevenue.textContent = '$' + revenue.toLocaleString('en-US');
  }

  slider.addEventListener('input', updateEstimates);
  industrySelect.addEventListener('change', updateEstimates);
  updateEstimates();
}

/* 3. Portfolio Filter Mechanism */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          item.style.display = 'block';
          item.style.opacity = '1';
        } else {
          item.style.display = 'none';
          item.style.opacity = '0';
        }
      });
    });
  });
}

/* 4. Strategy Consultation Modal Form */
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
    alert('Thank you! Your strategy session request has been submitted to OTB Agency. Our team will contact you shortly.');
    closeModal();
    form.reset();
  });
}

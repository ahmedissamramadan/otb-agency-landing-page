/* ==========================================================================
   OTB Agency — Interactive Engine & Official Brand Deck Experience
   Default Language: English (with full Arabic bidirectional switch)
   ========================================================================== */

let currentLang = 'en';
let isSoundEnabled = true;

/* ==========================================================================
   BILINGUAL I18N DICTIONARY
   ========================================================================== */
const i18n = {
  en: {
    lang_btn: 'العربية',
    nav_home: 'Home',
    nav_services: 'What We Build',
    nav_showcase: 'Showcase',
    nav_manifesto: 'Manifesto',
    nav_calculator: 'ROI Planner',
    nav_contact: 'Contact',
    nav_wa: 'WhatsApp Direct',

    hero_title: 'Putting Your Brand Under <br><span class="gold-italic-accent">The Spotlight.</span>',
    hero_desc: 'Over 7 years of spotlighting extraordinary brands. We create visual stories and bold marketing strategies that deliver real commercial impact — with craft, poise, and tangible results.',
    btn_work: 'View Our Work',

    stat_1: 'Years of Experience',
    stat_2: 'Active Community',
    stat_3: 'Proven Strategies',

    craft_title: 'What We Build For Brands.',
    case_study_link: 'Case Study →',

    c1_title: 'Luxury Visual Storytelling',
    c1_desc: 'High-end cinematic video production for specialty coffee, lifestyle, and luxury goods that highlights craft and detail — every shot rooted in narrative.',
    meta_field: 'Vertical',
    c1_field: 'Coffee · Lifestyle',
    meta_output: 'Deliverables',
    c1_output: 'Video · Photography',
    meta_results: 'Results',
    c1_results: '+240% Lift · 4.8x ROAS',
    meta_duration: 'Timeline',
    c1_duration: 'Per Project',

    c2_title: 'Market-Leading Strategies',
    c2_desc: 'Bold marketing strategies engineered to dominate the market and generate genuine business revenue — from brand positioning to full-funnel ad campaigns.',
    meta_scope: 'Scope',
    c2_scope: 'Positioning · Campaigns',
    meta_channels: 'Channels',
    c2_channels: 'Social · Performance',
    c2_results: '3.8x - 5.2x ROAS',
    c2_duration: 'Timeline',
    c2_duration: 'Per Objective',

    c3_title: '3D Brand Identity Systems',
    c3_desc: 'Developing distinctive 3D visual identities and custom logos that embody brand power and distinction — an identity seen, felt, and remembered.',
    c3_output: 'Identity · 3D Logo',
    meta_system: 'System',
    c3_system: 'Brand Book Guide',
    c3_results: '100% Bespoke Craft',
    c3_duration: 'Timeline',
    c3_duration: 'Per Scope',

    showcase_title: 'Selected Showcase.',
    showcase_subtag: 'Coming Soon — Spotlighting Projects',

    manif_title: 'Audacity is a Principle, Not a Slogan.',
    manif_p1: 'We believe powerful brands are built from a deeper understanding of what truly works. We love being deep in the details, collaborating with lean teams on things that matter.',
    manif_p2: 'We craft visual stories, strategies, and 3D brand identities — with varying layers of craft, but always with one single objective: making your brand the hero.',

    calc_tag: 'GROWTH SIMULATOR',
    calc_title: 'Interactive ROI & Growth Simulator',
    calc_sub: 'Configure your budget and industry to preview projected reach, customer leads, and ROAS with OTB.',
    calc_lbl_industry: 'Your Brand Vertical:',
    calc_lbl_budget: 'Estimated Monthly Marketing Budget:',
    calc_lbl_channels: 'Target Marketing Channel:',
    calc_res_tag: 'PROJECTION ESTIMATE',
    calc_res_views: 'Projected Target Reach:',
    calc_res_leads: 'Estimated Qualified Leads:',
    calc_res_roas: 'Projected Return (ROAS):',
    calc_disclaimer: '* Projections are based on historical benchmarks achieved across client verticals at OTB Agency.',
    btn_claim_plan: 'Lock In Your Strategy Plan 🚀',

    cta_final_title: 'Ready To Put Your Brand in the Spotlight?',
    btn_final_book: '💬 Book Strategy Session',
    btn_final_email: 'Email Us Directly →',

    footer_passion: 'Passion for Brand Craft · Over 7 Years',

    modal_title: 'BOOK OTB STRATEGY SESSION',
    modal_desc: 'Submit your contact details and an OTB Agency strategist will reach out immediately to formulate your roadmap.',
    form_name: 'Full Name / Company *',
    form_phone: 'WhatsApp / Phone Number *',
    form_service: 'Interested Service Pillar:',
    form_notes: 'Brand Links or Goals (Optional):',
    form_submit: 'Confirm & Send Request to OTB Agency 💬'
  },

  ar: {
    lang_btn: 'English',
    nav_home: 'الرئيسية',
    nav_services: 'ما نصنعه',
    nav_showcase: 'معرض الأعمال',
    nav_manifesto: 'الجرأة مبدأ',
    nav_calculator: 'حاسبة النمو',
    nav_contact: 'التواصل',
    nav_wa: 'الواتساب المباشر',

    hero_title: 'نضع علامتك تحت أضواء <br><span class="gold-italic-accent">القيادة.</span>',
    hero_desc: 'أكثر من 7 سنوات في وضع العلامات التجارية تحت أضواء النجاح. نبتكر قصصاً مرئية واستراتيجيات تسويقية جريئة تخلق فارقاً استثنائياً لبراندك — بحرفة، وهدوء، ونتائج حقيقية.',
    btn_work: 'شاهد أعمالنا',

    stat_1: 'سنوات خبرة',
    stat_2: 'متابع نشط',
    stat_3: 'استراتيجيات مثبتة',

    craft_title: 'ما الذي نصنعه للعلامات.',
    case_study_link: 'دراسة حالة ←',

    c1_title: 'إنتاج مرئي فاخر',
    c1_desc: 'إنتاج مرئي احترافي للقهوة المختصة، اللايف ستايل، والمنتجات الفاخرة يبرز تفاصيل ودقة الحرفة — كل لقطة مبنية على قصة.',
    meta_field: 'المجال',
    c1_field: 'قهوة · لايف ستايل',
    meta_output: 'المخرجات',
    c1_output: 'فيديو · فوتو',
    meta_results: 'النتائج',
    c1_results: '+240% تفاعل · 4.8x ROAS',
    meta_duration: 'المدة',
    c1_duration: 'حسب المشروع',

    c2_title: 'استراتيجيات تتصدّر السوق',
    c2_desc: 'استراتيجيات تسويقية جريئة تتصدّر السوق وتحقق نتائج تجارية حقيقية وملموسة لبراندك — من التموضع حتى الحملة.',
    meta_scope: 'النطاق',
    c2_scope: 'تموضع · حملات',
    meta_channels: 'القنوات',
    c2_channels: 'سوشيال · أداء',
    c2_results: '3.8x - 5.2x ROAS',
    c2_duration: 'حسب الهدف',

    c3_title: 'هويات ثلاثية الأبعاد',
    c3_desc: 'تطوير هويات بصرية ثلاثية الأبعاد مميزة وشعارات مخصصة تعكس قوة وتميز العلامة التجارية — هوية تُرى وتُلمس.',
    c3_output: 'هوية · شعار 3D',
    meta_system: 'النظام',
    c3_system: 'دليل استخدام (Brand Book)',
    c3_results: '100% تفرد بصري',
    c3_duration: 'حسب النطاق',

    showcase_title: 'معرض الأعمال.',
    showcase_subtag: 'قريباً — ضع مشاريعك هنا',

    manif_title: 'الُجرأة مبدأ، لا شعار.',
    manif_p1: 'نؤمن أن العلامات القوية تُبنى من فهم أعمق لما ينجح فعلاً. نحب أن نكون في قلب التفاصيل، نعمل مع فرق صغيرة على أشياء تهّم.',
    manif_p2: 'نصنع القصص المرئية، الاستراتيجيات، والهويات ثلاثية الأبعاد — بدرجات متفاوتة من الحرفة، لكن دائماً بالهدف نفسه: أن يكون براندك هو البطل.',

    calc_tag: 'GROWTH SIMULATOR',
    calc_title: 'حاسبة النمو والعائد الاستثماري التفاعلية',
    calc_sub: 'حدد ميزانيتك ومجال عملك لتستكشف التقدير المتوقع لنمو علامتك التجارية مع استراتيجيات OTB.',
    calc_lbl_industry: 'قطاع علامتك التجارية:',
    calc_lbl_budget: 'الميزانية التسويقية الشهرية التقريبية:',
    calc_lbl_channels: 'المنصة التسويقية المستهدفة:',
    calc_res_tag: 'PROJECTION ESTIMATE',
    calc_res_views: 'المشاهدات والوصول المستهدف:',
    calc_res_leads: 'العملاء المحتملين المتوقعين:',
    calc_res_roas: 'مضاعف العائد المتوقع (ROAS):',
    calc_disclaimer: '* هذه التقديرات مبنية على متوسط أداء حملات OTB Agency لعملائنا في نفس القطاع.',
    btn_claim_plan: 'احجز خطتك التسويقية الآن 🚀',

    cta_final_title: 'جاهز تضع علامتك تحت الأضواء؟',
    btn_final_book: '💬 احجز جلسة استراتيجية',
    btn_final_email: 'راسلنا على البريد ←',

    footer_passion: 'شغف بصناعة العلامات · أكثر من 7 سنوات',

    modal_title: 'BOOK OTB STRATEGY SESSION',
    modal_desc: 'أدخل بياناتك وسيتم التواصل معك مباشرة بواسطة فريق OTB Agency لبناء خطتك الإعلانية.',
    form_name: 'الاسم / الشركة *',
    form_phone: 'رقم التواصل / الواتساب *',
    form_service: 'الخدمة المطلوبة:',
    form_notes: 'ملاحظات أو أهداف البراند (اختياري):',
    form_submit: 'تأكيد وإرسال الطلب إلى OTB Agency 💬'
  }
};

/* ==========================================================================
   INITIALIZATION LIFECYCLE
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  checkUrlLanguage();
  initLenis();
  initNavbar();
  initCustomCursor();
  initTactileAudio();
  initThreeJsWebGL();
  initRoiCalculator();
  initLightbox();
  initModal();
  initGsapAnimations();
  initCounterObserver();
});

function checkUrlLanguage() {
  const urlParams = new URLSearchParams(window.location.search);
  const lang = urlParams.get('lang');
  if (lang === 'ar' && currentLang !== 'ar') {
    toggleLanguage(false);
  }
}

/* ==========================================================================
   1. LENIS SMOOTH SCROLL
   ========================================================================== */
function initLenis() {
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
}

/* ==========================================================================
   2. MAGNETIC CUSTOM CURSOR
   ========================================================================== */
function initCustomCursor() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  function renderRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    requestAnimationFrame(renderRing);
  }
  renderRing();

  const interactives = document.querySelectorAll('a, button, .craft-card, .portfolio-spec-card, input, select, textarea');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width = '52px';
      ring.style.height = '52px';
      ring.style.backgroundColor = 'rgba(197, 160, 89, 0.12)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width = '36px';
      ring.style.height = '36px';
      ring.style.backgroundColor = 'rgba(197, 160, 89, 0.05)';
    });
  });
}

/* ==========================================================================
   3. SYNTHESIZED TACTILE AUDIO
   ========================================================================== */
let audioCtx = null;
function initTactileAudio() {
  const soundBtn = document.getElementById('soundToggleBtn');
  if (!soundBtn) return;

  soundBtn.addEventListener('click', () => {
    isSoundEnabled = !isSoundEnabled;
    const iconOn = soundBtn.querySelector('.sound-icon-on');
    const iconOff = soundBtn.querySelector('.sound-icon-off');
    
    if (iconOn && iconOff) {
      iconOn.style.display = isSoundEnabled ? 'block' : 'none';
      iconOff.style.display = isSoundEnabled ? 'none' : 'block';
    }

    if (isSoundEnabled) playMicroSound(880, 0.04);
  });

  document.querySelectorAll('.btn, .btn-hero-work, .btn-dark-pill, .btn-outline-pill, .calc-chip, .modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      if (isSoundEnabled) playMicroSound(580, 0.03);
    });
  });
}

function playMicroSound(freq = 600, duration = 0.04) {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq / 2, audioCtx.currentTime + duration);

    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (err) {}
}

/* ==========================================================================
   4. THREE.JS BACKGROUND PARTICLES
   ========================================================================== */
function initThreeJsWebGL() {
  const canvas = document.getElementById('webgl-hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 4.5;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const count = 300;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 14;
    positions[i + 1] = (Math.random() - 0.5) * 10;
    positions[i + 2] = (Math.random() - 0.5) * 8;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    size: 0.035,
    color: 0xC5A059,
    transparent: true,
    opacity: 0.65,
    blending: THREE.AdditiveBlending
  });

  const particleSystem = new THREE.Points(geometry, material);
  scene.add(particleSystem);

  let targetMouseX = 0, targetMouseY = 0;
  let currentMouseX = 0, currentMouseY = 0;

  window.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX / window.innerWidth - 0.5) * 0.8;
    targetMouseY = (e.clientY / window.innerHeight - 0.5) * 0.8;
  });

  function animate() {
    requestAnimationFrame(animate);

    currentMouseX += (targetMouseX - currentMouseX) * 0.04;
    currentMouseY += (targetMouseY - currentMouseY) * 0.04;

    particleSystem.rotation.y += 0.0008;
    particleSystem.rotation.x += 0.0003;

    particleSystem.position.x = currentMouseX;
    particleSystem.position.y = -currentMouseY;

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

/* ==========================================================================
   5. INTERACTIVE ROI & GROWTH CALCULATOR
   ========================================================================== */
function initRoiCalculator() {
  const slider = document.getElementById('budgetSlider');
  const budgetDisplay = document.getElementById('budgetDisplay');
  const reachDisplay = document.getElementById('calcReach');
  const leadsDisplay = document.getElementById('calcLeads');
  const roasDisplay = document.getElementById('calcRoas');

  const industryChips = document.querySelectorAll('#industryChips .calc-chip');
  const channelChips = document.querySelectorAll('#channelChips .calc-chip');

  let currentIndustryFactor = 1.2;
  let currentChannelFactor = 1.0;

  industryChips.forEach(chip => {
    chip.addEventListener('click', () => {
      industryChips.forEach(c => {
        c.classList.remove('active');
        c.setAttribute('aria-checked', 'false');
      });
      chip.classList.add('active');
      chip.setAttribute('aria-checked', 'true');
      currentIndustryFactor = parseFloat(chip.getAttribute('data-factor')) || 1.2;
      calculateROI();
    });
  });

  channelChips.forEach(chip => {
    chip.addEventListener('click', () => {
      channelChips.forEach(c => {
        c.classList.remove('active');
        c.setAttribute('aria-checked', 'false');
      });
      chip.classList.add('active');
      chip.setAttribute('aria-checked', 'true');
      const channel = chip.getAttribute('data-channel');
      currentChannelFactor = channel === 'omni' ? 1.35 : (channel === 'tiktok' ? 1.2 : 1.0);
      calculateROI();
    });
  });

  if (slider) {
    slider.addEventListener('input', calculateROI);
  }

  function calculateROI() {
    const budget = parseInt(slider.value, 10);
    const suffix = currentLang === 'ar' ? 'شهر' : 'month';
    const leadsSuffix = currentLang === 'ar' ? 'عميل' : 'leads';

    if (budgetDisplay) {
      budgetDisplay.innerText = `$${budget.toLocaleString()} / ${suffix}`;
    }

    const estReach = Math.round(budget * 180 * currentIndustryFactor * currentChannelFactor);
    const minLeads = Math.round((budget / 4.2) * currentIndustryFactor);
    const maxLeads = Math.round((budget / 2.2) * currentIndustryFactor * currentChannelFactor);
    const minRoas = (3.2 * (currentIndustryFactor / 1.1)).toFixed(1);
    const maxRoas = (4.8 * (currentIndustryFactor / 1.1) * (currentChannelFactor === 1.35 ? 1.15 : 1)).toFixed(1);

    if (reachDisplay) reachDisplay.innerText = `${estReach.toLocaleString()}+`;
    if (leadsDisplay) leadsDisplay.innerText = `${minLeads.toLocaleString()} - ${maxLeads.toLocaleString()} ${leadsSuffix}`;
    if (roasDisplay) roasDisplay.innerText = `${minRoas}x - ${maxRoas}x`;
  }

  calculateROI();
}

/* ==========================================================================
   6. LIGHTBOX & CASE STUDY MODAL
   ========================================================================== */
function initLightbox() {
  const cards = document.querySelectorAll('.portfolio-spec-card');
  const overlay = document.getElementById('lightboxOverlay');
  const img = document.getElementById('lightboxImg');
  const title = document.getElementById('lightboxTitle');
  const cat = document.getElementById('lightboxCategory');
  const metric = document.getElementById('lightboxMetric');
  const desc = document.getElementById('lightboxDesc');

  cards.forEach(card => {
    const openCard = () => {
      const src = card.getAttribute('data-img');
      const cardTitle = card.getAttribute('data-title');
      const cardCat = card.getAttribute('data-category');
      const cardMetric = card.getAttribute('data-metric');
      const cardDesc = card.getAttribute('data-desc');

      if (img && src) img.src = src;
      if (title && cardTitle) title.innerText = cardTitle;
      if (cat && cardCat) cat.innerText = cardCat;
      if (metric && cardMetric) metric.innerText = `✦ ${cardMetric}`;
      if (desc && cardDesc) desc.innerText = cardDesc;

      if (overlay) overlay.classList.add('active');
    };

    card.addEventListener('click', openCard);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCard();
      }
    });
  });

  window.closeLightbox = function() {
    if (overlay) overlay.classList.remove('active');
  };

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeLightbox();
    });
  }
}

/* ==========================================================================
   7. STRATEGY MODAL WITH VALIDATION
   ========================================================================== */
function initModal() {
  const overlay = document.getElementById('modalOverlay');
  const form = document.getElementById('bookingForm');
  const nameInput = document.getElementById('inputName');
  const phoneInput = document.getElementById('inputPhone');
  const nameError = document.getElementById('nameError');
  const phoneError = document.getElementById('phoneError');

  window.openModal = function() {
    if (overlay) overlay.classList.add('active');
    setTimeout(() => { if (nameInput) nameInput.focus(); }, 100);
  };

  window.openModalWithPlan = function() {
    openModal();
    const notes = document.getElementById('inputNotes');
    const budget = document.getElementById('budgetSlider') ? document.getElementById('budgetSlider').value : '1500';
    if (notes) {
      notes.value = currentLang === 'ar' 
        ? `مهتم بخطة تسويقية بميزانية تقديرية: $${budget}/شهر.`
        : `Interested in a growth strategy plan with estimated budget: $${budget}/month.`;
    }
  };

  window.closeModal = function() {
    if (overlay) overlay.classList.remove('active');
    if (nameError) nameError.style.display = 'none';
    if (phoneError) phoneError.style.display = 'none';
  };

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
  }

  if (nameInput) nameInput.addEventListener('input', () => { if (nameError) nameError.style.display = 'none'; });
  if (phoneInput) phoneInput.addEventListener('input', () => { if (phoneError) phoneError.style.display = 'none'; });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeLightbox();
      closeMobileDrawer();
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = nameInput ? nameInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const service = document.getElementById('selectService').value;
      const notes = document.getElementById('inputNotes').value.trim();

      let hasError = false;

      if (!name || name.length < 2) {
        if (nameError) nameError.style.display = 'block';
        hasError = true;
      }
      if (!phone || phone.length < 7) {
        if (phoneError) phoneError.style.display = 'block';
        hasError = true;
      }

      if (hasError) return;

      const headerText = currentLang === 'ar' ? 'طلب استشارة استراتيجية جديد - OTB Agency' : 'New Strategy Session Request - OTB Agency';
      const text = encodeURIComponent(`*${headerText}*%0A%0A*Name / Company:* ${name}%0A*Phone / WhatsApp:* ${phone}%0A*Service:* ${service}%0A*Notes:* ${notes || 'None'}`);
      const waUrl = `https://wa.me/201008080295?text=${text}`;

      window.open(waUrl, '_blank');
      closeModal();
      form.reset();
    });
  }
}

/* ==========================================================================
   8. BILINGUAL LOCALIZATION ENGINE
   ========================================================================== */
window.toggleLanguage = function(updateUrl = true) {
  currentLang = currentLang === 'en' ? 'ar' : 'en';
  const html = document.documentElement;

  if (currentLang === 'en') {
    html.setAttribute('dir', 'ltr');
    html.setAttribute('lang', 'en');
  } else {
    html.setAttribute('dir', 'rtl');
    html.setAttribute('lang', 'ar');
  }

  updateLanguageUI();

  if (updateUrl && history.replaceState) {
    const newUrl = currentLang === 'ar' ? '?lang=ar' : window.location.pathname;
    history.replaceState(null, '', newUrl + window.location.hash);
  }
};

function updateLanguageUI() {
  const dictionary = i18n[currentLang];
  const elements = document.querySelectorAll('[data-i18n]');

  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dictionary[key]) {
      el.innerHTML = dictionary[key];
    }
  });

  const langText = document.getElementById('langBtnText');
  if (langText) langText.innerText = dictionary.lang_btn;
}

/* ==========================================================================
   9. NAVBAR & MOBILE DRAWER
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileNavDrawer');
  const drawerClose = document.getElementById('drawerCloseBtn');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let currentId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      if (window.scrollY >= sectionTop) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

  if (mobileBtn && drawer) {
    mobileBtn.addEventListener('click', () => {
      drawer.classList.add('active');
      drawer.setAttribute('aria-hidden', 'false');
      mobileBtn.setAttribute('aria-expanded', 'true');
    });
  }

  window.closeMobileDrawer = function() {
    if (drawer) {
      drawer.classList.remove('active');
      drawer.setAttribute('aria-hidden', 'true');
      if (mobileBtn) mobileBtn.setAttribute('aria-expanded', 'false');
    }
  };

  if (drawerClose) drawerClose.addEventListener('click', closeMobileDrawer);
  drawerLinks.forEach(l => l.addEventListener('click', closeMobileDrawer));
}

/* ==========================================================================
   10. GSAP ENTRANCE ANIMATIONS
   ========================================================================== */
function initGsapAnimations() {
  if (typeof gsap !== 'undefined') {
    gsap.from('.hero-top-tag', { opacity: 0, y: 15, duration: 0.8, delay: 0.1 });
    gsap.from('.hero-headline-spec', { opacity: 0, y: 25, duration: 1, delay: 0.25 });
    gsap.from('.hero-desc-spec', { opacity: 0, y: 20, duration: 0.9, delay: 0.45 });
    gsap.from('.hero-action-spec', { opacity: 0, y: 20, duration: 0.9, delay: 0.6 });
    gsap.from('.stats-spec-row', { opacity: 0, y: 30, duration: 1, delay: 0.75 });
  }
}

/* ==========================================================================
   11. STAT COUNTERS OBSERVER
   ========================================================================== */
function initCounterObserver() {
  const counters = document.querySelectorAll('[data-counter]');
  let started = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        counters.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-counter'));
          let current = 0;
          const step = target / 30;

          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              counter.innerText = `+${Math.round(target)}`;
              clearInterval(timer);
            } else {
              counter.innerText = `+${Math.floor(current)}`;
            }
          }, 35);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsRow = document.querySelector('.stats-spec-row');
  if (statsRow) observer.observe(statsRow);
}

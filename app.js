/* ==========================================================================
   OTB Agency — High-Performance Interactive Engine (Digital DNA 2026)
   Optimized for 120fps smooth performance, 0% idle GPU, and instant responsiveness
   ========================================================================== */

let currentLang = 'en';
let isSoundEnabled = true;

/* ==========================================================================
   BILINGUAL I18N DICTIONARY
   ========================================================================== */
const i18n = {
  en: {
    lang_btn: 'العربية',
    nav_services: 'Pillars',
    nav_benchmark: 'Franks Proof',
    nav_showcase: 'Showcase',
    nav_calculator: 'ROI Simulator',
    nav_manifesto: 'Manifesto',
    nav_contact: 'Contact',
    nav_cta: 'Book Strategy',

    hero_title: 'Putting Your Brand Under <br><span class="gold-italic-accent">The Spotlight.</span>',
    hero_desc: 'Over 7 years of engineering market dominance for Egypt\'s premier FMCG manufacturers, specialty coffee icons, and high-growth brands. We don\'t sell routine posts — we build full-funnel commercial engines that turn products into market leaders.',
    btn_work: 'Explore 20 Documented Proofs of Work',

    stat_1: 'Years Market Mastery',
    stat_views: 'Annual Verified Views',
    stat_interactions: 'Annual Engagements',
    stat_franks: 'Peak Monthly Scale (Franks)',

    clients_tag: 'TRUSTED BY INDUSTRY TITANS & REGIONAL LEADERS',

    bm_title: 'The Transformation of Franks Food Industries',
    bm_lead: 'Franks owned top-tier manufacturing and extensive physical distribution across Egypt, but ranked #25 in consumer mindshare with an absent digital footprint. OTB deployed its full-funnel growth engine:',

    craft_title: 'What We Build For Enterprise Brands.',
    case_study_link: 'Case Study →',

    c1_title: 'Luxury Visual Storytelling & Production',
    c1_desc: 'Cinematic 4K video production for specialty coffee, fine dining, and consumer packaged goods (FMCG). Every shot is engineered with studio lighting, master color grading, and emotional narrative structure.',
    meta_field: 'Vertical',
    c1_field: 'F&B · Specialty Coffee · FMCG',
    meta_output: 'Deliverables',
    c1_output: 'Cinematic Reels · 4K Stills · Chef Shoots',
    meta_results: 'Verified Benchmarks',
    c1_results: '+220K Views · +240% Lift',
    meta_duration: 'Governance',
    c1_duration: 'CoreLink Production Track',

    c2_title: 'High-ROAS Performance Marketing',
    c2_desc: 'Precision-targeted ad campaigns on Meta, TikTok, and Google. Full-funnel TOFU-MOFU-BOFU architecture driving direct sales, delivery orders, and high-ticket B2B distributor contracts.',
    meta_scope: 'Scope',
    c2_scope: 'Brand Positioning · Direct Sales',
    meta_channels: 'Channels',
    c2_channels: 'Meta Ads · TikTok · YouTube',
    c2_results: '3.8x - 5.2x ROAS Multiplier',
    c2_duration: 'Scale Target',
    c2_duration: 'Industrial & Enterprise',

    c3_title: '3D Identity & Visual Architecture',
    c3_desc: 'Developing signature isometric 3D visual systems, packaging CGI renders, and comprehensive Brand Books that command immediate market authority and retail shelf presence.',
    c3_output: 'Isometric 3D · Packaging · Brand Book',
    meta_system: 'System',
    c3_system: 'Bespoke Royal Monochrome & Gold',
    c3_results: '100% Distinctive Identity',
    c3_duration: 'Format',
    c3_duration: 'Cross-Platform Guidelines',

    showcase_title: 'Documented Proof of Work (20 Designs)',
    showcase_subtag: 'Real Client Case Studies & Official Creative Works',

    manif_title: '"Don\'t Follow the Crowd, We Create the Direction."',
    manif_p1: 'We believe great brands are never built inside cookie-cutter templates. Founded in 2019, OTB has spent over 7 years in the trenches of the Egyptian market, transforming ambitious manufacturing plants, specialty coffee roasters, and commercial leaders into dominant market authorities.',
    manif_p2: 'Governed by our 15-Star Executive Management Board and powered by enterprise infrastructure (CoreLink CRM + Manus), we execute with mathematical precision: Strong Product Quality + Real Distribution + Observed Digital Gap + OTB Full-Funnel Engine = Pure Market Dominance.',

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

    footer_passion: 'Growth Partner to +11 Enterprise Brands · 140M+ Annual Views · 7+ Years',

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
    nav_services: 'المسارات',
    nav_benchmark: 'إنجاز فرانكس',
    nav_showcase: 'معرض الأعمال',
    nav_calculator: 'حاسبة النمو',
    nav_manifesto: 'الجرأة مبدأ',
    nav_contact: 'التواصل',
    nav_cta: 'احجز استشارتك',

    hero_title: 'نضع علامتك التجارية تحت أضواء <br><span class="gold-italic-accent">الريادة.</span>',
    hero_desc: 'أكثر من 7 سنوات في قيادة وتنمية كبرى مصانع الأغذية (FMCG) والقهوة المختصة والعلامات التجارية الصاعدة في مصر. لا نبيع منشورات نمطية، بل نبني منظومات نمو تجارية متكاملة تحول المنتجات إلى قوى سوقية مهيمنة.',
    btn_work: 'استعرض 20 سابقة أعمال وتصميماً رسمياً موثقاً',

    stat_1: 'سنوات من الريادة في السوق',
    stat_views: 'مشاهدات سنوية موثقة',
    stat_interactions: 'تفاعلات سنوية معتمدة',
    stat_franks: 'ذروة مبيعات فرانكس الشهرية',

    clients_tag: 'شركاء النجاح وكبرى الكيانات التجارية والصناعية الرائدة',

    bm_title: 'قصة التحول الاستراتيجي لمصانع فرانكس الغذائية',
    bm_lead: 'امتلكت مصانع فرانكس قدرات تصنيع فائقة وشبكة توزيع حقيقية، لكنها عانت من فجوة رقمية وضعتها بالمركز 25 سوقياً. تدخلت وكالة OTB بمنظومة النمو الشاملة:',

    craft_title: 'ما نصنعه للشركات الكبرى والعلامات التجارية الرائدة.',
    case_study_link: 'دراسة الحالة ←',

    c1_title: 'الإنتاج المرئي والسرد السينمائي الفاخر',
    c1_desc: 'إنتاج إعلاني سينمائي بدقة 4K للأغذية والمشروبات (FMCG) ومحامص القهوة المختصة. كل لقطة مدروسة بإضاءات استوديو وتصحيح ألوان احترافي وسرد قصصي عاطفي يحرك المبيعات.',
    meta_field: 'القطاع',
    c1_field: 'الأغذية والمشروبات · القهوة المختصة · السلع الاستهلاكية',
    meta_output: 'المخرجات',
    c1_output: 'إعلانات سينمائية · تصوير فوتوغرافي · وصفات طهاة',
    meta_results: 'النتائج المحققة',
    c1_results: '+220 ألف مشاهدة · +240% نمو في التفاعل',
    meta_duration: 'الحوكمة التشغيلية',
    c1_duration: 'مسار إنتاج CoreLink المعتمد',

    c2_title: 'إعلانات الأداء الموجهة للمبيعات والـ ROAS',
    c2_desc: 'حملات إعلانية عالية الدقة على Meta و TikTok و YouTube بهيكلية TOFU-MOFU-BOFU لدفع طلبات الدليفري والتعاقدات التجارية المباشرة وتحقيق أعلى عائد استثماري.',
    meta_scope: 'النطاق التجاري',
    c2_scope: 'تموضع العلامة · مبيعات مباشرة',
    meta_channels: 'القنوات الإعلانية',
    c2_channels: 'إعلانات Meta · تيك توك · يوتيوب',
    c2_results: 'مضاعف عائد 3.8x - 5.2x ROAS',
    c2_duration: 'الهدف التوسعي',

    c3_title: 'أنظمة الهوية البصرية ثلاثية الأبعاد (3D)',
    c3_desc: 'ابتكار أنظمة بصرية ثلاثية الأبعاد بتكوينات Isometric ورندرات CGI لعبوات المنتجات مع كتيب إرشادات شامل يفرض هيبة فورية على رفوف التجزئة والمنافذ.',
    c3_output: 'أنظمة ثلاثية الأبعاد · رندرات عبوات · دليل هوية',
    meta_system: 'النظام البصري',
    c3_system: 'المونوكروم الملكي المطعم بالذهب',
    c3_results: 'تميّز بصري بنسبة 100%',
    c3_duration: 'إرشادات شاملة لكافة المنصات',

    showcase_title: 'معرض الأعمال الموثقة (20 تصميماً رسمياً)',
    showcase_subtag: 'دراسات حالة حقيقية وتصميمات الحملات الرسمية لعملاء OTB',

    manif_title: '"لا نتبع الحشود، بل نصنع الاتجاه."',
    manif_p1: 'نؤمن أن العلامات الاستثنائية لا تُبنى أبداً داخل قوالب مكررة. منذ تأسيسنا عام 2019، قضينا أكثر من 7 سنوات نقود صعود كبرى مصانع الأغذية ومحامص القهوة والكيانات التجارية من الظل إلى صدارة السوق.',
    manif_p2: 'نعمل بحوكمة مؤسسية رصينة ومدعومين ببنية تحتية رقمية متقدمة (CoreLink CRM + Manus)، لنطبق معادلتنا الحاسمة: جودة منتج حقيقية + توزيع فعلي + فجوة رقمية ملحوظة + محرك OTB التسويقي = هيمنة سوقية مطلقة.',

    calc_tag: 'محاكي النمو الاستراتيجي',
    calc_title: 'حاسبة العائد والنمو التفاعلية',
    calc_sub: 'حدد ميزانيتك وقطاعك لمعاينة التقديرات المحققة للمشاهدات، والعملاء المحتملين، ومضاعف العائد مع OTB.',
    calc_lbl_industry: 'قطاع علامتك التجارية:',
    calc_lbl_budget: 'الميزانية التسويقية الشهرية التقديرية:',
    calc_lbl_channels: 'القناة الإعلانية المستهدفة:',
    calc_res_tag: 'تقديرات النمو المحتمل',
    calc_res_views: 'الوصول الجماهيري المستهدف:',
    calc_res_leads: 'العملاء المحتملون المؤهلون:',
    calc_res_roas: 'العائد الإعلاني المتوقع (ROAS):',
    calc_disclaimer: '* تستند التقديرات إلى المعايير القياسية الفعلية المحققة عبر قطاعات عملاء OTB Agency.',
    btn_claim_plan: 'احجز خطتك الاستراتيجية الآن 🚀',

    cta_final_title: 'هل أنت مستعد لوضع علامتك التجارية تحت أضواء الريادة؟',
    btn_final_book: '💬 احجز جلستك الاستراتيجية',
    btn_final_email: 'راسلنا مباشرة عبر البريد الإلكتروني ←',

    footer_passion: 'شريك النمو لأكثر من 11 علامة تجارية رائدة · 140+ مليون مشاهدة سنوية · 7+ سنوات من الريادة',

    modal_title: 'حجز جلسة استراتيجية مع OTB',
    modal_desc: 'سجل بيانات التواصل وسيقوم مستشارو النمو في OTB بالتواصل معك فوراً لوضع خارطة طريق علامتك.',
    form_name: 'الاسم بالكامل / اسم الكيان التجاري *',
    form_phone: 'رقم الواتساب / الهاتف الرسمي *',
    form_service: 'مسار النمو المطلوب:',
    form_notes: 'روابط العلامة أو أهداف التوسع (اختياري):',
    form_submit: 'تأكيد وإرسال الطلب إلى OTB Agency 💬'
  }
};

/* ==========================================================================
   GLOBAL LIGHTBOX HELPER
   ========================================================================== */
window.openLightboxForImage = function(src, titleText, catText, metricText, descText) {
  const overlay = document.getElementById('lightboxOverlay');
  const img = document.getElementById('lightboxImg');
  const title = document.getElementById('lightboxTitle');
  const cat = document.getElementById('lightboxCategory');
  const metric = document.getElementById('lightboxMetric');
  const desc = document.getElementById('lightboxDesc');

  if (img && src) img.src = src;
  if (title && titleText) title.innerText = titleText;
  if (cat && catText) cat.innerText = catText;
  if (metric && metricText) metric.innerText = metricText.startsWith('✦') ? metricText : `✦ ${metricText}`;
  if (desc && descText) desc.innerText = descText;

  // Contextual WhatsApp link for active case study
  const waBtn = document.querySelector('.lightbox-action-row a');
  if (waBtn) {
    const targetPhone = window.customTargetPhone || '201008080295';
    const waMsg = currentLang === 'ar'
      ? `السلام عليكم OTB Agency، أرغب في مناقشة استراتيجية وحملة لعلامتي التجارية مماثلة لسابقة الأعمال: (${titleText || 'معرض الأعمال'}).`
      : `Hello OTB Agency! I would like to discuss an enterprise growth strategy similar to: (${titleText || 'Showcase Case'}).`;
    waBtn.href = `https://wa.me/${targetPhone}?text=${encodeURIComponent(waMsg)}`;
    waBtn.innerText = currentLang === 'ar' ? 'طلب استراتيجية مماثلة 💬' : 'Request Similar Strategy 💬';
  }

  if (overlay) overlay.classList.add('active');
};

window.closeLightbox = function() {
  const overlay = document.getElementById('lightboxOverlay');
  if (overlay) overlay.classList.remove('active');
};

/* ==========================================================================
   DOM INITIALIZATION
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initSoundEngine();
  initThreeHero();
  initRoiCalculator();
  initLightbox();
  initShowcaseFilters();
  initModal();
  initNavbar();
  initCounterObserver();
  syncFromAdminStorage();

  // Check URL parameter for language
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('lang') === 'ar') {
    toggleLanguage(false);
  }
});

/* ==========================================================================
   1. MAGNETIC CUSTOM CURSOR (Hardware-accelerated)
   ========================================================================== */
function initCursor() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let isTicking = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    if (!isTicking) {
      isTicking = true;
      requestAnimationFrame(renderRing);
    }
  }, { passive: true });

  function renderRing() {
    ringX += (mouseX - ringX) * 0.2;
    ringY += (mouseY - ringY) * 0.2;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    
    if (Math.abs(mouseX - ringX) > 0.5 || Math.abs(mouseY - ringY) > 0.5) {
      requestAnimationFrame(renderRing);
    } else {
      isTicking = false;
    }
  }

  const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .portfolio-spec-card, .craft-card, .calc-chip, .hero-monolith-box, .benchmark-media-side, .craft-preview-thumb, .manifesto-media-side');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('cursor-hover'), { passive: true });
    el.addEventListener('mouseleave', () => ring.classList.remove('cursor-hover'), { passive: true });
  });
}

/* ==========================================================================
   2. WEB AUDIO SYNTHESIZED SOUND SYSTEM
   ========================================================================== */
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playSound(type) {
  if (!isSoundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'hover') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(540, now + 0.04);
      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'click') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(620, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.08);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    }
  } catch (e) {
    // Audio safe fallback
  }
}

function initSoundEngine() {
  const soundBtn = document.getElementById('soundToggleBtn');
  const iconOn = soundBtn ? soundBtn.querySelector('.sound-icon-on') : null;
  const iconOff = soundBtn ? soundBtn.querySelector('.sound-icon-off') : null;

  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      isSoundEnabled = !isSoundEnabled;
      if (iconOn && iconOff) {
        iconOn.style.display = isSoundEnabled ? 'block' : 'none';
        iconOff.style.display = isSoundEnabled ? 'none' : 'block';
      }
      if (isSoundEnabled) playSound('click');
    });
  }

  const clickables = document.querySelectorAll('button, a, .calc-chip, .portfolio-spec-card, .filter-tab-btn');
  clickables.forEach(item => {
    item.addEventListener('mouseenter', () => playSound('hover'), { passive: true });
    item.addEventListener('click', () => playSound('click'), { passive: true });
  });
}

/* ==========================================================================
   3. OPTIMIZED THREE.JS HERO (Pauses when offscreen for 0% idle GPU)
   ========================================================================== */
function initThreeHero() {
  const canvas = document.getElementById('webgl-hero-canvas');
  const heroSection = document.getElementById('home');
  if (!canvas || typeof THREE === 'undefined' || !heroSection) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 4.5;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' });
  } catch (e) {
    return; // WebGL not supported
  }

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

  const count = 120;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 14;
    positions[i + 1] = (Math.random() - 0.5) * 10;
    positions[i + 2] = (Math.random() - 0.5) * 8;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    size: 0.04,
    color: 0xFFFFFF,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending
  });

  const particleSystem = new THREE.Points(geometry, material);
  scene.add(particleSystem);

  let targetMouseX = 0, targetMouseY = 0;
  let currentMouseX = 0, currentMouseY = 0;
  let animFrameId = null;
  let isHeroVisible = true;

  window.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX / window.innerWidth - 0.5) * 0.6;
    targetMouseY = (e.clientY / window.innerHeight - 0.5) * 0.6;
  }, { passive: true });

  function renderLoop() {
    if (!isHeroVisible) return;

    currentMouseX += (targetMouseX - currentMouseX) * 0.05;
    currentMouseY += (targetMouseY - currentMouseY) * 0.05;

    particleSystem.rotation.y += 0.0006;
    particleSystem.position.x = currentMouseX;
    particleSystem.position.y = -currentMouseY;

    renderer.render(scene, camera);
    animFrameId = requestAnimationFrame(renderLoop);
  }

  // IntersectionObserver: Pause Three.js completely when scrolled down!
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isHeroVisible = true;
        if (!animFrameId) {
          animFrameId = requestAnimationFrame(renderLoop);
        }
      } else {
        isHeroVisible = false;
        if (animFrameId) {
          cancelAnimationFrame(animFrameId);
          animFrameId = null;
        }
      }
    });
  }, { threshold: 0.05 });

  heroObserver.observe(heroSection);

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }, { passive: true });
}

/* ==========================================================================
   4. INTERACTIVE ROI & GROWTH CALCULATOR
   ========================================================================== */
function initRoiCalculator() {
  const slider = document.getElementById('budgetSlider');
  const budgetDisplay = document.getElementById('budgetDisplay');
  const reachDisplay = document.getElementById('calcReach');
  const leadsDisplay = document.getElementById('calcLeads');
  const roasDisplay = document.getElementById('calcRoas');

  const industryChips = document.querySelectorAll('#industryChips .calc-chip');
  const channelChips = document.querySelectorAll('#channelChips .calc-chip');

  let currentIndustryFactor = 1.4;
  let currentChannelFactor = 1.0;

  industryChips.forEach(chip => {
    chip.addEventListener('click', () => {
      industryChips.forEach(c => {
        c.classList.remove('active');
        c.setAttribute('aria-checked', 'false');
      });
      chip.classList.add('active');
      chip.setAttribute('aria-checked', 'true');
      currentIndustryFactor = parseFloat(chip.getAttribute('data-factor')) || 1.4;
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
    slider.addEventListener('input', calculateROI, { passive: true });
  }

  function calculateROI() {
    const budget = parseInt(slider.value, 10);
    const suffix = currentLang === 'ar' ? 'شهرياً' : 'month';
    const currency = currentLang === 'ar' ? 'ج.م' : 'EGP';
    const leadsSuffix = currentLang === 'ar' ? 'عميل مؤهل' : 'leads';

    if (budgetDisplay) {
      budgetDisplay.innerHTML = `<bdi>${budget.toLocaleString()} ${currency} / ${suffix}</bdi>`;
    }

    const estReach = Math.round(budget * 15 * currentIndustryFactor * currentChannelFactor);
    const minLeads = Math.round((budget / 110) * currentIndustryFactor);
    const maxLeads = Math.round((budget / 55) * currentIndustryFactor * currentChannelFactor);
    const minRoas = (3.5 * (currentIndustryFactor / 1.1)).toFixed(1);
    const maxRoas = (5.2 * (currentIndustryFactor / 1.1) * (currentChannelFactor === 1.35 ? 1.15 : 1)).toFixed(1);

    if (reachDisplay) reachDisplay.innerHTML = `<bdi>${estReach.toLocaleString()}+</bdi>`;
    if (leadsDisplay) leadsDisplay.innerHTML = `<bdi>${minLeads.toLocaleString()} - ${maxLeads.toLocaleString()} ${leadsSuffix}</bdi>`;
    if (roasDisplay) roasDisplay.innerHTML = `<bdi>${minRoas}x - ${maxRoas}x</bdi>`;
  }

  window.recalcRoi = calculateROI;
  calculateROI();
}

/* ==========================================================================
   5. SHOWCASE FILTER TABS & LIGHTBOX
   ========================================================================== */
function initShowcaseFilters() {
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  const cards = document.querySelectorAll('.portfolio-spec-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const cat = card.getAttribute('data-cat');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

function initLightbox() {
  const cards = document.querySelectorAll('.portfolio-spec-card');
  const overlay = document.getElementById('lightboxOverlay');

  cards.forEach(card => {
    const openCard = () => {
      const src = card.getAttribute('data-img');
      const cardTitle = card.getAttribute('data-title');
      const cardCat = card.getAttribute('data-category');
      const cardMetric = card.getAttribute('data-metric');
      const cardDesc = card.getAttribute('data-desc');

      window.openLightboxForImage(src, cardTitle, cardCat, cardMetric, cardDesc);
    };

    card.addEventListener('click', openCard);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCard();
      }
    });
  });

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) window.closeLightbox();
    });
  }
}

/* ==========================================================================
   6. STRATEGY MODAL WITH VALIDATION
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
    window.openModal();
    const notes = document.getElementById('inputNotes');
    const budget = document.getElementById('budgetSlider') ? parseInt(document.getElementById('budgetSlider').value, 10) : 50000;
    const currLabel = currentLang === 'ar' ? 'ج.م' : 'EGP';
    const period = currentLang === 'ar' ? 'شهرياً' : 'month';
    if (notes) {
      notes.value = currentLang === 'ar' 
        ? `طلب استشارة استراتيجية لميزانية تسويقية تقديرية: ${budget.toLocaleString()} ${currLabel} / ${period}.`
        : `Interested in an enterprise growth roadmap with estimated budget: ${budget.toLocaleString()} ${currLabel} / ${period}.`;
    }
  };

  window.closeModal = function() {
    if (overlay) overlay.classList.remove('active');
    if (nameError) nameError.style.display = 'none';
    if (phoneError) phoneError.style.display = 'none';
  };

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) window.closeModal();
    });
  }

  if (nameInput) nameInput.addEventListener('input', () => { if (nameError) nameError.style.display = 'none'; }, { passive: true });
  if (phoneInput) phoneInput.addEventListener('input', () => { if (phoneError) phoneError.style.display = 'none'; }, { passive: true });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeModal();
      window.closeLightbox();
      window.closeMobileDrawer();
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

      // Save lead to local CRM storage
      try {
        const existingLeads = JSON.parse(localStorage.getItem('otb_leads') || '[]');
        const budgetVal = document.getElementById('budgetSlider') ? parseInt(document.getElementById('budgetSlider').value, 10) : 50000;
        const newLead = {
          id: 'lead_' + Date.now(),
          name: name,
          phone: phone,
          service: service,
          budget: budgetVal,
          notes: notes || '',
          status: 'new',
          created_at: new Date().toISOString()
        };
        existingLeads.unshift(newLead);
        localStorage.setItem('otb_leads', JSON.stringify(existingLeads));
      } catch (err) {
        console.warn('Could not save lead locally:', err);
      }

      const budgetVal = document.getElementById('budgetSlider') ? parseInt(document.getElementById('budgetSlider').value, 10) : 50000;
      const currLabel = currentLang === 'ar' ? 'ج.م' : 'EGP';
      const headerText = currentLang === 'ar' ? 'طلب استشارة استراتيجية جديد - OTB Agency' : 'New Strategy Growth Partnership - OTB Agency';
      const text = encodeURIComponent(`*${headerText}*%0A%0A*Name / Company:* ${name}%0A*Phone / WhatsApp:* ${phone}%0A*Service:* ${service}%0A*Estimated Budget:* ${budgetVal.toLocaleString()} ${currLabel}%0A*Notes:* ${notes || 'None'}`);
      const waUrl = `https://wa.me/201008080295?text=${text}`;

      window.open(waUrl, '_blank');
      window.closeModal();
      form.reset();
    });
  }
}

/* ==========================================================================
   7. BILINGUAL LOCALIZATION ENGINE
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

  const hintMin = document.getElementById('hintMin');
  const hintMid = document.getElementById('hintMid');
  const hintMax = document.getElementById('hintMax');
  const currLabel = currentLang === 'ar' ? 'ج.م' : 'EGP';
  if (hintMin) hintMin.innerHTML = `<bdi>20,000 ${currLabel}</bdi>`;
  if (hintMid) hintMid.innerHTML = `<bdi>150,000 ${currLabel}</bdi>`;
  if (hintMax) hintMax.innerHTML = `<bdi>500,000+ ${currLabel}</bdi>`;

  if (window.recalcRoi) {
    window.recalcRoi();
  }
}

/* ==========================================================================
   8. RESTRUCTURED NAVBAR & MOBILE DRAWER
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileNavDrawer');
  const drawerClose = document.getElementById('drawerCloseBtn');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  let lastScrollY = window.scrollY;
  let scrollTicking = false;

  window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        if (lastScrollY > 30) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }

        let currentId = '';
        sections.forEach(section => {
          const sectionTop = section.offsetTop - 140;
          if (lastScrollY >= sectionTop) {
            currentId = section.getAttribute('id');
          }
        });

        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          }
        });

        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

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

  if (drawerClose) drawerClose.addEventListener('click', window.closeMobileDrawer);
  drawerLinks.forEach(l => l.addEventListener('click', window.closeMobileDrawer));
}

/* ==========================================================================
   9. STAT COUNTERS OBSERVER (Physics Easing)
   ========================================================================== */
function initCounterObserver() {
  const statsRow = document.querySelector('.stats-spec-row');
  if (!statsRow) return;
  const counters = document.querySelectorAll('[data-counter]');
  let started = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        counters.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-counter'));
          const hasPlus = (counter.textContent || '').includes('+');
          let current = 0;
          const duration = 1200;
          const frameDuration = 1000 / 60;
          const totalFrames = Math.round(duration / frameDuration);
          let frame = 0;

          const timer = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const easeProgress = progress * (2 - progress); // easeOutQuad
            current = Math.round(easeProgress * target);

            if (frame >= totalFrames) {
              counter.innerText = (hasPlus ? '+' : '') + target;
              clearInterval(timer);
            } else {
              counter.innerText = (hasPlus ? '+' : '') + current;
            }
          }, frameDuration);
        });
      }
    });
  }, { threshold: 0.2 });

  observer.observe(statsRow);
}

/* ==========================================================================
   10. EXECUTIVE BI-DIRECTIONAL STORAGE SYNC
   ========================================================================== */
function syncFromAdminStorage() {
  try {
    // 1. Sync Contact Details
    const storedContent = localStorage.getItem('otb_content_config');
    if (storedContent) {
      const content = JSON.parse(storedContent);
      if (content.contact && content.contact.phone) {
        const cleanPhone = content.contact.phone.replace(/[^\d+]/g, '').replace(/^\+/, '');
        if (cleanPhone) {
          window.customTargetPhone = cleanPhone;
          const floatWa = document.querySelector('.floating-wa-btn');
          if (floatWa) {
            floatWa.href = `https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hello OTB Agency!')}`;
          }
        }
      }
      if (content.contact && content.contact.email) {
        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        emailLinks.forEach(l => {
          l.href = `mailto:${content.contact.email}`;
        });
      }
    }

    // 2. Sync ROI Multipliers
    const storedRoi = localStorage.getItem('otb_roi_config');
    if (storedRoi) {
      const roi = JSON.parse(storedRoi);
      if (roi.industries) {
        Object.keys(roi.industries).forEach(key => {
          const chip = document.querySelector(`#industryChips .calc-chip[data-name="${key}"]`);
          if (chip && roi.industries[key].factor) {
            chip.setAttribute('data-factor', roi.industries[key].factor);
          }
        });
        if (window.recalcRoi) window.recalcRoi();
      }
    }

    // 3. Executive Portal Shortcut: Cmd/Ctrl + Shift + O
    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === 'O' || e.key === 'o' || e.key === 'خ')) {
        e.preventDefault();
        window.location.href = 'dashboard.html';
      }
    });
  } catch (err) {
    console.debug('Storage sync notice:', err);
  }
}

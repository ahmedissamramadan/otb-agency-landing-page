/* ==========================================================================
   OTB Agency — Official Luxury Brand Deck System
   Custom Fonts (Felfel, KO-Okies) + Three.js 3D WebGL Engine + GSAP + Lenis
   ========================================================================== */

let currentLang = 'ar';

const i18n = {
  ar: {
    lang_btn: '🌐 English',
    nav_about: 'عن OTB',
    nav_services: 'خدماتنا',
    nav_showcase: 'معرض الأعمال',
    nav_contact: 'التواصل المباشر',
    nav_wa: '💬 الواتساب المباشر',

    hero_tag: 'OFFICIAL AGENCY VISION · 2026',
    hero_title: 'نضع علامتك <br>تحت <span class="gold-italic-accent">أضواء</span> القيادة',
    hero_desc: 'أكثر من 7 سنوات في وضع العلامات التجارية تحت أضواء النجاح. نبتكر قصصاً مرئية واستراتيجيات تسويقية جريئة تخلق فارقاً استثنائياً لبراندك.',

    btn_start: 'ابدأ مشروعك الآن 💬',
    btn_work: 'شاهد أعمالنا',

    stat_1: 'سنوات خبرة',
    stat_2: 'متابع نشط',
    stat_3: 'استراتيجيات مثبتة',

    card_b1: 'إنتاج مرئي فاخر للقهوة واللايف ستايل',
    card_b2: 'استراتيجيات تسويقية تتصدّر السوق',
    card_b3: 'هويات بصرية ثلاثية الأبعاد مميزة',

    services_tag: 'SERVICES',
    services_title: 'منظومة الخدمات الاستراتيجية',
    services_sub: 'نضع براندك في المقدمة باستراتيجيات جريئة وإنتاج مرئي رفيع المستوى.',

    s1_title: 'Visual Storytelling',
    s1_desc: 'إنتاج مرئي احترافي للقهوة المختصة، اللايف ستايل، والمنتجات الفاخرة يبرز تفاصيل ودقة الحرفة.',

    s2_title: 'Marketing Strategies',
    s2_desc: 'استراتيجيات تسويقية جريئة تتصدّر السوق وتحقق نتائج تجارية حقيقية وملموسة لبراندك.',

    s3_title: '3D Branding',
    s3_desc: 'تطوير هويات بصرية ثلاثية الأبعاد مميزة وشعارات مخصصة تعكس قوة وتميز العلامة التجارية.',

    cta_title: 'جاهز لوضع علامتك التجارية <span class="gold-text">تحت أضواء القيادة؟</span>',
    cta_desc: 'تواصل معنا اليوم لبدء جلسة العمل الاستراتيجية لبناء نمو براندك.',
    btn_modal: 'احجز جلسة استراتيجية',

    modal_title: 'BOOK OTB STRATEGY SESSION',
    modal_desc: 'أدخل بياناتك وسيتم التواصل معك مباشرة بواسطة فريق OTB Agency.',
    form_name: 'الاسم / الشركة',
    form_phone: 'رقم التواصل / الواتساب',
    form_submit: 'أرسل الطلب إلى OTB Agency',

    ph_name: 'اسمك أو اسم براندك',
    ph_phone: '+20 100 808 0295',

    footer_bio: 'Digital Marketing · Bold Strategies · Real Results. أكثر من 7 سنوات في وضع العلامات التجارية تحت الأضواء.'
  },
  en: {
    lang_btn: '🌐 العربية',
    nav_about: 'About OTB',
    nav_services: 'Services',
    nav_showcase: 'Showcase',
    nav_contact: 'Contact',
    nav_wa: '💬 Direct WhatsApp',

    hero_tag: 'OFFICIAL AGENCY VISION · 2026',
    hero_title: 'Putting Your Brand <br>In The <span class="gold-italic-accent">Spotlight</span> Of Leadership',
    hero_desc: '7+ years of putting brands in the spotlight. We craft visual stories and bold marketing strategies that deliver extraordinary impact for your brand.',

    btn_start: 'Start Your Project Now 💬',
    btn_work: 'View Our Work',

    stat_1: 'Years Experience',
    stat_2: 'Active Followers',
    stat_3: 'Proven Strategies',

    card_b1: 'Luxury visual production for coffee & lifestyle',
    card_b2: 'Market-leading bold marketing strategies',
    card_b3: 'Distinctive 3D isometric branding systems',

    services_tag: 'SERVICES',
    services_title: 'Strategic Services Suite',
    services_sub: 'Positioning your brand at the forefront through bold strategies and top-tier visual craftsmanship.',

    s1_title: 'Visual Storytelling',
    s1_desc: 'High-end commercial videography for specialty coffee, lifestyle, and premium products highlighting true craftsmanship.',

    s2_title: 'Marketing Strategies',
    s2_desc: 'Bold, market-leading strategies engineered to drive real, tangible commercial growth for your business.',

    s3_title: '3D Branding',
    s3_desc: 'Developing signature 3D isometric branding systems and custom logo identities that stand out.',

    cta_title: 'Ready To Put Your Brand <span class="gold-text">In The Spotlight?</span>',
    cta_desc: 'Connect with us today to schedule your strategy session and accelerate your brand growth.',
    btn_modal: 'Book Strategy Session',

    modal_title: 'BOOK OTB STRATEGY SESSION',
    modal_desc: 'Enter your details to connect directly with OTB Agency strategists.',
    form_name: 'Full Name / Company',
    form_phone: 'Phone / WhatsApp Number',
    form_submit: 'Submit Request to OTB Agency',

    ph_name: 'Your Name or Brand Name',
    ph_phone: '+20 100 808 0295',

    footer_bio: 'Digital Marketing · Bold Strategies · Real Results. 7+ years of putting brands in the spotlight.'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initLenis();
  initNavbar();
  initModal();
  initThreeJsWebGL();
  initCard3DCube();
  initGsapAnimations();
  updateLanguageUI();
});

/* 1. Lenis Smooth Scroll Engine */
function initLenis() {
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
}

/* 2. Three.js Background 3D Particles WebGL Engine */
function initThreeJsWebGL() {
  const canvas = document.getElementById('webgl-hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Particles Geometry
  const particlesCount = 200;
  const posArray = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 12;
  }

  const particlesGeometry = new THREE.BufferGeometry();
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

  // Gold Particle Material
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.04,
    color: 0xC5A059,
    transparent: true,
    opacity: 0.65
  });

  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  // Mouse Parallax Interaction
  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
  });

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);
    particlesMesh.rotation.y += 0.0015;
    particlesMesh.rotation.x += 0.0008;

    particlesMesh.position.x += (mouseX - particlesMesh.position.x) * 0.05;
    particlesMesh.position.y += (-mouseY - particlesMesh.position.y) * 0.05;

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

/* 3. Three.js Interactive Gold 3D Wireframe Cube inside Hero Card */
function initCard3DCube() {
  const container = document.getElementById('card3dContainer');
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.z = 4;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // 3D Isometric Wireframe Cube
  const geometry = new THREE.BoxGeometry(1.6, 1.6, 1.6);
  const wireframeGeometry = new THREE.WireframeGeometry(geometry);

  const material = new THREE.LineBasicMaterial({
    color: 0xC5A059,
    linewidth: 2
  });

  const cubeMesh = new THREE.LineSegments(wireframeGeometry, material);
  cubeMesh.rotation.x = Math.PI / 4;
  cubeMesh.rotation.y = Math.PI / 4;
  scene.add(cubeMesh);

  // Ambient Lighting
  const light = new THREE.DirectionalLight(0xFFFFFF, 1);
  light.position.set(2, 2, 2).normalize();
  scene.add(light);

  // Render Loop
  function animateCube() {
    requestAnimationFrame(animateCube);
    cubeMesh.rotation.x += 0.008;
    cubeMesh.rotation.y += 0.012;
    renderer.render(scene, camera);
  }
  animateCube();
}

/* 4. GSAP Entrance & Scroll Animations */
function initGsapAnimations() {
  if (typeof gsap !== 'undefined') {
    gsap.from('.hero-headline', { opacity: 0, y: 30, duration: 1, delay: 0.2 });
    gsap.from('.hero-description', { opacity: 0, y: 20, duration: 1, delay: 0.4 });
    gsap.from('.hero-cta', { opacity: 0, y: 20, duration: 1, delay: 0.6 });
    gsap.from('.featured-dark-card', { opacity: 0, scale: 0.95, duration: 1.2, delay: 0.3 });
  }
}

/* Toggle Language Function */
window.toggleLanguage = function() {
  currentLang = currentLang === 'ar' ? 'en' : 'ar';
  const html = document.documentElement;
  
  if (currentLang === 'ar') {
    html.setAttribute('dir', 'rtl');
    html.setAttribute('lang', 'ar');
  } else {
    html.setAttribute('dir', 'ltr');
    html.setAttribute('lang', 'en');
  }

  updateLanguageUI();
};

/* Update UI Text Nodes & Direction */
function updateLanguageUI() {
  const dictionary = i18n[currentLang];
  const elements = document.querySelectorAll('[data-i18n]');

  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dictionary[key]) {
      el.innerHTML = dictionary[key];
    }
  });

  // Update button label
  const langBtn = document.getElementById('langToggleBtn');
  if (langBtn) langBtn.innerText = dictionary.lang_btn;

  // Update placeholders
  const inputName = document.getElementById('inputName');
  const inputPhone = document.getElementById('inputPhone');

  if (inputName) inputName.setAttribute('placeholder', dictionary.ph_name);
  if (inputPhone) inputPhone.setAttribute('placeholder', dictionary.ph_phone);
}

/* Navbar Scroll Effect */
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

/* Strategy Consultation Modal Form Handler */
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
    const msg = currentLang === 'ar' 
      ? 'شكراً لك! تم استلام طلبك بوكالة OTB Agency (+20 100 808 0295). سيتواصل معك أحد متخصصي الفريق فوراً.'
      : 'Thank you! Your request has been received by OTB Agency (+20 100 808 0295). Our team will get back to you shortly.';
    alert(msg);
    closeModal();
    form.reset();
  });
}

/* ==========================================================================
   OTB Agency — Official PDF Brand Deck i18n & Interactions
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
  initNavbar();
  initModal();
  updateLanguageUI();
});

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
    const msg = currentLang === 'ar' 
      ? 'شكراً لك! تم استلام طلبك بوكالة OTB Agency (+20 100 808 0295). سيتواصل معك أحد متخصصي الفريق فوراً.'
      : 'Thank you! Your request has been received by OTB Agency (+20 100 808 0295). Our team will get back to you shortly.';
    alert(msg);
    closeModal();
    form.reset();
  });
}

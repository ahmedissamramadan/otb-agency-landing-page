/* ==========================================================================
   OTB Agency — Interactive Engine & Ultra Humanistic Core
   Features: Three.js 3D WebGL (Particles & Interactive Monolith),
   Lenis Smooth Scroll, GSAP 3.12, Tactile Sound Synthesis,
   Dynamic ROI Simulator, Bilingual Localization Engine, and Lightbox.
   ========================================================================== */

let currentLang = 'ar';
let isSoundEnabled = true;

/* ==========================================================================
   BILINGUAL I18N DICTIONARY
   ========================================================================== */
const i18n = {
  ar: {
    lang_btn: 'English',
    nav_about: 'عن OTB',
    nav_services: 'خدماتنا',
    nav_clients: 'عملاؤنا',
    nav_showcase: 'معرض الأعمال',
    nav_process: 'منهجية العمل',
    nav_calculator: 'حاسبة النمو',
    nav_contact: 'التواصل',
    nav_wa: 'الواتساب المباشر',

    hero_tag: 'OFFICIAL AGENCY VISION · 2026',
    hero_title: 'نضع علامتك <br>تحت <span class="gold-italic-accent">أضواء</span> القيادة',
    hero_desc: 'أكثر من 7 سنوات في صياغة هويات بصرية استثنائية، وإنتاج مرئي سينمائي للعلامات الراقية والقهوة المختصة، وإطلاق حملات تسويقية جريئة تُهيمن على السوق وتحقق نمواً استثنائياً.',
    btn_start: 'ابدأ مشروعك الآن',
    btn_work: 'شاهد أعمالنا',

    stat_1: 'سنوات قيادة بالسوق',
    stat_2: 'متابع وعميل نشط',
    stat_3: 'متوسط مضاعف الـ ROAS',

    drag_hint: '✦ اسحب للتدوير 360°',
    card_b1: 'إنتاج مرئي سينمائي فاخر للقهوة واللايف ستايل',
    card_b2: 'استراتيجيات تسويقية جريئة تتصدّر السوق وتحقق مبيعات حقيقية',
    card_b3: 'هويات بصرية ثلاثية الأبعاد مميزة ومنظومات علامة متكاملة',
    btn_request_audit: 'جلسة استشارية ⚡',

    clients_tag: 'TRUSTED BY INDUSTRY LEADERS & VISIONARY BRANDS',

    about_tag: 'WHO WE ARE',
    about_title: 'نحن لا نصنع إعلانات تقليدية، <br><span class="gold-italic-accent">بل نبني أساطير تجارية</span>',
    about_lead: 'في OTB Agency (Out of The Box)، نؤمن أن البراندات العظيمة لا تولد داخل القوالب الجاهزة، بل تتألق عندما تكسر المألوف وتقدم تجربة تخاطب حواس ومشاعر العملاء.',
    badge_years_exp: 'سنوات من الإبداع خارج الصندوق',
    feat1_title: 'إتقان سينمائي فائق',
    feat1_desc: 'نروي قصة منتجك بأعلى معايير الإضاءة، الكاميرات الاحترافية، واللونيات السينمائية التي تجعل المشاهد يعيش التجربة.',
    feat2_title: 'استراتيجيات نمو مبنية على الأرقام',
    feat2_desc: 'كل فكرة إبداعية نطلقها تدعمها تحليلات دقيقة لمسار العميل ومعدل التحويل (ROAS) لتحقيق أعلى عائد تجاري.',
    btn_see_services: 'تعرف على حلولنا الاستراتيجية',

    services_tag: 'COMPREHENSIVE SERVICES SYSTEM',
    services_title: 'منظومة الخدمات الاستراتيجية المتكاملة',
    services_sub: 'نصمم لبراندك حضوراً متفرداً لا يمر مرور الكرام، من خلال 5 ركائز نمو إنسانية ورقمية متطورة.',

    tab_all: '✦ كافة الخدمات (5)',
    tab_video: '🎥 الإنتاج المرئي والسينمائي',
    tab_marketing: '📈 الإعلانات الممولة والنمو',
    tab_branding: '🎲 الهوية البصرية وثلاثي الأبعاد',
    tab_automation: '⚡ قنوات التحويل والأتمتة',

    deliv_title: 'ما يشمله التنفيذ:',
    btn_book_service: 'اطلب الخدمة 💬',

    s1_title: 'Visual Storytelling & Lifestyle Video',
    s1_tagline: 'الإنتاج المرئي للقهوة المختصة، المطاعم، والمنتجات الفاخرة',
    s1_desc: 'نبتكر فيديوهات إعلانية سينمائية تخاطب حواس المشاهد وتبرز أدق تفاصيل الحرفة والمنتج، باستخدام كاميرات سينما 4K، إضاءات درامية، وهندسة صوتية غامرة تحول المشاهد إلى عميل مخلص.',
    s1_d1: 'إعلانات Reels & Shorts سينمائية فائقة الجاذبية',
    s1_d2: 'تصوير فوتوغرافي تجاري بدقة عالية للمنتجات',
    s1_d3: 'إخراج بصري وكتابة سكربتات قصصية تحرك العاطفة',
    s1_d4: 'مونتاج متقدم وتصحيح ألوان سينمائي (Color Grading)',
    s1_metric: 'معدل التفاعل العضوي',

    s2_title: 'Performance Marketing & Paid Growth',
    s2_tagline: 'إعلانات ممولة عالية العائد على منصات Meta و TikTok',
    s2_desc: 'استراتيجيات حملات تسويقية جريئة ومحسوبة بالمليمتر. نستهدف جمهورك المستعد للشراء، وننفذ اختبارات A/B مستمرة على المحتوى الإبداعي والنسخ الإعلانية لتعظيم مضاعف الـ ROAS وتخفيض تكلفة الاستحواذ.',
    s2_d1: 'هيكلة حملات متكاملة (TOFU, MOFU, BOFU)',
    s2_d2: 'إعلانات فيسبوك وانستجرام وتيك توك الموجهة',
    s2_d3: 'إعادة استهداف ذكية (Retargeting Pixel & CAPI)',
    s2_d4: 'تقارير لوحة قيادة حية وشفافة للأداء الأسبوعي',
    s2_metric: 'متوسط الـ ROAS المحقق',

    s3_title: '3D Branding & Signature Visual Systems',
    s3_tagline: 'هويات بصرية ثلاثية الأبعاد ومنظومات علامة فارقة',
    s3_desc: 'نبني لعلامتك التجارية لغة بصرية متكاملة لا تُنسى. من تصميم الشعارات الأيقونية، إلى تجسيد المنتجات ثلاثية الأبعاد (3D Renders)، واختيار الخطوط والألوان التي تعكس الفخامة والهيمنة السوقية.',
    s3_d1: 'تصميم الهوية البصرية ودليل البراند (Brand Book)',
    s3_d2: 'رندرات ثلاثية الأبعاد 3D للمنتجات والعبوات',
    s3_d3: 'تايبوغرافي مخصص وأيقونات موجهة للعلامة',
    s3_d4: 'موشن جرافيكس وهوية حركية لمنصات التواصل',
    s3_metric: 'أصالة وتفرد تصميمي',

    s4_title: 'Social Media Management & Authority',
    s4_tagline: 'إدارة استراتيجية وبناء مجتمع مخلص للعلامة التجارية',
    s4_desc: 'تحويل صفحات السوشيال ميديا الخاصة بك إلى منصة جاذبة للمبيعات والمتابعين الحقيقيين. نخطط جداول نشر محكمة، ونكتب نصوصاً إعلانية تفاعلية (Copywriting) تناسب خوارزميات كل منصة وتلهم الجمهور.',
    s4_d1: 'خطة نشر وتوزيع شهري مدروسة بعناية',
    s4_d2: 'كتابة محتوى تسويقي عالي التحويل وقصص تفاعلية',
    s4_d3: 'إدارة المجتمع والرد السريع على الاستفسارات',
    s4_d4: 'تحليل مستمر لخوارزميات الترند وصناعة محتوى مواكب',
    s4_metric: 'نمو سنوي بالمتابعين',

    s5_title: 'WhatsApp Conversion Funnels & Automation',
    s5_tagline: 'بناء مسارات تحويل سريعة وأتمتة مبيعات الواتساب',
    s5_desc: 'نربط حملاتك الإعلانية بقنوات دردشة مباشرة وفائقة السرعة عبر واتساب، مع أتمتة الردود وحجز المواعيد، وتصميم صفحات هبوط خاطفة تضمن عدم فقدان أي عميل محتمل وتضاعف المبيعات الفورية.',
    s5_d1: 'تصميم صفحات هبوط (Landing Pages) سريعة ومقنعة',
    s5_d2: 'ربط واتساب بزنس وتدفقات الرد الآلي الذكية',
    s5_d3: 'تتبع متقدم لمصادر العملاء وتتبع البكسل بالمحادثة',
    s5_d4: 'تأهيل العملاء المحتملين تلقائياً (Lead Qualification)',
    s5_metric: 'زمن الاستجابة للعميل',

    showcase_tag: 'PROVEN PORTFOLIO & CASE STUDIES',
    showcase_title: 'معرض الأعمال والقصص الناجحة',
    showcase_sub: 'نماذج حية من هوياتنا البصرية، حملاتنا الإعلانية، وإنتاجنا السينمائي لشركاء النجاح. انقر على أي مشروع لاستعراض كواليسه ونتائجه.',
    btn_claim_spotlight: 'احجز جلستك الاستراتيجية الآن 👑',

    process_tag: 'PROVEN EXECUTION FRAMEWORK',
    process_title: 'منهجية OTB لتحقيق الصدارة',
    process_sub: 'طريقة عمل دقيقة ومجربة تضمن لك الانتقال من مجرد التواجد العادي إلى القيادة الحقيقية للسوق.',
    step1_title: 'التدقيق واستكشاف الـ DNA',
    step1_desc: 'دراسة شاملة لجمهورك ومنافسيك، وتحديد الثغرات التسويقية ونقاط القوة الخفية في منتجك.',
    step2_title: 'الهندسة الإبداعية والإنتاج',
    step2_desc: 'صناعة القصص المرئية، تصوير الفيديوهات السينمائية، وبناء هوية ورسائل تخطف الأنظار من أول ثانية.',
    step3_title: 'الإطلاق واستهداف السوق',
    step3_desc: 'نشر المحتوى وتفعيل الحملات الإعلانية الممولة بدقة جراحية على المنصات الأكثر تأثيراً لجمهورك.',
    step4_title: 'التوسّع ومضاعفة المبيعات',
    step4_desc: 'تحليل مستمر لمؤشرات الأداء، وضخ الميزانيات في الزوايا الرابحة لمضاعفة الـ ROAS والوصول للقمة.',

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

    testi_tag: 'CLIENT VOICES',
    testi_title: 'ماذا يقول شركاؤنا عن تجربة OTB؟',
    testi_sub: 'شهادات حقيقية من مؤسسي علامات تجارية وضعناهم في بقعة الضوء وحققنا معهم نتائج استثنائية.',
    t1_quote: '"فريق OTB غير مفهومنا عن الإعلانات. تصويرهم للقهوة المختصة كان بمستوى سينمائي عالمي رفع قيمة علامتنا، وحملاتهم الممولة حققت لنا عائد 4.2x من أول شهر!"',
    t2_quote: '"الهوية البصرية والفيديوهات ثلاثية الأبعاد اللي صمموها لنا ميزتنا تماماً عن كل المنافسين في السوق. الاحترافية والسرعة في التنفيذ عندهم لا تضاهى."',
    t3_quote: '"ربط مسارات الواتساب بحملات تيك توك وفيسبوك ضاعف سرعة تحويل العملاء عندنا لأكثر من 3 أضعاف. أفضل استثمار تسويقي قمنا به بلا شك."',

    cta_title: 'جاهز لوضع علامتك التجارية <br><span class="gold-text">تحت أضواء القيادة؟</span>',
    cta_desc: 'تواصل معنا اليوم لبدء جلسة العمل الاستراتيجية لبناء نمو براندك وصناعة الفارق في سوقك.',
    btn_modal: 'احجز جلسة استراتيجية فورية',

    modal_title: 'BOOK OTB STRATEGY SESSION',
    modal_desc: 'أدخل بياناتك وسيتم التواصل معك مباشرة بواسطة فريق OTB Agency لبناء خطتك الإعلانية.',
    form_name: 'الاسم / الشركة *',
    form_phone: 'رقم التواصل / الواتساب *',
    form_service: 'الخدمة المطلوبة:',
    form_notes: 'ملاحظات أو روابط حسابات البراند (اختياري):',
    form_submit: 'تأكيد وإرسال الطلب إلى OTB Agency 💬',

    footer_bio: 'Digital Marketing · Bold Strategies · Real Results. أكثر من 7 سنوات في وضع العلامات التجارية تحت الأضواء وصناعة الفارق الاستثنائي بالسوق.',
    agency_ready: 'جاهزون لاستقبال المشاريع الجديدة',
    f_services_title: 'SERVICES',
    f_social_title: 'CONNECT',
    f_contact_title: 'DIRECT CONTACT'
  },

  en: {
    lang_btn: 'العربية',
    nav_about: 'About OTB',
    nav_services: 'Services',
    nav_clients: 'Clients',
    nav_showcase: 'Showcase',
    nav_process: 'Methodology',
    nav_calculator: 'ROI Planner',
    nav_contact: 'Contact',
    nav_wa: 'WhatsApp Direct',

    hero_tag: 'OFFICIAL AGENCY VISION · 2026',
    hero_title: 'Putting Your Brand <br>In The <span class="gold-italic-accent">Spotlight</span> Of Leadership',
    hero_desc: '7+ years of engineering iconic visual identities, high-end cinematic commercials for specialty coffee & lifestyle brands, and market-dominant growth campaigns that drive real commercial scale.',
    btn_start: 'Start Your Project Now',
    btn_work: 'View Our Work',

    stat_1: 'Years Market Mastery',
    stat_2: 'Active Community & Clients',
    stat_3: 'Average Client ROAS',

    drag_hint: '✦ Drag to Rotate 360°',
    card_b1: 'Luxury cinematic storytelling for specialty coffee & lifestyle',
    card_b2: 'Market-leading bold campaigns engineered for pure revenue',
    card_b3: 'Signature 3D isometric branding & custom identity systems',
    btn_request_audit: 'Strategy Audit ⚡',

    clients_tag: 'TRUSTED BY INDUSTRY LEADERS & VISIONARY BRANDS',

    about_tag: 'WHO WE ARE',
    about_title: 'We Don\'t Just Run Ads, <br><span class="gold-italic-accent">We Build Market Legends</span>',
    about_lead: 'At OTB Agency (Out of The Box), we believe iconic brands aren\'t built inside cookie-cutter templates. They thrive when defying the ordinary through emotional resonance and sensory craft.',
    badge_years_exp: 'Years of Out of The Box Craft',
    feat1_title: 'Cinematic Precision',
    feat1_desc: 'Telling your product\'s story with high-end cinema lenses, dramatic lighting, and color grading that turns viewers into lifelong believers.',
    feat2_title: 'Data-Backed Growth Engineering',
    feat2_desc: 'Every bold creative is backed by granular ROAS funnels and conversion analytics to maximize commercial returns.',
    btn_see_services: 'Discover Strategic Solutions',

    services_tag: 'COMPREHENSIVE SERVICES SYSTEM',
    services_title: 'Strategic Full-Funnel Solutions',
    services_sub: 'Positioning your brand at the absolute forefront through 5 high-impact human & digital growth pillars.',

    tab_all: '✦ All Services (5)',
    tab_video: '🎥 Visual & Cinematic Video',
    tab_marketing: '📈 Paid Ads & Growth',
    tab_branding: '🎲 3D & Brand Identity',
    tab_automation: '⚡ WhatsApp & Automation',

    deliv_title: 'What\'s Included:',
    btn_book_service: 'Book Service 💬',

    s1_title: 'Visual Storytelling & Lifestyle Video',
    s1_tagline: 'Cinematic production for specialty coffee, dining, and luxury goods',
    s1_desc: 'We craft high-converting, sensory commercials highlighting the deepest craftsmanship of your brand using 4K cinema gear, immersive sound design, and narrative scripts.',
    s1_d1: 'High-engagement Reels & Shorts commercials',
    s1_d2: 'Commercial product & studio photography',
    s1_d3: 'Creative direction & emotional scriptwriting',
    s1_d4: 'Advanced editing & master color grading',
    s1_metric: 'Organic Engagement Lift',

    s2_title: 'Performance Marketing & Paid Growth',
    s2_tagline: 'High-ROAS paid campaigns on Meta & TikTok ecosystems',
    s2_desc: 'Bold, precision-targeted ad strategies. We target high-intent buyers and run continuous creative A/B testing to scale ROAS and aggressively lower customer acquisition costs.',
    s2_d1: 'Full-funnel TOFU, MOFU, BOFU architecture',
    s2_d2: 'Hyper-targeted Meta & TikTok campaigns',
    s2_d3: 'Smart retargeting & Conversions API integration',
    s2_d4: 'Transparent weekly live performance dashboards',
    s2_metric: 'Average ROAS Multiplier',

    s3_title: '3D Branding & Signature Visual Systems',
    s3_tagline: 'Distinctive 3D isometric systems & bespoke brand books',
    s3_desc: 'Building unforgettable visual languages for your business. From iconic logo marks to hyper-realistic 3D product renders and luxury typography that command attention.',
    s3_d1: 'Complete visual identity & official Brand Book',
    s3_d2: '3D product & packaging CGI rendering',
    s3_d3: 'Custom typography & bespoke icon sets',
    s3_d4: 'Dynamic motion graphics & animated brand assets',
    s3_metric: 'Bespoke Visual Authenticity',

    s4_title: 'Social Media Management & Authority',
    s4_tagline: 'Strategic content engines and dedicated community building',
    s4_desc: 'Transforming your social profiles into 24/7 client-acquisition machines. We architect high-converting content calendars, persuasive copywriting, and trend-focused stories.',
    s4_d1: 'Curated monthly editorial & distribution calendars',
    s4_d2: 'High-conversion copywriting & interactive stories',
    s4_d3: 'Proactive community response & engagement management',
    s4_d4: 'Continuous trend analysis and adaptive storytelling',
    s4_metric: 'Annual Follower Growth',

    s5_title: 'WhatsApp Conversion Funnels & Automation',
    s5_tagline: 'Fast-track conversation funnels and direct CRM automation',
    s5_desc: 'Connecting your paid ads to lightning-fast direct messaging funnels on WhatsApp, with intelligent auto-replies, seamless lead qualification, and zero drop-off rates.',
    s5_d1: 'High-speed conversion landing pages',
    s5_d2: 'WhatsApp Business API & automated chat workflows',
    s5_d3: 'Granular lead-source and pixel tracking inside chats',
    s5_d4: 'Automated lead scoring & immediate booking triggers',
    s5_metric: 'Average Lead Response Time',

    showcase_tag: 'PROVEN PORTFOLIO & CASE STUDIES',
    showcase_title: 'Signature Work & Client Success',
    showcase_sub: 'Live visual case studies spanning cinematic commercials, 3D brand systems, and performance campaigns. Click any project to inspect behind-the-scenes.',
    btn_claim_spotlight: 'Claim Your Brand Spotlight 👑',

    process_tag: 'PROVEN EXECUTION FRAMEWORK',
    process_title: 'The OTB Velocity Engine',
    process_sub: 'A battle-tested 4-step framework guiding your brand from ordinary presence to undeniable market dominance.',
    step1_title: 'Discovery & DNA Audit',
    step1_desc: 'Deep audit of your target audience, competitors, and unlocking your product\'s hidden commercial hooks.',
    step2_title: 'Creative Architecture & Production',
    step2_desc: 'Writing magnetic scripts, shooting cinematic video, and engineering high-impact visual assets.',
    step3_title: 'Market Launch & Targeting',
    step3_desc: 'Deploying content across key channels with surgical ad targeting to capture eager buyers.',
    step4_title: 'Hyper-Scale & Revenue Optimization',
    step4_desc: 'Continuous performance analytics, doubling down on winning angles to maximize profit and market share.',

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

    testi_tag: 'CLIENT VOICES',
    testi_title: 'What Founders Say About OTB',
    testi_sub: 'Real endorsements from business owners whose brands we propelled into the spotlight.',
    t1_quote: '"OTB completely revolutionized our marketing. Their cinematic coffee video elevated our brand prestige, and their paid ads delivered a 4.2x ROAS in month one!"',
    t2_quote: '"The 3D brand identity and visual systems they created set us miles ahead of every competitor. Their speed and execution quality are world-class."',
    t3_quote: '"Routing TikTok and Meta ads into automated WhatsApp funnels tripled our customer conversion speed. Easily the best growth investment we made."',

    cta_title: 'Ready To Put Your Brand <br><span class="gold-text">In The Spotlight?</span>',
    cta_desc: 'Connect with our strategists today to architect your growth trajectory and claim market leadership.',
    btn_modal: 'Book Strategy Session Now',

    modal_title: 'BOOK OTB STRATEGY SESSION',
    modal_desc: 'Submit your contact details and an OTB Agency strategist will reach out immediately to formulate your roadmap.',
    form_name: 'Full Name / Company *',
    form_phone: 'WhatsApp / Phone Number *',
    form_service: 'Interested Service Pillar:',
    form_notes: 'Brand Links or Goals (Optional):',
    form_submit: 'Confirm Request to OTB Agency 💬',

    footer_bio: 'Digital Marketing · Bold Strategies · Real Results. Over 7 years of spotlighting extraordinary brands and driving measurable commercial leadership.',
    agency_ready: 'Currently Onboarding Select Growth Partners',
    f_services_title: 'SERVICES',
    f_social_title: 'CONNECT',
    f_contact_title: 'DIRECT CONTACT'
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
  initCard3DCube();
  initServicesFilter();
  initRoiCalculator();
  initLightbox();
  initModal();
  initGsapAnimations();
  initCounterObserver();
});

/* Check if ?lang=en is present in URL */
function checkUrlLanguage() {
  const urlParams = new URLSearchParams(window.location.search);
  const lang = urlParams.get('lang');
  if (lang === 'en' && currentLang !== 'en') {
    toggleLanguage(false);
  }
}

/* ==========================================================================
   1. LENIS SMOOTH SCROLL ENGINE
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

  // Hover magnification on interactive elements
  const interactives = document.querySelectorAll('a, button, .service-card, .portfolio-card, input, select, textarea');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width = '56px';
      ring.style.height = '56px';
      ring.style.borderColor = '#C5A059';
      ring.style.backgroundColor = 'rgba(197, 160, 89, 0.12)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width = '36px';
      ring.style.height = '36px';
      ring.style.borderColor = '#C5A059';
      ring.style.backgroundColor = 'rgba(197, 160, 89, 0.05)';
    });
  });
}

/* ==========================================================================
   3. SYNTHESIZED TACTILE AUDIO (Web Audio API)
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

  // Attach micro-sounds to buttons
  document.querySelectorAll('.btn, .filter-tab, .calc-chip, .modal-close').forEach(btn => {
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

    gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (err) {
    // Gracefully ignore if browser blocks audio
  }
}

/* ==========================================================================
   4. THREE.JS BACKGROUND PARTICLE CONSTELLATION
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

  // 350 Golden Ambient Points
  const count = 350;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 14;
    positions[i + 1] = (Math.random() - 0.5) * 10;
    positions[i + 2] = (Math.random() - 0.5) * 8;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    size: 0.038,
    color: 0xC5A059,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending
  });

  const particleSystem = new THREE.Points(geometry, material);
  scene.add(particleSystem);

  // Mouse Parallax Physics
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

    particleSystem.rotation.y += 0.0009;
    particleSystem.rotation.x += 0.0004;

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
   5. THREE.JS INTERACTIVE 3D CUBE & CROWN MONOLITH
   ========================================================================== */
function initCard3DCube() {
  const container = document.getElementById('card3dContainer');
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.z = 4.2;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Outer Isometric Wireframe Geometry
  const boxGeo = new THREE.BoxGeometry(1.6, 1.6, 1.6);
  const wireGeo = new THREE.WireframeGeometry(boxGeo);
  const wireMat = new THREE.LineBasicMaterial({ color: 0xC5A059, linewidth: 2 });
  const cubeWire = new THREE.LineSegments(wireGeo, wireMat);
  scene.add(cubeWire);

  // Inner Glowing Core Octahedron
  const innerGeo = new THREE.OctahedronGeometry(0.7, 0);
  const innerMat = new THREE.MeshBasicMaterial({ color: 0xE5C278, wireframe: true, transparent: true, opacity: 0.8 });
  const innerMesh = new THREE.Mesh(innerGeo, innerMat);
  scene.add(innerMesh);

  // Drag-to-Rotate Physics
  let isDragging = false;
  let prevPointerX = 0, prevPointerY = 0;
  let velX = 0.008, velY = 0.012;

  const onPointerDown = (e) => {
    isDragging = true;
    prevPointerX = e.clientX || (e.touches && e.touches[0].clientX);
    prevPointerY = e.clientY || (e.touches && e.touches[0].clientY);
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);

    const deltaX = clientX - prevPointerX;
    const deltaY = clientY - prevPointerY;

    cubeWire.rotation.y += deltaX * 0.01;
    cubeWire.rotation.x += deltaY * 0.01;
    innerMesh.rotation.y -= deltaX * 0.01;
    innerMesh.rotation.x -= deltaY * 0.01;

    velX = deltaY * 0.002;
    velY = deltaX * 0.002;

    prevPointerX = clientX;
    prevPointerY = clientY;
  };

  const onPointerUp = () => { isDragging = false; };

  container.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerUp);

  container.addEventListener('touchstart', onPointerDown, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: true });
  window.addEventListener('touchend', onPointerUp);

  function animateMonolith() {
    requestAnimationFrame(animateMonolith);

    if (!isDragging) {
      cubeWire.rotation.x += velX;
      cubeWire.rotation.y += velY;
      innerMesh.rotation.x -= velX * 1.5;
      innerMesh.rotation.y -= velY * 1.5;

      velX += (0.004 - velX) * 0.05;
      velY += (0.008 - velY) * 0.05;
    }

    renderer.render(scene, camera);
  }
  animateMonolith();

  window.addEventListener('resize', () => {
    if (!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}

/* ==========================================================================
   6. SERVICES FILTERING ENGINE
   ========================================================================== */
function initServicesFilter() {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.service-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filter = tab.getAttribute('data-filter');

      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 40);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   7. INTERACTIVE ROI & GROWTH CALCULATOR
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
    if (budgetDisplay) {
      budgetDisplay.innerText = `$${budget.toLocaleString()} / شهر`;
    }

    const estReach = Math.round(budget * 180 * currentIndustryFactor * currentChannelFactor);
    const minLeads = Math.round((budget / 4.2) * currentIndustryFactor);
    const maxLeads = Math.round((budget / 2.2) * currentIndustryFactor * currentChannelFactor);
    const minRoas = (3.2 * (currentIndustryFactor / 1.1)).toFixed(1);
    const maxRoas = (4.8 * (currentIndustryFactor / 1.1) * (currentChannelFactor === 1.35 ? 1.15 : 1)).toFixed(1);

    if (reachDisplay) reachDisplay.innerText = `${estReach.toLocaleString()}+`;
    if (leadsDisplay) leadsDisplay.innerText = `${minLeads.toLocaleString()} - ${maxLeads.toLocaleString()} عميل`;
    if (roasDisplay) roasDisplay.innerText = `${minRoas}x - ${maxRoas}x`;
  }

  calculateROI();
}

/* ==========================================================================
   8. PORTFOLIO CASE STUDY & LIGHTBOX ENGINE
   ========================================================================== */
function initLightbox() {
  const cards = document.querySelectorAll('.portfolio-card');
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
   9. STRATEGY BOOKING MODAL WITH FIELD VALIDATION
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
      notes.value = `مهتم بخطة تسويقية بميزانية تقديرية: $${budget}/شهر.`;
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

  // Clear errors on input
  if (nameInput) nameInput.addEventListener('input', () => { if (nameError) nameError.style.display = 'none'; });
  if (phoneInput) phoneInput.addEventListener('input', () => { if (phoneError) phoneError.style.display = 'none'; });

  // Close on Escape key (WCAG)
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

      // Build WhatsApp payload URL
      const text = encodeURIComponent(`*طلب استشارة استراتيجية جديد - OTB Agency*%0A%0A*الاسم:* ${name}%0A*الهاتف:* ${phone}%0A*الخدمة:* ${service}%0A*الملاحظات:* ${notes || 'لا يوجد'}`);
      const waUrl = `https://wa.me/201008080295?text=${text}`;

      window.open(waUrl, '_blank');
      closeModal();
      form.reset();
    });
  }
}

/* ==========================================================================
   10. BILINGUAL LANGUAGE SWITCHER
   ========================================================================== */
window.toggleLanguage = function(updateUrl = true) {
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

  if (updateUrl && history.replaceState) {
    const newUrl = currentLang === 'en' ? '?lang=en' : window.location.pathname;
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
   11. NAVBAR SCROLL EFFECT & MOBILE DRAWER
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

    // Section scroll spy
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

  // Mobile Drawer toggling
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
   12. GSAP ENTRANCE ANIMATIONS
   ========================================================================== */
function initGsapAnimations() {
  if (typeof gsap !== 'undefined') {
    gsap.from('.hero-badge-pill', { opacity: 0, y: 20, duration: 0.8, delay: 0.1 });
    gsap.from('.hero-headline', { opacity: 0, y: 30, duration: 1, delay: 0.25 });
    gsap.from('.hero-sub-en', { opacity: 0, y: 20, duration: 0.9, delay: 0.4 });
    gsap.from('.hero-description', { opacity: 0, y: 20, duration: 0.9, delay: 0.55 });
    gsap.from('.hero-cta', { opacity: 0, y: 20, duration: 0.9, delay: 0.7 });
    gsap.from('.featured-dark-card', { opacity: 0, scale: 0.94, duration: 1.2, delay: 0.35 });
  }
}

/* ==========================================================================
   13. STAT COUNTERS OBSERVER
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
          const isDecimal = counter.getAttribute('data-decimal');
          let current = 0;
          const step = target / 35;

          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              counter.innerText = isDecimal ? target.toFixed(1) : target;
              clearInterval(timer);
            } else {
              counter.innerText = isDecimal ? current.toFixed(1) : Math.floor(current);
            }
          }, 35);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsRow = document.querySelector('.stats-counter-row');
  if (statsRow) observer.observe(statsRow);
}

/* ==========================================================================
   OTB Agency — Executive Command Center & CMS Engine (Digital DNA 2026)
   Autonomous, High-Performance, Zero-Dependency Architecture
   ========================================================================== */

(function () {
  'use strict';

  // State
  let currentPin = '';
  let activeTab = 'overview';
  let currentLang = localStorage.getItem('otb_dashboard_lang') || 'ar';
  let configData = null;
  let leadsData = [];
  let showcaseData = [];
  let roiConfig = null;
  let contentConfig = null;

  // Constants
  const STORAGE_KEYS = {
    PIN: 'otb_admin_pin',
    SESSION: 'otb_admin_session',
    LEADS: 'otb_leads',
    SHOWCASE: 'otb_showcase_data',
    ROI: 'otb_roi_config',
    CONTENT: 'otb_content_config',
    CONFIG_BACKUP: 'otb_full_config'
  };

  const DEFAULT_PIN = '2026';

  /* ==========================================================================
     DICTIONARY & LOCALIZATION (ARABIC & ENGLISH)
     ========================================================================== */
  const I18N = {
    ar: {
      // Header & Navigation
      app_title: 'غرفة العمليات التنفيذية',
      status_live: 'مباشر وفي وضع التشغيل',
      brand_subtitle: 'ملوك المدينة · نظام الإدارة المؤسسي 2026',
      btn_view_site: 'معاينة الواجهة الرسمية ↗',
      btn_sync: 'مزامنة وحفظ التعديلات ⚡',
      btn_logout: 'قفل المنظومة 🔒',
      tab_overview: '📊 نبض العمليات',
      tab_leads: '📥 الحجوزات والـ CRM',
      tab_showcase: '🎨 سوابق الأعمال CMS',
      tab_roi: '⚙️ محاكي العائد والنمو',
      tab_content: '🌐 الهوية والمحتوى والـ SEO',
      tab_corelink: '⚡ عمليات CoreLink',

      // Security Gate
      pin_title: 'غرفة عمليات OTB التنفيذية',
      app_subtitle: 'منظومة الإدارة المتكاملة · OTB Agency 2026',
      pin_clear: 'مسح',
      pin_backspace: '⌫ حذف',
      pin_error_hint: 'رمز المرور غير صحيح (الرمز الافتراضي: 2026)',

      // Tab 1: Overview
      ov_title: 'نبض العمليات والمؤشرات الاستراتيجية',
      ov_desc: 'رصد حي وشامل لطلبات الشراكة الجديدة، وتوقعات ميزانيات التوسع، ومؤشرات الأداء التشغيلي الموثقة.',
      btn_add_lead_top: '+ تسجيل طلب استراتيجية يدوي',
      kpi_total_leads: 'إجمالي طلبات الاستراتيجية',
      kpi_leads_meta: '↑ 100% عملاء مؤهلون للشراكة',
      kpi_pipeline_val: 'قيمة الميزانيات التقديرية',
      kpi_pipe_meta: 'ميزانيات حملات تسويقية شهرية',
      kpi_conv_rate: 'معدل إبرام الشراكات',
      kpi_conv_meta: 'عقود وشراكات مكتملة التعاقد',
      kpi_top_vertical: 'المسار الأكثر طلباً',
      top_service_default: 'منظومة النمو الشاملة',
      kpi_vertical_meta: 'الأغذية والكافيهات والسلع الاستهلاكية',

      // Benchmark Panel
      bm_card_title: 'دراسة التحول المؤسسي لمصانع فرانكس الغذائية (معيار فرانكس الذهبي)',
      bm_badge: 'قفزة تاريخية من المرتبة 25 إلى المركز الثاني وطنياً',
      bm_lbl_sales: 'عائد المبيعات المتولد',
      bm_val_sales: '+30 مليون جنيه مصري',
      bm_sub_sales: 'خلال 90 يوماً من إطلاق المنظومة',
      bm_lbl_reach: 'الوصول الجماهيري الفريد',
      bm_val_reach: '3.8+ مليون مستهلك',
      bm_sub_reach: 'تغطية شاملة لكافة محافظات مصر',
      bm_lbl_growth: 'معدل النمو الشهري الصافي',
      bm_val_growth: '+101,000 متابع',
      bm_sub_growth: 'مستهلكون ذوو قدرة شرائية عالية',
      bm_lbl_views: 'المشاهدات الموثقة للحملة',
      bm_val_views: '1,007,739 مشاهدة',
      bm_sub_views: 'معتمدة من سجلات Meta Business',

      // Tab 2: Strategy CRM
      crm_title: 'منظومة إدارة علاقات العملاء وطلبات الشراكة (Executive CRM)',
      crm_desc: 'متابعة لحظية لكافة الكيانات والشركات المتقدمة بطلب جلسة استراتيجية، مع إمكانية التواصل الفوري عبر واتساب بنقرة واحدة.',
      btn_add_lead: '+ إضافة عميل يدوياً',
      btn_export_csv: 'تصدير لملف Excel/CSV 📥',
      search_placeholder: 'ابحث باسم العميل، الكيان التجاري، أو الهاتف...',
      filter_all_status: 'كافة الحالات',
      st_opt_new: 'طلب جديد',
      st_opt_contacted: 'تم التواصل الأولي',
      st_opt_strategy: 'جلسة استراتيجية جارية',
      st_opt_closed: 'شراكة متعاقدة (ناجحة)',
      st_opt_archived: 'مؤرشف',

      th_client: 'الجهة / العميل',
      th_contact: 'بيانات الاتصال',
      th_service: 'مسار النمو المطلوب',
      th_budget: 'الميزانية التقديرية',
      th_date: 'تاريخ التسجيل',
      th_status: 'موقف الطلب',
      th_actions: 'إجراءات فورية',

      st_new: 'طلب جديد',
      st_contacted: 'تم التواصل الأولي',
      st_strategy: 'جلسة استراتيجية جارية',
      st_closed_won: 'شراكة متعاقدة (ناجحة)',
      st_archived: 'مؤرشف',

      // Tab 3: Showcase CMS
      sc_title: 'نظام إدارة وتوثيق سوابق الأعمال (Showcase CMS)',
      sc_desc: 'إدارة وتحديث دراسات الحالة الموثقة وسجلات التدقيق الرسمية المعروضة على الواجهة الحية للموقع.',
      btn_add_proof: '+ إضافة سابقة أعمال جديدة',
      filter_all_cats: 'كافة سوابق الأعمال',
      cat_clients: 'شراكات وحالات العملاء',
      cat_dossier: 'سجلات التدقيق والأداء السنوي',
      cat_manifesto: 'لوحات وبيان الهوية (المانيفستو)',

      // Tab 4: ROI Simulator
      roi_title: 'محرك معايرة محاكي النمو والعائد (ROI Engine)',
      roi_desc: 'ضبط المعاملات الرياضية ونسب الوصول والعملاء المستهدفين لكل قطاع وسوق، مع اختبار فوري حي للمعادلات.',
      btn_save_roi: 'حفظ مضاعفات المحاكي ✓',
      roi_col_left_title: 'معاملات ومضاعفات القطاعات التجارية',
      roi_col_right_title: 'المعاينة الحية الفورية للمعادلات',
      roi_preview_badge: 'معاينة واختبار فوري للمعادلات',
      roi_budget_label: 'ميزانية الحملة التسويقية الشهرية:',
      roi_lbl_reach: 'الوصول الجماهيري المستهدف',
      roi_lbl_leads: 'العملاء المحتملون المؤهلون',
      roi_lbl_roas: 'العائد الإعلاني المتوقع (ROAS)',
      roi_disclaimer: '* هذه النتائج تُحسب بصورة آلية متوافقة مع خوارزميات محاكي OTB وتنعكس فوراً للزوار في صفحة الهبوط.',

      // Tab 5: Content & SEO
      cnt_title: 'إدارة الهوية النصية وبيانات الاتصال والـ SEO',
      cnt_desc: 'تحديث النصوص والشعارات الاستراتيجية والبيانات المعتمدة للمنظومة باللغتين.',
      btn_save_content: 'حفظ النصوص والبيانات ✓',
      lbl_motto_en: 'شعار الهوية باللغة الإنجليزية:',
      lbl_motto_ar: 'شعار الهوية باللغة العربية:',
      lbl_phone: 'رقم الهاتف والواتساب المعتمد:',
      lbl_email: 'البريد الإلكتروني المؤسسي:',
      lbl_views: 'إجمالي المشاهدات السنوية الموثقة:',
      lbl_engage: 'إجمالي التفاعلات السنوية المثبتة:',

      // Tab 6: CoreLink Ops
      cl_title: 'غرفة عمليات CoreLink والنسخ الاحتياطي الشامل',
      cl_desc: 'متابعة حية للمسارات التشغيلية للوكالة، مع أدوات متقدمة لتصدير واستيراد قاعدة بيانات المنظومة بالكامل.',
      btn_export_json: 'تصدير النسخة الاحتياطية الكاملة (JSON) 💾',
      btn_import_json: 'استيراد نسخة احتياطية 📤',
      btn_reset_dna: 'استعادة إعدادات DNA 2026 الأصلية ↺',
      cl_tasks_header: 'المسار التنفيذي لمهام CoreLink العاجلة',
      cl_maint_header: 'صيانة المنظومة واستعادة الإعدادات الأصلية',
      cl_maint_desc: 'يمكنك إعادة تهيئة كافة محتويات لوحة التحكم والموقع المباشر إلى النسخة الموثقة الأصلية (OTB Digital DNA 2026) في أي وقت بنقرة واحدة لضمان أعلى معايير الجودة والاستقرار.',

      // Modals
      m_lead_title: '+ تسجيل طلب جلسة استراتيجية جديد',
      m_lead_lbl_name: 'اسم المسؤول / اسم الكيان التجاري *',
      m_lead_ph_name: 'مثال: مصانع فرانكس الغذائية',
      m_lead_lbl_phone: 'رقم الهاتف / الواتساب الرسمي *',
      m_lead_lbl_service: 'مسار النمو المطلوب',
      m_lead_lbl_budget: 'الميزانية الشهرية المقترحة (ج.م)',
      m_lead_lbl_notes: 'ملاحظات العميل وأهداف التوسع',
      m_lead_ph_notes: 'أدخل تفاصيل التوسع وحجم العمل المطلوب...',
      m_lead_btn_submit: 'اعتماد وإدراج الطلب في المنظومة ✓',

      m_edit_sc_title: '✏️ تعديل سابقة أعمال موثقة',
      m_edit_lbl_title_en: 'عنوان العمل باللغة الإنجليزية:',
      m_edit_lbl_title_ar: 'عنوان العمل باللغة العربية:',
      m_edit_lbl_cat: 'القسم التابع له في المعرض:',
      m_edit_lbl_subcat: 'التصنيف الفرعي:',
      m_edit_lbl_metric: 'المؤشر المحقق المعتمد (Metric Pill):',
      m_edit_lbl_img: 'مسار الصورة المعروضة (Image Asset Path):',
      m_edit_lbl_desc: 'الوصف والتحليل الرقمي للمشروع:',
      m_edit_btn_save: 'تأكيد وحفظ التعديلات ✓',

      m_add_sc_title: '+ إضافة سابقة أعمال جديدة للمعرض',
      m_add_lbl_title: 'اسم المشروع / العنوان الرئيسي *',
      m_add_ph_title: 'مثال: حملة صيدليات العزبي الرمضانية',
      m_add_lbl_cat: 'القسم التابع له في المعرض *',
      m_add_lbl_subcat: 'التصنيف الفرعي للمشروع',
      m_add_ph_subcat: 'مثال: الرعاية الصحية وتوسع المبيعات',
      m_add_lbl_metric: 'المؤشر المحقق الموثق *',
      m_add_ph_metric: 'مثال: 1.2M مشاهدة · عائد 4.8x ROAS',
      m_add_lbl_img: 'مسار الصورة في مجلد Designs (أو رابط خارجي)',
      m_add_lbl_desc: 'الوصف التحليلي وأرقام النمو المحققة',
      m_add_ph_desc: 'أدخل ملخص استراتيجية الحملة والنتائج...',
      m_add_btn_save: 'إدراج سابقة الأعمال فوراً في المعرض ✓'
    },
    en: {
      // Header & Navigation
      app_title: 'Executive Command Center',
      status_live: 'LIVE / PRODUCTION',
      brand_subtitle: 'The City Kings · Operating System 2026',
      btn_view_site: 'View Official Site ↗',
      btn_sync: 'Sync & Save Changes ⚡',
      btn_logout: 'Lock System 🔒',
      tab_overview: '📊 Overview Pulse',
      tab_leads: '📥 Strategy CRM',
      tab_showcase: '🎨 Showcase CMS',
      tab_roi: '⚙️ ROI Simulator',
      tab_content: '🌐 Identity & SEO',
      tab_corelink: '⚡ CoreLink Ops',

      // Security Gate
      pin_title: 'OTB Command Center',
      app_subtitle: 'Full-Stack Management System · OTB Agency 2026',
      pin_clear: 'Clear',
      pin_backspace: '⌫ Delete',
      pin_error_hint: 'Invalid passcode (Default PIN: 2026)',

      // Tab 1: Overview
      ov_title: 'Operational Pulse & Strategic Metrics',
      ov_desc: 'High-altitude live telemetry on incoming strategy leads, estimated pipeline budgets, and commercial reach.',
      btn_add_lead_top: '+ Manual Strategy Booking',
      kpi_total_leads: 'Total Strategy Bookings',
      kpi_leads_meta: '↑ 100% Qualified Enterprise Leads',
      kpi_pipeline_val: 'Estimated Pipeline Value',
      kpi_pipe_meta: 'Monthly marketing ad budgets',
      kpi_conv_rate: 'Closed Partnership Rate',
      kpi_conv_meta: 'Fully executed commercial contracts',
      kpi_top_vertical: 'Top In-Demand Pillar',
      top_service_default: 'Full-Funnel Growth',
      kpi_vertical_meta: 'FMCG, Dining & Specialty Coffee',

      // Benchmark Panel
      bm_card_title: 'Franks Food Industries Transformation (Golden Benchmark)',
      bm_badge: 'Historic Leap from Rank #25 to #2 Nationwide',
      bm_lbl_sales: 'Generated Sales Revenue',
      bm_val_sales: '+30M EGP Commercial Impact',
      bm_sub_sales: 'Within 90 days of engine launch',
      bm_lbl_reach: 'Unique Audience Reach',
      bm_val_reach: '3.8M+ Verified Consumers',
      bm_sub_reach: 'Nationwide coverage across Egypt',
      bm_lbl_growth: 'Net Monthly Follower Scale',
      bm_val_growth: '+101,000 High-Intent Followers',
      bm_sub_growth: 'High-purchasing-power consumer base',
      bm_lbl_views: 'Verified Campaign Views',
      bm_val_views: '1,007,739 Film Views',
      bm_sub_views: 'Meta Business Suite Certified',

      // Tab 2: Strategy CRM
      crm_title: 'Strategy Bookings Management (Executive CRM)',
      crm_desc: 'Track and manage every enterprise lead from the strategy form with 1-click personalized WhatsApp dispatch.',
      btn_add_lead: '+ Add Lead Manually',
      btn_export_csv: 'Export to Excel/CSV 📥',
      search_placeholder: 'Search name, company, or phone...',
      filter_all_status: 'All Statuses',
      st_opt_new: 'New Request',
      st_opt_contacted: 'Initial Contact Made',
      st_opt_strategy: 'In Strategy Session',
      st_opt_closed: 'Closed Won (Contracted)',
      st_opt_archived: 'Archived',

      th_client: 'Client / Company',
      th_contact: 'Phone / WhatsApp',
      th_service: 'Requested Pillar',
      th_budget: 'Est. Budget',
      th_date: 'Submission Date',
      th_status: 'Lead Status',
      th_actions: 'Quick Actions',

      st_new: 'New Request',
      st_contacted: 'Initial Contact Made',
      st_strategy: 'In Strategy Session',
      st_closed_won: 'Closed Won (Contracted)',
      st_archived: 'Archived',

      // Tab 3: Showcase CMS
      sc_title: 'Showcase CMS & Verification Records',
      sc_desc: 'Control and edit the 20 documented works and verified benchmark case studies showcased on the live site.',
      btn_add_proof: '+ Add New Proof Card',
      filter_all_cats: 'All Proof Categories',
      cat_clients: 'Client Cases',
      cat_dossier: 'Audit Dossiers',
      cat_manifesto: 'Manifesto Art',

      // Tab 4: ROI Simulator
      roi_title: 'Growth Simulator Engine & Multipliers',
      roi_desc: 'Calibrate mathematical factors, reach multipliers, and projected lead acquisition costs per vertical.',
      btn_save_roi: 'Save Multipliers ✓',
      roi_col_left_title: 'Commercial Vertical Multipliers',
      roi_col_right_title: 'Real-Time Formula Preview',
      roi_preview_badge: 'Real-Time Interactive Test',
      roi_budget_label: 'Estimated Monthly Marketing Budget:',
      roi_lbl_reach: 'Target Projected Reach',
      roi_lbl_leads: 'Estimated Qualified Leads',
      roi_lbl_roas: 'Projected Return (ROAS)',
      roi_disclaimer: '* Projections are calculated algorithmically based on OTB verified benchmarks and dynamically reflect on the live site.',

      // Tab 5: Content & SEO
      cnt_title: 'Brand Copywriting, Metadata & Contacts',
      cnt_desc: 'Manage authoritative slogans, hero headlines, meta tags, and official WhatsApp contact numbers.',
      btn_save_content: 'Save Copy & Metadata ✓',
      lbl_motto_en: 'Brand Motto (English):',
      lbl_motto_ar: 'Brand Motto (Arabic):',
      lbl_phone: 'Official WhatsApp / Phone:',
      lbl_email: 'Executive Corporate Email:',
      lbl_views: 'Annual Verified Views:',
      lbl_engage: 'Annual Verified Engagements:',

      // Tab 6: CoreLink Ops
      cl_title: 'CoreLink Operations & Complete Backup Engine',
      cl_desc: 'Monitor sprint tasks and export/import full system configuration as standard JSON.',
      btn_export_json: 'Export Master Backup (JSON) 💾',
      btn_import_json: 'Import Backup 📤',
      btn_reset_dna: 'Reset to Verified DNA 2026 ↺',
      cl_tasks_header: 'CoreLink High-Priority Operational Track',
      cl_maint_header: 'System Maintenance & Integrity Restore',
      cl_maint_desc: 'Restore full Command Center and live landing page configuration to the verified OTB Digital DNA 2026 baseline at any time with a single click.',

      // Modals
      m_lead_title: '+ Record New Strategy Booking',
      m_lead_lbl_name: 'Full Name / Enterprise Name *',
      m_lead_ph_name: 'e.g. Franks Food Industries',
      m_lead_lbl_phone: 'Official Phone / WhatsApp *',
      m_lead_lbl_service: 'Target Growth Pillar',
      m_lead_lbl_budget: 'Estimated Monthly Budget (EGP)',
      m_lead_lbl_notes: 'Client Notes & Growth Objectives',
      m_lead_ph_notes: 'Provide scale goals and scope requirements...',
      m_lead_btn_submit: 'Confirm & Enlist Lead ✓',

      m_edit_sc_title: '✏️ Edit Showcase Proof Item',
      m_edit_lbl_title_en: 'Project Title (English):',
      m_edit_lbl_title_ar: 'Project Title (Arabic):',
      m_edit_lbl_cat: 'Showcase Grid Section:',
      m_edit_lbl_subcat: 'Sub-Category Vertical:',
      m_edit_lbl_metric: 'Verified Metric Pill:',
      m_edit_lbl_img: 'Image Asset Path:',
      m_edit_lbl_desc: 'Project Strategic Analysis:',
      m_edit_btn_save: 'Confirm & Save Changes ✓',

      m_add_sc_title: '+ Add New Proof Card to Showcase',
      m_add_lbl_title: 'Project Name / Main Headline *',
      m_add_ph_title: 'e.g. El-Ezaby Pharmacies Campaign',
      m_add_lbl_cat: 'Showcase Grid Section *',
      m_add_lbl_subcat: 'Sub-Category Vertical',
      m_add_ph_subcat: 'e.g. Healthcare & Commercial Growth',
      m_add_lbl_metric: 'Verified Metric Pill *',
      m_add_ph_metric: 'e.g. 1.2M Views · 4.8x ROAS',
      m_add_lbl_img: 'Image Path in Designs folder',
      m_add_lbl_desc: 'Performance Analysis & Verified Numbers',
      m_add_ph_desc: 'Summarize campaign strategy and results...',
      m_add_btn_save: 'Publish Proof Card to Showcase ✓'
    }
  };

  /* ==========================================================================
     INIT & BOOTSTRAP
     ========================================================================== */
  async function init() {
    setupPinGate();
    setupLanguage();
    await loadInitialData();
    setupNavigation();
    renderAll();
    setupEventListeners();
  }

  /* ==========================================================================
     SECURITY PIN GATE
     ========================================================================== */
  function setupPinGate() {
    const overlay = document.getElementById('pinGateOverlay');
    const dots = document.querySelectorAll('.pin-dot');
    const keys = document.querySelectorAll('.pin-key');
    const errorHint = document.getElementById('pinErrorHint');

    if (sessionStorage.getItem(STORAGE_KEYS.SESSION) === 'active') {
      overlay.classList.add('hidden');
    }

    const savedPin = localStorage.getItem(STORAGE_KEYS.PIN) || DEFAULT_PIN;

    function updateDots() {
      dots.forEach((dot, idx) => {
        if (idx < currentPin.length) {
          dot.classList.add('filled');
        } else {
          dot.classList.remove('filled');
        }
      });
    }

    function checkPin() {
      if (currentPin === savedPin || currentPin === DEFAULT_PIN) {
        sessionStorage.setItem(STORAGE_KEYS.SESSION, 'active');
        overlay.classList.add('hidden');
        showToast(currentLang === 'ar' ? 'تم الدخول بنجاح إلى غرفة العمليات التنفيذية' : 'Executive Command Center Unlocked');
        currentPin = '';
        updateDots();
      } else {
        const card = document.querySelector('.pin-card');
        card.classList.add('shake-anim');
        errorHint.classList.add('show');
        setTimeout(() => {
          card.classList.remove('shake-anim');
        }, 450);
        setTimeout(() => {
          currentPin = '';
          updateDots();
          errorHint.classList.remove('show');
        }, 1200);
      }
    }

    keys.forEach(key => {
      key.addEventListener('click', () => {
        const val = key.getAttribute('data-val');
        if (val === 'clear') {
          currentPin = '';
          updateDots();
        } else if (val === 'backspace') {
          currentPin = currentPin.slice(0, -1);
          updateDots();
        } else if (val && currentPin.length < 4) {
          currentPin += val;
          updateDots();
          if (currentPin.length === 4) {
            setTimeout(checkPin, 150);
          }
        }
      });
    });

    window.addEventListener('keydown', (e) => {
      if (!overlay.classList.contains('hidden')) {
        if (e.key >= '0' && e.key <= '9' && currentPin.length < 4) {
          currentPin += e.key;
          updateDots();
          if (currentPin.length === 4) setTimeout(checkPin, 150);
        } else if (e.key === 'Backspace') {
          currentPin = currentPin.slice(0, -1);
          updateDots();
        } else if (e.key === 'Escape') {
          currentPin = '';
          updateDots();
        }
      }
    });

    const logoutBtn = document.getElementById('btnLogout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem(STORAGE_KEYS.SESSION);
        currentPin = '';
        updateDots();
        overlay.classList.remove('hidden');
      });
    }
  }

  /* ==========================================================================
     DATA LOADING & PERSISTENCE
     ========================================================================== */
  async function loadInitialData() {
    try {
      const storedLeads = localStorage.getItem(STORAGE_KEYS.LEADS);
      if (storedLeads) leadsData = JSON.parse(storedLeads);

      const storedShowcase = localStorage.getItem(STORAGE_KEYS.SHOWCASE);
      if (storedShowcase) showcaseData = JSON.parse(storedShowcase);

      const storedRoi = localStorage.getItem(STORAGE_KEYS.ROI);
      if (storedRoi) roiConfig = JSON.parse(storedRoi);

      const storedContent = localStorage.getItem(STORAGE_KEYS.CONTENT);
      if (storedContent) contentConfig = JSON.parse(storedContent);

      if (!storedLeads || !storedShowcase || !storedRoi || !storedContent) {
        const resp = await fetch('data/default_dna_config.json');
        if (resp.ok) {
          configData = await resp.json();
          if (!storedLeads) {
            leadsData = configData.initial_leads || [];
            localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leadsData));
          }
          if (!storedShowcase) {
            showcaseData = configData.showcase_items || [];
            localStorage.setItem(STORAGE_KEYS.SHOWCASE, JSON.stringify(showcaseData));
          }
          if (!storedRoi) {
            roiConfig = configData.roi_multipliers || {};
            localStorage.setItem(STORAGE_KEYS.ROI, JSON.stringify(roiConfig));
          }
          if (!storedContent) {
            contentConfig = {
              motto: configData.system.motto,
              motto_ar: configData.system.motto_ar,
              contact: configData.contact,
              metrics: configData.metrics
            };
            localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(contentConfig));
          }
        }
      }
    } catch (err) {
      console.warn('Config fetch fallback activated:', err);
    }
  }

  /* ==========================================================================
     LANGUAGE & DIRECTION ENGINE
     ========================================================================== */
  function setupLanguage() {
    const langBtn = document.getElementById('btnLangToggle');
    applyLanguage(currentLang);

    if (langBtn) {
      langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        localStorage.setItem('otb_dashboard_lang', currentLang);
        applyLanguage(currentLang);
        renderAll();
      });
    }
  }

  function applyLanguage(lang) {
    const html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    const dict = I18N[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        if (el.tagName === 'INPUT' && el.getAttribute('placeholder')) {
          el.setAttribute('placeholder', dict[key]);
        } else if (el.tagName === 'TEXTAREA' && el.getAttribute('placeholder')) {
          el.setAttribute('placeholder', dict[key]);
        } else {
          el.innerHTML = dict[key];
        }
      }
    });

    const langBtn = document.getElementById('btnLangToggle');
    if (langBtn) {
      langBtn.innerHTML = lang === 'ar' ? '🌐 English (LTR)' : '🌐 العربية (RTL)';
    }
  }

  /* ==========================================================================
     NAVIGATION
     ========================================================================== */
  function setupNavigation() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        switchTab(targetTab);
      });
    });
  }

  function switchTab(tabId) {
    activeTab = tabId;
    document.querySelectorAll('.tab-btn').forEach(btn => {
      if (btn.getAttribute('data-tab') === tabId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    document.querySelectorAll('.tab-content').forEach(section => {
      if (section.id === `tab-${tabId}`) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });

    if (tabId === 'roi') {
      calcLiveRoi();
    }
  }

  /* ==========================================================================
     RENDER FUNCTIONS
     ========================================================================== */
  function renderAll() {
    renderOverview();
    renderCRM();
    renderShowcase();
    renderRoiSettings();
    renderContentSettings();
    renderCoreLinkTasks();
  }

  /* 1. Overview */
  function renderOverview() {
    const totalLeads = leadsData.length;
    const closedLeads = leadsData.filter(l => l.status === 'closed_won').length;
    const convRate = totalLeads > 0 ? Math.round((closedLeads / totalLeads) * 100) : 0;

    let pipelineVal = 0;
    leadsData.forEach(l => {
      pipelineVal += parseInt(l.budget || 50000, 10);
    });

    const servicesCount = {};
    leadsData.forEach(l => {
      servicesCount[l.service] = (servicesCount[l.service] || 0) + 1;
    });
    let topService = currentLang === 'ar' ? 'منظومة النمو الشاملة' : 'Full-Funnel Growth';
    if (servicesCount['video'] > (servicesCount['all'] || 0)) {
      topService = currentLang === 'ar' ? 'الإنتاج السينمائي الفاخر' : 'Visual Production';
    }
    if (servicesCount['marketing'] > (servicesCount['all'] || 0)) {
      topService = currentLang === 'ar' ? 'إعلانات الأداء والمبيعات' : 'Performance Marketing';
    }

    const elTotal = document.getElementById('ovTotalLeads');
    const elPipe = document.getElementById('ovPipelineVal');
    const elConv = document.getElementById('ovConvRate');
    const elTop = document.getElementById('ovTopService');
    const badgeCount = document.getElementById('crmBadgeCount');

    const currLabel = currentLang === 'ar' ? 'ج.م' : 'EGP';
    if (elTotal) elTotal.innerText = totalLeads;
    if (elPipe) elPipe.innerHTML = `<bdi>${pipelineVal.toLocaleString()} ${currLabel}</bdi>`;
    if (elConv) elConv.innerHTML = `<bdi>${convRate}%</bdi>`;
    if (elTop) elTop.innerText = topService;
    if (badgeCount) badgeCount.innerText = totalLeads;

    // Update dynamic status counts on filter options
    const counts = { all: totalLeads, new: 0, contacted: 0, strategy_session: 0, closed_won: 0, archived: 0 };
    leadsData.forEach(l => {
      if (counts[l.status] !== undefined) counts[l.status]++;
    });

    const optAll = document.querySelector('#filterLeadStatus option[value="all"]');
    const optNew = document.querySelector('#filterLeadStatus option[value="new"]');
    const optCont = document.querySelector('#filterLeadStatus option[value="contacted"]');
    const optStrat = document.querySelector('#filterLeadStatus option[value="strategy_session"]');
    const optClosed = document.querySelector('#filterLeadStatus option[value="closed_won"]');
    const optArch = document.querySelector('#filterLeadStatus option[value="archived"]');

    if (optAll) optAll.innerText = `${I18N[currentLang].filter_all_status} (${counts.all})`;
    if (optNew) optNew.innerText = `${I18N[currentLang].st_opt_new} (${counts.new})`;
    if (optCont) optCont.innerText = `${I18N[currentLang].st_opt_contacted} (${counts.contacted})`;
    if (optStrat) optStrat.innerText = `${I18N[currentLang].st_opt_strategy} (${counts.strategy_session})`;
    if (optClosed) optClosed.innerText = `${I18N[currentLang].st_opt_closed} (${counts.closed_won})`;
    if (optArch) optArch.innerText = `${I18N[currentLang].st_opt_archived} (${counts.archived})`;
  }

  /* 2. CRM Leads */
  function renderCRM() {
    const tbody = document.getElementById('leadsTableBody');
    if (!tbody) return;

    const query = (document.getElementById('searchLeadsInput')?.value || '').toLowerCase().trim();
    const filterStatus = document.getElementById('filterLeadStatus')?.value || 'all';

    const filtered = leadsData.filter(lead => {
      const srvName = (getServiceTitle(lead.service) || '').toLowerCase();
      const matchQuery = !query ||
        (lead.name || '').toLowerCase().includes(query) ||
        (lead.phone || '').toLowerCase().includes(query) ||
        (lead.service || '').toLowerCase().includes(query) ||
        srvName.includes(query) ||
        (lead.notes || '').toLowerCase().includes(query);
      const matchStatus = filterStatus === 'all' || lead.status === filterStatus;
      return matchQuery && matchStatus;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
            ${currentLang === 'ar' ? 'لا توجد طلبات شراكة مطابقة للبحث أو الفلتر المحدد.' : 'No strategy requests match the selected search or filter.'}
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(lead => {
      const formattedDate = lead.created_at ? new Date(lead.created_at).toLocaleDateString(currentLang === 'ar' ? 'ar-EG' : 'en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : (currentLang === 'ar' ? 'مؤخراً' : 'Recently');
      const cleanPhone = (lead.phone || '').replace(/[^\d+]/g, '');
      const waPhone = cleanPhone.startsWith('+') ? cleanPhone.substring(1) : (cleanPhone.startsWith('0') ? '2' + cleanPhone : cleanPhone);

      const serviceName = getServiceTitle(lead.service);

      const greeting = currentLang === 'ar'
        ? `السلام عليكم أستاذ(ة) ${lead.name}، تحياتنا من وكالة OTB Agency (The City Kings). بخصوص طلبكم لجلسة التخطيط الاستراتيجي لمسار (${serviceName})، يسعدنا التنسيق معكم لتحديد الموعد الأنسب لمناقشة خارطة طريق نمو علامتكم التجارية.`
        : `Hello ${lead.name}! This is OTB Agency Executive Team regarding your strategy roadmap request for (${serviceName}). We are ready to schedule your session.`;

      const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(greeting)}`;

      return `
        <tr>
          <td>
            <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
              <strong style="color: var(--text-primary); font-size: 0.95rem;">${escapeHtml(lead.name)}</strong>
              ${lead.status === 'new' ? `<span class="badge-status new" style="font-size: 0.68rem; padding: 0.15rem 0.45rem;">${currentLang === 'ar' ? 'طلب جديد ⚡' : 'NEW ⚡'}</span>` : ''}
            </div>
            ${lead.notes ? `<div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 0.2rem; max-width: 280px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${escapeHtml(lead.notes)}">${escapeHtml(lead.notes)}</div>` : ''}
          </td>
          <td>
            <span style="font-family: monospace; color: var(--accent-gold); display: inline-block;" dir="ltr"><bdi>${escapeHtml(lead.phone)}</bdi></span>
          </td>
          <td>
            <span style="font-size: 0.84rem; color: var(--text-secondary);">${serviceName}</span>
          </td>
          <td>
            <strong style="color: var(--accent-gold-bright);"><bdi>${(lead.budget || 50000).toLocaleString()} ${currentLang === 'ar' ? 'ج.م' : 'EGP'}</bdi></strong>
          </td>
          <td>
            <span style="font-size: 0.8rem; color: var(--text-muted);"><bdi>${formattedDate}</bdi></span>
          </td>
          <td>
            <select class="select-filter" style="font-size: 0.8rem; padding: 0.3rem 0.65rem;" onchange="window.updateLeadStatus('${lead.id}', this.value)">
              <option value="new" ${lead.status === 'new' ? 'selected' : ''}>${I18N[currentLang].st_new}</option>
              <option value="contacted" ${lead.status === 'contacted' ? 'selected' : ''}>${I18N[currentLang].st_contacted}</option>
              <option value="strategy_session" ${lead.status === 'strategy_session' ? 'selected' : ''}>${I18N[currentLang].st_strategy}</option>
              <option value="closed_won" ${lead.status === 'closed_won' ? 'selected' : ''}>${I18N[currentLang].st_closed_won}</option>
              <option value="archived" ${lead.status === 'archived' ? 'selected' : ''}>${I18N[currentLang].st_archived}</option>
            </select>
          </td>
          <td>
            <div class="table-action-row">
              <a href="${waUrl}" target="_blank" rel="noopener" class="btn-icon-action whatsapp" title="${currentLang === 'ar' ? 'محادثة واتساب مخصصة فورية' : 'Direct WhatsApp Chat'}">
                💬
              </a>
              <button class="btn-icon-action" onclick="window.copyLeadGreeting('${lead.id}')" title="${currentLang === 'ar' ? 'نسخ رسالة الترحيب للحافظة' : 'Copy Greeting to Clipboard'}">
                📋
              </button>
              <button class="btn-icon-action danger" onclick="window.deleteLead('${lead.id}')" title="${currentLang === 'ar' ? 'حذف هذا السجل' : 'Delete Lead'}">
                🗑️
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  function getServiceTitle(srv) {
    if (srv === 'video') return currentLang === 'ar' ? 'إنتاج إعلاني وسرد سينمائي فاخر' : 'Luxury Visual Production';
    if (srv === 'marketing') return currentLang === 'ar' ? 'إعلانات أداء ومبيعات عالية العائد' : 'High-ROAS Performance Marketing';
    if (srv === 'branding') return currentLang === 'ar' ? 'هوية تجارية وتصميم ثلاثي الأبعاد' : '3D Identity & Visual Systems';
    return currentLang === 'ar' ? 'شراكة نمو تجارية شاملة' : 'Enterprise Full-Funnel Growth';
  }

  /* 3. Showcase CMS */
  function renderShowcase() {
    const grid = document.getElementById('showcaseGrid');
    if (!grid) return;

    const filterCat = document.getElementById('filterShowcaseCat')?.value || 'all';

    const filtered = showcaseData.filter(item => {
      return filterCat === 'all' || item.cat === filterCat;
    });

    grid.innerHTML = filtered.map(item => {
      const title = currentLang === 'ar' ? (item.title_ar || item.title) : item.title;
      const category = currentLang === 'ar' ? (item.category_ar || item.category) : item.category;

      return `
        <div class="showcase-item-card">
          <div class="showcase-thumb-box">
            <img src="${item.img}" alt="${escapeHtml(title)}" class="showcase-thumb-img" loading="lazy" onerror="this.src='Designs/773995749_18181423747413165_4138231920701878094_n.jpg'">
            <span class="showcase-badge-overlay">${escapeHtml(category)}</span>
          </div>
          <div class="showcase-body">
            <h4 class="showcase-card-title">${escapeHtml(title)}</h4>
            <div class="showcase-metric-pill">📈 <bdi>${escapeHtml(item.metric)}</bdi></div>
            <p class="showcase-card-desc">${escapeHtml(item.desc)}</p>
            <div class="showcase-footer">
              <span style="font-size: 0.74rem; color: var(--text-muted); font-family: monospace;">${currentLang === 'ar' ? 'المُعرّف:' : 'ID:'} <bdi dir="ltr">${item.id}</bdi></span>
              <div style="display: flex; gap: 0.45rem;">
                <button class="btn-nav-action" style="padding: 0.35rem 0.8rem; font-size: 0.8rem;" onclick="window.openEditShowcaseModal('${item.id}')">
                  ✏️ ${currentLang === 'ar' ? 'تعديل' : 'Edit'}
                </button>
                <button class="btn-icon-action danger" style="width: 30px; height: 30px;" onclick="window.deleteShowcaseItem('${item.id}')" title="${currentLang === 'ar' ? 'حذف من المعرض' : 'Delete'}">
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  /* 4. ROI Simulator Settings */
  function renderRoiSettings() {
    if (!roiConfig || !roiConfig.industries) return;

    const container = document.getElementById('roiParamsContainer');
    if (!container) return;

    const inds = roiConfig.industries;
    let html = '';

    Object.keys(inds).forEach(key => {
      const item = inds[key];
      const name = currentLang === 'ar' ? item.name_ar : item.name_en;
      html += `
        <div class="roi-param-card">
          <div class="roi-param-header">
            <span class="param-title">${escapeHtml(name)}</span>
            <span class="param-badge" dir="ltr"><bdi>${key.toUpperCase()}</bdi></span>
          </div>
          <div class="param-row">
            <span class="param-label">${currentLang === 'ar' ? 'مضاعف الوصول الجماهيري:' : 'Target Reach Multiplier:'}</span>
            <input type="number" step="0.05" class="param-input" id="roi_factor_${key}" value="${item.factor}" dir="ltr" onchange="window.updateRoiParam('${key}', 'factor', this.value)">
          </div>
          <div class="param-row">
            <span class="param-label">${currentLang === 'ar' ? 'تكلفة اكتساب العميل التقديرية (ج.م):' : 'Est. Cost per Lead (EGP):'}</span>
            <input type="number" step="5" class="param-input" id="roi_cost_${key}" value="${item.lead_cost || 75}" dir="ltr" onchange="window.updateRoiParam('${key}', 'lead_cost', this.value)">
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  function calcLiveRoi() {
    const slider = document.getElementById('adminRoiSlider');
    const budgetVal = slider ? parseInt(slider.value, 10) : 50000;
    const elBudget = document.getElementById('adminRoiBudgetDisplay');
    const elReach = document.getElementById('adminRoiReachDisplay');
    const elLeads = document.getElementById('adminRoiLeadsDisplay');
    const elRoas = document.getElementById('adminRoiRoasDisplay');

    const currLabel = currentLang === 'ar' ? 'ج.م' : 'EGP';
    if (elBudget) elBudget.innerHTML = `<bdi>${budgetVal.toLocaleString()} ${currLabel}</bdi>`;

    const factor = roiConfig?.industries?.fmcg?.factor || 1.25;
    const estReach = Math.round(budgetVal * 15 * factor);
    const minLeads = Math.round((budgetVal / 110) * factor);
    const maxLeads = Math.round((budgetVal / 55) * factor);
    const minRoas = (3.5 * (factor / 1.1)).toFixed(1);
    const maxRoas = (5.2 * (factor / 1.1)).toFixed(1);

    if (elReach) elReach.innerHTML = `<bdi>${estReach.toLocaleString()}+</bdi>`;
    if (elLeads) elLeads.innerHTML = `<bdi>${minLeads.toLocaleString()} - ${maxLeads.toLocaleString()}</bdi>`;
    if (elRoas) elRoas.innerHTML = `<bdi>${minRoas}x - ${maxRoas}x</bdi>`;
  }

  /* 5. Content & SEO Settings */
  function renderContentSettings() {
    if (!contentConfig) return;

    const elMotto = document.getElementById('inputContentMotto');
    const elMottoAr = document.getElementById('inputContentMottoAr');
    const elPhone = document.getElementById('inputContentPhone');
    const elEmail = document.getElementById('inputContentEmail');
    const elViews = document.getElementById('inputMetricViews');
    const elEngage = document.getElementById('inputMetricEngage');

    if (elMotto) elMotto.value = contentConfig.motto || 'Putting Your Brand Under The Spotlight';
    if (elMottoAr) elMottoAr.value = contentConfig.motto_ar || 'نضع علامتك التجارية تحت الأضواء';
    if (elPhone) elPhone.value = contentConfig.contact?.phone || '+20 10 08080295';
    if (elEmail) elEmail.value = contentConfig.contact?.email || 'otbabency5@gmail.com';
    if (elViews) elViews.value = contentConfig.metrics?.annual_views || '140M+';
    if (elEngage) elEngage.value = contentConfig.metrics?.annual_engagements || '18.5M+';
  }

  /* 6. CoreLink Tasks */
  function renderCoreLinkTasks() {
    const container = document.getElementById('corelinkTasksList');
    if (!container) return;

    const tasks = currentLang === 'ar' ? [
      { id: 't1', title: 'إطلاق مواد وتصميمات حملة رمضان لمصانع فرانكس', assignee: 'مسار الإنتاج المرئي', status: 'جاهز للإطلاق', priority: 'عاجلة جداً' },
      { id: 't2', title: 'انطلاق حملة استقطاب مصانع العاشر من رمضان وأكتوبر (Mission 01)', assignee: 'محرك النمو وتطوير الأعمال', status: 'قيد التنفيذ', priority: 'قصوى' },
      { id: 't3', title: 'إخراج وتجهيز البورتفوليو المطبوع المعتمد (آية وروان)', assignee: 'استوديو التصميم الإبداعي', status: 'مرحلة الإخراج الفني', priority: 'متوسطة' },
      { id: 't4', title: 'مواءمة الهوية البصرية لأكاديمية OTB Growth كودياً', assignee: 'فريق التطوير والواجهات', status: 'مجدول للتنفيذ', priority: 'متوسطة' }
    ] : [
      { id: 't1', title: 'Deploy Franks Ramadan Campaign Assets', assignee: 'Production Track', status: 'Ready', priority: 'High' },
      { id: 't2', title: 'Launch Mission 01 Outreach (10th of Ramadan)', assignee: 'Growth Engine', status: 'In Progress', priority: 'High' },
      { id: 't3', title: 'Deliver Printable Portfolio (Aya & Rawan)', assignee: 'Creative Studio', status: 'Design Phase', priority: 'Medium' },
      { id: 't4', title: 'Sync OTB Growth Academy Visual Identity', assignee: 'Dev & UI', status: 'Planned', priority: 'Medium' }
    ];

    container.innerHTML = tasks.map(t => {
      const isReady = t.status === 'Ready' || t.status === 'جاهز للإطلاق';
      return `
        <div style="background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem 1.25rem; margin-bottom: 0.85rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.85rem;">
          <div>
            <strong style="color: var(--text-primary); font-size: 0.94rem;">${escapeHtml(t.title)}</strong>
            <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 0.25rem;">${currentLang === 'ar' ? 'المسؤول:' : 'Assignee:'} <span style="color: var(--accent-gold);">${escapeHtml(t.assignee)}</span></div>
          </div>
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <span class="badge-status ${isReady ? 'closed_won' : 'contacted'}">${escapeHtml(t.status)}</span>
            <span style="font-size: 0.74rem; color: var(--text-secondary); background: rgba(255,255,255,0.06); padding: 0.25rem 0.55rem; border-radius: 4px;">${escapeHtml(t.priority)}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  /* ==========================================================================
     GLOBAL ACTIONS & EVENT LISTENERS
     ========================================================================== */
  function setupEventListeners() {
    document.getElementById('searchLeadsInput')?.addEventListener('input', renderCRM, { passive: true });
    document.getElementById('filterLeadStatus')?.addEventListener('change', renderCRM);
    document.getElementById('filterShowcaseCat')?.addEventListener('change', renderShowcase);

    document.getElementById('adminRoiSlider')?.addEventListener('input', calcLiveRoi, { passive: true });

    document.getElementById('btnSyncAll')?.addEventListener('click', () => {
      saveAllState();
      showToast(currentLang === 'ar' ? 'تمت مزامنة وحفظ كافة البيانات بنجاح ⚡' : 'All Data Synced & Saved ⚡');
    });

    document.getElementById('btnExportCsv')?.addEventListener('click', exportLeadsCsv);

    document.getElementById('btnSaveRoi')?.addEventListener('click', () => {
      localStorage.setItem(STORAGE_KEYS.ROI, JSON.stringify(roiConfig));
      showToast(currentLang === 'ar' ? 'تم حفظ مضاعفات محاكي النمو بنجاح ✓' : 'ROI Multipliers Saved Successfully ✓');
    });

    document.getElementById('btnSaveContent')?.addEventListener('click', saveContentForm);

    document.getElementById('btnExportMasterJson')?.addEventListener('click', exportFullJsonBackup);

    document.getElementById('btnTriggerImport')?.addEventListener('click', () => {
      document.getElementById('importFileInput')?.click();
    });

    document.getElementById('importFileInput')?.addEventListener('change', handleImportFile);

    document.getElementById('btnResetDna')?.addEventListener('click', resetToDna2026);
  }

  function saveAllState() {
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leadsData));
    localStorage.setItem(STORAGE_KEYS.SHOWCASE, JSON.stringify(showcaseData));
    localStorage.setItem(STORAGE_KEYS.ROI, JSON.stringify(roiConfig));
    localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(contentConfig));

    window.dispatchEvent(new CustomEvent('otb_data_updated', {
      detail: { leads: leadsData, showcase: showcaseData, roi: roiConfig, content: contentConfig }
    }));
  }

  window.updateLeadStatus = function (leadId, newStatus) {
    const lead = leadsData.find(l => l.id === leadId);
    if (lead) {
      lead.status = newStatus;
      saveAllState();
      renderOverview();
      const statusTitle = I18N[currentLang][`st_${newStatus}`] || newStatus;
      showToast(currentLang === 'ar' ? `تم تحديث حالة الطلب إلى: ${statusTitle}` : `Lead status updated to: ${statusTitle}`);
    }
  };

  window.deleteLead = function (leadId) {
    const confirmMsg = currentLang === 'ar' ? 'هل أنت متأكد من حذف هذا السجل نهائياً من قاعدة البيانات؟' : 'Are you sure you want to permanently delete this lead?';
    if (confirm(confirmMsg)) {
      leadsData = leadsData.filter(l => l.id !== leadId);
      saveAllState();
      renderOverview();
      renderCRM();
      showToast(currentLang === 'ar' ? 'تم حذف السجل بنجاح' : 'Lead deleted successfully');
    }
  };

  window.copyLeadGreeting = function (leadId) {
    const lead = leadsData.find(l => l.id === leadId);
    if (!lead) return;
    const serviceName = getServiceTitle(lead.service);
    const greeting = currentLang === 'ar'
      ? `السلام عليكم أستاذ(ة) ${lead.name}، تحياتنا من وكالة OTB Agency (The City Kings). بخصوص طلبكم لجلسة التخطيط الاستراتيجي لمسار (${serviceName})، يسعدنا التنسيق معكم لتحديد الموعد الأنسب لمناقشة خارطة طريق نمو علامتكم التجارية.`
      : `Hello ${lead.name}! This is OTB Agency Executive Team regarding your strategy roadmap request for (${serviceName}). We are ready to schedule your session.`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(greeting).then(() => {
        showToast(currentLang === 'ar' ? 'تم نسخ رسالة الترحيب المخصصة إلى الحافظة بنجاح 📋' : 'Greeting copied to clipboard 📋');
      }).catch(() => {
        fallbackCopyText(greeting);
      });
    } else {
      fallbackCopyText(greeting);
    }
  };

  function fallbackCopyText(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showToast(currentLang === 'ar' ? 'تم نسخ رسالة الترحيب المخصصة إلى الحافظة بنجاح 📋' : 'Greeting copied to clipboard 📋');
    } catch (e) {
      showToast(currentLang === 'ar' ? 'تعذر النسخ التلقائي' : 'Copy failed');
    }
    document.body.removeChild(ta);
  }

  window.openAddLeadModal = function () {
    const modal = document.getElementById('addLeadModal');
    if (modal) modal.classList.add('active');
  };

  window.closeAddLeadModal = function () {
    const modal = document.getElementById('addLeadModal');
    if (modal) modal.classList.remove('active');
  };

  window.submitAddLeadForm = function (e) {
    e.preventDefault();
    const name = document.getElementById('addLeadName').value.trim();
    const phone = document.getElementById('addLeadPhone').value.trim();
    const service = document.getElementById('addLeadService').value;
    const budget = parseInt(document.getElementById('addLeadBudget').value, 10) || 50000;
    const notes = document.getElementById('addLeadNotes').value.trim();

    if (!name || !phone) {
      alert(currentLang === 'ar' ? 'يرجى إدخال اسم العميل ورقم الهاتف الرسمي' : 'Please provide name and phone');
      return;
    }

    const newLead = {
      id: 'lead_' + Date.now(),
      name,
      phone,
      service,
      service_label: getServiceTitle(service),
      budget,
      notes,
      status: 'new',
      created_at: new Date().toISOString()
    };

    leadsData.unshift(newLead);
    saveAllState();
    renderOverview();
    renderCRM();
    window.closeAddLeadModal();
    document.getElementById('addLeadForm').reset();
    showToast(currentLang === 'ar' ? 'تم تسجيل وإدراج العميل الجديد في المنظومة بنجاح ✓' : 'New Lead Added Successfully ✓');
  };

  function exportLeadsCsv() {
    if (leadsData.length === 0) {
      alert(currentLang === 'ar' ? 'لا توجد بيانات عملاء مسجلة حالياً للتصدير' : 'No leads to export');
      return;
    }

    let csvContent = '\uFEFF';
    if (currentLang === 'ar') {
      csvContent += 'المعرف,اسم_العميل_والشركة,رقم_الهاتف_والواتساب,مسار_الخدمة,الميزانية_الشهرية_ج_م,حالة_الطلب,ملاحظات_التوسع,تاريخ_التسجيل\n';
    } else {
      csvContent += 'ID,Name_Company,Phone_WhatsApp,Service_Pillar,Budget_EGP,Lead_Status,Notes,Created_At\n';
    }

    leadsData.forEach(l => {
      const row = [
        `"${l.id}"`,
        `"${(l.name || '').replace(/"/g, '""')}"`,
        `"${(l.phone || '').replace(/"/g, '""')}"`,
        `"${(getServiceTitle(l.service) || l.service).replace(/"/g, '""')}"`,
        `"${l.budget || 0}"`,
        `"${(I18N[currentLang][`st_${l.status}`] || l.status).replace(/"/g, '""')}"`,
        `"${(l.notes || '').replace(/"/g, '""')}"`,
        `"${l.created_at || ''}"`
      ];
      csvContent += row.join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `OTB_Strategy_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(currentLang === 'ar' ? 'تم تنزيل ملف الإكسيل بالعربية بنجاح 📥' : 'Leads CSV downloaded successfully 📥');
  }

  window.openEditShowcaseModal = function (itemId) {
    const item = showcaseData.find(sc => sc.id === itemId);
    if (!item) return;

    document.getElementById('editScId').value = item.id;
    document.getElementById('editScTitle').value = item.title;
    document.getElementById('editScTitleAr').value = item.title_ar || item.title;
    document.getElementById('editScCat').value = item.cat;
    document.getElementById('editScCategory').value = currentLang === 'ar' ? (item.category_ar || item.category) : item.category;
    document.getElementById('editScMetric').value = item.metric;
    document.getElementById('editScImg').value = item.img;
    document.getElementById('editScDesc').value = item.desc;

    document.getElementById('editShowcaseModal').classList.add('active');
  };

  window.closeEditShowcaseModal = function () {
    document.getElementById('editShowcaseModal').classList.remove('active');
  };

  window.submitEditShowcaseForm = function (e) {
    e.preventDefault();
    const id = document.getElementById('editScId').value;
    const item = showcaseData.find(sc => sc.id === id);

    if (item) {
      item.title = document.getElementById('editScTitle').value.trim();
      item.title_ar = document.getElementById('editScTitleAr').value.trim();
      item.cat = document.getElementById('editScCat').value;
      item.category = document.getElementById('editScCategory').value.trim();
      item.metric = document.getElementById('editScMetric').value.trim();
      item.img = document.getElementById('editScImg').value.trim();
      item.desc = document.getElementById('editScDesc').value.trim();

      saveAllState();
      renderShowcase();
      window.closeEditShowcaseModal();
      showToast(currentLang === 'ar' ? 'تم حفظ وتحديث سابقة الأعمال بنجاح ✓' : 'Showcase item updated ✓');
    }
  };

  window.deleteShowcaseItem = function (itemId) {
    const confirmMsg = currentLang === 'ar' ? 'هل أنت متأكد من رغبتك في حذف هذا المشروع من المعرض؟' : 'Delete this item from showcase?';
    if (confirm(confirmMsg)) {
      showcaseData = showcaseData.filter(sc => sc.id !== itemId);
      saveAllState();
      renderShowcase();
      showToast(currentLang === 'ar' ? 'تم حذف العنصر من المعرض بنجاح' : 'Showcase item deleted');
    }
  };

  window.openAddProofModal = function () {
    document.getElementById('addProofModal').classList.add('active');
  };

  window.closeAddProofModal = function () {
    document.getElementById('addProofModal').classList.remove('active');
  };

  window.submitAddProofForm = function (e) {
    e.preventDefault();
    const title = document.getElementById('addProofTitle').value.trim();
    const category = document.getElementById('addProofCategory').value.trim();
    const cat = document.getElementById('addProofCat').value;
    const metric = document.getElementById('addProofMetric').value.trim();
    const img = document.getElementById('addProofImg').value.trim() || 'Designs/773995749_18181423747413165_4138231920701878094_n.jpg';
    const desc = document.getElementById('addProofDesc').value.trim();

    if (!title || !metric) {
      alert(currentLang === 'ar' ? 'يرجى إدخال اسم المشروع والمؤشر المحقق' : 'Please provide title and metric');
      return;
    }

    const newItem = {
      id: 'sc_' + (showcaseData.length + 1).toString().padStart(2, '0'),
      cat,
      title,
      title_ar: title,
      category,
      category_ar: category,
      img,
      metric,
      desc
    };

    showcaseData.unshift(newItem);
    saveAllState();
    renderShowcase();
    window.closeAddProofModal();
    document.getElementById('addProofForm').reset();
    showToast(currentLang === 'ar' ? 'تم إدراج سابقة الأعمال الجديدة في المعرض بنجاح ✓' : 'New proof item added to showcase ✓');
  };

  window.updateRoiParam = function (key, prop, val) {
    if (roiConfig && roiConfig.industries && roiConfig.industries[key]) {
      roiConfig.industries[key][prop] = parseFloat(val);
      calcLiveRoi();
    }
  };

  function saveContentForm() {
    contentConfig = {
      motto: document.getElementById('inputContentMotto')?.value.trim(),
      motto_ar: document.getElementById('inputContentMottoAr')?.value.trim(),
      contact: {
        phone: document.getElementById('inputContentPhone')?.value.trim(),
        email: document.getElementById('inputContentEmail')?.value.trim()
      },
      metrics: {
        annual_views: document.getElementById('inputMetricViews')?.value.trim(),
        annual_engagements: document.getElementById('inputMetricEngage')?.value.trim()
      }
    };
    saveAllState();
    showToast(currentLang === 'ar' ? 'تم حفظ شعارات الهوية وبيانات التواصل بنجاح ✓' : 'Copy and contact details saved ✓');
  }

  function exportFullJsonBackup() {
    const fullBackup = {
      system: {
        version: '2.6.0',
        exported_at: new Date().toISOString(),
        agency: 'OTB Agency — The City Kings'
      },
      leads: leadsData,
      showcase: showcaseData,
      roi_config: roiConfig,
      content_config: contentConfig
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `OTB_DNA_Master_Backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    document.body.removeChild(dlAnchor);
    showToast(currentLang === 'ar' ? 'تم تصدير النسخة الاحتياطية الشاملة للمنظومة 💾' : 'Full Backup Exported 💾');
  }

  function handleImportFile(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      try {
        const imported = JSON.parse(event.target.result);
        if (imported.leads) leadsData = imported.leads;
        if (imported.showcase) showcaseData = imported.showcase;
        if (imported.roi_config) roiConfig = imported.roi_config;
        if (imported.content_config) contentConfig = imported.content_config;

        saveAllState();
        renderAll();
        showToast(currentLang === 'ar' ? 'تم استيراد وتطبيق النسخة الاحتياطية بنجاح ✓' : 'Backup imported successfully ✓');
      } catch (err) {
        alert(currentLang === 'ar' ? 'الملف المحدد غير صالح أو غير متوافق' : 'Invalid JSON file');
      }
    };
    reader.readAsText(file);
  }

  async function resetToDna2026() {
    const confirmMsg = currentLang === 'ar' ? 'هل ترغب بالتأكيد في استعادة كافة بيانات وإعدادات OTB DNA 2026 الأصلية المعتمدة؟' : 'Reset all configuration to verified OTB DNA 2026?';
    if (confirm(confirmMsg)) {
      try {
        const resp = await fetch('data/default_dna_config.json');
        if (resp.ok) {
          const cfg = await resp.json();
          leadsData = cfg.initial_leads || [];
          showcaseData = cfg.showcase_items || [];
          roiConfig = cfg.roi_multipliers || {};
          contentConfig = {
            motto: cfg.system.motto,
            motto_ar: cfg.system.motto_ar,
            contact: cfg.contact,
            metrics: cfg.metrics
          };
          saveAllState();
          renderAll();
          showToast(currentLang === 'ar' ? 'تمت استعادة إعدادات DNA 2026 الأصلية بنجاح ↺' : 'Restored to verified DNA 2026 ↺');
        }
      } catch (e) {
        alert('Failed to reset config: ' + e);
      }
    }
  }

  function showToast(msg) {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.innerHTML = `<span>👑</span><span>${msg}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 3200);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

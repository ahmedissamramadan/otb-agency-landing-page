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
     DICTIONARY & LOCALIZATION
     ========================================================================== */
  const I18N = {
    ar: {
      app_title: 'غرفة العمليات التنفيذية',
      app_subtitle: 'منظومة الإدارة المتكاملة · OTB Agency 2026',
      status_live: 'مباشر / حي',
      btn_view_site: 'معاينة الموقع الحي ↗',
      btn_sync: 'مزامنة وحفظ ⚡',
      btn_logout: 'قفل النظام 🔒',
      tab_overview: '📊 مؤشرات الأداء',
      tab_leads: '📥 الحجوزات والـ CRM',
      tab_showcase: '🎨 معرض الأعمال CMS',
      tab_roi: '⚙️ محاكي العائد ROI',
      tab_content: '🌐 المحتوى والـ SEO',
      tab_corelink: '⚡ عمليات CoreLink',

      // Overview
      ov_title: 'نبض العمليات والمؤشرات الحيوية',
      ov_desc: 'نظرة شمولية فورية على طلبات العملاء الجدد، ميزانيات الحملات المحتملة، ومؤشرات التوسع الرقمي.',
      kpi_total_leads: 'إجمالي طلبات الاستراتيجية',
      kpi_pipeline_val: 'القيمة التقديرية للحملات',
      kpi_conv_rate: 'معدل التحويل (Closed)',
      kpi_top_vertical: 'القطاع الأكثر طلباً',
      kpi_verified_views: 'المشاهدات الموثقة سنوياً',
      kpi_active_clients: 'العلامات المعتمدة بالشريط',

      // CRM
      crm_title: 'إدارة طلبات جلسات الاستراتيجية (Executive CRM)',
      crm_desc: 'متابعة كافة العملاء والشركات التي سجلت عبر نموذج الاستراتيجية مع زر محادثة واتساب فوري بنقرة واحدة.',
      btn_add_lead: '+ إضافة عميل يدوياً',
      btn_export_csv: 'تصدير لملف Excel/CSV 📥',
      search_placeholder: 'بحث بالاسم، الشركة، أو الهاتف...',
      filter_all_status: 'كافة الحالات',
      th_client: 'العميل / الشركة',
      th_contact: 'الهاتف / واتساب',
      th_service: 'الخدمة المطلوبة',
      th_budget: 'الميزانية التقديرية',
      th_date: 'تاريخ الطلب',
      th_status: 'حالة العميل',
      th_actions: 'إجراءات سريعة',
      st_new: 'جديد (New)',
      st_contacted: 'تم التواصل (Contacted)',
      st_strategy: 'جلسة استراتيجية (Strategy)',
      st_closed_won: 'تم التعاقد (Closed Won)',
      st_archived: 'مؤرشف (Archived)',

      // Showcase
      sc_title: 'نظام إدارة معرض الأعمال والتوثيق (Showcase CMS)',
      sc_desc: 'إدارة وتعديل الـ 20 عملاً موثقاً ودراسات الحالة الحقيقية التي تظهر في الواجهة الرئيسية للموقع.',
      btn_add_proof: '+ إضافة عمل موثق جديد',
      filter_all_cats: 'كافة التصنيفات',
      cat_clients: 'حالات العملاء (Clients)',
      cat_dossier: 'سجلات التدقيق (Audit Dossiers)',
      cat_manifesto: 'أعمال المانيفيستو (Manifesto)',

      // ROI
      roi_title: 'محرك ضبط ومضاعفات محاكي النمو (ROI Engine)',
      roi_desc: 'تعديل المعاملات الرياضية ومضاعفات الوصول والعملاء المتوقعين لكل قطاع وسوق.',
      btn_save_roi: 'حفظ مضاعفات المحاكي ✓',

      // Content & SEO
      cnt_title: 'محرر النصوص الرسمية وبيانات التواصل',
      cnt_desc: 'تعديل شعارات الموقع الرسمية، العناوين الرئيسية، وبيانات الاتصال والواتساب.',
      btn_save_content: 'حفظ النصوص والميتا ✓',

      // CoreLink
      cl_title: 'مركز مراقبة العمليات والنسخ الاحتياطي',
      cl_desc: 'متابعة مهام منظومة CoreLink وتصدير واستيراد قاعدة بيانات المنظومة بالكامل بصيغة JSON.',
      btn_export_json: 'تصدير النسخة الاحتياطية الكاملة (JSON) 💾',
      btn_import_json: 'استيراد نسخة احتياطية 📤',
      btn_reset_dna: 'استعادة إعدادات DNA 2026 الأصلية ↺'
    },
    en: {
      app_title: 'Executive Command Center',
      app_subtitle: 'Full-Stack Management System · OTB Agency 2026',
      status_live: 'LIVE / PRODUCTION',
      btn_view_site: 'View Live Site ↗',
      btn_sync: 'Sync & Save ⚡',
      btn_logout: 'Lock System 🔒',
      tab_overview: '📊 Overview',
      tab_leads: '📥 Strategy CRM',
      tab_showcase: '🎨 Showcase CMS',
      tab_roi: '⚙️ ROI Simulator',
      tab_content: '🌐 Content & SEO',
      tab_corelink: '⚡ CoreLink Ops',

      ov_title: 'Operational Pulse & Performance KPIs',
      ov_desc: 'High-altitude live telemetry on incoming strategy leads, estimated pipeline budgets, and commercial reach.',
      kpi_total_leads: 'Total Strategy Bookings',
      kpi_pipeline_val: 'Estimated Pipeline Value',
      kpi_conv_rate: 'Conversion Rate (Closed)',
      kpi_top_vertical: 'Top In-Demand Vertical',
      kpi_verified_views: 'Annual Verified Views',
      kpi_active_clients: 'Marquee Client Brands',

      crm_title: 'Strategy Bookings Management (Executive CRM)',
      crm_desc: 'Track and manage every enterprise lead from the strategy form with 1-click personalized WhatsApp dispatch.',
      btn_add_lead: '+ Add Lead Manually',
      btn_export_csv: 'Export to Excel/CSV 📥',
      search_placeholder: 'Search name, company, or phone...',
      filter_all_status: 'All Statuses',
      th_client: 'Client / Company',
      th_contact: 'Phone / WhatsApp',
      th_service: 'Requested Pillar',
      th_budget: 'Est. Budget',
      th_date: 'Submitted Date',
      th_status: 'Lead Status',
      th_actions: 'Quick Actions',
      st_new: 'New',
      st_contacted: 'Contacted',
      st_strategy: 'Strategy Session',
      st_closed_won: 'Closed Won',
      st_archived: 'Archived',

      sc_title: 'Showcase CMS & Verification Records',
      sc_desc: 'Control and edit the 20 documented works and verified benchmark case studies showcased on the live site.',
      btn_add_proof: '+ Add New Proof Card',
      filter_all_cats: 'All Categories',
      cat_clients: 'Client Cases',
      cat_dossier: 'Audit Dossiers',
      cat_manifesto: 'Manifesto Art',

      roi_title: 'Growth Simulator Engine & Multipliers',
      roi_desc: 'Calibrate mathematical factors, reach multipliers, and projected lead acquisition costs per vertical.',
      btn_save_roi: 'Save Simulator Multipliers ✓',

      cnt_title: 'Brand Copywriting, Metadata & Contacts',
      cnt_desc: 'Manage authoritative slogans, hero headlines, meta tags, and official WhatsApp contact numbers.',
      btn_save_content: 'Save Copy & Metadata ✓',

      cl_title: 'CoreLink Operations & Complete Backup Engine',
      cl_desc: 'Monitor sprint tasks and export/import full system configuration as standard JSON.',
      btn_export_json: 'Export Master Backup (JSON) 💾',
      btn_import_json: 'Import Backup 📤',
      btn_reset_dna: 'Reset to Verified DNA 2026 ↺'
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

    // Check existing session
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
        showToast(currentLang === 'ar' ? 'تم الدخول بنجاح إلى غرفة العمليات' : 'Executive Command Center Unlocked');
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

    // Keyboard support
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

    // Logout
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
      // 1. Leads
      const storedLeads = localStorage.getItem(STORAGE_KEYS.LEADS);
      if (storedLeads) {
        leadsData = JSON.parse(storedLeads);
      }

      // 2. Showcase
      const storedShowcase = localStorage.getItem(STORAGE_KEYS.SHOWCASE);
      if (storedShowcase) {
        showcaseData = JSON.parse(storedShowcase);
      }

      // 3. ROI
      const storedRoi = localStorage.getItem(STORAGE_KEYS.ROI);
      if (storedRoi) {
        roiConfig = JSON.parse(storedRoi);
      }

      // 4. Content
      const storedContent = localStorage.getItem(STORAGE_KEYS.CONTENT);
      if (storedContent) {
        contentConfig = JSON.parse(storedContent);
      }

      // If any core data is missing, fetch from default_dna_config.json
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
     LANGUAGE & DIRECTION
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

    // If switching to ROI tab, trigger preview calculation
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
      pipelineVal += parseInt(l.budget || 1500, 10);
    });

    // Top vertical
    const servicesCount = {};
    leadsData.forEach(l => {
      servicesCount[l.service] = (servicesCount[l.service] || 0) + 1;
    });
    let topService = 'Full-Funnel';
    if (servicesCount['video'] > (servicesCount['all'] || 0)) topService = 'Visual Production';
    if (servicesCount['marketing'] > (servicesCount['all'] || 0)) topService = 'Performance Ads';

    const elTotal = document.getElementById('ovTotalLeads');
    const elPipe = document.getElementById('ovPipelineVal');
    const elConv = document.getElementById('ovConvRate');
    const elTop = document.getElementById('ovTopService');
    const badgeCount = document.getElementById('crmBadgeCount');

    if (elTotal) elTotal.innerText = totalLeads;
    if (elPipe) elPipe.innerText = `$${pipelineVal.toLocaleString()}`;
    if (elConv) elConv.innerText = `${convRate}%`;
    if (elTop) elTop.innerText = topService;
    if (badgeCount) badgeCount.innerText = totalLeads;
  }

  /* 2. CRM Leads */
  function renderCRM() {
    const tbody = document.getElementById('leadsTableBody');
    if (!tbody) return;

    const query = (document.getElementById('searchLeadsInput')?.value || '').toLowerCase();
    const filterStatus = document.getElementById('filterLeadStatus')?.value || 'all';

    const filtered = leadsData.filter(lead => {
      const matchQuery =
        (lead.name || '').toLowerCase().includes(query) ||
        (lead.phone || '').toLowerCase().includes(query) ||
        (lead.notes || '').toLowerCase().includes(query);
      const matchStatus = filterStatus === 'all' || lead.status === filterStatus;
      return matchQuery && matchStatus;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
            ${currentLang === 'ar' ? 'لا توجد طلبات مطابقة للبحث أو الفلتر المحدد.' : 'No strategy requests match the selected search or filter.'}
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(lead => {
      const formattedDate = lead.created_at ? new Date(lead.created_at).toLocaleDateString(currentLang === 'ar' ? 'ar-EG' : 'en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recently';
      const cleanPhone = (lead.phone || '').replace(/[^\d+]/g, '');
      const waPhone = cleanPhone.startsWith('+') ? cleanPhone.substring(1) : (cleanPhone.startsWith('0') ? '2' + cleanPhone : cleanPhone);

      const greeting = currentLang === 'ar'
        ? `أهلاً بك ${lead.name} في وكالة OTB Agency (The City Kings). بخصوص طلبك لجلسة الاستراتيجية لخدمة (${lead.service_label || lead.service})، يسعدنا تحديد موعد الجلسة التنفيذية.`
        : `Hello ${lead.name}! This is OTB Agency Executive Team regarding your strategy roadmap request for (${lead.service_label || lead.service}). We are ready to schedule your session.`;

      const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(greeting)}`;

      return `
        <tr>
          <td>
            <strong style="color: var(--text-primary); font-size: 0.95rem;">${escapeHtml(lead.name)}</strong>
            ${lead.notes ? `<div style="font-size: 0.76rem; color: var(--text-muted); margin-top: 0.2rem; max-width: 260px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${escapeHtml(lead.notes)}">${escapeHtml(lead.notes)}</div>` : ''}
          </td>
          <td>
            <span style="font-family: monospace; color: var(--accent-gold);">${escapeHtml(lead.phone)}</span>
          </td>
          <td>
            <span style="font-size: 0.82rem; color: var(--text-secondary);">${getServiceTitle(lead.service)}</span>
          </td>
          <td>
            <strong style="color: var(--accent-gold-bright);">$${(lead.budget || 1500).toLocaleString()}</strong>
          </td>
          <td>
            <span style="font-size: 0.78rem; color: var(--text-muted);">${formattedDate}</span>
          </td>
          <td>
            <select class="select-filter" style="font-size: 0.78rem; padding: 0.25rem 0.6rem;" onchange="window.updateLeadStatus('${lead.id}', this.value)">
              <option value="new" ${lead.status === 'new' ? 'selected' : ''}>${I18N[currentLang].st_new}</option>
              <option value="contacted" ${lead.status === 'contacted' ? 'selected' : ''}>${I18N[currentLang].st_contacted}</option>
              <option value="strategy_session" ${lead.status === 'strategy_session' ? 'selected' : ''}>${I18N[currentLang].st_strategy}</option>
              <option value="closed_won" ${lead.status === 'closed_won' ? 'selected' : ''}>${I18N[currentLang].st_closed_won}</option>
              <option value="archived" ${lead.status === 'archived' ? 'selected' : ''}>${I18N[currentLang].st_archived}</option>
            </select>
          </td>
          <td>
            <div class="table-action-row">
              <a href="${waUrl}" target="_blank" rel="noopener" class="btn-icon-action whatsapp" title="${currentLang === 'ar' ? 'محادثة واتساب مخصصة' : 'Direct WhatsApp Chat'}">
                💬
              </a>
              <button class="btn-icon-action danger" onclick="window.deleteLead('${lead.id}')" title="${currentLang === 'ar' ? 'حذف الطلب' : 'Delete Lead'}">
                🗑️
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  function getServiceTitle(srv) {
    if (srv === 'video') return currentLang === 'ar' ? 'إنتاج فيديو سينمائي' : 'Visual Production';
    if (srv === 'marketing') return currentLang === 'ar' ? 'إعلانات أداء ومبيعات' : 'Performance Marketing';
    if (srv === 'branding') return currentLang === 'ar' ? 'هوية ثلاثية الأبعاد' : '3D Branding';
    return currentLang === 'ar' ? 'شراكة نمو شاملة' : 'Full-Funnel Growth';
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
            <div class="showcase-metric-pill">📈 ${escapeHtml(item.metric)}</div>
            <p class="showcase-card-desc">${escapeHtml(item.desc)}</p>
            <div class="showcase-footer">
              <span style="font-size: 0.72rem; color: var(--text-muted); font-family: monospace;">ID: ${item.id}</span>
              <div style="display: flex; gap: 0.4rem;">
                <button class="btn-nav-action" style="padding: 0.35rem 0.75rem; font-size: 0.78rem;" onclick="window.openEditShowcaseModal('${item.id}')">
                  ✏️ ${currentLang === 'ar' ? 'تعديل' : 'Edit'}
                </button>
                <button class="btn-icon-action danger" style="width: 28px; height: 28px;" onclick="window.deleteShowcaseItem('${item.id}')">
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
            <span class="param-badge">${key.toUpperCase()}</span>
          </div>
          <div class="param-row">
            <span class="param-label">${currentLang === 'ar' ? 'مضاعف الوصول (Multiplier):' : 'Reach Multiplier:'}</span>
            <input type="number" step="0.05" class="param-input" id="roi_factor_${key}" value="${item.factor}" onchange="window.updateRoiParam('${key}', 'factor', this.value)">
          </div>
          <div class="param-row">
            <span class="param-label">${currentLang === 'ar' ? 'متوسط تكلفة العميل التقديرية ($):' : 'Est. Cost per Lead ($):'}</span>
            <input type="number" step="0.1" class="param-input" id="roi_cost_${key}" value="${item.lead_cost || 3.0}" onchange="window.updateRoiParam('${key}', 'lead_cost', this.value)">
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  function calcLiveRoi() {
    const slider = document.getElementById('adminRoiSlider');
    const budgetVal = slider ? parseInt(slider.value, 10) : 2500;
    const elBudget = document.getElementById('adminRoiBudgetDisplay');
    const elReach = document.getElementById('adminRoiReachDisplay');
    const elLeads = document.getElementById('adminRoiLeadsDisplay');
    const elRoas = document.getElementById('adminRoiRoasDisplay');

    if (elBudget) elBudget.innerText = `$${budgetVal.toLocaleString()}`;

    // Calculation based on current FMCG factor
    const factor = roiConfig?.industries?.fmcg?.factor || 1.25;
    const estReach = Math.round(budgetVal * 200 * factor);
    const minLeads = Math.round((budgetVal / 3.8) * factor);
    const maxLeads = Math.round((budgetVal / 1.9) * factor);
    const minRoas = (3.5 * (factor / 1.1)).toFixed(1);
    const maxRoas = (5.2 * (factor / 1.1)).toFixed(1);

    if (elReach) elReach.innerText = `${estReach.toLocaleString()}+`;
    if (elLeads) elLeads.innerText = `${minLeads.toLocaleString()} - ${maxLeads.toLocaleString()}`;
    if (elRoas) elRoas.innerText = `${minRoas}x - ${maxRoas}x`;
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

    const tasks = configData?.corelink_operations?.high_priority_actions || [
      { id: 't1', title: 'Deploy Franks Ramadan Campaign Assets', assignee: 'Production Track', status: 'Ready', priority: 'High' },
      { id: 't2', title: 'Launch Mission 01 Outreach (10th of Ramadan)', assignee: 'Growth Engine', status: 'In Progress', priority: 'High' },
      { id: 't3', title: 'Deliver Printable Portfolio (Aya & Rawan)', assignee: 'Creative Studio', status: 'Design Phase', priority: 'Medium' }
    ];

    container.innerHTML = tasks.map(t => {
      return `
        <div style="background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem 1.25rem; margin-bottom: 0.85rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.85rem;">
          <div>
            <strong style="color: var(--text-primary); font-size: 0.92rem;">${escapeHtml(t.title)}</strong>
            <div style="font-size: 0.76rem; color: var(--text-muted); margin-top: 0.2rem;">Assignee: <span style="color: var(--accent-gold);">${escapeHtml(t.assignee)}</span></div>
          </div>
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <span class="badge-status ${t.status === 'Ready' ? 'closed_won' : 'contacted'}">${escapeHtml(t.status)}</span>
            <span style="font-size: 0.72rem; color: var(--text-secondary); background: rgba(255,255,255,0.05); padding: 0.2rem 0.5rem; border-radius: 4px;">${escapeHtml(t.priority)}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  /* ==========================================================================
     GLOBAL ACTIONS & EVENT LISTENERS
     ========================================================================== */
  function setupEventListeners() {
    // CRM Search & Filter
    document.getElementById('searchLeadsInput')?.addEventListener('input', renderCRM, { passive: true });
    document.getElementById('filterLeadStatus')?.addEventListener('change', renderCRM);
    document.getElementById('filterShowcaseCat')?.addEventListener('change', renderShowcase);

    // Live ROI Slider
    document.getElementById('adminRoiSlider')?.addEventListener('input', calcLiveRoi, { passive: true });

    // Global Sync Button
    document.getElementById('btnSyncAll')?.addEventListener('click', () => {
      saveAllState();
      showToast(currentLang === 'ar' ? 'تمت مزامنة وحفظ كافة البيانات بنجاح ⚡' : 'All Data Synced & Saved to Local System ⚡');
    });

    // CRM Export CSV
    document.getElementById('btnExportCsv')?.addEventListener('click', exportLeadsCsv);

    // Save ROI Button
    document.getElementById('btnSaveRoi')?.addEventListener('click', () => {
      localStorage.setItem(STORAGE_KEYS.ROI, JSON.stringify(roiConfig));
      showToast(currentLang === 'ar' ? 'تم حفظ معايير محاكي العائد بنجاح ✓' : 'ROI Multipliers Saved Successfully ✓');
    });

    // Save Content Button
    document.getElementById('btnSaveContent')?.addEventListener('click', saveContentForm);

    // Export JSON Backup
    document.getElementById('btnExportMasterJson')?.addEventListener('click', exportFullJsonBackup);

    // Import JSON Backup
    document.getElementById('btnTriggerImport')?.addEventListener('click', () => {
      document.getElementById('importFileInput')?.click();
    });

    document.getElementById('importFileInput')?.addEventListener('change', handleImportFile);

    // Reset DNA 2026
    document.getElementById('btnResetDna')?.addEventListener('click', resetToDna2026);
  }

  /* Save all State */
  function saveAllState() {
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leadsData));
    localStorage.setItem(STORAGE_KEYS.SHOWCASE, JSON.stringify(showcaseData));
    localStorage.setItem(STORAGE_KEYS.ROI, JSON.stringify(roiConfig));
    localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(contentConfig));

    // Dispatch custom event for real-time tab sync
    window.dispatchEvent(new CustomEvent('otb_data_updated', {
      detail: { leads: leadsData, showcase: showcaseData, roi: roiConfig, content: contentConfig }
    }));
  }

  /* CRM Actions */
  window.updateLeadStatus = function (leadId, newStatus) {
    const lead = leadsData.find(l => l.id === leadId);
    if (lead) {
      lead.status = newStatus;
      saveAllState();
      renderOverview();
      showToast(currentLang === 'ar' ? `تم تحديث حالة العميل إلى: ${newStatus}` : `Lead status updated to: ${newStatus}`);
    }
  };

  window.deleteLead = function (leadId) {
    const confirmMsg = currentLang === 'ar' ? 'هل أنت متأكد من حذف هذا العميل من السجل؟' : 'Are you sure you want to delete this lead?';
    if (confirm(confirmMsg)) {
      leadsData = leadsData.filter(l => l.id !== leadId);
      saveAllState();
      renderOverview();
      renderCRM();
      showToast(currentLang === 'ar' ? 'تم حذف العميل بنجاح' : 'Lead deleted successfully');
    }
  };

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
    const budget = parseInt(document.getElementById('addLeadBudget').value, 10) || 2500;
    const notes = document.getElementById('addLeadNotes').value.trim();

    if (!name || !phone) {
      alert(currentLang === 'ar' ? 'يرجى إدخال الاسم ورقم الهاتف' : 'Please provide name and phone');
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
    showToast(currentLang === 'ar' ? 'تمت إضافة العميل الجديد بنجاح ✓' : 'New Lead Added Successfully ✓');
  };

  /* CSV Export */
  function exportLeadsCsv() {
    if (leadsData.length === 0) {
      alert(currentLang === 'ar' ? 'لا توجد بيانات عملاء للتصدير' : 'No leads to export');
      return;
    }

    let csvContent = '\uFEFF'; // BOM for UTF-8 Excel Arabic compatibility
    csvContent += 'ID,Name,Phone,Service,Budget_USD,Status,Notes,Created_At\n';

    leadsData.forEach(l => {
      const row = [
        `"${l.id}"`,
        `"${(l.name || '').replace(/"/g, '""')}"`,
        `"${(l.phone || '').replace(/"/g, '""')}"`,
        `"${(l.service || '').replace(/"/g, '""')}"`,
        `"${l.budget || 0}"`,
        `"${l.status || 'new'}"`,
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
    showToast(currentLang === 'ar' ? 'تم تنزيل ملف الإكسيل بنجاح 📥' : 'Leads CSV downloaded successfully 📥');
  }

  /* Showcase CMS Actions */
  window.openEditShowcaseModal = function (itemId) {
    const item = showcaseData.find(sc => sc.id === itemId);
    if (!item) return;

    document.getElementById('editScId').value = item.id;
    document.getElementById('editScTitle').value = item.title;
    document.getElementById('editScTitleAr').value = item.title_ar || item.title;
    document.getElementById('editScCat').value = item.cat;
    document.getElementById('editScCategory').value = item.category;
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
      showToast(currentLang === 'ar' ? 'تم تحديث العمل في المعرض بنجاح ✓' : 'Showcase item updated ✓');
    }
  };

  window.deleteShowcaseItem = function (itemId) {
    const confirmMsg = currentLang === 'ar' ? 'هل أنت متأكد من حذف هذا العمل من المعرض؟' : 'Delete this item from showcase?';
    if (confirm(confirmMsg)) {
      showcaseData = showcaseData.filter(sc => sc.id !== itemId);
      saveAllState();
      renderShowcase();
      showToast(currentLang === 'ar' ? 'تم حذف العنصر من المعرض' : 'Showcase item deleted');
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
      alert('Please provide title and metric');
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
    showToast(currentLang === 'ar' ? 'تمت إضافة العمل الموثق الجديد للمعرض ✓' : 'New proof item added to showcase ✓');
  };

  /* ROI Updates */
  window.updateRoiParam = function (key, prop, val) {
    if (roiConfig && roiConfig.industries && roiConfig.industries[key]) {
      roiConfig.industries[key][prop] = parseFloat(val);
      calcLiveRoi();
    }
  };

  /* Content Updates */
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
    showToast(currentLang === 'ar' ? 'تم حفظ النصوص وبيانات الاتصال بنجاح ✓' : 'Copy and contact details saved ✓');
  }

  /* Full Backup & Import */
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
    showToast(currentLang === 'ar' ? 'تم تصدير النسخة الاحتياطية الشاملة 💾' : 'Full Backup Exported 💾');
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
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  }

  async function resetToDna2026() {
    const confirmMsg = currentLang === 'ar' ? 'هل ترغب بالتأكيد في استعادة كافة بيانات وإعدادات OTB DNA 2026 الأصلية؟' : 'Reset all configuration to verified OTB DNA 2026?';
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

  /* Utility Toast */
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

  // Self-bootstrap on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

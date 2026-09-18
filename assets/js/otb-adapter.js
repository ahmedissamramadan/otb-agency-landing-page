/**
 * ============================================================================
 * OTB Agency - Enterprise Sovereign Data Adapter (Repository Pattern)
 * ============================================================================
 * Pluggable data layer providing unified asynchronous CRUD operations across:
 * - Agency Configuration & Telemetry
 * - Client Strategy Inbound Leads (CRM)
 * - Sovereign Discovery Engine (9-Stage Client Qualification)
 * - Showcase Portfolio CMS
 * - Growth Academy AI Squads, Curricula, Audio & Certificates
 * 
 * Storage Drivers:
 * 1. 'local': Browser LocalStorage with fallback to seed JSON files.
 * 2. 'api': Asynchronous HTTP REST calls to corporate backend endpoints (/api/v1/...).
 * ============================================================================
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.OTBData = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  const STORAGE_KEYS = {
    CONFIG: 'otb_dna_config',
    LEADS: 'otb_leads_data',
    DISCOVERY: 'otb_discovery_briefs',
    SHOWCASE: 'otb_showcase_cms',
    ACADEMY: 'otb_academy_data',
    MODE: 'otb_storage_mode',
    API_URL: 'otb_api_endpoint'
  };

  const DEFAULT_API_BASE = '/api/v1';

  class OTBStorageAdapter {
    constructor() {
      this.mode = (typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEYS.MODE) : null) || 'local';
      this.apiBase = (typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEYS.API_URL) : null) || DEFAULT_API_BASE;
      this.initialized = false;
    }

    async init() {
      if (this.initialized) return this;
      if (typeof localStorage !== 'undefined') {
        try {
          const legacyManus = localStorage.getItem('otb_manus_briefs');
          if (legacyManus && !localStorage.getItem(STORAGE_KEYS.DISCOVERY)) {
            localStorage.setItem(STORAGE_KEYS.DISCOVERY, legacyManus);
            localStorage.removeItem('otb_manus_briefs');
          }
        } catch (e) {
          console.warn('[OTBAdapter] Legacy migration skipped:', e);
        }
      }
      this.initialized = true;
      return this;
    }

    setMode(mode, apiBase = null) {
      this.mode = mode === 'api' ? 'api' : 'local';
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.MODE, this.mode);
        if (apiBase) {
          this.apiBase = apiBase;
          localStorage.setItem(STORAGE_KEYS.API_URL, apiBase);
        }
      }
      return { mode: this.mode, apiBase: this.apiBase };
    }

    /* 1. Global DNA Configuration & Telemetry */
    async getConfig() {
      await this.init();
      if (this.mode === 'api') {
        try {
          const res = await fetch(`${this.apiBase}/config`);
          if (res.ok) return await res.json();
        } catch (err) {
          console.warn('[OTBAdapter] Remote API failed, fallback to local:', err);
        }
      }

      if (typeof localStorage !== 'undefined') {
        const cached = localStorage.getItem(STORAGE_KEYS.CONFIG);
        if (cached) {
          try { return JSON.parse(cached); } catch (e) {}
        }
      }

      try {
        if (typeof window === 'undefined' && typeof require !== 'undefined') {
          const fs = require('fs');
          const path = require('path');
          const filePath = path.resolve(__dirname, '../../data/default_dna_config.json');
          if (fs.existsSync(filePath)) {
            return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
          }
        }
        const res = await fetch('data/default_dna_config.json');
        if (res.ok) {
          const seed = await res.json();
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(seed));
          }
          return seed;
        }
      } catch (err) {
        console.error('[OTBAdapter] Failed to load config seed:', err);
      }
      return {};
    }

    async saveConfig(configData) {
      await this.init();
      configData.updated_at = new Date().toISOString();
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(configData));
      }

      if (this.mode === 'api') {
        try {
          await fetch(`${this.apiBase}/config`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(configData)
          });
        } catch (err) {
          console.warn('[OTBAdapter] Remote saveConfig failed:', err);
        }
      }
      return configData;
    }

    /* 2. Client Inbound Leads (CRM) */
    async getLeads() {
      await this.init();
      if (this.mode === 'api') {
        try {
          const res = await fetch(`${this.apiBase}/leads`);
          if (res.ok) return await res.json();
        } catch (err) {}
      }

      if (typeof localStorage !== 'undefined') {
        const cached = localStorage.getItem(STORAGE_KEYS.LEADS);
        if (cached) {
          try { return JSON.parse(cached); } catch (e) {}
        }
      }

      const cfg = await this.getConfig();
      const leads = cfg.initial_leads || [];
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
      }
      return leads;
    }

    async saveLead(lead) {
      await this.init();
      const leads = await this.getLeads();
      const idx = leads.findIndex(l => l.id === lead.id);
      if (idx !== -1) {
        leads[idx] = { ...leads[idx], ...lead, updated_at: new Date().toISOString() };
      } else {
        if (!lead.id) lead.id = 'lead_' + Date.now();
        lead.created_at = new Date().toISOString();
        leads.unshift(lead);
      }
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
      }

      if (this.mode === 'api') {
        try {
          await fetch(`${this.apiBase}/leads`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(lead)
          });
        } catch (err) {}
      }
      return lead;
    }

    async deleteLead(id) {
      await this.init();
      let leads = await this.getLeads();
      leads = leads.filter(l => l.id !== id);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
      }
      return leads;
    }

    /* 3. Sovereign Discovery Engine (9-Stage Qualification) */
    async getDiscoveryBriefs() {
      await this.init();
      if (this.mode === 'api') {
        try {
          const res = await fetch(`${this.apiBase}/discovery`);
          if (res.ok) return await res.json();
        } catch (err) {}
      }

      if (typeof localStorage !== 'undefined') {
        const cached = localStorage.getItem(STORAGE_KEYS.DISCOVERY);
        if (cached) {
          try { return JSON.parse(cached); } catch (e) {}
        }
      }

      const cfg = await this.getConfig();
      const briefs = cfg.initial_sovereign_briefs || {};
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.DISCOVERY, JSON.stringify(briefs));
      }
      return briefs;
    }

    async getDiscoveryBrief(id) {
      const briefs = await this.getDiscoveryBriefs();
      return briefs[id] || null;
    }

    async saveDiscoveryBrief(id, briefData) {
      await this.init();
      const briefs = await this.getDiscoveryBriefs();
      briefData.updated_at = new Date().toISOString();
      briefs[id] = briefData;
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.DISCOVERY, JSON.stringify(briefs));
      }

      if (this.mode === 'api') {
        try {
          await fetch(`${this.apiBase}/discovery`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, brief: briefData })
          });
        } catch (err) {}
      }
      return briefData;
    }

    /* 4. Showcase Portfolio CMS */
    async getShowcase() {
      await this.init();
      if (typeof localStorage !== 'undefined') {
        const cached = localStorage.getItem(STORAGE_KEYS.SHOWCASE);
        if (cached) {
          try { return JSON.parse(cached); } catch (e) {}
        }
      }

      const cfg = await this.getConfig();
      const items = cfg.showcase_items || [];
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.SHOWCASE, JSON.stringify(items));
      }
      return items;
    }

    async saveShowcaseItem(item) {
      await this.init();
      const items = await this.getShowcase();
      const idx = items.findIndex(i => i.id === item.id);
      if (idx !== -1) {
        items[idx] = { ...items[idx], ...item };
      } else {
        if (!item.id) item.id = 'showcase_' + Date.now();
        items.push(item);
      }
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.SHOWCASE, JSON.stringify(items));
      }
      return item;
    }

    /* 5. Growth Academy Data */
    async getAcademyData() {
      await this.init();
      if (this.mode === 'api') {
        try {
          const res = await fetch(`${this.apiBase}/academy`);
          if (res.ok) return await res.json();
        } catch (err) {}
      }

      if (typeof localStorage !== 'undefined') {
        const cached = localStorage.getItem(STORAGE_KEYS.ACADEMY);
        if (cached) {
          try { return JSON.parse(cached); } catch (e) {}
        }
      }

      try {
        if (typeof window === 'undefined' && typeof require !== 'undefined') {
          const fs = require('fs');
          const path = require('path');
          const filePath = path.resolve(__dirname, '../../data/academy_data.json');
          if (fs.existsSync(filePath)) {
            return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
          }
        }
        const res = await fetch('data/academy_data.json');
        if (res.ok) {
          const data = await res.json();
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem(STORAGE_KEYS.ACADEMY, JSON.stringify(data));
          }
          return data;
        }
      } catch (err) {
        console.error('[OTBAdapter] Failed to load academy seed:', err);
      }
      return {};
    }

    async saveAcademyData(academyData) {
      await this.init();
      academyData.updated_at = new Date().toISOString();
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.ACADEMY, JSON.stringify(academyData));
      }

      if (this.mode === 'api') {
        try {
          await fetch(`${this.apiBase}/academy`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(academyData)
          });
        } catch (err) {}
      }
      return academyData;
    }

    /* 6. Full Ecosystem Backup, Restore & Migration */
    async exportFullBackup() {
      await this.init();
      const [config, leads, discovery, showcase, academy] = await Promise.all([
        this.getConfig(),
        this.getLeads(),
        this.getDiscoveryBriefs(),
        this.getShowcase(),
        this.getAcademyData()
      ]);

      return {
        meta: {
          export_version: '2026.2.0',
          exported_at: new Date().toISOString(),
          agency: 'OTB Agency (The City Kings)',
          generator: 'OTB Enterprise Storage Adapter'
        },
        config,
        leads,
        discovery_briefs: discovery,
        showcase_items: showcase,
        academy_data: academy
      };
    }

    async importFullBackup(backupData) {
      await this.init();
      const data = typeof backupData === 'string' ? JSON.parse(backupData) : backupData;

      if (!data || typeof data !== 'object') {
        throw new Error('Invalid backup file structure.');
      }

      if (typeof localStorage !== 'undefined') {
        if (data.config) localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(data.config));
        if (data.leads) localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(data.leads));
        if (data.discovery_briefs) localStorage.setItem(STORAGE_KEYS.DISCOVERY, JSON.stringify(data.discovery_briefs));
        if (data.showcase_items) localStorage.setItem(STORAGE_KEYS.SHOWCASE, JSON.stringify(data.showcase_items));
        if (data.academy_data) localStorage.setItem(STORAGE_KEYS.ACADEMY, JSON.stringify(data.academy_data));
      }

      return { success: true, timestamp: new Date().toISOString() };
    }

    async resetToFactoryDefaults() {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(STORAGE_KEYS.CONFIG);
        localStorage.removeItem(STORAGE_KEYS.LEADS);
        localStorage.removeItem(STORAGE_KEYS.DISCOVERY);
        localStorage.removeItem(STORAGE_KEYS.SHOWCASE);
        localStorage.removeItem(STORAGE_KEYS.ACADEMY);
      }
      return await this.exportFullBackup();
    }

    /* 7. System Health & Storage Telemetry */
    async getHealth() {
      await this.init();
      const leads = await this.getLeads();
      const briefs = await this.getDiscoveryBriefs();
      const academy = await this.getAcademyData();
      const showcase = await this.getShowcase();

      return {
        status: 'ONLINE',
        mode: this.mode,
        api_base: this.apiBase,
        counts: {
          leads: leads.length,
          discovery_briefs: Object.keys(briefs).length,
          curricula: academy.curricula ? academy.curricula.length : 0,
          squads: academy.squad_roles ? academy.squad_roles.length : 0,
          showcase_items: showcase.length
        },
        storage_engine: typeof localStorage !== 'undefined' ? 'HTML5 LocalStorage + JSON Seed' : 'Memory'
      };
    }
  }

  return new OTBStorageAdapter();
}));

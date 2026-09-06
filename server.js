/**
 * ============================================================================
 * OTB Agency — Production Enterprise HTTP & REST Server
 * ============================================================================
 * Zero-dependency, high-performance Node.js runtime supporting:
 * - Static file serving with MIME negotiation & security headers
 * - REST API v1 endpoints for Leads CRM, Discovery Pipeline, Config & Academy
 * - Persistent JSON disk storage for enterprise self-hosting
 * - Container healthcheck & graceful lifecycle shutdown
 * ============================================================================
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8088;
const HOST = process.env.HOST || '0.0.0.0';
const DATA_DIR = path.join(__dirname, 'data');

// MIME Registry
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.otf': 'font/otf',
  '.mp3': 'audio/mpeg',
  '.ico': 'image/x-icon'
};

// Security Headers
const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-XSS-Protection': '1; mode=block',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
};

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helper: Read JSON safely
function readJson(filename, defaultVal = {}) {
  const p = path.join(DATA_DIR, filename);
  try {
    if (fs.existsSync(p)) {
      return JSON.parse(fs.readFileSync(p, 'utf-8'));
    }
  } catch (err) {
    console.error(`[Server] Error reading ${filename}:`, err.message);
  }
  return defaultVal;
}

// Helper: Write JSON safely
function writeJson(filename, data) {
  const p = path.join(DATA_DIR, filename);
  try {
    fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`[Server] Error writing ${filename}:`, err.message);
    return false;
  }
}

// Helper: Parse request body
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 50 * 1024 * 1024) { // 50MB limit for backups
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

// JSON API Response Helper
function jsonResponse(res, statusCode, data) {
  res.writeHead(statusCode, {
    ...SECURITY_HEADERS,
    'Content-Type': 'application/json; charset=utf-8'
  });
  res.end(JSON.stringify(data, null, 2));
}

// HTTP Server
const server = http.createServer(async (req, res) => {
  const urlParts = req.url.split('?');
  const pathname = urlParts[0];

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, SECURITY_HEADERS);
    return res.end();
  }

  /* -------------------------------------------------------------------------- */
  /* REST API v1 ENDPOINTS                                                      */
  /* -------------------------------------------------------------------------- */
  if (pathname.startsWith('/api/v1/')) {
    const route = pathname.replace('/api/v1', '');

    // 1. Healthcheck & Telemetry
    if (route === '/health' && req.method === 'GET') {
      const config = readJson('default_dna_config.json', {});
      const academy = readJson('academy_data.json', {});
      return jsonResponse(res, 200, {
        status: 'ONLINE',
        agency: 'OTB Agency (The City Kings)',
        node: 'Cairo Sovereign Production Node',
        version: '2026.2.0',
        uptime_seconds: Math.round(process.uptime()),
        timestamp: new Date().toISOString(),
        counts: {
          leads: (config.initial_leads || []).length,
          discovery_briefs: Object.keys(config.initial_sovereign_briefs || {}).length,
          squads: (academy.squad_roles || []).length,
          curricula: (academy.curricula || []).length
        }
      });
    }

    // 2. DNA Config Endpoint
    if (route === '/config') {
      if (req.method === 'GET') {
        const config = readJson('default_dna_config.json', {});
        return jsonResponse(res, 200, config);
      } else if (req.method === 'POST') {
        try {
          const body = await parseBody(req);
          writeJson('default_dna_config.json', body);
          return jsonResponse(res, 200, { success: true, updated_at: new Date().toISOString() });
        } catch (err) {
          return jsonResponse(res, 400, { error: err.message });
        }
      }
    }

    // 3. Leads (CRM) Endpoint
    if (route === '/leads') {
      const config = readJson('default_dna_config.json', {});
      if (req.method === 'GET') {
        return jsonResponse(res, 200, config.initial_leads || []);
      } else if (req.method === 'POST') {
        try {
          const lead = await parseBody(req);
          if (!config.initial_leads) config.initial_leads = [];
          const idx = config.initial_leads.findIndex(l => l.id === lead.id);
          if (idx !== -1) {
            config.initial_leads[idx] = { ...config.initial_leads[idx], ...lead, updated_at: new Date().toISOString() };
          } else {
            if (!lead.id) lead.id = 'lead_' + Date.now();
            lead.created_at = new Date().toISOString();
            config.initial_leads.unshift(lead);
          }
          writeJson('default_dna_config.json', config);
          return jsonResponse(res, 201, lead);
        } catch (err) {
          return jsonResponse(res, 400, { error: err.message });
        }
      }
    }

    // 4. Sovereign Discovery Briefs Endpoint
    if (route === '/discovery') {
      const config = readJson('default_dna_config.json', {});
      if (req.method === 'GET') {
        return jsonResponse(res, 200, config.initial_sovereign_briefs || {});
      } else if (req.method === 'POST') {
        try {
          const { id, brief } = await parseBody(req);
          if (!config.initial_sovereign_briefs) config.initial_sovereign_briefs = {};
          config.initial_sovereign_briefs[id] = brief;
          writeJson('default_dna_config.json', config);
          return jsonResponse(res, 200, { success: true, id, brief });
        } catch (err) {
          return jsonResponse(res, 400, { error: err.message });
        }
      }
    }

    // 5. Growth Academy Endpoint
    if (route === '/academy') {
      if (req.method === 'GET') {
        const academy = readJson('academy_data.json', {});
        return jsonResponse(res, 200, academy);
      } else if (req.method === 'POST') {
        try {
          const body = await parseBody(req);
          writeJson('academy_data.json', body);
          return jsonResponse(res, 200, { success: true, updated_at: new Date().toISOString() });
        } catch (err) {
          return jsonResponse(res, 400, { error: err.message });
        }
      }
    }

    // 6. Full Ecosystem Backup & Restore Endpoint
    if (route === '/backup' && req.method === 'GET') {
      const config = readJson('default_dna_config.json', {});
      const academy = readJson('academy_data.json', {});
      const backup = {
        meta: {
          export_version: '2026.2.0',
          exported_at: new Date().toISOString(),
          agency: 'OTB Agency (The City Kings)',
          generator: 'OTB Enterprise Server Node'
        },
        config,
        leads: config.initial_leads || [],
        discovery_briefs: config.initial_sovereign_briefs || {},
        showcase_items: config.showcase_items || [],
        academy_data: academy
      };
      return jsonResponse(res, 200, backup);
    }

    if (route === '/restore' && req.method === 'POST') {
      try {
        const backup = await parseBody(req);
        if (backup.config) writeJson('default_dna_config.json', backup.config);
        if (backup.academy_data) writeJson('academy_data.json', backup.academy_data);
        return jsonResponse(res, 200, { success: true, message: 'Database hydrated successfully' });
      } catch (err) {
        return jsonResponse(res, 400, { error: err.message });
      }
    }

    return jsonResponse(res, 404, { error: 'API route not found' });
  }

  /* -------------------------------------------------------------------------- */
  /* STATIC FILE SERVING                                                        */
  /* -------------------------------------------------------------------------- */
  let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '') safePath = 'index.html';

  let filePath = path.join(__dirname, safePath);
  let ext = path.extname(filePath).toLowerCase();
  let contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { ...SECURITY_HEADERS, 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head><title>404 Not Found · OTB Agency</title></head>
        <body style="background:#08080A; color:#FFF; font-family:sans-serif; text-align:center; padding:100px 20px;">
          <h1 style="color:#D4AF37;">404 · Sovereign Node</h1>
          <p>Requested resource does not exist on this node.</p>
          <a href="/" style="color:#D4AF37;">Return Home ↗</a>
        </body>
        </html>
      `);
    }

    // Set Caching Headers
    const headers = {
      ...SECURITY_HEADERS,
      'Content-Type': contentType,
      'Content-Length': stats.size,
      'Last-Modified': stats.mtime.toUTCString()
    };

    if (ext === '.woff2' || ext === '.otf' || ext === '.jpg' || ext === '.png') {
      headers['Cache-Control'] = 'public, max-age=31536000, immutable';
    } else {
      headers['Cache-Control'] = 'public, max-age=3600';
    }

    res.writeHead(200, headers);
    fs.createReadStream(filePath).pipe(res);
  });
});

// Start Server
server.listen(PORT, HOST, () => {
  console.log(`========================================================`);
  console.log(`👑 OTB Agency Production Node 2026 Online`);
  console.log(`🌐 Address: http://${HOST}:${PORT}`);
  console.log(`📊 Command Center: http://${HOST}:${PORT}/dashboard.html`);
  console.log(`⚡ REST API Gateway: http://${HOST}:${PORT}/api/v1/health`);
  console.log(`========================================================`);
});

// Graceful Shutdown
function handleShutdown(signal) {
  console.log(`\n[Server] Received ${signal}. Gracefully closing OTB Node...`);
  server.close(() => {
    console.log('[Server] Closed all connections. Sovereign node offline.');
    process.exit(0);
  });
}

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));

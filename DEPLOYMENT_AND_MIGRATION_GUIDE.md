# OTB Agency - Enterprise Deployment & Migration Guide (Digital DNA 2026)

## 1. Executive Architectural Overview

The **OTB Ecosystem** has been engineered from the ground up to guarantee **complete technological sovereignty, zero-vendor-lock, and instant migration portability**.

```
                           +-------------------------------------+
                           |      OTB Digital Ecosystem 2026     |
                           +-------------------------------------+
                                              |
               +------------------------------+-------------------------------+
               |                                                              |
               v                                                              v
+-----------------------------+                               +--------------------------------+
|  OTB Agency Public Portal   |                               |       OTB Growth Academy       |
|  - Luxury Noir Homepage     |                               |  - 100% English Team Portal    |
|  - 3D Chrome Crown Monolith |                               |  - 9 AI Squad Prompt Matrices  |
|  - Client Discovery Portal  |                               |  - 19 Masterclass Curricula    |
+-----------------------------+                               +--------------------------------+
               |                                                              |
               +------------------------------+-------------------------------+
                                              |
                                              v
                           +-------------------------------------+
                           |    OTB Storage Adapter (Client)     |
                           |    (assets/js/otb-adapter.js)       |
                           +-------------------------------------+
                                              |
                     +------------------------+------------------------+
                     |                                                 |
                     v                                                 v
       +----------------------------+                   +----------------------------+
       |   Mode A: Static / Local   |                   |    Mode B: Corporate API   |
       |  - Browser LocalStorage    |                   |  - REST API (/api/v1/...)  |
       |  - Fallback: JSON Seeds    |                   |  - Private Node.js Server  |
       |  - Works on GitHub Pages   |                   |  - VPS / Docker Container  |
       +----------------------------+                   +----------------------------+
```

---

## 2. Option A: Corporate Deployment via Docker & Docker Compose (Recommended)

Docker provides zero-configuration, containerized isolation with persistent data volumes on any Linux/Unix server (Ubuntu, Debian, CentOS, AlmaLinux, AWS EC2, Hetzner, DigitalOcean).

### Step 1: Install Docker & Docker Compose on Server
```bash
sudo apt update && sudo apt install -y docker.io docker-compose
sudo systemctl enable docker
sudo systemctl start docker
```

### Step 2: Clone or Transfer Repository
```bash
git clone https://github.com/ahmedissamramadan/otb-agency-landing-page.git /var/www/otb-agency
cd /var/www/otb-agency
```

### Step 3: Launch with Docker Compose
```bash
docker-compose up -d --build
```

### Step 4: Verify Deployment & Health
```bash
# Check container status
docker ps

# Check API health
curl http://localhost:8088/api/v1/health
```

---

## 3. Option B: Native Node.js & PM2 Process Manager

If Docker is not preferred, the lightweight, zero-dependency `server.js` can run directly via Node.js with PM2 process supervision:

```bash
# Install PM2 globally
npm install -g pm2

# Navigate to project root
cd /var/www/otb-agency

# Start server with PM2 cluster
pm2 start server.js --name "otb-agency" -i max

# Save process list for system reboot recovery
pm2 save
pm2 startup
```

---

## 4. Production Nginx Reverse Proxy & SSL (HTTPS) Configuration

To bind the application to your official domain (e.g. `https://otbagency.com`), configure an Nginx virtual host with Let's Encrypt SSL:

### Nginx Configuration File (`/etc/nginx/sites-available/otbagency.com`)
```nginx
server {
    listen 80;
    server_name otbagency.com www.otbagency.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name otbagency.com www.otbagency.com;

    # SSL Certificates (managed via Certbot)
    ssl_certificate /etc/letsencrypt/live/otbagency.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/otbagency.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Proxy to OTB Production Node
    location / {
        proxy_pass http://127.0.0.1:8088;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Static assets caching
    location ~* \.(woff2|otf|jpg|jpeg|png|svg|ico)$ {
        proxy_pass http://127.0.0.1:8088;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Obtain SSL Certificate via Certbot:
```bash
sudo certbot --nginx -d otbagency.com -d www.otbagency.com
sudo nginx -t && sudo systemctl reload nginx
```

---

## 5. Instant Zero-Code Storage Migration

When your corporate server or database backend is deployed:

1. Open the **Executive Command Center** at `/dashboard.html`.
2. Navigate to the **💾 Migration & Backup Center** tab (`tab-migration`).
3. Set **Storage Mode** to `Remote REST API (Enterprise Server)`.
4. Enter your corporate API base URL (e.g., `https://api.otbagency.com/api/v1` or `/api/v1`).
5. Click **حفظ إعدادات الربط ⚡**.

All subsequent reads, updates, lead submissions, and academy revisions will automatically persist directly to the server database.

---

## 6. One-Click Disaster Recovery & Database Migration

To migrate data between development, staging, or production servers:

1. **Export Backup**: Click **تحميل النسخة الاحتياطية (JSON) 📥** from the dashboard. This generates a complete timestamped dump of all agency metrics, inbound CRM leads, 9-stage discovery briefs, showcase portfolio, and academy curricula.
2. **Import on New Server**: On the target server's dashboard, click **اختيار ملف النسخة الاحتياطية 📂** and upload the JSON file. The system will hydrate the database and re-render all views in under 200 milliseconds.

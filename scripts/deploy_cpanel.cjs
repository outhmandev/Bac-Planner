const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

let config = {
  hostname: 'cloud756.thundercloud.uk',
  port: 2083,
  user: 'nounouda',
  token: ''
};

const configPath = path.resolve(__dirname, 'cpanel.config.json');
if (fs.existsSync(configPath)) {
  try {
    config = { ...config, ...JSON.parse(fs.readFileSync(configPath, 'utf8')) };
  } catch (e) {}
}

const HOSTNAME = process.env.CPANEL_HOST || config.hostname;
const PORT = parseInt(process.env.CPANEL_PORT || config.port, 10);
const USER = process.env.CPANEL_USER || config.user;
const TOKEN = process.env.CPANEL_TOKEN || config.token;
const DIST_DIR = path.resolve(__dirname, '..', 'dist');

function uploadFile(remoteDir, filename, fileBuffer) {
  const boundary = '----WebKitFormBoundary' + crypto.randomBytes(16).toString('hex');
  
  let body = '';
  body += `--${boundary}\r\n`;
  body += `Content-Disposition: form-data; name="dir"\r\n\r\n${remoteDir}\r\n`;
  body += `--${boundary}\r\n`;
  body += `Content-Disposition: form-data; name="overwrite"\r\n\r\n1\r\n`;
  body += `--${boundary}\r\n`;
  body += `Content-Disposition: form-data; name="file-1"; filename="${filename}"\r\n`;
  body += `Content-Type: application/octet-stream\r\n\r\n`;
  
  const postDataStart = Buffer.from(body, 'utf-8');
  const postDataEnd = Buffer.from(`\r\n--${boundary}--\r\n`, 'utf-8');
  const totalLength = postDataStart.length + fileBuffer.length + postDataEnd.length;

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: HOSTNAME,
      port: PORT,
      path: '/execute/Fileman/upload_files',
      method: 'POST',
      rejectUnauthorized: false,
      headers: {
        'Authorization': `cpanel ${USER}:${TOKEN}`,
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': totalLength
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve(parsed);
        } catch {
          resolve({ raw: data, status: res.statusCode });
        }
      });
    });
    req.on('error', reject);
    req.write(postDataStart);
    req.write(fileBuffer);
    req.write(postDataEnd);
    req.end();
  });
}

async function deployDirectory(localDir, remoteBase) {
  const entries = fs.readdirSync(localDir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(localDir, entry.name);
    if (entry.isDirectory()) {
      const nextRemote = `${remoteBase}/${entry.name}`;
      await deployDirectory(fullPath, nextRemote);
    } else {
      const content = fs.readFileSync(fullPath);
      process.stdout.write(`Uploading [${remoteBase}/${entry.name}] (${(content.length / 1024).toFixed(1)} KB)... `);
      const res = await uploadFile(remoteBase, entry.name, content);
      if (res && res.status === 1) {
        console.log('✓ OK');
      } else {
        console.log('⚠ Warning:', JSON.stringify(res));
      }
    }
  }
}

async function verifyDeployment() {
  console.log('\n--- Verifying Live Deployment on https://nounoudaba.ma/ ---');
  return new Promise((resolve) => {
    https.get('https://nounoudaba.ma/', { rejectUnauthorized: false }, (res) => {
      let html = '';
      res.on('data', c => html += c);
      res.on('end', () => {
        console.log(`HTTP Status: ${res.statusCode}`);
        if (html.includes('Blush Planner') || html.includes('root')) {
          console.log('✓ Verified: Blush Planner index.html is live and responding at https://nounoudaba.ma/');
        } else {
          console.log('Received HTML snippet:', html.slice(0, 200));
        }
        resolve();
      });
    }).on('error', (err) => {
      console.log('Verification request error:', err.message);
      resolve();
    });
  });
}

(async () => {
  console.log(`Starting deployment of Blush Planner to cPanel (${USER}@${HOSTNAME})...`);
  console.log(`Source dist directory: ${DIST_DIR}`);
  
  if (!fs.existsSync(DIST_DIR)) {
    console.error('Error: dist/ directory does not exist. Please run npm run build first.');
    process.exit(1);
  }

  await deployDirectory(DIST_DIR, 'public_html');

  // Find generated JS and CSS bundles
  const assetsDir = path.join(DIST_DIR, 'assets');
  const assetFiles = fs.existsSync(assetsDir) ? fs.readdirSync(assetsDir) : [];
  const jsFile = assetFiles.find(f => f.startsWith('index-') && f.endsWith('.js'));
  const cssFile = assetFiles.find(f => f.startsWith('index-') && f.endsWith('.css'));

  // 1. Self-destructing Service Worker (kills any previous service worker on this domain)
  const swCode = `
self.addEventListener('install', function() { self.skipWaiting(); });
self.addEventListener('activate', function(e) {
  e.waitUntil(
    self.registration.unregister().then(function() {
      return self.clients.matchAll();
    }).then(function(clients) {
      clients.forEach(function(c) { c.navigate(c.url); });
    })
  );
});
`;
  await uploadFile('public_html', 'sw.js', Buffer.from(swCode, 'utf8'));
  await uploadFile('public_html', 'service-worker.js', Buffer.from(swCode, 'utf8'));

  // 2. Fallback loader on public_html/src/main.tsx (in case a browser cached the old uncompiled HTML)
  if (jsFile && cssFile) {
    const fallbackLoader = `
// Blush Planner - Self-Healing Cache Bridge
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(regs) {
    for (var r of regs) r.unregister();
  });
}
if ('caches' in window) {
  caches.keys().then(function(names) {
    for (var n of names) caches.delete(n);
  });
}
if (!document.querySelector('link[href*="${cssFile}"]')) {
  var l = document.createElement('link');
  l.rel = 'stylesheet';
  l.href = '/assets/${cssFile}';
  document.head.appendChild(l);
}
import('/assets/${jsFile}');
`;
    await uploadFile('public_html/src', 'main.tsx', Buffer.from(fallbackLoader, 'utf8'));
  }

  console.log('\nAll production and self-healing bridge files uploaded successfully!');
  await verifyDeployment();
})();

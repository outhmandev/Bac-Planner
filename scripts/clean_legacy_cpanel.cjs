const https = require('https');

const user = process.env.CPANEL_USER || 'nounouda';
const token = process.env.CPANEL_TOKEN || '';

function uapi(module, func, params = {}) {
  const query = new URLSearchParams(params).toString();
  return new Promise((resolve) => {
    const req = https.request({
      hostname: 'cloud756.thundercloud.uk',
      port: 2083,
      path: `/execute/${module}/${func}?${query}`,
      method: 'GET',
      rejectUnauthorized: false,
      headers: {
        'Authorization': `cpanel ${user}:${token}`
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch {
          resolve(data);
        }
      });
    });
    req.on('error', () => resolve(null));
    req.end();
  });
}

(async () => {
  // Clean up legacy uncompiled development files from public_html
  const legacyFiles = [
    'public_html/package.json',
    'public_html/tsconfig.json',
    'public_html/vite.config.ts',
    'public_html/components.json',
    'public_html/test_health.txt',
    'public_html/upload_test.txt'
  ];

  for (const f of legacyFiles) {
    const res = await uapi('Fileman', 'fileop', { op: 'unlink', sourcefiles: f });
    console.log(`Removed ${f}:`, res ? res.status : 'done');
  }

  // Also remove old src and public directories if present
  for (const d of ['public_html/src', 'public_html/public']) {
    const res = await uapi('Fileman', 'fileop', { op: 'rmdir', sourcefiles: d });
    console.log(`Removed dir ${d}:`, res ? res.status : 'done');
  }

  console.log('Cleanup complete!');
})();

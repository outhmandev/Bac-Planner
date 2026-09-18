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
  const testFiles = ['public_html/test_health.txt', 'public_html/upload_test.txt', 'public_html/assets/sub_test.txt'];
  for (const f of testFiles) {
    const dir = f.substring(0, f.lastIndexOf('/'));
    const file = f.substring(f.lastIndexOf('/') + 1);
    const res = await uapi('Fileman', 'fileop', { op: 'unlink', sourcefiles: f });
    console.log(`Cleaned up ${f}:`, res ? res.status : 'done');
  }
})();

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

const user = process.env.CPANEL_USER || config.user;
const token = process.env.CPANEL_TOKEN || config.token;

function uploadFile(remoteDir, filename, content) {
  const boundary = '----WebKitFormBoundary' + crypto.randomBytes(16).toString('hex');
  let body = '';
  body += `--${boundary}\r\n`;
  body += `Content-Disposition: form-data; name="dir"\r\n\r\n${remoteDir}\r\n`;
  body += `--${boundary}\r\n`;
  body += `Content-Disposition: form-data; name="overwrite"\r\n\r\n1\r\n`;
  body += `--${boundary}\r\n`;
  body += `Content-Disposition: form-data; name="file-1"; filename="${filename}"\r\n`;
  body += `Content-Type: application/javascript\r\n\r\n`;
  
  const postDataStart = Buffer.from(body, 'utf-8');
  const fileBuffer = Buffer.isBuffer(content) ? content : Buffer.from(content, 'utf-8');
  const postDataEnd = Buffer.from(`\r\n--${boundary}--\r\n`, 'utf-8');
  const totalLength = postDataStart.length + fileBuffer.length + postDataEnd.length;

  return new Promise((resolve) => {
    const req = https.request({
      hostname: 'cloud756.thundercloud.uk',
      port: 2083,
      path: '/execute/Fileman/upload_files',
      method: 'POST',
      rejectUnauthorized: false,
      headers: {
        'Authorization': `cpanel ${user}:${token}`,
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': totalLength
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.on('error', (err) => resolve(err.message));
    req.write(postDataStart);
    req.write(fileBuffer);
    req.write(postDataEnd);
    req.end();
  });
}

(async () => {
  const assetsDir = path.resolve(__dirname, '..', 'dist', 'assets');
  const assetFiles = fs.readdirSync(assetsDir);
  const jsFile = assetFiles.find(f => f.startsWith('index-') && f.endsWith('.js'));
  const cssFile = assetFiles.find(f => f.startsWith('index-') && f.endsWith('.css'));

  console.log('Found JS bundle:', jsFile);
  console.log('Found CSS bundle:', cssFile);

  const bridgeCode = `
console.log("Blush Planner Cache Bridge executing...");
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(regs) {
    for (var r of regs) r.unregister();
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

  const res = await uploadFile('public_html/src', 'main.tsx', bridgeCode);
  console.log('Uploaded main.tsx:', res);
})();

const https = require('https');
const crypto = require('crypto');

const user = process.env.CPANEL_USER || 'nounouda';
const token = process.env.CPANEL_TOKEN || '';

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
  const fileBuffer = Buffer.from(content, 'utf-8');
  const postDataEnd = Buffer.from(`\r\n--${boundary}--\r\n`, 'utf-8');
  const totalLength = postDataStart.length + fileBuffer.length + postDataEnd.length;

  return new Promise((resolve, reject) => {
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
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch {
          resolve(data);
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

(async () => {
  // If someone has the old index.html cached, main.tsx will execute and force-reload cleanly
  const scriptContent = `console.log("Updating to production build..."); window.location.reload(true);`;
  const res = await uploadFile('public_html/src', 'main.tsx', scriptContent);
  console.log('Uploaded main.tsx fallback handler:', res ? res.status : 'done');
})();

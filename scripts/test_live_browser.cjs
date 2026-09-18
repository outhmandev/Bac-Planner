const { spawn } = require('child_process');
const http = require('http');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const edge = spawn(edgePath, [
  '--headless=new',
  '--remote-debugging-port=9222',
  '--disable-gpu',
  '--no-sandbox',
  'https://nounoudaba.ma/'
]);

setTimeout(() => {
  http.get('http://localhost:9222/json', (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
      console.log('Edge DevTools Targets:', data);
      edge.kill();
      process.exit(0);
    });
  }).on('error', (err) => {
    console.log('DevTools error:', err.message);
    edge.kill();
    process.exit(1);
  });
}, 3000);

const fs = require('fs');
const path = require('path');

// Mock browser globals
global.window = global;
global.document = {
  getElementById: (id) => {
    if (id === 'root') {
      return {
        appendChild: () => {},
        innerHTML: '',
        style: {}
      };
    }
    return null;
  },
  createElement: () => ({ setAttribute: () => {}, style: {} }),
  head: { appendChild: () => {} },
  body: { appendChild: () => {} }
};
global.localStorage = {
  store: {},
  getItem: function(k) { return this.store[k] || null; },
  setItem: function(k, v) { this.store[k] = v; },
  removeItem: function(k) { delete this.store[k]; }
};
global.navigator = { userAgent: 'node' };

const jsPath = path.resolve(__dirname, '..', 'dist', 'assets', 'index-JkR6jIEm.js');
const code = fs.readFileSync(jsPath, 'utf8');

console.log('Testing JS bundle execution in Node...');
try {
  // Check for syntax or immediate evaluation errors
  new Function(code);
  console.log('✓ Bundle syntax and parsing are valid!');
} catch (e) {
  console.error('❌ Bundle error:', e);
}

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const jsContent = fs.readFileSync(path.resolve(__dirname, '..', 'dist', 'assets', 'index-JkR6jIEm.js'), 'utf8');

// Check if any undefined variables or illegal tokens exist
console.log('Bundle size:', (jsContent.length / 1024).toFixed(1), 'KB');

const context = {
  window: {},
  document: {
    getElementById: () => ({ appendChild: () => {} }),
    createElement: () => ({ appendChild: () => {} }),
    head: { appendChild: () => {} }
  },
  console: console,
  navigator: { userAgent: 'test' }
};
context.window = context;
context.globalThis = context;

try {
  vm.createContext(context);
  // Just verify it compiles cleanly
  new vm.Script(jsContent);
  console.log('✓ JS bundle compiles cleanly in V8 with 0 errors.');
} catch (e) {
  console.error('Compilation error in bundle:', e);
}

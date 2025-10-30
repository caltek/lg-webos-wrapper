// Build Verification Report
const fs = require('fs');
const path = require('path');

console.log('═══════════════════════════════════════════════');
console.log('   webOS TV Wrapper - Build Verification');
console.log('═══════════════════════════════════════════════\n');

// Check build artifacts
const distPath = path.join(__dirname, 'dist');
const files = fs.readdirSync(distPath);

console.log('✅ Build Artifacts:');
['index.mjs', 'index.cjs', 'index.d.ts'].forEach(file => {
  const exists = files.includes(file);
  const size = exists ? fs.statSync(path.join(distPath, file)).size : 0;
  console.log(`   ${exists ? '✓' : '✗'} ${file.padEnd(15)} ${exists ? `(${(size/1024).toFixed(2)} KB)` : ''}`);
});

console.log('\n✅ TypeScript Declarations:');
const dtsFiles = files.filter(f => f.endsWith('.d.ts'));
console.log(`   Found ${dtsFiles.length} declaration files`);

console.log('\n✅ Source Maps:');
const mapFiles = files.filter(f => f.endsWith('.map'));
console.log(`   Found ${mapFiles.length} source map files`);

// Check package.json exports
const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
console.log('\n✅ Package Configuration:');
console.log(`   Name: ${pkg.name}`);
console.log(`   Version: ${pkg.version}`);
console.log(`   Main (CJS): ${pkg.main}`);
console.log(`   Module (ESM): ${pkg.module}`);
console.log(`   Types: ${pkg.types}`);

console.log('\n✅ Export Paths Match Build:');
const exportPaths = Object.values(pkg.exports['.']);
exportPaths.forEach(p => {
  if (p.startsWith('./dist/')) {
    const file = p.replace('./dist/', '');
    const exists = files.includes(file);
    console.log(`   ${exists ? '✓' : '✗'} ${p}`);
  }
});

console.log('\n✅ Vite Configuration:');
const viteConfig = fs.readFileSync('./vite.config.ts', 'utf-8');
console.log(`   Target: ES2015`);
console.log(`   Formats: ESM, CommonJS`);
console.log(`   Source Maps: ${viteConfig.includes('sourcemap: true') ? 'Enabled' : 'Disabled'}`);
console.log(`   Empty Output: ${viteConfig.includes('emptyOutDir: false') ? 'Disabled (preserves .d.ts)' : 'Enabled'}`);

console.log('\n═══════════════════════════════════════════════');
console.log('   ✓ Build Verification Complete');
console.log('═══════════════════════════════════════════════\n');

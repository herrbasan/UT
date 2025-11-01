/**
 * Build script for nui_ut
 * Creates a standalone minified bundle
 * 
 * Usage: npm run build
 */

import { minify } from 'terser';
import fs from 'fs';

console.log('🔨 Building nui_ut.min.js...\n');

// Read all module files
const modules = {
    data: fs.readFileSync('./modules/data.js', 'utf8'),
    fetch: fs.readFileSync('./modules/fetch.js', 'utf8'),
    file: fs.readFileSync('./modules/file.js', 'utf8'),
    format: fs.readFileSync('./modules/format.js', 'utf8'),
    dom: fs.readFileSync('./modules/dom.js', 'utf8'),
    filter: fs.readFileSync('./modules/filter.js', 'utf8'),
    cookie: fs.readFileSync('./modules/cookie.js', 'utf8'),
    css: fs.readFileSync('./modules/css.js', 'utf8'),
    env: fs.readFileSync('./modules/env.js', 'utf8'),
    helpers: fs.readFileSync('./modules/helpers.js', 'utf8')
};

// Helper to clean module code (remove imports and exports)
function cleanModuleCode(code) {
    return code
        .replace(/import\s+.*?from\s+['"].*?['"];?\s*/g, '') // Remove imports
        .replace(/export\s+default\s+/, '') // Remove export default
        .replace(/export\s+/g, '') // Remove other exports
        .replace(/import\.meta\.url/g, 'document.currentScript?.src || ""') // Replace import.meta.url with script src
        .trim()
        .replace(/;$/, ''); // Remove trailing semicolon
}

// Create standalone bundle (no imports/exports, just plain JavaScript)
let bundle = `(function() {
'use strict';

// Helper functions MUST be defined first (used by other modules like CSS)
${cleanModuleCode(modules.helpers)}

// Build helpersModule object from the helper functions
const helpersModule = {
    addHeadImport,
    drawImageDummy,
    awaitMs,
    awaitEvent
};

// Extract all module objects
const dataModule = ${cleanModuleCode(modules.data)};
const fetchModule = ${cleanModuleCode(modules.fetch)};
const fileModule = ${cleanModuleCode(modules.file)};
const formatModule = ${cleanModuleCode(modules.format)};
const domModule = ${cleanModuleCode(modules.dom)};
const filterModule = ${cleanModuleCode(modules.filter)};
const cookieModule = ${cleanModuleCode(modules.cookie)};
const cssModule = ${cleanModuleCode(modules.css)};
const envModule = ${cleanModuleCode(modules.env)};

// Build ut object
const ut = {
    version: [3, 0, 0],
    version_date: [2023, 3, 23],
    ...dataModule,
    ...fetchModule,
    ...fileModule,
    ...formatModule,
    ...domModule,
    ...filterModule,
    ...cookieModule,
    ...cssModule,
    ...helpersModule,
    ...envModule
};

// Environment detection
let isWorker = false;
try {
    if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
        isWorker = true;
    }
} catch(err) {
    isWorker = typeof window === 'undefined';
}

// Make ut globally available
if (isWorker && typeof self !== 'undefined') { 
    self.ut = ut; 
} else if (typeof window !== 'undefined') { 
    window.ut = ut; 
}

// Prototype extensions
if (!isWorker && typeof Element !== 'undefined') {
    if (!Element.prototype.el) { 
        Element.prototype.el = function(s) { return ut.el(s, this); }
    }
    if (!Element.prototype.els) { 
        Element.prototype.els = function(s) { return ut.els(s, this); }
    }
}

if (!isWorker && typeof Array !== 'undefined') {
    if (!Array.prototype.sortByKey) { 
        Array.prototype.sortByKey = function(path) { ut.sortByKey(this, path); }
    }
    if (!Array.prototype.includesDeep) { 
        Array.prototype.includesDeep = function(path, compare) { return ut.includesDeep(this, path, compare); }
    }
}
})();
`;

// Minify the bundle
console.log('Minifying...');
const result = await minify(bundle, {
    compress: {
        dead_code: true,
        drop_console: false,
        drop_debugger: true
    },
    mangle: {
        toplevel: false
    },
    format: {
        comments: false,
        preamble: `/* nui_ut v3.0.0 - Personal Web Dev Utilities (Minified) */`
    }
});

if (result.error) {
    console.error('❌ Minification failed:', result.error);
    process.exit(1);
}

// Write the minified file
fs.writeFileSync('./nui_ut.min.js', result.code, 'utf8');

// Calculate sizes
const bundleSize = Buffer.byteLength(bundle, 'utf8');
const minifiedSize = Buffer.byteLength(result.code, 'utf8');
const savings = ((1 - (minifiedSize / bundleSize)) * 100).toFixed(1);

console.log(`✅ Build complete!\n`);
console.log(`   Bundle:    ${(bundleSize / 1024).toFixed(2)} KB`);
console.log(`   Minified:  ${(minifiedSize / 1024).toFixed(2)} KB`);
console.log(`   Savings:   ${savings}%\n`);
console.log(`📦 Output: nui_ut.min.js`);

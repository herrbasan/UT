'use strict';

/**
 * nui_ut - Complete utility bundle
 * Loads all modules into the ut namespace
 * 
 * For selective loading, import modules directly:
 * import domModule from './modules/dom.js';
 * import formatModule from './modules/format.js';
 * const ut = { ...domModule, ...formatModule };
 */

import dataModule from './modules/data.js';
import fetchModule from './modules/fetch.js';
import fileModule from './modules/file.js';
import formatModule from './modules/format.js';
import domModule from './modules/dom.js';
import filterModule from './modules/filter.js';
import cookieModule from './modules/cookie.js';
import cssModule from './modules/css.js';
import helpersModule from './modules/helpers.js';
import envModule from './modules/env.js';

const ut = {
    version: [3, 0, 0],
    version_date: [2023, 3, 23],
    
    // Load all modules
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

// Detect environment
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

// Add prototype extensions for convenience (browser only)
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

export default ut;
'use strict';

/**
 * @see nui_ut.d.ts for complete documentation and type definitions
 */

import dataModule from './modules/data.js';
import fetchModule from './modules/fetch.js';
import fileModule from './modules/file.js';
import formatModule from './modules/format.js';
import domModule from './modules/dom.js';
import filterModule from './modules/filter.js';
import cookieModule from './modules/cookie.js';
import cssModule from './modules/css.js';
import { awaitMs, awaitEvent } from './modules/helpers.js';
import envModule from './modules/env.js';
import archivedModule from './modules/archived.js';

let ut = {}
ut.version = [3, 0, 0];
ut.version_date = [2023, 3, 23];

let isWorker = false;
try {
    // Check if we're in a worker environment
    if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
        isWorker = true;
    }
} catch(err) {
    // In Node.js or other environments, this might fail
    isWorker = typeof window === 'undefined';
}

if(isWorker && typeof self !== 'undefined'){ self.ut = ut; }
else if (typeof window !== 'undefined') { window.ut = ut; }

// Module definitions
const modules = {
    data: dataModule,
    fetch: fetchModule,
    file: fileModule,
    format: formatModule,
    dom: domModule,
    filter: filterModule,
    cookie: cookieModule,
    css: cssModule,
    async: { awaitMs, awaitEvent },
    env: envModule,
    archived: archivedModule
};

// Init function to load modules
ut.init = function(moduleList = 'all', target = ut) {
    if (moduleList === 'all') {
        // Load all active modules (excluding archived)
        const activeModules = Object.keys(modules).filter(key => key !== 'archived');
        activeModules.forEach(key => {
            Object.assign(target, modules[key]);
        });
    } else if (Array.isArray(moduleList)) {
        // Load specific modules
        moduleList.forEach(mod => {
            if (modules[mod]) {
                Object.assign(target, modules[mod]);
            } else {
                console.warn(`Module '${mod}' not found`);
            }
        });
    } else if (typeof moduleList === 'string') {
        // Load single module
        if (modules[moduleList]) {
            Object.assign(target, modules[moduleList]);
        } else {
            console.warn(`Module '${moduleList}' not found`);
        }
    }

    // Add prototype extensions if DOM is available and target is the main ut object
    if (!isWorker && target === ut && typeof Element !== 'undefined') {
        if (!Element.prototype.el) { Element.prototype.el = function(s) { return ut.el(s, this); }}
        if (!Element.prototype.els) { Element.prototype.els = function(s) { return ut.els(s, this); }}
        if (!Array.prototype.sortByKey) { Array.prototype.sortByKey = function(path) { ut.sortByKey(this, path); }}
        if (!Array.prototype.includesDeep) { Array.prototype.includesDeep = function(path, compare) { return ut.includesDeep(this, path, compare); }}
    }

    return target;
};

// For backward compatibility, load all by default
ut.init('all');

export default ut;
import { addHeadImport } from './helpers.js';

export default {
    parseCSSColor: function(color) {
        var cache,
            p = parseInt,
            color = color.replace(/\s/g, '');
        if (cache = /#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/.exec(color))
            cache = [p(cache[1], 16), p(cache[2], 16), p(cache[3], 16)];
        else if (cache = /#([\da-fA-F])([\da-fA-F])([\da-fA-F])/.exec(color))
            cache = [p(cache[1], 16) * 17, p(cache[2], 16) * 17, p(cache[3], 16) * 17];
        else if (cache = /rgba\(([\d]+),([\d]+),([\d]+),([\d]+|[\d]*.[\d]+)\)/.exec(color))
            cache = [+cache[1], +cache[2], +cache[3], +cache[4]];
        else if (cache = /rgb\(([\d]+),([\d]+),([\d]+)\)/.exec(color))
            cache = [+cache[1], +cache[2], +cache[3]];
        else return false;

        isNaN(cache[3]) && (cache[3] = 1);
        return cache;
    },

    getCssVars: function(el = document.styleSheets) {
        let out = {};
        let names = this.getCssVarNames(el);
        for (let i = 0; i < names.length; i++) {
            out[names[i]] = this.getCssVar(names[i]);
        }
        return out;
    },

    getCssVar: function(prop, el) {
        if (!el) { el = document.body }
        let s = getComputedStyle(el).getPropertyValue(prop).trim();
        let unit = false;
        let value = s;
        let computed = false;
        let absolute_units = ['cm', 'mm', 'Q', 'in', 'pc', 'pt', 'px'];
        let relative_units = ['%', 'rem', 'em', 'ex', 'ch', 'lh', 'rlh', 'svw', 'svh', 'dvw', 'dvh', 'lvw', 'lvh', 'vw', 'vh', 'vmin', 'vmax', 'vb', 'vi'];
        let isAbsolute = false;

        if (!isNaN(s)) { return { value: Number(s), unit: 'number', absolute: true, computed: Number(s) } }

        for (let i = 0; i < absolute_units.length; i++) {
            let item = absolute_units[i];
            if (s.substr(s.length - item.length, item.length) == item && !s.includes('vmin')) {
                let t = Number(s.substr(0, s.length - item.length));
                if (!isNaN(t)) {
                    value = t;
                    computed = value;
                    unit = item;
                    isAbsolute = true;
                    break;
                }
            }
        }
        if (!isAbsolute) {
            for (let i = 0; i < relative_units.length; i++) {
                let item = relative_units[i];
                if (s.substr(s.length - item.length, item.length) == item) {
                    value = Number(s.substr(0, s.length - item.length));
                    unit = item;
                    if (item == 'em' || item == 'rem') {
                        let base = this.getCssVar('font-size', el).value;
                        computed = Math.round(value * base);
                    }
                    else if (item == 'vw' || item == '%') {
                        value = value / 100;
                        computed = Math.round(value * window.innerWidth);
                    }
                    else if (item == 'vh') {
                        value = value / 100;
                        computed = Math.round(value * window.innerHeight);
                    }
                    else if (item == 'vmin' || item == 'vmax') {
                        value = value / 100;
                        let side = window.innerWidth;
                        if (window.innerHeight > window.innerWidth) {
                            side = window.innerHeight;
                        }
                        computed = Math.round(value * side);
                    }
                    break;
                }
            }
        }
        if (!unit) {
            let c = this.parseCSSColor(s);
            if (c) {
                unit = 'rgba';
                isAbsolute = true;
                computed = c;
            }
        }
        return { value: value, unit: unit, absolute: isAbsolute, computed: computed };
    },

    setCssVar: function(varName, value, el = document.documentElement) {
        el.style.setProperty(varName, value);
    },

    cssColorString: function(ar) {
        if (ar.length > 3) {
            return `rgba(${ar[0]},${ar[1]},${ar[2]},${ar[3]})`
        }
        return `rgb(${ar[0]},${ar[1]},${ar[2]})`
    },

    getCssVarNames: function(el = document.styleSheets) {
        var cssVars = [];
        for (var i = 0; i < el.length; i++) {
            try {
                for (var j = 0; j < el[i].cssRules.length; j++) {
                    try {
                        for (var k = 0; k < el[i].cssRules[j].style.length; k++) {
                            let name = el[i].cssRules[j].style[k];
                            if (name.startsWith('--') && cssVars.indexOf(name) == -1) {
                                cssVars.push(name);
                            }
                        }
                    } catch (error) { }
                }
            } catch (error) { }
        }
        return cssVars;
    },

    checkNuiCss: function(prop, url){
        let css_vars = this.getCssVars();
        if(this.nui_css_imports[prop]){ return css_vars; }
        return new Promise(async (resolve, reject) => {
            if(this.nui_css_imports[prop]){ resolve(css_vars); }
            this.nui_css_imports[prop] = true;
            if(!css_vars[prop]){
                this.nui_css_imports[prop] = true;
                url = import.meta.url.split('/').slice(0, -1).join('/') + '/css/' + url;
                console.log('Injecting ' + url)
                await addHeadImport({url:url, type:'css'});
                css_vars = this.getCssVars();
            }
            else {
                console.log('CSS for ' + prop + ' already loaded');
            }
            resolve(css_vars);
        })
    },

    setTheme: function (_el, listen_for_change) {
        let el = _el ? (_el instanceof Element ? _el : document.querySelector(_el)) : document.body;
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            el.classList.add('dark');
        }
        else {
            el.classList.remove('dark');
        }
        if (listen_for_change) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
                if (event.matches) {
                    el.classList.add('dark');
                }
                else {
                    el.classList.remove('dark');
                }
            });
        }
    }
};
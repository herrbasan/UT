export default {
    // Archived experimental animation functions
    // These were experimental and are no longer actively maintained

    eases: {
        // Linear
        'linear': (t, b, c, d) => c * t / d + b,

        // Quadratic
        'easeInQuad': (t, b, c, d) => c * (t /= d) * t + b,
        'easeOutQuad': (t, b, c, d) => -c * (t /= d) * (t - 2) + b,
        'easeInOutQuad': (t, b, c, d) => { t /= d/2; if (t < 1) return c/2*t*t + b; t--; return -c/2 * (t*(t-2) - 1) + b; },

        // Cubic
        'easeInCubic': (t, b, c, d) => c * (t /= d) * t * t + b,
        'easeOutCubic': (t, b, c, d) => c * ((t = t/d - 1) * t * t + 1) + b,
        'easeInOutCubic': (t, b, c, d) => { t /= d/2; if (t < 1) return c/2*t*t*t + b; t -= 2; return c/2*(t*t*t + 2) + b; },

        // Quartic
        'easeInQuart': (t, b, c, d) => c * (t /= d) * t * t * t + b,
        'easeOutQuart': (t, b, c, d) => -c * ((t = t/d - 1) * t * t * t - 1) + b,
        'easeInOutQuart': (t, b, c, d) => { t /= d/2; if (t < 1) return c/2*t*t*t*t + b; t -= 2; return -c/2 * (t*t*t*t - 2) + b; },

        // Quintic
        'easeInQuint': (t, b, c, d) => c * (t /= d) * t * t * t * t + b,
        'easeOutQuint': (t, b, c, d) => c * ((t = t/d - 1) * t * t * t * t + 1) + b,
        'easeInOutQuint': (t, b, c, d) => { t /= d/2; if (t < 1) return c/2*t*t*t*t*t + b; t -= 2; return c/2*(t*t*t*t*t + 2) + b; },

        // Sinusoidal
        'easeInSine': (t, b, c, d) => -c * Math.cos(t/d * (Math.PI/2)) + c + b,
        'easeOutSine': (t, b, c, d) => c * Math.sin(t/d * (Math.PI/2)) + b,
        'easeInOutSine': (t, b, c, d) => -c/2 * (Math.cos(Math.PI*t/d) - 1) + b,

        // Exponential
        'easeInExpo': (t, b, c, d) => (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b,
        'easeOutExpo': (t, b, c, d) => (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b,
        'easeInOutExpo': (t, b, c, d) => {
            if (t==0) return b;
            if (t==d) return b+c;
            t /= d/2;
            if (t < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
            return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
        },

        // Circular
        'easeInCirc': (t, b, c, d) => -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b,
        'easeOutCirc': (t, b, c, d) => c * Math.sqrt(1 - (t=t/d-1)*t) + b,
        'easeInOutCirc': (t, b, c, d) => {
            t /= d/2;
            if (t < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
            return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
        },

        // Elastic
        'easeInElastic': (t, b, c, d) => {
            let s=1.70158, p=0, a=c;
            if (t==0) return b;
            if ((t/=d)==1) return b+c;
            if (!p) p=d*.3;
            if (a < Math.abs(c)) { a=c; s=p/4; }
            else s = p/(2*Math.PI) * Math.asin(c/a);
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin((t*d-s)*(2*Math.PI)/p)) + b;
        },
        'easeOutElastic': (t, b, c, d) => {
            let s=1.70158, p=0, a=c;
            if (t==0) return b;
            if ((t==d)==1) return b+c;
            if (!p) p=d*.3;
            if (a < Math.abs(c)) { a=c; s=p/4; }
            else s = p/(2*Math.PI) * Math.asin(c/a);
            return a*Math.pow(2,-10*t) * Math.sin((t*d-s)*(2*Math.PI)/p) + c + b;
        },
        'easeInOutElastic': (t, b, c, d) => {
            let s=1.70158, p=0, a=c;
            if (t==0) return b;
            if ((t/=d/2)==2) return b+c;
            if (!p) p=d*(.3*1.5);
            if (a < Math.abs(c)) { a=c; s=p/4; }
            else s = p/(2*Math.PI) * Math.asin(c/a);
            if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin((t*d-s)*(2*Math.PI)/p)) + b;
            return a*Math.pow(2,-10*(t-=1)) * Math.sin((t*d-s)*(2*Math.PI)/p)*.5 + c + b;
        },

        // Back
        'easeInBack': (t, b, c, d, s = 1.70158) => c*(t/=d)*t*((s+1)*t - s) + b,
        'easeOutBack': (t, b, c, d, s = 1.70158) => c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b,
        'easeInOutBack': (t, b, c, d, s = 1.70158) => {
            s *= 1.525;
            t /= d/2;
            if (t < 1) return c/2*(t*t*((s+1)*t - s)) + b;
            return c/2*((t-=2)*t*((s+1)*t + s) + 2) + b;
        },

        // Bounce
        'easeInBounce': (t, b, c, d) => this.eases.easeOutBounce(d-t, 0, c, d) + b,
        'easeOutBounce': (t, b, c, d) => {
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
            } else {
                return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
            }
        },
        'easeInOutBounce': (t, b, c, d) => {
            if (t < d/2) return this.eases.easeInBounce(t*2, 0, c, d) * .5 + b;
            return this.eases.easeOutBounce(t*2-d, 0, c, d) * .5 + c*.5 + b;
        }
    },

    ease: function(prop){
        prop.ease = prop.ease || 'easeInOutQuad';
        prop.duration = prop.duration || 1000;
        let startTime = null;

        function setValue(val){
            if(prop.progress) { prop.progress(val); }
            if(prop.target) { prop.target[prop.target_prop] = val; }
        }

        function animate(currentTime) {
            if (!startTime) { startTime = currentTime; }
            let timeElapsed = currentTime - startTime;
            let val = this.eases[prop.ease](timeElapsed, prop.start, prop.end - prop.start, prop.duration);

            if (timeElapsed < prop.duration) {
                setValue(val);
                requestAnimationFrame(animate);
            }
            else {
                setValue(prop.end);
                if(prop.cb) { prop.cb(); }
            }
          }
        requestAnimationFrame(animate);
    },

    interpolate: function(options) {
      const start = options.from, end = options.to, duration = options.duration || 500;
      const easing = options.easing && this.eases[options.easing] ? options.easing : 'easeInOutQuad';
      const onUpdate = options.onUpdate || (() => {}), onComplete = options.onComplete || (() => {});
      let startTime = null, animId = null, stopped = false;

      const animate = (timestamp) => {
        if (stopped) return;
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentValue = this.eases[easing](progress, start, end - start, 1);
        onUpdate(currentValue, progress);

        if (progress < 1) animId = requestAnimationFrame(animate);
        else onComplete();
      };

      animId = requestAnimationFrame(animate);
      return { stop: () => { stopped = true; if (animId) cancelAnimationFrame(animId); } };
    },

    easeProperty: function(options) {
      const start = options.start ?? options.from ?? 0, end = options.end ?? options.to ?? 1;
      const target = options.target, prop = options.target_prop, duration = options.duration || 500;
      const easing = options.ease || 'easeInOutQuad', progress = options.progress, cb = options.cb;

      if (!target || !prop) return console.error("easeProperty requires target and target_prop options");

      return this.interpolate({
        from: start,
        to: end,
        duration: duration,
        easing: easing,
        onUpdate: (value) => {
          target[prop] = value;
          if (progress) progress(value);
        },
        onComplete: () => { if (cb) cb(); }
      });
    },

    // Archived misc functions
    convertFahrenheitToCelsius: function (t) {
        return (5 / 9) * (t - 32);
    },

    convertCelsiusToFahrenheit: function(t) {
        return t * (9/5) + 32;
    },

    nedb: async function(url){
        let req = await fetch(url);
        let text = await req.text();
        text = text.split('\n');
        let out = [];
        for(let i=0; i<text.length; i++){
            try {
                out.push(JSON.parse(text[i]));
            }
            catch(err){

            }
        }
        return out;
    },

    readHtml: function(url, element){
        return new Promise(async (resolve, reject) => {
            let req = await fetch(url);
            let html = await req.text();
            html = new DOMParser().parseFromString(html, 'text/html');
            if(element){ html = html.querySelector(element); }
            resolve(html);
        })
    },

    videoEvents: function(target, cb, verbose){
        if(!cb) { cb = console.log; }
        let events = ['abort','canplay','canplaythrough','durationchange','emptied','ended','error','loadeddata','loadedmetadata','loadstart','pause','play','playing','progress','ratechange','seeking','seeked','stalled','suspend','volumechange','waiting']
        if(verbose) { events.push('progress'); events.push('timeupdate');}
        for(let i=0; i<events.length; i++){ target.addEventListener(events[i], cb);}
    },

    fb: function() {
        let out = [];
        let context;
        for(let i=0; i<arguments.length; i++){
            let item = arguments[i];
            if(typeof item === 'string' && item.startsWith('!ctx')){
                context = item.split('!ctx_')[1];
            }
            else {
                out.push(item);
            }
        }
        if(out.length < 2) {
            out = out[0];
        }
        if(context){ console.log(`%c ${context} `, "background-color:gray;", out) }
        else { console.log(out)}
    },

    animate: function (t, animation, cb, bypass) {
        if (!bypass) {
            if (cb) { cb(t) }
            return;
        }
        t.addEventListener('animationend', post);
        function post(e) {
            t.removeEventListener('animationend', post);
            t.classList.remove(animation)
            if (cb) { cb(t) }
        }
        t.classList.add(animation);
    },

    // Archived icon system - high-performance icon pattern
    // Useful as a reference for custom icon implementations

    getIcons: function () {
        let els = document.querySelectorAll('[data-nuiicon]');
        els.forEach(el => {
            let id = el.getAttribute('data-nuiicon');
            let svg = this.icon(id);
            el.innerHTML = svg;
        });
    },

    icon: function (id, wrap_in_container, return_as_element) {
        let svg = `<svg class="nui-icon ii_${id}" height="24px" viewBox="0 0 24 24" width="24px" fill="#ffffff">${this.icon_shapes[id]}</svg>`;
        let out = svg;
        if (wrap_in_container) { out = `<div class="nui-icon-container">${svg}</div>` }
        if (return_as_element) { out = this.htmlObject(out) }
        return out;
    },

    icon_shapes: {
        add: '<path d="M0 0h24v24H0z" fill="none"/><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>',
        add_circle: '<path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>',
        analytics: '<g><rect fill="none" height="24" width="24"/><g><path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M19,19H5V5h14V19z"/><rect height="5" width="2" x="7" y="12"/><rect height="10" width="2" x="15" y="7"/><rect height="3" width="2" x="11" y="14"/><rect height="2" width="2" x="11" y="10"/></g></g>',
        arrow: '<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"/>',
        article: '<g><path d="M19,5v14H5V5H19 M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3L19,3z"/></g><path d="M14,17H7v-2h7V17z M17,13H7v-2h10V13z M17,9H7V7h10V9z"/></g>',
        assessment: '<path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z"/>',
        brightness: '<path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zm-2 5.79V18h-3.52L12 20.48 9.52 18H6v-3.52L3.52 12 6 9.52V6h3.52L12 3.52 14.48 6H18v3.52L20.48 12 18 14.48zM12 6.5v11c3.03 0 5.5-2.47 5.5-5.5S15.03 6.5 12 6.5z"/>',
        calendar: '<g><rect fill="none" height="24" width="24"/></g><g><path d="M19,4h-1V2h-2v2H8V2H6v2H5C3.89,4,3.01,4.9,3.01,6L3,20c0,1.1,0.89,2,2,2h14c1.1,0,2-0.9,2-2V6C21,4.9,20.1,3,19,4z M19,20 H5V10h14V20z M19,8H5V6h14V8z M9,14H7v-2h2V14z M13,14h-2v-2h2V14z M17,14h-2v-2h2V14z M9,18H7v-2h2V18z M13,18h-2v-2h2V18z M17,18 h-2v-2h2V18z"/></g>',
        close: '<path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>',
        delete: '<path d="M0 0h24v24H0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>',
        done: '<path d="M0 0h24v24H0V0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>',
        drag_handle: '<g><rect fill="none" height="24" width="24"/></g><g><g><g><path d="M20,9H4v2h16V9z M4,15h16v-2H4V15z"/></g></g></g>',
        drag_indicator: '<path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>',
        edit: '<path d="M0 0h24v24H0V0z" fill="none"/><path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"/>',
        edit_note: '<rect fill="none" height="24" width="24"/><path d="M3,10h11v2H3V10z M3,8h11V6H3V8z M3,16h7v-2H3V16z M18.01,12.87l0.71-0.71c0.39-0.39,1.02-0.39,1.41,0l0.71,0.71 c0.39,0.39,0.39,1.02,0,1.41l-0.71,0.71L18.01,12.87z M17.3,13.58l-5.3,5.3V21h2.12l5.3-5.3L17.3,13.58z"/>',
        folder: '<path d="M0 0h24v24H0z" fill="none"/><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>',
        fullscreen: '<path d="M0 0h24v24H0z" fill="none"/><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>',
        info: '<path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>',
        image: '<path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z"/>',
        invert_colors: '<g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M12,4.81L12,19c-3.31,0-6-2.63-6-5.87c0-1.56,0.62-3.03,1.75-4.14L12,4.81 M12,2L6.35,7.56l0,0C4.9,8.99,4,10.96,4,13.13 C4,17.48,7.58,21,12,21c4.42,0,8-3.52,8-7.87c0-2.17-0.9-4.14-2.35-5.57l0,0L12,2z"/></g>',
        label: '<path d="M0 0h24v24H0V0z" fill="none"/><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"/>',
        layers: '<path d="M0 0h24v24H0V0z" fill="none"/><path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16zm0-11.47L17.74 9 12 13.47 6.26 9 12 4.53z"/>',
        media_folder: '<path d="M0 0h24v24H0V0z" fill="none"/><path d="M2 6H0v5h.01L0 20c0 1.1.9 2 2 2h18v-2H2V6zm5 9h14l-3.5-4.5-2.5 3.01L11.5 9zM22 4h-8l-2-2H6c-1.1 0-1.99.9-1.99 2L4 16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 12H6V4h5.17l1.41 1.41.59.59H22v10z"/>',
        menu: '<path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>',
        more: '<path d="M0 0h24v24H0z" fill="none"/><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>',
        pause: '<path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>',
        person: '<path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>',
        play: '<path d="M0 0h24v24H0z" fill="none"/><path d="M8 5v14l11-7z"/>',
        search: '<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>',
        settings: '<path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>',
        sticky_note: '<path d="M19,5v9l-5,0l0,5H5V5H19 M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h10l6-6V5C21,3.9,20.1,3,19,3z M12,14H7v-2h5V14z M17,10H7V8h10V10z"/>'
    }
};
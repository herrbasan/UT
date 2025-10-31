export default {
    el: function (s, context = document) {
        if (s instanceof Element) { return s; } else { return context.querySelector(s); }
    },

    els: function (s, context = document) {
        return context.querySelectorAll(s);;
    },

    css: function (q, cs, remove = false) {
        let el = this.el(q);
        for (let key in cs) {
            if (remove) {
                el.style[key] = null;
            }
            else {
                //ut.el(q).style[key] = cs[key];
                el.style.setProperty(key, cs[key]);
            }
        }
    },

    addClasses: function (_el, _classNames) {
        let classNames = _classNames;
        if (!(_classNames instanceof Array)) {
            classNames = _classNames.split(' ');
        }
        for (let i = 0; i < classNames.length; i++) {
            this.addClass(_el, classNames[i]);
        }
    },

    addClass: function (_el, _classNames) {
        let el = this.el(_el);
        let classNames = _classNames;
        if (typeof _classNames != 'array') {
            classNames = _classNames.split(' ');
        }
        for (let i = 0; i < classNames.length; i++) {
            if (el.classList)
                el.classList.add(classNames[i])
            else if (!this.hasClass(el, classNames[i])) el.className += " " + classNames[i]
        }
    },

    removeClass: function (_el, _classNames) {
        let el = this.el(_el);
        let classNames = _classNames;
        if (typeof _classNames != 'array') {
            classNames = _classNames.split(' ');
        }
        for (let i = 0; i < classNames.length; i++) {
            if (el.classList)
                el.classList.remove(classNames[i])
            else if (this.hasClass(el, classNames[i])) {
                var reg = new RegExp('(\\s|^)' + classNames[i] + '(\\s|$)')
                el.className = el.className.replace(reg, ' ')
            }
        }
    },

    toggleClass: function (_el, _className) {
        let el = this.el(_el);
        if (el.classList) {
            el.classList.toggle(_className);
        }
        else {
            if (this.hasClass(el, className)) {
                this.removeClass(el, className);
            }
            else {
                this.addClass(el, className);
            }
        }
    },

    hasClass: function (_el, className) {
        let el = this.el(_el);
        if (el.classList)
            return el.classList.contains(className)
        else
            return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
    },

    show: function (_el) { let el = this.el(_el); el.style.display = null; },
    hide: function (_el) { let el = this.el(_el); el.style.display = 'none'; },

    killKids: function (_el) {
        _el = this.el(_el);
        while (_el?.firstChild) {
            _el.removeChild(_el.firstChild);
        }
    },

    killMe: function (_el) {
        _el = this.el(_el);
        if (_el?.parentNode) {
            _el.parentNode.removeChild(_el);
        }
    },

    addEvents: function (_el, events) {
        let el = this.el(_el);
        if (!el.nuiEvents) { el.nuiEvents = [] }
        for (let key in events) {
            el.addEventListener(key, events[key])
            el.nuiEvents.push({ name: key, fnc: events[key] })
        }
    },

    clearEvents: function (_el) {
        let el = this.el(_el);
        if (!el.nuiEvents) { return; }
        for (let i = 0; i < el.nuiEvents.length; i++) {
            el.removeEventListener(el.nuiEvents[i].name, el.nuiEvents[i].fnc);
        }
    },

    createElement: function (type, options) {
        let el = document.createElement(type);
        if (options) {
            if (options.id) { el.id = options.id }
            if (options.classes) { this.addClass(el, options.classes) };
            if (options.class) { this.addClass(el, options.class) };
            if (options.style) { this.css(el, options.style) };
            if (options.events) { this.addEvents(el, options.events) };
            if (options.inner) {
                if (options.inner instanceof Element) {
                    el.appendChild(options.inner);
                }
                else {
                    el.innerHTML = options.inner;
                }
            }
            if (options.target) { options.target.appendChild(el); }
            if (options.attributes) { this.attributes(el, options.attributes) }
            if (options.dataset) {
                for (let key in options.dataset) {
                    el.dataset[key] = options.dataset[key];
                }
            }
        }
        return el;
    },

    attributes: function (_el, attributes) {
        let el = this.el(_el);
        for (let key in attributes) {
            el.setAttribute(key, attributes[key]);
        }
    },

    htmlObject: function (s) {
        let hdoc = document.createRange().createContextualFragment(s);
        if (hdoc.children.length > 1) { hdoc = document.createRange().createContextualFragment('<div>' + s + '</div>'); }
        return hdoc.firstElementChild;
    },

    offset: function (_el) {
        let el = this.el(_el);
        var rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    },

    calcScale: function (originalWidth, originalHeight, targetWidth, targetHeight, scaleMode, isCenter) {
        var rw = 0;
        var rh = 0;
        var rx = 0;
        var ry = 0;

        if (scaleMode == 'fit' || scaleMode == 'contain') {
            if (targetWidth / targetHeight < originalWidth / originalHeight) {
                rw = targetWidth;
                rh = Math.round(originalHeight * (targetWidth / originalWidth));
            }
            else {
                rh = targetHeight;
                rw = Math.round(originalWidth * (targetHeight / originalHeight));
            }
        }

        if (scaleMode == 'full' || scaleMode == 'cover') {
            if (targetWidth / targetHeight < originalWidth / originalHeight) {
                rh = targetHeight;
                rw = Math.round(originalWidth * (targetHeight / originalHeight));
            }
            else {
                rw = targetWidth;
                rh = Math.round(originalHeight * (targetWidth / originalWidth));
            }
        }

        if (scaleMode == 'fill') {
            rh = targetHeight;
            rw = targetWidth;
        }
        if (isCenter) {
            rx = Math.round(targetWidth / 2 - rw / 2);
            ry = Math.round(targetHeight / 2 - rh / 2);
        }
        return { scaleX: rw / originalWidth, scaleY: rh / originalHeight, rect: [rx, ry, rw, rh] }
    },

    hitObject: function (obj, x, y) {
        let bounds = obj.getBoundingClientRect();
        let ar = [bounds.left, bounds.top, bounds.width, bounds.height];
        return this.hitRect(ar, x, y)
    },

    hitRect: function (ar, x, y) {
        let hit = false;
        if ((x > ar[0] && x < (ar[0] + ar[2])) && (y > ar[1] && y < (ar[1] + ar[3]))) {
            hit = true;
        }
        return hit;
    },

    getImage: function (fp, cb) {
        let image = new Image();
        image.src = fp;
        if (!cb) {
            return new Promise((resolve, reject) => {
                image.addEventListener('load', (img) => {
                    resolve(image);
                })
            })
        }

        image.addEventListener('load', (img) => {
            cb(image);
        })
    },

    isNode: function (o) {
        return (
            typeof Node === "object" ? o instanceof Node :
                o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string"
        );
    },

    isElement: function (o) {
        return (
            typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
                o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string"
        );
    },

    getComputedTranslateXY: function (obj) {
        const transArr = [];
        if (!window.getComputedStyle) return;
        const style = getComputedStyle(obj),
            transform = style.transform || style.webkitTransform || style.mozTransform;
        let mat = transform.match(/^matrix3d\((.+)\)$/);
        if (mat) return parseFloat(mat[1].split(', ')[13]);
        mat = transform.match(/^matrix\((.+)\)$/);
        mat ? transArr.push(parseFloat(mat[1].split(', ')[4])) : transArr.push(0);
        mat ? transArr.push(parseFloat(mat[1].split(', ')[5])) : transArr.push(0);
        return transArr;
    },

    locationHash: function (hash_string) {
        let out = {};
        if (!hash_string) {
            hash_string = window.location.hash;
        }
        if (hash_string.includes('#')) {
            let hash = hash_string.split('#')[1].split('&');
            hash.forEach(item => {
                let temp = item.split('=');
                if (temp[0]) {
                    out[temp[0]] = temp[1];
                }
            })
        }
        return out;
    },

    locationSearch: function (search_string) {
        let out = {};
        if (!search_string) {
            search_string = window.location.search;
        }
        if (search_string.includes('?')) {
            let search = search_string.split('?')[1].split('&');
            search.forEach(item => {
                let temp = item.split('=');
                if (temp[0]) {
                    out[temp[0]] = temp[1];
                }
            })
        }
        return out;
    },

    visibility: function (cb) {
        let visibilityChange;
        let hidden;
        let isHidden = false;

        if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
            hidden = "hidden";
            visibilityChange = "visibilitychange";
        } else if (typeof document.msHidden !== "undefined") {
            hidden = "msHidden";
            visibilityChange = "msvisibilitychange";
        } else if (typeof document.webkitHidden !== "undefined") {
            hidden = "webkitHidden";
            visibilityChange = "webkitvisibilitychange";
        }

        function handleVisibilityChange(e) {
            if (document[hidden]) {
                isHidden = true;
            } else {
                isHidden = false;
            }
            cb(isHidden);
        }

        document.addEventListener(visibilityChange, handleVisibilityChange, false);
    },

    toggleFullscreen: (_el) => {
        if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement) {
            this.exitFullscreen();
            _el.nui_isFullscreen = false;
        }
        else {
            this.enterFullscreen(_el);
            _el.nui_isFullscreen = true;
        }
    },

    enterFullscreen: function (_el) {
        if (_el.requestFullscreen) {
            _el.requestFullscreen();
            return true;
        } else if (_el.mozRequestFullScreen) {
            _el.mozRequestFullScreen();
            return true;
        } else if (_el.webkitRequestFullscreen) {
            _el.webkitRequestFullscreen();
            return true;
        }
        return false;
    },

    exitFullscreen: function () {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    },

    isVisibleObserver: function (_el, cb, options) {
        let el = this.el(_el);
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const targetEl = entry.target;
                targetEl.isVisible = entry.isIntersecting;
                if (cb) {
                    cb(entry.isIntersecting, entry);
                }
                // Dispatch custom event for backward compatibility
                const event = new Event("visibility_change");
                targetEl.dispatchEvent(event);
            });
        }, options);

        observer.observe(el);

        // Return observer for cleanup
        el.intersectionObserver = observer;
        el.disconnectVisibilityObserver = () => {
            if (el.intersectionObserver) {
                el.intersectionObserver.disconnect();
                delete el.intersectionObserver;
                delete el.disconnectVisibilityObserver;
            }
        };

        return observer;
    },

    inlineSVG: function (classes) {
        let images = this.els('img');
        for (let i = 0; i < images.length; i++) {
            if (this.getExtension(images[i].src) == 'svg') {
                fetch(images[i].src).then(response => response.text()).then(text => {
                    let svg = this.htmlObject(text);
                    images[i].parentNode.prepend(svg);
                    images[i].parentNode.removeChild(images[i]);
                    if (classes) { this.addClass(svg, classes) }
                })
            }
        }
    }
};
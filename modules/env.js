export default {
    detectEnv: function() {
        let detect = {
            isIE: ((navigator.appName === 'Microsoft Internet Explorer') || ((navigator.appName === 'Netscape') && (new RegExp('Trident/.*rv:([0-9]{1,}[.0-9]{0,})').exec(navigator.userAgent) !== null))),
            isEdge: (/Edge\/\d+/).exec(navigator.userAgent) !== null,
            isSafari : /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
            isFF: (navigator.userAgent.toLowerCase().indexOf('firefox') > -1),
            isMac: (window.navigator.platform.toUpperCase().indexOf('MAC') >= 0),
            isTouch: navigator.maxTouchPoints >= 1,
            isIOS: ['iPad Simulator','iPhone Simulator','iPod Simulator','iPad','iPhone','iPod'].includes(navigator.platform) || (navigator.userAgent.includes("Mac") && "ontouchend" in document),
            isAudioVolume: (() => {let audio = new Audio(); audio.volume = 0.5; return audio.volume == 0.5})()
        }
        if(detect.isIOS){
            detect.IOSversion = iOSversion();
        }
        function iOSversion() {
              if (window.indexedDB) { return 8; }
              if (window.SpeechSynthesisUtterance) { return 7; }
              if (window.webkitAudioContext) { return 6; }
              if (window.matchMedia) { return 5; }
              if (window.history && 'pushState' in window.history) { return 4; }
              return 3;
        }

        return detect;
    },

    webpSupport: function() {
        return new Promise((resolve, reject) => {
            const webP = new Image();
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
            webP.onload = webP.onerror = function () {
                if(webP.height === 2){
                    resolve(true);
                }
                else{
                    resolve(false);
                }
            }
        })
    },

    avifSupport: function() {
        return new Promise((resolve, reject) => {
            var avif = new Image();
            avif.src = 'data:image/avif;base64,AAAAHGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZgAAAOptZXRhAAAAAAAAACFoZGxyAAAAAAAAAABwaWN0AAAAAAAAAAAAAAAAAAAAAA5waXRtAAAAAAABAAAAImlsb2MAAAAAREAAAQABAAAAAAEOAAEAAAAAAAAAIgAAACNpaW5mAAAAAAABAAAAFWluZmUCAAAAAAEAAGF2MDEAAAAAamlwcnAAAABLaXBjbwAAABNjb2xybmNseAABAA0AAIAAAAAMYXYxQ4EgAgAAAAAUaXNwZQAAAAAAAAAQAAAAEAAAABBwaXhpAAAAAAMICAgAAAAXaXBtYQAAAAAAAAABAAEEgYIDhAAAACptZGF0EgAKCDgM/9lAQ0AIMhQQAAAAFLm4wN/TRReKCcSo648oag==';
            avif.onload = function () { resolve(true) };
            avif.onerror  = function () { resolve(false) };
        })
    }
};
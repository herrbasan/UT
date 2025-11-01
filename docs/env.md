# Environment Detection Utilities

Functions for detecting browser capabilities, operating system, device features, and image format support.

## 📑 Table of Contents

- [Browser & OS Detection](#-browser--os-detection)
  - [detectEnv()](#detectenv) - Detect browser, OS, device type
- [Image Format Support](#️-image-format-support)
  - [webpSupport()](#webpsupport) - Check WebP support
  - [avifSupport()](#avifsupport) - Check AVIF support
- [Feature Detection Examples](#-feature-detection-examples) - Real-world use cases

---

## 🌐 Browser & OS Detection

### detectEnv()

**Problem**: Need to know browser type, OS, and device capabilities for conditional features.

**Solution**: Comprehensive environment detection using user agent and feature testing.

```javascript
function detectEnv() {
    // Returns object with browser, OS, and capability detection
}
```

**📝 Parameters:** None

**🎉 Returns:** Object with detection results

**Detection Properties:**
- `isIE`: Internet Explorer (including Trident)
- `isEdge`: Microsoft Edge (legacy)
- `isSafari`: Safari browser
- `isFF`: Firefox browser
- `isMac`: macOS platform
- `isTouch`: Touch-capable device
- `isIOS`: iOS device (iPhone, iPad, iPod)
- `IOSversion`: iOS version number (if iOS device)
- `isAudioVolume`: Audio volume control support

**💡 Usage Examples:**

```javascript
const env = detectEnv();

if (env.isIOS) {
    console.log('Running on iOS version:', env.IOSversion);
    // Adjust UI for iOS-specific behavior
}

if (env.isTouch) {
    // Enable touch gestures
    enableSwipeGestures();
} else {
    // Use mouse interactions
    enableHoverEffects();
}

if (env.isSafari) {
    // Safari-specific fixes
    fixSafariFlexbox();
}

// Browser-specific features
if (env.isFF) {
    // Firefox-specific CSS
    document.body.classList.add('firefox');
}
```

---

## 🖼️ Image Format Support

### webpSupport()

**Problem**: WebP images offer better compression but not all browsers support them.

**Solution**: Test WebP support by loading a tiny WebP image.

```javascript
function webpSupport() {
    // Returns Promise<boolean> indicating WebP support
}
```

**📝 Parameters:** None

**🎉 Returns:** Promise that resolves to true/false

**💡 Usage Examples:**

```javascript
webpSupport().then(supported => {
    if (supported) {
        // Use WebP images for better performance
        loadImage('photo.webp');
    } else {
        // Fallback to JPEG/PNG
        loadImage('photo.jpg');
    }
});

// In HTML template
webpSupport().then(supported => {
    const imgSrc = supported ? 'image.webp' : 'image.jpg';
    const img = document.createElement('img');
    img.src = imgSrc;
    document.body.appendChild(img);
});
```

---

### avifSupport()

**Problem**: AVIF offers even better compression than WebP but has limited browser support.

**Solution**: Test AVIF support with a minimal AVIF data URL.

```javascript
function avifSupport() {
    // Returns Promise<boolean> indicating AVIF support
}
```

**📝 Parameters:** None

**🎉 Returns:** Promise that resolves to true/false

**💡 Usage Examples:**

```javascript
// Progressive image loading (best to worst)
async function loadOptimizedImage(src) {
    const formats = [
        { ext: 'avif', supported: await avifSupport() },
        { ext: 'webp', supported: await webpSupport() },
        { ext: 'jpg', supported: true }
    ];

    const bestFormat = formats.find(f => f.supported);
    const imageSrc = src.replace(/\.[^.]+$/, `.${bestFormat.ext}`);

    return loadImage(imageSrc);
}

// HTML picture element approach
async function createResponsiveImage(src) {
    const picture = document.createElement('picture');

    if (await avifSupport()) {
        const avifSource = document.createElement('source');
        avifSource.srcset = src.replace(/\.[^.]+$/, '.avif');
        avifSource.type = 'image/avif';
        picture.appendChild(avifSource);
    }

    if (await webpSupport()) {
        const webpSource = document.createElement('source');
        webpSource.srcset = src.replace(/\.[^.]+$/, '.webp');
        webpSource.type = 'image/webp';
        picture.appendChild(webpSource);
    }

    const img = document.createElement('img');
    img.src = src;
    picture.appendChild(img);

    return picture;
}
```

---

## 🎯 Feature Detection Examples

### Comprehensive Environment Check

```javascript
async function initializeApp() {
    const env = detectEnv();
    const features = {
        webp: await webpSupport(),
        avif: await avifSupport()
    };

    // Apply CSS classes for styling
    document.documentElement.classList.add(
        env.isTouch ? 'touch-device' : 'mouse-device',
        env.isIOS ? 'ios-device' : 'non-ios',
        env.isMac ? 'mac-os' : 'non-mac',
        features.webp ? 'webp-supported' : 'webp-unsupported',
        features.avif ? 'avif-supported' : 'avif-unsupported'
    );

    // Browser-specific initialization
    if (env.isIE) {
        console.warn('Internet Explorer detected - some features may not work');
    }

    if (env.isSafari && env.isIOS) {
        // iOS Safari specific fixes
        fixiOSSafariIssues();
    }

    // Audio capability check
    if (!env.isAudioVolume) {
        console.warn('Audio volume control not supported');
        hideVolumeControls();
    }
}
```

### Conditional Feature Loading

```javascript
function loadFeaturesBasedOnEnv() {
    const env = detectEnv();

    // Touch-specific features
    if (env.isTouch) {
        import('./touch-gestures.js').then(module => {
            module.enableSwipe();
            module.enablePinch();
        });
    }

    // Desktop-specific features
    if (!env.isTouch) {
        import('./keyboard-shortcuts.js').then(module => {
            module.enableShortcuts();
        });
    }

    // iOS-specific handling
    if (env.isIOS) {
        if (env.IOSversion < 10) {
            // Legacy iOS support
            loadLegacyPolyfills();
        }
    }
}
```

### Image Optimization Strategy

```javascript
class ImageOptimizer {
    constructor() {
        this.support = {};
        this.init();
    }

    async init() {
        this.support.webp = await webpSupport();
        this.support.avif = await avifSupport();
    }

    getBestFormat(originalSrc) {
        const baseSrc = originalSrc.replace(/\.[^.]+$/, '');

        if (this.support.avif) {
            return baseSrc + '.avif';
        } else if (this.support.webp) {
            return baseSrc + '.webp';
        } else {
            return originalSrc; // fallback to original
        }
    }

    createOptimizedImage(src, alt) {
        const img = document.createElement('img');
        img.src = this.getBestFormat(src);
        img.alt = alt;
        return img;
    }
}

// Usage
const optimizer = new ImageOptimizer();
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        const optimizedImg = optimizer.createOptimizedImage(
            img.dataset.src,
            img.alt
        );
        img.parentNode.replaceChild(optimizedImg, img);
    });
});
```

---

## 📚 Key Concepts

These functions teach modern web development practices:

- **Feature Detection**: Testing capabilities instead of browser sniffing
- **Progressive Enhancement**: Starting with basics, adding advanced features
- **User Agent Parsing**: Browser and OS detection techniques
- **Image Optimization**: Modern image formats and fallbacks
- **Promise-based APIs**: Asynchronous feature detection
- **Cross-browser Compatibility**: Handling different browser capabilities
- **Device Detection**: Touch devices, mobile platforms, OS versions

Master these utilities and you'll build robust, cross-platform web applications!
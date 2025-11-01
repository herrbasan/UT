# Helpers Module

Utility functions for asynchronous operations, dynamic resource loading, and placeholder image generation.

## 📑 Table of Contents

- [Resource Loading](#-resource-loading)
  - [addHeadImport()](#addheadimport) - Dynamically load CSS/JS files
- [Async Utilities](#️-async-utilities)
  - [awaitMs()](#awaitms) - Promise-based delay
  - [awaitEvent()](#awaitevent) - Wait for DOM events
- [Image Generation](#️-image-generation)
  - [drawImageDummy()](#drawimagedummy) - Generate placeholder images

---

## 📦 Resource Loading

### addHeadImport()

**Dynamically load external JavaScript or CSS files** into the document head. Returns a Promise that resolves when the resource loads successfully.

```javascript
// Load a single CSS file
await ut.addHeadImport({
    type: 'css',
    url: './styles/theme.css'
});

// Load a JavaScript module
await ut.addHeadImport({
    type: 'js',
    url: './lib/analytics.js'
});

// Load an ES module
await ut.addHeadImport({
    type: 'esm',
    url: './components/widget.js'
});

// Load multiple resources in parallel
await ut.addHeadImport([
    { type: 'css', url: './styles/main.css' },
    { type: 'css', url: './styles/theme.css' },
    { type: 'js', url: './lib/vendor.js' }
]);
```

**📝 Parameters:**
- `options` (Object or Array): Configuration object(s) with:
  - `type` (string): Resource type - `'css'`, `'js'`, or `'esm'` (ES module)
  - `url` (string): Path to the resource file

**↩️ Returns:**
- `Promise`: Resolves when resource loads successfully, rejects on error
- For arrays: Returns `Promise.allSettled()` with results for all resources

**Problem:** You need to load external CSS or JavaScript files dynamically based on user actions or conditions.

**Solution:** Use `addHeadImport()` to load resources on-demand, improving initial page load performance.

```javascript
// Load theme based on user preference
const theme = localStorage.getItem('theme') || 'light';
await ut.addHeadImport({
    type: 'css',
    url: `./themes/${theme}.css`
});

// Load dependencies before initializing a component
await ut.addHeadImport([
    { type: 'js', url: './lib/charts.js' },
    { type: 'css', url: './lib/charts.css' }
]);
initializeCharts();
```

**⚠️ Important Notes:**
- Creates `<script>` tags for JS/ESM, `<link>` tags for CSS
- Sets both `href` and `src` attributes (ensures compatibility)
- Listens for `load` and `error` events
- For arrays, use `Promise.allSettled()` to handle partial failures

---

## ⏱️ Async Utilities

### awaitMs()

**Wait for a specified duration** before continuing execution. Returns a Promise that resolves after the delay.

```javascript
// Wait 1 second
await ut.awaitMs(1000);
console.log('1 second has passed');

// Add delay between operations
for (let i = 0; i < 5; i++) {
    console.log(`Step ${i + 1}`);
    await ut.awaitMs(500); // Wait 500ms between steps
}

// Debounce user input
async function handleInput(value) {
    await ut.awaitMs(300); // Wait 300ms after last input
    searchAPI(value);
}
```

**📝 Parameters:**
- `ms` (number): Milliseconds to wait before resolving

**↩️ Returns:**
- `Promise`: Resolves after the specified delay

**Problem:** You need to introduce delays in async code, throttle operations, or create timeouts.

**Solution:** Use `awaitMs()` for clean, Promise-based delays instead of setTimeout callbacks.

```javascript
// Show loading spinner for minimum duration
async function loadData() {
    showSpinner();
    const [data] = await Promise.all([
        fetchAPI('/data'),
        ut.awaitMs(500) // Minimum 500ms spinner display
    ]);
    hideSpinner();
    return data;
}

// Retry with exponential backoff
async function retryFetch(url, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            return await fetch(url);
        } catch (err) {
            if (i === retries - 1) throw err;
            await ut.awaitMs(Math.pow(2, i) * 1000); // 1s, 2s, 4s
        }
    }
}
```

---

### awaitEvent()

**Wait for a DOM event to occur** on an element. Returns a Promise that resolves when the event fires or times out.

```javascript
// Wait for user to click a button
const button = document.querySelector('#confirm');
const event = await ut.awaitEvent(button, 'click');
console.log('Button clicked!', event);

// Wait for image to load
const img = new Image();
img.src = './photo.jpg';
await ut.awaitEvent(img, 'load');
console.log('Image loaded successfully');

// Wait for animation to complete
const element = document.querySelector('.animated');
element.classList.add('fade-out');
await ut.awaitEvent(element, 'animationend');
element.remove();

// With custom timeout (default is 100 seconds)
const result = await ut.awaitEvent(video, 'ended', 5000);
if (result === 'timeout') {
    console.log('Video did not finish in 5 seconds');
}
```

**📝 Parameters:**
- `el` (Element): DOM element to listen on
- `event` (string): Event name to wait for (e.g., 'click', 'load', 'animationend')
- `time` (number, optional): Timeout in milliseconds (default: 100000 - 100 seconds)

**↩️ Returns:**
- `Promise`: Resolves with the Event object when event fires, or string `'timeout'` if timeout occurs

**Problem:** You need to wait for user interactions or DOM events in async code without callback hell.

**Solution:** Use `awaitEvent()` to handle events with async/await syntax, making sequential event handling readable.

```javascript
// Multi-step user interaction flow
async function onboardingFlow() {
    showMessage('Click the Start button when ready');
    await ut.awaitEvent(startButton, 'click');
    
    showMessage('Now select your preferences');
    await ut.awaitEvent(preferenceForm, 'submit');
    
    showMessage('Great! Your account is ready');
    await ut.awaitMs(2000);
    redirectToApp();
}

// Wait for transitions before modifying layout
async function smoothLayoutChange(element) {
    element.style.opacity = '0';
    await ut.awaitEvent(element, 'transitionend');
    
    element.style.height = '200px';
    element.style.opacity = '1';
    await ut.awaitEvent(element, 'transitionend');
}
```

**⚠️ Important Notes:**
- Automatically removes event listener after firing once
- Cleans up timeout to prevent memory leaks
- Returns `'timeout'` string (not an event) when timeout occurs - check for this!

---

## 🖼️ Image Generation

### drawImageDummy()

**Generate a placeholder image** using Canvas API. Creates an image with customizable text, useful for missing assets during development.

```javascript
// Create default placeholder (960x720)
const placeholder = ut.drawImageDummy();
document.querySelector('#hero').appendChild(placeholder);

// Custom message and size
const avatar = ut.drawImageDummy('Profile Photo', 200, 200);
document.querySelector('.avatar').appendChild(avatar);

// Use as fallback for broken images
images.forEach(img => {
    img.addEventListener('error', () => {
        const fallback = ut.drawImageDummy(img.alt, img.width, img.height);
        img.replaceWith(fallback);
    });
});
```

**📝 Parameters:**
- `text` (string, optional): Message to display (default: "Missing Asset")
- `width` (number, optional): Image width in pixels (default: 960)
- `height` (number, optional): Image height in pixels (default: 720)

**↩️ Returns:**
- `Image`: HTMLImageElement with a data URL showing the placeholder

**Problem:** You need placeholder images during development or fallbacks for missing assets.

**Solution:** Use `drawImageDummy()` to generate placeholder images on-the-fly without external dependencies.

```javascript
// Gallery with automatic placeholders
function createGallery(images) {
    return images.map(src => {
        const img = new Image();
        img.src = src;
        img.width = 400;
        img.height = 300;
        
        img.addEventListener('error', () => {
            const placeholder = ut.drawImageDummy(
                `Image not found: ${src}`,
                400,
                300
            );
            img.replaceWith(placeholder);
        });
        
        return img;
    });
}

// Development mode placeholders
if (import.meta.env.DEV) {
    document.querySelectorAll('img[data-placeholder]').forEach(img => {
        const placeholder = ut.drawImageDummy(
            img.dataset.placeholder,
            parseInt(img.dataset.width) || 960,
            parseInt(img.dataset.height) || 720
        );
        img.src = placeholder.src;
    });
}
```

**📐 Visual Details:**
- Dark gray background (`rgba(30,30,30,0.9)`)
- Red "ASSET MISSING" text (40px, system fonts)
- White custom text below (14px)
- Respects device pixel ratio for sharp rendering
- Returns data URL encoded as PNG

---

## 🎯 Key Concepts

**Promises & Async/Await**
- `addHeadImport()`, `awaitMs()`, and `awaitEvent()` all return Promises
- Use `await` with these functions in async contexts
- Handle errors with try/catch blocks

**Dynamic Resource Loading**
- Load CSS/JS files on-demand to improve performance
- Use `Promise.allSettled()` for multiple resources (handles partial failures)
- Resources are appended to `<head>` and persist for the page lifetime

**Event-Driven Programming**
- `awaitEvent()` converts event listeners to Promises
- Automatically cleans up listeners to prevent memory leaks
- Timeout safety prevents hanging on events that never fire

**Canvas Image Generation**
- `drawImageDummy()` uses Canvas API to create images programmatically
- Returns data URLs that can be used directly as image sources
- Useful for development, testing, and graceful degradation

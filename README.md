# nui_ut - Personal Web Dev Utilities

A collection of vanilla JavaScript utilities crystallized from 25+ years of web development. Not a framework or comprehensive library - just focused functions that solve real problems encountered repeatedly in production work.

## Philosophy

**Performance First, Frameworks Last**
- Built for speed and efficiency with vanilla JavaScript
- Zero dependencies - just browser-native APIs
- Tree-shakable ES modules for selective loading
- ~24 KB minified - smaller footprint than most frameworks

**Grew Organically**
- Started as scattered utility functions across projects
- Evolved through real-world usage and refinement
- Each function solves a specific, recurring problem
- Continuously updated based on modern web standards

## What This Is

This is **not** a "drop-in library" you install via npm. It's a **personal toolkit** that grew from my workflow and coding habits. The modular structure exists for development convenience and bundler compatibility.

**Best Use**: Copy individual functions into your projects as snippets. The organized structure just keeps things manageable.

## Quick Usage

### Option 1: Download from Releases (Recommended)

Download the minified version from [GitHub Releases](https://github.com/herrbasan/UT/releases):

```html
<!-- Load in HTML -->
<script src="./nui_ut.min.js"></script>
<script>
  // All functions available globally via ut
  ut.lz(5, 3);                              // '005'
  ut.el('#myDiv');                          // DOM selection
  ut.fetch('/api/data');                    // HTTP requests
  ut.createElement('div', { inner: 'Hi' }); // Element creation
  ut.formatDate(Date.now());                // Date formatting
  ut.setCookie('theme', 'dark');            // Cookie management
</script>
```

### Option 2: CDN (No Download)

Use jsdelivr CDN for quick testing:

```html
<!-- Latest version -->
<script src="https://cdn.jsdelivr.net/gh/herrbasan/UT@latest/nui_ut.min.js"></script>

<!-- Specific version (recommended for production) -->
<script src="https://cdn.jsdelivr.net/gh/herrbasan/UT@v3.0.0/nui_ut.min.js"></script>
```

### Option 3: Build from Source

Clone the repository and build locally:

```bash
git clone https://github.com/herrbasan/UT.git
cd UT
npm install
npm run build  # Creates nui_ut.min.js
```

### Option 4: Development Bundle (Readable)

Use the readable source during development:

```javascript
import ut from './nui_ut.js';

// Same API, full source for debugging
ut.lz(5, 3);                              // '005'
ut.el('#myDiv');                          // DOM selection
ut.fetch('/api/data');                    // HTTP requests
```

### Option 3: Selective Loading (Tree-Shaking)

Import only the modules you need for smaller bundle sizes:

```javascript
// Import specific modules
import domModule from './modules/dom.js';
import formatModule from './modules/format.js';
import dataModule from './modules/data.js';

// Build your custom ut object
const ut = { ...domModule, ...formatModule, ...dataModule };

// Use same namespace, smaller footprint
ut.el('#myDiv');           // ✅ Works (from dom)
ut.formatDate(Date.now()); // ✅ Works (from format)
ut.deep_get(obj, 'path');  // ✅ Works (from data)
ut.setCookie('x', 'y');    // ❌ Not loaded (cookie not imported)
```

### Option 4: Copy Individual Functions

Best for learning or single-function needs:

```javascript
// From format.js - Leading zero padding
function lz(num, size = 2) {
    return String(num).padStart(size, '0');
}

// From dom.js - Better element selection
function el(selector, context = document) {
    if (selector instanceof Element) return selector;
    return context.querySelector(selector);
}

// From data.js - Safe nested property access
function deep_get(obj, path) {
    try {
        let split = path.split('.');
        if (split.length == 1) return obj[path];
        if (split.length == 2) return obj[split[0]][split[1]];
        // ... optimized for up to 9 levels
    } catch (e) {
        return undefined;
    }
}
```

## Module Overview

| Module | What's In It | Use Case |
|--------|--------------|----------|
| **data** | Array sorting, object manipulation, deep operations | Data processing & transformation |
| **format** | Date/time formatting, numbers, strings, JSON | Display formatting & parsing |
| **dom** | Element selection, classes, events, creation | DOM manipulation & interaction |
| **fetch** | HTTP requests with progress tracking | API calls & data loading |
| **file** | File type detection, extensions, media types | File handling & validation |
| **filter** | Advanced filtering, pattern matching | Search & data filtering |
| **cookie** | Cookie management (get, set, delete) | Client-side storage |
| **css** | CSS variables, colors, theming | Dynamic styling |
| **env** | Browser detection, feature support | Environment checks |
| **helpers** | Async utilities, image placeholders | Supporting functions |

**10 modules** organized by functionality

## Why These Functions Exist

Each utility solves a specific, recurring problem:

- **`lz()`** - Pad numbers with leading zeros: `lz(5, 3)` → `'005'` (timestamps, IDs, counters)
- **`el()`** - Better `querySelector` that accepts elements or selectors without errors
- **`deep_get()`** - Access nested properties using dynamic path strings: `deep_get(config, pathFromUser)` where path is `'api.endpoints.users'`
- **`formatDate()`** - Consistent date formatting without external libraries
- **`fetch()`** - HTTP requests with progress tracking, timeouts, and sensible defaults
- **`createElement()`** - Build DOM elements programmatically with classes, events, and attributes in one call
- **`setCssVar()`** - Dynamic theming with CSS variables: `setCssVar('--primary-color', '#3366cc')`
- **`turboFilter()`** - Fast data filtering with complex conditions
- **`slugify()`** - Convert text to URL-safe slugs: `slugify('Hello World!')` → `'hello_world'`

## Building for Production

Generate the minified version for production use:

```bash
npm install        # Install Terser (dev dependency)
npm run build      # Creates nui_ut.min.js (23.58 KB)
```

**Build Results:**
- Source: ~52 KB (unminified bundle)
- Minified: ~24 KB (56% size reduction)
- All modules included
- IIFE format (works without module support)
- Global `ut` object created automatically

The minified version:
- ✅ All modules bundled in one file
- ✅ Compressed and optimized
- ✅ Same API as development version
- ✅ Works in any browser environment
- ✅ No import statements needed

## Testing

Comprehensive test suite with interactive UI:

```bash
# Open in browser:
test/test-suite.html
```

The test suite:
- ✅ Tests all modules and functions
- ✅ Uses the minified production version
- ✅ Interactive UI for exploring each module
- ✅ Real-world usage examples
- ✅ Cookie persistence for theme preferences
- ✅ Demonstrates practical integration patterns

## Performance Focus

- **Zero Dependencies** - Just vanilla JavaScript
- **Tree-Shakable** - ES modules support selective loading
- **Optimized Algorithms** - Performance-first implementations
- **Native APIs** - Uses browser-native functions where possible
- **Small Footprint** - 23.58 KB minified (~56% compression ratio)

## Browser Support

Modern browsers with ES6 support:
- Chrome 80+ ✅
- Firefox 78+ ✅
- Safari 14+ ✅
- Edge 80+ ✅

**Note:** The minified version (IIFE format) works without ES module support, but individual modules require ES6 import/export.

## Documentation

Comprehensive documentation for all modules:

📚 **[Full Documentation](docs/README.md)** - Complete reference with examples

**Module-Specific Guides:**
- [data.md](docs/data.md) - Array/object manipulation
- [format.md](docs/format.md) - Formatting utilities
- [dom.md](docs/dom.md) - DOM manipulation
- [fetch.md](docs/fetch.md) - HTTP requests
- [file.md](docs/file.md) - File utilities
- [filter.md](docs/filter.md) - Data filtering
- [cookie.md](docs/cookie.md) - Cookie management
- [css.md](docs/css.md) - CSS utilities
- [env.md](docs/env.md) - Environment detection

## Contributing

This is a personal collection, but you're welcome to:
- ✅ Use any function in your projects (copy freely)
- ✅ Suggest improvements via issues
- ✅ Report bugs or inconsistencies
- ✅ Share how you're using it

## License

Use freely in your projects. Attribution appreciated but not required.

## Documentation

The comprehensive documentation in the `docs/` folder was created with AI assistance. While the code itself is my work, the documentation structure, examples, and explanations were generated collaboratively with AI tools to ensure clarity and completeness.

## License

These utilities are free to use in any project. No restrictions, no attribution required.

---

*Built by a web developer who's been doing this since the days of Netscape Navigator. Still learning, still optimizing.*
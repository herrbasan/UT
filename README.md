# nui_ut - Personal Web Dev Utilities

A collection of vanilla JavaScript utilities that have crystallized over 25+ years of web development. This isn't a framework or a comprehensive library - it's a curated set of functions that solve real problems I've encountered repeatedly in my work.

## Philosophy

**Performance First, Frameworks Last**
- Built for speed and efficiency
- Avoids heavy UI frameworks and abstractions
- Focuses on vanilla JavaScript solutions
- Prioritizes developer experience and code clarity

**Grew Organically**
- Started as scattered utility functions
- Evolved through real-world usage and refinement
- Represents patterns that actually work in production
- Continuously updated based on changing web standards

## What This Is

This is **not** a "drop-in library" you install via npm. It's a **personal toolkit** that grew from my workflow and coding habits. The modular structure exists mainly for my own development convenience and bundler compatibility.

**Use it as snippets** - copy the functions you need into your projects. The organized structure is just to keep things manageable for me.

## Quick Usage

### As Snippets (Recommended)

Browse the `modules/` folder and copy-paste what you need:

```javascript
// From string.js - Simple leading zero padding
function lz(num, size = 2) {
    return String(num).padStart(size, '0');
}

// From dom.js - Better element selection
function el(selector, context = document) {
    if (selector instanceof Element) return selector;
    return context.querySelector(selector);
}

// From fetch.js - Simple HTTP requests
function fetch(url, data = {}, options = {}) {
    // ... (see modules/fetch.js for full implementation)
}
```

### As a Library (My Workflow)

If you want the full collection:

```javascript
import ut from './nui_ut.js';

// Everything available at top level
ut.lz(5, 3);        // '005'
ut.el('#myDiv');    // DOM selection
ut.fetch('/api/data'); // HTTP requests
ut.createElement('div', { inner: 'Hello' }); // Element creation
```

## Module Overview

| Module | What's In It | Use Case |
|--------|-------------|----------|
| `data` | Array/object manipulation, deep operations | Data processing |
| `fetch` | HTTP requests with progress tracking | API calls |
| `format` | Date/time/file formatting, JSON parsing | Display formatting |
| `dom` | Element selection, events, manipulation | DOM interactions |
| `css` | CSS variables, colors, theme detection | Styling utilities |
| `file` | File type detection, size formatting | File handling |
| `filter` | Data filtering and matching | Search/filtering |
| `cookie` | Cookie management | Client storage |
| `async` | Promises, event waiting | Async utilities |
| `env` | Browser detection, feature support | Environment checks |

## Why These Functions Exist

Each utility solves a specific problem I've encountered repeatedly:

- **`lz()`** - Formatting numbers for displays (timestamps, IDs, etc.)
- **`el()`** - Better `querySelector` with element passthrough
- **`deep_get()`** - Safe access to nested object properties
- **`formatDate()`** - Consistent date formatting across projects
- **`fetch()`** - HTTP requests with sensible defaults and error handling

## Performance Focus

- Minimal dependencies (just vanilla JS)
- Tree-shakable ES modules
- Efficient algorithms
- Browser-native APIs where possible
- Small footprint

## Browser Support

Modern browsers with ES module support. Tested in:
- Chrome 80+
- Firefox 78+
- Safari 14+
- Edge 80+

## Contributing

This is a personal collection, but feel free to:
- Use any function in your projects
- Suggest improvements
- Report bugs

## Documentation

The comprehensive documentation in the `docs/` folder was created with AI assistance. While the code itself is my work, the documentation structure, examples, and explanations were generated collaboratively with AI tools to ensure clarity and completeness.

## License

These utilities are free to use in any project. No restrictions, no attribution required.

---

*Built by a web developer who's been doing this since the days of Netscape Navigator. Still learning, still optimizing.*
# nui_ut Documentation

Welcome to the comprehensive documentation for nui_ut - a collection of vanilla JavaScript utilities that solve real-world development problems.

## ✅ Documentation Status

All 10 active modules are fully documented with comprehensive explanations, code examples, and practical usage guidance. Each function includes the problem it solves, parameter descriptions, return values, and real-world examples.

**🔍 Battle-Tested**: This documentation has been validated through building a comprehensive test suite that exercises the entire library. Real-world integration patterns and best practices are incorporated throughout.

## 📚 What You'll Find Here

This documentation provides detailed technical reference for JavaScript developers. Each function includes:

- **The Problem It Solves** - Real-world scenarios where you'd use this
- **Code Examples** - Copy-paste ready snippets
- **Parameter Details** - What each argument does and expects
- **Return Values** - What you get back from the function
- **Usage Tips** - Best practices, gotchas, and performance notes

## 🗂️ Module Documentation

Browse documentation by module:

### Core Utilities
- **[Data Manipulation](data.md)** - Arrays, objects, sorting, deep operations
- **[String & Formatting](format.md)** - Dates, times, numbers, slugs, JSON
- **[DOM Interaction](dom.md)** - Selection, events, classes, creation
- **[HTTP Requests](fetch.md)** - API calls with progress tracking

### Specialized Tools
- **[CSS Utilities](css.md)** - CSS variables, colors, themes, parsing
- **[File Handling](file.md)** - Extensions, types, media detection
- **[Data Filtering](filter.md)** - Complex search and filter operations
- **[Cookies](cookie.md)** - Get, set, delete, check cookies
- **[Environment](env.md)** - Browser detection, feature support
- **[Helpers](helpers.md)** - Resource loading, async utilities, image placeholders

### Archived (Reference Only)
- **[Archived Functions](archived.md)** - Experimental and deprecated code

## 🚀 Quick Start

### Using as Snippets (Recommended)

Most developers copy individual functions they need:

```javascript
// Copy this function into your project
function el(selector, context = document) {
    if (selector instanceof Element) return selector;
    return context.querySelector(selector);
}

// Use immediately
const button = el('#myButton');
```

### Using the Minified Bundle

For quick integration (23.58 KB):

```html
<script src="./nui_ut.min.js"></script>
<script>
  // All functions available via global ut object
  ut.el('#myButton');
  ut.formatDate(new Date());
  
  // Access nested properties with dynamic paths
  const userPath = 'user.profile.name'; // path from config
  ut.deep_get(data, userPath);
</script>
```

### Using ES Modules

For development with module support:

```javascript
import ut from '../nui_ut.js';

// Everything available
ut.el('#myButton');
ut.formatDate(new Date());
```

## 📖 How to Read This Documentation

Each function follows a consistent, beginner-friendly structure:

**🎯 Problem:** What real-world problem does this solve?

**✅ Solution:** Brief explanation of how it works

```javascript
functionName(param1, param2) {
    // Implementation details
}
```

**📝 Parameters:**
- `param1`: Description of what this parameter does
- `param2`: Description of what this parameter does

**🎉 Returns:** What the function returns

**💡 Usage Examples:**
```javascript
// Example 1: Basic usage
// Example 2: Advanced usage
// Example 3: Common patterns or gotchas
```

## 📖 Module Organization

The modules are organized by functionality:

1. **[Data](data.md)** - Array sorting, object manipulation, deep property access
2. **[Format](format.md)** - Date/time formatting, slugs, file sizes, JSON parsing
3. **[DOM](dom.md)** - Element selection, class management, events, creation
4. **[Fetch](fetch.md)** - HTTP requests with progress tracking and error handling
5. **[File](file.md)** - File extension detection, media type identification
6. **[Filter](filter.md)** - Complex data filtering with multiple conditions
7. **[Cookie](cookie.md)** - Browser cookie management
8. **[CSS](css.md)** - CSS variable manipulation, color parsing, theming
9. **[Env](env.md)** - Browser/device detection, feature support
10. **[Helpers](archived.md)** - Async utilities, image placeholders

Each module focuses on specific aspects of JavaScript development with practical, production-ready solutions.

## 🤝 Contributing

Found an error or want to suggest improvements? Documentation evolves with the codebase - feedback welcome!
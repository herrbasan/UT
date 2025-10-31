# nui_ut Documentation

Welcome to the comprehensive documentation for nui_ut - a collection of vanilla JavaScript utilities that solve real-world development problems.

## ✅ Documentation Complete

All 10 active modules have been fully documented with comprehensive explanations, code examples, and practical usage guidance. Each function includes the problem it solves, parameter descriptions, return values, and real-world examples.

**🔍 Validated Through Usage**: This documentation has been tested and refined through building a comprehensive test suite that uses the library extensively. Real-world integration revealed current limitations and best practices, which have been incorporated into the main README.

## 📚 Comprehensive Reference

This documentation provides detailed technical reference for JavaScript developers. Each function includes:

- **The Problem It Solves** - Real-world scenarios where you'd need this
- **Code Examples** - Copy-paste ready snippets
- **Parameter Explanations** - What each argument does
- **Return Values** - What you get back
- **Usage Tips** - Best practices and gotchas

## 🗂️ Module Documentation

Browse the documentation by module:

### Core Utilities
- **[Data Manipulation](data.md)** - Arrays, objects, and data processing
- **[String & Formatting](format.md)** - Text formatting, dates, numbers
- **[DOM Interaction](dom.md)** - Element selection, events, manipulation
- **[HTTP Requests](fetch.md)** - API calls with progress tracking

### Specialized Tools
- **[CSS Utilities](css.md)** - CSS variables, colors, themes
- **[File Handling](file.md)** - File types, sizes, processing
- **[Data Filtering](filter.md)** - Search and filter operations
- **[Cookies](cookie.md)** - Client-side storage
- **[Environment](env.md)** - Browser detection and capabilities

### Archived (Reference Only)
- **[Archived Functions](archived.md)** - Experimental and project-specific code

## 🚀 Quick Start

### Using as Snippets

Most developers use nui_ut by copying individual functions:

```javascript
// Copy this function into your project
function el(selector, context = document) {
    if (selector instanceof Element) return selector;
    return context.querySelector(selector);
}

// Use it
const button = el('#myButton');
```

### Using the Full Library

For your workflow convenience:

```javascript
import ut from './nui_ut.js';

// Everything available
ut.el('#myButton');
ut.formatDate(new Date());
```

## 📖 How to Read This Documentation

Each function follows this structure:

```javascript
// 🎯 Problem: [What real-world problem this solves]

// ✅ Solution: [Brief explanation]

functionName(param1, param2) {
    // Implementation
}

// 📝 Parameters:
// - param1: Description of what this parameter does
// - param2: Description of what this parameter does

// 🎉 Returns: What the function returns

// 💡 Usage Examples:
// Example 1: Basic usage
// Example 2: Advanced usage
// Example 3: Common gotchas
```

## 📖 Module Organization

The modules are organized by functionality:

1. **[DOM Interaction](dom.md)** - Element selection and manipulation
2. **[Data Processing](data.md)** - Arrays and objects
3. **[String Formatting](format.md)** - Text and number formatting
4. **[HTTP Requests](fetch.md)** - API communication

Each module focuses on specific aspects of JavaScript development with practical applications.

## 🤝 Contributing

Found an error or want to suggest improvements? This documentation is meant to evolve with the codebase.

## 📄 License

These utilities and their documentation are free to use and modify.
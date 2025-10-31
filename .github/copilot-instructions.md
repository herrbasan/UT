# nui_ut - Copilot Instructions & Development Notes

This file contains insights and findings from building real applications with nui_ut, including test suites and practical usage patterns.

## Building Applications with nui_ut

### Lessons from Building a Test Suite

When building the comprehensive test suite for this library, several insights emerged about effective usage patterns and current limitations:

#### ✅ What Works Well

**All Functions Available at Top Level**
```javascript
// When imported, all functions are flattened to the main ut object
ut.createElement('div', { inner: 'Hello' });  // Not ut.dom.createElement
ut.getCookie('theme');                        // Not ut.cookie.getCookie
ut.formatDate(Date.now());                    // Not ut.format.formatDate
```

**Element Creation with Full Capabilities**
```javascript
// Use createElement with attributes, events, and CSS classes
const button = ut.createElement('button', {
    classes: 'btn btn-primary',
    inner: 'Click me!',
    attributes: {
        type: 'button',
        'data-action': 'submit',
        'aria-label': 'Submit form'
    },
    events: {
        click: () => handleSubmit()
    }
});
```

**CSS Variables for Theming**
```javascript
// Use setCssVar for dynamic theming
ut.setCssVar('--primary-color', '#3366cc');
ut.setCssVar('--bg-color', theme.background);
```

**Cookie-Based Persistence**
```javascript
// Theme persistence with cookies
ut.setCookie('theme', 'dark', 365);
const savedTheme = ut.getCookie('theme');
```

#### ❌ Current Limitations & Workarounds

**CSS Loading**
- **Issue**: No public `ut.headImport()` or `ut.css.headImport()` function exists for loading external CSS
- **Workaround**: Use standard DOM methods
```javascript
// Load external CSS
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = './styles.css';
document.head.appendChild(link);
```

**Bulk Element Appending**
- **Issue**: No `ut.appendChildren()` function exists
- **Workaround**: Use standard `appendChild()` or `append()`
```javascript
// Append multiple elements
container.appendChild(element1);
container.appendChild(element2);
// or
container.append(element1, element2);
```

**Event Handling**
- **Issue**: No dedicated event utility functions
- **Workaround**: Use standard `addEventListener()`
```javascript
button.addEventListener('click', () => {
    console.log('clicked');
});
```

#### 🧪 Test Suite Insights

The test suite (`test/test-suite.html/js/css`) demonstrates:
- Building entire UIs programmatically using `ut.createElement()`
- CSS variable-based theming with `ut.setCssVar()`
- Cookie persistence for user preferences
- Comprehensive testing of all library modules
- Real-world usage patterns and integration approaches

**Key Takeaway**: nui_ut excels at data manipulation, formatting, and DOM element creation, but you'll need to supplement with standard DOM APIs for CSS loading, bulk operations, and complex event handling.

## API Structure Notes

- **Flattened API**: All module functions are available at the top level of the `ut` object
- **No Namespacing**: Functions like `ut.createElement()` (not `ut.dom.createElement()`)
- **Internal Functions**: Some utilities like `addHeadImport` are used internally but not exposed publicly
- **ES Modules**: The library uses ES module imports/exports for tree-shaking compatibility

## Development Workflow

1. **Test Suite First**: Build test suites to validate API assumptions
2. **Documentation Validation**: Use real usage to verify documentation accuracy
3. **API Discovery**: Test actual function availability rather than assuming based on code inspection
4. **Gap Identification**: Real usage reveals missing functionality that code inspection might miss

## File Structure

- `test/test-suite.html/js/css` - Comprehensive test suite demonstrating real-world usage
- `test/test-data.json` - JSON test data for fetch function testing
- `docs/` - Module-specific documentation
- `modules/` - Individual utility modules
- `nui_ut.js` - Main entry point that flattens all functions to top level
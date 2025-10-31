# CSS Utilities

Functions for working with CSS custom properties (variables), colors, themes, and dynamic stylesheet manipulation.

**📝 Note**: This module does not include public CSS loading utilities. For loading external stylesheets, use standard DOM methods:
```javascript
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = './styles.css';
document.head.appendChild(link);
```

**Note**: The library uses internal CSS loading for its own purposes (like `checkNuiCss`), but this functionality is not exposed in the public API.

## 🎨 Color Parsing

### parseCSSColor()

**Problem**: Convert CSS color strings to usable numeric values for calculations.

**Solution**: Parse hex, rgb(), rgba() colors into arrays of numbers.

```javascript
function parseCSSColor(color) {
    // Converts color strings to [r, g, b] or [r, g, b, a] arrays
}
```

**📝 Parameters:**
- `color`: CSS color string (hex, rgb, rgba)

**🎉 Returns:** Array of numbers [r, g, b] or [r, g, b, a], or false if invalid

**💡 Usage Examples:**

```javascript
parseCSSColor('#ff0000');        // [255, 0, 0]
parseCSSColor('#f00');           // [255, 0, 0] (short hex)
parseCSSColor('rgb(255,0,0)');   // [255, 0, 0]
parseCSSColor('rgba(255,0,0,0.5)'); // [255, 0, 0, 0.5]

// Use for color calculations
const red = parseCSSColor('#ff0000');
const darkerRed = red.map(c => Math.floor(c * 0.8)); // [204, 0, 0]
```

---

### cssColorString()

**Problem**: Convert color arrays back to CSS color strings.

**Solution**: Format arrays as rgb() or rgba() strings.

```javascript
function cssColorString(ar) {
    // Converts [r, g, b] or [r, g, b, a] to CSS color string
}
```

**📝 Parameters:**
- `ar`: Array of color values [r, g, b] or [r, g, b, a]

**🎉 Returns:** CSS color string

**💡 Usage Examples:**

```javascript
cssColorString([255, 0, 0]);        // "rgb(255,0,0)"
cssColorString([255, 0, 0, 0.5]);   // "rgba(255,0,0,0.5)"

// Combine with parseCSSColor for color manipulation
const original = parseCSSColor('#3366cc');
const brighter = original.map(c => Math.min(255, c + 50));
const brighterColor = cssColorString(brighter);
```

---

## 🎯 CSS Custom Properties (Variables)

### getCssVar()

**Problem**: CSS variables return strings with units. Need parsed numeric values for calculations.

**Solution**: Parse CSS variable values with units, computed pixel values, and color parsing.

```javascript
function getCssVar(prop, el) {
    // Returns detailed info about CSS variable value
}
```

**📝 Parameters:**
- `prop`: CSS variable name (e.g., '--primary-color')
- `el`: Element to get computed style from (default: document.body)

**🎉 Returns:** Object with value, unit, absolute flag, and computed pixel value

**💡 Usage Examples:**

```javascript
// Get spacing variable
const spacing = getCssVar('--spacing-lg');
console.log(spacing.value);    // 16
console.log(spacing.unit);     // 'rem'
console.log(spacing.computed); // 256 (computed pixels)

// Get color variable
const color = getCssVar('--primary-color');
if (color.unit === 'rgba') {
    console.log('Color array:', color.computed); // [51, 102, 204, 1]
}

// Get viewport-based value
const width = getCssVar('--content-width');
console.log(width.value);    // 0.8
console.log(width.unit);     // 'vw'
console.log(width.computed); // 1024 (pixels on 1280px screen)
```

---

### setCssVar()

**Problem**: Setting CSS variables requires remembering the correct syntax.

**Solution**: Simple function to set CSS custom properties.

```javascript
function setCssVar(varName, value, el = document.documentElement) {
    // Sets CSS custom property value
}
```

**📝 Parameters:**
- `varName`: CSS variable name (e.g., '--primary-color')
- `value`: Value to set
- `el`: Element to set on (default: :root)

**🎉 Returns:** Nothing (modifies CSS)

**💡 Usage Examples:**

```javascript
// Set theme colors
setCssVar('--primary-color', '#3366cc');
setCssVar('--font-size', '16px');

// Dynamic theming
function applyTheme(theme) {
    setCssVar('--bg-color', theme.background);
    setCssVar('--text-color', theme.foreground);
    setCssVar('--accent-color', theme.accent);
}

applyTheme({
    background: '#ffffff',
    foreground: '#333333',
    accent: '#007acc'
});
```

---

### getCssVars()

**Problem**: Need all CSS variables defined in stylesheets for theme inspection.

**Solution**: Extract all CSS custom properties from all stylesheets.

```javascript
function getCssVars(el = document.styleSheets) {
    // Returns object with all CSS variables and their values
}
```

**📝 Parameters:**
- `el`: Stylesheets to scan (default: all document stylesheets)

**🎉 Returns:** Object with variable names as keys and parsed values as values

**💡 Usage Examples:**

```javascript
const allVars = getCssVars();
console.log(allVars);
// {
//   '--primary-color': { value: '#3366cc', unit: 'rgba', ... },
//   '--spacing-sm': { value: 8, unit: 'px', ... },
//   '--font-size': { value: 16, unit: 'px', ... }
// }

// Export theme
const theme = {};
for (const [key, value] of Object.entries(allVars)) {
    if (value.unit === 'rgba') {
        theme[key] = cssColorString(value.computed);
    } else {
        theme[key] = value.value + (value.unit === 'number' ? '' : value.unit);
    }
}
console.log(JSON.stringify(theme, null, 2));
```

---

### getCssVarNames()

**Problem**: Need to know which CSS variables are defined without parsing values.

**Solution**: Extract just the variable names from stylesheets.

```javascript
function getCssVarNames(el = document.styleSheets) {
    // Returns array of all CSS variable names found
}
```

**📝 Parameters:**
- `el`: Stylesheets to scan (default: all document stylesheets)

**🎉 Returns:** Array of CSS variable names

**💡 Usage Examples:**

```javascript
const varNames = getCssVarNames();
console.log(varNames);
// ['--primary-color', '--secondary-color', '--spacing-sm', '--font-size']

// Check if theme is complete
const requiredVars = ['--primary-color', '--background', '--text-color'];
const missing = requiredVars.filter(v => !varNames.includes(v));
if (missing.length > 0) {
    console.warn('Missing theme variables:', missing);
}
```

---

## 🌓 Theme Management

### setTheme()

**Problem**: Automatically apply dark/light theme based on user's system preference.

**Solution**: Detect system color scheme and apply 'dark' class, with optional change listening.

```javascript
function setTheme(_el, listen_for_change) {
    // Applies dark/light theme based on system preference
}
```

**📝 Parameters:**
- `_el`: Element to apply theme class to (default: document.body)
- `listen_for_change`: Whether to listen for system theme changes

**🎉 Returns:** Nothing (modifies element classes)

**💡 Usage Examples:**

```javascript
// Apply theme to body on page load
setTheme();

// Apply to specific element
setTheme('#app-container');

// Listen for system theme changes
setTheme(document.body, true);

// Now you can style with CSS:
.dark {
    --bg-color: #1e1e1e;
    --text-color: #ffffff;
}

.light {
    --bg-color: #ffffff;
    --text-color: #333333;
}
```

---

## 📦 Dynamic CSS Loading

### checkNuiCss()

**Problem**: Load CSS files dynamically only when needed, and check if CSS variables are available.

**Solution**: Load CSS files on demand and verify variable availability.

```javascript
function checkNuiCss(prop, url) {
    // Loads CSS file if variable is missing, returns all variables
}
```

**📝 Parameters:**
- `prop`: CSS variable name to check for
- `url`: CSS file path to load if variable missing

**🎉 Returns:** Promise that resolves to object with all CSS variables

**💡 Usage Examples:**

```javascript
// Load theme CSS if primary color not defined
checkNuiCss('--primary-color', 'themes/default.css')
    .then(vars => {
        console.log('Theme loaded, primary color:', vars['--primary-color']);
    });

// Load component styles on demand
async function loadComponentStyles(componentName) {
    const cssVars = await checkNuiCss(`--${componentName}-loaded`, `${componentName}.css`);
    // Component styles are now loaded
    renderComponent(componentName);
}
```

---

## 📚 Key Concepts

These functions teach advanced CSS concepts:

- **CSS Custom Properties**: Dynamic variables, inheritance, computed values
- **Color Models**: RGB/A parsing, hex conversion, color manipulation
- **Units & Measurements**: Absolute vs relative units, viewport calculations
- **CSSOM API**: Accessing stylesheets, computed styles, property values
- **Theme Systems**: System preference detection, dynamic theming
- **Dynamic Loading**: Runtime CSS injection, dependency management
- **Regular Expressions**: Pattern matching for color and unit parsing

Master these utilities and you'll have powerful control over styling and theming in your web applications!
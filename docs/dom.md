# DOM Manipulation Utilities

Functions for working with HTML elements, CSS, events, and browser APIs - the foundation of interactive web applications.

## 📑 Table of Contents

- [Element Selection](#-element-selection)
  - [el()](#el) - Better querySelector with element support
  - [els()](#els) - Select multiple elements as array
- [CSS & Classes](#-css--classes)
  - [css()](#css) - Set multiple CSS properties
  - [addClass() / addClasses()](#addclass--addclasses) - Add CSS classes
  - [removeClass()](#removeclass) - Remove CSS classes
  - [toggleClass()](#toggleclass) - Toggle CSS class
  - [hasClass()](#hasclass) - Check if element has class
  - [show() / hide()](#show--hide) - Toggle element visibility
- [Element Creation & Manipulation](#️-element-creation--manipulation)
  - [createElement()](#createelement) - Create elements with options
  - [killKids() / killMe()](#killkids--killme) - Remove elements/children
  - [htmlObject()](#htmlobject) - Parse HTML strings
- [Events](#-events)
  - [addEvents()](#addevents) - Attach multiple event listeners
  - [clearEvents()](#clearevents) - Remove all tracked events
- [Positioning & Geometry](#-positioning--geometry)
  - [offset()](#offset) - Get element position
  - [calcScale()](#calcscale) - Calculate scaling for images/videos
  - [hitRect() / hitObject()](#hitrect--hitobject) - Hit detection
- [Images & Media](#️-images--media)
  - [getImage()](#getimage) - Preload images with callbacks
  - [inlineSVG()](#inlinesvg) - Create inline SVG elements
- [Browser APIs](#-browser-apis)
  - [locationHash() / locationSearch()](#locationhash--locationsearch) - Parse URL parameters
  - [visibility()](#visibility) - Detect tab visibility changes
  - [enterFullscreen() / exitFullscreen()](#enterfullscreen--exitfullscreen) - Fullscreen control
  - [isVisibleObserver()](#isvisibleobserver) - Intersection Observer wrapper
- [Utility Functions](#-utility-functions)
  - [attributes()](#attributes) - Set multiple attributes
  - [isNode() / isElement()](#isnode--iselement) - Type checking
  - [getComputedTranslateXY()](#getcomputedtranslatexy) - Get transform values

---

## 🎯 Element Selection

### el()

**Problem**: `document.querySelector()` is verbose and doesn't handle when you already have an element.

**Solution**: Smart element selector that accepts selectors or element objects.

```javascript
function el(s, context = document) {
    if (s instanceof Element) { return s; } else { return context.querySelector(s); }
}
```

**📝 Parameters:**
- `s`: CSS selector string or Element object
- `context`: Parent element to search in (default: document)

**🎉 Returns:** Element object or null

**💡 Usage Examples:**

```javascript
// Works with selectors
const button = el('#myButton');
const firstItem = el('.list-item');

// Works with elements (no-op)
const existingElement = document.getElementById('test');
const sameElement = el(existingElement); // Returns existingElement

// Scoped queries
const modal = el('.modal');
const closeBtn = el('.close-btn', modal);
```

---

### els()

**Problem**: `document.querySelectorAll()` returns a NodeList, not a real array.

**Solution**: Simple wrapper that returns querySelectorAll results.

```javascript
function els(s, context = document) {
    return context.querySelectorAll(s);
}
```

**📝 Parameters:**
- `s`: CSS selector string
- `context`: Parent element to search in (default: document)

**🎉 Returns:** NodeList of matching elements

**💡 Usage Examples:**

```javascript
// Get all buttons
const buttons = els('button');

// Get all list items in a specific list
const list = el('#todo-list');
const items = els('li', list);

// Convert to array if needed
const itemArray = Array.from(items);
```

---

## 🎨 CSS & Classes

### css()

**Problem**: Setting multiple CSS properties requires multiple style assignments.

**Solution**: Set multiple CSS properties at once with an object.

```javascript
function css(q, cs, remove = false) {
    // Sets multiple CSS properties on an element
}
```

**📝 Parameters:**
- `q`: Element selector or element
- `cs`: Object with CSS properties and values
- `remove`: If true, removes the properties instead of setting them

**🎉 Returns:** Nothing (modifies element in place)

**💡 Usage Examples:**

```javascript
// Set multiple properties
css('#myDiv', {
    'background-color': 'red',
    'font-size': '20px',
    'border-radius': '5px'
});

// Remove properties
css('#myDiv', {
    'background-color': '',
    'font-size': ''
}, true);

// Animate with CSS
css('.fade-in', {
    opacity: '0',
    transition: 'opacity 0.3s ease'
});
```

---

### addClass() / addClasses()

**Problem**: Adding CSS classes requires checking if classList exists (old browser support).

**Solution**: Cross-browser class addition with fallback for older browsers.

```javascript
function addClass(_el, _classNames) {
    // Adds one or more classes to element
}

function addClasses(_el, _classNames) {
    // Wrapper that accepts array or space-separated string
}
```

**📝 Parameters:**
- `_el`: Element selector or element
- `_classNames`: Class name(s) - string or array

**🎉 Returns:** Nothing (modifies element in place)

**💡 Usage Examples:**

```javascript
// Single class
addClass('#menu', 'active');

// Multiple classes as string
addClass('.button', 'primary large');

// Multiple classes as array
addClasses('.card', ['featured', 'highlighted', 'animated']);
```

---

### removeClass()

**Problem**: Removing classes needs cross-browser compatibility.

**Solution**: Remove classes with modern classList or regex fallback.

```javascript
function removeClass(_el, _classNames) {
    // Removes one or more classes from element
}
```

**📝 Parameters:**
- `_el`: Element selector or element
- `_classNames`: Class name(s) - string or array

**🎉 Returns:** Nothing (modifies element in place)

**💡 Usage Examples:**

```javascript
// Remove single class
removeClass('.modal', 'visible');

// Remove multiple classes
removeClass('#form', ['error', 'invalid', 'dirty']);
```

---

### toggleClass()

**Problem**: Toggle classes with cross-browser support.

**Solution**: Add class if missing, remove if present.

```javascript
function toggleClass(_el, _className) {
    // Toggles a single class on/off
}
```

**📝 Parameters:**
- `_el`: Element selector or element
- `_className`: Class name to toggle

**🎉 Returns:** Nothing (modifies element in place)

**💡 Usage Examples:**

```javascript
// Toggle active state
toggleClass('.menu-item', 'active');

// Theme switching
toggleClass('body', 'dark-mode');
```

---

### hasClass()

**Problem**: Check if element has a class with cross-browser support.

**Solution**: Modern classList.contains() with regex fallback.

```javascript
function hasClass(_el, className) {
    // Returns true if element has the specified class
}
```

**📝 Parameters:**
- `_el`: Element selector or element
- `className`: Class name to check

**🎉 Returns:** Boolean

**💡 Usage Examples:**

```javascript
if (hasClass('.dropdown', 'open')) {
    // Dropdown is open, close it
    removeClass('.dropdown', 'open');
} else {
    // Dropdown is closed, open it
    addClass('.dropdown', 'open');
}
```

---

### show() / hide()

**Problem**: Show/hide elements by manipulating display property.

**Solution**: Simple display toggling functions.

```javascript
function show(_el) { /* Sets display to null (shows element) */ }
function hide(_el) { /* Sets display to 'none' (hides element) */ }
```

**📝 Parameters:**
- `_el`: Element selector or element

**🎉 Returns:** Nothing (modifies element in place)

**💡 Usage Examples:**

```javascript
// Show loading spinner
show('.spinner');

// Hide after loading
hide('.spinner');

// Toggle visibility
const isVisible = el('.panel').style.display !== 'none';
if (isVisible) {
    hide('.panel');
} else {
    show('.panel');
}
```

---

## 🏗️ Element Creation & Manipulation

### createElement()

**Problem**: Creating elements with properties, classes, and events requires multiple steps.

**Solution**: Create elements with all properties in one call.

```javascript
function createElement(type, options) {
    // Creates element with all specified options
}
```

**📝 Parameters:**
- `type`: HTML tag name ('div', 'button', etc.)
- `options`: Object with element configuration

**🎉 Returns:** Created element

**💡 Usage Examples:**

```javascript
// Create a fully-featured button with events and attributes
const button = createElement('button', {
    id: 'submit-btn',
    classes: 'btn primary',
    inner: 'Submit Form',
    attributes: {
        type: 'submit',
        'data-action': 'submit',
        'aria-label': 'Submit the contact form'
    },
    events: {
        click: (e) => {
            e.preventDefault();
            handleSubmit();
        }
    },
    dataset: { form: 'contact', action: 'submit' }
});

// Create a styled div with CSS classes (preferred over inline styles)
const panel = createElement('div', {
    classes: 'panel panel-primary',
    inner: '<h3>Panel Title</h3><p>Panel content...</p>',
    attributes: {
        role: 'region',
        'aria-labelledby': 'panel-title'
    }
});
```

**💡 Styling Note**: Use CSS classes and the `style` property in `createElement()` options rather than calling `ut.css()` separately - it's more efficient and cleaner for initial styling.

---

### killKids() / killMe()

**Problem**: Remove all children or remove element from DOM.

**Solution**: Clean element removal functions.

```javascript
function killKids(_el) {
    // Removes all child elements
}

function killMe(_el) {
    // Removes element from its parent
}
```

**📝 Parameters:**
- `_el`: Element selector or element

**🎉 Returns:** Nothing (modifies DOM)

**💡 Usage Examples:**

```javascript
// Clear a list
killKids('#todo-list');

// Remove an element
killMe('.temporary-message');
```

---

### htmlObject()

**Problem**: Convert HTML string to DOM element.

**Solution**: Parse HTML string into element using Range API.

```javascript
function htmlObject(s) {
    // Converts HTML string to DOM element
}
```

**📝 Parameters:**
- `s`: HTML string

**🎉 Returns:** DOM element

**💡 Usage Examples:**

```javascript
// Create element from HTML
const card = htmlObject(`
    <div class="card">
        <h2>Title</h2>
        <p>Content</p>
    </div>
`);

document.body.appendChild(card);
```

---

## 🎪 Events

### addEvents()

**Problem**: Adding multiple event listeners requires multiple addEventListener calls.

**Solution**: Add multiple events at once and track them for cleanup.

```javascript
function addEvents(_el, events) {
    // Adds multiple event listeners and tracks them
}
```

**📝 Parameters:**
- `_el`: Element selector or element
- `events`: Object with event names as keys and handlers as values

**🎉 Returns:** Nothing (modifies element in place)

**💡 Usage Examples:**

```javascript
addEvents('#myButton', {
    click: () => console.log('Clicked!'),
    mouseover: () => console.log('Hovered!'),
    mouseout: () => console.log('Unhovered!')
});
```

---

### clearEvents()

**Problem**: Remove all events added by addEvents().

**Solution**: Remove all tracked event listeners.

```javascript
function clearEvents(_el) {
    // Removes all events added by addEvents()
}
```

**📝 Parameters:**
- `_el`: Element selector or element

**🎉 Returns:** Nothing (modifies element in place)

**💡 Usage Examples:**

```javascript
// Add events
addEvents('.modal', {
    click: handleModalClick,
    keydown: handleEscape
});

// Later, remove all events
clearEvents('.modal');
```

---

## 📍 Positioning & Geometry

### offset()

**Problem**: Get element position relative to document (not viewport).

**Solution**: Calculate absolute position including scroll.

```javascript
function offset(_el) {
    // Returns { top: number, left: number }
}
```

**📝 Parameters:**
- `_el`: Element selector or element

**🎉 Returns:** Object with top and left coordinates

**💡 Usage Examples:**

```javascript
const pos = offset('#target');
console.log(`Element is at ${pos.left}, ${pos.top}`);

// Position tooltip
const tooltip = el('.tooltip');
const targetPos = offset('.button');
css(tooltip, {
    left: targetPos.left + 'px',
    top: (targetPos.top - 30) + 'px'
});
```

---

### calcScale()

**Problem**: Calculate how to fit/scale content within containers (images, videos, etc.).

**Solution**: Calculate scaling factors for different modes (fit, cover, fill).

```javascript
function calcScale(originalWidth, originalHeight, targetWidth, targetHeight, scaleMode, isCenter) {
    // Returns scaling info for resizing content
}
```

**📝 Parameters:**
- `originalWidth/Height`: Source dimensions
- `targetWidth/Height`: Container dimensions
- `scaleMode`: 'fit', 'cover', 'fill'
- `isCenter`: Center the result

**🎉 Returns:** Object with scaleX, scaleY, and rect coordinates

**💡 Usage Examples:**

```javascript
// Fit image in container (like CSS object-fit: contain)
const scale = calcScale(800, 600, 400, 300, 'fit', true);
console.log(scale.scaleX, scale.scaleY); // Scaling factors
console.log(scale.rect); // [x, y, width, height] for positioning
```

---

### hitRect() / hitObject()

**Problem**: Check if a point is inside a rectangle or element.

**Solution**: Point-in-rectangle collision detection.

```javascript
function hitRect(ar, x, y) {
    // Check if point (x,y) is inside rectangle [left, top, width, height]
}

function hitObject(obj, x, y) {
    // Check if point is inside element bounds
}
```

**📝 Parameters:**
- `ar`: Rectangle array [left, top, width, height]
- `obj`: Element to check
- `x, y`: Point coordinates

**🎉 Returns:** Boolean

**💡 Usage Examples:**

```javascript
// Check if click is inside button
document.addEventListener('click', (e) => {
    if (hitObject(buttonElement, e.clientX, e.clientY)) {
        console.log('Button clicked!');
    }
});

// Check rectangle collision
const rect = [100, 100, 200, 50]; // left, top, width, height
if (hitRect(rect, mouseX, mouseY)) {
    console.log('Inside rectangle!');
}
```

---

## 🖼️ Images & Media

### getImage()

**Problem**: Load images asynchronously with proper error handling.

**Solution**: Promise-based image loading.

```javascript
function getImage(fp, cb) {
    // Loads image and returns promise or calls callback
}
```

**📝 Parameters:**
- `fp`: Image file path or URL
- `cb`: Optional callback function

**🎉 Returns:** Promise<Image> if no callback, nothing if callback provided

**💡 Usage Examples:**

```javascript
// Promise-based
getImage('photo.jpg')
    .then(img => {
        document.body.appendChild(img);
    })
    .catch(err => console.error('Failed to load image'));

// Callback-based
getImage('avatar.png', (img) => {
        profilePic.src = img.src;
    });
```

---

### inlineSVG()

**Problem**: SVG images don't inherit CSS styles. Need to inline SVG code.

**Solution**: Replace <img> tags with inline SVG elements.

```javascript
function inlineSVG(classes) {
    // Converts all SVG images to inline SVG elements
}
```

**📝 Parameters:**
- `classes`: Optional classes to add to inlined SVGs

**🎉 Returns:** Nothing (modifies DOM)

**💡 Usage Examples:**

```javascript
// Inline all SVG images on page
inlineSVG('icon-svg');

// Now you can style SVG paths with CSS
css('.icon-svg path', { fill: 'red' });
```

---

## 🌐 Browser APIs

### locationHash() / locationSearch()

**Problem**: Parse URL hash or search parameters into objects.

**Solution**: Convert query strings to key-value objects.

```javascript
function locationHash(hash_string) {
    // Parse #key1=value1&key2=value2
}

function locationSearch(search_string) {
    // Parse ?key1=value1&key2=value2
}
```

**📝 Parameters:**
- `hash_string/search_string`: URL fragment to parse (optional, uses current URL)

**🎉 Returns:** Object with parsed key-value pairs

**💡 Usage Examples:**

```javascript
// Parse current URL hash
const hash = locationHash(); // { section: 'about', tab: 'contact' }

// Parse search params
const params = locationSearch(); // { q: 'javascript', sort: 'date' }

// Parse custom string
const custom = locationHash('#user=123&action=edit');
```

---

### visibility()

**Problem**: Detect when page becomes visible/hidden (tab switching, minimizing).

**Solution**: Listen to visibility change events across browsers.

```javascript
function visibility(cb) {
    // Calls cb(isHidden) when visibility changes
}
```

**📝 Parameters:**
- `cb`: Callback function receiving boolean (true = hidden)

**🎉 Returns:** Nothing (sets up event listener)

**💡 Usage Examples:**

```javascript
visibility((isHidden) => {
    if (isHidden) {
        // Pause video, stop animations
        video.pause();
        console.log('Page hidden');
    } else {
        // Resume activities
        video.play();
        console.log('Page visible');
    }
});
```

---

## 📚 Summary

The DOM module provides comprehensive tools for everyday web development:

**Element Selection & Manipulation:**
- `el()`, `els()` - jQuery-style selectors that accept elements or strings
- `css()` - Set multiple CSS properties at once
- `addClass()`, `addClasses()`, `removeClass()`, `toggleClass()`, `hasClass()` - CSS class management
- `show()`, `hide()` - Simple visibility toggles
- `attributes()` - Bulk attribute setting

**Element Creation & Removal:**
- `createElement()` - Build elements with classes, events, attributes in one call
- `htmlObject()` - Parse HTML strings into DOM elements
- `killKids()` - Remove all child elements
- `killMe()` - Remove element from DOM

**Event Management:**
- `addEvents()` - Attach multiple event listeners with tracking
- `clearEvents()` - Remove all tracked event listeners

**Geometry & Collision:**
- `offset()` - Get element position relative to document
- `calcScale()` - Calculate scaling for different fit modes (fit, cover, fill)
- `hitRect()`, `hitObject()` - Collision detection for coordinates

**Images & Media:**
- `getImage()` - Load images with Promise or callback support
- `inlineSVG()` - Create inline SVG elements

**Browser APIs:**
- `locationHash()`, `locationSearch()` - Parse URL parameters
- `visibility()` - Detect page visibility changes
- `enterFullscreen()`, `exitFullscreen()` - Fullscreen API wrappers
- `isVisibleObserver()` - Intersection Observer for lazy loading & scroll animations

**Utilities:**
- `isNode()`, `isElement()` - Type checking for DOM objects
- `getComputedTranslateXY()` - Extract CSS transform values

These functions cover 90% of common DOM manipulation needs, providing a lightweight, modern alternative to jQuery.

### attributes()

**Problem**: Setting multiple attributes on an element requires multiple calls.

**Solution**: Set multiple attributes at once using an object.

```javascript
function attributes(_el, attributes) {
    // Sets multiple attributes from an object
}
```

**📝 Parameters:**
- `_el`: Element to modify
- `attributes`: Object with attribute names and values

**🎉 Returns:** Modified element

---

### calcScale()

**Problem**: Calculate how to scale/fit content within a container while maintaining aspect ratio.

**Solution**: Mathematical scaling calculations for different fit modes (fit, cover, fill).

```javascript
function calcScale(originalWidth, originalHeight, targetWidth, targetHeight, scaleMode, isCenter) {
    // Returns scaling information for fitting content
}
```

**📝 Parameters:**
- `originalWidth/Height`: Source dimensions
- `targetWidth/Height`: Container dimensions  
- `scaleMode`: 'fit', 'cover', 'fill', or 'full'
- `isCenter`: Whether to center the result

**🎉 Returns:** Object with scaleX, scaleY, and rect properties

---

### hitRect() / hitObject()

**Problem**: Check if a point (like mouse coordinates) is inside a rectangle or element.

**Solution**: Point-in-rectangle collision detection.

```javascript
function hitRect(ar, x, y) {
    // Check if point (x,y) is inside rectangle defined by array [left, top, width, height]
}

function hitObject(obj, x, y) {
    // Same as hitRect but takes a DOM element
}
```

**📝 Parameters:**
- `ar`/`obj`: Rectangle array [x, y, width, height] or DOM element
- `x, y`: Point coordinates to test

**🎉 Returns:** Boolean indicating if point is inside

---

### isNode() / isElement()

**Problem**: Check if a variable is a DOM node or element.

**Solution**: Type checking for DOM objects.

```javascript
function isNode(o) {
    // Check if object is a DOM Node
}

function isElement(o) {
    // Check if object is a DOM Element (more specific than Node)
}
```

**📝 Parameters:**
- `o`: Object to test

**🎉 Returns:** Boolean

---

### getComputedTranslateXY()

**Problem**: Get the current translation (position) of a CSS-transformed element.

**Solution**: Extract translateX and translateY from computed transform matrix.

```javascript
function getComputedTranslateXY(obj) {
    // Returns [translateX, translateY] from element's transform
}
```

**📝 Parameters:**
- `obj`: DOM element

**🎉 Returns:** Array [x, y] of translation values

---

### locationHash() / locationSearch()

**Problem**: Parse URL hash or search parameters into objects.

**Solution**: Convert query strings into key-value objects.

```javascript
function locationHash(hash_string) {
    // Parse #key1=value1&key2=value2 into object
}

function locationSearch(search_string) {
    // Parse ?key1=value1&key2=value2 into object  
}
```

**📝 Parameters:**
- `hash_string`/`search_string`: Hash or search string (uses current URL if not provided)

**🎉 Returns:** Object with parsed key-value pairs

---

### visibility()

**Problem**: Detect when the page becomes visible/hidden (user switches tabs).

**Solution**: Listen for visibility changes and call a callback.

```javascript
function visibility(cb) {
    // Calls cb(isHidden) when visibility changes
}
```

**📝 Parameters:**
- `cb`: Callback function that receives boolean (true when hidden)

---

### isVisibleObserver()

**Problem**: Detect when an element becomes visible/invisible in the viewport.

**Solution**: Use IntersectionObserver to monitor element visibility.

```javascript
function isVisibleObserver(_el, cb, options) {
    // Observes element visibility and calls callback
}
```

**📝 Parameters:**
- `_el`: Element to observe
- `cb`: Callback function called with (isIntersecting, entry)
- `options`: IntersectionObserver options

**🎉 Returns:** IntersectionObserver instance

---
**Problem**: Fullscreen API has different methods across browsers.

**Solution**: Cross-browser fullscreen toggling.

```javascript
function toggleFullscreen(_el) {
    // Toggle fullscreen on/off for element
}

function enterFullscreen(_el) {
    // Enter fullscreen mode
}

function exitFullscreen() {
    // Exit fullscreen mode
}
```

**📝 Parameters:**
- `_el`: Element to make fullscreen (for enter/toggle)

**🎉 Returns:** Boolean for enterFullscreen, nothing for others

**💡 Usage Examples:**

```javascript
// Toggle fullscreen on video click
addEvents('video', {
    click: () => toggleFullscreen('video')
});

// Enter fullscreen on button click
addEvents('#fullscreen-btn', {
    click: () => enterFullscreen('.presentation')
});

// Exit fullscreen
addEvents('#exit-btn', {
    click: exitFullscreen
});
```

---

### isVisibleObserver()

**Problem**: Detect when elements enter/leave viewport for lazy loading, animations.

**Solution**: Intersection Observer API wrapper.

```javascript
function isVisibleObserver(_el, cb, options) {
    // Observe element visibility in viewport
}
```

**📝 Parameters:**
- `_el`: Element to observe
- `cb`: Callback receiving (isVisible, entry)
- `options`: IntersectionObserver options

**🎉 Returns:** IntersectionObserver instance

**💡 Usage Examples:**

```javascript
// Lazy load images
isVisibleObserver('.lazy-image', (visible, entry) => {
    if (visible) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy-image');
    }
});

// Animate on scroll
isVisibleObserver('.animate-on-scroll', (visible) => {
    if (visible) {
        addClass('.animate-on-scroll', 'animated');
    }
});
```

---

## 🔧 Utility Functions

### isNode() / isElement()

**Problem**: Check if object is a DOM node or element.

**Solution**: Cross-browser type checking.

```javascript
function isNode(o) {
    // Returns true if object is a DOM Node
}

function isElement(o) {
    // Returns true if object is a DOM Element
}
```

**📝 Parameters:**
- `o`: Object to check

**🎉 Returns:** Boolean

**💡 Usage Examples:**

```javascript
const el = el('#test');
console.log(isElement(el)); // true
console.log(isNode(el));    // true

const text = document.createTextNode('hello');
console.log(isElement(text)); // false
console.log(isNode(text));    // true
```

---

### getComputedTranslateXY()

**Problem**: Get current transform translate values from CSS.

**Solution**: Parse computed transform matrix.

```javascript
function getComputedTranslateXY(obj) {
    // Returns [translateX, translateY] from CSS transform
}
```

**📝 Parameters:**
- `obj`: Element to check

**🎉 Returns:** Array [x, y] or undefined

**💡 Usage Examples:**

```javascript
const pos = getComputedTranslateXY(draggableElement);
if (pos) {
    console.log(`Translated by ${pos[0]}px, ${pos[1]}px`);
}
```

---

## 📚 Key Concepts

These functions teach essential web development concepts:

- **DOM Selection**: querySelector, querySelectorAll, Element vs Node
- **CSS Manipulation**: style.setProperty(), classList API, computed styles
- **Event Handling**: addEventListener, removeEventListener, custom events
- **Element Creation**: createElement, appendChild, innerHTML vs DOM methods
- **Geometry**: getBoundingClientRect, offset calculations, collision detection
- **Modern APIs**: Intersection Observer, Visibility API, Fullscreen API
- **Cross-browser**: Feature detection, fallbacks for older browsers
- **Performance**: Efficient DOM manipulation, event delegation

Master these utilities and you'll have a solid foundation for building interactive web applications!
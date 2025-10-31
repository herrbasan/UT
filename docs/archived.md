# Archived & Experimental Utilities

Functions that were experimental, are no longer actively maintained, or serve as reference implementations. Use with caution as these may be deprecated or untested.

## 🎬 Animation & Easing

### eases

**Collection of easing functions** for smooth animations. These are mathematical functions that control animation timing.

**Available Easings:**
- **Linear**: `linear` - Constant speed
- **Quadratic**: `easeInQuad`, `easeOutQuad`, `easeInOutQuad` - Acceleration/deceleration
- **Cubic**: `easeInCubic`, `easeOutCubic`, `easeInOutCubic` - Smoother curves
- **Quartic**: `easeInQuart`, `easeOutQuart`, `easeInOutQuart` - Even smoother
- **Quintic**: `easeInQuint`, `easeOutQuint`, `easeInOutQuint` - Very smooth
- **Sinusoidal**: `easeInSine`, `easeOutSine`, `easeInOutSine` - Wave-like motion
- **Exponential**: `easeInExpo`, `easeOutExpo`, `easeInOutExpo` - Fast start/end
- **Circular**: `easeInCirc`, `easeOutCirc`, `easeInOutCirc` - Circular motion
- **Elastic**: `easeInElastic`, `easeOutElastic`, `easeInOutElastic` - Bouncy effect
- **Back**: `easeInBack`, `easeOutBack`, `easeInOutBack` - Overshoot effect
- **Bounce**: `easeInBounce`, `easeOutBounce`, `easeInOutBounce` - Bouncing motion

**Easing Function Signature:**
```javascript
function(t, b, c, d) {
    // t: current time (0 to d)
    // b: start value
    // c: change in value (end - start)
    // d: duration
    // returns: current value
}
```

---

### ease()

**Basic animation function** using easing curves.

```javascript
function ease(prop) {
    // Animates a property using easing
}
```

**📝 Parameters:**
- `prop`: Configuration object

**Configuration:**
- `ease`: Easing function name (default: 'easeInOutQuad')
- `duration`: Animation duration in ms (default: 1000)
- `start`: Starting value
- `end`: Ending value
- `progress`: Callback for each frame with current value
- `target`: Object to animate
- `target_prop`: Property name on target object
- `cb`: Completion callback

**💡 Usage Examples:**

```javascript
// Animate a custom property
ease({
    start: 0,
    end: 100,
    duration: 2000,
    ease: 'easeOutBounce',
    progress: (value) => console.log('Current:', value),
    cb: () => console.log('Animation complete!')
});

// Animate DOM element property
const element = document.getElementById('box');
ease({
    target: element.style,
    target_prop: 'width',
    start: '0px',
    end: '200px',
    duration: 1000,
    ease: 'easeInOutCubic'
});
```

---

### interpolate()

**Modern interpolation function** with better control and cancellation.

```javascript
function interpolate(options) {
    // Advanced interpolation with control
}
```

**📝 Parameters:**
- `options`: Configuration object

**Options:**
- `from`: Starting value
- `to`: Ending value
- `duration`: Duration in ms (default: 500)
- `easing`: Easing function name
- `onUpdate`: Callback with (currentValue, progress)
- `onComplete`: Completion callback

**🎉 Returns:** Control object with `stop()` method

**💡 Usage Examples:**

```javascript
// Basic interpolation
const animation = interpolate({
    from: 0,
    to: 100,
    duration: 2000,
    easing: 'easeOutElastic',
    onUpdate: (value, progress) => {
        console.log(`Progress: ${(progress * 100).toFixed(1)}%, Value: ${value}`);
    },
    onComplete: () => console.log('Done!')
});

// Stop animation early
setTimeout(() => animation.stop(), 1000);
```

---

### easeProperty()

**Property animation wrapper** around interpolate().

```javascript
function easeProperty(options) {
    // Animate object properties
}
```

**📝 Parameters:**
- `options`: Configuration object

**Options:**
- `target`: Object to animate
- `target_prop`: Property to animate
- `start`/`from`: Starting value
- `end`/`to`: Ending value
- `duration`: Duration in ms
- `ease`/`easing`: Easing function
- `progress`: Progress callback
- `cb`: Completion callback

**💡 Usage Examples:**

```javascript
// Animate custom object
const obj = { x: 0, y: 0 };
easeProperty({
    target: obj,
    target_prop: 'x',
    from: 0,
    to: 100,
    duration: 1000,
    ease: 'easeInOutQuad',
    progress: (val) => console.log('X:', val)
});

// Animate DOM element
easeProperty({
    target: element,
    target_prop: 'scrollTop',
    from: 0,
    to: 500,
    duration: 1500,
    ease: 'easeOutCubic'
});
```

---

## 🌡️ Temperature Conversion

### convertFahrenheitToCelsius()

```javascript
function convertFahrenheitToCelsius(t) {
    return (5 / 9) * (t - 32);
}
```

**📝 Parameters:**
- `t`: Temperature in Fahrenheit

**🎉 Returns:** Temperature in Celsius

**💡 Usage Examples:**

```javascript
convertFahrenheitToCelsius(32);   // 0
convertFahrenheitToCelsius(212);  // 100
convertFahrenheitToCelsius(98.6); // 37
```

---

### convertCelsiusToFahrenheit()

```javascript
function convertCelsiusToFahrenheit(t) {
    return t * (9/5) + 32;
}
```

**📝 Parameters:**
- `t`: Temperature in Celsius

**🎉 Returns:** Temperature in Fahrenheit

**💡 Usage Examples:**

```javascript
convertCelsiusToFahrenheit(0);    // 32
convertCelsiusToFahrenheit(100);  // 212
convertCelsiusToFahrenheit(37);   // 98.6
```

---

## 📄 Data Parsing

### nedb()

**Parse newline-delimited JSON** (NDJSON) files.

```javascript
async function nedb(url) {
    // Fetches and parses NDJSON data
}
```

**📝 Parameters:**
- `url`: URL to NDJSON file

**🎉 Returns:** Array of parsed JSON objects

**💡 Usage Examples:**

```javascript
// NDJSON file contains:
// {"name": "Alice", "age": 25}
// {"name": "Bob", "age": 30}

const data = await nedb('/api/users.ndjson');
console.log(data);
// [{ name: 'Alice', age: 25 }, { name: 'Bob', age: 30 }]
```

---

### readHtml()

**Fetch and parse HTML** from a URL.

```javascript
async function readHtml(url, element) {
    // Fetches HTML and optionally extracts element
}
```

**📝 Parameters:**
- `url`: URL to fetch HTML from
- `element`: Optional CSS selector to extract

**🎉 Returns:** Promise resolving to parsed HTML Document or Element

**💡 Usage Examples:**

```javascript
// Get full HTML document
const doc = await readHtml('https://example.com');
console.log(doc.title);

// Extract specific element
const article = await readHtml('/news.html', '.main-article');
document.body.appendChild(article);
```

---

## 🎥 Video Utilities

### videoEvents()

**Add all video event listeners** at once for debugging or monitoring.

```javascript
function videoEvents(target, cb, verbose) {
    // Adds comprehensive video event listeners
}
```

**📝 Parameters:**
- `target`: Video element
- `cb`: Callback function (default: console.log)
- `verbose`: Include progress/timeupdate events

**Video Events:**
- `abort`, `canplay`, `canplaythrough`, `durationchange`, `emptied`
- `ended`, `error`, `loadeddata`, `loadedmetadata`, `loadstart`
- `pause`, `play`, `playing`, `ratechange`, `seeking`, `seeked`
- `stalled`, `suspend`, `volumechange`, `waiting`
- If verbose: `progress`, `timeupdate`

**💡 Usage Examples:**

```javascript
const video = document.querySelector('video');

// Log all video events
videoEvents(video);

// Custom callback
videoEvents(video, (event) => {
    console.log(`${event.type} at ${video.currentTime}s`);
}, true); // Include verbose events
```

---

## 🐛 Debugging

### fb()

**Formatted console logging** with context support.

```javascript
function fb() {
    // Formatted console output with optional context
}
```

**📝 Parameters:**
- Any number of arguments to log
- Special: Strings starting with `!ctx_contextName` set gray background label

**💡 Usage Examples:**

```javascript
fb('Simple message');
fb('Multiple', 'arguments', 42);

// With context
fb('!ctx_database', 'User saved:', userData);
fb('!ctx_api', 'Request failed:', error);
```

---

## 🎨 Animation Helpers

### animate()

**CSS animation helper** that adds/removes animation classes.

```javascript
function animate(t, animation, cb, bypass) {
    // Manages CSS animation classes
}
```

**📝 Parameters:**
- `t`: Element to animate
- `animation`: CSS class name for animation
- `cb`: Callback after animation completes
- `bypass`: If false, just calls callback immediately

**💡 Usage Examples:**

```javascript
// CSS: .fade-out { animation: fadeOut 0.3s ease; }
animate(element, 'fade-out', () => {
    element.remove(); // Remove after fade
});
```

---

## 🎯 Icon System

### getIcons()

**Replace data attributes with SVG icons** (reference implementation).

```javascript
function getIcons() {
    // Processes [data-nuiicon] elements
}
```

**📝 Parameters:** None

**Replaces elements like:**
```html
<div data-nuiicon="add"></div>
<!-- Becomes: -->
<div><svg class="nui-icon ii_add"><!-- SVG path --></svg></div>
```

---

### icon()

**Generate SVG icon HTML** from predefined shapes.

```javascript
function icon(id, wrap_in_container, return_as_element) {
    // Creates SVG icon
}
```

**📝 Parameters:**
- `id`: Icon name (see icon_shapes for available icons)
- `wrap_in_container`: Wrap in div container
- `return_as_element`: Return DOM element instead of HTML string

**Available Icons:**
- `add`, `add_circle`, `analytics`, `arrow`, `article`, `assessment`
- `brightness`, `calendar`, `close`, `delete`, `done`, `drag_handle`
- `drag_indicator`, `edit`, `edit_note`, `folder`, `fullscreen`, `info`
- `image`, `invert_colors`, `label`, `layers`, `media_folder`, `menu`
- `more`, `pause`, `person`, `play`, `search`, `settings`, `sticky_note`

**💡 Usage Examples:**

```javascript
// Get SVG string
const svgHtml = icon('add');
element.innerHTML = svgHtml;

// Get wrapped in container
const iconDiv = icon('search', true);

// Get as DOM element
const iconElement = icon('close', false, true);
button.appendChild(iconElement);
```

---

## ⚠️ Important Notes

- **Experimental**: These functions were experimental and may be untested
- **No Active Maintenance**: Not updated or supported
- **Use at Own Risk**: May contain bugs or deprecated patterns
- **Reference Only**: Use as inspiration for your own implementations
- **Legacy Code**: May use older JavaScript patterns

Consider these functions as a **historical archive** and **reference material** rather than production-ready utilities.
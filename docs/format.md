# String & Data Formatting Utilities

Functions for formatting strings, numbers, dates, and other data types - essential for clean output and user interfaces.

## 🔢 Number Formatting

### lz() / lzold()

**Problem**: Numbers like `5` need to display as `05` for consistent formatting in times, IDs, or lists.

**Solution**: Pad numbers with leading zeros to reach desired length.

```javascript
function lz(num, size = 2) {
    // Modern version using padStart()
    return num.toString().padStart(size, '0');
}

function lzold(num, size = 2) {
    // Legacy version with manual loop
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}
```

**📝 Parameters:**
- `num`: Number to pad
- `size`: Total length desired (default: 2)

**🎉 Returns:** String with leading zeros

**💡 Usage Examples:**

```javascript
lz(5);      // "05"
lz(42, 4);  // "0042"
lz(7, 3);   // "007"

// Perfect for time formatting
const now = new Date();
const time = lz(now.getHours()) + ':' + lz(now.getMinutes()); // "14:07"
```

---

### randomInt()

**Problem**: Generate random integers for games, testing, or random selections.

**Solution**: Simple random integer from 0 to max-1.

```javascript
function randomInt(max) {
    return Math.floor(Math.random() * max);
}
```

**📝 Parameters:**
- `max`: Upper limit (exclusive)

**🎉 Returns:** Random integer from 0 to max-1

**💡 Usage Examples:**

```javascript
// Random array index
const colors = ['red', 'blue', 'green'];
const randomColor = colors[randomInt(colors.length)];

// Dice roll (1-6)
const diceRoll = randomInt(6) + 1;

// Random percentage
const randomPercent = randomInt(101); // 0-100
```

---

## 🔤 String Formatting

### capitalize()

**Problem**: Names, titles, and sentences need proper capitalization.

**Solution**: Capitalize first letter, leave rest unchanged.

```javascript
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
```

**📝 Parameters:**
- `str`: String to capitalize

**🎉 Returns:** String with first letter capitalized

**💡 Usage Examples:**

```javascript
capitalize('hello world');    // "Hello world"
capitalize('JAVASCRIPT');     // "JAVASCRIPT" (only first letter)
capitalize('a');              // "A"

// Perfect for names
const name = 'john doe';
const properName = name.split(' ').map(capitalize).join(' '); // "John Doe"
```

---

### slugify()

**Problem**: Convert titles or names into URL-friendly slugs for web addresses or file names.

**Solution**: Remove special characters, convert spaces to underscores, normalize accents.

```javascript
function slugify(str) {
    // Converts "Hello World! Café" to "hello_world_cafe"
}
```

**📝 Parameters:**
- `str`: String to convert to slug

**🎉 Returns:** URL-safe slug string, or `false` for empty input

**💡 Usage Examples:**

```javascript
slugify('Hello World!');           // "hello_world"
slugify('Café & Restaurant');      // "cafe_restaurant"
slugify('File: Version 2.0');       // "file_version_2_0"
slugify('');                       // false

// Perfect for URLs or filenames
const title = 'My Awesome Blog Post!';
const urlSlug = slugify(title); // "my_awesome_blog_post"
```

---

## 🆔 ID Generation

### id()

**Problem**: Need unique identifiers for elements, objects, or database records.

**Solution**: Generate unique IDs using timestamp, random numbers, and performance data.

```javascript
function id() {
    return '_' + (
        Number(String(Math.random()).slice(2)) +
        Date.now() +
        Math.round(performance.now())
    ).toString(36);
}
```

**📝 Parameters:** None

**🎉 Returns:** Unique string ID starting with underscore

**💡 Usage Examples:**

```javascript
const newId = id(); // "_1a2b3c4d5e6f"

// Use for DOM elements
const div = document.createElement('div');
div.id = id(); // "_2g8h9i1j2k3l"

// Or for data objects
const todo = {
    id: id(),
    text: 'Buy groceries',
    completed: false
};
```

---

## 📅 Date & Time Formatting

### formatDate()

**Problem**: Display dates in multiple formats for different contexts (UI, files, logs).

**Solution**: Comprehensive date formatting returning multiple format options.

```javascript
function formatDate(n) {
    // Returns object with multiple date formats
    // { keys: {...}, time: "14:30:25", date: "15.03.2024", ... }
}
```

**📝 Parameters:**
- `n`: Date value (timestamp, Date object, or date string)

**🎉 Returns:** Object with multiple formatted date strings

**💡 Usage Examples:**

```javascript
const now = Date.now();
const formatted = formatDate(now);

console.log(formatted.date);        // "15.03.2024"
console.log(formatted.time);        // "14:30:25"
console.log(formatted.full);        // "15.03.2024 - 14:30:25"
console.log(formatted.file);        // "15.03.2024 - 14:30"
console.log(formatted.date_input);  // "2024-03-15" (for HTML date inputs)

// Individual components
console.log(formatted.keys.year);   // 2024
console.log(formatted.keys.month);  // "03"
console.log(formatted.keys.day);    // "15"
```

---

### playTime()

**Problem**: Format time durations for video players, audio tracks, or elapsed time displays.

**Solution**: Convert milliseconds to human-readable time formats with frames support.

```javascript
function playTime(n = 0, fps = 30) {
    // Converts 65000ms to { hours: "00", minutes: "01", seconds: "05", ... }
}
```

**📝 Parameters:**
- `n`: Duration in milliseconds
- `fps`: Frames per second for frame calculation (default: 30)

**🎉 Returns:** Object with time components and formatted strings

**💡 Usage Examples:**

```javascript
const duration = 65000; // 1 minute 5 seconds
const time = playTime(duration);

console.log(time.short);     // "00:01:05" (HH:MM:SS)
console.log(time.full);      // "00:01:05:000" (with milliseconds)
console.log(time.frames);    // "00:01:05:18" (with frames)
console.log(time.minsec);    // "1:05" (MM:SS)

// Individual components
console.log(time.hours);     // "00"
console.log(time.minutes);   // "01"
console.log(time.seconds);   // "05"
console.log(time.milliseconds); // "000"

// Negative time handling
const negative = playTime(-30000);
console.log(negative.isNegative); // true
```

---

## 📁 File Size Formatting

### formatFileSize()

**Problem**: Display file sizes in human-readable format (bytes, KB, MB, GB, TB).

**Solution**: Convert bytes to appropriate unit with 2 decimal places.

```javascript
function formatFileSize(n) {
    // Converts 1048576 to "1.00 MB"
}
```

**📝 Parameters:**
- `n`: File size in bytes

**🎉 Returns:** Formatted string with appropriate unit

**💡 Usage Examples:**

```javascript
formatFileSize(512);           // "512"
formatFileSize(1024);          // "1 KB"
formatFileSize(1536);          // "1.5 KB"
formatFileSize(1048576);       // "1 MB"
formatFileSize(1073741824);    // "1 GB"
formatFileSize(1099511627776); // "1 TB"

formatFileSize(0);             // ""
formatFileSize(-1);            // ""
```

---

## 📄 Data Parsing

### lzold()

**Problem**: Same as lz() but using the legacy implementation.

**Solution**: Manual string padding with leading zeros.

```javascript
function lzold(num, size = 2) {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}
```

**📝 Parameters:**
- `num`: Number to pad
- `size`: Total length desired (default: 2)

**🎉 Returns:** String with leading zeros

---

### randomInt()

**Problem**: Generate random integers for games, testing, or random selections.

**Solution**: Simple random integer from 0 to max-1.

```javascript
function randomInt(max) {
    return Math.floor(Math.random() * max);
}
```

**📝 Parameters:**
- `max`: Upper limit (exclusive)

**🎉 Returns:** Random integer from 0 to max-1

**💡 Usage Examples:**

```javascript
// Random array index
const colors = ['red', 'blue', 'green'];
const randomColor = colors[randomInt(colors.length)];

// Dice roll (1-6)
const diceRoll = randomInt(6) + 1;

// Random percentage
const randomPercent = randomInt(101); // 0-100
```

---

### id()

**Problem**: Generate unique IDs for elements, data objects, or temporary identifiers.

**Solution**: Create unique strings using timestamp, random numbers, and performance counter.

```javascript
function id() {
    return '_' + (
        Number(String(Math.random()).slice(2)) +
        Date.now() +
        Math.round(performance.now())
    ).toString(36);
}
```

**🎉 Returns:** Unique string ID starting with underscore

**💡 Usage Examples:**

```javascript
const elementId = id(); // "_1a2b3c4d5e6f"
const tempKey = id();   // "_7g8h9i0j1k2l"
```

---

### slugify()

**Problem**: Convert human-readable text into URL-safe slugs.

**Solution**: Remove special characters, replace spaces with underscores, normalize unicode.

```javascript
function slugify(str) {
    // Converts "Hello World! 123" to "hello_world_123"
}
```

**📝 Parameters:**
- `str`: String to convert

**🎉 Returns:** URL-safe slug string

**💡 Usage Examples:**

```javascript
slugify("Hello World!");     // "hello_world"
slugify("Café & Restaurant"); // "cafe_restaurant"
slugify("File-Name_v1.0");   // "file_name_v1_0"
```

---

### playTime()

**Problem**: Format time durations (like video lengths) into human-readable formats.

**Solution**: Convert milliseconds into various time formats optimized for media playback.

```javascript
function playTime(n = 0, fps = 30) {
    // Returns object with multiple time formats
    // { hours, minutes, seconds, milliseconds, frames, short, full, etc. }
}
```

**📝 Parameters:**
- `n`: Time in milliseconds
- `fps`: Frames per second for frame-based formats

**🎉 Returns:** Object with multiple time format properties

**💡 Usage Examples:**

```javascript
const time = playTime(65000); // 65 seconds
// Result: {
//   hours: "00",
//   minutes: "01", 
//   seconds: "05",
//   short: "01:05",
//   full: "00:01:05:000"
// }
```

---

### formatFileSize()

**Problem**: Display file sizes in human-readable formats.

**Solution**: Convert bytes to appropriate units (KB, MB, GB, etc.).

```javascript
function formatFileSize(n) {
    // Converts 1536 to "1.5 KB"
}
```

**📝 Parameters:**
- `n`: File size in bytes

**🎉 Returns:** Formatted file size string

**💡 Usage Examples:**

```javascript
formatFileSize(512);     // "512"
formatFileSize(1536);    // "1.5 KB" 
formatFileSize(1048576); // "1 MB"
```

---
**Problem**: JSON.parse() throws errors on invalid JSON. Need safe parsing that returns original string on failure.

**Solution**: Try to parse JSON, return original string if parsing fails.

```javascript
function parseJSON(str) {
    let out = str;
    try {
        out = JSON.parse(str);
    } catch (e) {
        // Return original string if parsing fails
    }
    return out;
}
```

**📝 Parameters:**
- `str`: String to parse as JSON

**🎉 Returns:** Parsed object/array, or original string if invalid JSON

**💡 Usage Examples:**

```javascript
parseJSON('{"name": "John"}');        // { name: "John" }
parseJSON('[1, 2, 3]');               // [1, 2, 3]
parseJSON('not valid json');          // "not valid json" (unchanged)
parseJSON('');                        // "" (empty string)

// Safe API response handling
const response = fetch('/api/data').then(r => r.text());
const data = parseJSON(await response); // Won't crash on invalid JSON
```

---

## 📚 Key Concepts

These functions teach important concepts:

- **String Methods**: `charAt()`, `slice()`, `padStart()`, `toLowerCase()`
- **Number Formatting**: `toString()`, `toFixed()`, `Math.floor()`
- **Date/Time APIs**: `Date` object, `getFullYear()`, `getMonth()`, etc.
- **Regular Expressions**: Pattern matching for slugify
- **Error Handling**: Try/catch for safe parsing
- **Unicode**: Accent normalization with `normalize()`

Master these utilities and you'll handle 80% of common formatting tasks!
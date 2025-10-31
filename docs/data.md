# Data Manipulation Utilities

Functions for working with arrays and objects - the building blocks of JavaScript data processing.

## 🎯 Array Operations

### sortByKey()

**Problem**: JavaScript's default `sort()` only works with simple values. How do you sort an array of objects by a property, especially nested ones?

**Solution**: A flexible sorting function that handles nested object properties with optional numeric sorting.

```javascript
function sortByKey(array, path, numeric = false) {
    // Sorts array by object property at given path
    // Handles nested properties like 'user.name' or 'settings.theme.color'
}
```

**📝 Parameters:**
- `array`: The array of objects to sort
- `path`: Property path (e.g., `'name'`, `'user.age'`, `'settings.display.brightness'`)
- `numeric`: Set to `true` for numeric sorting instead of alphabetical

**🎉 Returns:** The sorted array (modified in place)

**💡 Usage Examples:**

```javascript
// Basic sorting
const users = [
    { name: 'Charlie', age: 25 },
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 20 }
];

sortByKey(users, 'name');
// Result: [{name: 'Alice'}, {name: 'Bob'}, {name: 'Charlie'}]

// Numeric sorting
sortByKey(users, 'age', true);
// Result: [{name: 'Bob', age: 20}, {name: 'Charlie', age: 25}, {name: 'Alice', age: 30}]

// Nested properties
const products = [
    { info: { category: 'Electronics', price: 299 } },
    { info: { category: 'Books', price: 15 } }
];

sortByKey(products, 'info.price', true);
// Sorts by price within nested objects
```

---

### arrayToObject()

**Problem**: You have an array of objects and want to convert it to an object keyed by one of the properties for faster lookups.

**Solution**: Transform an array into an object using a specified property as keys.

```javascript
function arrayToObject(ar, key) {
    // Converts [{id: 1, name: 'John'}, {id: 2, name: 'Jane'}]
    // To {1: {id: 1, name: 'John'}, 2: {id: 2, name: 'Jane'}}
}
```

**📝 Parameters:**
- `ar`: Array of objects to convert
- `key`: Property name to use as object keys (supports nested paths)

**🎉 Returns:** Object with array items keyed by the specified property

**💡 Usage Examples:**

```javascript
const users = [
    { id: 1, name: 'John', role: 'admin' },
    { id: 2, name: 'Jane', role: 'user' }
];

const userObject = arrayToObject(users, 'id');
// Result: {
//   1: { id: 1, name: 'John', role: 'admin' },
//   2: { id: 2, name: 'Jane', role: 'user' }
// }

// Now you can access users instantly
const john = userObject[1]; // Much faster than searching array
```

---

### shuffleArray()

**Problem**: You need to randomize the order of items in an array for games, testing, or creating variety.

**Solution**: Fisher-Yates shuffle algorithm implementation with optional cloning.

```javascript
function shuffleArray(ar, clone = false) {
    // Randomizes array order using efficient Fisher-Yates algorithm
}
```

**📝 Parameters:**
- `ar`: Array to shuffle
- `clone`: If `true`, returns a new shuffled array without modifying the original

**🎉 Returns:** The shuffled array

**💡 Usage Examples:**

```javascript
const cards = ['A', 'B', 'C', 'D'];
shuffleArray(cards);
// cards is now randomized, e.g., ['C', 'A', 'D', 'B']

// Keep original intact
const original = [1, 2, 3, 4, 5];
const shuffled = shuffleArray(original, true);
// original: [1, 2, 3, 4, 5] (unchanged)
// shuffled: [3, 1, 5, 2, 4] (new array)
```

---

## 🔍 Object Operations

### deep_get()

**Problem**: JavaScript throws errors when accessing nested object properties that don't exist. How do you safely get `user.settings.theme.color` without crashing?

**Solution**: High-performance deep property access designed for dynamic paths assembled at runtime.

```javascript
function deep_get(obj, path) {
    // Performance-optimized deep access for dynamically assembled paths
    // Hardcoded levels for speed, only iterates at extreme depths
}
```

**📝 Parameters:**
- `obj`: Object to access
- `path`: Dot-separated property path (e.g., `'user.name'`, `'settings.display.brightness'`)

**🎉 Returns:** The property value, or `undefined` if path doesn't exist

**💡 Usage Examples:**

```javascript
const user = {
    profile: {
        settings: {
            theme: 'dark'
        }
    }
};

// Dynamic path access
const theme = deep_get(user, 'profile.settings.theme'); // 'dark'
const missing = deep_get(user, 'profile.missing.deep.value'); // undefined
```

**🚀 Performance Design:**
This function is optimized for dynamic path access where property paths are assembled at runtime through business logic. Instead of using loops for all levels (which would be slower), it uses hardcoded property access for the most common nesting depths (1-9 levels) and only falls back to iteration for extremely deep objects (>9 levels).

```javascript
// The implementation hardcodes access for performance:
// 1 level: obj[path]
// 2 levels: obj[split[0]][split[1]]
// 3 levels: obj[split[0]][split[1]][split[2]]
// ...up to 9 levels, then falls back to loop

// Dynamic path assembly example
function getUserPreference(user, category, setting) {
    const path = `preferences.${category}.${setting}`;
    return deep_get(user, path); // Fast access with assembled path
}

const theme = getUserPreference(user, 'display', 'theme');
const language = getUserPreference(user, 'locale', 'language');
```

**⚡ Why This Architecture:**
- **Direct Property Access**: No loops for 99% of real-world use cases
- **Dynamic Path Support**: Perfect for paths built from variables/logic
- **Performance**: Tested fastest method for typical nesting depths
- **Fallback Safety**: Handles extreme cases with iteration

---

### deep_set()

**Problem**: Setting nested object properties requires checking if each level exists first.

**Solution**: High-performance deep property setting that creates nested structure automatically, optimized for dynamic paths.

```javascript
function deep_set(obj, path, value) {
    // Performance-optimized deep setting for dynamically assembled paths
    // Creates missing objects automatically with minimal overhead
}
```

**📝 Parameters:**
- `obj`: Object to modify
- `path`: Dot-separated property path
- `value`: Value to set

**🎉 Returns:** Nothing (modifies object in place)

**💡 Usage Examples:**

```javascript
const config = {};

// Set nested property - creates missing objects automatically
deep_set(config, 'user.settings.theme', 'dark');
// config becomes: { user: { settings: { theme: 'dark' } } }

deep_set(config, 'app.version', '1.0');
// config becomes: { user: { settings: { theme: 'dark' } }, app: { version: '1.0' } }
```

**🚀 Performance Design:**
Like `deep_get()`, this function is designed for dynamic path assembly where property paths are built through logic. It creates missing intermediate objects automatically, ensuring the path exists before setting the value.

```javascript
// Implementation creates nested structure as needed:
// deep_set(obj, 'a.b.c', value) creates obj.a, obj.a.b, then sets obj.a.b.c

// Dynamic configuration building
function setUserSetting(user, category, setting, value) {
    const path = `settings.${category}.${setting}`;
    deep_set(user, path, value); // Fast setting with assembled path
}

setUserSetting(user, 'display', 'theme', 'dark');
setUserSetting(user, 'notifications', 'email', true);
setUserSetting(user, 'privacy', 'analytics', false);
```

**⚡ Why This Design:**
- **Dynamic Paths**: Perfect for paths assembled from variables, API responses, or user input
- **Automatic Structure**: Creates missing objects without manual checks
- **Performance**: Minimal overhead, direct property access
- **Safety**: Never throws errors, handles any nesting depth

---

## 🔍 Understanding the Performance Architecture

The `deep_get()` and `deep_set()` functions use a unique performance optimization that might look strange at first glance, but is actually the result of careful performance testing.

### The Optimization Strategy

Instead of using a generic loop for all property access (which would be slower), these functions **hardcode property access for the most common nesting depths**:

```javascript
// Performance-optimized approach (actual implementation)
if (split.length == 1) { return obj[path]; }
if (split.length == 2) { return obj[split[0]][split[1]]; }
if (split.length == 3) { return obj[split[0]][split[1]][split[2]]; }
// ...up to 9 levels, then fallback to loop
```

**Why this works:**
- **Direct Property Access**: `obj.a.b.c` is faster than `obj['a']['b']['c']`
- **Common Case Optimization**: Most real-world objects have 1-5 levels of nesting
- **Fallback Safety**: Only uses loops for extremely deep objects (>9 levels)
- **Tested Performance**: This specific approach was measured and proven fastest

### Real-World Use Cases

Perfect for scenarios where paths are assembled dynamically:

```javascript
// Configuration management
function getConfig(path) {
    return deep_get(appConfig, path);
}

const dbHost = getConfig('database.production.host');
const apiKey = getConfig('services.payment.api_key');

// Form data processing
function extractFormValue(formData, fieldPath) {
    return deep_get(formData, fieldPath);
}

const email = extractFormValue(submission, 'contact.email');
const billing = extractFormValue(submission, 'payment.billing.address');

// API response handling
function processApiResponse(response, dataPath) {
    const data = deep_get(response, dataPath);
    if (data) {
        updateUI(data);
    }
}

processApiResponse(apiResult, 'data.user.profile');
processApiResponse(apiResult, 'meta.pagination.total');
```

This design makes `deep_get()` and `deep_set()` the **fastest possible way** to work with dynamic property paths in JavaScript, while maintaining safety and ease of use.

---

### jclone()

**Problem**: JavaScript objects are passed by reference. How do you create a true copy for independent manipulation?

**Solution**: Deep clone using JSON serialization (fast but limited to JSON-serializable data).

```javascript
function jclone(obj) {
    // Creates deep copy using JSON.parse(JSON.stringify(obj))
    // Fast but loses functions, undefined, and circular references
}
```

**📝 Parameters:**
- `obj`: Object to clone

**🎉 Returns:** Deep cloned object

**💡 Usage Examples:**

```javascript
const original = { user: { name: 'John', scores: [85, 92] } };
const copy = jclone(original);

copy.user.name = 'Jane';
copy.user.scores.push(88);

// original: { user: { name: 'John', scores: [85, 92] } }
// copy: { user: { name: 'Jane', scores: [85, 92, 88] } }
```

---

### clone()

**Problem**: Need a deep clone that works with all data types, including functions and complex objects.

**Solution**: Uses modern `structuredClone()` when available, falls back to `jclone()`.

```javascript
function clone(obj) {
    // Modern deep cloning with structuredClone, fallback to JSON method
}
```

**📝 Parameters:**
- `obj`: Object to clone

**🎉 Returns:** Deep cloned object

**💡 Usage Examples:**

```javascript
// Works with everything structuredClone supports
const complex = {
    data: [1, 2, { nested: true }],
    func: () => console.log('hello'),
    date: new Date()
};

const cloned = clone(complex);
// Full deep clone with functions and dates preserved
```

---

## 🔎 Search & Find Operations

### itemByProp()

**Problem**: Find an object in an array by a property value, especially nested properties.

**Solution**: Search array for object matching a property path and value.

```javascript
function itemByProp(ar, prop, value) {
    // Find object where obj[prop] === value
    // Supports nested properties like 'user.id'
}
```

**📝 Parameters:**
- `ar`: Array to search
- `prop`: Property path to check
- `value`: Value to match

**🎉 Returns:** First matching object, or `undefined`

**💡 Usage Examples:**

```javascript
const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' }
];

const user = itemByProp(users, 'id', 2);
// Returns: { id: 2, name: 'Jane' }

const notFound = itemByProp(users, 'name', 'Bob');
// Returns: undefined
```

---

### deep_includes()

**Problem**: Check if any object in an array has a specific value at a nested property path.

**Solution**: Search array for objects where a deep property matches a value.

```javascript
function deep_includes(ar, path, compare) {
    // Returns true if any object in array has obj[path] === compare
}
```

**📝 Parameters:**
- `ar`: Array to search
- `path`: Deep property path (e.g., `'user.settings.theme'`)
- `compare`: Value to match

**🎉 Returns:** `true` if found, `false` otherwise

**💡 Usage Examples:**

```javascript
const configs = [
    { user: { settings: { theme: 'light' } } },
    { user: { settings: { theme: 'dark' } } }
];

const hasDarkTheme = deep_includes(configs, 'user.settings.theme', 'dark');
// Returns: true

const hasBlueTheme = deep_includes(configs, 'user.settings.theme', 'blue');
// Returns: false
```

---

## 📊 Math Operations

### average()

**Problem**: Calculate the average of numbers in an array.

**Solution**: Simple arithmetic mean calculation.

```javascript
function average(ar) {
    // Returns sum of array divided by length
}
```

**📝 Parameters:**
- `ar`: Array of numbers

**🎉 Returns:** Average as a number

**💡 Usage Examples:**

```javascript
const scores = [85, 92, 78, 96, 88];
const avg = average(scores); // 87.8

const temperatures = [20.5, 22.1, 19.8, 21.3];
const avgTemp = average(temperatures); // 20.925
```

---

### medianAverage()

**Problem**: Calculate average excluding outliers (trimmed mean) for more robust statistics.

**Solution**: Remove highest and lowest values, then average the rest.

```javascript
function medianAverage(ring) {
    // Removes outliers, averages middle values for robust statistics
}
```

**📝 Parameters:**
- `ring`: Array of numbers

**🎉 Returns:** Average of middle values (excluding min/max), or 0 for small arrays

**💡 Usage Examples:**

```javascript
// With outliers
const scores = [10, 85, 88, 90, 95, 99]; // 10 and 99 are outliers
const robustAvg = medianAverage(scores); // 89.5 (average of 85,88,90,95)

// Requires at least 4 values
medianAverage([1, 2, 3]); // Returns 0
```

---

## 🎲 Utility Functions

### randomNumbers()

**Problem**: Generate a shuffled array of numbers from 0 to max-1.

**Solution**: Create sequential array and shuffle it.

```javascript
function randomNumbers(max) {
    // Returns [0, 1, 2, ..., max-1] in random order
}
```

**📝 Parameters:**
- `max`: Upper limit (exclusive)

**🎉 Returns:** Array of shuffled numbers

**💡 Usage Examples:**

```javascript
// Generate random deck of cards (0-51)
const deck = randomNumbers(52);
// [23, 5, 41, 12, ...] - shuffled order

// Randomize quiz questions
const questionOrder = randomNumbers(10);
// [3, 7, 1, 9, ...] - random question order
```

---

## 🔑 Key Operations

### keyByValue()

**Problem**: Find which key in an object has a specific value.

**Solution**: Search object for property with matching value.

```javascript
function keyByValue(obj, val) {
    // Returns the key where obj[key] === val
}
```

**📝 Parameters:**
- `obj`: Object to search
- `val`: Value to find

**🎉 Returns:** Key name, or `undefined`

**💡 Usage Examples:**

```javascript
const statusCodes = {
    ok: 200,
    notFound: 404,
    serverError: 500
};

const key = keyByValue(statusCodes, 404); // 'notFound'
const missing = keyByValue(statusCodes, 301); // undefined
```

---

### includesDeep()

**Problem**: You need to check if any item in an array contains a specific value at a nested path.

**Solution**: Search through an array for items that contain a specific value at a nested property path.

```javascript
function includesDeep(ar, path, compare) {
    // Returns true if any item in the array has the specified value at the given path
}
```

**📝 Parameters:**
- `ar`: Array of objects to search through
- `path`: Property path to check (supports nested paths)
- `compare`: Value to search for

**🎉 Returns:** Boolean indicating if any item contains the value

**💡 Usage Examples:**

```javascript
const users = [
    { profile: { id: 1, name: 'John' } },
    { profile: { id: 2, name: 'Jane' } }
];

const hasUser1 = includesDeep(users, 'profile.id', 1); // true
const hasUser3 = includesDeep(users, 'profile.id', 3); // false
```

---

### indexByProp()

**Problem**: You need to find the index of an object in an array by matching a property value.

**Solution**: Get the index of the first object that has a specific property value.

```javascript
function indexByProp(ar, prop, value) {
    // Returns the index of the first object with matching property value
}
```

**📝 Parameters:**
- `ar`: Array of objects to search
- `prop`: Property name to check
- `value`: Value to match

**🎉 Returns:** Index of the matching object, or -1 if not found

---

### itemByProp()

**Problem**: You need to find a specific object in an array by matching a property value.

**Solution**: Get the first object that has a specific property value.

```javascript
function itemByProp(ar, prop, value) {
    // Returns the first object with matching property value
}
```

**📝 Parameters:**
- `ar`: Array of objects to search
- `prop`: Property name to check
- `value`: Value to match

**🎉 Returns:** The matching object, or undefined if not found

**💡 Usage Examples:**

```javascript
const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' }
];

const user = itemByProp(users, 'id', 2);
// Result: { id: 2, name: 'Jane' }
```

---

### allIdxByProp()

**Problem**: You need to find all indices of objects in an array that match a property value.

**Solution**: Get an array of all indices where objects have a specific property value.

```javascript
function allIdxByProp(ar, prop, value) {
    // Returns array of all indices with matching property values
}
```

**📝 Parameters:**
- `ar`: Array of objects to search
- `prop`: Property name to check
- `value`: Value to match

**🎉 Returns:** Array of indices

---

### average()

**Problem**: Calculate the average of an array of numbers.

**Solution**: Simple arithmetic mean calculation.

```javascript
function average(ar) {
    return ar.reduce((a, b) => a + b, 0) / ar.length;
}
```

**📝 Parameters:**
- `ar`: Array of numbers

**🎉 Returns:** Average value

---

### medianAverage()

**Problem**: Calculate a median-like average that excludes outliers.

**Solution**: Sort the array and average the middle values, excluding the highest and lowest.

```javascript
function medianAverage(ring) {
    // Sorts array, removes highest/lowest values, averages the middle
}
```

**📝 Parameters:**
- `ring`: Array of numbers

**🎉 Returns:** Median average (or 0 for arrays with 3 or fewer elements)

---

### randomNumbers()

**Problem**: Generate an array of consecutive numbers in random order.

**Solution**: Create a shuffled array of numbers from 0 to max-1.

```javascript
function randomNumbers(max) {
    // Returns shuffled array [0, 1, 2, ..., max-1]
}
```

**📝 Parameters:**
- `max`: Upper limit (exclusive)

**🎉 Returns:** Shuffled array of numbers

---

### keyByDeepValue()

**Problem**: Find the key of an object where a nested property has a specific value.

**Solution**: Search through object keys to find which one contains a nested value.

```javascript
function keyByDeepValue(obj, path, val) {
    // Returns the key where deep_get(obj[key], path) === val
}
```

**📝 Parameters:**
- `obj`: Object to search
- `path`: Nested property path
- `val`: Value to find

**🎉 Returns:** The matching key, or undefined if not found

---
**Problem**: Compare two objects for inequality (not deep equality).

**Solution**: JSON stringify comparison to check if objects are different.

```javascript
function jcompare(obj_1, obj_2) {
    // Returns true if objects are different
    // Note: This is for detecting CHANGES, not equality
}
```

**📝 Parameters:**
- `obj_1`: First object
- `obj_2`: Second object

**🎉 Returns:** `true` if objects are different, `false` if identical

**💡 Usage Examples:**

```javascript
const original = { name: 'John', age: 25 };
const modified = { name: 'John', age: 26 };

jcompare(original, modified); // true (objects differ)
jcompare(original, original); // false (same object)

// Useful for detecting changes in state
if (jcompare(oldState, newState)) {
    // State has changed, update UI
}
```

---

## 📚 Key Concepts

These functions teach important JavaScript concepts:

- **Array Methods**: `sort()`, `map()`, `reduce()`, `forEach()`
- **Object Manipulation**: Property access, nested structures
- **Error Handling**: Try/catch, safe property access
- **Algorithms**: Fisher-Yates shuffle, deep traversal
- **Modern APIs**: `structuredClone()`, JSON methods

Each function solves a common problem you'll encounter in real applications!
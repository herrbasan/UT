# Data Manipulation Utilities

Functions for working with arrays and objects - the building blocks of JavaScript data processing.

## 📑 Table of Contents

- [Array Operations](#-array-operations)
  - [sortByKey()](#sortbykey) - Sort arrays of objects by property path
  - [arrayToObject()](#arraytoobject) - Convert arrays to keyed objects
  - [shuffleArray()](#shufflearray) - Randomize array order
- [Deep Property Access](#-deep-property-access)
  - [deep_get()](#deep_get) - Access nested properties with dynamic paths
  - [deep_set()](#deep_set) - Set nested properties with dynamic paths
  - [deep_includes()](#deep_includes) - Search arrays with dynamic paths
  - [keyByDeepValue()](#keybydeepvalue) - Find keys by nested values
  - [Performance Architecture](#-understanding-the-performance-architecture) - How deep functions are optimized
- [Object Operations](#-object-operations)
  - [jclone()](#jclone) - Fast JSON-based deep clone
  - [clone()](#clone) - Modern deep clone with fallback
- [Search & Find Operations](#-search--find-operations)
  - [itemByProp()](#itembyprop) - Find item by property value
  - [indexByProp()](#indexbyprop) - Find index by property value
  - [allIdxByProp()](#allidxbyprop) - Find all indices by property value
- [Math Operations](#-math-operations)
  - [average()](#average) - Calculate arithmetic mean
  - [medianAverage()](#medianaverage) - Calculate median value
- [Utility Functions](#-utility-functions)
  - [randomNumbers()](#randomnumbers) - Generate random number array
- [Key Operations](#-key-operations)
  - [keyByValue()](#keybyvalue) - Find key by value
  - [jcompare()](#jcompare) - Compare objects for inequality

---

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

## 🔍 Deep Property Access

All functions in this section solve the same core problem: **accessing or manipulating nested object properties using dynamic path strings** that are determined at runtime (from configuration, user input, or business logic).

### deep_get()

**Problem**: You need to access nested object properties using a path that's determined at runtime (from config, user input, or business logic). You can't use hardcoded dot notation like `obj.user.settings.theme` because the path is stored as a string or built dynamically.

**Solution**: `deep_get()` takes a string path like `'user.settings.theme'` and safely traverses the object, returning `undefined` if any part doesn't exist.

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

**💡 Without deep_get() - Can't use dynamic paths:**

```javascript
const config = {
    api: { endpoints: { users: '/api/users' } },
    ui: { theme: { primary: '#3366cc' } }
};

// Path comes from configuration or user selection
const settingPath = 'ui.theme.primary'; // determined at runtime

// ❌ Can't do this - it's a string, not actual property access
const value = config[settingPath]; // undefined - doesn't work!

// ❌ Can't do this either - you don't know the depth ahead of time
const value = config.ui.theme.primary; // hardcoded, not dynamic
```

**✅ With deep_get() - Dynamic paths work perfectly:**

```javascript
// ✅ Path is built dynamically at runtime
const settingPath = 'ui.theme.primary';
const value = deep_get(config, settingPath); // '#3366cc'

// ✅ Safely returns undefined for missing paths
const missing = deep_get(config, 'ui.missing.deep.path'); // undefined (no error!)
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

**Problem**: You need to set a nested property using a dynamic path string. With regular JavaScript, you'd have to manually check and create each level, which is tedious and error-prone.

**Solution**: `deep_set()` takes a string path and value, automatically creating any missing intermediate objects along the way.

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

**💡 Without deep_set() - Manual path creation is tedious:**

```javascript
const config = {};
const settingPath = 'database.connection.timeout'; // from configuration file
const value = 5000;

// ❌ Can't use dynamic path directly
config[settingPath] = value; // Doesn't work - creates wrong structure!

// ❌ Have to manually check and create each level
const parts = settingPath.split('.');
if (!config[parts[0]]) config[parts[0]] = {};
if (!config[parts[0]][parts[1]]) config[parts[0]][parts[1]] = {};
config[parts[0]][parts[1]][parts[2]] = value;
// Verbose, error-prone, doesn't scale to unknown depths
```

**✅ With deep_set() - Clean dynamic path setting:**

```javascript
const config = {};

// ✅ Set nested property from dynamic path - creates structure automatically
deep_set(config, 'database.connection.timeout', 5000);
// config becomes: { database: { connection: { timeout: 5000 } } }

// ✅ Perfect for configuration builders
const settings = [
    { path: 'api.baseUrl', value: 'https://api.example.com' },
    { path: 'api.timeout', value: 3000 },
    { path: 'ui.theme.primary', value: '#3366cc' }
];

const config = {};
settings.forEach(({ path, value }) => {
    deep_set(config, path, value);
});
// All nested structures created automatically!

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

### deep_includes()

**Problem**: You need to check if any object in an array has a specific value at a nested property, but the property path is dynamic (from configuration or user input).

**Solution**: `deep_includes()` searches an array using a dynamic path string, returning `true` if any object matches. This is `deep_get()` applied to array searching.

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

**💡 Without deep_includes() - Can't use dynamic paths:**

```javascript
const users = [
    { profile: { preferences: { theme: 'light' } } },
    { profile: { preferences: { theme: 'dark' } } }
];

const searchPath = 'profile.preferences.theme'; // from filter config
const searchValue = 'dark';

// ❌ Can't use dynamic path with standard array methods
const found = users.some(u => u[searchPath] === searchValue); // doesn't work!

// ❌ Would need to hardcode the path
const found = users.some(u => u.profile.preferences.theme === searchValue); // not dynamic!
```

**✅ With deep_includes() - Dynamic path search works:**

```javascript
// ✅ Search using dynamic path
const searchPath = 'profile.preferences.theme';
const hasDarkTheme = deep_includes(users, searchPath, 'dark'); // true

// ✅ Perfect for dynamic filters
function hasUserWithSetting(users, settingPath, value) {
    return deep_includes(users, settingPath, value);
}

hasUserWithSetting(users, 'profile.preferences.theme', 'dark'); // true
hasUserWithSetting(users, 'profile.preferences.language', 'es'); // false
```

---

### keyByDeepValue()

**Problem**: You need to find which key in an object contains a specific value at a nested property path, but the path is dynamic.

**Solution**: `keyByDeepValue()` searches through an object's keys using a dynamic path string, returning the key where the nested value matches. This is `deep_get()` applied to reverse lookup.

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

**💡 Without keyByDeepValue() - Can't search with dynamic paths:**

```javascript
const servers = {
    prod: { config: { region: 'us-east', status: 'active' } },
    staging: { config: { region: 'us-west', status: 'active' } },
    dev: { config: { region: 'eu-west', status: 'inactive' } }
};

const searchPath = 'config.region'; // from search filter
const searchValue = 'us-west';

// ❌ Can't use dynamic path with Object methods
const key = Object.keys(servers).find(k => servers[k][searchPath] === searchValue); // doesn't work!

// ❌ Would need to hardcode the path
const key = Object.keys(servers).find(k => servers[k].config.region === searchValue); // not dynamic!
```

**✅ With keyByDeepValue() - Dynamic path search works:**

```javascript
// ✅ Find key using dynamic path
const searchPath = 'config.region';
const serverKey = keyByDeepValue(servers, searchPath, 'us-west'); // 'staging'

// ✅ Perfect for dynamic lookups
function findServerByProperty(servers, propertyPath, value) {
    return keyByDeepValue(servers, propertyPath, value);
}

findServerByProperty(servers, 'config.region', 'eu-west'); // 'dev'
findServerByProperty(servers, 'config.status', 'active'); // 'prod' (finds first match)
```

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

## 📦 Object Operations

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

const missing = itemByProp(users, 'name', 'Bob');
// Returns: undefined
```

---

### indexByProp()

**Problem**: Find the index position of an object in an array by matching a property value.

**Solution**: Get the array index of the first object that has a specific property value.

```javascript
function indexByProp(ar, prop, value) {
    // Returns the index of first object where obj[prop] === value
}
```

**📝 Parameters:**
- `ar`: Array of objects to search
- `prop`: Property path to check (supports nested paths)
- `value`: Value to match

**🎉 Returns:** Index of the matching object, or -1 if not found

**💡 Usage Examples:**

```javascript
const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Bob' }
];

const index = indexByProp(users, 'id', 2); // 1
const notFound = indexByProp(users, 'id', 99); // -1

// Use with splice to remove by ID
const removeIndex = indexByProp(users, 'id', 2);
if (removeIndex !== -1) {
    users.splice(removeIndex, 1);
}
```

---

### allIdxByProp()

**Problem**: Find all positions where objects in an array have a specific property value (when duplicates exist).

**Solution**: Get an array of all indices where objects match a property value.

```javascript
function allIdxByProp(ar, prop, value) {
    // Returns array of all indices where obj[prop] === value
}
```

**📝 Parameters:**
- `ar`: Array of objects to search
- `prop`: Property path to check
- `value`: Value to match

**🎉 Returns:** Array of indices (empty array if none found)

**💡 Usage Examples:**

```javascript
const tasks = [
    { id: 1, status: 'complete' },
    { id: 2, status: 'pending' },
    { id: 3, status: 'complete' },
    { id: 4, status: 'complete' }
];

const completeIndices = allIdxByProp(tasks, 'status', 'complete');
// Returns: [0, 2, 3]

// Remove all matching items
const indicesToRemove = allIdxByProp(tasks, 'status', 'complete');
indicesToRemove.reverse().forEach(idx => tasks.splice(idx, 1));
// Removes from end to start to maintain correct indices
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

### jcompare()

**Problem**: Compare two objects for inequality (detect if objects are different).

**Solution**: JSON stringify comparison to check if objects differ.

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

## 📚 Summary

The data module provides comprehensive tools for:

- **Array Operations**: Sorting, shuffling, searching, indexing
- **Object Operations**: Deep access, cloning, key/value lookups
- **Math Operations**: Averages, medians, random numbers
- **Search & Filter**: Finding items by property values

These functions form the foundation for data processing in JavaScript applications, handling common patterns like:
- Safe nested property access without errors
- Efficient object-to-array transformations
- Robust statistical calculations
- Fast lookups and searches

Each function is optimized for real-world usage with minimal overhead.
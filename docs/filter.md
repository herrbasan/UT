# Data Filtering Utilities

Functions for filtering arrays of objects with complex conditions, search terms, and high-performance operations.

## 🔍 Condition Matching

### match()

**Problem**: Test single values against various comparison conditions.

**Solution**: Flexible matching function supporting equality, comparison, and text operations.

```javascript
function match(item, condition, value) {
    // Tests if item matches value using specified condition
}
```

**📝 Parameters:**
- `item`: Value to test
- `condition`: Comparison operator (see available conditions below)
- `value`: Value to compare against

**🎉 Returns:** Boolean

**Available Conditions:**
- `'=='`: Loose equality (`a == b`)
- `'!='`: Loose inequality (`a != b`)
- `'>'`: Greater than (numeric)
- `'<'`: Less than (numeric)
- `'>='`: Greater than or equal (numeric)
- `'<='`: Less than or equal (numeric)
- `'contains'`: String contains substring
- `'!contains'`: String does not contain substring
- `'includes'`: Array includes value
- `'contains_any'`: String contains any of array values (comma-separated)
- `'contains_all'`: String contains all of array values (comma-separated)
- `'is'`: Strict equality (`a === b`)
- `'!is'`: Strict inequality (`a !== b`)

**💡 Usage Examples:**

```javascript
// Basic comparisons
match(5, '>', 3);                    // true
match('hello', 'contains', 'ell');   // true
match('hello', '!contains', 'xyz');  // true
match([1,2,3], 'includes', 2);       // true

// String array matching
match('red,blue,green', 'contains_any', ['blue', 'yellow']);  // true
match('red,blue,green', 'contains_all', ['red', 'blue']);     // true
match('red,blue,green', 'contains_all', ['red', 'yellow']);   // false

// Numeric comparisons
match(100, '>=', 100);               // true
match('100', '>', '50');             // true (auto-converts to numbers)
```

---

## 🚀 High-Performance Filtering

### turboFilter()

**Problem**: Filter large arrays of objects by multiple conditions efficiently.

**Solution**: Optimized filtering with deep property access and case-insensitive options.

```javascript
function turboFilter(data, conditions, ignoreCase = false) {
    // Filters array using multiple conditions with high performance
}
```

**📝 Parameters:**
- `data`: Array of objects to filter
- `conditions`: Object with property paths as keys and condition objects as values
- `ignoreCase`: Global case-insensitive flag (can be overridden per condition)

**Condition Object Format:**
```javascript
{
    condition: 'contains',  // Match condition (see match() for options)
    value: 'search term',   // Value to match against
    ignoreCase: true        // Optional: override global ignoreCase
}
```

**🎉 Returns:** Array of matching objects

**💡 Usage Examples:**

```javascript
const users = [
    { name: 'John', age: 25, city: 'NYC', skills: ['js', 'react'] },
    { name: 'Jane', age: 30, city: 'LA', skills: ['python', 'django'] },
    { name: 'Bob', age: 35, city: 'NYC', skills: ['js', 'vue'] }
];

// Single condition
const nycUsers = turboFilter(users, {
    'city': { condition: '==', value: 'NYC' }
});
// Returns John and Bob

// Multiple conditions (AND logic - all must match)
const experiencedNYC = turboFilter(users, {
    'city': { condition: '==', value: 'NYC' },
    'age': { condition: '>=', value: 30 }
});
// Returns Bob

// Deep property access
const jsDevs = turboFilter(users, {
    'skills': { condition: 'includes', value: 'js' }
});
// Returns John and Bob

// Case-insensitive search
const johnUsers = turboFilter(users, {
    'name': { condition: 'contains', value: 'JOHN' }
}, true); // Global ignore case
// Returns John

// Per-condition case sensitivity
const mixedCase = turboFilter(users, {
    'name': { condition: 'contains', value: 'JOHN', ignoreCase: true },
    'city': { condition: '==', value: 'NYC', ignoreCase: false }
});
// Case-insensitive name search, case-sensitive city match
```

---

## 📊 Advanced Filtering Examples

### Complex Multi-Condition Filtering

```javascript
// E-commerce product filtering
const products = [
    { name: 'Laptop', price: 999, category: 'electronics', brand: 'Dell', rating: 4.5 },
    { name: 'Phone', price: 699, category: 'electronics', brand: 'Apple', rating: 4.8 },
    { name: 'Book', price: 29, category: 'books', brand: 'Penguin', rating: 4.2 }
];

const filtered = turboFilter(products, {
    'category': { condition: '==', value: 'electronics' },
    'price': { condition: '<=', value: 800 },
    'rating': { condition: '>=', value: 4.5 },
    'brand': { condition: 'contains', value: 'Apple', ignoreCase: true }
});
// Returns only the Phone (meets all criteria)
```

### Text Search Across Multiple Fields

```javascript
// Search users by name or email
const searchTerm = 'john';
const searchResults = turboFilter(users, {
    'name': { condition: 'contains', value: searchTerm, ignoreCase: true },
    'email': { condition: 'contains', value: searchTerm, ignoreCase: true }
});
// Note: This uses AND logic - both conditions must match
// For OR logic, you'd need separate turboFilter calls
```

### Tag-Based Filtering

```javascript
// Filter by tags (array contains)
const articles = [
    { title: 'JS Guide', tags: ['javascript', 'programming', 'tutorial'] },
    { title: 'React Tips', tags: ['react', 'javascript', 'frontend'] },
    { title: 'Python Basics', tags: ['python', 'programming'] }
];

const jsArticles = turboFilter(articles, {
    'tags': { condition: 'includes', value: 'javascript' }
});
// Returns first two articles
```

---

## 🔄 Legacy Support

### filter() [Deprecated]

**Problem**: Maintain backward compatibility with older code.

**Solution**: Deprecated function that converts old format to turboFilter calls.

```javascript
// Old format (still works but deprecated)
const results = filter({
    data: users,
    prop: ['name', 'city'],     // Properties to search
    search: 'NYC',              // Search term
    ignore_case: true,          // Case insensitive
    return_index_only: false    // Return objects or indices
});

// New recommended format
const results = turboFilter(users, {
    'name': { condition: 'contains', value: 'NYC', ignoreCase: true },
    'city': { condition: 'contains', value: 'NYC', ignoreCase: true }
});
```

---

## 📚 Key Concepts

These functions teach advanced programming concepts:

- **Functional Programming**: Higher-order functions, condition objects
- **Performance Optimization**: Cached conditions, minimized object access
- **Deep Property Access**: Nested object traversal (uses deep_get internally)
- **Type Coercion**: Automatic string/number conversion for comparisons
- **Error Handling**: Try/catch blocks, validation, warnings
- **Algorithm Design**: Multiple condition evaluation, short-circuiting
- **Data Structures**: Condition objects, result caching

Master these utilities and you'll handle complex data filtering scenarios with ease!
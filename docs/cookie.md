# Cookie Utilities

Functions for managing browser cookies with expiration, path settings, and validation.

## 🍪 Cookie Operations

### getCookies()

**Problem**: Access all browser cookies as a usable object instead of raw string.

**Solution**: Parse document.cookie into key-value object.

```javascript
function getCookies() {
    // Returns object with all cookie names and values
}
```

**📝 Parameters:** None

**🎉 Returns:** Object with cookie names as keys and decoded values as values

**💡 Usage Examples:**

```javascript
const allCookies = getCookies();
console.log(allCookies);
// { 'session_id': 'abc123', 'theme': 'dark', 'visited': 'true' }

// Check for specific cookies
if (allCookies.theme) {
    applyTheme(allCookies.theme);
}

// Iterate through cookies
for (const [name, value] of Object.entries(allCookies)) {
    console.log(`${name}: ${value}`);
}
```

---

### getCookie()

**Problem**: Retrieve specific cookie value with proper decoding.

**Solution**: Find and decode specific cookie from document.cookie.

```javascript
function getCookie(cname) {
    // Returns value of specific cookie or empty string if not found
}
```

**📝 Parameters:**
- `cname`: Cookie name to retrieve

**🎉 Returns:** Cookie value (decoded) or empty string

**💡 Usage Examples:**

```javascript
const userId = getCookie('user_id');
if (userId) {
    console.log('Logged in as user:', userId);
} else {
    console.log('No user session found');
}

// Get preferences
const theme = getCookie('theme') || 'light';
const language = getCookie('lang') || 'en';
```

---

### setCookie()

**Problem**: Set cookies with expiration time and path settings.

**Solution**: Create cookie with proper formatting and expiration.

```javascript
function setCookie(name, value, hours, path = '') {
    // Sets cookie with expiration and path
}
```

**📝 Parameters:**
- `name`: Cookie name
- `value`: Cookie value (will be URI encoded)
- `hours`: Hours until expiration
- `path`: Cookie path (default: root '/')

**🎉 Returns:** Nothing (sets cookie in browser)

**💡 Usage Examples:**

```javascript
// Session cookie (24 hours)
setCookie('session_id', 'abc123', 24);

// User preference (30 days)
setCookie('theme', 'dark', 720);

// Language setting (1 year)
setCookie('language', 'en', 8760);

// Path-specific cookie
setCookie('cart_items', '3', 24, 'shop');
```

---

### deleteCookie()

**Problem**: Remove cookies by setting expiration to past date.

**Solution**: Expire cookie immediately to remove it.

```javascript
function deleteCookie(cname, path = '') {
    // Removes cookie by expiring it
}
```

**📝 Parameters:**
- `cname`: Cookie name to delete
- `path`: Cookie path (must match the path used when setting)

**🎉 Returns:** Nothing (removes cookie from browser)

**💡 Usage Examples:**

```javascript
// Delete session cookie
deleteCookie('session_id');

// Delete path-specific cookie
deleteCookie('cart_items', 'shop');

// Clear all user data
deleteCookie('user_id');
deleteCookie('preferences');
deleteCookie('theme');
```

---

### checkCookie()

**Problem**: Check if cookie exists, optionally with specific value.

**Solution**: Verify cookie presence and optionally match value.

```javascript
function checkCookie(cname, value) {
    // Returns true if cookie exists (and matches value if provided)
}
```

**📝 Parameters:**
- `cname`: Cookie name to check
- `value`: Optional value to match

**🎉 Returns:** Boolean

**💡 Usage Examples:**

```javascript
// Check if user is logged in
if (checkCookie('session_id')) {
    showDashboard();
} else {
    showLogin();
}

// Check for specific theme
if (checkCookie('theme', 'dark')) {
    enableDarkMode();
}

// Check for feature flag
if (checkCookie('beta_features', 'enabled')) {
    showBetaFeatures();
}
```

---

## 🛡️ Cookie Security & Best Practices

### Secure Cookie Handling

```javascript
// Set secure session cookie
function setSecureSession(userId) {
    setCookie('session_id', userId, 24); // 24 hours
    setCookie('last_login', new Date().toISOString(), 24);
}

// Validate session
function validateSession() {
    const sessionId = getCookie('session_id');
    const lastLogin = getCookie('last_login');

    if (!sessionId) return false;

    // Check if session is expired (example: 24 hours)
    const loginTime = new Date(lastLogin);
    const now = new Date();
    const hoursSinceLogin = (now - loginTime) / (1000 * 60 * 60);

    if (hoursSinceLogin > 24) {
        deleteCookie('session_id');
        deleteCookie('last_login');
        return false;
    }

    return true;
}

// Clean up on logout
function logout() {
    deleteCookie('session_id');
    deleteCookie('last_login');
    deleteCookie('user_preferences');
}
```

### User Preferences

```javascript
// Save user preferences
function savePreferences(prefs) {
    setCookie('theme', prefs.theme, 8760); // 1 year
    setCookie('language', prefs.language, 8760);
    setCookie('notifications', prefs.notifications, 8760);
}

// Load user preferences
function loadPreferences() {
    return {
        theme: getCookie('theme') || 'light',
        language: getCookie('language') || 'en',
        notifications: checkCookie('notifications', 'enabled')
    };
}

// Apply preferences on page load
document.addEventListener('DOMContentLoaded', () => {
    const prefs = loadPreferences();
    applyTheme(prefs.theme);
    setLanguage(prefs.language);
    if (prefs.notifications) enableNotifications();
});
```

---

## 📚 Key Concepts

These functions teach web development fundamentals:

- **HTTP Cookies**: Client-side storage, expiration, path settings
- **URI Encoding**: `encodeURI()`, `decodeURIComponent()` for special characters
- **Date Manipulation**: Setting future expiration dates
- **String Parsing**: Splitting and trimming cookie strings
- **Browser APIs**: `document.cookie` interface
- **State Management**: Session handling, user preferences
- **Security**: Cookie validation, expiration checking

Master these utilities and you'll handle user sessions and preferences effectively!
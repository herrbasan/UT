# HTTP Request Utilities

Functions for making HTTP requests with modern features like progress tracking, timeouts, and automatic error handling.

## 📑 Table of Contents

- [Main Fetch Function](#-main-fetch-function)
  - [fetch()](#fetch) - HTTP requests with progress & timeouts
  - [readJson()](#readjson) - Simplified JSON fetching
- [Progress Tracking](#-progress-tracking)
  - [trackProgress()](#trackprogress) - Monitor download progress

---

## 🌐 Main Fetch Function

### fetch()

**Problem**: Browser's native fetch() lacks progress tracking, automatic timeouts, and convenient data handling.

**Solution**: Enhanced fetch with progress callbacks, timeout handling, and smart data serialization.

```javascript
function fetch(url, data = {}, options = {}) {
    // Enhanced HTTP requests with modern features
}
```

**📝 Parameters:**
- `url`: Request URL
- `data`: Request data (query params for GET, body for POST)
- `options`: Configuration object

**Options:**
- `method`: HTTP method ('GET', 'POST', 'PUT', 'DELETE')
- `responseType`: Response format ('json', 'text', 'blob')
- `credentials`: Credentials mode ('same-origin', 'include', 'omit')
- `timeout`: Request timeout in milliseconds (default: 10000)
- `onProgress`: Progress callback function

**🎉 Returns:** Promise that resolves to response data or error object

**💡 Usage Examples:**

```javascript
// Simple GET request
fetch('https://api.example.com/users')
    .then(users => console.log(users))
    .catch(err => console.error(err));

// GET with query parameters
fetch('https://api.example.com/search', { q: 'javascript', limit: 10 })
    .then(results => console.log(results));

// POST with data
fetch('https://api.example.com/users', {
    name: 'John Doe',
    email: 'john@example.com'
}, { method: 'POST' })
.then(response => console.log('User created:', response));

// File upload with progress
const formData = new FormData();
formData.append('file', fileInput.files[0]);

fetch('/upload', formData, {
    method: 'POST',
    responseType: 'json',
    onProgress: (progress) => {
        console.log(`${progress.loaded}/${progress.total} bytes`);
        const percent = Math.round(progress.progress * 100);
        progressBar.style.width = percent + '%';
    }
}).then(result => console.log('Upload complete'));
```

---

### readJson()

**Problem**: Quickly fetch JSON data without extra configuration.

**Solution**: Simple wrapper for GET JSON requests.

```javascript
function readJson(url, options) {
    // Simple JSON fetching with optional configuration
}
```

**📝 Parameters:**
- `url`: JSON endpoint URL
- `options`: Additional fetch options (timeout, credentials, etc.)

**🎉 Returns:** Promise that resolves to parsed JSON

**💡 Usage Examples:**

```javascript
// Fetch user data
readJson('https://api.example.com/user/123')
    .then(user => {
        console.log('User:', user.name);
    });

// With custom timeout
readJson('/api/config', { timeout: 5000 })
    .then(config => applySettings(config));
```

---

## 🔄 Progress Tracking

### trackProgress() [Internal]

**Problem**: Large file downloads need progress indicators.

**Solution**: Streams API to track download progress byte-by-byte.

```javascript
// Used internally by fetch() when onProgress is provided
// Tracks download progress and reports to callback
```

**Progress Callback Format:**
```javascript
function onProgress(progress) {
    // progress object structure:
    // {
    //   loaded: number,    // Bytes downloaded so far
    //   total: number,     // Total bytes (if known)
    //   progress: number,  // Progress ratio (0-1, null if unknown)
    //   complete: boolean  // True when download finished
    // }
}
```

**💡 Usage Examples:**

```javascript
// Download large file with progress bar
fetch('/large-video.mp4', {}, {
    responseType: 'blob',
    onProgress: (p) => {
        if (p.progress !== null) {
            const percent = Math.round(p.progress * 100);
            progressBar.style.width = percent + '%';
            progressText.textContent = `${percent}%`;
        } else {
            // Unknown total size
            progressText.textContent = `${(p.loaded / 1024 / 1024).toFixed(1)} MB`;
        }

        if (p.complete) {
            console.log('Download finished!');
        }
    }
}).then(videoBlob => {
    // Use the downloaded video
    const videoUrl = URL.createObjectURL(videoBlob);
    videoElement.src = videoUrl;
});
```

---

## 🛠️ Advanced Features

### Timeout Handling

Requests automatically timeout after 10 seconds (configurable):

```javascript
fetch('/slow-api', {}, { timeout: 30000 }) // 30 second timeout
    .then(data => console.log(data))
    .catch(err => {
        if (err.name === 'AbortError') {
            console.log('Request timed out');
        }
    });
```

### Error Handling

All errors are caught and returned as objects:

```javascript
fetch('/api/users')
    .then(result => {
        if (result.error) {
            console.error('API Error:', result.error);
        } else {
            console.log('Success:', result);
        }
    });
```

### Automatic Data Serialization

- **GET requests**: Data becomes URL query parameters
- **POST/PUT requests**: Data becomes FormData automatically
- **FormData**: Passed through unchanged
- **Other types**: Passed as request body

```javascript
// Object -> FormData automatically
fetch('/api/update', {
    id: 123,
    name: 'New Name',
    active: true
}, { method: 'POST' });

// File upload
const formData = new FormData();
formData.append('avatar', fileInput.files[0]);
fetch('/upload', formData, { method: 'POST' });
```

### Response Types

Three response formats supported:

```javascript
// JSON (default)
fetch('/api/data').then(obj => console.log(typeof obj)); // 'object'

// Text
fetch('/api/html', {}, { responseType: 'text' })
    .then(html => document.body.innerHTML = html);

// Binary data
fetch('/api/image', {}, { responseType: 'blob' })
    .then(blob => {
        const img = new Image();
        img.src = URL.createObjectURL(blob);
    });
```

---

## 📚 Key Concepts

These functions teach modern web development concepts:

- **Promises**: Asynchronous programming with .then()/.catch()
- **Fetch API**: Modern replacement for XMLHttpRequest
- **Streams API**: Reading response data in chunks
- **AbortController**: Request cancellation and timeouts
- **FormData**: Multipart form data for file uploads
- **URLSearchParams**: URL query string building
- **Progress Tracking**: Download/upload progress monitoring
- **Error Handling**: Network errors, timeouts, HTTP status codes
- **Content Types**: JSON, text, binary data handling

Master these utilities and you'll handle 90% of web API communication scenarios!
# File Utilities

Functions for working with filenames, extensions, URLs, and file type detection.

## � Table of Contents

- [Filename Operations](#-filename-operations)
  - [getExtension()](#getextension) - Extract file extension
  - [removeExtension()](#removeextension) - Strip extension from filename
  - [urlGetLast()](#urlgetlast) - Get last segment of path/URL
- [File Type Detection](#-file-type-detection)
  - [isFileType()](#isfiletype) - Check if file matches types
  - [getMediaType()](#getmediatype) - Detect media category

---

## �📁 Filename Operations

### getExtension()

**Problem**: Extract file extension from filename for type checking or processing.

**Solution**: Split filename by dots and return the last part.

```javascript
function getExtension(filename) {
    // Returns the file extension (without the dot)
}
```

**📝 Parameters:**
- `filename`: Filename or path

**🎉 Returns:** File extension string (lowercase)

**💡 Usage Examples:**

```javascript
getExtension('document.pdf');        // 'pdf'
getExtension('image.png');           // 'png'
getExtension('archive.tar.gz');      // 'gz'
getExtension('no-extension');        // 'no-extension' (no dot found)
getExtension('/path/to/file.js');    // 'js'
```

---

### removeExtension()

**Problem**: Get filename without extension for renaming or processing.

**Solution**: Remove everything after the last dot.

```javascript
function removeExtension(filename) {
    // Returns filename without extension
}
```

**📝 Parameters:**
- `filename`: Filename or path

**🎉 Returns:** Filename without extension

**💡 Usage Examples:**

```javascript
removeExtension('document.pdf');        // 'document'
removeExtension('image.png');           // 'image'
removeExtension('archive.tar.gz');      // 'archive.tar'
removeExtension('no-extension');        // 'no-extension'
removeExtension('/path/to/file.js');    // '/path/to/file'
```

---

## 🌐 URL Operations

### urlGetLast()

**Problem**: Extract filename or last segment from URL path.

**Solution**: Split URL by separator and return last part.

```javascript
function urlGetLast(url, sep = '/') {
    // Returns the last segment of a URL
}
```

**📝 Parameters:**
- `url`: URL string
- `sep`: Separator character (default: '/')

**🎉 Returns:** Last URL segment

**💡 Usage Examples:**

```javascript
urlGetLast('https://example.com/path/file.pdf');     // 'file.pdf'
urlGetLast('https://example.com/folder/');           // '' (ends with separator)
urlGetLast('/local/path/to/file.js');                // 'file.js'
urlGetLast('query?param=value&file=test.txt', '&');  // 'file=test.txt'
```

---

## 🔍 File Type Detection

### isFileType()

**Problem**: Check if a file matches specific extensions for filtering or validation.

**Solution**: Compare file extension against array of allowed types.

```javascript
function isFileType(filename, types) {
    // Returns true if file extension matches any of the types
}
```

**📝 Parameters:**
- `filename`: Filename to check
- `types`: Array of extensions (with or without dots)

**🎉 Returns:** Boolean

**💡 Usage Examples:**

```javascript
// Check single type
isFileType('photo.jpg', ['jpg']);           // true
isFileType('document.pdf', ['jpg']);        // false

// Check multiple types
isFileType('archive.zip', ['zip', 'rar', '7z']);    // true
isFileType('script.js', ['html', 'css']);           // false

// With wildcards (removes *. prefix)
isFileType('image.png', ['*.png', '*.jpg']);        // true
isFileType('data.json', ['*.txt', '*.csv']);        // false
```

---

### getMediaType()

**Problem**: Categorize files as images, videos, or audio for appropriate handling.

**Solution**: Check extension against known media type lists.

```javascript
function getMediaType(url) {
    // Returns 'img', 'video', 'audio', or 'unknown'
}
```

**📝 Parameters:**
- `url`: File URL or filename

**🎉 Returns:** Media type string

**💡 Usage Examples:**

```javascript
getMediaType('photo.jpg');           // 'img'
getMediaType('song.mp3');            // 'audio'
getMediaType('movie.mp4');           // 'video'
getMediaType('document.pdf');        // 'unknown'

// Use for conditional loading
const mediaType = getMediaType(fileUrl);
switch (mediaType) {
    case 'img':
        loadImage(fileUrl);
        break;
    case 'video':
        loadVideo(fileUrl);
        break;
    case 'audio':
        loadAudio(fileUrl);
        break;
    default:
        downloadFile(fileUrl);
}
```

---

## 📚 Key Concepts

These functions teach fundamental programming concepts:

- **String Methods**: `split()`, `join()`, `pop()`, `toLowerCase()`
- **Array Operations**: `forEach()`, `push()`, `join()`
- **URL Parsing**: Path manipulation, query strings
- **File Systems**: Extensions, paths, naming conventions
- **Type Checking**: Extension-based file type detection
- **Conditional Logic**: Multiple condition checks, array searching

These utilities form the foundation for file handling in web applications!
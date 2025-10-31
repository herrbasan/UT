export default {
    getExtension: function (filename) {
        let parts = filename.split('.');
        return parts.pop();
    },

    removeExtension: function (filename) {
        let parts = filename.split('.')
        let ext = parts.pop();
        return parts.join('.');
    },

    urlGetLast: function (url, sep = '/') {
        let ar = url.split(sep);
        return ar[ar.length - 1];
    },

    isFileType: function (filename, types) {
        let ext = this.getExtension(filename).toLowerCase();
        let out = false;
        types.forEach(function (type) {
            if (type.split('*.')[1] != undefined) {
                type = type.split('*.')[1];
            }
            if (ext == type) {
                out = true;
            }
        })
        return out;
    },

    getMediaType: function (url) {
        let type = 'unknown';
        let file = this.urlGetLast(url);
        if (this.isFileType(file, ['png', 'apng', 'webp', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'avif', 'gif', 'svg', 'bmp', 'ico', 'cur', 'tif', 'tiff'])) { type = 'img' }
        else if (this.isFileType(file, ['mp4', 'mkv', 'av1', 'webm', 'oga', 'mpg', 'mpeg', 'mov'])) { type = 'video' }
        else if (this.isFileType(file, ['mp3', 'm4a', 'aac', 'flac', 'ogg', 'wav', 'aif', 'aiff'])) { type = 'audio' }
        return type;
    }
};
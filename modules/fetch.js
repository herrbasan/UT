export default {
    fetch: function (url, data = {}, options = {}) {
        return new Promise((resolve, reject) => {
            // Default options
            const config = {
                method: 'GET',
                responseType: 'json', // 'json', 'blob', 'text'
                credentials: 'same-origin',
                timeout: 10000,
                onProgress: null, // Progress callback function
                ...options
            };

            // Setup abort controller for timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), config.timeout);

            // Prepare request options
            const requestOptions = {
                method: config.method,
                credentials: config.credentials,
                signal: controller.signal
            };

            // Handle data based on method
            if (config.method.toUpperCase() === 'GET') {
                // Build query string for GET
                if (Object.keys(data).length > 0) {
                    const params = new URLSearchParams(data);
                    url += '?' + params.toString();
                }
            } else {
                // Handle POST/PUT data
                if (data instanceof FormData) {
                    requestOptions.body = data;
                } else if (typeof data === 'object') {
                    requestOptions.body = new FormData();
                    for (const [key, value] of Object.entries(data)) {
                        requestOptions.body.append(key, value);
                    }
                } else {
                    requestOptions.body = data;
                }
            }

            // Make the request
            fetch(url, requestOptions)
                .then(response => {
                    clearTimeout(timeoutId);

                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                    }

                    // Handle progress tracking for large downloads
                    if (config.onProgress && typeof config.onProgress === 'function' && response.body) {
                        return this.trackProgress(response, config.onProgress, config.responseType);
                    }

                    // Return response based on type
                    switch (config.responseType) {
                        case 'blob': return response.blob();
                        case 'text': return response.text();
                        case 'json':
                        default: return response.json();
                    }
                })
                .then(data => {
                    resolve(data);
                })
                .catch(err => {
                    clearTimeout(timeoutId);
                    resolve({ error: err.message || err.toString() });
                });
        });
    },

    trackProgress: function (response, onProgress, responseType = 'json') {
        const contentLength = response.headers.get('content-length');
        const total = contentLength ? parseInt(contentLength) : 0;
        let loaded = 0;

        if (!response.body) {
            // Fallback if no body stream available
            return response[responseType]();
        }

        const reader = response.body.getReader();
        const chunks = [];

        return new Promise((resolve, reject) => {
            function processChunk() {
                return reader.read().then(({ done, value }) => {
                    if (done) {
                        // Combine all chunks
                        const allChunks = new Uint8Array(loaded);
                        let position = 0;
                        for (const chunk of chunks) {
                            allChunks.set(chunk, position);
                            position += chunk.length;
                        }

                        // Final progress update
                        onProgress({
                            loaded,
                            total,
                            progress: total ? (loaded / total) : null,
                            complete: true
                        });

                        const blob = new Blob([allChunks]);

                        // Convert based on response type
                        if (responseType === 'blob') {
                            resolve(blob);
                        } else if (responseType === 'text') {
                            blob.text().then(resolve);
                        } else if (responseType === 'json') {
                            blob.text().then(text => {
                                try {
                                    resolve(JSON.parse(text));
                                } catch (e) {
                                    reject(new Error('Invalid JSON response'));
                                }
                            });
                        } else {
                            resolve(blob);
                        }
                        return;
                    }

                    // Accumulate chunk
                    loaded += value.length;
                    chunks.push(value);

                    // Progress update
                    onProgress({
                        loaded,
                        total,
                        progress: total ? (loaded / total) : null,
                        complete: false
                    });

                    return processChunk();
                });
            }
            processChunk().catch(reject);
        });
    },

    readJson: function (url, options) {
        return this.fetch(url, {}, {
            method: 'GET',
            responseType: 'json',
            ...options
        });
    }
};
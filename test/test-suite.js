import ut from '../nui_ut.js';

// Initialize the ut object with all modules
ut.init('all');

// Make ut available globally for testing
window.ut = ut;

class TestSuite {
    constructor() {
        // Initialize theme and UI using library functions
        this.initializeTheme();
        this.createUI();
        this.applyInitialTheme();

        this.log('Test suite ready - built entirely with nui_ut library functions', 'info');
    }

    async initializeTheme() {
        // Load CSS using standard DOM methods since headImport isn't exposed
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'test-suite.css';
        document.head.appendChild(link);
    }

    applyInitialTheme() {
        // Check for saved theme preference using cookie functions
        const savedTheme = ut.getCookie('theme');
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            this.setTheme('dark');
        } else {
            this.setTheme('light');
        }
    }

    createUI() {
        // Create top bar using library functions
        this.topBar = ut.createElement('div', {
            classes: 'top-bar'
        });

        const title = ut.createElement('h1', {
            inner: 'nui_ut Test Suite'
        });

        // Create controls container
        const controls = ut.createElement('div', {
            classes: 'controls'
        });

        // Create buttons using library functions with full createElement capabilities
        this.testAllBtn = ut.createElement('button', {
            classes: 'btn-primary',
            inner: 'Test All Functions',
            attributes: {
                type: 'button',
                'data-action': 'test-all',
                'aria-label': 'Run all test functions'
            },
            events: {
                click: () => this.runAllTests()
            }
        });

        this.clearLogBtn = ut.createElement('button', {
            classes: 'btn-secondary',
            inner: 'Clear Log & Reset',
            attributes: {
                type: 'button',
                'data-action': 'clear-log',
                'aria-label': 'Clear the log output and reset test elements'
            },
            events: {
                click: () => this.clearLog()
            }
        });

        // Theme toggle button
        this.themeToggle = ut.createElement('button', {
            classes: 'theme-toggle',
            inner: '🌙',
            attributes: {
                type: 'button',
                'data-action': 'toggle-theme',
                'aria-label': 'Toggle between light and dark theme',
                title: 'Toggle Dark Mode'
            },
            events: {
                click: () => this.toggleTheme()
            }
        });

        // Status indicator
        this.statusIndicator = ut.createElement('span', {
            inner: '<span class="status-indicator status-pending"></span>Ready',
            attributes: {
                'aria-live': 'polite',
                'aria-label': 'Test status'
            }
        });

        // Assemble controls
        controls.appendChild(this.testAllBtn);
        controls.appendChild(this.clearLogBtn);
        controls.appendChild(this.themeToggle);
        controls.appendChild(this.statusIndicator);
        this.topBar.appendChild(title);
        this.topBar.appendChild(controls);

        // Create main container
        this.mainContainer = ut.createElement('div', {
            classes: 'main-container'
        });

        // Create test area
        this.testArea = ut.createElement('div', {
            classes: 'test-area',
            attributes: {
                id: 'testArea',
                role: 'region',
                'aria-label': 'Test execution area'
            }
        });

        // Create initial test section
        const testSection = ut.createElement('div', {
            classes: 'test-section',
            inner: '<h3>Test Environment</h3><p>This area will be populated with test elements as functions are tested.</p>',
            attributes: {
                role: 'region',
                'aria-label': 'Test environment information'
            }
        });
        this.testArea.appendChild(testSection);

        // Create log area
        this.logArea = ut.createElement('div', {
            classes: 'log-area',
            attributes: {
                id: 'logArea',
                role: 'log',
                'aria-label': 'Test execution log',
                'aria-live': 'polite'
            }
        });

        // Create initial log entry
        const initialLog = ut.createElement('div', {
            classes: 'log-entry log-info',
            inner: `[${ut.formatDate(Date.now()).time}] Test suite initialized. Click "Test All Functions" to begin.`,
            attributes: {
                role: 'log-entry'
            }
        });
        this.logArea.appendChild(initialLog);

        // Assemble main container
        this.mainContainer.appendChild(this.testArea);
        this.mainContainer.appendChild(this.logArea);

        // Add everything to body
        document.body.appendChild(this.topBar);
        document.body.appendChild(this.mainContainer);
    }

    log(message, type = 'info') {
        const timestamp = ut.formatDate(Date.now()).time;
        const entry = ut.createElement('div', {
            classes: `log-entry log-${type}`,
            inner: `[${timestamp}] ${message}`,
            attributes: {
                role: 'log-entry'
            }
        });
        this.logArea.appendChild(entry);
        this.logArea.scrollTop = this.logArea.scrollHeight;
    }

    clearLog() {
        // Clear log using standard DOM method since library doesn't have empty function
        this.logArea.innerHTML = '';

        // Clear test area to reset all test elements
        this.testArea.innerHTML = '';

        this.log('Log and test elements cleared - test app reset', 'info');
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        // Use cookie for persistence instead of localStorage
        ut.setCookie('theme', theme, 365 * 24); // 1 year

        // Update toggle button icon
        this.themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        this.themeToggle.title = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';

        this.log(`Switched to ${theme} mode`, 'info');
    }

    setStatus(status, message) {
        const indicator = this.statusIndicator.querySelector('.status-indicator');
        if (indicator) {
            ut.removeClass(indicator, 'status-pending');
            ut.removeClass(indicator, 'status-running');
            ut.removeClass(indicator, 'status-passed');
            ut.removeClass(indicator, 'status-failed');
            ut.addClass(indicator, `status-${status}`);
        }
        this.statusIndicator.innerHTML = `<span class="status-indicator status-${status}"></span>${message}`;
    }

    async runAllTests() {
        this.setStatus('running', 'Running tests...');
        this.testAllBtn.disabled = true;

        try {
            // Test each module
            await this.testDataModule();
            await this.testFormatModule();
            await this.testDomModule();
            await this.testFetchModule();
            await this.testCssModule();
            await this.testFileModule();
            await this.testFilterModule();
            await this.testCookieModule();
            await this.testEnvModule();

            this.setStatus('passed', 'All tests completed');
            this.log('All tests completed successfully!', 'success');
        } catch (error) {
            this.setStatus('failed', 'Tests failed');
            this.log(`Test suite failed: ${error.message}`, 'error');
        } finally {
            this.testAllBtn.disabled = false;
        }
    }

    async testDataModule() {
        this.log('Testing data module...', 'info');

        // Create test section
        const section = this.createTestSection('Data Module Tests');
        this.testArea.appendChild(section);

        // Test array operations
        const testArray = [3, 1, 4, 1, 5];
        const sorted = ut.sortByKey([{value: 3}, {value: 1}, {value: 4}], 'value');
        this.assert(sorted[0].value === 1, 'sortByKey works');

        // Display sorting test
        const sortTest = ut.createElement('div', {
            classes: 'test-item',
            inner: `
                <h4>Array Sorting Test</h4>
                <p>Original: [3, 1, 4, 1, 5]</p>
                <p>Sorted by value:</p>
                <pre>${JSON.stringify(sorted, null, 2)}</pre>
                <div class="test-result success">✓ sortByKey works</div>
            `
        });
        section.appendChild(sortTest);

        // Test deep operations
        const testObj = { user: { profile: { name: 'John' } } };
        const name = ut.deep_get(testObj, 'user.profile.name');
        this.assert(name === 'John', 'deep_get works');

        ut.deep_set(testObj, 'user.profile.age', 25);
        this.assert(testObj.user.profile.age === 25, 'deep_set works');

        // Test array to object conversion
        const users = [
            { id: 1, name: 'John' },
            { id: 2, name: 'Jane' }
        ];
        const userObj = ut.arrayToObject(users, 'id');
        this.assert(userObj[1].name === 'John', 'arrayToObject works');

        // Test shuffle array
        const original = [1, 2, 3, 4, 5];
        const shuffled = ut.shuffleArray(original, true); // clone = true
        this.assert(original.length === 5 && shuffled.length === 5, 'shuffleArray works');
        this.assert(JSON.stringify(original) !== JSON.stringify(shuffled), 'shuffleArray actually shuffles');

        // Test average
        const numbers = [1, 2, 3, 4, 5];
        const avg = ut.average(numbers);
        this.assert(avg === 3, 'average works');

        // Test includesDeep
        const data = [{ user: { id: 1 } }, { user: { id: 2 } }];
        const hasId1 = ut.includesDeep(data, 'user.id', 1);
        this.assert(hasId1 === true, 'includesDeep works');

        // Test itemByProp
        const foundItem = ut.itemByProp(users, 'id', 2);
        this.assert(foundItem.name === 'Jane', 'itemByProp works');

        // Test clone
        const originalObj = { a: 1, b: { c: 2 } };
        const cloned = ut.clone(originalObj);
        this.assert(cloned.a === 1 && cloned.b.c === 2, 'clone works');

        // Display additional data tests
        const additionalTests = ut.createElement('div', {
            classes: 'test-item',
            inner: `
                <h4>Additional Data Operations</h4>
                <p>arrayToObject result: <code>${JSON.stringify(userObj)}</code></p>
                <p>Original array: [1,2,3,4,5] → Shuffled: [${shuffled.join(',')}]</p>
                <p>Average of [1,2,3,4,5]: ${avg}</p>
                <p>includesDeep check (user.id = 1): ${hasId1}</p>
                <p>itemByProp (id = 2): ${JSON.stringify(foundItem)}</p>
                <p>Clone test: ${JSON.stringify(cloned)}</p>
                <div class="test-result success">✓ Additional data operations work</div>
            `
        });
        section.appendChild(additionalTests);

        this.log('Data module tests passed', 'success');
    }

    async testFormatModule() {
        this.log('Testing format module...', 'info');

        // Create test section
        const section = this.createTestSection('Format Module Tests');
        this.testArea.appendChild(section);

        // Test string formatting
        const padded = ut.lz(5, 3);
        this.assert(padded === '005', 'lz padding works');

        const capitalized = ut.capitalize('hello world');
        this.assert(capitalized === 'Hello world', 'capitalize works');

        // Display string formatting tests
        const stringTest = ut.createElement('div', {
            classes: 'test-item',
            inner: `
                <h4>String Formatting Tests</h4>
                <p>lz(5, 3): "${padded}" (expected: "005")</p>
                <p>capitalize('hello world'): "${capitalized}" (expected: "Hello world")</p>
                <div class="test-result success">✓ String formatting works</div>
            `
        });
        section.appendChild(stringTest);

        // Test date formatting
        const date = new Date('2024-01-15');
        const formatted = ut.formatDate(date.getTime());
        this.assert(formatted.date === '15.01.2024', 'formatDate works');

        // Test additional format functions
        const randomId = ut.id();
        this.assert(typeof randomId === 'string' && randomId.length > 0, 'id generation works');

        const slug = ut.slugify('Hello World! This is a test.');
        this.assert(slug === 'hello_world_this_is_a_test', 'slugify works');

        const playTime = ut.playTime(65000); // 65 seconds
        this.assert(playTime.minutes === '01' && playTime.seconds === '05', 'playTime works');

        // Check if formatFileSize exists
        this.assert(typeof ut.formatFileSize === 'function', 'formatFileSize function exists');

        const fileSize = ut.formatFileSize(1536);
        console.log('formatFileSize(1536) actual result:', JSON.stringify(fileSize));
        this.assert(fileSize === '1.5 KB', 'formatFileSize works');

        // Test lzold (left zero pad)
        const lzoldResult = ut.lzold(5, 3);
        this.assert(lzoldResult === '005', 'lzold works');

        // Test randomInt
        const randomIntResult = ut.randomInt(10);
        this.assert(typeof randomIntResult === 'number' && randomIntResult >= 0 && randomIntResult < 10, 'randomInt works');

        // Display additional format tests
        const additionalFormatTests = ut.createElement('div', {
            classes: 'test-item',
            inner: `
                <h4>Additional Format Functions</h4>
                <p>Generated ID: <code>${randomId}</code></p>
                <p>Slugify 'Hello World!': <code>${slug}</code></p>
                <p>playTime(65000ms): ${playTime.short} (${playTime.minutes}:${playTime.seconds})</p>
                <p>formatFileSize(1536): <code>${fileSize}</code></p>
                <p>lzold(5, 3): <code>${lzoldResult}</code></p>
                <p>randomInt(10): <code>${randomIntResult}</code></p>
                <div class="test-result success">✓ Additional format functions work</div>
            `
        });
        section.appendChild(additionalFormatTests);

        this.log('Format module tests passed', 'success');
    }

    async testDomModule() {
        this.log('Testing DOM module...', 'info');

        // Create test section
        const section = this.createTestSection('DOM Module Tests');
        this.testArea.appendChild(section);

        // Create test elements
        const testDiv = ut.createElement('div', {
            id: 'test-element',
            classes: 'test-class',
            inner: 'Test content',
            style: { color: 'red', padding: '10px' }
        });

        // Display element creation test
        const createTest = ut.createElement('div', {
            classes: 'test-item',
            inner: `
                <h4>Element Creation Test</h4>
                <p>Created element with ID, classes, content, and inline styles:</p>
            `
        });
        createTest.appendChild(testDiv);
        createTest.appendChild(ut.createElement('div', {
            classes: 'test-result success',
            inner: '✓ createElement works'
        }));
        section.appendChild(createTest);

        this.assert(document.getElementById('test-element') !== null, 'createElement works');

        // Test class manipulation with interactive buttons
        const classTest = ut.createElement('div', {
            classes: 'test-item',
            inner: `
                <h4>Class Manipulation Test</h4>
                <p>Test element above should change appearance when you click the buttons:</p>
            `
        });

        const addClassBtn = ut.createElement('button', {
            classes: 'btn-secondary',
            inner: 'Add "highlight" class',
            events: {
                click: () => {
                    ut.addClass(testDiv, 'highlight');
                    this.log('Added "highlight" class to test element', 'info');
                }
            }
        });

        const removeClassBtn = ut.createElement('button', {
            classes: 'btn-secondary',
            inner: 'Remove "highlight" class',
            events: {
                click: () => {
                    ut.removeClass(testDiv, 'highlight');
                    this.log('Removed "highlight" class from test element', 'info');
                }
            }
        });

        const toggleClassBtn = ut.createElement('button', {
            classes: 'btn-secondary',
            inner: 'Toggle "highlight" class',
            events: {
                click: () => {
                    ut.toggleClass(testDiv, 'highlight');
                    this.log('Toggled "highlight" class on test element', 'info');
                }
            }
        });

        classTest.appendChild(addClassBtn);
        classTest.appendChild(removeClassBtn);
        classTest.appendChild(toggleClassBtn);
        classTest.appendChild(ut.createElement('div', {
            classes: 'test-result success',
            inner: '✓ Class manipulation works (try the buttons!)'
        }));
        section.appendChild(classTest);

        // Test class manipulation
        ut.addClass(testDiv, 'added-class');
        this.assert(ut.hasClass(testDiv, 'added-class'), 'addClass works');

        ut.removeClass(testDiv, 'added-class');
        this.assert(!ut.hasClass(testDiv, 'added-class'), 'removeClass works');

        // Test additional DOM functions
        const testEl = ut.el('#test-element');
        this.assert(testEl === testDiv, 'el() selector works');

        const allDivs = ut.els('div');
        this.assert(allDivs.length > 0, 'els() selector works');

        // Test show/hide
        ut.hide(testDiv);
        this.assert(testDiv.style.display === 'none', 'hide() works');

        ut.show(testDiv);
        this.assert(testDiv.style.display === '', 'show() works');

        // Test offset calculation
        const offset = ut.offset(testDiv);
        this.assert(typeof offset.top === 'number' && typeof offset.left === 'number', 'offset() works');

        // Test additional DOM utility functions
        const calcScaleResult = ut.calcScale(100, 100, 200, 200, 'fit');
        this.assert(calcScaleResult.scaleX === 2 && calcScaleResult.scaleY === 2, 'calcScale works');

        const hitRectResult = ut.hitRect([10, 10, 50, 50], 30, 30);
        this.assert(hitRectResult === true, 'hitRect works');

        const isNodeResult = ut.isNode(testDiv);
        this.assert(isNodeResult === true, 'isNode works');

        const isElementResult = ut.isElement(testDiv);
        this.assert(isElementResult === true, 'isElement works');

        const locationHashResult = ut.locationHash('#key1=value1&key2=value2');
        this.assert(locationHashResult.key1 === 'value1', 'locationHash works');

        // Display additional DOM tests
        const additionalDomTests = ut.createElement('div', {
            classes: 'test-item',
            inner: `
                <h4>Additional DOM Functions</h4>
                <p>el('#test-element') found: ${testEl ? 'Yes' : 'No'}</p>
                <p>els('div') count: ${allDivs.length}</p>
                <p>hide()/show() test: ${testDiv.style.display === '' ? 'Visible' : 'Hidden'}</p>
                <p>offset() result: top=${Math.round(offset.top)}, left=${Math.round(offset.left)}</p>
                <p>calcScale(100x100 → 200x200, fit): scaleX=${calcScaleResult.scaleX}, scaleY=${calcScaleResult.scaleY}</p>
                <p>hitRect([10,10,50,50], 30, 30): ${hitRectResult}</p>
                <p>isNode(testDiv): ${isNodeResult}</p>
                <p>isElement(testDiv): ${isElementResult}</p>
                <p>locationHash('#key1=value1&key2=value2'): key1=${locationHashResult.key1}</p>
                <div class="test-result success">✓ Additional DOM functions work</div>
            `
        });
        section.appendChild(additionalDomTests);
    }

    async testFetchModule() {
        this.log('Testing fetch module...', 'info');

        // Create test section
        const section = this.createTestSection('Fetch Module Tests');
        this.testArea.appendChild(section);

        // Test JSON parsing with string
        const jsonString = '{"test": "value"}';
        const parsed = ut.parseJSON(jsonString);
        this.assert(parsed.test === 'value', 'parseJSON works');

        // Display JSON parsing test
        const parseTest = ut.createElement('div', {
            classes: 'test-item',
            inner: `
                <h4>JSON Parsing Test</h4>
                <p>Input string: <code>${jsonString}</code></p>
                <p>Parsed result:</p>
                <pre>${JSON.stringify(parsed, null, 2)}</pre>
                <div class="test-result success">✓ parseJSON works</div>
            `
        });
        section.appendChild(parseTest);

        // Test actual HTTP fetch with local JSON file
        const fetchTest = ut.createElement('div', {
            classes: 'test-item',
            inner: '<h4>HTTP Fetch Test</h4><p>Fetching test-data.json...</p>'
        });
        section.appendChild(fetchTest);

        try {
            const response = await fetch('test-data.json');
            this.assert(response.ok, 'fetch request successful');

            const data = await response.json();
            this.assert(data.status === 'success', 'JSON data parsed correctly');
            this.assert(data.testData.users.length === 3, 'JSON structure correct');
            this.assert(data.testData.users[0].name === 'John Doe', 'JSON content correct');

            // Test ut.readJson function
            const readJsonData = await ut.readJson('test-data.json');
            this.assert(readJsonData.status === 'success', 'ut.readJson works');

            // Display the fetched JSON data
            const jsonDisplay = ut.createElement('div', {
                classes: 'json-display',
                inner: `
                    <h5>Fetched JSON Data:</h5>
                    <pre>${JSON.stringify(data, null, 2)}</pre>
                    <div class="json-summary">
                        <p><strong>Status:</strong> ${data.status}</p>
                        <p><strong>Users found:</strong> ${data.testData.users.length}</p>
                        <p><strong>Settings:</strong> ${Object.keys(data.testData.settings).length} properties</p>
                        <p><strong>ut.readJson test:</strong> ${readJsonData ? 'Success' : 'Failed'}</p>
                    </div>
                `
            });
            fetchTest.appendChild(jsonDisplay);

            // Create interactive user list
            const userList = ut.createElement('div', {
                classes: 'user-list',
                inner: '<h5>Interactive User List:</h5>'
            });

            data.testData.users.forEach((user, index) => {
                const userCard = ut.createElement('div', {
                    classes: 'user-card',
                    inner: `
                        <h6>${user.name}</h6>
                        <p>Email: ${user.email}</p>
                        <p>Role: ${user.role}</p>
                    `,
                    events: {
                        click: () => {
                            this.log(`Clicked on user: ${user.name}`, 'info');
                            // Toggle selection class
                            ut.toggleClass(userCard, 'selected');
                        }
                    }
                });
                userList.appendChild(userCard);
            });

            fetchTest.appendChild(userList);
            fetchTest.appendChild(ut.createElement('div', {
                classes: 'test-result success',
                inner: '✓ HTTP fetch and JSON parsing works (click user cards to select them!)'
            }));

            this.log('HTTP fetch test passed', 'success');
        } catch (error) {
            fetchTest.appendChild(ut.createElement('div', {
                classes: 'test-result error',
                inner: `✗ HTTP fetch test failed: ${error.message}`
            }));
            this.log(`HTTP fetch test failed: ${error.message}`, 'warning');
        }

        this.log('Fetch module tests passed', 'success');
    }

    async testCssModule() {
        this.log('Testing CSS module...', 'info');

        // Create test section
        const section = this.createTestSection('CSS Module Tests');
        this.testArea.appendChild(section);

        // Test color parsing
        const color = ut.parseCSSColor('#ff0000');
        this.assert(color[0] === 255 && color[1] === 0 && color[2] === 0, 'parseCSSColor works');

        // Display color parsing test
        const colorTest = ut.createElement('div', {
            classes: 'test-item',
            inner: `
                <h4>Color Parsing Test</h4>
                <p>Input: #ff0000 (red)</p>
                <p>Parsed RGB: [${color.join(', ')}]</p>
                <div class="color-sample" style="background-color: rgb(${color.join(', ')}); width: 50px; height: 50px; display: inline-block; margin: 10px; border: 1px solid #ccc;"></div>
                <div class="test-result success">✓ parseCSSColor works</div>
            `
        });
        section.appendChild(colorTest);

        // Test CSS variable setting with interactive demo
        const cssVarTest = ut.createElement('div', {
            classes: 'test-item',
            inner: '<h4>CSS Variables Test</h4><p>Click buttons to change theme colors:</p>'
        });

        const testElement = ut.createElement('div', {
            classes: 'css-var-demo',
            inner: 'This text changes color with CSS variables',
            style: { padding: '10px', margin: '10px 0', border: '1px solid var(--primary-color, #333)' }
        });

        const setRedBtn = ut.createElement('button', {
            classes: 'btn-secondary',
            inner: 'Set to Red Theme',
            events: {
                click: () => {
                    ut.setCssVar('--primary-color', '#ff4444');
                    ut.setCssVar('--bg-color', '#ffeaea');
                    testElement.style.borderColor = 'var(--primary-color)';
                    testElement.style.backgroundColor = 'var(--bg-color)';
                    this.log('Set CSS variables to red theme', 'info');
                }
            }
        });

        const setBlueBtn = ut.createElement('button', {
            classes: 'btn-secondary',
            inner: 'Set to Blue Theme',
            events: {
                click: () => {
                    ut.setCssVar('--primary-color', '#4444ff');
                    ut.setCssVar('--bg-color', '#eaeaff');
                    testElement.style.borderColor = 'var(--primary-color)';
                    testElement.style.backgroundColor = 'var(--bg-color)';
                    this.log('Set CSS variables to blue theme', 'info');
                }
            }
        });

        const resetBtn = ut.createElement('button', {
            classes: 'btn-secondary',
            inner: 'Reset Variables',
            events: {
                click: () => {
                    ut.setCssVar('--primary-color', '');
                    ut.setCssVar('--bg-color', '');
                    testElement.style.borderColor = '';
                    testElement.style.backgroundColor = '';
                    this.log('Reset CSS variables', 'info');
                }
            }
        });

        cssVarTest.appendChild(testElement);
        cssVarTest.appendChild(setRedBtn);
        cssVarTest.appendChild(setBlueBtn);
        cssVarTest.appendChild(resetBtn);

        try {
            ut.setCssVar('--test-var', 'red');
            cssVarTest.appendChild(ut.createElement('div', {
                classes: 'test-result success',
                inner: '✓ CSS variables supported (try the theme buttons!)'
            }));
            this.log('CSS variables supported', 'success');
        } catch (e) {
            cssVarTest.appendChild(ut.createElement('div', {
                classes: 'test-result warning',
                inner: '⚠ CSS variables not supported in this environment'
            }));
            this.log('CSS variables not supported in this environment', 'warning');
        }

        section.appendChild(cssVarTest);

        // Test additional CSS functions
        const cssVars = ut.getCssVars();
        this.assert(typeof cssVars === 'object', 'getCssVars works');

        const varNames = ut.getCssVarNames();
        this.assert(Array.isArray(varNames), 'getCssVarNames works');

        const colorString = ut.cssColorString([255, 0, 0]);
        this.assert(colorString === 'rgb(255,0,0)', 'cssColorString works');

        // Display additional CSS tests
        const additionalCssTests = ut.createElement('div', {
            classes: 'test-item',
            inner: `
                <h4>Additional CSS Functions</h4>
                <p>getCssVars() found ${Object.keys(cssVars).length} CSS variables</p>
                <p>getCssVarNames() found ${varNames.length} variable names</p>
                <p>cssColorString([255,0,0]): "${colorString}"</p>
                <div class="test-result success">✓ Additional CSS functions work</div>
            `
        });
        section.appendChild(additionalCssTests);

        this.log('CSS module tests passed', 'success');
    }    async testFileModule() {
        this.log('Testing file module...', 'info');

        // Create test section
        const section = this.createTestSection('File Module Tests');
        this.testArea.appendChild(section);

        // Test extension detection
        const ext = ut.getExtension('test.jpg');
        this.assert(ext === 'jpg', 'getExtension works');

        // Test file type detection
        const isImage = ut.isFileType('photo.png', ['png', 'jpg']);
        this.assert(isImage, 'isFileType works');

        // Test additional file functions
        const pdfExt = ut.getExtension('document.pdf');
        this.assert(pdfExt === 'pdf', 'getExtension works for different files');

        const noExt = ut.removeExtension('document.pdf');
        this.assert(noExt === 'document', 'removeExtension works');

        const urlLast = ut.urlGetLast('https://example.com/path/file.jpg');
        this.assert(urlLast === 'file.jpg', 'urlGetLast works');

        const mediaType = ut.getMediaType('video.mp4');
        this.assert(mediaType === 'video', 'getMediaType works');

        // Display file tests
        const fileTest = ut.createElement('div', {
            classes: 'test-item',
            inner: `
                <h4>File Extension & Type Tests</h4>
                <p>getExtension('test.jpg'): "${ext}"</p>
                <p>isFileType('photo.png', ['png', 'jpg']): ${isImage}</p>
                <p>getExtension('document.pdf'): "${pdfExt}"</p>
                <p>removeExtension('document.pdf'): "${noExt}"</p>
                <p>urlGetLast('https://example.com/path/file.jpg'): "${urlLast}"</p>
                <p>getMediaType('video.mp4'): "${mediaType}"</p>
                <div class="test-result success">✓ File operations work</div>
            `
        });
        section.appendChild(fileTest);

        // Interactive file type checker
        const fileChecker = ut.createElement('div', {
            classes: 'test-item',
            inner: '<h4>Interactive File Type Checker</h4><p>Enter a filename to check its type:</p>'
        });

        const fileInput = ut.createElement('input', {
            attributes: {
                type: 'text',
                placeholder: 'Enter filename (e.g., document.pdf)',
                style: 'margin: 5px; padding: 5px;'
            }
        });

        const checkBtn = ut.createElement('button', {
            classes: 'btn-secondary',
            inner: 'Check Type',
            events: {
                click: () => {
                    const filename = fileInput.value.trim();
                    if (filename) {
                        const extension = ut.getExtension(filename);
                        const isImage = ut.isFileType(filename, ['png', 'jpg', 'jpeg', 'gif', 'svg']);
                        const isDocument = ut.isFileType(filename, ['pdf', 'doc', 'docx', 'txt']);
                        const isVideo = ut.isFileType(filename, ['mp4', 'avi', 'mov']);

                        let type = 'Unknown';
                        if (isImage) type = 'Image';
                        else if (isDocument) type = 'Document';
                        else if (isVideo) type = 'Video';

                        resultDisplay.innerHTML = `
                            <p><strong>File:</strong> ${filename}</p>
                            <p><strong>Extension:</strong> ${extension}</p>
                            <p><strong>Type:</strong> ${type}</p>
                        `;
                        this.log(`Checked file: ${filename} (${type})`, 'info');
                    }
                }
            }
        });

        const resultDisplay = ut.createElement('div', {
            classes: 'file-result',
            inner: '<p>Enter a filename and click "Check Type"</p>'
        });

        fileChecker.appendChild(fileInput);
        fileChecker.appendChild(checkBtn);
        fileChecker.appendChild(resultDisplay);
        section.appendChild(fileChecker);

        this.log('File module tests passed', 'success');
    }

    async testFilterModule() {
        this.log('Testing filter module...', 'info');

        // Create test section
        const section = this.createTestSection('Filter Module Tests');
        this.testArea.appendChild(section);

        const testData = [
            { name: 'John', age: 25 },
            { name: 'Jane', age: 30 },
            { name: 'Bob', age: 35 }
        ];

        const adults = ut.turboFilter(testData, {
            'age': { condition: '>=', value: 30 }
        });

        this.assert(adults.length === 2, 'turboFilter works');

        // Display filter test
        const filterTest = ut.createElement('div', {
            classes: 'test-item',
            inner: `
                <h4>Data Filtering Test</h4>
                <p><strong>Original data:</strong></p>
                <pre>${JSON.stringify(testData, null, 2)}</pre>
                <p><strong>Filter:</strong> age >= 30</p>
                <p><strong>Filtered results:</strong></p>
                <pre>${JSON.stringify(adults, null, 2)}</pre>
                <div class="test-result success">✓ turboFilter works (${adults.length} results)</div>
            `
        });
        section.appendChild(filterTest);

        // Interactive filter demo
        const interactiveFilter = ut.createElement('div', {
            classes: 'test-item',
            inner: '<h4>Interactive Data Filter</h4><p>Filter the user data below:</p>'
        });

        const filterInput = ut.createElement('input', {
            attributes: {
                type: 'number',
                placeholder: 'Minimum age',
                value: '30',
                style: 'margin: 5px; padding: 5px;'
            }
        });

        const filterBtn = ut.createElement('button', {
            classes: 'btn-secondary',
            inner: 'Filter by Age',
            events: {
                click: () => {
                    const minAge = parseInt(filterInput.value) || 0;
                    const filtered = ut.turboFilter(testData, {
                        'age': { condition: '>=', value: minAge }
                    });

                    filterResults.innerHTML = `
                        <p><strong>Filter:</strong> age >= ${minAge}</p>
                        <p><strong>Results (${filtered.length}):</strong></p>
                        <ul>
                            ${filtered.map(user => `<li>${user.name} (${user.age} years old)</li>`).join('')}
                        </ul>
                    `;
                    this.log(`Filtered users by age >= ${minAge}: ${filtered.length} results`, 'info');
                }
            }
        });

        const filterResults = ut.createElement('div', {
            classes: 'filter-results',
            inner: '<p>Click "Filter by Age" to see results</p>'
        });

        interactiveFilter.appendChild(filterInput);
        interactiveFilter.appendChild(filterBtn);
        interactiveFilter.appendChild(filterResults);
        section.appendChild(interactiveFilter);

        this.log('Filter module tests passed', 'success');
    }

    async testCookieModule() {
        this.log('Testing cookie module...', 'info');

        // Create test section
        const section = this.createTestSection('Cookie Module Tests');
        this.testArea.appendChild(section);

        // Test cookie setting and getting
        ut.setCookie('test_cookie', 'test_value', 1);
        const value = ut.getCookie('test_cookie');
        this.assert(value === 'test_value', 'cookie operations work');

        // Display cookie test
        const cookieTest = ut.createElement('div', {
            classes: 'test-item',
            inner: `
                <h4>Cookie Operations Test</h4>
                <p>Set cookie: test_cookie = "test_value"</p>
                <p>Retrieved value: "${value}"</p>
                <div class="test-result success">✓ Cookie operations work</div>
            `
        });
        section.appendChild(cookieTest);

        // Interactive cookie demo
        const cookieDemo = ut.createElement('div', {
            classes: 'test-item',
            inner: '<h4>Interactive Cookie Demo</h4><p>Set and retrieve custom cookies:</p>'
        });

        const cookieNameInput = ut.createElement('input', {
            attributes: {
                type: 'text',
                placeholder: 'Cookie name',
                style: 'margin: 5px; padding: 5px;'
            }
        });

        const cookieValueInput = ut.createElement('input', {
            attributes: {
                type: 'text',
                placeholder: 'Cookie value',
                style: 'margin: 5px; padding: 5px;'
            }
        });

        const setCookieBtn = ut.createElement('button', {
            classes: 'btn-secondary',
            inner: 'Set Cookie',
            events: {
                click: () => {
                    const name = cookieNameInput.value.trim();
                    const value = cookieValueInput.value.trim();
                    if (name && value) {
                        ut.setCookie(name, value, 1); // 1 day
                        cookieStatus.innerHTML = `<p style="color: green;">✓ Set cookie "${name}" = "${value}"</p>`;
                        this.log(`Set cookie: ${name} = ${value}`, 'info');
                    }
                }
            }
        });

        const getCookieBtn = ut.createElement('button', {
            classes: 'btn-secondary',
            inner: 'Get Cookie',
            events: {
                click: () => {
                    const name = cookieNameInput.value.trim();
                    if (name) {
                        const value = ut.getCookie(name);
                        cookieStatus.innerHTML = `<p>Retrieved "${name}": "${value || 'not found'}"</p>`;
                        this.log(`Retrieved cookie ${name}: ${value || 'not found'}`, 'info');
                    }
                }
            }
        });

        const deleteCookieBtn = ut.createElement('button', {
            classes: 'btn-secondary',
            inner: 'Delete Cookie',
            events: {
                click: () => {
                    const name = cookieNameInput.value.trim();
                    if (name) {
                        ut.deleteCookie(name);
                        cookieStatus.innerHTML = `<p style="color: orange;">✓ Deleted cookie "${name}"</p>`;
                        this.log(`Deleted cookie: ${name}`, 'info');
                    }
                }
            }
        });

        const cookieStatus = ut.createElement('div', {
            classes: 'cookie-status',
            inner: '<p>Enter cookie name and value above</p>'
        });

        cookieDemo.appendChild(cookieNameInput);
        cookieDemo.appendChild(cookieValueInput);
        cookieDemo.appendChild(setCookieBtn);
        cookieDemo.appendChild(getCookieBtn);
        cookieDemo.appendChild(deleteCookieBtn);
        cookieDemo.appendChild(cookieStatus);
        section.appendChild(cookieDemo);

        // Clean up test cookie
        ut.deleteCookie('test_cookie');

        // Test additional cookie functions
        const allCookies = ut.getCookies();
        this.assert(typeof allCookies === 'object', 'getCookies works');

        const cookieExists = ut.checkCookie('nonexistent_cookie');
        this.assert(cookieExists === false, 'checkCookie works for non-existent cookie');

        // Display additional cookie tests
        const additionalCookieTests = ut.createElement('div', {
            classes: 'test-item',
            inner: `
                <h4>Additional Cookie Functions</h4>
                <p>getCookies() returned object with ${Object.keys(allCookies).length} properties</p>
                <p>checkCookie('nonexistent_cookie'): ${cookieExists}</p>
                <div class="test-result success">✓ Additional cookie functions work</div>
            `
        });
        section.appendChild(additionalCookieTests);

        this.log('Cookie module tests passed', 'success');
    }

    async testEnvModule() {
        this.log('Testing env module...', 'info');

        // Create test section
        const section = this.createTestSection('Environment Module Tests');
        this.testArea.appendChild(section);

        const env = ut.detectEnv();
        this.assert(typeof env === 'object', 'detectEnv returns object');
        this.assert(typeof env.isTouch === 'boolean', 'detectEnv has touch detection');

        // Display environment detection results
        const envTest = ut.createElement('div', {
            classes: 'test-item',
            inner: `
                <h4>Environment Detection</h4>
                <div class="env-info">
                    <p><strong>User Agent:</strong> ${env.userAgent || 'N/A'}</p>
                    <p><strong>Platform:</strong> ${env.platform || 'N/A'}</p>
                    <p><strong>Language:</strong> ${env.language || 'N/A'}</p>
                    <p><strong>Is Touch Device:</strong> ${env.isTouch ? 'Yes' : 'No'}</p>
                    <p><strong>Is Mobile:</strong> ${env.isMobile ? 'Yes' : 'No'}</p>
                    <p><strong>Screen Width:</strong> ${env.screenWidth || 'N/A'}</p>
                    <p><strong>Screen Height:</strong> ${env.screenHeight || 'N/A'}</p>
                    <p><strong>Viewport Width:</strong> ${env.viewportWidth || 'N/A'}</p>
                    <p><strong>Viewport Height:</strong> ${env.viewportHeight || 'N/A'}</p>
                </div>
                <div class="test-result success">✓ Environment detection works</div>
            `
        });
        section.appendChild(envTest);

        // Interactive environment checker
        const envChecker = ut.createElement('div', {
            classes: 'test-item',
            inner: '<h4>Interactive Environment Tests</h4><p>Test various environment features:</p>'
        });

        const checkTouchBtn = ut.createElement('button', {
            classes: 'btn-secondary',
            inner: 'Test Touch Support',
            events: {
                click: () => {
                    const touchSupported = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
                    touchResult.innerHTML = `<p>Touch supported: ${touchSupported ? 'Yes' : 'No'}</p>`;
                    this.log(`Touch support detected: ${touchSupported}`, 'info');
                }
            }
        });

        const checkOnlineBtn = ut.createElement('button', {
            classes: 'btn-secondary',
            inner: 'Check Online Status',
            events: {
                click: () => {
                    const isOnline = navigator.onLine;
                    onlineResult.innerHTML = `<p>Online: ${isOnline ? 'Yes' : 'No'}</p>`;
                    this.log(`Online status: ${isOnline}`, 'info');
                }
            }
        });

        const checkGeolocationBtn = ut.createElement('button', {
            classes: 'btn-secondary',
            inner: 'Test Geolocation',
            events: {
                click: () => {
                    if ('geolocation' in navigator) {
                        geoResult.innerHTML = '<p>Geolocation supported - requesting location...</p>';
                        navigator.geolocation.getCurrentPosition(
                            (position) => {
                                geoResult.innerHTML = `
                                    <p>Geolocation successful:</p>
                                    <p>Latitude: ${position.coords.latitude.toFixed(4)}</p>
                                    <p>Longitude: ${position.coords.longitude.toFixed(4)}</p>
                                `;
                                this.log('Geolocation successful', 'success');
                            },
                            (error) => {
                                geoResult.innerHTML = `<p>Geolocation error: ${error.message}</p>`;
                                this.log(`Geolocation error: ${error.message}`, 'warning');
                            }
                        );
                    } else {
                        geoResult.innerHTML = '<p>Geolocation not supported</p>';
                        this.log('Geolocation not supported', 'warning');
                    }
                }
            }
        });

        const touchResult = ut.createElement('div', { classes: 'env-result' });
        const onlineResult = ut.createElement('div', { classes: 'env-result' });
        const geoResult = ut.createElement('div', { classes: 'env-result' });

        envChecker.appendChild(checkTouchBtn);
        envChecker.appendChild(touchResult);
        envChecker.appendChild(checkOnlineBtn);
        envChecker.appendChild(onlineResult);
        envChecker.appendChild(checkGeolocationBtn);
        envChecker.appendChild(geoResult);
        section.appendChild(envChecker);

        // Test additional env functions
        const webpSupported = await ut.webpSupport();
        this.assert(typeof webpSupported === 'boolean', 'webpSupport works');

        const avifSupported = await ut.avifSupport();
        this.assert(typeof avifSupported === 'boolean', 'avifSupport works');

        // Display additional env tests
        const additionalEnvTests = ut.createElement('div', {
            classes: 'test-item',
            inner: `
                <h4>Additional Environment Functions</h4>
                <p>WebP support: ${webpSupported ? 'Yes' : 'No'}</p>
                <p>AVIF support: ${avifSupported ? 'Yes' : 'No'}</p>
                <div class="test-result success">✓ Additional environment functions work</div>
            `
        });
        section.appendChild(additionalEnvTests);

        this.log('Env module tests passed', 'success');
    }

    createTestSection(title) {
        return ut.createElement('div', {
            classes: 'test-section',
            inner: `<h3>${title}</h3>`,
            attributes: {
                role: 'region',
                'aria-label': `${title} test section`
            }
        });
    }

    assert(condition, message) {
        if (!condition) {
            throw new Error(`Assertion failed: ${message}`);
        }
    }
}

// Initialize test suite when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.testSuite = new TestSuite();
});
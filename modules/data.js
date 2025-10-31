export default {
    sortByKey: function (array, path, numeric = false) {
        let split = path.split('.');
        let compare = [
            function (a, b) {
                var x = a[path]; var y = b[path];
                if (typeof x == "string") { x = x.toLowerCase(); y = y.toLowerCase(); }
                if (numeric) { return x - y; }
                else { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
            },
            function (a, b) {
                var x = a[split[0]][split[1]]; var y = b[split[0]][split[1]];
                if (typeof x == "string") { x = x.toLowerCase(); y = y.toLowerCase(); }
                if (numeric) { return x - y; }
                else { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
            },
            function (a, b) {
                var x = a[split[0]][split[1]][split[2]]; var y = b[split[0]][split[1]][split[2]];
                if (typeof x == "string") { x = x.toLowerCase(); y = y.toLowerCase(); }
                if (numeric) { return x - y; }
                else { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
            },
            function (a, b) {
                var x = a[split[0]][split[1]][split[2]]; var y = b[split[0]][split[1]][split[2]];
                if (typeof x == "string") { x = x.toLowerCase(); y = y.toLowerCase(); }
                if (numeric) { return x - y; }
                else { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
            },
            function (a, b) {
                var x = a[split[0]][split[1]][split[2]][split[3]]; var y = b[split[0]][split[1]][split[2]][split[3]];
                if (typeof x == "string") { x = x.toLowerCase(); y = y.toLowerCase(); }
                if (numeric) { return x - y; }
                else { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
            }
        ];
        return array.sort(compare[split.length - 1])
    },

    includesDeep: function (ar, path, compare) {
        return this.deep_includes(ar, path, compare);
    },

    indexByProp: function (ar, prop, value) {
        return ar.map(e => this.deep_get(e, prop)).indexOf(value);
    },

    itemByProp: function (ar, prop, value) {
        let idx = ar.map(e => this.deep_get(e, prop)).indexOf(value);
        return ar[idx];
    },

    allIdxByProp: function (ar, prop, value) {
        let idxs = [];
        for (let i = 0; i < ar.length; i++) {
            if (this.deep_get(ar[i], prop) === value) {
                idxs.push(i);
            }
        }
        return idxs;
    },

    arrayToObject: function (ar, key) {
        let obj = {};
        ar.forEach(item => {
            let tkey = this.deep_get(item, key);
            if (obj[tkey]) { console.warn('the Key: ' + tkey + ' allready exsists, values will be overwritten.'); }
            obj[tkey] = item;
        })
        return obj;
    },

    shuffleArray: function (ar, clone = false) {
        let array;
        if (clone) { array = ar.slice(); } else { array = ar; }
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    },

    average: function (ar) {
        return (ar.reduce((a, b) => { return a + b }, 0)) / ar.length;
    },

    medianAverage: function (ring) {
        let sum = 0;
        if (ring.length > 3) {
            let ar = [...ring];
            ar.sort(function (a, b) { return a - b; });
            ar = ar.slice(1, ar.length - 1);
            sum = ar.reduce(function (a, b) { return a + b }) / ar.length;
        }
        return sum;
    },

    randomNumbers: function (max) {
        let numbers = Array.from({ length: max }, (_, i) => i);
        numbers = this.shuffleArray(numbers);
        return numbers;
    },

    // Object manipulation functions (moved from object.js)
    deep_get: function (obj, path) {
        try {
            let split = path.split('.');
            if (split.length == 1) { return obj[path]; }
            if (split.length == 2) { return obj[split[0]][split[1]]; }
            if (split.length == 3) { return obj[split[0]][split[1]][split[2]]; }
            if (split.length == 4) { return obj[split[0]][split[1]][split[2]][split[3]]; }
            if (split.length == 5) { return obj[split[0]][split[1]][split[2]][split[3]][split[4]]; }
            if (split.length == 6) { return obj[split[0]][split[1]][split[2]][split[3]][split[4]][split[5]]; }
            if (split.length == 7) { return obj[split[0]][split[1]][split[2]][split[3]][split[4]][split[5]][split[6]]; }
            if (split.length == 8) { return obj[split[0]][split[1]][split[2]][split[3]][split[4]][split[5]][split[6]][split[7]]; }
            if (split.length == 9) { return obj[split[0]][split[1]][split[2]][split[3]][split[4]][split[5]][split[6]][split[7]][split[8]]; }
            if (split.length > 9) {
                let oobj = obj;
                for (var i = 0; i < split.length; i++) {
                    oobj = oobj[split[i]];
                };
                return oobj;
            }
        }
        catch (e) {
            return undefined;
        }
    },

    deep_set: function (obj, path, value) {
        let split = path.split('.');
        let last = split.pop();
        for (let i = 0; i < split.length; i++) {
            obj = obj[split[i]];
        }
        obj[last] = value;
    },

    deep_includes: function (ar, path, compare) {
        let found = 0;
        for (let i = 0; i < ar.length; i++) {
            if (this.deep_get(ar[i], path) === compare) {
                found++;
            }
        }
        return (found > 0);
    },

    keyByValue: function (obj, val) {
        let found;
        for (let key in obj) {
            if (obj[key] == val) {
                return found = key;
            }
        }
    },

    keyByDeepValue: function (obj, path, val) {
        let found = {};
        for (let key in obj) {
            if (this.deep_get(obj[key], path) === val) {
                found = key;
            }
        }
        return found;
    },

    jclone: function (obj) { return JSON.parse(JSON.stringify(obj)) },

    clone: function (obj) {
        if (!structuredClone) { return this.jclone(obj); }
        return structuredClone(obj);
    },

    jcompare: function (obj_1, obj_2) {
        let is = true;
        let a = JSON.stringify(obj_1);
        let b = JSON.stringify(obj_2);
        if (a === b) {
            is = false;
        }
        return is;
    }
};
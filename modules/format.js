export default {
    lzold: function (num, size = 2) {
        let s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    },

    lz: function (num, size = 2) {
        return num.toString().padStart(size, '0');;
    },

    capitalize: function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    randomInt: function (max) {
        return Math.floor(Math.random() * max);
    },

    id: function () {
        return '_' + (
            Number(String(Math.random()).slice(2)) +
            Date.now() +
            Math.round(performance.now())
        ).toString(36);
    },

    slugify: function (str) {
        if (!str || str == '') { return false }
        str = str.trim();
        str = str.toLowerCase();
        str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        str = str.replace(/[^a-z0-9 -]/g, '');
        str = str.replace(/\s+/g, '_');
        str = str.replace(/-+/g, '_');
        return str
    },

    // Date formatting functions (moved from date.js)
    formatDate: function (n) {
        let out = {};
        let date = new Date(n);
        out.keys = {
            year: date.getFullYear(),
            month: this.lz(date.getMonth() + 1),
            day: this.lz(date.getDate()),
            hour: this.lz(date.getHours()),
            minutes: this.lz(date.getMinutes()),
            seconds: this.lz(date.getSeconds()),
            milliseconds: this.lz(date.getMilliseconds(), 3)
        }

        out.time = out.keys.hour + ':' + out.keys.minutes + ':' + out.keys.seconds;
        out.date = out.keys.day + '.' + out.keys.month + '.' + out.keys.year;
        out.date_input = +out.keys.year + '-' + out.keys.month + '-' + out.keys.day;
        out.full = out.date + ' - ' + out.time;
        out.file = out.date + ' - ' + out.keys.hour + ':' + out.keys.minutes;
        out.log = out.date + ' - ' + out.time + ':' + out.keys.milliseconds;

        return out;
    },

    playTime: function (n = 0, fps = 30) {
        let obj = {};
        obj.isNegative = n < 0;
        n = n < 0 ? Math.abs(n) : n;

        let h = (1000 * 60 * 60);
        let m = (1000 * 60);
        let s = 1000;
        obj["hours"] = this.lz(Math.floor(n / h), 2);
        obj["minutes"] = this.lz(Math.floor(n % h / m), 2);
        obj["full_minutes"] = Math.floor(n / m);
        obj["seconds"] = this.lz(Math.floor(n % h % m / s), 2);
        obj["milliseconds"] = this.lz(Math.floor(n % h % m % s), 3);
        obj["frames"] = this.lz(Math.round((n * fps) % fps), 2);

        obj["minsec"] = obj.full_minutes + ":" + obj.seconds;
        obj["short"] = obj.hours + ":" + obj.minutes + ":" + obj.seconds;
        obj["full"] = obj.hours + ":" + obj.minutes + ":" + obj.seconds + ":" + obj.milliseconds;
        obj["frames"] = obj.hours + ":" + obj.minutes + ":" + obj.seconds + ":" + obj.frames;
        return obj;
    },

    // File size formatting function (moved from file.js)
    formatFileSize: function (n) {
        let size = '';
        if (n > 1024 * 1024 * 1024 * 1024) {
            size = (n / 1024 / 1024 / 1024 / 1024).toFixed(2).replace(/0+$/, '').replace(/\.$/, '') + ' TB';
        }
        else if (n > 1024 * 1024 * 1024) {
            size = (n / 1024 / 1024 / 1024).toFixed(2).replace(/0+$/, '').replace(/\.$/, '') + ' GB';
        }
        else if (n > 1024 * 1024) {
            size = (n / 1024 / 1024).toFixed(2).replace(/0+$/, '').replace(/\.$/, '') + ' MB';
        }
        else if (n > 1024) {
            size = (n / 1024).toFixed(2).replace(/0+$/, '').replace(/\.$/, '') + ' KB';
        }
        else if (n < 1025) {
            size = n;
            if (n <= 0 || n == 'undefined') {
                size = '';
            }
        }
        return size;
    },

    parseJSON: function (str) {
        let out = str;
        try {
            out = JSON.parse(str);
        } catch (e) {
            // Return original string if parsing fails
        }
        return out;
    }
};
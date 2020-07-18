var HTML = require('node-html-parser'),
    axios = require('axios');


module.exports = {

    isUrl: function (s) {
        return s && /((http(s)?):\/\/[\w\.\/\-=?#]+)/i.test(s);
    },

    trim: function (s) {
        return (s && s.trim && s.trim().replace(/\s+/g, ' ')) || '';
    },

    readMT: function (el, name) {
        var attr = el.getAttribute('name') || el.getAttribute('property');
        return attr == name ? el.getAttribute('content') : null;
    },

    images: function ($, t) {

        var images = [];
        var _this = this;
        if (t == 'og') {

            $.querySelectorAll('meta').forEach(function (el) {

                var propName = el.getAttribute('property') || el.getAttribute('name');
                var content = el.getAttribute('content');
                if (propName === 'og:image' || propName === 'og:image:url') {
                    images.push({ url: content });
                }

                var current = images[images.length - 1] || {};

                switch (propName) {
                    case 'og:image:secure_url':
                        current.secure_url = content;
                        break;
                    case 'og:image:type':
                        current.type = content;
                        break;
                    case 'og:image:width':
                        current.width = parseInt(content, 10);
                        break;
                    case 'og:image:height':
                        current.height = parseInt(content, 10);
                        break;
                }
            });
        }
        else {

            $.querySelectorAll('img').forEach(function (el) {

                var src = el.getAttribute('src');

                if (src && _this.isUrl(src)) {

                    var width = el.getAttribute('width');
                    var height = el.getAttribute('height');
                    var img = { url: src };
                    if (width) { img.width = parseInt(width, 10); }
                    if (height) { img.height = parseInt(height, 10); }
                    images.push(img);
                }
            });

        }

        return images;
    },

    videos: function ($) {
        var videos = [];

        $.querySelectorAll('meta').forEach(function (el) {
            var propName = el.getAttribute('property') || el.getAttribute('name');
            var content = el.getAttribute('content');

            if (propName === 'og:video' || propName === 'og:video:url') {
                videos.push({ url: content });
            }

            var current = videos[videos.length - 1];

            switch (propName) {
                case 'og:video:secure_url':
                    current.secure_url = content;
                    break;
                case 'og:video:type':
                    current.type = content;
                    break;
                case 'og:video:width':
                    current.width = parseInt(content, 10);
                    break;
                case 'og:video:height':
                    current.height = parseInt(content, 10);
                    break;
            }

        });


        return videos;
    },



    parser: function (x, callback) {


        var _this = this;
        var o = {
            method: 'get',
            headers: {
                //'User-Agent': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Safari/537.36',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36 OPR/68.0.3618.63',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
            }

        };

        if (typeof x === 'object' && x !== null) {
            o = Object.assign(o, x);
        } else if (this.isUrl(x)) {
            o = Object.assign(o, { url: x });
        }

        return new Promise(function (resolve, reject) {
            axios(o).then(function ({ data }) {                

                var og = {}, meta = {};
                var $ = HTML.parse(data);

                og.images = _this.images($, 'og');
                og.videos = _this.videos($);
                var title = $.querySelector('title');
                if (title)
                    meta.title = title.text;
                var metas = $.querySelectorAll('meta');

                for (let i = 0; i < metas.length; i++) {
                    var el = metas[i];                    

                    if (_this.readMT(el, 'og:title'))
                        og.title = _this.readMT(el, 'og:title');

                    if (_this.readMT(el, 'og:description'))
                        og.description = _this.readMT(el, 'og:description');

                    if (_this.readMT(el, 'og:image'))
                        og.image = _this.readMT(el, 'og:image');

                    if (_this.readMT(el, 'og:url'))
                        og.url = _this.readMT(el, 'og:url');

                    if (_this.readMT(el, 'og:site_name'))
                        og.site_name = _this.readMT(el, 'og:site_name');

                    if (_this.readMT(el, 'og:type'))
                        og.type = _this.readMT(el, 'og:type');

                    // meta
                    if (_this.readMT(el, 'title'))
                        meta.title = _this.readMT(el, 'title');

                    if (_this.readMT(el, 'description'))
                        meta.description = _this.readMT(el, 'description');

                    if (_this.readMT(el, 'image'))
                        meta.image = _this.readMT(el, 'image');

                }

                var result = { meta: meta, og: og, images: _this.images($) };

                callback && callback(null, result);
                resolve(result);

            }).catch(function (err) {
                callback && callback(err, null);
                reject(err);
            })
        });


    }
}
var _ = require('util'),
    cheerio = require('cheerio'),
    axios = require('axios');


module.exports = {

    isUrl: function (s) {
        return s && /((http(s)?):\/\/[\w\.\/\-=?#]+)/i.test(s);
    },

    trim: function (s) {
        return (s && s.trim && s.trim().replace(/\s+/g, ' ')) || '';
    },


    readOgTag: function ($, name) {
        return this.trim($('meta[property="og:' + name + '"]').attr('content'));
    },
    readMT: function ($, name) {
        return this.trim($('meta[name="' + name + '"]').attr('content'));
    },

    meta: function ($) {

        return {
            title: this.trim($('head title').text()),
            description: this.readMT($, 'description'),
            keywords: this.readMT($, 'keywords'),
            canonical: this.trim($('link[rel=canonical]').attr('href'))
        };

    },

    images: function ($, t) {

        var images = [];
        var _this = this;
        if (t == 'og') {
            [].forEach.call($('meta[property^="og:image"]'), function (el) {
                var $el = $(el);
                var propName = $el.attr('property');
                var content = $el.attr('content');

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

            $('img').each(function (idx, element) {
                var src = $(this).attr('src');
                if (_this.isUrl(src)) {
                    var width = $(this).attr('width');
                    var height = $(this).attr('height');
                    var img = { url: src };
                    if (width) { img.width = parseInt(width, 10); }
                    if (height) { img.height = parseInt(height, 10); }
                    images.push(img);

                }

            });

        }

        return images.length > 0 ? images : null;
    },

    videos: function ($) {
        var videos = [];

        [].forEach.call($('meta[property^="og:video"]'), function (el) {
            var $el = $(el);
            var propName = $el.attr('property');
            var content = $el.attr('content');

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

        return videos.length > 0 ? videos : null;
    },

    og: function ($) {

        return {
            title: this.readOgTag($, 'title'),
            description: this.readOgTag($, 'description'),
            url: this.readOgTag($, 'url'),
            site_name: this.readOgTag($, 'site_name'),
            type: this.readOgTag($, 'type'),
            images: this.images($, 'og'),
            videos: this.videos($)
        }

    },

    parser: function (x, callback) {


        var _this = this;
        var o = {
            method: 'get',
            headers: {
                'User-Agent': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Safari/537.36',
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

                var $ = cheerio.load(data);

                var result = {
                    meta: _this.meta($),
                    og: _this.og($),
                    images: _this.images($),
                };

                callback && callback(null, result);
                resolve(result);

            }).catch(function (err) {
                callback && callback(err, null);
                reject(err);
            })
        });


    },

    parseHtml: function (x, callback) {

        var _this = this;

        if (typeof x === 'string') {
            var data = x;
            var $ = cheerio.load(data);

            var result = {
                meta: _this.meta($),
                og: _this.og($),
                images: _this.images($),
            };

            return new Promise((resolve, reject) => {
                callback && callback(null, result);
                resolve(result);
            })
        }
    }
}
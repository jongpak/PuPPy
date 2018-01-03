const path = require('path');
const config = require('./config.app');
const urlUtil = require('./lib.url');

let url = config.site.url;
let isStatic = false;

module.exports = {
    extname: '.hbs',
    defaultLayout: 'layout',

    partialsDir: config.path.template,
    layoutsDir: config.path.template,

    helpers: {
        isStatic: () => isStatic,
        url: () => url,

        headerTitle: config.site.name,
        postUrl: urlUtil.makePostUrl,

        concat: function(...args) {
            return args.slice(0, -1).join('');
        }
    },

    setUrl: function(_url) {
        url = _url;
    },

    setStatic: function() {
        isStatic = true;
    }
}
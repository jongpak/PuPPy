const config = require('./config.app');

module.exports = {
    makePostUrl: function(post, isStatic) {
        let prefix = isStatic ? '.' : config.site.url;
        let postfix = isStatic ? '.html' : '';

        return `${prefix}/post/${post.year}/${post.month}${post.day}/${post.subjectUrl}${postfix}`;
    },
}
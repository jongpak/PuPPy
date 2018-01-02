const fs = require('fs');
const path = require('path');
const marked = require('marked');

const config = require('./config.app');

function convertPost(post) {
    return new Promise(function(resolve, reject) {
        fs.readFile(path.join(config.path.post, post.file), function(err, data) {
            resolve({
                post: post,
                postTitle: post.subject,
                postDate: `${post.year}.${post.month}.${post.day} ${post.hour}:${post.minute}`,
                postBody: marked(data.toString())
            });
        });
    });
}

function summaryPostBody(postBody, len) {
    len = len || 200;

    return postBody
        .replace(/<.*?>/g, '')
        .replace(/\s{2,}/g, ' ')
        .replace(/\n/g, ' ')
        .substr(0, len)
        .trim();

}

module.exports = {
    convertPost: convertPost,
    summaryPostBody: summaryPostBody
}
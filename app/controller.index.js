const fs = require('fs');
const path = require('path');
const marked = require('marked');

const post = require('./lib.post');
const config = require('./config.app');

async function list (req, res) {
    const posts = await post.getPosts(config.path.post);
    const processedPosts = await Promise.all(posts.map(convertPost));

    res.render('list', {
        posts: processedPosts
    });
}

function convertPost(post) {
    return new Promise(function(resolve, reject) {
        fs.readFile(path.join(config.path.post, post.file), function(err, data) {
            resolve({
                postTitle: post.subject,
                postDate: `${post.year}.${post.month}.${post.day} ${post.hour}:${post.minute}`,
                postBody: marked(data.toString())
            });
        });
    });
}

module.exports = {
    list: list
}
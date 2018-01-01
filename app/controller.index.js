const fs = require('fs');
const path = require('path');
const marked = require('marked');

const post = require('./lib.post');
const paths = require('./config.path');

async function index (req, res) {
    const posts = await post.getPosts(paths.post);
    const processedPosts = await Promise.all(posts.map(convertPost));

    res.render('posts', {
        posts: processedPosts
    });
}

function convertPost(post) {
    return new Promise(function(resolve, reject) {
        fs.readFile(path.join(paths.post, post.file), function(err, data) {
            resolve({
                postTitle: post.subject,
                postDate: `${post.year}.${post.month}.${post.day} ${post.hour}:${post.minute}`,
                postBody: marked(data.toString())
            });
        });
    });
}

module.exports = {
    index: index
}
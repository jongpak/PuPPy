const fs = require('fs');

const post = require('./lib.post.file');
const postUtil = require('./lib.post.utils');

async function view (req, res) {
    const file = `${req.params.year}-${req.params.month}-${req.params.day}_${req.params.hour}-${req.params.minute}_${req.params.subject.replace(/_/, ' ')}.md`;

    const posts = [ post.parseFileName(file) ];
    const processedPosts = await Promise.all(posts.map(postUtil.convertPost));

    res.render('posts', {
        posts: processedPosts
    });
}

module.exports = {
    view: view
}
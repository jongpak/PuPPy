const post = require('./lib.post.file');
const postUtil = require('./lib.post.utils');
const config = require('./config.app');

async function list (req, res) {
    const posts = await post.getPosts(config.path.post);
    const processedPosts = await Promise.all(posts.map(postUtil.convertPost));

    processedPosts.forEach(function(e) {
        e.postBody = postUtil.summaryPostBody(e.postBody);
    });

    res.render('list', {
        posts: processedPosts
    });
}

module.exports = {
    list: list
}
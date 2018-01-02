const post = require('./lib.post.file');
const postUtil = require('./lib.post.utils');

async function view (req, res) {
    const posts = await post.getPosts(config.path.post);
    const processedPosts = await Promise.all(posts.map(postUtil.convertPost));

    res.render('list', {
        posts: processedPosts
    });
}

module.exports = {
    view: view
}
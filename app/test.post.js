const post = require('./lib.post.file');
const path = require('path');

(async function () {
    const posts = await post.getPosts(path.join(__dirname, '../posts'));
    console.dir(posts);
})();
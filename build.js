const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const copydir = require('copy-dir');
const handlerbars = require('handlebars');

const post = require('./app/lib.post.file');
const postUtil = require('./app/lib.post.utils');
const urlUtil = require('./app/lib.url');

const config = require('./app/config.app');
const hbsConfig = require('./app/config.handlerbars')();

function copyObject(posts) {
    return JSON.parse(JSON.stringify(posts));
}

async function build() {
    hbsConfig.setUrl('.');
    hbsConfig.setStatic();

    Object.keys(hbsConfig.helpers).forEach(function(name) {
        handlerbars.registerHelper(name, hbsConfig.helpers[name]);
    });

    const layoutTemplate = fs.readFileSync(path.join(hbsConfig.layoutsDir, 'layout.hbs')).toString();
    const listTemplate = fs.readFileSync(path.join(hbsConfig.layoutsDir, 'list.hbs')).toString();
    const postTemplate = fs.readFileSync(path.join(hbsConfig.layoutsDir, 'posts.hbs')).toString();

    const posts = await post.getPosts(config.path.post);

    const processedPosts = await Promise.all(posts.map(postUtil.convertPost));
    const summarizedPosts = processedPosts.map(function(e) {
        const x = copyObject(e);
        x.postBody = postUtil.summaryPostBody(x.postBody);

        return x;
    });

    /*******************************
     * Print list of markdown file
     *******************************/
    let i = 0;
    console.log(`Posts:`);
    posts.forEach(function(post) {
        console.log(`    [${++i}] ${post.file}`);
    });
    console.log();


    /*******************************
     * Build index.html
     *******************************/
    console.log('Builing index.html');
    const listHtml = (handlerbars.compile(listTemplate))({
        posts: summarizedPosts
    });
    const indexHtml = (handlerbars.compile(layoutTemplate))({
        body: listHtml
    });

    mkdirp.sync(config.path.output);
    fs.writeFileSync(path.join(config.path.output, 'index.html'), indexHtml);
    console.log(`    [OK] ${config.path.output}/index.html`);
    console.log();


    /*******************************
     * Build post.html
     *******************************/
    console.log('Builing post.html');

    hbsConfig.setUrl('../../..');
    processedPosts.forEach(function(content) {
        const postHtml = (handlerbars.compile(postTemplate))({
            posts: [ content ]
        });
        const layoutHtml = (handlerbars.compile(layoutTemplate))({
            body: postHtml
        });

        const outputPath = path.join(config.path.output, urlUtil.makePostUrl(content.post, true));

        mkdirp.sync(path.dirname(outputPath));
        fs.writeFileSync(outputPath, layoutHtml);

        console.log(`    [OK] ${outputPath}`);
    });

    console.log();
    hbsConfig.setUrl('.');


    /*******************************
     * Copy media files
     *******************************/
    console.log('Copying media directory');
    mkdirp.sync(path.join(config.path.output, 'media'));
    copydir.sync('media', path.join(config.path.output, 'media'));
    console.log('   [OK]');
    console.log();


    console.log('Complete');
}

if(require.main == module) {
    build();
} else {
    module.exports = {
        build: build
    };
}
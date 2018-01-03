const path = require('path');
const express = require('express');
const exphbs  = require('express-handlebars');

const app = express();
const config = require('./app/config.app');

const index = require('./app/controller.index');
const post = require('./app/controller.post');
const error = require('./app/controller.error');

const asyncRoute = function(func) {
    return function(req, res, next) {
        Promise
            .resolve(func(req, res, next))
            .catch(next);
    };
};

app.engine('hbs', exphbs(require('./app/config.handlerbars')));
app.set('views', path.join(__dirname, 'template'));
app.set('view engine', 'hbs');

app.get('/', asyncRoute(index.list));
app.get('/post/:year([0-9]{4})/:month([0-9]{2}):day([0-9]{2})/:subject', asyncRoute(post.view));

app.use('/media', express.static('media'));
app.use(error.error);

app.listen(config.port, function () {
    console.log(`Puppy listening on port ${config.port}`);
});
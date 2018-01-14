const path = require('path');
const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser  = require('body-parser');
const morgan = require('morgan');

const app = express();
const config = require('./app/config.app');
const hbsConfig = require('./app/config.handlerbars')();
const asyncRoute = require('./app/lib.asyncRoute');

const index = require('./app/controller.index');
const post = require('./app/controller.post');
const error = require('./app/controller.error');

app.engine('hbs', exphbs(hbsConfig));
app.set('views', path.join(__dirname, 'template'));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('combined'));
app.use(error.error);
app.use('/media', express.static('media'));
app.use('/post/:year([0-9]{4})/:month([0-9]{2}):day([0-9]{2})/:subject?/files', express.static(path.join(config.path.post, 'files')));

app.get('/', asyncRoute(index.list));
app.get('/write', index.writeView);
app.post('/write', index.write);
app.get('/post/:year([0-9]{4})/:month([0-9]{2}):day([0-9]{2})/:subject', asyncRoute(post.view));
app.get('/build', asyncRoute(async function(req, res) {
    await require('./build').build();

    res.send('OK');
}));

app.listen(config.port, function () {
    console.log(`Puppy listening on port ${config.port}`);
});
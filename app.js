const path = require('path');
const express = require('express');
const exphbs  = require('express-handlebars');

const app = express();
const config = require('./app/config.app');
const index = require('./app/controller.index');

app.use('/media', express.static('media'));

app.engine('hbs', exphbs(require('./app/config.handlerbars')));
app.set('views', path.join(__dirname, 'template'));
app.set('view engine', 'hbs');

app.get('/', index.list);

app.listen(config.port, function () {
    console.log(`Puppy listening on port ${config.port}`);
});
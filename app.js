const path = require('path');
const express = require('express');
const exphbs  = require('express-handlebars');

const app = express();
const index = require('./app/controller.index');

app.use('/media', express.static('media'));

app.engine('hbs', exphbs(require('./app/config.handlerbars')));
app.set('views', path.join(__dirname, 'template'));
app.set('view engine', 'hbs');

app.get('/', index.index);

app.listen(8000, function () {
    console.log('Puppy listening on port 8000');
});
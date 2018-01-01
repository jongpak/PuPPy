const path = require('path');

module.exports = {
    extname: '.hbs',
    defaultLayout: 'layout',

    partialsDir: path.join(__dirname, '../template'),
    layoutsDir: path.join(__dirname, '../template'),

    helpers: require(path.join(__dirname, './lib.handlerbars.helpers'))
}
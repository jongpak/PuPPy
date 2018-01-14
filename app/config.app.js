const path = require('path');

module.exports = {
    port: 8000,
    
    path: {
        template: path.join(__dirname, '../template'),
        post: path.join(__dirname, '../_post'),
        
        output: path.join(__dirname, '../output')
    },

    site: {
        url: '',
        name: "My Blog"
    }
}
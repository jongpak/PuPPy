const path = require('path');

module.exports = {
    port: 8000,
    
    path: {
        template: path.join(__dirname, '../template'),
        post: path.join(__dirname, '../_post'),
        
        output: ''
    },

    site: {
        url: '',
        name: "종박's 연구소"
    }
}
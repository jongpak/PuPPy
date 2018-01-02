const fs = require('fs');

function getPosts(postDir) {
    return new Promise(function(resolve, reject) {
        fs.readdir(postDir, function(err, files) {
            if(err) {
                return reject(err);
            }

            resolve(files.map(parseFileName));
        });
    });
}

function parseFileName(fileName) {
    const parsed = fileName.match(/([0-9]{4})-([0-9]{2})-([0-9]{2})_([0-9]{2})-([0-9]{2})_(.*).md/);

    if(parsed == null) {
        return null;
    }

    return  {
        file:       parsed[0],
        year:       parsed[1],
        month:      parsed[2],
        day:        parsed[3],
        hour:       parsed[4],
        minute:     parsed[5],
        subject:    parsed[6],
        subjectUrl: parsed[6].replace(/ /g, '_'),
    };
}

module.exports = {
    getPosts: getPosts
}
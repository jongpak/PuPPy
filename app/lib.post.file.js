const fs = require('fs');

/**
 * 
 * @param {string} postDir 
 * @returns {array}
 */
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

/**
 * 
 * @param {string} fileName 
 * @returns {object}
 */
function parseFileName(fileName) {
    const parsed = fileName.match(/([0-9]{4})-([0-9]{2})-([0-9]{2})_(.*).md/);

    if(parsed == null) {
        return null;
    }

    return  {
        file: parsed[0],
        year: parsed[1],
        month: parsed[2],
        day: parsed[3],
        subject: parsed[4],
        subjectUrl: parsed[4].replace(/ /g, '_'),
    };
}

module.exports = {
    getPosts: getPosts,
    parseFileName: parseFileName
}
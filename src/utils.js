const path = require('path');

const readJSON = (filePath) => {
    return require(filePath);
};

module.exports = {
    readJSON
};

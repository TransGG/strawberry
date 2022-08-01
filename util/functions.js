const fs = require('fs')
// helper functions for the program

// return all files in the given directory that have the specified ending
const getFiles = (path, ending) => {
    return fs.readdirSync(path).filter(file => file.endsWith(ending))
}

module.exports = {
    getFiles
}
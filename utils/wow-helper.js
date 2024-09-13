const path = require('path');

function replaceNonWordCharacters(str, replacer = '_') {
    return str.replace(/[\W_]+/g, replacer).trim();
}

function toPosixPath(fullPath, parentDir = '') {
    // Remove the parent directory and replace Windows backslashes with Unix forward slashes
    return fullPath.replace(parentDir, '').replace(/\\/g, '/');
}

module.exports = { replaceNonWordCharacters, toPosixPath }
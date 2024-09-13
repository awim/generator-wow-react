const path = require('path');

function replaceNonWordCharacters(str, replacer = '_') {
    return str.replace(/[\W_]+/g, replacer).trim();
}

function resetAsUnixPath(fullPath, parentDir = '') {
    // Remove the parent directory and replace Windows backslashes with Unix forward slashes
    const relativePath = fullPath.replace(parentDir, '').replace(/\\/g, '/').substring(1);
    
    // Normalize the path to remove any redundant slashes
    return path.posix.normalize(relativePath);
  }

module.exports = { replaceNonWordCharacters, resetAsUnixPath }
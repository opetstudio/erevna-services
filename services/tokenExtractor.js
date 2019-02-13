// tokenExtractor.js
//
// Exports a single function which extracts a 'bearer' token
// from an authoriziation header.
module.exports = function (header) {
  // Remove the Bearer prefix and extract the token
  var regex = /.*[b|B]earer(?:\s+)(\S+)/;

  // Execute and grab the first capture group.
  var result = regex.exec(header);
  return result ? result[1] : false;
};

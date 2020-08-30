const { html2json } = require('html2json');
const data = require('./html');
module.exports = html2json(data);

const { html2json } = require('html2json');
const fetchUrl = require('./fetchUrl');
const { removeComments } = require('./utils');
const getLinks = require('./links');
const getDates = require('./details');

const fetchDetails = async function (url) {
  let data = await fetchUrl(url);
  data = html2json(removeComments(data));
  const links = getLinks(data);
  const details = getDates(data);
  return Object.assign({ important_links: links }, details);
};

module.exports = fetchDetails;

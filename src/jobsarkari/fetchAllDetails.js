const { html2json } = require('html2json');
const fetchUrl = require('./utils/fetchUrl');
const { removeComments } = require('./utils/utils');
const getLinks = require('./utils/links');
const { getTitle, getDetails } = require('./utils/details');

const fetchDetails = async function (url) {
  let data = await fetchUrl.get(url);
  data = html2json(removeComments(data));
  const links = getLinks(data);
  const title = getTitle(data);
  const details = getDetails(data);
  Object.assign(details.important_links, links);
  return Object.assign({ title }, details);
};

module.exports = fetchDetails;

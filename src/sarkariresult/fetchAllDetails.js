const { html2json } = require('html2json');
const fetchUrl = require('./utils/fetchUrl');

const getLinks = require('./utils/links');
const {
  getTitle,
  getDetails,
  findOtherDetails,
  findHowToApply,
} = require('./utils/details');

const fetchDetails = async function (url) {
  const data = await fetchUrl.get(url);
  const important_links = getLinks(data);
  const title = getTitle(data);
  const details = getDetails(data);
  const how_to_apply = findHowToApply(data);
  const otherDetails = findOtherDetails(data);
  Object.assign(details.others, otherDetails);
  return Object.assign(details, how_to_apply, { important_links, title });
};

module.exports = fetchDetails;

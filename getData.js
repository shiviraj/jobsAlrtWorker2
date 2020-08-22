const { html2json } = require('html2json');
const fs = require('fs');
const fetchUrl = require('./src/fetchUrl');
const { removeComments } = require('./src/utils');
const getLinks = require('./src/links');
const getDates = require('./src/details');

const fetchDetails = async function (url) {
  // let data = await fetchUrl(url);
  let data = fs.readFileSync('data.html', 'utf8');
  data = html2json(removeComments(data));
  const links = getLinks(data);
  const details = getDates(data);
  return Object.assign({ important_links: links }, details);
};

const main = async () => {
  const details = await fetchDetails(
    'https://www.jobsarkari.com/recruitment/bpsc-professor-associate-professor-s/' ||
      'https://www.jobsarkari.com/recruitment/ncte-various-s/'
  );
  fs.writeFileSync(`${__dirname}/list.json`, JSON.stringify(details, null, 2));
};

main();

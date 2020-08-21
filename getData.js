const { html2json } = require('html2json');
const fs = require('fs');
const fetchUrl = require('./src/fetchUrl');
const { removeComments } = require('./src/utils');
const getLinksAndLists = require('./src/linksAndLists');
const getGeneralDetails = require('./src/generalDetails');

const fetchDetails = async function (url) {
  // let data = await fetchUrl(url);
  let data = fs.readFileSync('data.html', 'utf8');
  data = html2json(removeComments(data));
  const links = getLinksAndLists(data);
  const general = getGeneralDetails(data);
  return Object.assign(links, { general });
};

const main = async () => {
  const details = await fetchDetails(
    'https://www.jobsarkari.com/recruitment/hal-diploma-technician-s/' ||
      'https://www.jobsarkari.com/recruitment/ncte-various-s/'
  );
  fs.writeFileSync(`${__dirname}/list.json`, JSON.stringify(details, null, 2));
};

main();

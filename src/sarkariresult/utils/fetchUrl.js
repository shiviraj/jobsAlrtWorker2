const https = require('https');
const { html2json } = require('html2json');
const findFromTree = require('./tree');
const { removeComments } = require('./utils');

const findByClass = (className, item) => {
  return (
    item.attr &&
    item.attr.class &&
    (item.attr.class.includes(className) || item.attr.class === className)
  );
};

const fetchUrl = (url) => {
  return new Promise((resolve) => {
    https
      .request(url, (res) => {
        res.setEncoding('utf8');
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve(data));
      })
      .end();
  });
};

const get = async (url) => {
  const data = await fetchUrl(url);
  const html = html2json(removeComments(data));
  const result = findFromTree(html, findByClass.bind(null, 'two-columns'));
  return result[0];
};

module.exports = { get };

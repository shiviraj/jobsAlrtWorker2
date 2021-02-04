const axios = require('axios');
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

const fetchUrl = async (url) => await axios.get(url);

const get = async (url) => {
  const { data } = await fetchUrl(url);
  const html = html2json(removeComments(data));
  const result = findFromTree(html, findByClass.bind(null, 'two-columns'));
  return result[0];
};

module.exports = { get };

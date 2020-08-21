const { json2html } = require('html2json');

const removeComments = (html) => html.replace(/\s<!--[^>]*-->/g, '');

const snakeCase = (text) => text.trim().replace(/ /g, '_').toLowerCase();

const getRows = (data) => {
  const html = json2html(data)
    .replace(/<tr(.*?)>/g, '=>')
    .replace(/<\/td><td(.*?)>/g, '__::__')
    .replace(/<.*?>/g, '');
  const result = html.split('=>').filter((item) => item.trim());
  return result.map((item) => item.split('__::__'));
};

module.exports = { removeComments, snakeCase, getRows };

const { json2html } = require('html2json');

const removeComments = (html) => html.replace(/\s<!--[^>]*-->/g, '');

const snakeCase = (text) => text.trim().replace(/ /g, '_').toLowerCase();

const isValidRow = (row) => row.find((item) => item.trim());

const createRows = (html) => {
  let rows = html.split('=>').filter((item) => item.trim());
  rows = rows.map((item) => item.split('__::__'));
  return rows.reduce((result, row) => {
    if (isValidRow(row)) result.push(row);
    return result;
  }, []);
};

const getRows = (data) => {
  const html = json2html(data)
    .replace(/<tr(.*?)>/g, '=>')
    .replace(/<\/td><td(.*?)>/g, '__::__')
    .replace(/<.*?>/g, '');
  return createRows(html);
};

const getHeadRows = (data) => {
  const html = json2html(data)
    .replace(/<tr(.*?)>/g, '=>')
    .replace(/<\/th><th(.*?)>/g, '__::__')
    .replace(/<.*?>/g, '');
  return createRows(html);
};

module.exports = { removeComments, snakeCase, getRows, getHeadRows };
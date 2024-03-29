const moment = require('moment');
const { json2html } = require('html2json');

const removeComments = (html) =>
  html.replace(/<!--.*?-->/g, '').replace(/<style(.*?)<\/style>/gs, '').replace(/<script(.*?)<\/script>/gs, '');

const snakeCase = (text) =>
  text.trim().replace(/ /g, '_').replace(/\./g, '').toLowerCase();

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

const keys = [
  'how_to_apply',
  'selection_process',
  'important_links',
  'important_dates',
  'application_fee',
  'age_limit_details',
];

const removeUnusedKey = function (listKeys, list) {
  listKeys.reduce((result, key) => {
    if (!list[key]) delete list[key];
    return result;
  });
};

const makeKeysUnique = (list) => {
  const listKeys = Object.keys(list);
  keys.forEach((keyName) => {
    const key = listKeys.find((item) => item.includes(keyName));
    if (key !== keyName && list[key]) {
      list[keyName] = list[key];
      delete list[key];
    }
  });
  removeUnusedKey(listKeys, list);
  return list;
};

const convertIntoDate = (date) => {
  const dateInstance = moment(date, 'DD/MM/YYYY');
  return dateInstance.isValid() ? dateInstance.valueOf() : date;
};

const createDateInstance = (list) => {
  list.general.last_date = convertIntoDate(list.general.last_date);
  Object.keys(list.important_dates).forEach((key) => {
    if (key.includes('advt_no')) return;
    list.important_dates[key] = convertIntoDate(list.important_dates[key]);
  });
  return list;
};

module.exports = {
  removeComments,
  snakeCase,
  getRows,
  getHeadRows,
  makeKeysUnique,
  createDateInstance,
};

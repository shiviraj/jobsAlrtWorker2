const moment = require('moment');

const removeComments = (html) =>
  html.replace(/<!--(.*?)-->/gs, '').match(/<body>(.*?)<\/body>/gs)[0];

const removeSpace = (text) => {
  return text
    .split(' ')
    .filter((item) => item.trim())
    .map((item) => item.trim())
    .join(' ');
};

const snakeCase = (text) =>
  text.trim().replace(/ /g, '_').replace(/\./g, '').toLowerCase();

const convertIntoDate = (date) => {
  const dateInstance = moment(date, 'DD MMMM YYYY');
  return dateInstance.isValid() ? dateInstance.valueOf() : date;
};

const createDateInstance = (list) => {
  Object.keys(list).forEach((key) => {
    list[key] = convertIntoDate(list[key]);
  });
  return list;
};

module.exports = { removeComments, snakeCase, removeSpace, createDateInstance };

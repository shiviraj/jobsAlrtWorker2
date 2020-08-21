const findFromTree = require('./tree');
const { getRows, snakeCase } = require('./utils');

const getGeneralDetails = (data) => {
  [data] = findFromTree(data, 'tag', 'table').slice(-2, -1);
  const html = getRows(data);
  return html.reduce((context, post) => {
    const key = post[0].trim();
    if (key.endsWith(':')) {
      const keyName = snakeCase(post[0].replace(/:(.*?)/, ''));
      context[keyName] = post[1].trim();
    }
    return context;
  }, {});
};

module.exports = getGeneralDetails;

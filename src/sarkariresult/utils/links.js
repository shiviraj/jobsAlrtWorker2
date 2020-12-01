const filterFromTree = require('./tree');
const { snakeCase } = require('./utils');

const findImportantLinks = (item) => {
  return item.tag === 'a' && item.child && item.child[1];
};

const getLinks = (data) => {
  const posts = filterFromTree(data, findImportantLinks).reverse();
  return posts.reduce((result, item) => {
    const key = snakeCase(item.child[0].text);
    result[key] = item.attr.href;
    return result;
  }, {});
};

module.exports = getLinks;

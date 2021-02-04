const filterFromTree = require('./tree');
const { snakeCase } = require('./utils');

const findImportantLinks = (item) => {
  return (
    item.tag === 'td' &&
    item.attr &&
    item.attr.class &&
    item.attr.class.includes('imp-link')
  );
};

const getLinks = (data) => {
  const posts = filterFromTree(data, findImportantLinks).reverse();
  require('fs').writeFileSync('data.json', JSON.stringify(posts));
  console.log(posts);
  return posts.reduce((result, item) => {
    const key = snakeCase(item.child[0].text);
    result[key] = item.attr.href;
    return result;
  }, {});
};

module.exports = getLinks;

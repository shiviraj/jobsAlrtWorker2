const findFromTree = require('./tree');
const { snakeCase } = require('./utils');

const findTag = (tag, item) => item.tag === tag;

const getLink = ([key, value]) => {
  key = key.child[0];
  if (key.child) {
    key = key.child[0];
  }
  value = value.child[0].attr.href;
  return [snakeCase(key.text), value];
};

const parseLinks = (data) => {
  const posts = findFromTree(data, findTag.bind(null, 'tr'));
  return posts.reduce((result, post) => {
    const [key, value] = getLink(post.child);
    result[key] = value;
    return result;
  }, {});
};

const findImportLinks = (item) => {
  if (!item.child || !item.child[0].child || !item.child[0].child[0].text)
    return false;
  const text = item.child[0].child[0].text;
  return text.replace(/ /g, '').toLowerCase() === 'importantlinks';
};

const getLinks = (data) => {
  const posts = findFromTree(data, findImportLinks);
  const [links] = findFromTree(posts[1], findTag.bind(null, 'table'));
  return parseLinks(links);
};

module.exports = getLinks;

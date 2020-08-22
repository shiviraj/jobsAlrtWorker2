const { findFromTree } = require('./tree');
const { snakeCase } = require('./utils');

const findTag = (tag, item) => item.tag === tag;

const getLink = ([key, value]) => {
  key = key.child[0].child[0].text;
  value = value.child[0].attr.href;
  return [snakeCase(key), value];
};

const parseLinks = (data) => {
  const posts = findFromTree(data, findTag.bind(null, 'tr'));
  return posts.reduce((result, post) => {
    const [key, value] = getLink(post.child);
    result[key] = value;
    return result;
  }, {});
};

const getLinks = (data) => {
  const posts = findFromTree(data, findTag.bind(null, 'table'));
  return parseLinks(posts[1]);
};

module.exports = getLinks;

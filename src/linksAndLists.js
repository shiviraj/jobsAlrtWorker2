const findFromTree = require('./tree');
const { snakeCase } = require('./utils');

const getLink = ([key, value]) => {
  key = key.child[0].child[0].text;
  value = value.child[0].attr.href;
  return [snakeCase(key), value];
};

const parseLinks = (data) => {
  const posts = findFromTree(data, 'tag', 'tr');
  return posts.reduce((result, post) => {
    const [key, value] = getLink(post.child);
    result[key] = value;
    return result;
  }, {});
};

const createListsFromData = (data) => {
  const [posts] = findFromTree(data, 'tag', 'tbody');
  return posts.child.reduce((result, post) => {
    const item = post.child[0].child[0].text.replace(/(.*?)\./, '').trim();
    return result.concat(item);
  }, []);
};

const getLinksAndLists = (data) => {
  const posts = findFromTree(data, 'tag', 'table').slice(1, 4);
  const importantLinks = parseLinks(posts[0]);
  const howToApply = createListsFromData(posts[1]);
  const selectionProcess = createListsFromData(posts[2]);
  return { importantLinks, howToApply, selectionProcess };
};

module.exports = getLinksAndLists;

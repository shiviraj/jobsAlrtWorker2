const { snakeCase } = require('./utils');

const findById = (item) => item.attr && item.attr.id === 'rslt_slbs_sction';

const createLinks = (node) => {
  const queue = [node];
  const result = {};
  const visited = [];
  while (queue.length) {
    if (!visited.includes(node) && node.attr) {
      if (node.attr.href)
        result[snakeCase(node.child[0].text)] = node.attr.href;
      queue.push(...node.child);
      visited.push(node);
    }
    node = node.child ? node.child[0] : queue.pop();
  }
  return result;
};

const findExtra = (list, post) => {
  const data = list.find(findById);
  let links = {};
  if (data) links = createLinks(data);
  post.important_links = links;
  return post;
};

module.exports = findExtra;

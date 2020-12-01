const filterFromTree = require('./tree');
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

const getStatus = (list) => {
  const findByHref = (item) =>
    item.attr && item.attr.href === '#rslt_slbs_sction';
  const newList = { child: list };
  const data = filterFromTree(newList, findByHref);
  return data.reduce((statuses, node) => {
    const status = node.child[0].text.replace(/Check /, '');
    return statuses.concat(snakeCase(status));
  }, []);
};

const findExtra = (list, post) => {
  const data = list.find(findById);
  const state = getStatus(list);
  let important_links = {};
  if (data) important_links = createLinks(data);
  return Object.assign(post, { important_links, state });
};

module.exports = findExtra;

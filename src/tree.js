const findPosts = (data, key, value) => {
  const queue = [data];
  const result = [];
  const visited = [];
  while (queue.length) {
    if (!visited.includes(data) && data.child) {
      const posts = data.child.filter((item) => item[key] === value);
      posts.length && result.push(...posts);
      queue.push(...data.child);
      visited.push(data);
    }
    data = data.child ? data.child[0] : queue.pop();
  }
  return result;
};

module.exports = findPosts;

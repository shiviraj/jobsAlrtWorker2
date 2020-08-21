const https = require('https');
const html2json = require('html2json').html2json;
const fs = require('fs');

const getData = (url) => {
  return new Promise((resolve) => {
    https
      .request(url, (res) => {
        res.setEncoding('utf8');
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve(data));
      })
      .end();
  });
};

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

const removeComments = (html) => html.replace(/\s<!--[^>]*-->/g, '');

const getLink = ([key, value]) => {
  key = key.child[0].child[0].text.replace(/ /g, '_').toLowerCase();
  value = value.child[0].attr.href;
  return [key, value];
};

const parseLinks = (data) => {
  const posts = findPosts(data, 'tag', 'tr');
  return posts.reduce((result, post) => {
    const [key, value] = getLink(post.child);
    result[key] = value;
    return result;
  }, {});
};

const createListsFromData = (data) => {
  const [posts] = findPosts(data, 'tag', 'tbody');
  return posts.child.reduce((result, post) => {
    const item = post.child[0].child[0].text.replace(/(.*?)\./, '').trim();
    return result.concat(item);
  }, []);
};

const getDetails = (data) => {
  const posts = findPosts(data, 'tag', 'table').slice(1, 4);
  const importantLinks = parseLinks(posts[0]);
  const howToApply = createListsFromData(posts[1]);
  const selectionProcess = createListsFromData(posts[2]);
  return { importantLinks, howToApply, selectionProcess };
};

const fetchDetails = async function (url) {
  // let data = await getData(url);
  let data = fs.readFileSync('data.html', 'utf8');
  data = html2json(removeComments(data));
  const links = getDetails(data);
  fs.writeFileSync(`${__dirname}/links.json`, JSON.stringify(links, null, 2));
  // return parsePosts(posts);
};

const main = async () => {
  const details = await fetchDetails(
    'https://www.jobsarkari.com/recruitment/ncte-various-s/' ||
      'https://www.jobsarkari.com/recruitment/ncte-various-s/'
  );
  // fs.writeFileSync(`${__dirname}/list.json`, JSON.stringify(details, null, 2));
};

main();

const Queue = require('./model/queue');
const Post = require('./model/post');

const fetchJob = async () => {
  const queue = await Queue.findOne({});
  const job = queue.list.pop();
  await queue.save();
  return job;
};

const createUrl = (text) => {
  return text
    .replace(/[\/\*\.]/g, '')
    .replace(/ /g, '-')
    .toLowerCase();
};

const updateDB = async (details, { url }) => {
  Object.assign(details, { source: url });

  const savedJob = await Post.findOne({ source: url });
  if (savedJob) {
    details.modified_at = new Date();
    Object.assign(savedJob, details);
    return await savedJob.save();
  }

  details.url = createUrl(details.title);

  const post = new Post(details);
  return await post.save();
};

module.exports = { fetchJob, updateDB };

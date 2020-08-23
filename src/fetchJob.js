const Queue = require('./model/queue');
const Post = require('./model/post');

const fetchJob = async () => {
  const queue = await Queue.findOne({});
  const job = queue.list.pop();
  await queue.save();
  return job;
};

const updateDB = async (details, { url }) => {
  Object.assign(details, { url });

  const savedJob = await Post.findOne({ url });
  if (savedJob) {
    details.modified_at = new Date();
    Object.assign(savedJob, details);
    return await savedJob.save();
  }

  const post = new Post(details);
  await post.save();
};

module.exports = { fetchJob, updateDB };

const Queue = require('./model/queue');
const Post = require('./model/post');
const NeedToUpload = require('./model/needToUpload');
const keys = require('./utils/keys');
const { createDateInstance } = require('./utils/utils');

const fetchJob = async () => {
  const queue = await Queue.findOne({});
  const job = queue.list.pop();
  await queue.save();
  return job;
};

const createUrl = (text) => {
  return text
    .replace(/[\/\*\.\(\)\&]/g, '')
    .replace(/ /g, '-')
    .toLowerCase();
};

const recreateObject = (postDetails) => {
  postDetails.others || (postDetails.others = {});
  Object.keys(postDetails).forEach((key) => {
    if (!keys.includes(key)) postDetails.others[key] = postDetails[key];
  });
};

const updateDB = async (details, { url }) => {
  Object.assign(details, { source: url });
  recreateObject(details);
  createDateInstance(details);

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

const needToUpload = async ({ url, name }) => {
  const job = new NeedToUpload({ url, name });
  await job.save();
};

module.exports = { fetchJob, updateDB, needToUpload };

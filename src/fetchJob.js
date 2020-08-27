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
    .replace(/[\/\*\.\(\)]/g, '')
    .replace(/ /g, '-')
    .toLowerCase();
};

const keys = [
  '_id',
  'how_to_apply',
  'selection_process',
  'status',
  'created_at',
  'modified_at',
  'published_at',
  'important_links',
  'vacancy_details',
  'application_fee',
  'age_limit_details',
  'title',
  'important_dates',
  'general',
  'source',
  'url',
  'others',
];

const recreateObject = (postDetails) => {
  postDetails.others || (postDetails.others = {});
  Object.keys(postDetails).forEach((key) => {
    if (!keys.includes(key)) postDetails.others[key] = postDetails[key];
  });
};

const updateDB = async (details, { url }) => {
  Object.assign(details, { source: url });
  recreateObject(details);

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

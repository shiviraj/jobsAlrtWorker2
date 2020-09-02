const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  general: { type: Object, required: true },
  how_to_apply: { type: Array },
  selection_process: { type: Array },
  important_dates: { type: Object },
  important_links: { type: Object },
  application_fee: { type: Object },
  vacancy_details: { type: Object },
  age_limit_details: { type: Object },
  created_at: { type: Number, default: new Date() },
  published_at: { type: Number },
  modified_at: { type: Number },
  title: { type: String, required: true, trim: true },
  url: { type: String, required: true, trim: true },
  source: { type: String, required: true, trim: true },
  status: { type: String, required: true, default: 'drafted' },
  others: { type: Object },
});

module.exports = mongoose.model('Post', PostSchema);

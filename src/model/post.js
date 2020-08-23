const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  general: { type: Object, required: true },
  how_to_apply: { type: Array },
  selection_process: { type: Array },
  important_dates: { type: Object },
  important_links: { type: Object },
  created_at: { type: Number, default: new Date() },
  published_at: { type: Number },
  modified_at: { type: Number },
  others: { type: Object },
  title: { type: String, required: true, trim: true },
  url: { type: String, required: true, trim: true },
  source: { type: String, required: true, trim: true },
  status: { type: String, required: true, default: 'drafted' },
});

module.exports = mongoose.model('Post', PostSchema);

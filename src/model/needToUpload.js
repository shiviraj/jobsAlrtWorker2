const mongoose = require('mongoose');

const NeedToUploadSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  url: { type: String, required: true, trim: true },
});

module.exports = mongoose.model('NeedToUpload', NeedToUploadSchema);

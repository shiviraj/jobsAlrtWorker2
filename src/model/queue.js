const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
  list: [
    {
      name: { type: String, required: true, trim: true },
      url: { type: String, required: true, trim: true },
    },
  ],
  list1: [
    {
      name: { type: String, required: true, trim: true },
      url: { type: String, required: true, trim: true },
    },
  ],
});

module.exports = mongoose.model('ItemToUpdate', ListSchema);

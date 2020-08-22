const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
  list: [
    {
      name: { type: String, required: true, trim: true },
      url: { type: String, required: true, trim: true },
    },
  ],
});

const ItemToUpdate = mongoose.model('ItemToUpdate', ListSchema);

module.exports = { ItemToUpdate };

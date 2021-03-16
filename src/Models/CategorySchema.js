const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  color: {
    type: String,
    require: true,
  },
  createdAt: {
    type: String,
    require: true,
  },
  updatedAt: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('Category', categorySchema);

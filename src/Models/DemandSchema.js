const mongoose = require('mongoose');

const DemandSchema = new mongoose.Schema({
  open: {
    type: Boolean,
    default: true,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  process: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  sector: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    require: true,
  },
  updatedAt: {
    type: Date,
    require: true,
  },
});

module.exports = mongoose.model('Demand', DemandSchema);

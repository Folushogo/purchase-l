const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  description: { type: String },
  vendor: { type: String },
  assignedTo: { type: String },
  sabreTag: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);

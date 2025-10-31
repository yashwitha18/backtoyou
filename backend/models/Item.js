const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  imagePath: { type: String },
  location: { type: { type: String }, coordinates: [] }, // optional geoJSON
  status: { type: String, enum: ['lost','found','returned'], default: 'lost' },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  approved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// indexes for faster queries
itemSchema.index({ category: 1 });
itemSchema.index({ status: 1 });
itemSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Item', itemSchema);

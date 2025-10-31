const Item = require('../models/Item');

exports.approveItem = async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  item.approved = true;
  await item.save();
  res.json(item);
};

exports.rejectItem = async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  item.approved = false;
  await item.save();
  res.json(item);
};

exports.getStats = async (req, res) => {
  const stats = await Item.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);
  // also get approved counts
  const approvedCount = await Item.countDocuments({ approved: true });
  res.json({ stats, approvedCount });
};

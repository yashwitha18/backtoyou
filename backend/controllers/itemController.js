const Item = require('../models/Item');

exports.createItem = async (req, res) => {
  const { title, description, category, date, location, status } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
  const newItem = await Item.create({
    title, description, category, date, location,
    status: status || 'lost',
    imagePath,
    postedBy: req.user.id,
    approved: false
  });
  res.status(201).json(newItem);
};

exports.getItems = async (req, res) => {
  // filters: category, status, dateFrom, dateTo, q(search text), page, limit
  const { category, status, q, page = 1, limit = 10 } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (status) filter.status = status;
  if (q) filter.$text = { $search: q }; // requires text index if used
  const items = await Item.find(filter)
    .populate('postedBy', 'name email')
    .sort({ createdAt: -1 })
    .skip((page-1)*limit)
    .limit(Number(limit));
  res.json(items);
};

exports.getItemById = async (req, res) => {
  const item = await Item.findById(req.params.id).populate('postedBy', 'name email');
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
};

exports.updateItem = async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  if (item.postedBy.toString() !== req.user.id && req.user.role !== 'admin')
    return res.status(403).json({ message: 'Not allowed' });

  // accept fields
  Object.assign(item, req.body);
  if (req.file) item.imagePath = `/uploads/${req.file.filename}`;
  await item.save();
  res.json(item);
};

exports.deleteItem = async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  if (item.postedBy.toString() !== req.user.id && req.user.role !== 'admin')
    return res.status(403).json({ message: 'Not allowed' });
  await item.remove();
  res.json({ message: 'Deleted' });
};

exports.markReturned = async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  item.status = 'returned';
  await item.save();
  res.json(item);
};

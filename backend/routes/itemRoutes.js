const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');
const itemController = require('../controllers/itemController');

router.get('/', itemController.getItems);
router.get('/:id', itemController.getItemById);
router.post('/', protect, upload.single('image'), itemController.createItem);
router.put('/:id', protect, upload.single('image'), itemController.updateItem);
router.delete('/:id', protect, itemController.deleteItem);
router.post('/:id/returned', protect, itemController.markReturned);

module.exports = router;

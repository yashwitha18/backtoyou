const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController');

router.use(protect, adminOnly);
router.post('/items/:id/approve', adminController.approveItem);
router.post('/items/:id/reject', adminController.rejectItem);
router.get('/stats', adminController.getStats);

module.exports = router;

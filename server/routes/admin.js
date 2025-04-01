const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadToS3 } = require('../utils/uploadS3'); // ✅ uses your existing utility
const { authenticate } = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/authMiddleware');
const Product = require('../models/Product'); // ✅ create this model if not already

const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ POST /api/admin/upload-product
router.post(
  '/upload-product',
  authenticate,
  requireAdmin,
  upload.single('image'),
  async (req, res) => {
    try {
      const { name, description, category, tags } = req.body;
      const file = req.file;

      if (!file) return res.status(400).json({ message: 'Image is required' });

      // Upload to S3
      const imageUrl = await uploadToS3(file);

      const product = new Product({
        name,
        description,
        category,
        tags: tags.split(',').map((t) => t.trim()),
        image: imageUrl,
      });

      await product.save();
      res.status(201).json({ message: 'Product uploaded successfully', product });
    } catch (err) {
      console.error('Upload error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;

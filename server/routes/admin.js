const express = require('express');
const router = express.Router();
const upload = require('../utils/uploadS3'); // uses your S3 utility
const { authenticate, requireAdmin } = require('../middleware/authMiddleware');
const Product = require('../models/Product'); // your product model

// ✅ POST /api/admin/upload-product
router.post(
  '/upload-product',
  authenticate,
  requireAdmin,
  upload('product').single('image'),
  async (req, res) => {
    try {
      const imageUrl = req.file.location;
      const { name, description, category, tags } = req.body;

      const product = new Product({
        name,
        description,
        category,
        tags: tags.split(',').map(tag => tag.trim()),
        imageUrl,
      });

      await product.save();

      res.status(200).json({ message: 'Product uploaded successfully', product });
    } catch (err) {
      console.error('Upload error:', err);
      res.status(500).json({ message: 'Error uploading product' });
    }
  }
);

module.exports = router;

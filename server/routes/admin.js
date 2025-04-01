const express = require('express');
const router = express.Router();
const upload = require('../utils/uploadS3');
const { authenticate, requireAdmin } = require('../middleware/authMiddleware');
const Product = require('../models/Product');

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
        image: imageUrl, // ✅ FIXED: this is the field your frontend expects
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

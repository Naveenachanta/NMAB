const express = require('express');
const router = express.Router();
const upload = require('../utils/uploadS3');
const { authenticate, requireAdmin } = require('../middleware/authMiddleware');
const Product = require('../models/Product');

router.post(
  '/upload-product',
  authenticate,
  requireAdmin,
  upload('product').array('images', 6), // Upload multiple images
  async (req, res) => {
    try {
      const { name, description, category, subcategory, tags, price } = req.body;

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'Image upload failed' });
      }

      const imageUrls = req.files.map((file) => file.location);

      const product = new Product({
        name,
        description,
        category,
        subcategory,
        price: parseFloat(price),
        tags: tags.split(',').map(tag => tag.trim()),
        images: imageUrls,
      });

      await product.save();

      res.status(200).json({ message: '✅ Product uploaded successfully', product });
    } catch (err) {
      console.error('❌ Upload error:', err);
      res.status(500).json({ message: 'Error uploading product' });
    }
  }
);

module.exports = router;

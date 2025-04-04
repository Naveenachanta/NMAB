const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { authenticate, requireAdmin } = require('../middleware/authMiddleware');

// 📦 POST /api/products/upload-product (Admin only)
router.post('/upload-product', authenticate, requireAdmin, async (req, res) => {
  try {
    const { name, description, category, tags, imageUrl } = req.body;

    const newProduct = new Product({
      name,
      description,
      category,
      tags,
      imageUrl,
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (err) {
    console.error('❌ Error adding product:', err);
    res.status(500).json({ message: 'Error adding product' });
  }
});

// 🌐 GET /api/products - Fetch all products
router.get('/', async (req, res) => {
  try {
    const category = req.query.category;
const query = category ? { category: new RegExp(`^${category}$`, 'i') } : {};
const products = await Product.find(query).sort({ createdAt: -1 });
res.json(products);

  } catch (err) {
    console.error('❌ Error fetching products:', err);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

module.exports = router;

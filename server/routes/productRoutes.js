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

// 🔍 GET /api/products/:id - Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error('❌ Error fetching product by ID:', err);
    res.status(500).json({ message: 'Error fetching product' });
  }
});

module.exports = router;

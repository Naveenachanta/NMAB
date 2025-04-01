const express = require('express');
const router = express.Router();
const multer = require('multer');
const  upload  = require('../utils/uploadS3'); // ✅ uses your existing utility
const { authenticate } = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/authMiddleware');
const Product = require('../models/Product'); // ✅ create this model if not already

const storage = multer.memoryStorage();

// ✅ POST /api/admin/upload-product
router.post(
    '/upload-product',
    authenticate,
    requireAdmin,
    upload('product').single('image'),
    async (req, res) => {
      try {
        const { name, description, category, tags } = req.body;
        const imageUrl = req.file.location;
  
        const newProduct = new Product({
          name,
          description,
          category,
          tags: tags.split(',').map(t => t.trim()),
          imageUrl,
        });
  
        await newProduct.save();
        res.status(201).json({ message: 'Product uploaded', product: newProduct });
      } catch (err) {
        console.error("Upload error:", err);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  );

module.exports = router;

const express = require('express');
const Bill = require('../models/Bill');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    console.log("🚫 No token provided");
    return res.sendStatus(401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("✅ Authenticated user:", req.user.userId);
    next();
  } catch (err) {
    console.error("❌ Token verification failed:", err.message);
    res.sendStatus(403);
  }
};

router.use(authMiddleware);

// POST - Add a new bill
router.post('/', async (req, res) => {
  try {
    const { name, dueDate, frequency } = req.body; // ✅ make sure dueDate is extracted

    const bill = new Bill({
      name,
      dueDate: new Date(dueDate), // ✅ convert string to Date
      frequency,
      userId: req.user.userId,
    });

    const savedBill = await bill.save();
    res.status(201).json(savedBill);
  } catch (error) {
    console.error('❌ Failed to save bill:', error);
    res.status(500).json({ error: 'Server error saving bill' });
  }
});



// GET - Fetch bills for the logged-in user
router.get('/', async (req, res) => {
  try {
    const bills = await Bill.find({ userId: req.user.userId });
    console.log(`📄 Retrieved ${bills.length} bills for user ${req.user.userId}`);
    res.json(bills);
  } catch (err) {
    console.error("❌ Failed to fetch bills:", err.message);
    res.status(500).json({ message: 'Failed to fetch bills', error: err.message });
  }
});

module.exports = router;

require('dotenv').config();
require('./config/passport'); // your passport config file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport'); // ✅ you missed this

const authRoutes = require('./routes/auth');
const billRoutes = require('./routes/bills');
const preferenceRoutes = require('./routes/preferences');
const profileRoutes = require('./routes/profile');
const googleAuthRoutes = require('./routes/googleAuth');
const askGptRoute = require('./routes/askGpt');
const app = express();

// ✅ Session + Passport config
app.use(session({
  secret: 'lumicare-secret',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// ✅ CORS
app.use(cors({
  origin: ['http://localhost:5001', 'https://swotandstudy.com'],
  methods: ['GET', 'POST'],
  credentials: true,
}));

// ✅ Body parser
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/preferences', preferenceRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/auth', googleAuthRoutes);
app.use('/api/ask-gpt', askGptRoute);

// ✅ MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB connected');
  mongoose.connection.once('open', () => {
    console.log('📂 Connected to DB name:', mongoose.connection.name);
  });

  app.listen(5001, () => {
    console.log('🚀 Server running on port 5001');
  });
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});
app.get('/', (req, res) => {
  res.send('✅ NMAB Backend is Live');
});


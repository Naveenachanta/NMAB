import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Register from './pages/Register';
import Login from './pages/Login';
import Preferences from './pages/Preferences';
import ThankYou from './pages/ThankYou';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import GoogleRedirectHandler from './pages/GoogleRedirectHandler';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="preferences" element={<Preferences />} />
          <Route path="/google-success" element={<GoogleRedirectHandler />} />
          <Route path="/thankyou" element={<ThankYou />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} /> {/* ✅ Add this line */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

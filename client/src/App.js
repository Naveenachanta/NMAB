import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Preferences from './pages/Preferences';
import GoogleRedirectHandler from './pages/GoogleRedirectHandler';
import ThankYou from './pages/ThankYou';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Admin from './pages/Admin';

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="preferences" element={<Preferences />} />
            <Route path="google-success" element={<GoogleRedirectHandler />} />
            <Route path="thankyou" element={<ThankYou />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="admin" element={<Admin />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

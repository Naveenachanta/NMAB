import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TeslaLoader from '../components/TeslaLoader';
const GoogleRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirect = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
  
      if (!token) {
        navigate('/login');
        return;
      }
  
      localStorage.setItem('token', token);
  
      // ✅ Show loader for 1.5s
      await new Promise((res) => setTimeout(res, 1500));
  
      try {
        const res = await axios.get('http://localhost:5001/api/preferences', {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        navigate(res.data ? '/dashboard' : '/preferences');
      } catch (err) {
        navigate('/preferences');
      }
    };
  
    handleRedirect();
  }, []);
  

  return <TeslaLoader />;
};

export default GoogleRedirectHandler;

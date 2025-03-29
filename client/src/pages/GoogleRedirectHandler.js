import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const GoogleRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirect = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      if (!token) {
        console.error('❌ Token missing in URL');
        navigate('/login');
        return;
      }

      localStorage.setItem('token', token);

      try {
        const res = await axios.get('https://api.swotandstudy.com/api/preferences', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data) {
          navigate('/dashboard');
        } else {
          navigate('/preferences');
        }
      } catch (err) {
        console.log('No preferences found, redirecting to preferences page');
        navigate('/preferences');
      }
    };

    handleRedirect();
  }, [navigate]);

  return <div style={{ textAlign: 'center', marginTop: '100px' }}>🔄 Logging you in...</div>;
};

export default GoogleRedirectHandler;

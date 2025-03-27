import React from 'react';
import { 
  Container, 
  Title, 
  Subtitle, 
  Emoji, 
  LogoutButton 
} from './ThankYou.styles';
import { useNavigate } from 'react-router-dom';

const ThankYou = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <Container>
     <Emoji>🥳</Emoji>
      <Title>Thank you!</Title>
      <Subtitle>
        Your preferences have been saved. We’re curating the perfect skincare experience for you. 🌸<br />
        Please check back soon as we launch the full experience. You'll be able to pick up right where you left off.
      </Subtitle>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </Container>
  );
};

export default ThankYou;

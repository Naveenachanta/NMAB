import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import CustomToast from './CustomToast'; // Import custom toast

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Footer = () => {
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        showToast('Thank you for subscribing!');
        e.target.reset();
      } else {
        showToast(data.message || 'Subscription failed.');
      }
    } catch (err) {
      showToast('Server error. Please try again later.');
    }
  };

  return (
    <FooterContainer>
      <Divider />
      <HeaderRow>
        <Logo>LUMICARE</Logo>
      </HeaderRow>

      <FooterGrid>
        <FooterColumn>
          <ColumnHeading>EXPLORE</ColumnHeading>
          <FooterLink href="#">All Products</FooterLink>
          <FooterLink href="#">New Arrivals</FooterLink>
          <FooterLink href="#">Best Sellers</FooterLink>
          <FooterLink href="#">Gift Sets</FooterLink>
        </FooterColumn>

        <FooterColumn>
          <ColumnHeading>SUPPORT</ColumnHeading>
          <FooterLink href="#">Help Center</FooterLink>
          <FooterLink href="#">Shipping & Returns</FooterLink>
          <FooterLink href="#">Terms & Policies</FooterLink>
          <FooterLink href="#">Contact Us</FooterLink>
        </FooterColumn>

        <FooterColumn>
          <ColumnHeading>COMPANY</ColumnHeading>
          <FooterLink href="#">Our Philosophy</FooterLink>
          <FooterLink href="#">Our Team</FooterLink>
          <FooterLink href="#">Careers</FooterLink>
          <FooterLink href="#">Press</FooterLink>
        </FooterColumn>

        <FooterColumn>
          <ColumnHeading>FOLLOW US</ColumnHeading>
          <SocialIcons>
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaYoutube /></a>
          </SocialIcons>
        </FooterColumn>
      </FooterGrid>

      <NewsletterBox>
        <h5>Subscribe to our newsletter</h5>
        <form onSubmit={handleSubscribe}>
          <input type="email" name="email" placeholder="Enter your email" required />
          <button type="submit">Subscribe</button>
        </form>
      </NewsletterBox>

      <BottomBar>© LUMICARE 2025 &nbsp; | &nbsp; EN</BottomBar>

      {/* Toast Notification */}
      <CustomToast message={toastMessage} />
    </FooterContainer>
  );
};

export default Footer;

// Styled Components (Unchanged)
const FooterContainer = styled.footer`
  background-color: #000;
  color: white;
  padding: 3rem 2rem 2rem;
  font-family: 'Didot', serif;
`;

const Divider = styled.div`
  height: 1px;
  background: #333;
  margin-bottom: 2.5rem;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: flex-start;

  @media (max-width: 768px) {
    justify-content: center;
    margin-bottom: 2rem;
  }
`;

const Logo = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.25rem;
  margin-bottom: 2rem;
  animation: ${fadeIn} 1.2s ease-out;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 2.5rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const FooterColumn = styled.div``;

const ColumnHeading = styled.h4`
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.04rem;
  margin-bottom: 1rem;
`;

const FooterLink = styled.a`
  display: block;
  font-size: 0.85rem;
  margin-bottom: 0.6rem;
  color: #bbb;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: white;
  }
`;

const NewsletterBox = styled.div`
  margin-top: 3rem;
  text-align: center;

  h5 {
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 1rem;
    letter-spacing: 0.5px;
  }

  form {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;

    input {
      padding: 0.6rem 1rem;
      border: 1px solid #333;
      background: #111;
      color: white;
      border-radius: 4px;
      width: 240px;
    }

    button {
      padding: 0.6rem 1.5rem;
      border: 1px solid white;
      background: transparent;
      color: white;
      font-family: 'Didot', serif;
      border-radius: 4px;
      transition: all 0.3s ease;
      cursor: pointer;

      &:hover {
        background: white;
        color: black;
      }
    }
  }
`;

const BottomBar = styled.div`
  text-align: center;
  font-size: 0.75rem;
  color: #777;
  padding-top: 3rem;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-top: 1rem;

  a {
    color: #bbb;
    transition: color 0.2s ease;
    font-size: 1rem;

    &:hover {
      color: white;
    }
  }

  justify-content: center;

  @media (min-width: 769px) {
    justify-content: start;
  }
`;

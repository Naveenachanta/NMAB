import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const LoginPage = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  background-color: #fff;
  font-family: 'Poppins', sans-serif;

  @media (max-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

export const LoginLeft = styled.div`
flex: 1;
background-color: #dab6f7;
position: relative;
overflow: hidden;
display: flex;
align-items: center;
justify-content: center;


  img {
   height: 270%;
    max-width: 100%;
    object-fit: contain;
    object-position: center;
    z-index: 2;
  }
   @media (max-width: 768px) {
    flex: 1;
    min-width: 50%;
  }
`;

export const LoginRight = styled.div`
  flex: 1;
  background-color: #fff;
  color: #000;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

export const NMABLogo = styled.h1`
  font-family: 'Orbitron', sans-serif;
  font-size: 2.2rem;
  font-weight: 700;
  letter-spacing: 0.7rem;
  color: #111;
  margin-bottom: 0.3rem;
  text-transform: uppercase;
  text-align: center;
  animation: fadeIn 1s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;


export const Title = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: 1px;
  margin: 0.5rem 0 0.8rem;
  color: #333;
  text-align: center;
`;

export const Subtitle = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 2rem;
  text-align: center;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  padding: 0.9rem 1.2rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
`;

export const ForgotLink = styled(Link)`
  font-size: 0.9rem;
  text-align: right;
  margin-bottom: 1.5rem;
  color: #d60480;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const Button = styled.button`
  padding: 1rem;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #222;
  }
`;

export const FooterText = styled.p`
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: #444;

  a {
    color: #d60480;
    font-weight: bold;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Footer = styled.footer`
  margin-top: 2rem;
  font-size: 0.8rem;
  color: #aaa;
`;
export const GoogleButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  color: #555;
  border: 1px solid #ddd;
  border-radius: 30px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  margin-top: 20px;
  box-shadow: 0px 4px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  gap: 10px;

  &:hover {
    background: #f5f5f5;
    box-shadow: 0px 6px 12px rgba(0,0,0,0.15);
    transform: translateY(-1px);
  }

  img {
    width: 20px;
    height: 20px;
  }
`;

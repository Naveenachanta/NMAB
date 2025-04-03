import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const LoginPage = styled.div`
  min-height: 100vh;
  background: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Cormorant Garamond', serif;
  padding: 2rem;
`;

export const LoginBox = styled.div`
  max-width: 420px;
  width: 100%;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NMABLogo = styled.h1`
  font-family: 'Didot', serif;
  font-size: 2.6rem;
  letter-spacing: 1rem;
  font-weight: 400;
  margin-bottom: 1.5rem;
  text-align: center;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
  text-align: center;
`;

export const Subtitle = styled.p`
  font-size: 0.95rem;
  color: #ccc;
  margin-bottom: 2.5rem;
  text-align: center;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const InputContainer = styled.div`
  position: relative;
`;

export const Input = styled.input`
  background: transparent;
  border: none;
  border-bottom: 1px solid #666;
  width: 100%;
  padding: 1rem 0;
  font-size: 1.1rem;
  color: white;
  font-family: 'Cormorant Garamond', serif;

  &:focus {
    outline: none;
    border-bottom-color: white;
  }

  &:focus + label,
  &:not(:placeholder-shown) + label {
    transform: translateY(-22px);
    font-size: 0.75rem;
    opacity: 0.85;
  }
`;

export const Label = styled.label`
  position: absolute;
  top: 1rem;
  left: 0;
  color: #aaa;
  font-size: 1rem;
  pointer-events: none;
  transition: all 0.3s ease;
`;

export const Button = styled.button`
  padding: 1rem;
  background-color: white;
  color: black;
  border: none;
  font-size: 1rem;
  font-family: 'Cormorant Garamond', serif;
  letter-spacing: 0.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-transform: uppercase;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const ForgotLink = styled(Link)`
  font-size: 0.85rem;
  color: #aaa;
  text-decoration: none;
  text-align: right;
  display: block;
  margin-top: -1.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

export const FooterText = styled.p`
  text-align: center;
  font-size: 0.95rem;
  margin-top: 2rem;
  color: #ccc;

  a {
    color: white;
    text-decoration: underline;
    font-weight: 500;
  }
`;

export const Footer = styled.footer`
  text-align: center;
  font-size: 0.8rem;
  color: #666;
  margin-top: 2.5rem;
`;

export const GoogleButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  color: black;
  border-radius: 25px;
  padding: 0.8rem 1.5rem;
  font-size: 0.95rem;
  font-family: 'Cormorant Garamond', serif;
  text-decoration: none;
  margin-top: 1.8rem;
  gap: 10px;
  transition: all 0.3s ease;

  &:hover {
    background: #f5f5f5;
    transform: translateY(-2px);
  }

  img {
    width: 18px;
    height: 18px;
  }
`;

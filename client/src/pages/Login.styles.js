import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const LoginPage = styled.div`
  background: #000;
  color: white;
  min-height: 100vh;
  padding: 5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Cormorant Garamond', serif;
`;

export const NMABLogo = styled.h1`
  font-size: 2rem;
  letter-spacing: 0.5rem;
  text-transform: uppercase;
  font-weight: 500;
  margin-bottom: 2rem;
`;

export const PageTitle = styled.h2`
  font-size: 2rem;
  font-weight: 500;
  letter-spacing: 0.15rem;
  text-transform: uppercase;
  margin: 0 0 1.4rem;
  padding-top: 1rem;
`;

export const Subtitle = styled.p`
  font-size: 1rem;
  font-weight: 300;
  color: #ccc;
  margin-bottom: 3rem;
  margin-top: 0.4rem;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
`;

export const InputContainer = styled.div`
  position: relative;
  margin-bottom: 2.5rem;
`;

export const FloatingLabel = styled.label`
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  color: #aaa;
  font-size: 1rem;
  pointer-events: none;
  transition: all 0.2s ease-in-out;
`;

export const Input = styled.input`
  background: transparent;
  border: none;
  border-bottom: 1px solid #444;
  padding: 1rem 1rem 0.5rem;
  width: 100%;
  color: white;
  font-size: 1rem;
  font-family: 'Cormorant Garamond', serif;
  &:focus {
    outline: none;
    border-color: white;
  }
  &:focus + ${FloatingLabel}, &:not(:placeholder-shown) + ${FloatingLabel} {
    top: -0.5rem;
    font-size: 0.75rem;
    color: white;
  }
`;

export const Button = styled.button`
  background: white;
  color: black;
  border: none;
  padding: 0.9rem 0;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.08rem;
  border-radius: 3px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #ddd;
  }
`;

export const FooterText = styled.p`
  font-size: 0.9rem;
  margin: 1.5rem 0 1rem;
  color: #aaa;

  a {
    color: white;
    font-weight: 500;
    text-decoration: underline;
  }
`;

export const GoogleButton = styled.a`
  margin-top: 1rem;
  background: white;
  color: black;
  border-radius: 999px;
  padding: 0.75rem 1.5rem;
  font-size: 0.95rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  text-decoration: none;
  font-weight: 500;

  img {
    width: 20px;
    height: 20px;
  }
`;

export const Footer = styled.footer`
  font-size: 0.75rem;
  color: #888;
  margin-top: 3rem;
`;

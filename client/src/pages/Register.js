import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  LoginPage,
  LoginLeft,
  LoginRight,
  NMABLogo,
  Title,
  Subtitle,
  Form,
  Input,
  Button,
  FooterText,
  Footer,
} from './Login.styles'; // using same styles as login

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://api.swotandstudy.com/api/auth/register', {
        email,
        password,
      });

      if (response.data && response.data.message === 'User registered') {
        alert('✅ Registration successful!');
        window.location.href = '/login';
      } else {
        alert('⚠️ Registration failed. Try again.');
      }
    } catch (err) {
      console.error('❌ Registration error:', err);
      alert(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <LoginPage>
      <LoginLeft>
        <img src="/images/registerlogin.png" alt="Woman caring for her skin" />
      </LoginLeft>

      <LoginRight>
        <NMABLogo>LUMICARE</NMABLogo>
        <Title>Create Your Account</Title>
        <Subtitle>Sign up to LUMICARE to unlock access to the ultimate beauty experience </Subtitle>

        <Form onSubmit={handleRegister}>
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Create Account</Button>
        </Form>

        <FooterText>
          Already a member? <Link to="/login">Login here</Link>
        </FooterText>
        <Footer>© {new Date().getFullYear()} NMAB. All rights reserved.</Footer>
      </LoginRight>
    </LoginPage>
  );
};

export default Register;

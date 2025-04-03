import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  LoginPage,
  LoginBox,
  NMABLogo,
  Title,
  Subtitle,
  Form,
  InputContainer,
  Label,
  Input,
  Button,
  FooterText,
  Footer,
  GoogleButton
} from './Login.styles';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + '/api/auth/register',
        { email, password },
        { withCredentials: true }
      );

      if (response.data?.message === 'User created successfully') {
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
      <LoginBox>
        <NMABLogo>LUMICARE</NMABLogo>
        <Title>Create Your Account</Title>
        <Subtitle>Sign up to unlock access to the ultimate beauty experience</Subtitle>

        <Form onSubmit={handleRegister}>
          <InputContainer>
            <Label>Email address</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputContainer>

          <InputContainer>
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputContainer>

          <Button type="submit">Create Account</Button>
        </Form>

        <FooterText>
          Already a member? <Link to="/login">Login here</Link>
        </FooterText>

        <GoogleButton href="https://api.swotandstudy.com/api/auth/google">
          <img src="/google-icon.png" alt="Google icon" />
          Sign up with Google
        </GoogleButton>

        <Footer>© {new Date().getFullYear()} LUMICARE. All rights reserved.</Footer>
      </LoginBox>
    </LoginPage>
  );
};

export default Register;

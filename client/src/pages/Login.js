import axios from 'axios';
import React, { useState } from 'react';
import {
  LoginPage,
  LoginBox,
  NMABLogo,
  Title,
  Subtitle,
  Form,
  InputContainer,
  Input,
  Label,
  Button,
  ForgotLink,
  FooterText,
  Footer,
  GoogleButton
} from './Login.styles';

import { Link } from 'react-router-dom';

const Login = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleContinue = (e) => {
    e.preventDefault();
    if (email.length > 4) setStep(2);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      if (response.data?.token) {
        const token = response.data.token;
        localStorage.setItem('token', token);

        try {
          const decoded = JSON.parse(atob(token.split('.')[1]));
          localStorage.setItem("profileImage", decoded.image || "/default-avatar.png");
        } catch {
          localStorage.setItem("profileImage", "/default-avatar.png");
        }

        try {
          const prefRes = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/preferences`,
            {
              headers: { Authorization: `Bearer ${token}` },
              withCredentials: true,
            }
          );

          window.location.href = prefRes.data ? '/dashboard' : '/preferences';
        } catch (error) {
          alert('Error checking preferences.');
        }
      } else {
        alert('Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert(err.response?.data?.message || 'Login failed. Try again.');
    }
  };

  return (
    <LoginPage>
    <LoginBox>
      <NMABLogo>LUMICARE</NMABLogo>
      <Title>Welcome Back!</Title>
      <Subtitle>Log in to unlock access to the ultimate beauty experience</Subtitle>
  
      <Form onSubmit={step === 1 ? handleContinue : handleLogin}>
        <InputContainer>
          <Input
            type="email"
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Label>Email address or Username</Label>
        </InputContainer>
  
        {step === 2 && (
          <>
            <InputContainer>
              <Input
                type="password"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Label>Password</Label>
            </InputContainer>
            <ForgotLink to="/forgot-password">Forgot password?</ForgotLink>
          </>
        )}
        <Button type="submit">{step === 1 ? 'Continue' : 'Login'}</Button>
      </Form>
  
      <FooterText>
        New to LUMICARE? <Link to="/register">Create an Account</Link>
      </FooterText>
  
      <GoogleButton href="https://api.swotandstudy.com/api/auth/google">
        <img src="/google-icon.png" alt="Google icon" />
        Sign in with Google
      </GoogleButton>
  
      <Footer>© {new Date().getFullYear()} LUMICARE. All rights reserved.</Footer>
    </LoginBox>
  </LoginPage>
  
  );
};

export default Login;

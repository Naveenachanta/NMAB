import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CustomToast from '../components/CustomToast';
import {
  LoginPage, PageTitle, Subtitle, Form,
  InputContainer, Input, FloatingLabel, Button,
  FooterText, Footer, GoogleButton
} from './Login.styles';

const Login = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };
  const handleContinue = (e) => {
    e.preventDefault();
    if (email.length > 4) setStep(2);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + '/api/auth/login',
        { email, password },
        { withCredentials: true }
      );
      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
        const decoded = JSON.parse(atob(response.data.token.split('.')[1]));
        localStorage.setItem("profileImage", decoded.image || "/default-avatar.png");

        const prefRes = await axios.get(
          process.env.REACT_APP_API_URL + '/api/preferences',
          {
            headers: { Authorization: `Bearer ${response.data.token}` },
            withCredentials: true,
          }
        );
        showToast('Logging in');
        window.location.href = prefRes.data ? '/dashboard' : '/preferences';
      } else {
        showToast('Login failed. Please try again.');
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Login failed. Please try after sometime.');
    }
  };

  return (
    <LoginPage>
      <PageTitle>Sign In</PageTitle>
      <Subtitle>Access your LUMICARE account</Subtitle>

      <Form onSubmit={step === 1 ? handleContinue : handleLogin}>
        <InputContainer>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" "
            required
          />
          <FloatingLabel>Email address or username</FloatingLabel>
        </InputContainer>

        {step === 2 && (
          <InputContainer>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              required
            />
            <FloatingLabel>Password</FloatingLabel>
          </InputContainer>
        )}

        <Button type="submit">{step === 1 ? 'Continue' : 'Login'}</Button>
      </Form>

      <FooterText>
        New to LUMICARE? <Link to="/register">Create account</Link>
      </FooterText>

      <GoogleButton href="https://api.swotandstudy.com/api/auth/google">
        <img src="/google-icon.png" alt="Google icon" />
        Sign in with Google
      </GoogleButton>

      <Footer>© {new Date().getFullYear()} LUMICARE. All rights reserved.</Footer>
      <CustomToast message={toastMessage} />
    </LoginPage>
  );
};

export default Login;

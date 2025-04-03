import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  LoginPage, PageTitle, Subtitle, Form,
  InputContainer, Input, FloatingLabel, Button,
  FooterText, Footer, GoogleButton
} from './Login.styles';

const Register = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleContinue = (e) => {
    e.preventDefault();
    if (email.length > 4) setStep(2);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + '/api/auth/register',
        { email, password },
        { withCredentials: true }
      );
      if (response.data?.message === 'User created successfully') {
        alert('Registration successful!');
        window.location.href = '/login';
      } else {
        alert('Registration failed. Try again.');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <LoginPage>
      <PageTitle>Create Account</PageTitle>
      <Subtitle>Join LUMICARE for the ultimate beauty experience</Subtitle>

      <Form onSubmit={step === 1 ? handleContinue : handleRegister}>
        <InputContainer>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" "
            required
          />
          <FloatingLabel>Email address</FloatingLabel>
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

        <Button type="submit">{step === 1 ? 'Continue' : 'Create Account'}</Button>
      </Form>

      <FooterText>
        Already a member? <Link to="/login">Sign in here</Link>
      </FooterText>

      <GoogleButton href="https://api.swotandstudy.com/api/auth/google">
        <img src="/google-icon.png" alt="Google icon" />
        Sign up with Google
      </GoogleButton>

      <Footer>© {new Date().getFullYear()} LUMICARE. All rights reserved.</Footer>
    </LoginPage>
  );
};

export default Register;

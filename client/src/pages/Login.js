import axios from 'axios';
import React, { useState } from 'react';
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
  ForgotLink,
} from './Login.styles';
import { Link } from 'react-router-dom';

const Login = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleContinue = (e) => {
    e.preventDefault();
    if (email.length > 4) {
      setStep(2);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://api.swotandstudy.com/api/auth/login', {
        email,
        password,
      });
  
      if (response.data && response.data.token) {
        const token = response.data.token;
        localStorage.setItem('token', token);
  
        // 🔍 Check if preferences already exist
        try {
          const prefRes = await axios.get('https://api.swotandstudy.com/api/preferences', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (prefRes.data) {
            console.log("✅ Preferences found, redirecting to dashboard");
            window.location.href = '/dashboard';
          }
        } catch (error) {
          if (error.response && error.response.status === 404) {
            console.log("🚧 No preferences found, redirecting to preferences");
            window.location.href = '/preferences';
          } else {
            console.error("❌ Error checking preferences:", error.message);
            alert('Error checking user preferences.');
          }
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
      <LoginLeft>
        <img src="/images/registerlogin.png" alt="Woman caring for her skin" />
      </LoginLeft>

      <LoginRight>
      <NMABLogo>LUMICARE</NMABLogo>
        <Title>Welcome Back!</Title>
        <Subtitle>Log in to unlock access to the ultimate beauty experience</Subtitle>

        <Form onSubmit={step === 1 ? handleContinue : handleLogin}>
          <Input
            type="email"
            placeholder="Email address or Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {step === 2 && (
            <>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <ForgotLink to="/forgot-password">Forgot password?</ForgotLink>
            </>
          )}

          <Button type="submit">{step === 1 ? 'Continue' : 'Login'}</Button>
        </Form>

        <FooterText>
          Not a member? <Link to="/register">Join Now</Link>
        </FooterText>
        <a href="https://api.swotandstudy.com/api/auth/google">
  <button className="google-btn">Sign in with Google</button>
</a>
        <Footer>© {new Date().getFullYear()} NMAB. All rights reserved.</Footer>
      </LoginRight>
    </LoginPage>
  );
};

export default Login;

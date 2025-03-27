import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 3rem;
  background-color: #fff;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  position: relative;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem 1.5rem;
  }
`;

const LogoWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: 768px) {
    position: static;
    transform: none;
    margin-bottom: 1rem;
  }
`;

const Logo = styled.h1`
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  font-size: 2.5rem;
  letter-spacing: 1.2rem;
  color: #000;
  text-align: center;
  margin: 0 auto;
  text-transform: uppercase;
  transition: all 0.3s ease-in-out;
  cursor: default;
  animation: fadeIn 1.2s ease-in-out;

  &:hover {
    color: #d60480;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    letter-spacing: 0.6rem;
  }
`;

const Left = styled.div`
  flex: 1;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Right = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #000;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #ff0077;
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: #000;
  font-weight: 500;
  cursor: pointer;
  font-size: 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: #ff0077;
  }
`;

const NMABHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <HeaderWrapper>
      <Left />
      <LogoWrapper>
        <Logo>Lumicare</Logo>
      </LogoWrapper>
      <Right>
        <NavLink to="/dashboard">Home</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Right>
    </HeaderWrapper>
  );
};

export default NMABHeader;

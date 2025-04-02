import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { User, ShoppingBag, MagnifyingGlass } from 'phosphor-react';
import { FiMenu } from 'react-icons/fi';

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 1000;
  background: black;
  width: 100%;
`;

const Header = styled.header`
  color: white;
  padding: 1.2rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  position: relative;

  @media (max-width: 768px) {
    padding: 1rem 1.2rem;
  }
`;

const Logo = styled.div`
  font-family: 'Didot', serif;
  font-size: 1.8rem;
  letter-spacing: 0.3rem;
  cursor: pointer;

  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: 768px) {
    position: static;
    transform: none;
    margin-right: auto;
  }
`;

const RightIcons = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: center;
  margin-left: auto;

  @media (max-width: 768px) {
    gap: 1.2rem;
  }
`;

const IconWrapper = styled.div`
  cursor: pointer;
  position: relative;
`;

const ProfileContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  &:hover .dropdown {
    display: block;
  }
`;

const DropdownWrapper = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  background-color: black;
  border: 1px solid #333;
  border-radius: 6px;
  z-index: 2000;
  min-width: 160px;
  padding: 0.5rem 0;
`;

const DropdownItem = styled.div`
  padding: 0.6rem 1rem;
  font-size: 0.9rem;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #111;
  }
`;

const NMBAHeader = () => {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <Header>
        {/* 🖋️ Logo */}
        <Logo onClick={() => navigate('/dashboard')}>LUMICARE</Logo>

        {/* ✅ All icons always on right */}
        <RightIcons>
          <IconWrapper><MagnifyingGlass size={20} /></IconWrapper>
          <IconWrapper><ShoppingBag size={20} /></IconWrapper>

          <ProfileContainer>
            <IconWrapper><User size={20} /></IconWrapper>
            <DropdownWrapper className="dropdown">
              <DropdownItem onClick={() => navigate('/profile')}>Profile</DropdownItem>
              <DropdownItem onClick={() => navigate('/admin')}>Admin</DropdownItem>
              <DropdownItem onClick={() => navigate('/login')}>Logout</DropdownItem>
            </DropdownWrapper>
          </ProfileContainer>

          <IconWrapper><FiMenu size={20} /></IconWrapper>
        </RightIcons>
      </Header>
    </HeaderContainer>
  );
};

export default NMBAHeader;

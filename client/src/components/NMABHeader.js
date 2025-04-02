import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { User, ShoppingBag, List, MagnifyingGlass } from 'phosphor-react';

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 1000;
  background: black;
`;

const Header = styled.header`
  color: white;
  padding: 1.2rem 2rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 72px;
  position: relative;
`;

const Logo = styled.div`
  font-family: 'Didot', serif;
  font-size: 1.8rem;
  letter-spacing: 0.3rem;
  cursor: pointer;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const RightIcons = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: center;
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
        <Logo onClick={() => navigate('/dashboard')}>LUMICARE</Logo>

        <RightIcons>
          <IconWrapper><MagnifyingGlass size={20} /></IconWrapper>
          <IconWrapper><ShoppingBag size={20} /></IconWrapper>
          <IconWrapper><List size={20} /></IconWrapper>

          <ProfileContainer>
            <IconWrapper><User size={20} /></IconWrapper>
            <DropdownWrapper className="dropdown">
              <DropdownItem onClick={() => navigate('/profile')}>Profile</DropdownItem>
              <DropdownItem onClick={() => navigate('/Admin')}>Admin</DropdownItem>
              <DropdownItem onClick={() => navigate('/login')}>Logout</DropdownItem>
            </DropdownWrapper>
          </ProfileContainer>
        </RightIcons>
      </Header>
    </HeaderContainer>
  );
};

export default NMBAHeader;

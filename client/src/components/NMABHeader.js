// NMABHeader.js — fully integrated with HeaderThemeContext
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MagnifyingGlass, ShoppingBag, User } from "phosphor-react";
import { FiMenu, FiX } from "react-icons/fi";
import { useHeaderTheme } from '../context/HeaderThemeContext';

const NMABHeader = ({ scrollContainerRef }) => {
  const navigate = useNavigate();
  const { theme } = useHeaderTheme();
  const [showDropdown, setShowDropdown] = useState(false);
  const [token, setToken] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      try {
        const decoded = JSON.parse(atob(storedToken.split('.')[1]));
        setUserRole(decoded?.role || "user");
      } catch {
        localStorage.removeItem("token");
      }
    }
    const handleStorageChange = (event) => {
      if (event.key === "token") {
        const updatedToken = localStorage.getItem("token");
        if (updatedToken) {
          setToken(updatedToken);
          try {
            const decoded = JSON.parse(atob(updatedToken.split('.')[1]));
            setUserRole(decoded?.role || "user");
          } catch {
            localStorage.removeItem("token");
          }
        } else {
          setToken(null);
          setUserRole(null);
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef?.current;
    if (!container) return;
    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      setScrolled(scrollTop > 50);
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [scrollContainerRef]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUserRole(null);
    navigate("/");
    window.location.reload();
  };

  const mobileMenuItems = [
    { label: "New Arrivals", link: "/products/new" },
    { label: "Skincare", link: "/products/skincare" },
    { label: "Body Care", link: "/products/body" },
    { label: "Hair", link: "/products/hair" },
    { label: "Fragrance", link: "/products/fragrance" },
    { label: "Memberships", link: "/memberships" },
    { label: "Our Story", link: "/about" },
    { label: "Contact", link: "/contact" },
  ];

  return (
    <HeaderContainer $theme={theme}>
      <Header>
        <LogoWrapper>
          <Logo $scrolled={scrolled}>LUMICARE</Logo>
        </LogoWrapper>

        <RightIcons>
          <IconWrapper><ShoppingBag size={24} color={theme === 'light' ? '#000' : '#fff'} /></IconWrapper>

          <ProfileContainer>
            <IconWrapper onClick={() => setShowDropdown(!showDropdown)}>
              <User size={24} color={theme === 'light' ? '#000' : '#fff'} />
            </IconWrapper>
            {showDropdown && (
              <DropdownWrapper $theme={theme} ref={dropdownRef}>
                {!token ? (
                  <>
                    <DropdownItem onClick={() => navigate('/login')}>Login</DropdownItem>
                    <DropdownItem onClick={() => navigate('/register')}>Register</DropdownItem>
                  </>
                ) : (
                  <>
                    <DropdownItem onClick={() => navigate('/profile')}>Profile</DropdownItem>
                    {userRole === 'admin' && (
                      <DropdownItem onClick={() => navigate('/admin')}>Admin</DropdownItem>
                    )}
                    <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                  </>
                )}
              </DropdownWrapper>
            )}
          </ProfileContainer>

          <IconWrapper onClick={() => setMobileMenuOpen(true)}>
            <FiMenu size={24} color={theme === 'light' ? '#000' : '#fff'} />
          </IconWrapper>
        </RightIcons>
      </Header>

      {mobileMenuOpen && (
        <>
          <BlurredOverlay onClick={() => setMobileMenuOpen(false)} />
          <MobileMenu>
            <MobileMenuHeader>
              <CloseButton onClick={() => setMobileMenuOpen(false)}>
                <FiX size={28} />
              </CloseButton>
            </MobileMenuHeader>

            <MenuSearchInput placeholder="Search LUMICARE..." />
            <MobileMenuList>
              {mobileMenuItems.map((item, index) => (
                <li
                  key={index}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate(item.link);
                  }}
                  className={hoveredIndex !== null && hoveredIndex !== index ? "dimmed" : ""}
                >
                  <span className="menu-text">{item.label}</span>
                </li>
              ))}
            </MobileMenuList>
          </MobileMenu>
        </>
      )}
    </HeaderContainer>
  );
};

export default NMABHeader;

const HeaderContainer = styled.div`
  width: 100%;
  background-color: ${({ $theme }) => $theme === 'light' ? '#fff' : '#000'};
  color: ${({ $theme }) => $theme === 'light' ? '#000' : '#fff'};
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 2.5rem;
  position: relative;

  @media (max-width: 768px) {
    padding: 1.2rem 1rem;
  }
`;

const LogoWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  @media (max-width: 768px) {
    position: relative;
    left: 0;
    transform: none;
  }
`;

const Logo = styled.h1`
  font-family: "Didot", serif;
  font-weight: 400;
  font-size: 2rem;
  letter-spacing: 0.4rem;
  margin: 0;
  cursor: pointer;
  text-transform: uppercase;
`;

const RightIcons = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  margin-left: auto;

  @media (max-width: 768px) {
    gap: 1.2rem;
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const IconWrapper = styled.div`
  cursor: pointer;
`;

const ProfileContainer = styled.div`
  position: relative;
`;

const DropdownWrapper = styled.div`
  position: absolute;
  top: 120%;
  right: 0;
  background: ${({ $theme }) => $theme === 'light' ? '#fff' : '#000'};
  color: ${({ $theme }) => $theme === 'light' ? '#000' : '#fff'};
  border-radius: 6px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  min-width: 150px;
  z-index: 10;
  opacity: 0;
  transform: translateY(-10px);
  animation: fadeInDropdown 0.3s ease forwards;
`;

const DropdownItem = styled.div`
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
  background: transparent;
  color: #666;

  &:hover {
    background: #f4f4f4;
    color: #111;
  }
`;

const BlurredOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1499;
  backdrop-filter: blur(10px);
  background: rgba(0, 0, 0, 0.3);
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100vh;
  background: ${({ theme }) => theme === 'light' ? '#fff' : '#000'};
  z-index: 2000;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  animation: slideInRight 0.3s ease forwards;
  overflow-y: auto;

  @keyframes slideInRight {
    from { transform: translateX(100%); }
    to { transform: translateX(0%); }
  }

  &::-webkit-scrollbar { display: none; }
`;

const MobileMenuHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 2.5rem;
  color: white;
  cursor: pointer;

  span {
    font-family: "Georgia", serif;
    font-size: 0.95rem;
    font-weight: 400;
  }
`;

const CloseButton = styled.div`
  margin-left: auto;
  background: white;
  color: black;
  border-radius: 50%;
  padding: 0.3rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 26px;
    height: 26px;
    font-weight: bold;
  }

  &:hover {
    opacity: 0.8;
    transform: scale(1.05);
    transition: all 0.2s ease-in-out;
  }
`;

const MenuSearchInput = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  padding: 0.75rem 0;
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
  font-weight: 300;
  color: white;
  font-family: 'Cormorant Garamond', serif;
  letter-spacing: 0.05rem;
  outline: none;
  transition: border-color 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
    font-style: italic;
  }

  &:focus {
    border-bottom-color: white;
  }
`;

const MobileMenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;

  li {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem;
    font-weight: 400;
    padding: 1.4rem 0;
    color: rgba(255, 255, 255, 0.78);
    letter-spacing: 0.08rem;
    cursor: pointer;
    display: inline-block;
    transition: color 0.2s ease;

    &.dimmed {
      color: rgba(255, 255, 255, 0.3);
    }
  }

  .menu-text {
    position: relative;
    display: inline-block;
    transition: all 0.3s ease;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      height: 1px;
      width: 0;
      background-color: rgba(255, 255, 255, 0.8);
      transition: width 0.3s ease;
    }

    &:hover::after {
      width: 100%;
    }
  }
`;

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MagnifyingGlass, ShoppingBag, User } from "phosphor-react";
import { FiMenu, FiX } from "react-icons/fi";

const NMABHeader = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [token, setToken] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const dropdownRef = useRef();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      try {
        const decoded = JSON.parse(atob(storedToken.split('.')[1]));
        setUserRole(decoded?.role || "user");
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUserRole(null);
    navigate("/");
    window.location.reload();
  };

  const mobileMenuItems = [
    "New Arrivals",
    "Skincare",
    "Body Care",
    "Hair",
    "Fragrance",
    "Memberships",
    "Our Story",
    "Contact"
  ];

  return (
    <HeaderContainer>
      <Header>
        <LogoWrapper>
          <Logo onClick={() => navigate("/dashboard")}>LUMICARE</Logo>
        </LogoWrapper>

        <RightIcons>
          <IconWrapper><MagnifyingGlass size={24} /></IconWrapper>
          <IconWrapper><ShoppingBag size={24} /></IconWrapper>

          <ProfileContainer>
            <IconWrapper onClick={() => setShowDropdown(!showDropdown)}>
              <User size={24} />
            </IconWrapper>

            {showDropdown && (
              <DropdownWrapper ref={dropdownRef}>
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
            <FiMenu size={24} />
          </IconWrapper>
        </RightIcons>
      </Header>

      {mobileMenuOpen && (
        <>
          <Backdrop onClick={() => setMobileMenuOpen(false)} />
          <MobileMenu>
            <MobileMenuHeader onClick={() => setMobileMenuOpen(false)}>
              <FiX size={22} />
              <span>Close</span>
            </MobileMenuHeader>

            <MobileMenuList>
              {mobileMenuItems.map((item, index) => (
                <li
                  key={index}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate(`/${item.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-")}`);
                  }}
                  className={hoveredIndex !== null && hoveredIndex !== index ? "dimmed" : ""}
                >
                  <span className="menu-text">{item}</span>
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

// ---------------- Styled Components ----------------

const HeaderContainer = styled.div`
  width: 100%;
  background-color: black;
  color: white;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem 2.5rem; // Restore generous top-bottom spacing
  position: relative;
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
  letter-spacing: 0.7rem;  // Wider spacing for luxury feel
  margin: 0;
  cursor: pointer;
  text-transform: uppercase; // Optional: consistent caps like LV
`;


const RightIcons = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  margin-left: auto;
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
  background: black;
  color: white;
  border-radius: 6px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  min-width: 150px;
  z-index: 10;
  opacity: 0;
  transform: translateY(-10px);
  animation: fadeInDropdown 0.3s ease forwards;

  @keyframes fadeInDropdown {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const DropdownItem = styled.div`
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  border-bottom: 1px solid #333;
  background: black;

  &:hover {
    background: black;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0,0,0,0.4);
  z-index: 1500;
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100vh;
  background: black;
  z-index: 2000;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  animation: slideInRight 0.3s ease forwards;

  @keyframes slideInRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0%);
    }
  }
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

const MobileMenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;

  li {
    font-family: "Georgia", serif;
    font-size: 1.25rem;
    font-weight: 400;
    padding: 1.25rem 0;
    color: white;
    cursor: pointer;
    display: inline-block;
    transition: color 0.2s ease;

    &.dimmed {
      color: rgba(255, 255, 255, 0.4);
    }
  }

  .menu-text {
    position: relative;
    display: inline-block;
    transition: color 0.2s ease;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      height: 1px;
      width: 0;
      background-color: white;
      transition: width 0.3s ease;
    }

    &:hover::after {
      width: 100%;
    }
  }
`;

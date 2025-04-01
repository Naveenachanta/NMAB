import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import AmayaChat from '../components/AmayaChat';


const Wrapper = styled.div`
  min-height: 100vh;
  background: #fff;
  font-family: 'Helvetica Neue', sans-serif;
  color: #000;
`;

const TopNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 3rem;
  background: #fff;
  border-bottom: 1px solid #eee;
`;

const NavLeft = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavItem = styled.div`
  position: relative;
  cursor: pointer;
  font-weight: 500;
  color: #222;

  &:hover .dropdown {
    display: flex;
  }
`;

const Dropdown = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 10;
`;

const DropdownItem = styled.div`
  padding: 0.4rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  white-space: nowrap;
  color: #222;

  &:hover {
    background-color: #f3f3f3;
    color: #000;
  }
`;

const Logo = styled.h1`
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  font-size: 2.8rem;
  letter-spacing: 1.2rem;
  color: #000;
  text-transform: uppercase;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  margin: 2rem 0 1rem;
`;

const ProductGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  padding: 2rem;
`;

const ProductCard = styled.div`
  background: #fff;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 1rem;
  width: 240px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.06);
  transition: 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 12px rgba(255, 105, 180, 0.2);
  }

  img {
    width: 100%;
    height: 160px;
    object-fit: contain;
    border-radius: 8px;
    background: #f8f8f8;
  }

  h3 {
    font-size: 1rem;
    margin: 0.75rem 0;
  }

  .tags {
    font-size: 0.75rem;
    color: #888;
    margin-bottom: 0.5rem;
  }

  .badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background: #d60480;
    color: white;
    font-size: 0.7rem;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Overlay = styled.div`
  display: ${({ $show }) => ($show ? 'flex' : 'none')};
  position: fixed;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: opacity 0.8s ease;
`;

const GreetingText = styled.h1`
  font-size: 2rem;
  color: #111;
  margin-bottom: 1rem;
  animation: ${fadeIn} 1s ease forwards;
  font-family: 'Poppins', sans-serif;
`;

const SubText = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 2rem;
  animation: ${fadeIn} 1s ease 0.3s forwards;
  font-family: 'Poppins', sans-serif;
`;

const Spinner = styled.div`
  border: 4px solid #ddd;
  border-top: 4px solid #d60480;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;

const categories = {
  Skincare: ['Cleansers', 'Toners', 'Moisturizers', 'Serums', 'Face Masks', 'Exfoliators', 'SPF/Sunscreen'],
  Makeup: ['Foundation', 'Concealer', 'Blush', 'Highlighter', 'Eyeshadow', 'Lipstick', 'Mascara'],
  Hair: ['Shampoo', 'Conditioner', 'Hair Oils', 'Hair Masks', 'Styling Tools'],
  Body: ['Body Wash', 'Body Lotion', 'Body Scrub', 'Deodorant'],
  Tools: ['Brushes', 'Sponges', 'Hair Dryer', 'Straighteners']
};

const Dashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showOverlay, setShowOverlay] = useState(true);
  const [username, setUsername] = useState('there');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    try {
      const userData = JSON.parse(atob(token?.split('.')[1] || ''));
      setUsername(userData?.email?.split('@')[0] || 'there');
    } catch (e) {
      setUsername('there');
    }

    setTimeout(() => {
      setShowOverlay(false);
    }, 3500);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
          const data = response.data;
          setFilteredProducts(data);
        } catch (err) {
          console.error('Error fetching products:', err);
        }
      };

    fetchProducts();
  }, [selectedCategory, navigate]);

  return (
    <Wrapper>
      {showOverlay && (
        <Overlay $show={showOverlay}>
          <GreetingText>Hi, {username} 👋</GreetingText>
          <SubText>Loading your ultimate skincare experience...</SubText>
          <Spinner />
        </Overlay>
      )}

      <TopNav>
        <NavLeft>
          {Object.entries(categories).map(([main, subs]) => (
            <NavItem key={main}>
              {main}
              <Dropdown className="dropdown">
                {subs.map(sub => (
                  <DropdownItem key={sub} onClick={() => setSelectedCategory(sub)}>
                    {sub}
                  </DropdownItem>
                ))}
              </Dropdown>
            </NavItem>
          ))}
        </NavLeft>
      </TopNav>

      <Title>Explore Curated Products</Title>
      <ProductGrid>
        {filteredProducts.map(product => (
          <ProductCard key={product._id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <div className="tags">{product.tags?.join(', ')}</div>
            {product.tags?.length > 1 && <div className="badge">Recommended</div>}
          </ProductCard>
        ))}
        {filteredProducts.length === 0 && (
          <p>No products found for this category.</p>
        )}
      </ProductGrid>
      <AmayaChat />
    </Wrapper>
  );
};

export default Dashboard;

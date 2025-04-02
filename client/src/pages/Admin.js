import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import AmayaChat from '../components/AmayaChat';
import axios from 'axios';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Wrapper = styled.div`
  background: #fff;
  min-height: 100vh;
  overflow: hidden;
  font-family: 'Didot', serif;
  color: #111;
`;

const VideoBackground = styled.video`
  position: fixed;
  top: 0; left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
  filter: brightness(0.6);
`;

const Logo = styled.h1`
  font-size: ${({ shrink }) => (shrink ? '2rem' : '6rem')};
  font-weight: 500;
  color: white;
  letter-spacing: 0.5rem;
  position: fixed;
  top: ${({ shrink }) => (shrink ? '20px' : '40%')};
  left: ${({ shrink }) => (shrink ? '40px' : '50%')};
  transform: translateX(${({ shrink }) => (shrink ? '0' : '-50%')});
  z-index: 3;
  transition: all 1.2s ease;
`;

const Slogan = styled.p`
  font-size: 1.5rem;
  text-align: center;
  color: white;
  position: fixed;
  top: 58%;
  left: 50%;
  transform: translateX(-50%);
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 1s ease;
`;

const Content = styled.div`
  margin-top: 100vh;
  padding: 4rem 2rem;
  animation: ${fadeIn} 1s ease forwards;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
  text-align: center;
  font-family: 'Didot', serif;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2.5rem;
`;

const Card = styled.div`
  background: #fff;
  border: 1px solid #eee;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  padding: 1.5rem;
  width: 280px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 14px 32px rgba(0,0,0,0.12);
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 12px;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.9rem;
    color: #666;
  }

  .badge {
    margin-top: 0.5rem;
    display: inline-block;
    padding: 0.2rem 0.6rem;
    font-size: 0.7rem;
    color: white;
    background: black;
    border-radius: 999px;
  }
`;

const Dashboard = () => {
  const [shrinkLogo, setShrinkLogo] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [products, setProducts] = useState([]);
  const [username, setUsername] = useState('guest');

  useEffect(() => {
    const token = localStorage.getItem("token");
    try {
      const decoded = JSON.parse(atob(token?.split('.')[1] || ''));
      setUsername(decoded?.email?.split('@')[0] || 'guest');
    } catch {
      setUsername('guest');
    }

    setTimeout(() => {
      setShrinkLogo(true);
      setShowContent(true);
    }, 4500); // Logo animation time

    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Wrapper>
      <VideoBackground autoPlay muted loop playsInline>
        <source src="/assets/gucci-intro.mp4" type="video/mp4" />
      </VideoBackground>

      <Logo shrink={shrinkLogo}>NMAB</Logo>
      <Slogan show={!shrinkLogo}>Crafted Skincare. Curated for You.</Slogan>

      {showContent && (
        <Content>
          <SectionTitle>Hi, {username} — Explore Curated Picks</SectionTitle>
          <Grid>
            {products.map((product) => (
              <Card key={product._id}>
                <img src={product.imageUrl} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                {product.tags?.length > 1 && <div className="badge">Recommended</div>}
              </Card>
            ))}
          </Grid>
        </Content>
      )}

      <AmayaChat />
    </Wrapper>
  );
};

export default Dashboard;

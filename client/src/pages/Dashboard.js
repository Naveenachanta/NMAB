import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import AmayaChat from '../components/AmayaChat';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const DashboardWrapper = styled.div`
  background-color: #000;
  color: white;
  font-family: 'Didot', serif;
  overflow-x: hidden;
`;

const VideoSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 1rem;
`;

const VideoContainer = styled.div`
  width: 90%;
  max-width: 1200px;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.08);
`;

const StyledVideo = styled.video`
  width: 100%;
  border-radius: 12px;
`;

const OverlayText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  text-align: center;
  animation: ${fadeInUp} 1.5s ease-out;
`;

const MainTitle = styled.h1`
  font-size: 3rem;
  font-weight: 500;
  letter-spacing: 0.2rem;
  margin-bottom: 0.6rem;
`;

const SubTitle = styled.p`
  font-size: 1.05rem;
  font-weight: 300;
  line-height: 1.6;
  max-width: 650px;
  margin: 0 auto;
`;

const ProductSection = styled.section`
  padding: 4rem 2rem;
`;

const SectionHeading = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
`;

const ProductCard = styled.div`
  background: #111;
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  color: white;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 6px 18px rgba(255, 255, 255, 0.08);
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 1rem;
  }

  h3 {
    margin-bottom: 0.5rem;
  }

  .price {
    font-size: 1rem;
    color: #aaa;
  }
`;

const BannerSection = styled.div`
  position: relative;
  margin-top: 4rem;
  height: 420px;
  overflow: hidden;
`;

const ZoomableImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url('/shop_banner.jpg');
  background-size: cover;
  background-position: center;
  transform: ${({ zoom }) => `scale(${zoom})`};
  transition: transform 0.3s ease-out;
`;

const BannerOverlay = styled.div`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  font-family: 'Didot', serif;
  z-index: 2;
`;

const BannerTitle = styled.h2`
  font-size: 2.4rem;
  letter-spacing: 0.15rem;
`;

const BannerDescription = styled.p`
  font-size: 1rem;
  margin-top: 0.5rem;
  color: #ccc;
`;

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [zoom, setZoom] = useState(1);
  const bannerRef = useRef();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
        setProducts(res.data || []);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetch();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (bannerRef.current) {
        const rect = bannerRef.current.getBoundingClientRect();
        const scrollY = window.scrollY;
        const offsetTop = rect.top + scrollY;
        const windowHeight = window.innerHeight;

        const distance = Math.max(0, scrollY - offsetTop + windowHeight / 2);
        const zoomFactor = 1 + Math.min(distance / 1000, 0.2); // Zoom up to 1.2x

        setZoom(zoomFactor);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <DashboardWrapper>
      <VideoSection>
        <VideoContainer>
          <StyledVideo autoPlay muted loop playsInline>
            <source src="/hero.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </StyledVideo>
          <OverlayText>
            <MainTitle>LUMICARE</MainTitle>
            <SubTitle>
              Explore our handpicked skincare essentials that match your lifestyle.
            </SubTitle>
          </OverlayText>
        </VideoContainer>
      </VideoSection>

      <ProductSection>
        <SectionHeading>Our Featured Products</SectionHeading>
        <ProductGrid>
          {products.map((product) => (
            <ProductCard key={product._id}>
              <img src={product.imageUrl} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="price">{product.price ? `$${product.price}` : 'Coming soon'}</p>
            </ProductCard>
          ))}
        </ProductGrid>
      </ProductSection>

      <BannerSection ref={bannerRef}>
        <ZoomableImage zoom={zoom} />
        <BannerOverlay>
          <BannerDescription>Premium skincare, thoughtfully curated for you</BannerDescription>
          <BannerTitle>Shop The Collection</BannerTitle>
        </BannerOverlay>
      </BannerSection>

      <AmayaChat />
    </DashboardWrapper>
  );
};

export default Dashboard;

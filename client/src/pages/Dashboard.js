import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import AmayaChat from '../components/AmayaChat';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
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

// 🛍️ PRODUCTS SECTION
const ProductSection = styled.section`
  padding: 4rem 2rem;
  position: relative;
`;

const SectionHeading = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const ScrollContainer = styled.div`
  position: relative;
  padding: 0 2.5rem;
`;

const ScrollWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  gap: 3rem;
  padding: 0 1rem;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ProductCard = styled.div`
  flex: 0 0 260px;
  scroll-snap-align: center;
  text-align: center;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
  border-radius: 12px;
  transition: transform 0.4s ease;
  &:hover {
    transform: scale(1.04);
  }
`;

const ProductName = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 500;
`;

const ProductStatus = styled.p`
  color: #bbb;
  font-size: 0.9rem;
  margin-top: -0.2rem;
`;

const ArrowBase = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  opacity: 0.85;
  border: 1px solid rgba(255,255,255,0.15);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    opacity: 1;
  }
`;

const LeftArrow = styled(ArrowBase)`
  left: 0;
`;

const RightArrow = styled(ArrowBase)`
  right: 0;
`;

// 🖼️ BANNER SECTION
const BannerSection = styled.div`
  display: flex;
  margin-top: 5rem;
  height: 520px;
  overflow: hidden;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    padding: 2rem 1rem;
    gap: 1.5rem;
  }
`;

const BannerImage = styled.div`
  flex: 1;
  height: 100%;
  background-image: url('/shop_banner.jpg');
  background-size: cover;
  background-position: center;
  transform: ${({ zoom }) => `scale(${zoom})`};
  transition: transform 0.2s ease-out;

  @media (max-width: 768px) {
    width: 100%;
    height: 320px;
    border-radius: 12px;
  }
`;

const BannerContent = styled.div`
  flex: 1;
  padding-left: 3rem;
  padding-right: 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
    text-align: center;
  }
`;

const BannerTitle = styled.h2`
  font-size: 2.5rem;
  letter-spacing: 0.15rem;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const BannerDescription = styled.p`
  font-size: 1rem;
  color: #ccc;
  margin: 1rem 0 2rem;
  line-height: 1.6;
`;

const ExploreButton = styled.button`
  background: transparent;
  color: white;
  border: 1px solid white;
  padding: 0.7rem 1.6rem;
  border-radius: 30px;
  font-family: 'Didot', serif;
  font-size: 0.9rem;
  letter-spacing: 0.05rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: white;
    color: black;
  }
`;

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [zoom, setZoom] = useState(1);
  const scrollRef = useRef();
  const lastScrollY = useRef(window.scrollY);

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
      const currentY = window.scrollY;
      const direction = currentY < lastScrollY.current ? 'up' : 'down';
      const zoomChange = direction === 'up' ? 0.01 : -0.01;
      setZoom((prevZoom) => Math.max(0.95, Math.min(1.15, prevZoom + zoomChange)));
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scroll = (dir) => {
    if (scrollRef.current) {
      const amount = dir === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

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
        <ScrollContainer>
          <ScrollWrapper ref={scrollRef}>
            {products.map((product) => (
              <ProductCard key={product._id}>
                <ProductImage src={product.image} alt={product.name} />
                <ProductName>{product.name}</ProductName>
                <ProductStatus>{product.price ? `$${product.price}` : 'Coming soon'}</ProductStatus>
              </ProductCard>
            ))}
          </ScrollWrapper>
          {products.length > 3 && (
            <>
              <LeftArrow onClick={() => scroll('left')}>&lt;</LeftArrow>
              <RightArrow onClick={() => scroll('right')}>&gt;</RightArrow>
            </>
          )}
        </ScrollContainer>
      </ProductSection>

      <BannerSection>
        <BannerImage zoom={zoom} />
        <BannerContent>
          <BannerTitle>SHOP THE COLLECTION</BannerTitle>
          <BannerDescription>
            Premium skincare, thoughtfully curated for you. Explore our seasonal essentials designed for every skin type.
          </BannerDescription>
          <ExploreButton>Explore Now</ExploreButton>
        </BannerContent>
      </BannerSection>

      <AmayaChat />
    </DashboardWrapper>
  );
};

export default Dashboard;

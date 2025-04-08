import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled, { createGlobalStyle } from 'styled-components';
import { FaStar } from 'react-icons/fa';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { useHeaderTheme } from '../context/HeaderThemeContext';
import NMABHeader from '../components/NMABHeader';
import Footer from '../components/Footer';
import { FiShoppingBag, FiCreditCard } from 'react-icons/fi';
import { motion } from 'framer-motion';
const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f4f4f4;
    font-family: 'Roboto', sans-serif;
  }
`;

const PageWrapper = styled.div`
  background: #f4f4f4;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
const CTAButton = styled(motion.button)`
  background: #fff;
  color: #111;
  font-size: 1rem;
  font-weight: 600;
  padding: 1rem 1.2rem;
  border: 1px solid #111;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;

  &:hover {
    background:rgb(0 0 0);
    color: #ffffff;
  }

  svg {
    stroke-width: 2px;
    font-size: 1.2rem;
  }
`;


const Container = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 2rem auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 4rem;
  }
`;

const Left = styled.div`
  flex: 1;
  background: #fff;
  border-radius: 8px;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Right = styled.div`
  flex: 1;
  padding-top: 1rem;
`;

const Title = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 500;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #555;
  margin: 0.4rem 0 1rem;
`;

const Stars = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #111;
  font-size: 1rem;
`;

const SizeSelector = styled.div`
  margin-top: 1rem;
  font-size: 0.95rem;

  span {
    display: inline-block;
    margin-top: 0.4rem;
    padding: 0.5rem 1.2rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #fff;
    font-weight: 500;
  }
`;

const PayPalBanner = styled.div`
  margin-top: 1.5rem;
  font-size: 0.85rem;
  color: #333;
`;

const Price = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  margin: 1rem 0;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;
`;

const PrimaryButton = styled.button`
  background: #111;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  padding: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #000;
  }
`;

const SecondaryButton = styled.button`
  background: #fff;
  color: #111;
  font-size: 1rem;
  padding: 1rem;
  font-weight: 500;
  border-radius: 4px;
  border: 1px solid #ccc;
  cursor: pointer;

  &:hover {
    background: #f7f7f7;
  }
`;

const AccordionWrapper = styled.div`
  width: 100%;
  margin-top: 2.5rem;
`;

const Accordion = styled.div`
  width: 100%;
  border-top: 1px solid #ddd;
`;

const AccordionItem = styled.div`
  border-bottom: 1px solid #ddd;
`;

const AccordionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 1rem 0;
`;

const AccordionContent = styled.div`
  padding-bottom: 1rem;
  font-family: 'Roboto', sans-serif;
  font-size: 0.95rem;
  color: #444;
  line-height: 1.6;
  border-left: 2px solid #ccc;
  padding-left: 1rem;
`;

const SuggestionsSection = styled.div`
  padding: 3rem 2rem 4rem;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
`;
const VideoTitle = styled.h2`
  font-size: 1.6rem;
  font-family: 'Playfair Display', serif;
  margin-bottom: 1rem;
  text-align: center;
  color: #111;
`;

const VideoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem auto;
  max-width: 800px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);

  video {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 12px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.6rem;
  font-family: 'Playfair Display', serif;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #111;
`;

const SuggestionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
`;

const SuggestionCard = styled.div`
  background: #fafafa;
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  border: 1px solid #eee;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    background: #f2f2f2;
  }

  img {
    width: 100%;
    height: 220px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 0.5rem;
  }

  h4 {
    font-size: 1rem;
    font-family: 'Roboto', sans-serif;
    color: #111;
    margin: 0.5rem 0 0.2rem;
  }

  span {
    color: #666;
    font-size: 0.85rem;
  }
`;

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const { setTheme } = useHeaderTheme();

  const toggleAccordion = (section) => {
    setExpanded(expanded === section ? null : section);
  };

  useEffect(() => {
    setTheme('light');
    return () => setTheme('dark');
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Failed to load product', err);
      }
    };

    const fetchSuggestions = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
        const random = res.data.sort(() => 0.5 - Math.random()).slice(0, 6);
        setSuggestions(random);
      } catch (err) {
        console.error('Failed to load suggestions', err);
      }
    };

    fetchProduct();
    fetchSuggestions();
  }, [id]);

  if (!product) return <PageWrapper><GlobalStyle /><NMABHeader /><div style={{ padding: '2rem' }}>Loading...</div><Footer /></PageWrapper>;

  const price = product.price || 0;
  const displayImage = product.images?.[0] || product.image;

  return (
    <PageWrapper>
      <GlobalStyle />
      <Container>
        <Left>
          <ProductImage src={displayImage} alt={product.name} />
        </Left>

        <Right>
          <Title>{product.name}</Title>
          <Subtitle>{product.category || 'Skincare'}</Subtitle>

          <Stars>
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} style={{ color: i < 5 ? '#111' : '#ccc' }} />
            ))}
            <span style={{ marginLeft: '0.5rem', fontSize: '0.9rem' }}>(2 reviews)</span>
          </Stars>

          <SizeSelector>
            This product exists in 1 size:<br />
            <span>{product.size || '1.7 oz'}</span>
          </SizeSelector>

          <PayPalBanner>
            <strong>PayPal</strong> As low as ${(price / 12).toFixed(2)}/mo. <u>Learn more</u>
          </PayPalBanner>

          <Price>${price.toFixed(2)}</Price>
          <ButtonRow>
  <CTAButton
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
  >
    <FiShoppingBag />
    Add to Bag
  </CTAButton>

  <CTAButton
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
  >
    <FiCreditCard />
    Buy Now
  </CTAButton>
</ButtonRow>


          <AccordionWrapper>
            <Accordion>
              {[
                { key: 'why', title: "Why you'll love it", content: "Experience radiant skin with our premium formula enriched with botanical extracts and nourishing ingredients." },
                { key: 'use', title: 'How to use', content: 'Apply a small amount evenly across the face or desired area. Use daily for best results.' },
                { key: 'ingredients', title: 'Ingredients', content: 'Water, Glycerin, Niacinamide, Vitamin C, Green Tea Extract, Hyaluronic Acid.' }
              ].map((item) => (
                <AccordionItem key={item.key}>
                  <AccordionHeader onClick={() => toggleAccordion(item.key)}>
                    {item.title} {expanded === item.key ? <FiMinus /> : <FiPlus />}
                  </AccordionHeader>
                  {expanded === item.key && <AccordionContent>{item.content}</AccordionContent>}
                </AccordionItem>
              ))}
            </Accordion>
          </AccordionWrapper>
        </Right>
      </Container>

      <SuggestionsSection>
        <SectionTitle>Products You May Like</SectionTitle>
        <SuggestionGrid>
          {suggestions.map((item) => (
            <SuggestionCard key={item._id}>
              <img src={item.images?.[0] || item.imageUrl || item.image} alt={item.name} />
              <h4>{item.name}</h4>
              <span>${item.price?.toFixed(2) || '--'}</span>
            </SuggestionCard>
          ))}
        </SuggestionGrid>
      </SuggestionsSection>
  <VideoWrapper>
    <video
      src="/perfumevideo.mp4"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
    />
  </VideoWrapper>
      <SuggestionsSection>
        <SectionTitle>Lumicare Suggestions for You</SectionTitle>
        <SuggestionGrid>
          {suggestions.map((item) => (
            <SuggestionCard key={item._id + '-suggestion'}>
              <img src={item.images?.[0] || item.imageUrl || item.image} alt={item.name} />
              <h4>{item.name}</h4>
              <span>${item.price?.toFixed(2) || '--'}</span>
            </SuggestionCard>
          ))}
        </SuggestionGrid>
      </SuggestionsSection>

      <Footer />
    </PageWrapper>
  );
};

export default ProductDetails;

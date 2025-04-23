import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled, { createGlobalStyle } from 'styled-components';
import { FaStar } from 'react-icons/fa';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { useHeaderTheme } from '../context/HeaderThemeContext';
import NMABHeader from '../components/NMABHeader';
import Footer from '../components/Footer';
import { FiShoppingBag, FiCreditCard, FiHeart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f4f4f4;
    font-family: 'Roboto', sans-serif;
  }
`;


const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const { setTheme } = useHeaderTheme();
  const { cart, addToCart, setCartOpen } = useCart(); // ✅ Full destructuring

const navigate = useNavigate();

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
    onClick={() => addToCart(product)}
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

      <HorizontalSuggestionWrapper>
  <SideHeading>Products You May Like</SideHeading>
  <ScrollContainer>
    {suggestions.map((item) => (
      <ScrollProductCard key={item._id}>
        <ScrollProductImage src={item.images?.[0] || item.image} alt={item.name} />
        <HoverDetails className="hoverDetails">
          <h4>{item.name}</h4>
          <span>${item.price?.toFixed(2) || '--'}</span>
        </HoverDetails>
      </ScrollProductCard>
    ))}
  </ScrollContainer>
</HorizontalSuggestionWrapper>


      <ScrollVideoWrapper>
  <StickyVideo src="/perfumevideo.mp4" autoPlay muted loop playsInline />

  <ScrollOverlay>
  <motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: false, amount: 0.4 }}
  transition={{
    duration: 1.2,
    ease: [0.42, 0, 0.58, 1], // ease-in-out
    type: 'tween',
  }}
>
  <h2>Explore Our Premium Gift Sets Collection</h2>
  <button onClick={() => {
    document.getElementById('perfume-collection')?.scrollIntoView({ behavior: 'smooth' });
  }}>
    Discover More
  </button>
</motion.div>

  </ScrollOverlay>
</ScrollVideoWrapper>




<HorizontalSuggestionWrapper>
  <SideHeading>LUMICARE SUGGESTIONS
     FOR YOU</SideHeading>
  <ScrollContainer>
    {suggestions.map((item) => (
      <ScrollProductCard key={item._id}>
        <ScrollProductImage src={item.images?.[0] || item.image} alt={item.name} />
        <HoverDetails className="hoverDetails">
          <h4>{item.name}</h4>
          <span>${item.price?.toFixed(2) || '--'}</span>
        </HoverDetails>
      </ScrollProductCard>
    ))}
  </ScrollContainer>
</HorizontalSuggestionWrapper>






      <Footer />
    </PageWrapper>
  );
};




export default ProductDetails;



const PageWrapper = styled.div`
  background: #f4f4f4;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
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
  border-radius: 8px;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  border: 1px solid #eee;
  background: transparent;
`;

const ProductImage = styled.img`
  width: 68%;
  height: 68%;
  object-fit: cover;
  margin: 0 auto;
  background: none;
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
    background: #000;
    color: #fff;
  }

  svg {
    stroke-width: 2px;
    font-size: 1.2rem;
  }
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

const Price = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  margin: 1rem 0;
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
const ScrollVideoWrapper = styled.div`
  position: relative;
  height: 170vh; /* space for scroll effect */
`;

const StickyVideo = styled.video`
  position: sticky;
  top: 0;
  width: 100%;
  height: 94vh;
  object-fit: cover;
  z-index: 1;
`;

const ScrollOverlay = styled.div`
  position: absolute;
  top: 99vh;
  height: 50vh;
  width: 100%;
  z-index: 2;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  pointer-events: none;

  div {
    position: sticky;
    top: 55vh;
    text-align: center;
    color: #fff;
    pointer-events: all;
    padding: 2rem;
    width: 100%;
    max-width: 600px;
  }

  h2 {
    font-size: 2.4rem;
    font-family: 'Playfair Display', serif;
    margin-bottom: 1rem;
  }

  button {
    padding: 0.8rem 1.6rem;
    font-size: 1rem;
    border: 2px solid #fff;
    background: transparent;
    color: #fff;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #fff;
      color: #000;
    }
  }
`;
const HorizontalSuggestionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 4rem 2rem 2rem;
  max-width: 1440px;
  margin: 0 auto;
  overflow-x: auto;
  gap: 2rem;
`;

const SideHeading = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 1.6rem;
  font-weight: 500;
  white-space: nowrap;
  color: #111;
  margin: 0;
  padding-right: 2rem;
  flex-shrink: 0;
`;

const ScrollContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 1px;
  padding-bottom: 6px;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f2f2f2;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 3px;
  }
`;
const ScrollProductCard = styled.div`
  min-width: 250px;
  height: 360px;
  background: #fff;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid #eee;
  border-radius: 0;

  &:hover .hoverDetails {
    transform: translateY(0);
    opacity: 1;
  }
`;

const ScrollProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HoverDetails = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background: #fff;
  text-align: center;
  transform: translateY(100%);
  transition: all 0.35s ease;
  opacity: 0;
  padding: 0.8rem 1rem;
  border-top: 1px solid #eee;

  h4 {
    font-family: 'Playfair Display', serif;
    font-size: 1rem;
    color: #111;
    margin-bottom: 0.4rem;
  }

  span {
    font-size: 0.9rem;
    color: #555;
    display: block;
  }

  button {
    margin-top: 0.8rem;
    font-size: 0.9rem;
    border: 1px solid #111;
    background: none;
    color: #111;
    padding: 0.6rem 1.2rem;
    font-weight: 500;
    cursor: pointer;
    transition: 0.3s ease;
    text-transform: uppercase;

    &:hover {
      background: #111;
      color: #fff;
    }
  }
`;

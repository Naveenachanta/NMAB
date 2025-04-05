import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import NMABHeader from '../components/NMABHeader';
import Footer from '../components/Footer';
import { FiHeart, FiChevronDown } from 'react-icons/fi';

const PageWrapper = styled.div`
  background: #000;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: #fff;
`;

const FilterBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  padding: 2rem 3rem 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    padding: 1.5rem 1rem 0;
  }
`;

const FilterLabel = styled.span`
  font-family: 'Poppins', sans-serif;
  font-size: 0.85rem;
  color: #aaa;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const CustomSelect = styled.div`
  position: relative;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;

  .selected {
    background: #111;
    color: #fff;
    padding: 0.6rem 1.2rem;
    border-radius: 40px;
    border: 1px solid #444;
    min-width: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  ul {
    position: absolute;
    top: 110%;
    left: 0;
    background: #111;
    border-radius: 12px;
    list-style: none;
    padding: 0;
    margin: 0.5rem 0 0;
    border: 1px solid #333;
    width: 100%;
    z-index: 10;
    display: none;
  }

  &.open ul {
    display: block;
  }

  ul li {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #222;
    transition: 0.3s;
  }

  ul li:hover {
    background: #222;
  }

  ul li:last-child {
    border-bottom: none;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem 1rem;  // 👈 Tighter spacing
  padding: 2rem 2rem 4rem;
  max-width: 1440px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    gap: 1rem;
  }
`;


const ProductItem = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  position: relative;
  transition: all 0.4s ease;

//   &:hover {
//     transform: translateY(-4px);
//   }

  &:hover img {
    transform: scale(1.13);
    opacity: 0.94;
  }
`;

const HeartIcon = styled(FiHeart)`
  position: absolute;
  top: 10px;
  right: 12px;
  font-size: 2.2rem; /* bigger heart */
  color: #fff;
  background: #111;
  padding: 10px;
  border-radius: 50%;
  z-index: 2;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.15);
  transition: all 0.3s ease;
  animation: pulse 1.8s ease-in-out infinite;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 18px rgba(255, 255, 255, 0.25);
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 rgba(255, 255, 255, 0);
    }
    50% {
      box-shadow: 0 0 14px rgba(255, 255, 255, 0.35);
    }
    100% {
      box-shadow: 0 0 0 rgba(255, 255, 255, 0);
    }
  }
`;




const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;  // 👈 Less height, more compact
  overflow: hidden;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.4s ease;
  }
`;


const ProductInfo = styled.div`
  margin-top: 1.2rem;

  h3 {
    font-family: 'Didot', serif;
    font-size: 1rem;
    font-weight: normal;
    margin: 0 0 0.3rem;
    color: #fff;
    text-transform: uppercase;
  }

  p {
    font-family: 'Poppins', sans-serif;
    font-size: 0.85rem;
    color: #aaa;
    margin: 0;
  }

  .price {
    margin: 0.4rem 0 0.8rem;
    font-size: 0.9rem;
    color: #fff;
  }
`;

const AddToBag = styled.button`
  padding: 0.6rem 1rem;
  background: transparent;
  border: 1px solid #fff;
  color: #fff;
  font-size: 0.8rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #fff;
    color: #000;
  }
`;

const Empty = styled.div`
  text-align: center;
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  color: #888;
  margin-top: 5rem;
`;

const Products = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState('newest');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const options = [
    { label: 'Newest', value: 'newest' },
    { label: 'Price: Low to High', value: 'lowToHigh' },
    { label: 'Price: High to Low', value: 'highToLow' },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/products?category=${category}`);
        let sorted = [...res.data];

        if (sortOption === 'lowToHigh') {
          sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
        } else if (sortOption === 'highToLow') {
          sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
        } else {
          sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        setProducts(sorted);
      } catch (error) {
        console.error('❌ Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, [category, sortOption]);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <PageWrapper>
      <NMABHeader />

      <FilterBar>
        <FilterLabel>SORT BY:</FilterLabel>
        <CustomSelect className={dropdownOpen ? 'open' : ''} onClick={toggleDropdown}>
          <div className="selected">
            {options.find((o) => o.value === sortOption)?.label}
            <FiChevronDown />
          </div>
          <ul>
            {options.map((opt) => (
              <li
                key={opt.value}
                onClick={(e) => {
                  e.stopPropagation();
                  setSortOption(opt.value);
                  setDropdownOpen(false);
                }}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        </CustomSelect>
      </FilterBar>

      {products.length === 0 ? (
        <Empty>No products found in "{category}"</Empty>
      ) : (
        <Grid>
          {products.map((product) => (
            <ProductItem key={product._id}>
              <ImageContainer>
              <img src={product.images?.[0] || product.image} alt={product.name} />
              <HeartIcon />
              </ImageContainer>
              <ProductInfo>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p className="price">{product.price ? `$${product.price.toFixed(2)}` : '--'}</p>
                <AddToBag>Add to Bag</AddToBag>
              </ProductInfo>
            </ProductItem>
          ))}
        </Grid>
      )}

      <Footer />
    </PageWrapper>
  );
};

export default Products;

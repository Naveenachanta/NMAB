import React from 'react';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: ${({ open }) => (open ? '0' : '-100%')};
  width: 420px;
  height: 100%;
  background: #fff;
  box-shadow: -2px 0 20px rgba(0, 0, 0, 0.2);
  z-index: 999;
  transition: right 0.4s ease;
  padding: 2rem;
`;

const Title = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const Item = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;

  img {
    width: 70px;
    height: 70px;
    object-fit: contain;
    border: 1px solid #eee;
  }

  div {
    font-size: 0.95rem;
    line-height: 1.3;
  }
`;

const Button = styled.button`
  width: 100%;
  margin-top: 1rem;
  padding: 1rem;
  font-weight: bold;
  border: ${({ outline }) => (outline ? '1px solid #000' : 'none')};
  background: ${({ outline }) => (outline ? 'transparent' : '#000')};
  color: ${({ outline }) => (outline ? '#000' : '#fff')};
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background: ${({ outline }) => (outline ? '#eee' : '#111')};
  }
`;

const SideCartPopup = () => {
  const { cartItems, isCartOpen, setCartOpen } = useCart();
  const navigate = useNavigate();

  return (
    <Overlay open={isCartOpen}>
      <Title>Added to Shopping Bag</Title>
      {cartItems.map(item => (
        <Item key={item._id}>
          <img src={item.images?.[0] || item.image} alt={item.name} />
          <div>
            <strong>{item.name}</strong><br />
            ${item.price?.toFixed(2)}
          </div>
        </Item>
      ))}
      <Button onClick={() => navigate('/bag')}>View Shopping Bag</Button>
      <Button outline onClick={() => setCartOpen(false)}>Continue Shopping</Button>
    </Overlay>
  );
};

export default SideCartPopup;

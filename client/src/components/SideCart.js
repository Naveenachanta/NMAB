// src/components/SideCart.js
import React from 'react';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { FiX } from 'react-icons/fi';

const SideCart = () => {
  const { cartItems, isCartOpen, setCartOpen, updateQuantity } = useCart();
  const navigate = useNavigate();

  const closeCart = () => setCartOpen(false);
  if (!isCartOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => {
    const price = item?.price || 0;
    const qty = item?.quantity || 1;
    return acc + price * qty;
  }, 0);

  return (
    <Overlay onClick={closeCart}>
      <CartPanel onClick={(e) => e.stopPropagation()}>
        <Header>
          <h3>ADDED TO SHOPPING BAG</h3>
          <CloseBtn onClick={closeCart}><FiX size={22} /></CloseBtn>
        </Header>

        <CartBody>
          {cartItems.map((item, index) => (
            <CartItem key={index}>
              <ItemImage src={item.images?.[0] || item.image} alt={item.name} />
              <ItemDetails>
                <Name>{item.name}</Name>
                <Description>{item.description || 'No description available.'}</Description>
                <QuantityRow>
                  <Label>Qty:</Label>
                  <Select value={item.quantity} onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}>
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </Select>
                </QuantityRow>
              </ItemDetails>
              <ItemPrice>
                ${(item.price * item.quantity).toFixed(2)}
              </ItemPrice>
            </CartItem>
          ))}
        </CartBody>

        <Summary>
          <Line>
            <span>Shipping</span>
            <span>Free (Premium Express)</span>
          </Line>
          <Line>
            <span>Estimated Tax</span>
            <span>—</span>
          </Line>
          <Line bold>
            <span>Estimated Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </Line>
        </Summary>

        <ButtonGroup>
          <PrimaryButton onClick={() => navigate('/checkout')}>CHECKOUT</PrimaryButton>
          <SecondaryButton onClick={() => navigate('/bag')}>VIEW SHOPPING BAG</SecondaryButton>
        </ButtonGroup>
      </CartPanel>
    </Overlay>
  );
};

export default SideCart;

// Styled Components
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 1000;
`;

const CartPanel = styled.div`
  position: fixed;
  top: 80px;
  right: 24px; /* Creates margin from right screen edge */
  width: 400px;
  height: calc(100vh - 80px);
  background: #fff;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  padding: 1.6rem;
  overflow-y: auto;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  border: 1px solid #eee;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-bottom: 1.8rem;
  text-transform: uppercase;
`;

const CloseBtn = styled.div`
  cursor: pointer;
`;

const CartBody = styled.div`
  flex: 1;
  overflow-y: auto;
`;



const CartItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.6rem;
  padding-bottom: 1.4rem;
  border-bottom: 1px solid #eee;
`;


const ItemImage = styled.img`
  width: 88px;
  height: 88px;
  object-fit: contain;
  border: 1px solid #ddd;
`;

const ItemDetails = styled.div`
  flex: 1;
  font-size: 0.85rem;
`;

const Name = styled.div`
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.3rem;
`;

const Description = styled.div`
  font-size: 0.82rem;
  color: #555;
  margin-bottom: 0.8rem;
`;

const QuantityRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Label = styled.span`
  font-size: 0.8rem;
`;

const Select = styled.select`
  padding: 0.3rem 0.5rem;
  font-size: 0.85rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ItemPrice = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  white-space: nowrap;
`;

const Summary = styled.div`
  border-top: 1px solid #ccc;
  padding-top: 1rem;
  margin-top: 2rem;
  font-size: 0.88rem;
`;

const Line = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.4rem 0;
  font-weight: ${({ bold }) => (bold ? 600 : 400)};
`;

const ButtonGroup = styled.div`
  margin-top: 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

const PrimaryButton = styled.button`
  padding: 1rem;
  background: black;
  color: white;
  border: none;
  font-size: 0.95rem;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
`;

const SecondaryButton = styled.button`
  padding: 1rem;
  background: white;
  color: black;
  border: 1.5px solid black;
  font-size: 0.95rem;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
`;

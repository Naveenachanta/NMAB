// src/pages/Bag.js
import React from 'react';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Bag = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 1),
    0
  );

  return (
    <PageContainer>
      <h2>Your Shopping Bag</h2>

      <ContentWrapper>
        <ProductList>
          {cartItems.map((item, index) => (
            <ItemCard key={index}>
              <img src={item.images?.[0] || item.image} alt={item.name} />
              <ItemDetails>
                <h4>{item.name}</h4>
                <p>Available for purchase</p>
                <QuantityRow>
                  <label>Qty:</label>
                  <select
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item._id, parseInt(e.target.value))
                    }
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                  <RemoveBtn onClick={() => removeFromCart(item._id)}>
                    Remove
                  </RemoveBtn>
                </QuantityRow>
              </ItemDetails>
              <ItemPrice>${(item.price * item.quantity).toFixed(2)}</ItemPrice>
            </ItemCard>
          ))}
        </ProductList>

        <OrderSummary>
          <h4>Order Summary</h4>
          <SummaryRow>
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </SummaryRow>
          <SummaryRow>
            <span>Shipping</span>
            <span>Free (Premium Express)</span>
          </SummaryRow>
          <SummaryRow>
            <span>Estimated Tax</span>
            <span>—</span>
          </SummaryRow>
          <SummaryRow bold>
            <span>Estimated Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </SummaryRow>
          <CheckoutButton onClick={() => navigate('/checkout')}>
            CHECKOUT
          </CheckoutButton>
        </OrderSummary>
      </ContentWrapper>
    </PageContainer>
  );
};

export default Bag;
const PageContainer = styled.div`
  max-width: 1240px;
  margin: 2rem auto;
  padding: 1rem 2rem;
  font-family: 'Cormorant Garamond', serif;

  h2 {
    font-weight: 400;
    font-size: 2.2rem;
    margin-bottom: 2rem;
    text-align: center;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ProductList = styled.div`
  flex: 3;
`;

const ItemCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1.5rem;

  img {
    width: 100px;
    height: 100px;
    object-fit: contain;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

const ItemDetails = styled.div`
  flex: 1;

  h4 {
    font-size: 1.1rem;
    margin: 0 0 0.4rem 0;
  }

  p {
    color: #777;
    font-size: 0.9rem;
    margin-bottom: 0.8rem;
  }
`;

const QuantityRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  label {
    font-size: 0.9rem;
  }

  select {
    padding: 0.3rem 0.6rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

const RemoveBtn = styled.button`
  background: none;
  border: none;
  color: #cc0000;
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: red;
  }
`;

const ItemPrice = styled.div`
  font-weight: 500;
  font-size: 1rem;
`;

const OrderSummary = styled.div`
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 1.5rem;
  background: #fafafa;

  h4 {
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    font-weight: 600;
  }
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
  margin-bottom: 0.8rem;
  font-weight: ${({ bold }) => (bold ? '600' : '400')};
`;

const CheckoutButton = styled.button`
  width: 100%;
  margin-top: 1.2rem;
  padding: 0.9rem;
  background: #000;
  color: #fff;
  font-size: 1rem;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

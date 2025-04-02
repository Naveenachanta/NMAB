// src/components/CustomToast.js
import React from 'react';
import styled, { keyframes } from 'styled-components';

const slideDown = keyframes`
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0px);
    opacity: 1;
  }
`;

const ToastWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 9999;
  pointer-events: none;
`;

const ToastContent = styled.div`
  background: #111;
  color: white;
  padding: 1rem 2rem;
  border: 1px solid #444;
  border-radius: 6px;
  font-family: 'Didot', serif;
  animation: ${slideDown} 0.4s ease-out;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
  pointer-events: auto;
`;

const CustomToast = ({ message }) => {
  if (!message) return null;
  return (
    <ToastWrapper>
      <ToastContent>{message}</ToastContent>
    </ToastWrapper>
  );
};

export default CustomToast;

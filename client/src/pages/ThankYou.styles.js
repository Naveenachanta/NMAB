import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fff;
  font-family: 'Poppins', sans-serif;
  padding: 2rem;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 3rem;
  color: #000;
  font-family: 'Playfair Display', serif;
  margin-bottom: 1rem;
`;

export const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #555;
  max-width: 600px;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

export const Emoji = styled.div`
  font-size: 5rem;
  animation: ${float} 2s ease-in-out infinite;
  margin-bottom: 1rem;
`;

export const LogoutButton = styled.button`
  background-color: #000;
  color: #fff;
  padding: 0.9rem 2rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #222;
  }
`;

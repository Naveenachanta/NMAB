import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  background-color: #fefefe;
  color: #000;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const LeftSection = styled.div`
  flex: 1;
  background-color: #dab6f7;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    height: 90%;
    max-width: 100%;
    object-fit: contain;

    @media (max-width: 768px) {
      height: 300px;
    }
  }
`;

export const RightSection = styled.div`
  flex: 1;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 2rem;
    align-items: center;
  }
`;

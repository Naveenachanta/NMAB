import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  background-color: #ffffff;
  padding: 2rem;
  font-family: 'Poppins', sans-serif;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;
export const Progress = styled.div`
  font-size: 1rem;
  color: #d60480;
  font-weight: 500;
  text-align: center;
  margin-bottom: 1rem;
  font-family: 'Poppins', sans-serif;
`;

export const ProgressBar = styled.div`
  height: 10px;
  width: 100%;
  background-color: #fcdce5; /* light pink background */
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 2rem;
  position: relative;

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${({ progress }) => progress || 0}%;
    background-color: #f58ab1; /* luxurious Ipsy-style dark pink */
    transition: width 0.4s ease-in-out;
    border-radius: 10px;
  }
`;
export const OptionWithImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 1rem;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.3s ease;
  background-color: #fff;

  ${(props) =>
    props.selected &&
    `
    outline: 3px solid #d60480;
    outline-offset: 4px;
  `}

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;







export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const FadeWrapper = styled.div`
  opacity: ${(props) => (props.$show ? 1 : 0)};
  transition: opacity 0.5s ease;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


export const Title = styled.h1`
  font-size: 2.8rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: #000;
  text-align: center;
  font-family: 'Playfair Display', serif;
`;

export const Question = styled.h2`
  font-size: 1.8rem;
  font-weight: 400;
  margin-bottom: 1.5rem;
  color: #111;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  letter-spacing: 0.5px;
`;

export const Options = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
`;


export const Option = styled.div`
  border: 2px solid ${({ selected }) => (selected ? '#f58ab1' : '#ccc')};
  border-radius: 12px;
  padding: 1.5rem;
  width: 160px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #fff;
  color: #000;
  box-shadow: ${({ selected }) =>
    selected ? '0 0 10px #d60480(255, 105, 180, 0.4)' : 'none'};

  &:hover {
    border-color: #f58ab1;
    transform: scale(1.05);
  }

  img {
    width: 60px;
    height: 60px;
    object-fit: contain;
    margin-bottom: 1rem;
  }
`;

export const NextButton = styled.button`
  margin-top: 2rem;
  padding: 1rem 2rem;
  font-size: 1rem;
  border: none;
  border-radius: 10px;
  background-color: ${(props) => (props.disabled ? '#ccc' : '#000')};
  color: ${(props) => (props.disabled ? '#666' : '#fff')};
  font-weight: bold;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.disabled ? '#ccc' : '#222')};
  }
`;
export const ImageOption = styled(Option)`
  border: none;
  padding: 0;
  width: 100px;
  height: 130px;
  background-color: transparent;
  box-shadow: none;

  img {
    width: 100%;
    height: 100px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 0.4rem;
  }

  span {
    display: block;
    font-size: 0.9rem;
    color: #000;
    margin-top: 4px;
  }

  &:hover {
    transform: scale(1.05);
  }

  ${({ selected }) =>
    selected &&
    `
    outline: 2px solid #d60480;
    outline-offset: 3px;
    border-radius: 10px;
  `}
`;
export const SkinColorOption = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin: 1rem;
  cursor: pointer;
  transition: transform 0.3s ease;

  ${(props) =>
    props.selected &&
    `
    outline: 3px solid #d60480;
    outline-offset: 4px;
  `}

  &:hover {
    transform: scale(1.05);
  }
`;




export const SkinColorLabel = styled.div`
  margin-top: 0.6rem;
  font-size: 0.95rem;
  font-weight: 400;
  color: #333;
  font-family: 'Poppins', sans-serif;
  text-transform: capitalize;
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.8rem;
  margin-bottom: 1.5rem;
`;

export const BackArrow = styled.div`
  font-size: 1.6rem;
  color: #888; /* soft modern gray */
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #555;
  }
`;
export const SkinTypeOption = styled.div`
  border: 2px solid ${({ selected }) => (selected ? '#f58ab1' : '#eee')};
  border-radius: 16px;
  padding: 1.5rem 1rem;
  width: 160px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #fff;
  color: #000;
  box-shadow: ${({ selected }) =>
    selected ? '0 0 10px rgba(255, 105, 180, 0.2)' : 'none'};

  &:hover {
    border-color: #f58ab1;
    transform: scale(1.05);
  }

  strong {
    display: block;
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  span {
    font-size: 0.85rem;
    color: #888; /* ✅ Lighter grey */
    opacity: 0.9;
    margin-top: 0.5rem; /* ✅ Pushes it a bit lower */
    display: block;
  }
`;



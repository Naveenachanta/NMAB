import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    background-color: #000;
    font-family: 'Didot', serif;
    overflow-x: hidden;
  }

  #root {
    height: 100%;
  }
`;

export default GlobalStyles;

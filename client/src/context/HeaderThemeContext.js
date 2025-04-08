import { createContext, useContext, useState } from 'react';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
const HeaderThemeContext = createContext();

export const useHeaderTheme = () => useContext(HeaderThemeContext);

export const HeaderThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark'); // default = dark

  return (
    <HeaderThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </HeaderThemeContext.Provider>
  );
};

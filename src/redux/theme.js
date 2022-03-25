import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  windowSize: {
    small: `screen and (max-width: 600px)`,
    base: `screen and (max-width: 768px)`,
    large: `screen and (max-width: 1024px)`,
  },
  fontSize: {
    xs: '0.5rem',
    sm: '0.75rem',
    base: '1rem',
    md: '1.25rem',
    lg: '1.5rem',
  },
  lightversion: {
    background: '#fff',
    fontPrimary: 'black',
    fontSecondary: 'gray',
    primary: '#00a0ff',
    secondary: '#ddd',
    hover: '#00a0ff30',
    hover2: '#f0f0f0',
  },
  darkversion: {
    background: '#0e1116',
    fontPrimary: '#a9a9a9',
    fontSecondary: '#ddd',
    cardBg: '#181b21',
    cardDV: '#686A70',
    primary: '#00a0ff',
    secondary: '#696969',
    hover: '#393B40',
  },
  repo: {
    open: 'red',
    close: 'blue',
  },
};

export const theme = createSlice({
  name: 'theme',
  initialState,
});

export default theme.reducer;

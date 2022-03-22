const windowSizes = {
  sm: '600px',
  base: '768px',
  lg: '1024px',
};

const device = {
  small: `screen and (max-width: ${windowSizes.sm})`,
  base: `screen and (max-width: ${windowSizes.base})`,
  large: `screen and (max-width: ${windowSizes.lg})`,
};

const fontSize = {
  xs: '0.5rem',
  sm: '0.75rem',
  base: '1rem',
  md: '1.25rem',
  lg: '1.5rem',
};

const lightversion = {
  background: '#fff',
  fontPrimary: 'black',
  fontSecondary: 'gray',
  primary: '#00a0ff',
  secondary: '#ddd',
  hover: '#00a0ff50',
};

const darkversion = {
  background: '#121212',
  fontPrimary: '#f0f0f0',
  fontSecondary: '#ddd',
  primary: '#00a0ff',
  secondary: '#ddd',
  hover: '#00a0ff50',
};

const repo = {
  open: 'red',
  close: 'blue',
};

const theme = {
  device,
  repo,
  fontSize,
  lightversion,
  darkversion,
};

export default theme;

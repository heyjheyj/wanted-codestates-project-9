import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: "Helvetica", "Arial", sans-serif;
    line-height: 1.2;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;

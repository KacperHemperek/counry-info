import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    letter-spacing: 1px;
    font-family: 'Nunito Sans', sans-serif;
    transition: background-color .15s linear;
    font-weight: ${({ theme }) => theme.weights.base};
  }
  body {
    font-size: 16px;
    color: ${({ theme }) => theme.neutral.text};
    background-color: ${({ theme }) => theme.neutral.background};
    
  }

  a {
    color: ${({ theme }) => theme.neutral.text};
    text-decoration: none;
  }

`;

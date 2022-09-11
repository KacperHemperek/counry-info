import { DefaultTheme } from "styled-components";

const common = {
  fontSize: {
    homepageItems: "14px",
    detailPage: "16px",
  },
  weights: {
    light: 300,
    base: 600,
    bold: 800,
  },
  boxShadow: "0 0 10px 0 rgba(0,0,0, 0.2);",
};

export const lightTheme: DefaultTheme = {
  neutral: {
    background: "hsl(0, 0%, 98%)",
    text: "hsl(200, 15%, 8%)",
    elements: "hsl(0, 0%, 100%)",
    input: "hsl(0, 0%, 52%)",
  },
  ...common,
};

export const darkTheme: DefaultTheme = {
  neutral: {
    background: "hsl(207, 26%, 17%)",
    text: "hsl(0, 0%, 100%)",
    elements: "hsl(209, 23%, 22%)",
    input: "hsl(0, 0%, 100%)",
  },
  ...common,
};

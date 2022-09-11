import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    neutral: {
      background: string;
      elements: string;
      text: string;
      input: string;
    };
    weights: {
      light: number;
      base: number;
      bold: number;
    };
    fontSize: {
      homepageItems: string;
      detailPage: string;
    };
    boxShadow: string;
  }
}

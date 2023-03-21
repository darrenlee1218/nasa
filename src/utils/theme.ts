import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyles = createGlobalStyle`
  ${reset}
  html {
    height: -webkit-fill-available;
    height: 100vh;
    box-sizing: border-box;
  }
  body {
    min-height: -webkit-fill-available;
    min-height: 100vh;

    color: #000;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    overflow-x: hidden;

    padding-bottom: env(safe-area-inset-bottom);
  }
  a {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  *.grecaptcha-badge { 
    visibility: hidden;
  }
`;

export const theme = {
  colors: {
    black: "#000",
    white: "#fff",

    gray900: "#2a2a2a",
    gray600: "#666",
    gray500: "#777",
    gray300: "#ccc",
    gray200: "#ddd",
    gray100: "#f5f5f5",
    gray50: "#fafafa",

    accent900: "#222",
    accent500: "#777",
    accent300: "#ccc",
    accent200: "#e5e5e5",
    accent100: "#f9f9f9",
    accent50: "#fafafa",

    red500: "#e53e3e",
    red200: "#f6c9ca",
    red100: "#fcecec",

    green500: "#68d391",

    blue500: "#3b82f6",
  },

  customColors: {
    primary: "#1AB8FF",
    secondary: "#748DFC",

    success: "#0DD9B7",
    error: "#EA2849",
    warning: "#FFC914",
  },
};

export type FontWeights = "regular" | "medium" | "semibold" | "normal";

const fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  normal: "normal",
};

export const getFontWeights = (weight: FontWeights) => {
  switch (weight) {
    case "regular":
      return fontWeights.regular;
    case "medium":
      return fontWeights.medium;
    case "semibold":
      return fontWeights.semibold;
    case "normal":
      return fontWeights.normal;
    default:
      return "inherit";
  }
};

export interface FontProps {
  alternates?: boolean;
}

export const getFontCssValue = ({ alternates }: FontProps) =>
  `${alternates ? "Montserrat Alternates" : "Montserrat"}, sans-serif`;

export const getFontCss = ({ alternates }: FontProps) =>
  `font-family: ${getFontCssValue({ alternates })};`;

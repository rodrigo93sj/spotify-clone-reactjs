import { createGlobalStyle } from "styled-components";

import "rc-slider/assets/index.css";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  html, body, #root {
    height: 100%;
  }

  html {
    scrollbar-color: hsla(0, 0%, 100%, 0.3) transparent;
    scrollbar-width: auto;
  }
  
  ::-webkit-scrollbar {
    width: 14px;
    background-color: #282828;
  }
  
  ::-webkit-scrollbar-thumb {
    background-color: hsla(0, 0%, 100%, 0.3);
  }

  body {
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    background-color: #181818;
    font-family: Helvetica Neue,Helvetica,Arial,Hiragino Kaku Gothic Pro,Meiryo,MS Gothic,sans-serif;
    color: #fff;
    overscroll-behavior-y: none;
    overflow: hidden;
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;

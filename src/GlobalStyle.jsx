import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --black: #000000;
    --white: #ffffff;
    --header-content: #1e5269;
    --header-background: #d7f5ff;
    --mail-hover: #e7e7e7;
    --mail-basic: #666666;
    --mail-promotion: #1b72e8;
    --mail-spam: #d92f25;
    --mail-trash: #168037;
    --game-modal-background: #d6f5f5;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    font-family: "Helvetica", "Arial", sans-serif;
    font-family: 'Balsamiq Sans', cursive;
    line-height: 1.5;
    overflow-x: hidden;
    overflow-y: hidden;

    .toast {
      background-color: #1e5269;
      /* background-color: #255d75d8; */
      color: #fff;
      font-size: 18px;
      text-align: center;
    }
  }

  h2, p {
    margin: 0;
  }

  h2 {
    font-size: 1.5rem;
  }

  p {
    font-size: 1rem;
  }
`;

export default GlobalStyle;

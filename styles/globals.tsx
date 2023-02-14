import React from "react";
import { css, Global } from "@emotion/react";

import { Colors } from "styles/common";

const global = css`
  @font-face {
    font-family: "pretendard";
    src: url("/font/Pretendard-Regular.subset.woff2") format("woff2"),
      url("/font/Pretendard-Regular.subset.woff") format("woff");
    font-weight: 400;
    font-display: auto;
  }

  @font-face {
    font-family: "pretendard";
    src: url("/font/Pretendard-Medium.subset.woff2") format("woff2"),
      url("/font/Pretendard-Medium.subset.woff") format("woff");
    font-weight: 500;
    font-display: auto;
  }

  @font-face {
    font-family: "pretendard";
    src: url("/font/Pretendard-Bold.subset.woff2") format("woff2"),
      url("/font/Pretendard-Bold.subset.woff") format("woff");
    font-weight: 700;
    font-display: auto;
  }

  * {
    box-sizing: border-box;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue",
      "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  }

  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  input {
    caret-color: ${Colors.amber50};

    &::-webkit-search-cancel-button {
      -webkit-appearance: none;
      width: 20px;
      height: 20px;
      background: url("/icons/Close.svg") center center no-repeat;
      cursor: pointer;
    }

    &:focus {
      outline: 1px solid ${Colors.amber50};
    }
  }

  button {
    border: 0;
    outline: 0;
    cursor: pointer;
  }
`;

const GlobalStyle = () => {
  return <Global styles={global} />;
};

export default GlobalStyle;

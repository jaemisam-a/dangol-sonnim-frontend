import React from "react";
import { css, Global } from "@emotion/react";

import { Colors } from "styles/common";

const global = css`
  @font-face {
    font-family: "pretendard";
    src:
      url("/fonts/pretendard-Regular.subset.woff2") format("woff2"),
      url("/fonts/pretendard-Regular.subset.woff") format("woff");
    font-weight: 400;
    font-display: swap;
  }

  @font-face {
    font-family: "pretendard";
    src:
      url("/fonts/pretendard-Medium.subset.woff2") format("woff2"),
      url("/fonts/pretendard-Medium.subset.woff") format("woff");
    font-weight: 500;
    font-display: swap;
  }

  @font-face {
    font-family: "pretendard";
    src:
      url("/fonts/pretendard-Bold.subset.woff2") format("woff2"),
      url("/fonts/pretendard-Bold.subset.woff") format("woff");
    font-weight: 700;
    font-display: swap;
  }

  @font-face {
    font-family: "blackHanSans";
    src: url("/fonts/blackHanSans.ttf") format("truetype");
    font-weight: 400;
    font-display: swap;
  }

  * {
    box-sizing: border-box;
    font-family:
      pretendard,
      -apple-system,
      BlinkMacSystemFont,
      system-ui,
      Roboto,
      "Helvetica Neue",
      "Segoe UI",
      "Apple SD Gothic Neo",
      "Noto Sans KR",
      "Malgun Gothic",
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol",
      sans-serif;
  }

  body {
    margin: 0;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  input {
    caret-color: ${Colors.amber50};

    &::-webkit-search-cancel-button {
      -webkit-appearance: none;
      width: 20px;
      height: 20px;
      background: url("/icons/close/closeCircle.svg") center center no-repeat;
      cursor: pointer;
    }

    &:focus {
      outline: 1px solid ${Colors.amber50};
    }

    ::placeholder {
      color: ${Colors.neutral40};
    }
  }

  button {
    border: 0;
    outline: 0;
    cursor: pointer;
    padding: 0;
    background-color: transparent;
  }

  ul,
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hr {
    padding: 0;
    margin: 0;
  }

  li {
    margin: 0;
    list-style-type: none;
  }

  a {
    text-decoration: none;
    color: black;
  }
`;

const GlobalStyle = () => {
  return <Global styles={global} />;
};

export default GlobalStyle;

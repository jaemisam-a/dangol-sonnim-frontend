import React from "react";
import { css, keyframes } from "@emotion/react";

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const stretch = keyframes`
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dashoffset: -124px;
  }
`;

const container = (size: string, color: string, speed: number) => css`
  height: ${size};
  width: ${size};
  vertical-align: middle;
  transform-origin: center;
  animation: ${rotate} ${speed + "s"} linear infinite;
  will-change: transform;

  circle {
    fill: none;
    stroke: ${color};
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: ${stretch} ${speed * 0.75 + "s"} ease-in-out infinite;
    will-change: stroke-dasharray, stroke-dashoffset;
  }
`;

const Spinner = ({ size = "40px", color = "black", lineWeight = 5, speed = 2 }) => {
  return (
    <>
      <svg height={size} width={size} css={container(size, color, speed)} viewBox="25 25 50 50">
        <circle cx="50" cy="50" r="20" strokeWidth={lineWeight} />
      </svg>
    </>
  );
};

export default Spinner;

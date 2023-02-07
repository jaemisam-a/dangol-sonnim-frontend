import React from "react";

import { Colors } from "styles/common";

interface PickProps {
  isPick: boolean;
}

const Pick = ({ isPick }: PickProps) => {
  return (
    <svg
      width="20"
      height="18"
      viewBox="0 0 20 18"
      fill={`${isPick ? Colors.red40 : "none"}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 17C10 17 1 11.9875 1 5.97234C1 -0.0427764 8 -0.544034 10 4.16221C12 -0.544034 19 -0.0427764 19 5.97234C19 11.9875 10 17 10 17Z"
        stroke={`${isPick ? Colors.red40 : Colors.white}`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Pick;

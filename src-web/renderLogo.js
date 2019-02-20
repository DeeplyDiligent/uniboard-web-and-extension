import React from "react";
const RenderLogo = props => {
  let color = props.color;
  console.log(props.color)
  return (
    <svg
      viewBox="0 0 512 512"
    >
      <defs>
        <clipPath id="_clipPath_cXPZBH7VR7sYyHXHp7adH27NgrldGSbD">
          <rect width="512" height="512" />
        </clipPath>
      </defs>
      <g clip-path="url(#_clipPath_cXPZBH7VR7sYyHXHp7adH27NgrldGSbD)">
        <g>
          <circle
            vector-effect="non-scaling-stroke"
            cx="256.0000000000007"
            cy="255.99999999999997"
            r="255.99999999999994"
            fill={props.color}
          />
          <path
            d="M 87.017 240.687 L 249.918 87.56 C 270.265 68.433 301.228 68.271 319.019 87.198 L 319.019 87.198 C 336.81 106.124 334.735 137.018 314.388 156.144 L 151.486 309.271 C 131.14 328.398 100.176 328.56 82.386 309.633 L 82.386 309.633 C 64.595 290.707 66.67 259.813 87.017 240.687 Z"
            style = {{stroke:"none", fill:"#FFFFFF", strokeMiterlimit:"10"}}
          />
          <path
            d="M 189.179 351.021 L 352.08 197.894 C 372.427 178.768 403.39 178.606 421.181 197.532 L 421.181 197.532 C 438.972 216.459 436.896 247.353 416.55 266.479 L 253.648 419.606 C 233.301 438.732 202.338 438.894 184.547 419.968 L 184.547 419.968 C 166.757 401.041 168.832 370.148 189.179 351.021 Z"
            style={{stroke:"none", fill:"#FFFFFF", strokeMiterlimit:"10"}}
          />
        </g>
      </g>
    </svg>
  );
};

export default RenderLogo;

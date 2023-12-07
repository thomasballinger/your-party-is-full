
export function Logo({full=true}: {full: boolean}) {
  const classNames = "logo logo-orig";
  return (
    <svg
      style={{ width: 240 }}
      viewBox="80 0 200 35"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames}
    >
      <Part />
      <Y />
      <I/>
      <S />
      <Ful />
      <LastEl />
    </svg>
  );
}

function Part() {
  return (
    <g className="logo-part logo-orig">
      <path d="M 100.86 8.416 C 102.663 7.49 103.413 6.741 104.337 4.938 C 105.262 6.741 106.012 7.49 107.816 8.416 C 106.012 9.34 105.262 10.089 104.337 11.894 C 103.413 10.089 102.663 9.34 100.86 8.416 Z" />
      <path d="M 111.818 15.315 C 115.006 15.315 118.354 16.718 120.615 18.26 L 120.615 16.113 C 120.615 13.195 118.965 12.686 117.481 12.686 L 109.546 12.686 L 108.629 10.333 L 119.293 10.333 C 122.179 10.333 124.104 12.287 124.131 16.113 L 124.131 24.618 L 120.609 24.618 L 120.609 21.811 C 118.492 23.38 114.423 24.783 111.427 24.783 C 108.485 24.783 104.527 23.461 104.527 20.154 C 104.527 16.846 108.485 15.315 111.818 15.315 Z M 108.052 20.104 C 108.052 22.388 110.773 23.076 112.675 23.076 C 115.947 23.076 119.273 21.067 120.62 20.214 L 120.62 19.94 C 119.904 19.443 116.551 17.105 112.808 17.105 C 110.63 17.105 108.045 17.903 108.045 20.104 L 108.052 20.104 Z" />
      <path d="M 81.366 9.735 L 84.884 9.735 L 84.884 13.912 C 86.342 11.823 89.887 9.735 93.653 9.735 C 99.206 9.735 103.109 13.39 103.109 17.457 C 103.109 21.799 99.343 24.767 93.928 24.767 C 90.437 24.767 86.396 22.54 84.884 20.398 L 84.884 30.96 L 81.366 30.96 L 81.366 9.735 Z M 92.966 22.856 C 97.199 22.856 99.591 20.508 99.591 17.524 C 99.591 14.209 96.815 11.696 92.609 11.696 C 88.21 11.696 84.884 14.954 84.884 17.165 C 84.884 19.43 88.486 22.856 92.966 22.856 Z" />
      <path d="M 143.027 9.757 L 143.027 4.17 L 146.461 2.946 L 146.461 10.333 L 152.838 10.333 L 152.014 12.694 L 146.463 12.694 L 146.463 18.537 C 146.463 20.821 147.206 22.334 149.761 22.334 L 154.573 22.334 L 154.573 24.619 L 148.663 24.619 C 144.897 24.619 142.944 21.977 142.944 18.371 L 143.027 9.757 Z" />
      <path d="M 130.277 9.735 L 130.277 14.03 C 131.871 11.476 134.456 9.846 137.726 9.846 C 138.598 9.865 139.461 10.033 140.277 10.343 L 140.254 12.683 C 139.499 12.335 138.633 12.242 137.726 12.242 C 132.474 12.242 130.277 16.67 130.277 18.05 L 130.277 24.62 L 126.758 24.62 L 126.758 9.735 L 130.277 9.735 Z" />
    </g>
  );
}

function Y() {
  return (
    <g className="logo-y logo-new" >
      <path d="M 171.953 10.881 L 171.965 17.816 C 171.965 17.943 171.965 18.363 171.947 18.468 C 171.781 21.567 169.542 23.273 165.649 23.273 C 161.755 23.273 159.516 21.567 159.347 18.457 C 159.336 18.369 159.332 17.962 159.332 17.819 L 159.344 10.884 L 155.883 10.884 L 155.883 18.146 C 155.883 22.793 159.351 25.352 165.647 25.352 C 171.943 25.352 175.412 22.798 175.412 18.146 L 175.412 10.881 L 171.953 10.881 Z" />
      <path d="M 171.97 18.731 L 171.982 25.666 C 171.982 25.793 171.982 26.213 171.964 26.318 C 171.798 29.417 169.559 31.123 165.666 31.123 C 161.772 31.123 157.529 27.413 157.529 27.413 C 158.82 30.616 159.368 33.202 165.664 33.202 C 171.96 33.202 175.429 30.648 175.429 25.996 L 175.429 18.731 L 171.97 18.731 Z" />
    </g>
  );
}

function I() {
  return (
    <g className="logo-i logo-orig">
      <path d="M 186.062 29.25 C 187.865 28.326 188.615 27.576 189.541 25.773 C 190.464 27.576 191.215 28.326 193.018 29.25 C 191.215 30.175 190.464 30.925 189.541 32.729 C 188.615 30.925 187.865 30.183 186.062 29.25 Z" />
      <path d="M 191.306 11.596 L 187.768 10.427 L 187.784 24.401 L 191.306 24.401 L 191.306 11.596 Z" />
    </g>
  );
}

function S() {
  return (
    <g className="logo-s logo-new">
      <path
        d="M 197.112 18.783 L 200.16 19.059 C 200.285 19.06 200.698 19.061 200.802 19.067 C 203.852 19.132 203.7 20.052 203.635 21.093 C 203.57 22.134 203.813 22.112 200.751 22.16 C 200.664 22.163 200.274 22.167 200.133 22.167 L 194.739 22.178 L 194.764 24.329 L 200.424 24.468 C 204.998 24.481 205.823 23.458 205.847 21.341 C 205.871 19.224 204.973 16.971 200.169 16.848 L 197.713 16.867 L 197.112 18.783 Z"
        style={{ transformOrigin: "200.653px 23.215px;" }}
      />
      <path
        d="M 203.463 15.801 C 203.463 15.801 201.232 15.784 201.227 15.886 C 201.17 18.938 201.354 18.934 200.044 18.934 C 198.735 18.934 198.515 19.232 198.459 16.17 C 198.455 16.083 198.499 15.071 198.499 14.931 L 198.53 10.83 L 195.846 10.756 L 195.743 16.034 C 195.743 20.609 198.049 21.625 200.166 21.625 C 202.283 21.625 203.463 20.381 203.463 15.801 Z"
        style={{ transformOrigin: "200.179px 15.773px" }}
        transform="matrix(0, 1, -1, 0, -0.000001, 0.000002)"
      />
    </g>
  );
}

function Ful() {
  return (
    <g className="logo-ful logo-orig">
      <path d="M 236.357 13.718 C 238.161 12.793 238.91 12.045 239.835 10.241 C 240.76 12.045 241.51 12.793 243.313 13.718 C 241.51 14.644 240.76 15.394 239.835 17.196 C 238.911 15.398 238.161 14.649 236.357 13.718 Z" />
      <path d="M 256.063 4.033 L 252.525 2.866 L 252.54 24.539 L 256.063 24.539 L 256.063 4.033 Z" />
      <path d="M 214.356 12.611 L 214.356 10.253 L 218.315 10.253 L 218.315 8.804 C 218.315 5.472 220.402 3.134 223.976 3.134 L 229.008 3.134 L 229.008 6.058 L 225.057 6.058 C 222.748 6.058 221.841 7.27 221.841 9.279 L 221.841 10.261 L 227.767 10.261 L 227.247 12.619 L 221.827 12.619 L 221.827 24.543 L 218.315 24.543 L 218.315 12.614 L 214.356 12.611 Z" />
      <path d="M 246.161 10.253 L 246.173 17.188 C 246.173 17.315 246.173 17.735 246.155 17.84 C 245.989 20.939 243.75 22.645 239.857 22.645 C 235.963 22.645 233.724 20.939 233.555 17.829 C 233.544 17.741 233.54 17.334 233.54 17.191 L 233.552 10.256 L 230.091 10.256 L 230.091 17.518 C 230.091 22.165 233.559 24.724 239.855 24.724 C 246.151 24.724 249.62 22.17 249.62 17.518 L 249.62 10.253 L 246.161 10.253 Z" />
    </g>
  );
}

function LastEl() {
  return (
    <g className="logo-l logo-new">
      <path d="M 263.954 4.121 L 260.416 2.954 L 260.431 24.627 L 263.954 24.627 L 263.954 4.121 Z" />
    </g>
  );
}





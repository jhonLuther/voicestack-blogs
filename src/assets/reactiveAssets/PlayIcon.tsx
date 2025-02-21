import * as React from 'react'

const PlayIcon = ({ color = 'white' }) => (
  <svg
    width={30}
    height={30}
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width={30} height={30} rx={15} fill={color} />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.325 11.2976C11.325 10.4652 12.2169 9.93846 12.9461 10.3392L19.6778 14.0416C20.4332 14.457 20.4332 15.5425 19.6778 15.9585L12.9467 19.6609C12.2175 20.0616 11.3256 19.5343 11.3256 18.7025L11.325 11.2976Z"
      fill={color === 'black' ? 'white' : '#18181B'}
    />
  </svg>
)

export default PlayIcon

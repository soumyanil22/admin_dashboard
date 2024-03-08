import * as React from 'react';
const Calendar = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={50}
    height={90}
    fill="none"
    viewBox="-12 0 37 24"
    {...props}
  >
    <path
      stroke="#2c7dbb"
      strokeLinecap="round"
      strokeWidth={2}
      d="M20 10V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3m16 0v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9m16 0H4m4-7v4m8-4v4"
    />
  </svg>
);
export default Calendar;

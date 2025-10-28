import React from 'react';

const Target: React.FC = () => {
  return (
    <div
      className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[25vmax] h-[25vmax] max-w-[250px] max-h-[250px] pointer-events-none z-0"
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
        <circle cx="50" cy="50" r="50" fill="#F1FAEE" />
        <circle cx="50" cy="50" r="45" fill="#E63946" />
        <circle cx="50" cy="50" r="40" fill="#F1FAEE" />
        <circle cx="50" cy="50" r="35" fill="#E63946" />
        <circle cx="50" cy="50" r="30" fill="#F1FAEE" />
        <circle cx="50" cy="50" r="25" fill="#E63946" />
        <circle cx="50" cy="50" r="20" fill="#F1FAEE" />
        <circle cx="50" cy="50" r="15" fill="#E63946" />
        <circle cx="50" cy="50" r="10" fill="#F1FAEE" />
        <circle cx="50" cy="50" r="5" fill="#E63946" />
      </svg>
    </div>
  );
};

export default Target;
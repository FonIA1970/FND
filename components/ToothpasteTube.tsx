import React from 'react';

interface ToothpasteTubeProps {
  clicks: number;
  maxClicks: number;
  onSqueeze: () => void;
  isSqueezing: boolean;
  disabled: boolean;
}

const ToothpasteSVG = ({ depletionPercentage }: { depletionPercentage: number }) => {
  return (
    <svg
      viewBox="0 0 150 240"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto drop-shadow-2xl"
      aria-hidden="true" // It's decorative inside a button
    >
      <defs>
        {/* Widened the tube body path */}
        <path id="tubeBodyPath" d="M 15,220 L 135,220 L 115,40 L 35,40 Z" />
        <clipPath id="tubeBodyClip">
          <use href="#tubeBodyPath" />
        </clipPath>
      </defs>

      {/* Tube Opening */}
      <rect x="55" y="15" width="40" height="10" rx="2" fill="#dee2e6" />
      <ellipse cx="75" cy="15" rx="15" ry="4" fill="#F1FAEE" stroke="#adb5bd" strokeWidth="0.5" />
      <ellipse cx="75" cy="15" rx="10" ry="2" fill="#495057" />
      
      {/* Widened Neck */}
      <path d="M 45,25 L 105,25 L 115,40 L 35,40 Z" fill="#dee2e6" />
      {/* Body Background */}
      <use href="#tubeBodyPath" fill="#F1FAEE" />
      
      {/* Depletion Fill */}
      <g clipPath="url(#tubeBodyClip)">
        <rect
          x="15"
          y="40"
          width="120" // Adjusted width to cover the new wider body
          height="180" // full height of body from y=40 to y=220
          fill="#dee2e6" // "empty" color, same as the neck
          style={{
            transform: `scaleY(${depletionPercentage / 100})`,
            transformOrigin: 'bottom',
            transition: 'transform 300ms ease-in-out',
          }}
        />
      </g>

      {/* Label (on top of everything) */}
      <text
        x="75"
        y="115"
        fontSize="24"
        fill="#457B9D"
        textAnchor="middle"
        fontFamily="'Fredoka One', cursive"
        style={{ letterSpacing: '0.05em' }}
      >
        Crema
      </text>
      <text
        x="75"
        y="145"
        fontSize="24"
        fill="#457B9D"
        textAnchor="middle"
        fontFamily="'Fredoka One', cursive"
        style={{ letterSpacing: '0.05em' }}
      >
        dental
      </text>
    </svg>
  );
};


const ToothpasteTube: React.FC<ToothpasteTubeProps> = ({ clicks, maxClicks, onSqueeze, isSqueezing, disabled }) => {
  const depletionPercentage = (clicks / maxClicks) * 100;

  return (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-36 sm:w-48 md:w-56 lg:w-64 z-10">
      <button
        onClick={onSqueeze}
        disabled={disabled}
        className={`relative group transition-transform duration-200 ease-out focus:outline-none ${isSqueezing ? 'transform scale-95' : 'transform scale-100'} ${!disabled ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed'}`}
        aria-label="Squeeze toothpaste tube"
      >
        <ToothpasteSVG depletionPercentage={depletionPercentage} />
      </button>
    </div>
  );
};

export default ToothpasteTube;

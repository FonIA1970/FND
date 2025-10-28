import React, { useEffect, useState } from 'react';

interface ToothpasteSplatProps {
  x: number;
  y: number;
  rotation: number;
  scale: number;
  onAppear: () => void;
}

const ToothpasteSplat: React.FC<ToothpasteSplatProps> = ({ x, y, rotation, scale, onAppear }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
      onAppear();
    }, 50); // Small delay to ensure animation triggers
    return () => clearTimeout(timer);
  }, [onAppear]);

  return (
    <div
      className="absolute w-14 h-14 md:w-20 md:h-20 z-10"
      style={{
        top: `${y}%`,
        left: `${x}%`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${visible ? scale : 0})`,
        opacity: visible ? 1 : 0,
        transition: 'transform 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 200ms ease-out',
      }}
    >
      <div 
        className="w-full h-full bg-white rounded-full opacity-90 shadow-lg"
        style={{
          // Creates an organic, non-perfect circle shape
          borderRadius: '49% 51% 70% 30% / 30% 41% 59% 70%'
        }}
      />
    </div>
  );
};

export default ToothpasteSplat;
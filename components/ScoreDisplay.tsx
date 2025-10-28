import React, { useState, useEffect, useRef } from 'react';

interface ScoreDisplayProps {
  score: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
    const [animate, setAnimate] = useState(false);
    const prevScoreRef = useRef<number>(score);

    useEffect(() => {
        if (score > prevScoreRef.current) {
            setAnimate(true);
            const timer = setTimeout(() => setAnimate(false), 300);
            return () => clearTimeout(timer);
        }
        prevScoreRef.current = score;
    }, [score]);

  return (
    <div className="absolute top-4 left-4 z-30 p-3 bg-white/20 rounded-lg text-white backdrop-blur-sm shadow-lg">
      <span className="text-xl md:text-2xl font-bold tracking-wider" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.4)'}}>
        Puntuación:
      </span>
      <span
        className={`inline-block text-2xl md:text-3xl font-bold ml-2 transition-transform duration-300 ease-out ${animate ? 'transform scale-125' : 'transform scale-100'}`}
        style={{textShadow: '2px 2px 4px #457B9D'}}
      >
        {score}
      </span>
    </div>
  );
};

export default ScoreDisplay;

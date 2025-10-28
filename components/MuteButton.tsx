import React from 'react';

interface MuteButtonProps {
  isMuted: boolean;
  onToggle: () => void;
}

const UnmutedIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
  </svg>
);

const MutedIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15zM17 17l-6-6m0 0l-6-6m6 6l6-6m-6 6l6 6" />
  </svg>
);


const MuteButton: React.FC<MuteButtonProps> = ({ isMuted, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="absolute top-4 right-4 z-30 p-3 bg-white/20 rounded-full text-white backdrop-blur-sm hover:bg-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors"
      aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
    >
      {isMuted ? <MutedIcon /> : <UnmutedIcon />}
    </button>
  );
};

export default MuteButton;

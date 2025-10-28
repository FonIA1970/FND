import React from 'react';

interface FinalMessageScreenProps {
  onRestart: () => void;
}

const FinalMessageScreen: React.FC<FinalMessageScreenProps> = ({ onRestart }) => {
  const message = "Tus mensajes y acciones en internet son como esta crema dental. Una vez hecho es muy difícil volver atrás y deja huella.".split(' ');
  return (
    <div className="absolute inset-0 bg-black/75 backdrop-blur-md flex flex-col items-center justify-center text-center z-50 p-8">
      <div className="max-w-3xl">
        <div className="flex flex-wrap justify-center gap-x-2 md:gap-x-3 text-2xl md:text-4xl lg:text-5xl text-white leading-relaxed font-bold" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}>
          {message.map((word, index) => (
            <span
              key={index}
              className="inline-block"
              style={{
                animation: `fadeInUp 0.5s ${index * 60}ms ease-out forwards`,
                opacity: 0,
              }}
            >
              {word}
            </span>
          ))}
        </div>
        <button
          onClick={onRestart}
          className="mt-12 px-8 py-4 bg-white text-[#E63946] font-bold text-2xl rounded-full shadow-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300"
        >
          Jugar de nuevo
        </button>
      </div>
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default FinalMessageScreen;

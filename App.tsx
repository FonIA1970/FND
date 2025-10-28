import React, { useState, useCallback, useMemo, useEffect } from 'react';
import ToothpasteTube from './components/ToothpasteTube';
import ToothpasteSplat from './components/ToothpasteSplat';
import MuteButton from './components/MuteButton';
import Target from './components/Target';
import FinalMessageScreen from './components/FinalMessageScreen';

interface Splat {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

const MAX_CLICKS = 10;

// Sound files
const SQUEEZE_SOUND_URL = 'https://storage.googleapis.com/aai-web-samples/sound-effects/squeeze.mp3';
const SPLAT_SOUND_URL = 'https://storage.googleapis.com/aai-web-samples/sound-effects/splat.mp3';


const App: React.FC = () => {
  const [clicks, setClicks] = useState(0);
  const [splats, setSplats] = useState<Splat[]>([]);
  const [isSqueezing, setIsSqueezing] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showFinalScreen, setShowFinalScreen] = useState(false);

  const squeezeSound = useMemo(() => new Audio(SQUEEZE_SOUND_URL), []);
  const splatSound = useMemo(() => new Audio(SPLAT_SOUND_URL), []);

  const playSound = useCallback((audio: HTMLAudioElement) => {
    if (isMuted) return;
    audio.currentTime = 0;
    audio.play().catch(e => console.error("Error playing sound:", e));
  }, [isMuted]);

  const handleSqueeze = useCallback(() => {
    if (clicks >= MAX_CLICKS) return;
    
    playSound(squeezeSound);
    setIsSqueezing(true);
    setTimeout(() => setIsSqueezing(false), 200);

    setClicks(prevClicks => prevClicks + 1);
    
    const newSplat = {
      id: Date.now(),
      x: 10 + Math.random() * 80, // Random x position between 10% and 90%
      y: 10 + Math.random() * 80, // Random y position between 10% and 90%
      rotation: Math.random() * 360,
      scale: 0.8 + Math.random() * 0.4, // Random scale between 0.8 and 1.2
    };
    
    setSplats(prevSplats => [
      ...prevSplats,
      newSplat
    ]);
  }, [clicks, squeezeSound, playSound]);

  const handleSplatAppear = useCallback(() => {
    playSound(splatSound);
  }, [splatSound, playSound]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const handleRestart = useCallback(() => {
    setClicks(0);
    setSplats([]);
    setShowFinalScreen(false);
  }, []);

  const isTubeEmpty = clicks >= MAX_CLICKS;

  useEffect(() => {
    if (isTubeEmpty) {
      // After the tube is empty, wait a moment before showing the final message
      const timer = setTimeout(() => {
        setShowFinalScreen(true);
      }, 4000); // 4-second delay
      return () => clearTimeout(timer);
    }
  }, [isTubeEmpty]);

  const finalMessage = "¿Puedes volver a meter la crema en el bote?".split(' ');

  return (
    <main
      className="relative w-screen h-screen overflow-hidden flex items-center justify-center select-none"
      style={{
        background: `repeating-linear-gradient(
          90deg,
          #A8DADC 0px, #A8DADC 120px,
          #FADADD 120px, #FADADD 200px,
          #F1FAEE 200px, #F1FAEE 320px,
          #D4E4F0 320px, #D4E4F0 400px
        )`,
      }}
    >
      <MuteButton isMuted={isMuted} onToggle={toggleMute} />
      <div className="relative w-full h-full">
        <Target />
        {splats.map(splat => (
          <ToothpasteSplat
            key={splat.id}
            x={splat.x}
            y={splat.y}
            rotation={splat.rotation}
            scale={splat.scale}
            onAppear={handleSplatAppear}
          />
        ))}

        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 text-center w-full px-4">
          {!isTubeEmpty && (
            <h1 className="text-4xl md:text-6xl text-white" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.4)'}}>
              ¡Aprieta el tubo!
            </h1>
          )}
          {isTubeEmpty && !showFinalScreen && (
            <div className="flex flex-wrap justify-center gap-x-2 md:gap-x-4 text-3xl md:text-5xl lg:text-6xl text-white font-bold p-4">
              {finalMessage.map((word, index) => (
                <span
                  key={index}
                  className="block animate-bounce"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    textShadow: '3px 3px 6px #e63946',
                  }}
                >
                  {word}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {!showFinalScreen && (
            <ToothpasteTube 
              clicks={clicks}
              maxClicks={MAX_CLICKS}
              onSqueeze={handleSqueeze}
              isSqueezing={isSqueezing}
              disabled={isTubeEmpty}
            />
        )}
      </div>
      {showFinalScreen && <FinalMessageScreen onRestart={handleRestart} />}
    </main>
  );
}

export default App;
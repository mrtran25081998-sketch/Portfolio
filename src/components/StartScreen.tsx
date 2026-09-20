import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { soundManager } from '../audio/soundManager';

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Smooth initial loading progress bar
    const interval = setInterval(() => {
      setLoadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReady(true);
          return 100;
        }
        return prev + Math.floor(Math.random() * 20 + 14);
      });
    }, 110);

    return () => clearInterval(interval);
  }, []);

  // Keyboard shortcut to start game with Enter or Space
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isReady && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        handleStartGame();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isReady]);

  const handleStartGame = () => {
    soundManager.init();
    soundManager.playInteractChime();
    onStart();
  };

  return (
    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-b from-[#180d07]/75 via-[#130b06]/55 to-[#0b0604]/85 backdrop-blur-[2px] select-none text-[#FFF4D6] font-sans animate-fade-in overflow-hidden">
      {/* Center Hero Block */}
      <div className="flex flex-col items-center text-center max-w-xl px-4 py-8 w-full">
        {/* Voxel RPG 3D Title */}
        <div className="relative inline-block">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black font-pixel tracking-widest text-[#FFFDF7] drop-shadow-[0_4px_0_#A86800] [text-shadow:_0_6px_0_#7A3F1F,_0_10px_0_#331508,_0_14px_18px_rgba(0,0,0,0.85)]">
            GTRAN
          </h1>
          <div className="absolute -top-2 -right-3 sm:-right-5 px-1.5 py-0.5 rounded-[3px] bg-[#F4C542] border border-[#7A3F1F] text-[#2D1B12] font-pixel text-[10px] sm:text-xs font-bold shadow-[0_2px_0_#7A3F1F]">
            LV.8+
          </div>
        </div>

        {/* Character Class Plaque */}
        <div className="mt-3.5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[5px] bg-[#2E150B]/90 border-2 border-[#7A3F1F] shadow-[0_3px_0_#1A0B05]">
          <span className="w-2 h-2 rounded-[1px] bg-[#4F9D18] animate-pulse" />
          <span className="font-pixel text-xs sm:text-sm font-bold text-[#F4C542] tracking-wide">
            PRODUCT DESIGNER
          </span>
          <span className="text-[#8C5E3C] text-xs">•</span>
          <span className="text-xs font-pixel text-[#DFC9A2]">
            8+ NĂM KINH NGHIỆM
          </span>
        </div>

        {/* Start Button & Progress Bar Area */}
        <div className="mt-8 flex flex-col items-center w-full max-w-sm">
          {!isReady ? (
            <div className="w-full flex flex-col items-center gap-2">
              {/* Voxel Style Loading Bar */}
              <div className="w-full h-5 rounded-[4px] bg-[#2E150B] border-2 border-[#7A3F1F] p-0.5 shadow-[0_3px_0_#1A0B05] overflow-hidden">
                <div
                  className="h-full rounded-[2px] bg-gradient-to-r from-[#F4C542] via-[#63B722] to-[#4F9D18] transition-all duration-150 relative"
                  style={{ width: `${loadProgress}%` }}
                >
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_6px,rgba(0,0,0,0.15)_6px,rgba(0,0,0,0.15)_12px)]" />
                </div>
              </div>
              <span className="text-xs font-pixel text-[#F4C542] tracking-wide">
                ĐANG NẠP THẾ GIỚI VOXEL... {loadProgress}%
              </span>
            </div>
          ) : (
            <button
              id="start-exploring-btn"
              onClick={handleStartGame}
              className="group relative w-full flex items-center justify-center gap-3 bg-[#4F9D18] hover:bg-[#5EB620] active:bg-[#438814] text-[#FFF4D6] font-pixel text-base sm:text-lg font-bold px-8 py-3.5 rounded-[8px] border-3 border-[#2F5E0F] shadow-[0_6px_0_#1E400A,0_10px_20px_rgba(0,0,0,0.5)] active:shadow-none active:translate-y-1.5 transition-all cursor-pointer"
            >
              <Play className="w-5 h-5 fill-[#FFF4D6] text-[#FFF4D6] group-hover:scale-110 transition-transform shrink-0" />
              <span>BẮT ĐẦU KHÁM PHÁ</span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] rounded bg-[#2F5E0F]/80 text-[#DFC9A2] font-mono ml-1">
                Enter ↵
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};


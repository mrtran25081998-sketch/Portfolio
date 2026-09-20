import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, Sparkles, Footprints } from 'lucide-react';

interface MobileControlsProps {
  onMove: (x: number, y: number) => void;
  onRunChange: (isRunning: boolean) => void;
  onJump: () => void;
  onInteract: () => void;
  isNearZone: boolean;
}

export const MobileControls: React.FC<MobileControlsProps> = ({
  onMove,
  onRunChange,
  onJump,
  onInteract,
  isNearZone
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Joystick touch state
  const joystickBaseRef = useRef<HTMLDivElement>(null);
  const joystickThumbRef = useRef<HTMLDivElement>(null);
  const touchIdRef = useRef<number | null>(null);
  const centerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    // Detect touch device or mobile screen
    const checkTouch = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth <= 1024;
      setIsTouchDevice(hasTouch);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (touchIdRef.current !== null) return;
    const touch = e.changedTouches[0];
    touchIdRef.current = touch.identifier;

    if (joystickBaseRef.current) {
      const rect = joystickBaseRef.current.getBoundingClientRect();
      centerRef.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
      updateThumb(touch.clientX, touch.clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchIdRef.current === null) return;
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      if (touch.identifier === touchIdRef.current) {
        updateThumb(touch.clientX, touch.clientY);
        break;
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchIdRef.current === null) return;
    for (let i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === touchIdRef.current) {
        touchIdRef.current = null;
        if (joystickThumbRef.current) {
          joystickThumbRef.current.style.transform = `translate(0px, 0px)`;
        }
        onMove(0, 0);
        break;
      }
    }
  };

  const updateThumb = (clientX: number, clientY: number) => {
    const maxRadius = 45;
    const dx = clientX - centerRef.current.x;
    const dy = clientY - centerRef.current.y;
    const dist = Math.hypot(dx, dy);

    let clampedX = dx;
    let clampedY = dy;

    if (dist > maxRadius) {
      clampedX = (dx / dist) * maxRadius;
      clampedY = (dy / dist) * maxRadius;
    }

    if (joystickThumbRef.current) {
      joystickThumbRef.current.style.transform = `translate(${clampedX}px, ${clampedY}px)`;
    }

    // Normalized outputs between -1 and 1
    onMove(clampedX / maxRadius, clampedY / maxRadius);
  };

  const toggleRun = () => {
    const next = !isRunning;
    setIsRunning(next);
    onRunChange(next);
  };

  if (!isTouchDevice) return null;

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-between items-end p-4 sm:p-5 select-none font-pixel">
      {/* Left: Virtual Joystick - Voxel Style */}
      <div
        ref={joystickBaseRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        className="pointer-events-auto relative w-28 h-28 rounded-full bg-[#3B1D0F]/85 backdrop-blur-sm border-2 border-[#7A3F1F] flex items-center justify-center shadow-[0_4px_0_#2E150B] active:border-[#F4C542] touch-none"
      >
        <div className="absolute inset-2 rounded-full border border-dashed border-[#7A3F1F]/60 pointer-events-none" />
        <div
          ref={joystickThumbRef}
          className="w-12 h-12 rounded-full bg-[#F4C542] border-2 border-[#4A2414] shadow-[0_2px_0_#4A2414] pointer-events-none flex items-center justify-center"
        >
          <div className="w-3.5 h-3.5 rounded-full bg-[#FFECC2]" />
        </div>
      </div>

      {/* Right: Jump, Run & Action Buttons - Voxel Style */}
      <div className="pointer-events-auto flex flex-col items-end gap-2.5">
        {/* Run Toggle Button */}
        <button
          onClick={toggleRun}
          className={`w-11 h-11 rounded-[6px] border-2 flex items-center justify-center shadow-[0_3px_0_#2E150B] transition-all active:translate-y-0.5 ${
            isRunning
              ? 'bg-[#F4C542] border-[#4A2414] text-[#2D1B12]'
              : 'bg-[#3B1D0F]/90 border-[#7A3F1F] text-[#D9D2BF]'
          }`}
          title="Chạy nhanh (Shift)"
        >
          <Footprints className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          {/* Jump Button */}
          <button
            onTouchStart={(e) => {
              e.preventDefault();
              onJump();
            }}
            onClick={onJump}
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-[8px] bg-[#B86428] hover:bg-[#D47936] active:bg-[#964E1C] border-2 border-[#4A2414] text-[#FFF4D6] shadow-[0_3px_0_#2E150B] active:shadow-none active:translate-y-0.5 flex flex-col items-center justify-center"
            title="Nhảy (Space)"
          >
            <ArrowUp className="w-5 h-5 stroke-[2.5]" />
            <span className="text-[9px] font-bold uppercase text-[#FFF4D6]">Nhảy</span>
          </button>

          {/* Action / Interact Button (E) */}
          <button
            onTouchStart={(e) => {
              e.preventDefault();
              onInteract();
            }}
            onClick={onInteract}
            className={`w-16 h-16 rounded-[8px] border-2 flex flex-col items-center justify-center shadow-[0_4px_0_#2E150B] active:shadow-none active:translate-y-0.5 transition-all ${
              isNearZone
                ? 'bg-[#F4C542] border-[#4A2414] text-[#2D1B12] animate-bounce'
                : 'bg-[#3B1D0F]/90 border-[#7A3F1F] text-[#D9D2BF]'
            }`}
            title="Tương tác (E)"
          >
            <Sparkles className={`w-5 h-5 ${isNearZone ? 'text-[#2D1B12]' : 'text-[#F4C542]'}`} />
            <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5">
              Khám phá
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

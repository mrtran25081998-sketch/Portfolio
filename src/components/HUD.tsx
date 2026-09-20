import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, HelpCircle, X } from 'lucide-react';
import { ZoneId } from '../types';
import { soundManager } from '../audio/soundManager';

interface HUDProps {
  nearZone?: ZoneId | null;
  exploredZones: Record<ZoneId, boolean>;
  onOpenZone: (zoneId: ZoneId) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onShowHelp: () => void;
}

export const HUD: React.FC<HUDProps> = ({
  isMuted,
  onToggleMute,
  onShowHelp
}) => {
  const [showBottomHints, setShowBottomHints] = useState(true);

  // Auto-hide control hints after 9 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBottomHints(false);
    }, 9000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-3 sm:p-5 select-none">
      {/* Top Header Row - Đồng bộ hoàn toàn với phong cách Voxel RPG UI */}
      <div className="flex items-start justify-between w-full gap-2">
        {/* Top Left: Creator Identity Voxel Plaque (Chỉ có Avatar đồng bộ About Me & GTran) */}
        <div className="pointer-events-auto flex items-center gap-2.5 sm:gap-3 bg-[#3B1D0F]/90 backdrop-blur-sm border-2 border-[#7A3F1F] px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-[8px] shadow-[0_4px_0_#2E150B]">
          {/* Voxel Avatar Frame - Đồng bộ chính xác với avatar trong About Me */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[5px] bg-[#E7D6B4] border-2 border-[#7A3F1F] shadow-[0_2px_0_#4A2414] overflow-hidden flex flex-col items-center justify-end relative shrink-0 p-0.5">
            {/* Background block grid */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #4A2414 1px, transparent 1px), linear-gradient(to bottom, #4A2414 1px, transparent 1px)',
                backgroundSize: '4px 4px'
              }}
            />

            {/* Voxel Character Silhouette đồng bộ với About Me */}
            <div className="relative z-10 flex flex-col items-center translate-y-0.5">
              {/* Hair block */}
              <div className="w-5 h-2.5 bg-[#1E293B] rounded-t-[2px] border border-[#0F172A]" />
              {/* Face block with eyes */}
              <div className="w-4 h-3 bg-[#FCD34D] border-x border-b border-[#D97706] flex items-center justify-around px-0.5 relative -mt-0.5">
                <div className="w-0.5 h-0.5 bg-[#1E293B] rounded-[0.5px]" />
                <div className="w-0.5 h-0.5 bg-[#1E293B] rounded-[0.5px]" />
              </div>
              {/* Shirt block (White & Black tie) */}
              <div className="w-6 h-2 bg-white border border-[#CBD5E1] -mt-0.5 flex justify-center items-center">
                <div className="w-1.5 h-full bg-[#1E293B]" />
              </div>
            </div>

            {/* Little decorative green voxel dot */}
            <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-[#4F9D18] border border-[#2F5E0F]" />
          </div>

          {/* Tên GTran */}
          <div className="flex items-center gap-1.5 pr-1">
            <span className="font-pixel text-xs sm:text-sm font-bold text-[#F4C542] drop-shadow-[0_1px_0_#2E150B] tracking-wide leading-none">
              GTran
            </span>
            <span
              className="inline-block w-2 h-2 rounded-[2px] bg-[#4F9D18] border border-[#264D0B] shadow-[0_0_6px_#4F9D18] animate-pulse"
              title="Sẵn sàng cho dự án mới"
            />
          </div>
        </div>

        {/* Top Right: Chỉ giữ lại nút Âm thanh và Trợ giúp */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-2.5">
          {/* Sound Toggle Button - Voxel Style */}
          <button
            id="audio-toggle-btn"
            onClick={() => {
              soundManager.playButtonBeep();
              onToggleMute();
            }}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-[6px] bg-[#B86428] hover:bg-[#D47936] active:bg-[#964E1C] border-2 border-[#4A2414] text-[#FFF4D6] flex items-center justify-center shadow-[0_3px_0_#2E150B] active:shadow-none active:translate-y-[2px] transition-transform cursor-pointer shrink-0"
            title={isMuted ? 'Bật âm thanh (M)' : 'Tắt âm thanh (M)'}
            aria-label="Bật hoặc tắt âm thanh"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-[#FFAAA6]" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#FFF4D6]" />
            )}
          </button>

          {/* Help Button - Voxel Style */}
          <button
            id="help-toggle-btn"
            onClick={() => {
              soundManager.playButtonBeep();
              onShowHelp();
            }}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-[6px] bg-[#B86428] hover:bg-[#D47936] active:bg-[#964E1C] border-2 border-[#4A2414] text-[#FFF4D6] flex items-center justify-center shadow-[0_3px_0_#2E150B] active:shadow-none active:translate-y-[2px] transition-transform cursor-pointer shrink-0"
            title="Hướng dẫn điều khiển"
            aria-label="Xem hướng dẫn điều khiển"
          >
            <HelpCircle className="w-4 h-4 text-[#FFF4D6]" />
          </button>
        </div>
      </div>

      {/* Bottom Row: Control Key Hints (auto-fades, re-toggleable) */}
      <div className="flex items-end justify-between w-full">
        {showBottomHints ? (
          <div className="pointer-events-auto flex items-center gap-2 sm:gap-3.5 bg-[#3B1D0F]/90 backdrop-blur-sm border-2 border-[#7A3F1F] px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-[8px] font-pixel text-xs text-[#FFF4D6] shadow-[0_4px_0_#2E150B] max-w-full overflow-x-auto">
            <div className="flex items-center gap-1 whitespace-nowrap">
              <kbd className="px-1.5 py-0.5 rounded-[3px] bg-[#22120A] border border-[#7A3F1F] font-pixel text-[10px] text-[#F4C542] shadow-[0_2px_0_#150A05]">W</kbd>
              <kbd className="px-1.5 py-0.5 rounded-[3px] bg-[#22120A] border border-[#7A3F1F] font-pixel text-[10px] text-[#F4C542] shadow-[0_2px_0_#150A05]">A</kbd>
              <kbd className="px-1.5 py-0.5 rounded-[3px] bg-[#22120A] border border-[#7A3F1F] font-pixel text-[10px] text-[#F4C542] shadow-[0_2px_0_#150A05]">S</kbd>
              <kbd className="px-1.5 py-0.5 rounded-[3px] bg-[#22120A] border border-[#7A3F1F] font-pixel text-[10px] text-[#F4C542] shadow-[0_2px_0_#150A05]">D</kbd>
              <span className="text-[#D9D2BF]">/</span>
              <kbd className="px-1.5 py-0.5 rounded-[3px] bg-[#22120A] border border-[#7A3F1F] font-pixel text-[10px] text-[#F4C542] shadow-[0_2px_0_#150A05]">Click</kbd>
              <span className="ml-1 text-[#D9D2BF]">Di chuyển</span>
            </div>
            <span className="text-[#7A3F1F]">•</span>
            <div className="flex items-center gap-1 whitespace-nowrap">
              <kbd className="px-1.5 py-0.5 rounded-[3px] bg-[#22120A] border border-[#7A3F1F] font-pixel text-[10px] text-[#F4C542] shadow-[0_2px_0_#150A05]">Shift</kbd>
              <span className="ml-1 text-[#D9D2BF]">Chạy</span>
            </div>
            <span className="text-[#7A3F1F]">•</span>
            <div className="flex items-center gap-1 whitespace-nowrap">
              <kbd className="px-1.5 py-0.5 rounded-[3px] bg-[#22120A] border border-[#7A3F1F] font-pixel text-[10px] text-[#F4C542] shadow-[0_2px_0_#150A05]">Space</kbd>
              <span className="text-[#D9D2BF]">/</span>
              <kbd className="px-1.5 py-0.5 rounded-[3px] bg-[#22120A] border border-[#7A3F1F] font-pixel text-[10px] text-[#F4C542] shadow-[0_2px_0_#150A05]">Click</kbd>
              <span className="ml-1 text-[#D9D2BF]">Xem chi tiết</span>
            </div>
            <span className="text-[#7A3F1F]">•</span>
            <div className="flex items-center gap-1 whitespace-nowrap">
              <kbd className="px-1.5 py-0.5 rounded-[3px] bg-[#22120A] border border-[#7A3F1F] font-pixel text-[10px] text-[#F4C542] shadow-[0_2px_0_#150A05]">E</kbd>
              <span className="ml-1 text-[#D9D2BF]">Tương tác</span>
            </div>
            <span className="text-[#7A3F1F]">•</span>
            <span className="whitespace-nowrap hidden sm:inline text-[#D9D2BF]">Kéo chuột xoay camera</span>
            <button
              onClick={() => {
                soundManager.playButtonBeep();
                setShowBottomHints(false);
              }}
              className="ml-2 p-1 text-[#D9D2BF] hover:text-[#FFF4D6] rounded-[4px] bg-[#2E150B] hover:bg-[#4A2414] transition-colors cursor-pointer"
              title="Ẩn gợi ý"
              aria-label="Ẩn thanh gợi ý phím"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              soundManager.playButtonBeep();
              setShowBottomHints(true);
            }}
            className="pointer-events-auto px-3 py-1.5 rounded-[6px] bg-[#3B1D0F]/90 backdrop-blur-sm border-2 border-[#7A3F1F] font-pixel text-xs text-[#F4C542] hover:text-[#FFF4D6] transition-all shadow-[0_3px_0_#2E150B] active:translate-y-0.5 cursor-pointer"
          >
            ⌨ Phím điều khiển
          </button>
        )}

        {/* Dog companion status indicator */}
        <div className="pointer-events-auto hidden md:flex items-center gap-2 bg-[#3B1D0F]/90 backdrop-blur-sm border-2 border-[#7A3F1F] px-3 py-1.5 rounded-[8px] font-pixel text-xs text-[#FFF4D6] shadow-[0_4px_0_#2E150B]">
          <span className="text-sm">🐕</span>
          <span>Bạn đồng hành: <strong className="text-[#F4C542]">Bông</strong></span>
        </div>
      </div>
    </div>
  );
};

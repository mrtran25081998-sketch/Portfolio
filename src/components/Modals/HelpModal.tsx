import React from 'react';
import { Keyboard, Smartphone, Compass } from 'lucide-react';
import { GameModal, GameModalBody, VoxelButton } from './common/GameModalComponents';

interface HelpModalProps {
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ onClose }) => {
  return (
    <GameModal
      areaKey="help"
      onClose={onClose}
      maxWidthClass="max-w-[560px]"
      titleOverride="HƯỚNG DẪN ĐIỀU KHIỂN"
      hideExploredBadge
      badgeOverride={
        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] bg-[#3B1D0F] border border-[#7A3F1F] text-[#F4C542] font-pixel text-[10px] sm:text-[11px] font-bold tracking-wider uppercase shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
          <span className="w-1.5 h-1.5 rounded-[1px] bg-[#F4C542]" />
          <span>HƯỚNG DẪN CHƠI</span>
        </div>
      }
    >
      <GameModalBody className="p-4 sm:p-6 space-y-4">
        {/* Desktop Controls */}
        <div className="p-3.5 sm:p-4 rounded-[8px] bg-[#FFFDF7] border-2 border-[#CBB892] shadow-[0_3px_0_#A89571] space-y-3">
          <div className="font-pixel text-xs font-bold text-[#7A3F1F] uppercase tracking-wider flex items-center gap-2">
            <Keyboard className="w-4 h-4 text-[#B86428]" />
            Bàn phím & Chuột (Máy tính)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#523C2B]">
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-0.5 rounded-[4px] bg-[#FFF4D6] border border-[#CBB892] font-pixel text-[10px] text-[#7A3F1F] font-bold shadow-xs">W A S D</kbd>
              <span>Di chuyển</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-0.5 rounded-[4px] bg-[#FFF4D6] border border-[#CBB892] font-pixel text-[10px] text-[#7A3F1F] font-bold shadow-xs">Click chuột</kbd>
              <span>Di chuyển đến vị trí</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-0.5 rounded-[4px] bg-[#FFF4D6] border border-[#CBB892] font-pixel text-[10px] text-[#7A3F1F] font-bold shadow-xs">Shift</kbd>
              <span>Chạy nhanh</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-0.5 rounded-[4px] bg-[#FFF4D6] border border-[#CBB892] font-pixel text-[10px] text-[#7A3F1F] font-bold shadow-xs">Space / Click</kbd>
              <span>Xem chi tiết phần</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-0.5 rounded-[4px] bg-[#FFF4D6] border border-[#CBB892] font-pixel text-[10px] text-[#7A3F1F] font-bold shadow-xs">E</kbd>
              <span>Tương tác</span>
            </div>
            <div className="flex items-center gap-2 sm:col-span-2 pt-1 border-t border-[#E8DCC4]/60">
              <span className="text-base leading-none">🖱️</span>
              <span>Click chuột vào biển hiệu/công trình để mở xem • Click vào đất để đi tới • Giữ và kéo chuột để xoay camera</span>
            </div>
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="p-3.5 sm:p-4 rounded-[8px] bg-[#FFFDF7] border-2 border-[#CBB892] shadow-[0_3px_0_#A89571] space-y-2">
          <div className="font-pixel text-xs font-bold text-[#176B73] uppercase tracking-wider flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-[#176B73]" />
            Cảm ứng (Điện thoại & Tablet)
          </div>
          <div className="space-y-1.5 text-xs text-[#523C2B]">
            <p>• Dùng <strong>Cần điều khiển ảo (Joystick)</strong> ở góc trái để di chuyển.</p>
            <p>• Bấm các nút <strong>Nhảy</strong> và <strong>Tương tác (E)</strong> ở góc phải màn hình.</p>
          </div>
        </div>

        {/* Dog companion tip */}
        <div className="p-3 rounded-[8px] bg-[#FFF4D6] border-2 border-[#DFC9A2] text-xs text-[#6B513C] flex items-center gap-3">
          <span className="text-2xl">🐕</span>
          <div>
            <strong className="text-[#7A3F1F] block font-pixel font-bold text-xs">Bạn đồng hành: Bông</strong>
            <span>Chú chó voxel trung thành luôn chạy theo và canh giữ cho bạn trên hành trình khám phá!</span>
          </div>
        </div>

        {/* Close Button */}
        <div className="pt-1">
          <VoxelButton
            variant="primary"
            size="md"
            fullWidth
            onClick={onClose}
          >
            ĐÃ HIỂU, TIẾP TỤC KHÁM PHÁ!
          </VoxelButton>
        </div>
      </GameModalBody>
    </GameModal>
  );
};

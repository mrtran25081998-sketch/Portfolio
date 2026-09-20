import React from 'react';
import {
  FileText,
  ArrowUpRight,
  Download,
  CheckCircle2,
  Award,
  Briefcase,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { DROPBOX_CV_URL } from '../../data/portfolioData';
import {
  GameModal,
  GameModalBody,
  VoxelButton,
  VoxelCard,
  ModalSection
} from './common/GameModalComponents';

interface MyCVModalProps {
  onClose: () => void;
  onGoToContact: () => void;
}

export const MyCVModal: React.FC<MyCVModalProps> = ({ onClose, onGoToContact }) => {
  return (
    <GameModal areaKey="cx" onClose={onClose} maxWidthClass="max-w-[880px]">
      <GameModalBody>
        {/* Main CV Hero Box */}
        <div className="p-5 sm:p-7 rounded-[8px] bg-[#FFFDF7] border-2 border-[#CBB892] shadow-[0_4px_0_#A89571] space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="px-2.5 py-1 rounded-[4px] bg-[#E8F5E9] border border-[#A5D6A7] text-[#2E7D32] font-pixel text-xs font-bold uppercase">
                RESUME • CURRICULUM VITAE
              </span>
              <h1 className="font-pixel text-2xl sm:text-3xl font-bold text-[#2D1B12] mt-2">
                CV-Gtran-Product-Designer.pdf
              </h1>
              <p className="text-xs sm:text-sm text-[#6B513C]">
                Cập nhật mới nhất • Định dạng PDF chuẩn quốc tế
              </p>
            </div>

            <div className="w-16 h-16 rounded-[8px] bg-[#FFF4D6] border-2 border-[#7A3F1F] flex items-center justify-center text-[#7A3F1F] shadow-[0_3px_0_#7A3F1F] shrink-0">
              <FileText className="w-8 h-8" />
            </div>
          </div>

          {/* Direct Dropbox Open Button & Contact Button */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <a
              href={DROPBOX_CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-5 py-3 rounded-[6px] bg-[#F4C542] hover:bg-[#FED45B] text-[#2D1B12] font-bold text-sm sm:text-base border-2 border-[#4A2414] shadow-[0_4px_0_#4A2414] active:shadow-none active:translate-y-1 flex items-center justify-center gap-2.5 transition-all select-none cursor-pointer"
            >
              <Download className="w-5 h-5" />
              <span>Mở & Tải CV trên Dropbox (PDF)</span>
              <ArrowUpRight className="w-5 h-5" />
            </a>

            <VoxelButton
              variant="secondary"
              size="lg"
              onClick={onGoToContact}
              icon={<ExternalLink className="w-4 h-4 text-[#7A3F1F]" />}
            >
              Liên hệ trao đổi
            </VoxelButton>
          </div>
        </div>

        {/* Quick Summary Highlights from the CV */}
        <ModalSection
          title="Tóm tắt hồ sơ năng lực trong CV"
          subtitle="Tổng quan kinh nghiệm và các sản phẩm đã thực hiện"
          badge="TỔNG QUAN"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <VoxelCard variant="parchment" className="p-4 space-y-2.5">
              <div className="flex items-center gap-2 text-[#7A3F1F] font-pixel font-bold text-sm">
                <Briefcase className="w-4 h-4 text-[#B86428]" />
                <span>Kinh nghiệm làm việc</span>
              </div>
              <ul className="text-xs text-[#4A3326] space-y-1.5 list-disc pl-4">
                <li>8+ năm kinh nghiệm trong ngành Product Design & UI/UX</li>
                <li>Ngân hàng TMCP Quân đội (MB) - Product Designer</li>
                <li>Ngân hàng TMCP Kiên Long - Product Designer</li>
                <li>Công ty AgileTech - UI/UX Designer</li>
              </ul>
            </VoxelCard>

            <VoxelCard variant="parchment" className="p-4 space-y-2.5">
              <div className="flex items-center gap-2 text-[#2E7D32] font-pixel font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>Dự án & Năng lực chính</span>
              </div>
              <ul className="text-xs text-[#4A3326] space-y-1.5 list-disc pl-4">
                <li>BIZ MBBank 2.0 (Cấp hạn mức TDH cho Uper & CIB)</li>
                <li>Mở tài khoản số & eKYC Doanh nghiệp KienlongBank</li>
                <li>Đa nền tảng Web App & Mobile App ngân hàng số</li>
                <li>Xây dựng hệ thống Design System & UX Writing</li>
              </ul>
            </VoxelCard>
          </div>
        </ModalSection>

        {/* Direct Dropbox link snippet */}
        <div className="p-3.5 rounded-[6px] bg-[#FFFDF7] border border-[#CBB892] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-[#6B513C] truncate max-w-md font-mono">
            Link Dropbox: {DROPBOX_CV_URL}
          </span>
          <a
            href={DROPBOX_CV_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-pixel text-[#176B73] font-bold hover:underline flex items-center gap-1 shrink-0"
          >
            Mở tab mới <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </GameModalBody>
    </GameModal>
  );
};

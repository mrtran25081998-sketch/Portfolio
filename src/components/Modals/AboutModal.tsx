import React from 'react';
import {
  FileText,
  ArrowUpRight,
  CheckCircle2,
  Layers,
  Compass,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Briefcase
} from 'lucide-react';
import { aboutData, DROPBOX_CV_URL } from '../../data/portfolioData';
import {
  GameModal,
  GameModalBody,
  VoxelButton,
  VoxelCard,
  ModalSection
} from './common/GameModalComponents';

interface AboutModalProps {
  onClose: () => void;
  onGoToContact: () => void;
  onOpenCV?: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  onClose,
  onGoToContact,
  onOpenCV
}) => {
  return (
    <GameModal areaKey="about" onClose={onClose} maxWidthClass="max-w-[960px]">
      <GameModalBody>
        {/* Intro Section: 2-column layout on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center bg-[#FFFDF7] p-5 sm:p-7 rounded-[8px] border-2 border-[#CBB892] shadow-[0_4px_0_#A89571]">
          {/* Left Column: Voxel Avatar & Experience Badge */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center text-center">
            <div className="relative group">
              {/* Voxel Portrait Frame */}
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-[8px] bg-[#E7D6B4] border-4 border-[#7A3F1F] shadow-[0_6px_0_#4A2414] overflow-hidden flex flex-col items-center justify-center relative p-2">
                {/* Background block pattern */}
                <div
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, #4A2414 1px, transparent 1px), linear-gradient(to bottom, #4A2414 1px, transparent 1px)',
                    backgroundSize: '16px 16px'
                  }}
                />

                {/* Voxel Character Silhouette / Head representation */}
                <div className="relative z-10 flex flex-col items-center">
                  {/* Hair block */}
                  <div className="w-16 h-8 bg-[#1E293B] rounded-t-[4px] border-2 border-[#0F172A] shadow-sm" />
                  {/* Face block */}
                  <div className="w-14 h-11 bg-[#FCD34D] border-x-2 border-b-2 border-[#D97706] flex items-center justify-around px-2 relative -mt-0.5">
                    {/* Eyes */}
                    <div className="w-2.5 h-2.5 bg-[#1E293B] rounded-[1px]" />
                    <div className="w-2.5 h-2.5 bg-[#1E293B] rounded-[1px]" />
                  </div>
                  {/* Shirt block (White & Black stripes) */}
                  <div className="w-20 h-10 bg-white border-2 border-[#CBD5E1] -mt-0.5 flex justify-center items-center shadow-inner">
                    <div className="w-4 h-full bg-[#1E293B]" />
                  </div>
                </div>

                {/* Little decorative floating block */}
                <div className="absolute top-2 right-2 w-3 h-3 bg-[#4F9D18] border border-[#2F5E0F] shadow-sm animate-bounce-subtle" />
                <div className="absolute bottom-2 left-2 w-3 h-3 bg-[#F4C542] border border-[#7A3F1F] shadow-sm" />
              </div>

              {/* Badge 8+ Năm Kinh Nghiệm */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-[4px] bg-[#4F9D18] border-2 border-[#2F5E0F] text-[#FFF4D6] font-pixel text-xs font-bold shadow-[0_3px_0_#23470B]">
                8+ NĂM KINH NGHIỆM
              </div>
            </div>

            <div className="mt-5 text-center">
              <div className="text-sm font-bold text-[#2D1B12] font-pixel">
                GTran • Product Designer
              </div>
              <div className="text-xs text-[#6B513C] flex items-center justify-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-[#4F9D18] animate-pulse" />
                <span>Sẵn sàng cho dự án mới</span>
              </div>
            </div>
          </div>

          {/* Right Column: Greetings & Action Buttons */}
          <div className="lg:col-span-8 space-y-4">
            <div>
              <div className="text-sm sm:text-base font-pixel font-bold text-[#4F9D18] flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-[#4F9D18]" />
                <span>{aboutData.greeting}</span>
              </div>
              <h1 className="font-pixel text-2xl sm:text-4xl font-bold text-[#2D1B12] tracking-tight leading-tight">
                {aboutData.name}
              </h1>
            </div>

            <p className="text-sm sm:text-base text-[#4A3326] leading-relaxed font-sans-body">
              {aboutData.tagline}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={DROPBOX_CV_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onOpenCV?.()}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[6px] bg-[#F4C542] hover:bg-[#FED45B] text-[#2D1B12] font-bold text-xs sm:text-sm border-2 border-[#4A2414] shadow-[0_4px_0_#4A2414] active:shadow-none active:translate-y-1 transition-all select-none cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>CV của tôi!</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <VoxelButton
                variant="secondary"
                size="md"
                onClick={onGoToContact}
                icon={<Briefcase className="w-4 h-4 text-[#7A3F1F]" />}
              >
                Liên hệ hợp tác
              </VoxelButton>
            </div>
          </div>
        </div>

        {/* Section: Core Competencies (3 Cards like Voxel Inventory Boxes) */}
        <ModalSection
          title="Năng lực của tôi!"
          hideDivider
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {/* Card 1: Product Design */}
            <VoxelCard
              variant="parchment"
              className="flex flex-col justify-between group"
            >
              <div>
                {/* Voxel Icon Box */}
                <div className="w-12 h-12 rounded-[6px] bg-[#FFF4D6] border-2 border-[#7A3F1F] flex items-center justify-center text-[#7A3F1F] mb-4 shadow-[0_3px_0_#7A3F1F] group-hover:scale-105 transition-transform">
                  <div className="grid grid-cols-2 gap-1 rotate-45">
                    <div className="w-2.5 h-2.5 bg-[#4F9D18] border border-[#2F5E0F] rounded-[1px]" />
                    <div className="w-2.5 h-2.5 bg-[#F4C542] border border-[#7A3F1F] rounded-[1px]" />
                    <div className="w-2.5 h-2.5 bg-[#176B73] border border-[#0D4449] rounded-[1px]" />
                    <div className="w-2.5 h-2.5 bg-[#B86428] border border-[#4A2414] rounded-[1px]" />
                  </div>
                </div>
                <h4 className="font-pixel text-base sm:text-lg font-bold text-[#2D1B12] mb-2">
                  {aboutData.competencies[0].title}
                </h4>
                <p className="text-xs sm:text-sm text-[#6B513C] leading-relaxed">
                  {aboutData.competencies[0].description}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#E0CFAB] flex items-center gap-2 text-xs font-pixel font-bold text-[#4F9D18]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Web, Mobile App, Tablet</span>
              </div>
            </VoxelCard>

            {/* Card 2: Product Strategy & UX */}
            <VoxelCard
              variant="parchment"
              className="flex flex-col justify-between group"
            >
              <div>
                {/* Voxel Icon Box */}
                <div className="w-12 h-12 rounded-[6px] bg-[#FFF4D6] border-2 border-[#7A3F1F] flex items-center justify-center text-[#7A3F1F] mb-4 shadow-[0_3px_0_#7A3F1F] group-hover:scale-105 transition-transform">
                  <div className="relative w-7 h-7 flex items-center justify-center">
                    <div className="absolute w-5 h-5 rounded-[2px] border-2 border-[#4F9D18] -left-0.5" />
                    <div className="absolute w-5 h-5 rounded-[2px] border-2 border-[#B86428] -right-0.5" />
                  </div>
                </div>
                <h4 className="font-pixel text-base sm:text-lg font-bold text-[#2D1B12] mb-2">
                  {aboutData.competencies[1].title}
                </h4>
                <p className="text-xs sm:text-sm text-[#6B513C] leading-relaxed">
                  {aboutData.competencies[1].description}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#E0CFAB] flex items-center gap-2 text-xs font-pixel font-bold text-[#4F9D18]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>User Research & Discovery</span>
              </div>
            </VoxelCard>

            {/* Card 3: Design System & UX Writing */}
            <VoxelCard
              variant="parchment"
              className="flex flex-col justify-between group"
            >
              <div>
                {/* Voxel Icon Box */}
                <div className="w-12 h-12 rounded-[6px] bg-[#FFF4D6] border-2 border-[#7A3F1F] flex items-center justify-center text-[#7A3F1F] mb-4 shadow-[0_3px_0_#7A3F1F] group-hover:scale-105 transition-transform">
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 bg-[#4F9D18] border border-[#2F5E0F] rounded-[1px] mb-0.5" />
                    <div className="w-5 h-1 bg-[#7A3F1F]" />
                    <div className="flex justify-between w-6 mt-0.5">
                      <div className="w-2.5 h-2.5 bg-[#F4C542] border border-[#7A3F1F] rounded-[1px]" />
                      <div className="w-2.5 h-2.5 bg-[#176B73] border border-[#0D4449] rounded-[1px]" />
                    </div>
                  </div>
                </div>
                <h4 className="font-pixel text-base sm:text-lg font-bold text-[#2D1B12] mb-2">
                  {aboutData.competencies[2].title}
                </h4>
                <p className="text-xs sm:text-sm text-[#6B513C] leading-relaxed">
                  {aboutData.competencies[2].description}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#E0CFAB] flex items-center gap-2 text-xs font-pixel font-bold text-[#4F9D18]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Figma Tokens & Content Spec</span>
              </div>
            </VoxelCard>
          </div>
        </ModalSection>

        {/* Tools & Domain Experience */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
          {/* Tools Box */}
          <div className="p-5 rounded-[8px] bg-[#FFFDF7] border-2 border-[#CBB892] shadow-[0_3px_0_#A89571] space-y-4">
            <h4 className="font-pixel text-sm font-bold uppercase tracking-wider text-[#7A3F1F] flex items-center gap-2 border-b border-[#EAD9B0] pb-2">
              <Layers className="w-4 h-4 text-[#B86428]" />
              <span>Công cụ thành thạo</span>
            </h4>
            <div className="space-y-3.5">
              {aboutData.tools.map((tool) => (
                <div key={tool.name} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-[#2D1B12]">
                    <span>{tool.name}</span>
                    <span className="font-pixel text-[#4F9D18]">{tool.level}%</span>
                  </div>
                  {/* Voxel segmented progress bar */}
                  <div className="w-full h-3 rounded-[3px] bg-[#E8DCBF] border border-[#C5B48D] p-0.5 overflow-hidden">
                    <div
                      className="h-full rounded-[2px] bg-[#4F9D18] border border-[#3A7511] transition-all duration-500"
                      style={{ width: `${tool.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Domain Specialization Box */}
          <div className="p-5 rounded-[8px] bg-[#FFFDF7] border-2 border-[#CBB892] shadow-[0_3px_0_#A89571] space-y-4 flex flex-col justify-between">
            <div>
              <h4 className="font-pixel text-sm font-bold uppercase tracking-wider text-[#7A3F1F] flex items-center gap-2 border-b border-[#EAD9B0] pb-2 mb-3">
                <Compass className="w-4 h-4 text-[#B86428]" />
                <span>Lĩnh vực chuyên sâu</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  'Ngân hàng số (Digital Banking)',
                  'Hệ thống cấp hạn mức TDH',
                  'eKYC & Định danh điện tử',
                  'BIZ Enterprise Platform',
                  'B2B SaaS & Fintech',
                  'Design System Architecture',
                  'Ký số & Xác thực bảo mật'
                ].map((field) => (
                  <span
                    key={field}
                    className="px-2.5 py-1 rounded-[4px] bg-[#FFF4D6] border border-[#C5B48D] text-xs text-[#2D1B12] font-medium shadow-sm hover:border-[#7A3F1F] transition-colors"
                  >
                    {field}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-[6px] bg-[#F4ECCF] border-2 border-[#D4C39B] text-xs text-[#4A3326] leading-relaxed">
              <span className="font-bold text-[#7A3F1F] font-pixel">💡 Triết lý thiết kế: </span>
              "Đơn giản hóa những nghiệp vụ phức tạp nhất thành trải nghiệm mà bất kỳ ai cũng có thể sử dụng dễ dàng ngay lần đầu tiên."
            </div>
          </div>
        </div>
      </GameModalBody>
    </GameModal>
  );
};

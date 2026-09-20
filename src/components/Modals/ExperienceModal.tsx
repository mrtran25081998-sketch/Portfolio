import React from 'react';
import { Sparkles, Calendar } from 'lucide-react';
import { experienceData } from '../../data/portfolioData';
import {
  GameModal,
  GameModalBody,
  VoxelCard
} from './common/GameModalComponents';
import { MBBankLogo, KienlongBankLogo, AgileTechLogo } from './CompanyLogos';

interface ExperienceModalProps {
  onClose: () => void;
}

export const ExperienceModal: React.FC<ExperienceModalProps> = ({ onClose }) => {
  return (
    <GameModal areaKey="experience" onClose={onClose} maxWidthClass="max-w-[980px]">
      <GameModalBody>
        {/* Journey Headline */}
        <div className="space-y-2">
          <div className="text-xs sm:text-sm font-pixel font-bold text-[#7A3F1F] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#F4C542]" />
            <span>Một hành trình trưởng thành của tôi!</span>
          </div>
          <h1 className="font-pixel text-2xl sm:text-4xl font-bold text-[#2D1B12] leading-tight">
            Mang tuổi trẻ đi thật xa, để trở về với nhiều trải nghiệm hơn
          </h1>
        </div>

        {/* Quest Milestones Timeline */}
        <div className="relative pt-2 pb-4">
          {/* Vertical Voxel Milestone Path Line */}
          <div
            className="absolute left-[20px] sm:left-[24px] -translate-x-1/2 top-4 bottom-6 w-1 bg-[#BCA67F] border-x border-[#9E875C]"
            aria-hidden="true"
          />

          <div className="space-y-8 sm:space-y-10">
            {experienceData.map((item) => (
              <div
                key={item.id}
                className="relative flex items-start gap-4 sm:gap-6 group"
              >
                {/* Left Column: Milestone Node (Diamond / Square block on the path) */}
                <div className="shrink-0 z-10">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[6px] bg-[#F4C542] border-2 border-[#4A2414] text-[#2D1B12] flex items-center justify-center font-pixel font-bold text-sm sm:text-base shadow-[0_3px_0_#4A2414] group-hover:scale-110 transition-transform">
                    {item.orderNumber}
                  </div>
                </div>

                {/* Right Column: Quest Card with Company Details */}
                <div className="flex-1">
                  <VoxelCard
                    variant="parchment"
                    className="p-5 sm:p-6 space-y-4 border-2 border-[#CBB892] shadow-[0_4px_0_#A89571]"
                  >
                    {/* Top Header: Logo, Company Info & Period */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#EAD9B0]">
                      <div className="flex items-center gap-3.5">
                        {/* Company Logo Badge */}
                        <div className="h-16 w-24 sm:w-28 p-2 rounded-[8px] bg-white flex items-center justify-center shrink-0 border-2 border-[#CBB892] shadow-[0_2px_0_#A89571] hover:shadow-md transition-shadow">
                          {item.logoType === 'mb' && (
                            <MBBankLogo className="w-full h-full max-h-12" />
                          )}

                          {item.logoType === 'kienlong' && (
                            <KienlongBankLogo className="w-full h-full max-h-12" />
                          )}

                          {item.logoType === 'agiletech' && (
                            <AgileTechLogo className="w-full h-full max-h-12" />
                          )}
                        </div>

                        <div>
                          <h3 className="font-pixel text-lg sm:text-2xl font-bold text-[#2D1B12]">
                            {item.company}
                          </h3>
                          <div className="text-xs text-[#7A3F1F] font-semibold mt-0.5">
                            <span className="text-[#B86428] font-bold text-sm">
                              {item.role}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Period Quest Badge */}
                      <div className="self-start sm:self-auto px-3 py-1.5 rounded-[4px] bg-[#FFF4D6] border border-[#7A3F1F] text-xs font-pixel font-bold text-[#7A3F1F] shadow-sm flex items-center gap-1.5 shrink-0">
                        <Calendar className="w-3.5 h-3.5 text-[#B86428]" />
                        <span>{item.period}</span>
                      </div>
                    </div>

                    {/* Responsibilities & Achievements */}
                    <ul className="space-y-2.5 text-xs sm:text-sm text-[#4A3326] leading-relaxed">
                      {item.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5">
                          <div className="w-2 h-2 rounded-[1px] bg-[#B86428] border border-[#7A3F1F] mt-1.5 shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </VoxelCard>
                </div>
              </div>
            ))}
          </div>
        </div>
      </GameModalBody>
    </GameModal>
  );
};

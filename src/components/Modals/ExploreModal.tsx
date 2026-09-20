import React from 'react';
import {
  TrendingUp,
  Users,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Briefcase,
  Target,
  ShieldCheck
} from 'lucide-react';
import { exploreData } from '../../data/portfolioData';
import {
  GameModal,
  GameModalBody,
  VoxelButton,
  VoxelCard,
  ModalSection
} from './common/GameModalComponents';

interface ExploreModalProps {
  onClose: () => void;
  onGoToContact: () => void;
}

export const ExploreModal: React.FC<ExploreModalProps> = ({
  onClose,
  onGoToContact
}) => {
  const getPillarIcon = (id: string) => {
    switch (id) {
      case 'cro':
        return <TrendingUp className="w-5 h-5 text-[#2E7D32]" />;
      case 'design-ops':
        return <Cpu className="w-5 h-5 text-[#176B73]" />;
      case 'fintech-enterprise':
        return <ShieldCheck className="w-5 h-5 text-[#7A3F1F]" />;
      case 'bridge':
        return <Layers className="w-5 h-5 text-[#B86428]" />;
      default:
        return <Target className="w-5 h-5 text-[#2E7D32]" />;
    }
  };

  return (
    <GameModal areaKey="cx" onClose={onClose} maxWidthClass="max-w-[1000px]">
      <GameModalBody>
        {/* Executive Value Proposition Header without card border/background */}
        <div className="space-y-4 w-full pb-2">
          <h1 className="font-pixel text-2xl sm:text-4xl font-bold text-[#2D1B12] leading-tight">
            {exploreData.headline}
          </h1>

          <p className="text-xs sm:text-sm sm:text-base text-[#4A3326] leading-relaxed font-sans-body">
            {exploreData.intro}
          </p>

          {/* Action Button: Contact */}
          <div className="pt-1">
            <VoxelButton
              variant="secondary"
              size="md"
              onClick={() => {
                onClose();
                onGoToContact();
              }}
              icon={<Briefcase className="w-4 h-4 text-[#7A3F1F]" />}
            >
              Liên hệ hợp tác
            </VoxelButton>
          </div>
        </div>

        {/* 4 Value Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {exploreData.pillars.map((pillar) => (
            <VoxelCard
              key={pillar.id}
              variant="parchment"
              className="flex flex-col justify-between group p-5"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[6px] bg-[#FFF4D6] border-2 border-[#7A3F1F] flex items-center justify-center shadow-[0_2px_0_#7A3F1F] group-hover:scale-105 transition-transform shrink-0">
                      {getPillarIcon(pillar.id)}
                    </div>
                    <div>
                      <h3 className="font-pixel text-base sm:text-lg font-bold text-[#2D1B12]">
                        {pillar.title}
                      </h3>
                      <span className="text-[11px] font-pixel text-[#7A3F1F] uppercase font-semibold">
                        {pillar.subtitle}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#4A3326] leading-relaxed">
                  {pillar.description}
                </p>

                {/* Measurable Metric Box */}
                <div className="p-2.5 rounded-[6px] bg-[#FFF4D6] border border-[#D4C39B] flex items-center justify-between">
                  <span className="text-[11px] text-[#6B513C] font-semibold">{pillar.metricLabel}:</span>
                  <span className="font-pixel text-xs sm:text-sm font-bold text-[#2E7D32]">
                    {pillar.metric}
                  </span>
                </div>
              </div>

              {/* Deliverables / Business Values List */}
              <div className="mt-3.5 pt-3 border-t border-[#EAD9B0] space-y-2">
                <div className="text-[11px] font-pixel font-bold text-[#7A3F1F] uppercase tracking-wider">
                  Giá trị cốt lõi mang lại:
                </div>
                <div className="space-y-1.5">
                  {pillar.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs sm:text-[13px] text-[#4A3326] leading-snug">
                      <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </VoxelCard>
          ))}
        </div>

        {/* 5-Step Design Workflow */}
        <ModalSection
          title="Quy trình chuyển hóa nghiệp vụ thành kết quả"
          subtitle="Phương pháp luận tinh giản, chặt chẽ từ bài toán kinh doanh đến sản phẩm hoàn thiện"
          badge="WORKFLOW"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            {exploreData.workflow.map((step) => (
              <div
                key={step.step}
                className="p-4 rounded-[8px] bg-[#FFFDF7] border-2 border-[#CBB892] shadow-[0_3px_0_#A89571] flex flex-col justify-between space-y-2"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-7 h-7 rounded-[4px] bg-[#F4C542] border border-[#4A2414] font-pixel font-bold text-xs text-[#2D1B12] flex items-center justify-center shadow-sm">
                      {step.step}
                    </span>
                    <span className="font-pixel text-[10px] text-[#7A3F1F] uppercase font-bold">
                      BƯỚC {step.step}
                    </span>
                  </div>
                  <h4 className="font-pixel text-xs sm:text-sm font-bold text-[#2D1B12] mb-1">
                    {step.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#4A3326] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ModalSection>
      </GameModalBody>
    </GameModal>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import {
  Workflow,
  CheckCircle2,
  AlertCircle,
  Users,
  Building,
  Layers,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Lightbulb,
  X,
  FileUp,
  RotateCcw,
  ShieldCheck,
  Briefcase,
  Database,
  Phone,
  ChevronDown,
  ChevronUp,
  Car,
  Factory,
  ArrowRight,
  AlertTriangle,
  BarChart3
} from 'lucide-react';
import { ProjectItem } from '../../../types';

interface BizMBBankCaseStudyProps {
  project: ProjectItem;
  onBack: () => void;
}

const CHAPTERS = [
  { id: 'sec-01', num: '01', title: 'Tổng quan dự án' },
  { id: 'sec-02', num: '02', title: 'Nhận yêu cầu' },
  { id: 'sec-03', num: '03', title: 'Phân tích yêu cầu' },
  { id: 'sec-04', num: '04', title: 'Concept cùng PO' },
  { id: 'sec-05', num: '05', title: 'Kiểm thử khả dụng' },
  { id: 'sec-06', num: '06', title: 'Bảo vệ giải pháp' },
  { id: 'sec-07', num: '07', title: 'Refinement & Planning' },
  { id: 'sec-08', num: '08', title: 'UAT sản phẩm' },
  { id: 'sec-09', num: '09', title: 'Go-live & Đo lường' },
  { id: 'sec-10', num: '10', title: 'Kết quả ban đầu' },
  { id: 'sec-11', num: '11', title: 'Thiết kế then chốt' },
  { id: 'sec-12', num: '12', title: 'Bài học rút ra' },
  { id: 'sec-13', num: '13', title: 'Điều làm tốt hơn' },
  { id: 'sec-14', num: '14', title: 'Vòng cải tiến' },
  { id: 'sec-15', num: '15', title: 'Quy trình sản phẩm' },
  { id: 'sec-16', num: '16', title: 'Kết luận' }
];

export const BizMBBankCaseStudy: React.FC<BizMBBankCaseStudyProps> = ({
  project,
  onBack
}) => {
  const [activeChapter, setActiveChapter] = useState('sec-01');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Interactive dynamic form demo state
  const [selectedCapitalNeed, setSelectedCapitalNeed] = useState<'car' | 'project' | 'other'>('car');

  // Interactive Review Layer expand state
  const [isReviewExpanded, setIsReviewExpanded] = useState(false);

  // Interactive MB Return simulation state
  const [simulatedReturnState, setSimulatedReturnState] = useState<'approved' | 'returned'>('returned');

  // Interactive Usability Testing Finding active tab
  const [activeFindingTab, setActiveFindingTab] = useState<number>(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const chapterNavRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const isDraggingNavRef = useRef(false);
  const startXNavRef = useRef(0);
  const startScrollLeftNavRef = useRef(0);
  const hasDraggedNavRef = useRef(false);

  const checkScrollability = () => {
    const el = chapterNavRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 6);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 6);
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [project.id]);

  useEffect(() => {
    const el = chapterNavRef.current;
    if (!el) return;

    checkScrollability();

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
        checkScrollability();
      }
    };

    const handleScroll = () => {
      checkScrollability();
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    el.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkScrollability);

    return () => {
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkScrollability);
    };
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPos = container.scrollTop + 140;
      for (let i = CHAPTERS.length - 1; i >= 0; i--) {
        const el = document.getElementById(CHAPTERS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveChapter(CHAPTERS[i].id);
          break;
        }
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const btn = document.getElementById(`chapter-btn-${activeChapter}`);
    if (btn) {
      btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      setTimeout(checkScrollability, 300);
    }
  }, [activeChapter]);

  const scrollChapters = (direction: 'left' | 'right') => {
    if (chapterNavRef.current) {
      chapterNavRef.current.scrollBy({
        left: direction === 'left' ? -260 : 260,
        behavior: 'smooth'
      });
      setTimeout(checkScrollability, 300);
    }
  };

  const handleNavMouseDown = (e: React.MouseEvent) => {
    const el = chapterNavRef.current;
    if (!el) return;
    isDraggingNavRef.current = true;
    hasDraggedNavRef.current = false;
    startXNavRef.current = e.pageX - el.offsetLeft;
    startScrollLeftNavRef.current = el.scrollLeft;
  };

  const handleNavMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingNavRef.current) return;
    const el = chapterNavRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXNavRef.current) * 1.5;
    if (Math.abs(walk) > 4) {
      hasDraggedNavRef.current = true;
    }
    el.scrollLeft = startScrollLeftNavRef.current - walk;
    checkScrollability();
  };

  const handleNavMouseUp = () => {
    isDraggingNavRef.current = false;
  };

  const scrollToChapter = (id: string) => {
    setActiveChapter(id);
    const element = document.getElementById(id);
    if (element && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const targetTop = element.offsetTop - 16;
      container.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-[#FFF8E7] select-text">
      {/* =========================================================================
       * FIXED SUBHEADER: 16-CHAPTER SYNCHRONIZED NAVIGATION BAR
       * ========================================================================= */}
      <div className="shrink-0 z-20 px-3 sm:px-5 py-2.5 bg-[#FFF4D6] border-b-2 border-[#DFC9A2] shadow-xs flex items-center gap-2 relative select-none">
        <button
          onClick={() => scrollChapters('left')}
          disabled={!canScrollLeft}
          className={`w-8 h-8 rounded-[4px] flex items-center justify-center shrink-0 border transition-all cursor-pointer ${
            canScrollLeft
              ? 'bg-[#FFF8E7] hover:bg-[#F4C542] text-[#7A3F1F] border-[#DFC9A2] shadow-xs active:scale-95'
              : 'opacity-25 cursor-not-allowed bg-[#FFF8E7]/50 border-transparent text-[#A89571]'
          }`}
          title="Cuộn sang trái"
          aria-label="Cuộn sang trái"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div
          ref={chapterNavRef}
          onMouseDown={handleNavMouseDown}
          onMouseMove={handleNavMouseMove}
          onMouseUp={handleNavMouseUp}
          onMouseLeave={handleNavMouseUp}
          className="flex-1 flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-0.5 no-scrollbar cursor-grab active:cursor-grabbing"
        >
          {CHAPTERS.map((c) => {
            const isActive = activeChapter === c.id;
            return (
              <button
                key={c.id}
                id={`chapter-btn-${c.id}`}
                onClick={() => {
                  if (hasDraggedNavRef.current) return;
                  scrollToChapter(c.id);
                }}
                className={`px-3.5 py-1.5 rounded-[5px] font-sans text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#F4C542] text-[#2D1B12] shadow-[0_2px_0_#9E875C] ring-1 ring-[#D9A726] scale-[1.02]'
                    : 'bg-[#FFF8E7] hover:bg-[#FFECC2] text-[#7A3F1F] border border-[#DFC9A2]'
                }`}
                title={c.title}
              >
                <span className={isActive ? 'text-[#2D1B12] font-black' : 'text-[#8C5832] font-bold'}>{c.num}</span>
                <span className="ml-1.5 text-[#4A3326] font-medium">• {c.title}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => scrollChapters('right')}
          disabled={!canScrollRight}
          className={`w-8 h-8 rounded-[4px] flex items-center justify-center shrink-0 border transition-all cursor-pointer ${
            canScrollRight
              ? 'bg-[#FFF8E7] hover:bg-[#F4C542] text-[#7A3F1F] border-[#DFC9A2] shadow-xs active:scale-95'
              : 'opacity-25 cursor-not-allowed bg-[#FFF8E7]/50 border-transparent text-[#A89571]'
          }`}
          title="Cuộn sang phải"
          aria-label="Cuộn sang phải"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* =========================================================================
       * SCROLLABLE CASE STUDY CONTENT BODY
       * ========================================================================= */}
      <div
        ref={scrollContainerRef}
        id="casestudy-body-container"
        className="flex-1 overflow-y-auto p-4 sm:p-7 md:p-8 space-y-12 sm:space-y-16 bg-[#FFF8E7] text-[#2D1B12] voxel-scrollbar font-sans pb-24 relative text-sm sm:text-base"
      >
        {/* =========================================================================
         * CHAPTER I — TỔNG QUAN DỰ ÁN
         * ========================================================================= */}
        <section id="sec-01" className="space-y-7 pt-1">
          {/* Editorial Header */}
          <div className="space-y-3.5">
            <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm font-bold tracking-wide uppercase">
              <span className="px-3 py-1 rounded-[4px] bg-[#F4C542]/30 border border-[#B86428]/40 text-[#B86428]">
                CASE STUDY
              </span>
              <span className="text-[#A89571]">•</span>
              <span className="px-3 py-1 rounded-[4px] bg-[#E8D9BE] text-[#5A4030]">
                BIZ MBBANK
              </span>
              <span className="text-[#A89571]">•</span>
              <span className="px-3 py-1 rounded-[4px] bg-[#DCFCE7] border border-[#86EFAC] text-[#15803D]">
                WEB PLATFORM
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#2D1B12] tracking-tight leading-[1.25]">
              Xây dựng hành trình đề nghị cấp hạn mức trung dài hạn cho khách hàng doanh nghiệp
            </h1>

            {/* Core Subtitle Quote */}
            <div className="p-4 sm:p-5 rounded-[10px] bg-[#FFF4D6] border-l-4 border-[#B86428] text-base sm:text-lg text-[#4A2414] font-medium italic shadow-xs leading-relaxed">
              "Biến một quy trình tín dụng nhiều dữ liệu, nhiều hồ sơ và nhiều vai trò thành một hành trình số có cấu trúc, có thể lưu, tiếp tục, phê duyệt và xử lý lại khi cần."
            </div>
          </div>

          {/* Hero Thumbnail Image Showcase */}
          <div className="rounded-[12px] overflow-hidden border-2 sm:border-3 border-[#CBB892] shadow-[0_6px_0_#A89571,0_12px_24px_rgba(0,0,0,0.1)] relative bg-[#1E293B]">
            <img
              src={project.imageUrl || '/assets/projects/project-1-mbbank.png'}
              alt={project.title}
              className="w-full h-auto max-h-[540px] object-cover object-center"
            />
          </div>

          {/* Project Metadata Matrix (5 Attributes) */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
            <div className="p-4 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-1">
              <div className="text-xs uppercase tracking-wider font-bold text-[#7A3F1F]">Vai trò</div>
              <div className="text-base font-bold text-[#2D1B12]">Product Designer</div>
              <div className="text-xs text-[#6B513C]">End-to-End Ownership</div>
            </div>
            <div className="p-4 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-1">
              <div className="text-xs uppercase tracking-wider font-bold text-[#7A3F1F]">Loại dự án</div>
              <div className="text-base font-bold text-[#2D1B12]">0→1 Product</div>
              <div className="text-xs text-[#6B513C]">Xây mới từ đầu</div>
            </div>
            <div className="p-4 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-1">
              <div className="text-xs uppercase tracking-wider font-bold text-[#7A3F1F]">Sản phẩm</div>
              <div className="text-base font-bold text-[#2D1B12]">BIZ MBBank</div>
              <div className="text-xs text-[#6B513C]">Web Banking Portal</div>
            </div>
            <div className="p-4 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-1">
              <div className="text-xs uppercase tracking-wider font-bold text-[#7A3F1F]">Đối tượng</div>
              <div className="text-base font-bold text-[#2D1B12]">Doanh nghiệp</div>
              <div className="text-xs text-[#6B513C]">SME, Upper SME, CIB</div>
            </div>
            <div className="p-4 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-1 col-span-2 md:col-span-1">
              <div className="text-xs uppercase tracking-wider font-bold text-[#7A3F1F]">Phối hợp</div>
              <div className="text-xs sm:text-sm font-semibold text-[#2D1B12] leading-tight">PO, Business, BA, Dev, QA, Nghiệp vụ tín dụng</div>
            </div>
          </div>

          {/* I.1 Bối cảnh & I.2 Bài toán */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-3">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase tracking-wider">
                <Briefcase className="w-4 h-4 text-[#B86428]" />
                <span>1. Bối cảnh dự án</span>
              </div>
              <p className="text-[#3E2718] leading-relaxed">
                Tính năng <strong>Phương án trung dài hạn</strong> được xây dựng trong nhóm <strong>Tín dụng & Tài trợ thương mại → Đề nghị cấp tín dụng</strong> trên BIZ MBBank.
              </p>
              <p className="text-[#5A4030] leading-relaxed">
                Trước khi có tính năng này, chưa tồn tại một hành trình số hoàn chỉnh để khách hàng doanh nghiệp tự khởi tạo phương án, chuẩn bị thông tin, upload hồ sơ, thực hiện phê duyệt nội bộ và gửi yêu cầu tới MB.
              </p>
              <div className="p-3 rounded bg-[#FFF4D6] border border-[#DFC9A2] text-xs sm:text-sm font-bold text-[#8C4312]">
                Đây vì vậy không phải một bài toán redesign. Đây là bài toán: Xây dựng một hành trình tín dụng doanh nghiệp mới từ con số 0.
              </div>
            </div>

            <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-3">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase tracking-wider">
                <AlertCircle className="w-4 h-4 text-[#B86428]" />
                <span>2. Định nghĩa lại bài toán</span>
              </div>
              <p className="text-[#3E2718] leading-relaxed">
                Một phương án trung dài hạn không phải một form đơn giản. Khách hàng cần cung cấp: thông tin nhu cầu vốn, chi tiết phương án, thông tin doanh nghiệp, hồ sơ pháp lý, tài chính và phương án.
              </p>
              <p className="text-[#5A4030] leading-relaxed">
                Hành trình có sự tham gia của <strong>Maker</strong> (khởi tạo), <strong>Approver</strong> (phê duyệt nội bộ doanh nghiệp) và <strong>MB</strong> (tiếp nhận thẩm định). Đặc biệt, Submit chưa phải là điểm kết thúc: nếu hồ sơ chưa đạt, MB sẽ trả lại để Maker chỉnh sửa và gửi lại.
              </p>
              <div className="p-3 rounded bg-[#EFF6FF] border border-[#BFDBFE] text-xs sm:text-sm font-bold text-[#1E40AF]">
                "Làm thế nào để số hóa một quy trình nhiều thông tin, nhiều vai trò và nhiều vòng chỉnh sửa mà khách hàng vẫn luôn hiểu mình đang ở đâu, cần chuẩn bị gì và cần làm gì tiếp theo?"
              </div>
            </div>
          </div>

          {/* I.3 Vai trò của tôi xuyên suốt 8 giai đoạn */}
          <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#EAD9B0] pb-2.5 gap-2">
              <div className="text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase tracking-wider flex items-center gap-2">
                <Workflow className="w-4 h-4 text-[#B86428]" />
                <span>3. Vai trò của tôi xuyên suốt vòng đời sản phẩm</span>
              </div>
              <span className="text-xs text-[#8C5832] font-semibold bg-[#FFF4D6] px-2.5 py-0.5 rounded border border-[#DFC9A2]">
                Từ Discovery đến Post-Launch
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 pt-1">
              {[
                { step: '01', title: 'Nhận yêu cầu', sub: 'Business alignment' },
                { step: '02', title: 'Phân tích yêu cầu', sub: 'Rules & Context' },
                { step: '03', title: 'Concept cùng PO', sub: 'Flow & Wireframe' },
                { step: '04', title: 'Usability Testing', sub: 'End-user evidence' },
                { step: '05', title: 'Bảo vệ giải pháp', sub: 'Project Director' },
                { step: '06', title: 'Refinement', sub: 'BA & Dev planning' },
                { step: '07', title: 'UAT sản phẩm', sub: 'UX & QA check' },
                { step: '08', title: 'Go-live & Cải tiến', sub: 'Funnel & Analytics' }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-[8px] bg-[#FFF8E7] border border-[#DFC9A2] flex flex-col items-center text-center hover:bg-[#FFECC2] transition-colors"
                >
                  <span className="w-6 h-6 rounded-full bg-[#B86428] text-white text-xs font-mono font-bold flex items-center justify-center mb-1.5 shadow-xs">
                    {item.step}
                  </span>
                  <div className="text-xs font-bold text-[#2D1B12] leading-snug">{item.title}</div>
                  <div className="text-[10px] text-[#7A3F1F] mt-0.5">{item.sub}</div>
                </div>
              ))}
            </div>

            <p className="text-xs sm:text-sm text-[#5A4030] leading-relaxed pt-1 italic">
              Tôi không chỉ chịu trách nhiệm cho UI cuối cùng mà tham gia vào việc xác định flow, logic trải nghiệm, prototype, testing, implementation và theo dõi sản phẩm sau khi đưa lên Production.
            </p>
          </div>

          {/* I.4 Hành trình sản phẩm cuối cùng: Interactive Workflow Diagram */}
          <div className="p-5 sm:p-7 rounded-[12px] bg-[#FFFDF6] border-2 border-[#DFC9A2] shadow-[0_3px_0_#D4C39B] space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#EAD9B0] pb-3 gap-2">
              <div>
                <div className="text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase tracking-wider flex items-center gap-2">
                  <Workflow className="w-4 h-4 text-[#B86428]" />
                  <span>4. Hành trình sản phẩm cuối cùng (Maker → Approver → MB & Return Loop)</span>
                </div>
                <p className="text-xs text-[#6B513C] mt-0.5">
                  Flow xuyên suốt toàn bộ case study: 4 bước Maker + Phê duyệt đa vai trò + MB Return Loop
                </p>
              </div>

              {/* Simulation Selector */}
              <div className="flex items-center gap-1.5 p-1 rounded bg-[#FFF4D6] border border-[#DFC9A2] text-xs">
                <span className="text-[11px] text-[#7A3F1F] px-1 font-semibold">Mô phỏng MB:</span>
                <button
                  onClick={() => setSimulatedReturnState('returned')}
                  className={`px-2 py-1 rounded font-bold transition-all cursor-pointer ${
                    simulatedReturnState === 'returned'
                      ? 'bg-[#D97706] text-white shadow-xs'
                      : 'text-[#7A3F1F] hover:bg-[#FFF8E7]'
                  }`}
                >
                  MB Trả lại hồ sơ
                </button>
                <button
                  onClick={() => setSimulatedReturnState('approved')}
                  className={`px-2 py-1 rounded font-bold transition-all cursor-pointer ${
                    simulatedReturnState === 'approved'
                      ? 'bg-[#15803D] text-white shadow-xs'
                      : 'text-[#7A3F1F] hover:bg-[#FFF8E7]'
                  }`}
                >
                  MB Phê duyệt
                </button>
              </div>
            </div>

            {/* Visual Workflow Map */}
            <div className="space-y-4">
              {/* Entry Step */}
              <div className="p-3.5 rounded-[8px] bg-[#FFF8E7] border border-[#DFC9A2] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B86428]" />
                  <span className="font-bold text-[#2D1B12] text-xs sm:text-sm">
                    Khởi tạo tại màn "Đề nghị cấp tín dụng"
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-600 border border-slate-300">
                    Hạn mức vốn lưu động
                  </span>
                  <span className="text-[#A89571]">hoặc</span>
                  <span className="px-2.5 py-1 rounded bg-[#B86428] text-white font-bold shadow-xs">
                    ★ Phương án trung dài hạn
                  </span>
                </div>
              </div>

              {/* Lane 1: 4 Bước của Maker */}
              <div className="p-4 sm:p-5 rounded-[10px] bg-[#EFF6FF] border-2 border-[#BFDBFE] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs sm:text-sm font-bold text-[#1E40AF] uppercase tracking-wide flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#2563EB]" />
                    <span>VAI TRÒ 01: MAKER (NGƯỜI KHỞI TẠO & LẬP PHƯƠNG ÁN)</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#1E40AF] bg-[#DBEAFE] px-2 py-0.5 rounded font-semibold">
                    4 Bước chuẩn hóa
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs sm:text-sm">
                  <div className="p-3 rounded bg-white border border-[#BFDBFE] space-y-1">
                    <div className="font-bold text-[#1E40AF]">1. Thông tin phương án</div>
                    <p className="text-slate-600 text-xs">
                      Dynamic Form thay đổi theo: Mua xe ô tô / Đầu tư dự án / Nhu cầu khác.
                    </p>
                  </div>
                  <div className="p-3 rounded bg-white border border-[#BFDBFE] space-y-1">
                    <div className="font-bold text-[#1E40AF]">2. Thông tin doanh nghiệp</div>
                    <p className="text-slate-600 text-xs">
                      Tái sử dụng dữ liệu MB đã lưu sẵn; kiểm tra và cập nhật trường được phép.
                    </p>
                  </div>
                  <div className="p-3 rounded bg-white border border-[#BFDBFE] space-y-1">
                    <div className="font-bold text-[#1E40AF]">3. Thông tin hồ sơ</div>
                    <p className="text-slate-600 text-xs">
                      Upload phân theo 4 nhóm nghiệp vụ rõ ràng, có hướng dẫn định dạng.
                    </p>
                  </div>
                  <div className="p-3 rounded bg-white border border-[#BFDBFE] space-y-1">
                    <div className="font-bold text-[#1E40AF]">4. Xác nhận (Review)</div>
                    <p className="text-slate-600 text-xs">
                      Review Layer tổng hợp toàn bộ thông tin với cơ chế Xem thêm / Thu gọn.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end pt-1">
                  <span className="text-xs font-bold text-[#1E40AF] flex items-center gap-1.5 bg-white px-3 py-1.5 rounded border border-[#BFDBFE]">
                    <span>Maker bấm "Gửi người duyệt"</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#2563EB]" />
                  </span>
                </div>
              </div>

              {/* Lane 2: Approver */}
              <div className="p-4 sm:p-5 rounded-[10px] bg-[#FAF5FF] border-2 border-[#E9D5FF] space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="text-xs sm:text-sm font-bold text-[#6B21A8] uppercase tracking-wide flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#9333EA]" />
                    <span>VAI TRÒ 02: APPROVER (LÃNH ĐẠO / CẤP PHÊ DUYỆT DOANH NGHIỆP)</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#6B21A8] bg-[#F3E8FF] px-2 py-0.5 rounded font-semibold">
                    Internal Governance
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#581C87] leading-relaxed">
                  Approver nhận thông báo yêu cầu mới → Mở xem màn hình tổng hợp Decision Review → Kiểm tra nội dung phương án và hồ sơ kèm theo → <strong>Phê duyệt và Submit sang MB</strong>.
                </p>
              </div>

              {/* Lane 3: MB & Return Feedback Loop */}
              <div className="p-4 sm:p-5 rounded-[10px] bg-[#FFFBEB] border-2 border-[#FDE68A] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs sm:text-sm font-bold text-[#92400E] uppercase tracking-wide flex items-center gap-2">
                    <Building className="w-4 h-4 text-[#D97706]" />
                    <span>VAI TRÒ 03: MBBANK (TIẾP NHẬN, KIỂM TRA & XỬ LÝ PHƯƠNG ÁN)</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#92400E] bg-[#FEF3C7] px-2 py-0.5 rounded font-semibold">
                    Credit Assessment & Decision
                  </span>
                </div>

                {simulatedReturnState === 'approved' ? (
                  <div className="p-3.5 rounded bg-[#F0FDF4] border border-[#86EFAC] text-xs sm:text-sm space-y-1.5 animate-fade-in">
                    <div className="flex items-center gap-2 font-bold text-[#15803D]">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                      <span>PHƯƠNG ÁN HỢP LỆ ➔ MB PHÊ DUYỆT HẠN MỨC THÀNH CÔNG</span>
                    </div>
                    <p className="text-[#14532D] leading-relaxed">
                      Thông tin đầy đủ, hồ sơ pháp lý & tài chính hợp lệ. MB phê duyệt hạn mức tín dụng trung dài hạn, kích hoạt hợp đồng và thông báo hạn mức sẵn sàng cho doanh nghiệp.
                    </p>
                  </div>
                ) : (
                  <div className="p-3.5 rounded bg-[#FFF5F5] border border-[#FECDD3] text-xs sm:text-sm space-y-2.5 animate-fade-in">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-bold text-[#991B1B]">
                        <RotateCcw className="w-4 h-4 text-[#DC2626]" />
                        <span>THÔNG TIN HOẶC HỒ SƠ CHƯA ĐẠT ➔ MB TRẢ LẠI YÊU CẦU</span>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-[#991B1B] bg-rose-100 px-2 py-0.5 rounded">
                        Actionable Return Loop
                      </span>
                    </div>
                    <div className="p-3 rounded bg-white border border-rose-200 space-y-1 text-slate-700">
                      <div className="font-bold text-[#991B1B]">MB cần bạn cập nhật 2 nội dung:</div>
                      <div className="text-xs space-y-0.5 pl-2">
                        <div>• <strong>Thông tin phương án:</strong> Mục đích sử dụng vốn chưa đầy đủ.</div>
                        <div>• <strong>Thông tin hồ sơ:</strong> Báo cáo tài chính chưa đúng kỳ.</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#7F1D1D] font-semibold">
                      <span>Maker nhận thông báo</span>
                      <ArrowRight className="w-3 h-3 text-[#DC2626]" />
                      <span>Bấm "Chỉnh sửa phương án"</span>
                      <ArrowRight className="w-3 h-3 text-[#DC2626]" />
                      <span>Sửa đúng 2 mục (giữ nguyên dữ liệu khác)</span>
                      <ArrowRight className="w-3 h-3 text-[#DC2626]" />
                      <span>Gửi lại MB kiểm tra lại</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
         * CHAPTER II — NHẬN YÊU CẦU
         * ========================================================================= */}
        <section id="sec-02" className="space-y-7 scroll-mt-20">
          <div className="space-y-3">
            <span className="px-3 py-1 rounded-[4px] bg-[#E8D9BE] text-[#5A4030] text-xs sm:text-sm font-bold uppercase tracking-wider">
              II / NHẬN YÊU CẦU
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#2D1B12]">
              Khởi đầu từ một đề bài mở hoàn toàn
            </h2>
            <p className="text-base sm:text-lg text-[#5A4030] leading-relaxed max-w-4xl">
              Yêu cầu ban đầu được chuyển xuống Product Owner với một kỳ vọng kinh doanh ngắn gọn: <em>"Xây dựng tính năng để khách hàng doanh nghiệp có thể đề nghị cấp hạn mức trung dài hạn trực tiếp trên BIZ MBBank."</em>
            </p>
          </div>

          {/* Missing Pieces Matrix */}
          <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFF5EB] border border-[#FCD34D] space-y-3.5">
            <div className="text-xs sm:text-sm font-bold text-[#B45309] uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#D97706]" />
              <span>Ở THỜI ĐIỂM BẮT ĐẦU, SẢN PHẨM CHƯA CÓ BẤT KỲ NỀN TẢNG NÀO:</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs sm:text-sm text-[#451A03]">
              <div className="p-2.5 rounded bg-white/90 border border-[#FDE68A]">✕ Chưa có User Flow</div>
              <div className="p-2.5 rounded bg-white/90 border border-[#FDE68A]">✕ Chưa có Wireframe</div>
              <div className="p-2.5 rounded bg-white/90 border border-[#FDE68A]">✕ Chưa có Prototype</div>
              <div className="p-2.5 rounded bg-white/90 border border-[#FDE68A]">✕ Chưa có Thiết kế UI</div>
              <div className="p-2.5 rounded bg-white/90 border border-[#FDE68A]">✕ Chưa có xử lý Maker–Approver</div>
              <div className="p-2.5 rounded bg-white/90 border border-[#FDE68A]">✕ Chưa có cơ chế lưu phương án</div>
              <div className="p-2.5 rounded bg-white/90 border border-[#FDE68A]">✕ Chưa có tái sử dụng thông tin</div>
              <div className="p-2.5 rounded bg-white/90 border border-[#FDE68A]">✕ Chưa có Return Flow từ MB</div>
            </div>
          </div>

          {/* 7 Kỳ vọng kinh doanh */}
          <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-3.5">
            <div className="text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#B86428]" />
              <span>7 KỲ VỌNG KINH DOANH TỪ PHÍA BUSINESS</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs sm:text-sm">
              {[
                { num: '1', title: 'Khởi tạo nhu cầu số', desc: 'Tạo thêm điểm khởi tạo nhu cầu tín dụng trực tiếp trên kênh số BIZ MBBank.' },
                { num: '2', title: 'Chuẩn hóa dữ liệu đầu vào', desc: 'Cấu trúc hóa thông tin phương án theo quy định tín dụng, giảm nhập liệu tùy tiện.' },
                { num: '3', title: 'Tận dụng dữ liệu MB đã có', desc: 'Khai thác tối đa hồ sơ định danh và lịch sử doanh nghiệp sẵn có trong hệ thống.' },
                { num: '4', title: 'Giảm việc nhập lại thông tin', desc: 'Tối ưu công sức của khách hàng doanh nghiệp khi khởi tạo phương án mới.' },
                { num: '5', title: 'Số hóa luồng Maker → Approver', desc: 'Phê duyệt nội bộ minh bạch ngay trên nền tảng số trước khi gửi sang ngân hàng.' },
                { num: '6', title: 'Giảm trao đổi rời rạc', desc: 'Hạn chế gửi file qua Zalo, Email hay các kênh không được bảo mật và theo dõi.' },
                { num: '7', title: 'Dữ liệu đo lường Funnel', desc: 'Tạo dữ liệu telemetry chính xác để theo dõi Funnel và tiếp tục cải tiến sản phẩm.' }
              ].map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-[8px] bg-[#FFF8E7] border border-[#DFC9A2] space-y-1">
                  <div className="font-bold text-[#B86428] text-sm flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#B86428] text-white flex items-center justify-center text-xs">{item.num}</span>
                    <span>{item.title}</span>
                  </div>
                  <p className="text-xs text-[#5A4030] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Câu hỏi sản phẩm cốt lõi */}
          <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-3">
            <div className="text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase tracking-wider">
              3. CÂU HỎI SẢN PHẨM — TRÁNH BẪY GIAO DIỆN TĨNH
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-[8px] bg-rose-50 border border-rose-200 space-y-1 text-xs sm:text-sm">
                <div className="font-bold text-[#991B1B]">Bắt đầu bằng câu hỏi UI đơn thuần:</div>
                <p className="text-[#7F1D1D] italic">“Form này cần bao nhiêu trường nhập liệu?”</p>
                <p className="text-slate-600 text-xs mt-1">Cách tiếp cận này khiến team vội vã thiết kế form dài và sớm bị mắc kẹt vào chi tiết giao diện.</p>
              </div>

              <div className="p-4 rounded-[8px] bg-emerald-50 border border-emerald-200 space-y-1 text-xs sm:text-sm">
                <div className="font-bold text-[#15803D]">Câu hỏi sản phẩm tôi cùng PO đặt ra:</div>
                <p className="text-[#14532D] font-bold italic">
                  “Một doanh nghiệp cần làm được những gì để có thể tạo, phê duyệt và gửi một phương án trung dài hạn hoàn chỉnh tới MB trên Digital?”
                </p>
                <p className="text-slate-600 text-xs mt-1">Câu hỏi này giúp cả team tập trung giải quyết toàn bộ bài toán trải nghiệm và workflow thực tế.</p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
         * CHAPTER III — PHÂN TÍCH YÊU CẦU
         * ========================================================================= */}
        <section id="sec-03" className="space-y-7 scroll-mt-20">
          <div className="space-y-3">
            <span className="px-3 py-1 rounded-[4px] bg-[#E8D9BE] text-[#5A4030] text-xs sm:text-sm font-bold uppercase tracking-wider">
              III / PHÂN TÍCH YÊU CẦU
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#2D1B12]">
              Bài toán không phải một flow tuyến tính đơn giản
            </h2>
            <p className="text-base sm:text-lg text-[#5A4030] leading-relaxed max-w-4xl">
              Qua phân tích nghiệp vụ cùng đơn vị tín dụng, chúng tôi nhận thấy sản phẩm phải giải quyết đồng thời bốn bài toán đặc thù của ngân hàng bán buôn.
            </p>
          </div>

          {/* III.1 Bài toán 1: Phương án không có cấu trúc duy nhất */}
          <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-4">
            <div className="text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#B86428]" />
              <span>1. Phương án không có một cấu trúc duy nhất (Dynamic Input by Capital Need)</span>
            </div>
            <p className="text-sm sm:text-base text-[#5A4030] leading-relaxed">
              Thông tin cần nhập thay đổi hoàn toàn theo <strong>Nhu cầu sử dụng vốn</strong>. Nếu dùng một form chung, người dùng sẽ phải nhìn thấy hàng chục trường không liên quan:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Mua xe ô tô */}
              <div className="p-4 rounded-[10px] bg-[#EFF6FF] border border-[#BFDBFE] space-y-2">
                <div className="font-bold text-[#1E40AF] flex items-center gap-2">
                  <Car className="w-4 h-4" />
                  <span>Nhu cầu: Mua xe ô tô đi lại</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-700">
                  <span className="p-1.5 rounded bg-white">• Hợp đồng mua bán</span>
                  <span className="p-1.5 rounded bg-white">• Tình trạng xe</span>
                  <span className="p-1.5 rounded bg-white">• Thương hiệu / Dòng xe</span>
                  <span className="p-1.5 rounded bg-white">• Số chỗ ngồi</span>
                  <span className="p-1.5 rounded bg-white">• Đơn giá dự kiến</span>
                  <span className="p-1.5 rounded bg-white">• Số lượng xe</span>
                  <span className="p-1.5 rounded bg-white col-span-2">• Thời gian bàn giao xe</span>
                </div>
              </div>

              {/* Đầu tư dự án */}
              <div className="p-4 rounded-[10px] bg-[#FAF5FF] border border-[#E9D5FF] space-y-2">
                <div className="font-bold text-[#6B21A8] flex items-center gap-2">
                  <Factory className="w-4 h-4" />
                  <span>Nhu cầu: Đầu tư dự án</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-700">
                  <span className="p-1.5 rounded bg-white">• Tên dự án</span>
                  <span className="p-1.5 rounded bg-white">• Mục đích đầu tư</span>
                  <span className="p-1.5 rounded bg-white">• Địa điểm triển khai</span>
                  <span className="p-1.5 rounded bg-white">• Chủ đầu tư</span>
                  <span className="p-1.5 rounded bg-white">• Tổng giá trị đầu tư</span>
                  <span className="p-1.5 rounded bg-white">• Thời gian hoàn thành</span>
                  <span className="p-1.5 rounded bg-white">• Cơ cấu vốn vay</span>
                  <span className="p-1.5 rounded bg-white">• Cơ cấu vốn tự có</span>
                  <span className="p-1.5 rounded bg-white">• Kế hoạch triển khai</span>
                  <span className="p-1.5 rounded bg-white">• Nguồn tiền trả nợ</span>
                </div>
              </div>
            </div>
          </div>

          {/* III.2 Dữ liệu doanh nghiệp đã tồn tại & III.3 Hồ sơ khối lượng lớn */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-3">
              <div className="text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase tracking-wider flex items-center gap-2">
                <Database className="w-4 h-4 text-[#B86428]" />
                <span>2. Dữ liệu doanh nghiệp đã tồn tại</span>
              </div>
              <p className="text-xs sm:text-sm text-[#5A4030] leading-relaxed">
                MB đã có một phần dữ liệu của doanh nghiệp: Tên công ty, Loại hình DN, Số ĐKKD, Ngày đăng ký, Địa chỉ, Người đại diện pháp luật, Ngành nghề kinh doanh.
              </p>
              <div className="p-3.5 rounded bg-[#FFF8E7] border border-[#DFC9A2] text-xs sm:text-sm space-y-1">
                <div className="font-bold text-[#8C4312]">Trải nghiệm không nên yêu cầu: "Nhập lại toàn bộ"</div>
                <div className="text-slate-700 font-medium">
                  Mà là: <strong>Load dữ liệu hiện có → Khách hàng kiểm tra → Chỉnh sửa nội dung được phép → Tiếp tục.</strong>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-3">
              <div className="text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase tracking-wider flex items-center gap-2">
                <FileUp className="w-4 h-4 text-[#B86428]" />
                <span>3. Hồ sơ có khối lượng lớn (4 Nhóm)</span>
              </div>
              <p className="text-xs sm:text-sm text-[#5A4030] leading-relaxed">
                Hồ sơ chia thành 4 nhóm nghiệp vụ khắt khe: <strong>Đơn đề nghị</strong>, <strong>Giấy tờ pháp lý</strong>, <strong>Năng lực tài chính</strong> và <strong>Hồ sơ phương án</strong>.
              </p>
              <div className="p-3.5 rounded bg-[#FFF8E7] border border-[#DFC9A2] text-xs sm:text-sm space-y-1">
                <div className="font-bold text-[#8C4312]">UX Challenge không đơn thuần là: "Vẽ nút Upload"</div>
                <div className="text-slate-700 font-medium">
                  Mà là: <strong>Làm sao để khách hàng hiểu mình cần chuẩn bị đúng tài liệu nào và vì sao cần?</strong>
                </div>
              </div>
            </div>
          </div>

          {/* III.4 Journey nhiều vai trò & III.5 Return là bình thường */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-2.5">
              <div className="text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4 text-[#B86428]" />
                <span>4. Đây là Journey nhiều vai trò</span>
              </div>
              <p className="text-xs sm:text-sm text-[#5A4030] leading-relaxed">
                <strong>Maker</strong> là người khởi tạo và chuẩn bị phương án. <strong>Approver</strong> là người có thẩm quyền phê duyệt trong nội bộ doanh nghiệp. <strong>MB</strong> là bên tiếp nhận và xử lý.
              </p>
              <div className="p-3 rounded bg-blue-50 border border-blue-200 text-xs sm:text-sm text-blue-900 font-bold">
                Flow thực chất là: Maker → Approver → MB, chứ không phải journey của một cá nhân đơn lẻ.
              </div>
            </div>

            <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-2.5">
              <div className="text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase tracking-wider flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#B86428]" />
                <span>5. Return là một phần bình thường</span>
              </div>
              <p className="text-xs sm:text-sm text-[#5A4030] leading-relaxed">
                Phương án có thể được MB trả lại khi thông tin chưa đầy đủ, nội dung chưa phù hợp hoặc hồ sơ chưa đúng kỳ kế toán.
              </p>
              <div className="p-3 rounded bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-900 font-bold">
                Return không nên được thiết kế như Error (Lỗi hệ thống). Nó phải là một trạng thái chính thức của Journey!
              </div>
            </div>
          </div>

          {/* III.6 Problem Statement */}
          <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFF4D6] border-2 border-[#DFC9A2] shadow-xs space-y-2">
            <div className="text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase tracking-wider flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-[#B86428]" />
              <span>6. PROBLEM STATEMENT CHỐT HẠ</span>
            </div>
            <p className="text-base sm:text-lg font-bold text-[#3E2718] leading-relaxed">
              "Làm thế nào để Maker có thể hoàn thành một phương án tín dụng nhiều dữ liệu và hồ sơ, phối hợp được với Approver và xử lý được các yêu cầu chỉnh sửa từ MB mà không mất context hoặc phải bắt đầu lại từ đầu?"
            </p>
          </div>
        </section>

        {/* =========================================================================
         * CHAPTER IV — XÂY DỰNG CONCEPT CÙNG PO
         * ========================================================================= */}
        <section id="sec-04" className="space-y-7 scroll-mt-20">
          <div className="space-y-3">
            <span className="px-3 py-1 rounded-[4px] bg-[#E8D9BE] text-[#5A4030] text-xs sm:text-sm font-bold uppercase tracking-wider">
              IV / XÂY DỰNG CONCEPT CÙNG PO
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#2D1B12]">
              Cách tiếp cận: User Flow → Wireframe → Prototype → UI
            </h2>
            <p className="text-base sm:text-lg text-[#5A4030] leading-relaxed max-w-4xl">
              Thay vì bắt đầu với High-Fidelity UI, tôi cùng PO giải quyết triệt để logic trải nghiệm trước khi vẽ visual, tạo nên 6 concepts nền tảng cho sản phẩm.
            </p>
          </div>

          {/* IV.3 Concept 01: Dynamic Form Demo Interactive Showcase */}
          <div className="p-5 sm:p-7 rounded-[12px] bg-[#FFFDF6] border-2 border-[#DFC9A2] shadow-[0_3px_0_#D4C39B] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#EAD9B0] pb-3 gap-2">
              <div>
                <div className="text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#B86428]" />
                  <span>CONCEPT 01 — DYNAMIC FORM THEO NHU CẦU SỬ DỤNG VỐN (INTERACTIVE DEMO)</span>
                </div>
                <p className="text-xs text-[#6B513C] mt-0.5">
                  Bấm thử từng nhu cầu bên dưới để xem form thay đổi trực quan theo Mental Model của từng nghiệp vụ
                </p>
              </div>

              {/* Selector Buttons */}
              <div className="flex items-center gap-1.5 p-1 rounded bg-[#FFF4D6] border border-[#DFC9A2]">
                <button
                  onClick={() => setSelectedCapitalNeed('car')}
                  className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                    selectedCapitalNeed === 'car'
                      ? 'bg-[#B86428] text-white shadow-xs'
                      : 'text-[#7A3F1F] hover:bg-[#FFF8E7]'
                  }`}
                >
                  Mua xe ô tô
                </button>
                <button
                  onClick={() => setSelectedCapitalNeed('project')}
                  className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                    selectedCapitalNeed === 'project'
                      ? 'bg-[#B86428] text-white shadow-xs'
                      : 'text-[#7A3F1F] hover:bg-[#FFF8E7]'
                  }`}
                >
                  Đầu tư dự án
                </button>
                <button
                  onClick={() => setSelectedCapitalNeed('other')}
                  className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                    selectedCapitalNeed === 'other'
                      ? 'bg-[#B86428] text-white shadow-xs'
                      : 'text-[#7A3F1F] hover:bg-[#FFF8E7]'
                  }`}
                >
                  Nhu cầu khác
                </button>
              </div>
            </div>

            {/* Interactive Dynamic Form Card */}
            <div className="p-4 sm:p-5 rounded-[10px] bg-[#FFF8E7] border border-[#DFC9A2] space-y-4">
              <div className="flex items-center justify-between text-xs border-b border-[#DFC9A2] pb-2 font-mono">
                <span className="text-[#8C5832]">BƯỚC 1: THÔNG TIN PHƯƠNG ÁN</span>
                <span className="text-[#B86428] font-bold">
                  {selectedCapitalNeed === 'car' && 'Đang chọn: Vốn mua xe ô tô đi lại'}
                  {selectedCapitalNeed === 'project' && 'Đang chọn: Vốn đầu tư dự án trung dài hạn'}
                  {selectedCapitalNeed === 'other' && 'Đang chọn: Nhu cầu sử dụng vốn khác'}
                </span>
              </div>

              {selectedCapitalNeed === 'car' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs animate-fade-in">
                  <div className="p-2.5 rounded bg-white border border-[#CBD5E1] space-y-1">
                    <label className="font-bold text-slate-700">Tình trạng xe</label>
                    <div className="p-1.5 rounded bg-slate-50 text-slate-600">Xe mới 100% xuất xưởng</div>
                  </div>
                  <div className="p-2.5 rounded bg-white border border-[#CBD5E1] space-y-1">
                    <label className="font-bold text-slate-700">Thương hiệu & Model</label>
                    <div className="p-1.5 rounded bg-slate-50 text-slate-600">Mercedes-Benz E300 / Toyota Camry</div>
                  </div>
                  <div className="p-2.5 rounded bg-white border border-[#CBD5E1] space-y-1">
                    <label className="font-bold text-slate-700">Số chỗ ngồi</label>
                    <div className="p-1.5 rounded bg-slate-50 text-slate-600">5 Chỗ</div>
                  </div>
                  <div className="p-2.5 rounded bg-white border border-[#CBD5E1] space-y-1">
                    <label className="font-bold text-slate-700">Số lượng xe dự kiến</label>
                    <div className="p-1.5 rounded bg-slate-50 text-slate-600">02 Chiếc</div>
                  </div>
                  <div className="p-2.5 rounded bg-white border border-[#CBD5E1] space-y-1">
                    <label className="font-bold text-slate-700">Đơn giá hợp đồng (VNĐ)</label>
                    <div className="p-1.5 rounded bg-slate-50 text-slate-600">3,200,000,000 VNĐ / xe</div>
                  </div>
                  <div className="p-2.5 rounded bg-white border border-[#CBD5E1] space-y-1">
                    <label className="font-bold text-slate-700">Thời gian bàn giao xe</label>
                    <div className="p-1.5 rounded bg-slate-50 text-slate-600">Quý 4 / 2026</div>
                  </div>
                </div>
              )}

              {selectedCapitalNeed === 'project' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs animate-fade-in">
                  <div className="p-2.5 rounded bg-white border border-[#CBD5E1] space-y-1">
                    <label className="font-bold text-slate-700">Tên dự án đầu tư</label>
                    <div className="p-1.5 rounded bg-slate-50 text-slate-600">Mở rộng nhà xưởng sản xuất KCN Tân Bình</div>
                  </div>
                  <div className="p-2.5 rounded bg-white border border-[#CBD5E1] space-y-1">
                    <label className="font-bold text-slate-700">Địa điểm thực hiện dự án</label>
                    <div className="p-1.5 rounded bg-slate-50 text-slate-600">Lô B2, Đường số 3, KCN Tân Bình, TP.HCM</div>
                  </div>
                  <div className="p-2.5 rounded bg-white border border-[#CBD5E1] space-y-1">
                    <label className="font-bold text-slate-700">Tổng mức đầu tư dự án</label>
                    <div className="p-1.5 rounded bg-slate-50 text-slate-600">45,000,000,000 VNĐ</div>
                  </div>
                  <div className="p-2.5 rounded bg-white border border-[#CBD5E1] space-y-1">
                    <label className="font-bold text-slate-700">Cơ cấu vốn vay MBBank</label>
                    <div className="p-1.5 rounded bg-slate-50 text-slate-600">30,000,000,000 VNĐ (66.7%)</div>
                  </div>
                  <div className="p-2.5 rounded bg-white border border-[#CBD5E1] space-y-1">
                    <label className="font-bold text-slate-700">Vốn tự có của doanh nghiệp</label>
                    <div className="p-1.5 rounded bg-slate-50 text-slate-600">15,000,000,000 VNĐ (33.3%)</div>
                  </div>
                  <div className="p-2.5 rounded bg-white border border-[#CBD5E1] space-y-1">
                    <label className="font-bold text-slate-700">Kế hoạch hoàn thành dự án</label>
                    <div className="p-1.5 rounded bg-slate-50 text-slate-600">18 Tháng kể từ ngày giải ngân</div>
                  </div>
                </div>
              )}

              {selectedCapitalNeed === 'other' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs animate-fade-in">
                  <div className="p-2.5 rounded bg-white border border-[#CBD5E1] space-y-1">
                    <label className="font-bold text-slate-700">Mục đích sử dụng vốn chi tiết</label>
                    <div className="p-1.5 rounded bg-slate-50 text-slate-600">Đầu tư dây chuyền máy móc chế biến xuất khẩu</div>
                  </div>
                  <div className="p-2.5 rounded bg-white border border-[#CBD5E1] space-y-1">
                    <label className="font-bold text-slate-700">Dự toán chi phí & Nguồn trả nợ</label>
                    <div className="p-1.5 rounded bg-slate-50 text-slate-600">Kèm bảng thuyết minh dòng tiền hoàn vốn</div>
                  </div>
                </div>
              )}

              <div className="text-xs text-[#6B513C] italic pt-1">
                <strong>Design Rationale:</strong> Không phải tất cả khách hàng đều cần cung cấp cùng một loại thông tin. Dynamic Form giúp giảm trường thừa, tăng tính dễ hiểu và bám sát chính xác Mental Model của từng phương án.
              </div>
            </div>
          </div>

          {/* IV.4 Concept 02: Save & Resume & IV.5 Concept 03: Tái sử dụng dữ liệu */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-3">
              <div className="text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase tracking-wider flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#B86428]" />
                <span>Concept 02 — Hành trình dài phải có khả năng dừng</span>
              </div>
              <p className="text-xs sm:text-sm text-[#5A4030] leading-relaxed">
                Một phương án tín dụng khó có thể hoàn thành trong vài phút. Người dùng cần đi tìm tài liệu, xin số liệu phòng kế toán, trao đổi nội bộ và quay lại vào thời điểm khác.
              </p>
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold text-[#2D1B12]">
                <div className="p-2 rounded bg-[#FFF8E7] border border-[#DFC9A2]">Lưu phương án</div>
                <div className="p-2 rounded bg-[#FFF8E7] border border-[#DFC9A2]">Tự động lưu</div>
                <div className="p-2 rounded bg-[#FFF8E7] border border-[#DFC9A2]">Chọn bản đã lưu</div>
              </div>
              <div className="text-xs font-semibold text-[#8C4312] pt-1">
                ★ Nguyên tắc: "Không ép một Journey dài phải hoàn thành trong một phiên duy nhất."
              </div>
            </div>

            <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-3">
              <div className="text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase tracking-wider flex items-center gap-2">
                <Database className="w-4 h-4 text-[#B86428]" />
                <span>Concept 03 — Tái sử dụng dữ liệu doanh nghiệp</span>
              </div>
              <p className="text-xs sm:text-sm text-[#5A4030] leading-relaxed">
                Ở bước 2, sản phẩm load toàn bộ thông tin doanh nghiệp MB đã lưu lên giao diện để khách hàng kiểm tra.
              </p>
              <div className="p-3 rounded bg-[#EFF6FF] border border-[#BFDBFE] text-xs sm:text-sm text-[#1E40AF] font-bold text-center">
                View ➔ Verify ➔ Edit if allowed ➔ Continue
              </div>
              <p className="text-xs text-slate-600">
                Điều này vừa giảm tối đa effort nhập liệu, vừa giảm nguy cơ sai lệch dữ liệu định danh so với Core Banking.
              </p>
            </div>
          </div>

          {/* IV.6 Concept 04: Nhóm hồ sơ & IV.7 Concept 05: Review Layer & IV.8 Human Support */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Concept 04 */}
            <div className="p-4 sm:p-5 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-xs space-y-2">
              <div className="text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase">Concept 04 — Hồ sơ chia theo nhóm</div>
              <p className="text-xs text-[#5A4030] leading-relaxed">
                Thay vì danh sách upload dài lê thê, tài liệu chia theo 4 nhóm: <strong>Đơn đề nghị</strong>, <strong>Pháp lý</strong>, <strong>Tài chính</strong> và <strong>Phương án</strong>.
              </p>
              <div className="text-[11px] font-bold text-[#8C4312] bg-[#FFF4D6] p-2 rounded">
                Khách hàng hiểu: "Tại sao tôi cần file này?" thay vì chỉ nhìn thấy một danh sách yêu cầu.
              </div>
            </div>

            {/* Concept 05 */}
            <div className="p-4 sm:p-5 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-xs space-y-2">
              <div className="text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase">Concept 05 — Xác nhận là Review Layer</div>
              <p className="text-xs text-[#5A4030] leading-relaxed">
                Bước 4 không bắt nhập thêm gì. Nó tổng hợp lại 3 bước trước kèm tính năng <strong>Xem thêm / Thu gọn</strong>.
              </p>
              <button
                onClick={() => setIsReviewExpanded(!isReviewExpanded)}
                className="w-full text-xs font-bold text-[#B86428] bg-white border border-[#DFC9A2] p-2 rounded flex items-center justify-center gap-1.5 cursor-pointer hover:bg-[#FFECC2]"
              >
                <span>{isReviewExpanded ? 'Thu gọn tóm tắt' : 'Bấm xem thử Review Layer'}</span>
                {isReviewExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
              {isReviewExpanded && (
                <div className="p-2.5 rounded bg-white border border-[#DFC9A2] text-[11px] text-slate-700 space-y-1 animate-fade-in">
                  <div className="font-bold text-[#2D1B12]">Tóm tắt phương án: Vốn mua xe 3.2 Tỷ</div>
                  <div>Doanh nghiệp: CÔNG TY CỔ PHẦN CÔNG NGHỆ VẬN TẢI ALPHA</div>
                  <div>Hồ sơ đính kèm: 08 tệp tin hợp lệ đã đối soát</div>
                </div>
              )}
            </div>

            {/* Concept 06 */}
            <div className="p-4 sm:p-5 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-xs space-y-2">
              <div className="text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase">Concept 06 — Human Support song song</div>
              <p className="text-xs text-[#5A4030] leading-relaxed">
                Thông tin <strong>Chi nhánh hỗ trợ</strong> luôn thường trực ở góc màn hình: Họ tên, Số ĐT, Email, Chi nhánh.
              </p>
              <div className="p-2.5 rounded bg-[#F0FDF4] border border-[#86EFAC] text-xs text-[#14532D] space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#16A34A]" />
                  <span>RM & Chi nhánh đồng hành</span>
                </div>
                <div className="text-[11px]">Digital Journey không cần loại bỏ con người, mà cung cấp điểm tựa khi gặp ca khó.</div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
         * CHAPTER V — KIỂM THỬ KHẢ DỤNG VỚI END USER
         * ========================================================================= */}
        <section id="sec-05" className="space-y-7 scroll-mt-20">
          <div className="space-y-3">
            <span className="px-3 py-1 rounded-[4px] bg-[#E8D9BE] text-[#5A4030] text-xs sm:text-sm font-bold uppercase tracking-wider">
              V / KIỂM THỬ KHẢ DỤNG VỚI END USER
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#2D1B12]">
              Kiểm chứng các giả thuyết trước khi chuyển giao BA & Dev
            </h2>
            <p className="text-base sm:text-lg text-[#5A4030] leading-relaxed max-w-4xl">
              Chúng tôi đưa Prototype vào Usability Testing để kiểm chứng 8 câu hỏi cốt lõi qua 6 kịch bản nhiệm vụ thực tế với khách hàng doanh nghiệp.
            </p>
          </div>

          {/* 8 Câu hỏi kiểm chứng & 6 Kịch bản */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-3">
              <div className="text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase tracking-wider">
                1. MỤC TIÊU — 8 CÂU HỎI CẦN KIỂM CHỨNG
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                <div className="p-2 rounded bg-[#FFF8E7] border border-[#DFC9A2]">1. Chọn đúng nhu cầu vốn?</div>
                <div className="p-2 rounded bg-[#FFF8E7] border border-[#DFC9A2]">2. Có hiểu Dynamic Form?</div>
                <div className="p-2 rounded bg-[#FFF8E7] border border-[#DFC9A2]">3. Nhận biết data prefill?</div>
                <div className="p-2 rounded bg-[#FFF8E7] border border-[#DFC9A2]">4. Biết phần nào được sửa?</div>
                <div className="p-2 rounded bg-[#FFF8E7] border border-[#DFC9A2]">5. Tìm đúng file upload?</div>
                <div className="p-2 rounded bg-[#FFF8E7] border border-[#DFC9A2]">6. Kiểm tra được bước Review?</div>
                <div className="p-2 rounded bg-[#FFF8E7] border border-[#DFC9A2]">7. Hiểu Maker–Approver?</div>
                <div className="p-2 rounded bg-[#FFF8E7] border border-[#DFC9A2]">8. Biết làm gì khi MB trả lại?</div>
              </div>
            </div>

            <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-3">
              <div className="text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase tracking-wider">
                2. KỊCH BẢN — 6 NHIỆM VỤ THỰC TẾ
              </div>
              <div className="space-y-1.5 text-xs text-slate-700">
                <div className="p-2 rounded bg-[#FFF8E7] border border-[#DFC9A2] font-semibold">Nhiệm vụ 1: Khởi tạo phương án mua xe ô tô đi lại</div>
                <div className="p-2 rounded bg-[#FFF8E7] border border-[#DFC9A2] font-semibold">Nhiệm vụ 2: Khởi tạo phương án đầu tư dự án</div>
                <div className="p-2 rounded bg-[#FFF8E7] border border-[#DFC9A2] font-semibold">Nhiệm vụ 3: Kiểm tra và cập nhật thông tin doanh nghiệp</div>
                <div className="p-2 rounded bg-[#FFF8E7] border border-[#DFC9A2] font-semibold">Nhiệm vụ 4: Upload bộ hồ sơ cần thiết theo nhóm</div>
                <div className="p-2 rounded bg-[#FFF8E7] border border-[#DFC9A2] font-semibold">Nhiệm vụ 5: Review và xác nhận yêu cầu</div>
                <div className="p-2 rounded bg-[#FFF8E7] border border-[#DFC9A2] font-semibold">Nhiệm vụ 6: Xử lý trường hợp MB trả lại yêu cầu</div>
              </div>
            </div>
          </div>

          {/* 5 Phát hiện then chốt & Điều chỉnh */}
          <div className="p-5 sm:p-7 rounded-[12px] bg-[#FFFDF6] border-2 border-[#DFC9A2] shadow-[0_3px_0_#D4C39B] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#EAD9B0] pb-3 gap-2">
              <div className="text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase tracking-wider flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-[#B86428]" />
                <span>3. NHỮNG PHÁT HIỆN CHÍNH & ĐIỀU CHỈNH THIẾT KẾ</span>
              </div>
              <span className="text-xs text-[#8C5832] font-semibold bg-[#FFF4D6] px-2.5 py-0.5 rounded border border-[#DFC9A2]">
                Observation ➔ Pattern ➔ Insight ➔ Design Decision
              </span>
            </div>

            {/* Findings Selector Tabs */}
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                'Phát hiện 1: Context của Form',
                'Phát hiện 2: Dữ liệu Prefill',
                'Phát hiện 3: Vấn đề Upload',
                'Phát hiện 4: Màn Confirmation',
                'Phát hiện 5: Return Action'
              ].map((tab, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveFindingTab(idx)}
                  className={`px-3 py-1.5 rounded-[5px] font-bold transition-all cursor-pointer ${
                    activeFindingTab === idx
                      ? 'bg-[#B86428] text-white shadow-xs'
                      : 'bg-[#FFF8E7] text-[#7A3F1F] border border-[#DFC9A2] hover:bg-[#FFECC2]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Finding Detail Box */}
            <div className="p-4 sm:p-5 rounded-[10px] bg-[#FFF8E7] border border-[#DFC9A2] space-y-3">
              {activeFindingTab === 0 && (
                <div className="space-y-3 text-xs sm:text-sm animate-fade-in">
                  <div className="font-bold text-[#991B1B] text-sm">
                    Phát hiện 1 — Dynamic Form cần giải thích rõ Context
                  </div>
                  <p className="text-[#5A4030] leading-relaxed">
                    Người dùng hiểu việc lựa chọn Mua xe / Dự án / Khác, nhưng một số trường nghiệp vụ tín dụng vẫn khó hiểu nếu chỉ hiển thị Label đơn thuần.
                  </p>
                  <div className="p-3.5 rounded bg-emerald-50 border border-emerald-200 text-[#14532D] space-y-1">
                    <strong className="block text-sm">Điều chỉnh thiết kế:</strong>
                    <div>Bổ sung Tooltip giải thích thuật ngữ, Hướng dẫn nghiệp vụ, Placeholder mô phỏng giá trị mẫu và Supporting Text cho từng trường.</div>
                  </div>
                </div>
              )}

              {activeFindingTab === 1 && (
                <div className="space-y-3 text-xs sm:text-sm animate-fade-in">
                  <div className="font-bold text-[#991B1B] text-sm">
                    Phát hiện 2 — Dữ liệu Prefill dễ tạo cảm giác “không được sửa”
                  </div>
                  <p className="text-[#5A4030] leading-relaxed">
                    Khi thông tin doanh nghiệp đã có sẵn, một số người dùng có xu hướng cho rằng: <em>“Đây là dữ liệu cố định từ ngân hàng, lỡ sai cũng không chỉnh được.”</em>
                  </p>
                  <div className="p-3.5 rounded bg-emerald-50 border border-emerald-200 text-[#14532D] space-y-1">
                    <strong className="block text-sm">Điều chỉnh thiết kế:</strong>
                    <div>Tách bạch rõ ràng: <strong>Thông tin MB đang lưu</strong> và <strong>Thông tin khách hàng có thể cập nhật</strong>; đồng thời chỉ hiển thị trạng thái Edit ở những trường thực sự cho phép chỉnh sửa.</div>
                  </div>
                </div>
              )}

              {activeFindingTab === 2 && (
                <div className="space-y-3 text-xs sm:text-sm animate-fade-in">
                  <div className="font-bold text-[#991B1B] text-sm">
                    Phát hiện 3 — Upload khó không nằm ở thao tác kéo thả
                  </div>
                  <p className="text-[#5A4030] leading-relaxed">
                    Người dùng không gặp khó khăn với việc chọn file hay kéo thả. Khó khăn lớn nhất nằm ở việc: <em>“Tôi cần tải tài liệu gì? Lấy ở đâu? Định dạng nào được chấp nhận?”</em>
                  </p>
                  <div className="p-3.5 rounded bg-emerald-50 border border-emerald-200 text-[#14532D] space-y-1">
                    <strong className="block text-sm">Điều chỉnh thiết kế:</strong>
                    <div>Nhóm hồ sơ theo 4 nhóm rõ ràng; bổ sung mô tả loại hồ sơ, kỳ dữ liệu kế toán, định dạng (PDF/XLSX), dung lượng tối đa và chỉ dẫn các trường hợp bắt buộc.</div>
                  </div>
                </div>
              )}

              {activeFindingTab === 3 && (
                <div className="space-y-3 text-xs sm:text-sm animate-fade-in">
                  <div className="font-bold text-[#991B1B] text-sm">
                    Phát hiện 4 — Confirmation phải ưu tiên thông tin quyết định
                  </div>
                  <p className="text-[#5A4030] leading-relaxed">
                    Nếu hiển thị toàn bộ hàng chục trường dữ liệu cùng lúc, màn xác nhận trở nên quá dài và gây quá tải thông tin cho người ký duyệt.
                  </p>
                  <div className="p-3.5 rounded bg-emerald-50 border border-emerald-200 text-[#14532D] space-y-1">
                    <strong className="block text-sm">Điều chỉnh thiết kế:</strong>
                    <div>Sử dụng nguyên tắc: <strong>Summary trước</strong> + <strong>Xem thêm khi cần</strong> thay vì show tất cả dữ liệu chi tiết theo mặc định.</div>
                  </div>
                </div>
              )}

              {activeFindingTab === 4 && (
                <div className="space-y-3 text-xs sm:text-sm animate-fade-in">
                  <div className="font-bold text-[#991B1B] text-sm">
                    Phát hiện 5 — Return phải chỉ rõ Action
                  </div>
                  <p className="text-[#5A4030] leading-relaxed">
                    Thông báo chung chung kiểu: <em>“Phương án chưa hợp lệ”</em> là không đủ. Maker cần biết cụ thể MB trả lại vì sao, sai ở bước nào, cần sửa file gì và bước tiếp theo là gì.
                  </p>
                  <div className="p-3.5 rounded bg-emerald-50 border border-emerald-200 text-[#14532D] space-y-2">
                    <strong className="block text-sm">Concept sau Testing:</strong>
                    <div className="p-2.5 rounded bg-white border border-emerald-300 font-sans text-xs text-slate-800 space-y-1">
                      <div className="font-bold text-[#991B1B]">MB cần bạn cập nhật 2 nội dung:</div>
                      <div>• <strong>Thông tin phương án:</strong> Mục đích sử dụng vốn chưa đầy đủ.</div>
                      <div>• <strong>Thông tin hồ sơ:</strong> Báo cáo tài chính chưa đúng kỳ.</div>
                      <div className="pt-1 font-bold text-blue-700">CTA: [Chỉnh sửa phương án] ➔ Điều hướng thẳng tới trường cần sửa</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* =========================================================================
         * CHAPTER VI — BẢO VỆ GIẢI PHÁP VỚI GIÁM ĐỐC DỰ ÁN
         * ========================================================================= */}
        <section id="sec-06" className="space-y-7 scroll-mt-20">
          <div className="space-y-3">
            <span className="px-3 py-1 rounded-[4px] bg-[#E8D9BE] text-[#5A4030] text-xs sm:text-sm font-bold uppercase tracking-wider">
              VI / BẢO VỆ GIẢI PHÁP VỚI GIÁM ĐỐC DỰ ÁN
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#2D1B12]">
              Đóng gói Product Proposal và chốt Scope MVP
            </h2>
            <p className="text-base sm:text-lg text-[#5A4030] leading-relaxed max-w-4xl">
              Sau khi Concept được kiểm chứng bằng Usability Testing, tôi cùng PO đóng gói giải pháp thành bộ hồ sơ đề xuất sản phẩm hoàn chỉnh để bảo vệ trước Giám đốc dự án.
            </p>
          </div>

          {/* 10 Thành tố của Product Proposal */}
          <div className="p-5 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] space-y-3">
            <div className="text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase tracking-wider">
              1. 10 THÀNH TỐ ĐÓNG GÓI TRONG PRODUCT PROPOSAL
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs sm:text-sm font-semibold text-[#2D1B12] pt-1">
              {[
                '1. Business Requirement',
                '2. Product Problem',
                '3. User Flow',
                '4. Clickable Prototype',
                '5. Kết quả Testing',
                '6. Model Maker–Approver–MB',
                '7. Return Flow',
                '8. MVP Scope',
                '9. Constraints',
                '10. Expected Outcome'
              ].map((item, idx) => (
                <div key={idx} className="p-2.5 rounded bg-[#FFF8E7] border border-[#DFC9A2] text-center">
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* 2. Scope MVP theo 3 vai trò */}
          <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-3.5">
            <div className="text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase tracking-wider">
              2. PHẠM VI MVP ĐƯỢC PHÊ DUYỆT (MVP SCOPE)
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-[8px] bg-blue-50/60 border border-blue-200 space-y-2">
                <div className="font-bold text-[#1E40AF] text-sm">Maker (Khởi tạo)</div>
                <div className="space-y-1 text-slate-700">
                  <div>• Chọn phương án trung dài hạn</div>
                  <div>• Khởi tạo & chọn nhu cầu vốn</div>
                  <div>• Điền thông tin theo Dynamic Form</div>
                  <div>• Kiểm tra thông tin doanh nghiệp prefill</div>
                  <div>• Upload hồ sơ theo 4 nhóm</div>
                  <div>• Review & Gửi người phê duyệt</div>
                  <div>• Nhận thông báo & Sửa nếu MB trả lại</div>
                </div>
              </div>

              <div className="p-4 rounded-[8px] bg-purple-50/60 border border-purple-200 space-y-2">
                <div className="font-bold text-[#6B21A8] text-sm">Approver (Phê duyệt)</div>
                <div className="space-y-1 text-slate-700">
                  <div>• Nhận thông báo yêu cầu phương án mới</div>
                  <div>• Review tóm tắt (Decision Layer)</div>
                  <div>• Xem chi tiết các tài liệu đính kèm</div>
                  <div>• Phê duyệt & Ký gửi sang MBBank</div>
                </div>
              </div>

              <div className="p-4 rounded-[8px] bg-amber-50/60 border border-amber-200 space-y-2">
                <div className="font-bold text-[#92400E] text-sm">MBBank (Xử lý)</div>
                <div className="space-y-1 text-slate-700">
                  <div>• Tiếp nhận phương án qua hệ thống</div>
                  <div>• Thẩm định thông tin & hồ sơ</div>
                  <div>• Phê duyệt cấp hạn mức</div>
                  <div>• Hoặc: Trả lại kèm lý do chi tiết</div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Decision Loop */}
          <div className="p-4 sm:p-5 rounded-[10px] bg-[#FFF4D6] border border-[#DFC9A2] text-xs sm:text-sm text-[#4A2414] space-y-1.5">
            <div className="font-bold uppercase tracking-wider text-[#8C4312]">3. Decision Loop</div>
            <p className="leading-relaxed">
              Nếu giải pháp chưa đạt: <strong>Feedback ➔ PO + Product Designer điều chỉnh ➔ Update Prototype ➔ Review lại.</strong> Sau khi giải pháp được Giám đốc dự án chính thức phê duyệt, tính năng được chuyển tiếp sang giai đoạn Refinement và lập kế hoạch kỹ thuật.
            </p>
          </div>
        </section>

        {/* =========================================================================
         * CHAPTER VII — REFINEMENT VÀ LẬP KẾ HOẠCH
         * ========================================================================= */}
        <section id="sec-07" className="space-y-7 scroll-mt-20">
          <div className="space-y-3">
            <span className="px-3 py-1 rounded-[4px] bg-[#E8D9BE] text-[#5A4030] text-xs sm:text-sm font-bold uppercase tracking-wider">
              VII / REFINEMENT VÀ LẬP KẾ HOẠCH
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#2D1B12]">
              Hiện thực hóa giải pháp cùng BA & Development
            </h2>
            <p className="text-base sm:text-lg text-[#5A4030] leading-relaxed max-w-4xl">
              Trong các phiên Refinement, tôi đồng hành cùng BA phân tích nghiệp vụ chuyên sâu và Development đánh giá tính khả thi kỹ thuật.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 sm:p-5 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-xs space-y-2">
              <div className="font-bold text-[#7A3F1F] text-xs sm:text-sm uppercase">1. BA Analysis</div>
              <p className="text-xs text-[#5A4030] leading-relaxed">
                BA phân tích sâu: Business Rule, Data Mapping giữa hệ thống cũ và mới, Validation từng trường, Phân quyền người dùng, Trạng thái (Status), File Rule và Return Rule.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-xs space-y-2">
              <div className="font-bold text-[#7A3F1F] text-xs sm:text-sm uppercase">2. Dev Assessment</div>
              <p className="text-xs text-[#5A4030] leading-relaxed">
                Dev đánh giá: API Prefill dữ liệu DN, Dynamic Form logic, cơ chế Upload đa tệp, Auto-save ngầm, Quản lý State cho Saved Proposals và luồng Return / Resubmit an toàn.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-xs space-y-2">
              <div className="font-bold text-[#7A3F1F] text-xs sm:text-sm uppercase">3. Vai trò Designer</div>
              <p className="text-xs text-[#5A4030] leading-relaxed">
                Làm rõ tường tận mọi trạng thái UI: Required / Optional, Read-only / Editable, Validation message, Error state, Loading state, Auto-save state, Confirmation và Responsive layout.
              </p>
            </div>
          </div>

          {/* 4. Một số Edge Case quan trọng */}
          <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-3.5">
            <div className="text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#B86428]" />
              <span>4. MỘT SỐ EDGE CASE QUAN TRỌNG ĐÃ ĐƯỢC XỬ LÝ</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs sm:text-sm">
              <div className="p-3.5 rounded bg-[#FFF8E7] border border-[#DFC9A2] space-y-1">
                <strong className="text-[#2D1B12] block">Auto-save thất bại</strong>
                <p className="text-slate-600 text-xs">Người dùng phải luôn biết dữ liệu gần nhất đã được lưu ở thời điểm nào, tránh mất thông tin khi gián đoạn mạng.</p>
              </div>

              <div className="p-3.5 rounded bg-[#FFF8E7] border border-[#DFC9A2] space-y-1">
                <strong className="text-[#2D1B12] block">Upload thất bại</strong>
                <p className="text-slate-600 text-xs">Lỗi upload từng file không được làm mất các trường dữ liệu hay các file khác đã tải lên thành công trước đó.</p>
              </div>

              <div className="p-3.5 rounded bg-[#FFF8E7] border border-[#DFC9A2] space-y-1">
                <strong className="text-[#2D1B12] block">Thông tin DN thay đổi</strong>
                <p className="text-slate-600 text-xs">Làm rõ trường nào được phép edit ngay, trường nào là dữ liệu pháp lý cần xác minh qua giấy ĐKKD mới nhất.</p>
              </div>

              <div className="p-3.5 rounded bg-[#FFF8E7] border border-[#DFC9A2] space-y-1">
                <strong className="text-[#2D1B12] block">Approver xử lý phiên bản cũ</strong>
                <p className="text-slate-600 text-xs">Tránh Version Conflict nếu Maker đang sửa bản ghi trong lúc Approver đang mở màn hình xem xét.</p>
              </div>

              <div className="p-3.5 rounded bg-[#FFF8E7] border border-[#DFC9A2] space-y-1 col-span-1 sm:col-span-2">
                <strong className="text-[#2D1B12] block">MB trả lại yêu cầu</strong>
                <p className="text-slate-600 text-xs">Chỉ những nội dung MB yêu cầu sửa mới mở trạng thái chỉnh sửa; toàn bộ thông tin và hồ sơ hợp lệ khác được giữ nguyên vẹn 100%.</p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
         * CHAPTER VIII — UAT SẢN PHẨM
         * ========================================================================= */}
        <section id="sec-08" className="space-y-7 scroll-mt-20">
          <div className="space-y-3">
            <span className="px-3 py-1 rounded-[4px] bg-[#E8D9BE] text-[#5A4030] text-xs sm:text-sm font-bold uppercase tracking-wider">
              VIII / UAT SẢN PHẨM
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#2D1B12]">
              Kiểm thử chấp nhận người dùng qua hai lớp
            </h2>
            <p className="text-base sm:text-lg text-[#5A4030] leading-relaxed max-w-4xl">
              Sau khi Dev bàn giao, tôi tham gia trực tiếp vào đợt UAT để kiểm tra đồng thời cả hai khía cạnh: Tính năng (Functional) và Trải nghiệm (Experience).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 sm:p-5 rounded-[10px] bg-[#EFF6FF] border border-[#BFDBFE] space-y-1.5">
              <div className="font-bold text-[#1E40AF] text-sm sm:text-base">1. Functional Validation</div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Kiểm tra sản phẩm có chạy đúng theo logic nghiệp vụ không: API load đúng, submit thành công, lưu bản ghi vào CSDL chính xác.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-[10px] bg-[#F0FDF4] border border-[#86EFAC] space-y-1.5">
              <div className="font-bold text-[#15803D] text-sm sm:text-base">2. Experience Validation</div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Kiểm tra sản phẩm sau khi build thực tế có còn giữ đúng trải nghiệm đã thiết kế: Micro-interactions, spacing, feedback message, sự mượt mà và dễ hiểu cho người dùng.
              </p>
            </div>
          </div>

          {/* Các kịch bản chính trong UAT */}
          <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-3.5">
            <div className="text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase tracking-wider">
              CÁC SCENARIOS CHÍNH ĐÃ ĐƯỢC NGHIỆM THU TRONG UAT
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs sm:text-sm">
              <div className="p-3 rounded bg-[#FFF8E7] border border-[#DFC9A2]">
                <strong>Happy Path:</strong> Khởi tạo → Phương án → Doanh nghiệp → Hồ sơ → Xác nhận → Approver → MB.
              </div>
              <div className="p-3 rounded bg-[#FFF8E7] border border-[#DFC9A2]">
                <strong>Dynamic Form:</strong> Mua xe / Dự án / Khác hiển thị đúng các trường tương ứng.
              </div>
              <div className="p-3 rounded bg-[#FFF8E7] border border-[#DFC9A2]">
                <strong>Save & Resume:</strong> Lưu đúng và khôi phục (restore) chính xác dữ liệu khi quay lại.
              </div>
              <div className="p-3 rounded bg-[#FFF8E7] border border-[#DFC9A2]">
                <strong>Prefill:</strong> Dữ liệu doanh nghiệp được load chuẩn xác từ Core Banking.
              </div>
              <div className="p-3 rounded bg-[#FFF8E7] border border-[#DFC9A2]">
                <strong>Upload:</strong> Đúng file, đúng trạng thái tải lên, đúng validation định dạng.
              </div>
              <div className="p-3 rounded bg-[#FFF8E7] border border-[#DFC9A2]">
                <strong>Confirmation:</strong> Thông tin tổng hợp phải khớp 100% dữ liệu đã nhập ở ba bước trước.
              </div>
              <div className="p-3 rounded bg-[#FFF8E7] border border-[#DFC9A2]">
                <strong>Permission:</strong> Maker / Approver được phân quyền đúng chức danh nghiệp vụ.
              </div>
              <div className="p-3 rounded bg-[#FFF8E7] border border-[#DFC9A2]">
                <strong>Return:</strong> MB trả đúng phương án kèm lý do rõ ràng cho Maker.
              </div>
              <div className="p-3 rounded bg-[#FFF8E7] border border-[#DFC9A2]">
                <strong>Resubmit:</strong> Maker chỉnh sửa và gửi lại thành công mà không làm mất dữ liệu cũ.
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
         * CHAPTER IX — GO-LIVE VÀ ĐO LƯỜNG
         * ========================================================================= */}
        <section id="sec-09" className="space-y-7 scroll-mt-20">
          <div className="space-y-3">
            <span className="px-3 py-1 rounded-[4px] bg-[#E8D9BE] text-[#5A4030] text-xs sm:text-sm font-bold uppercase tracking-wider">
              IX / GO-LIVE VÀ ĐO LƯỜNG
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#2D1B12]">
              Đo lường một Feature 0→1 bằng Production Data
            </h2>
            <p className="text-base sm:text-lg text-[#5A4030] leading-relaxed max-w-4xl">
              Do trước đó chưa tồn tại Journey Digital tương đương, tôi không sử dụng so sánh kiểu <em>Before Conversion → After Conversion</em>. Thay vào đó, Funnel được thiết kế và theo dõi trực tiếp từ Production Data.
            </p>
          </div>

          {/* 12-Step Funnel Visualizer */}
          <div className="p-5 sm:p-7 rounded-[12px] bg-[#FFFDF6] border-2 border-[#DFC9A2] shadow-[0_3px_0_#D4C39B] space-y-4">
            <div className="text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase tracking-wider flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#B86428]" />
              <span>PHỄU THEO DÕI TOÀN HÀNH TRÌNH (12 BƯỚC PRODUCTION FUNNEL)</span>
            </div>

            <div className="space-y-1.5 text-xs sm:text-sm">
              {[
                { step: '01', title: 'Eligible Customer', desc: 'Khách hàng doanh nghiệp đủ điều kiện cấp tín dụng trên hệ thống' },
                { step: '02', title: 'Truy cập Đề nghị cấp tín dụng', desc: 'Khách hàng truy cập vào module Tín dụng & Tài trợ thương mại' },
                { step: '03', title: 'Chọn Phương án trung dài hạn', desc: 'Click chọn phân hệ phương án trung dài hạn' },
                { step: '04', title: 'Khởi tạo phương án', desc: 'Bắt đầu luồng lập hồ sơ tín dụng' },
                { step: '05', title: 'Hoàn thành Thông tin phương án', desc: 'Hoàn tất bước 1 (Dynamic Form theo nhu cầu vốn)' },
                { step: '06', title: 'Hoàn thành Thông tin doanh nghiệp', desc: 'Kiểm tra và xác nhận bước 2 (Dữ liệu prefill)' },
                { step: '07', title: 'Hoàn thành Hồ sơ', desc: 'Tải lên đầy đủ 4 nhóm tài liệu yêu cầu tại bước 3' },
                { step: '08', title: 'Xác nhận (Review)', desc: 'Maker kiểm tra tổng thể và xác nhận tại bước 4' },
                { step: '09', title: 'Gửi Approver', desc: 'Chuyển hồ sơ sang cấp thẩm quyền phê duyệt nội bộ' },
                { step: '10', title: 'Approver phê duyệt', desc: 'Lãnh đạo doanh nghiệp ký duyệt và submit sang MB' },
                { step: '11', title: 'MB tiếp nhận & xử lý', desc: 'Đơn vị nghiệp vụ ngân hàng thẩm định phương án' },
                { step: '12', title: 'MB phê duyệt hạn mức', desc: 'Hoàn tất cấp hạn mức tín dụng trung dài hạn' }
              ].map((f, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-[6px] bg-[#FFF8E7] border border-[#DFC9A2] flex items-center justify-between hover:bg-[#FFECC2] transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded bg-[#B86428] text-white text-xs font-mono font-bold flex items-center justify-center">
                      {f.step}
                    </span>
                    <span className="font-bold text-[#2D1B12]">{f.title}</span>
                  </div>
                  <span className="text-xs text-[#6B513C] hidden sm:inline">{f.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 9 Chỉ số chính */}
          <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-3.5">
            <div className="text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase tracking-wider">
              9 CHỈ SỐ CỐT LÕI ĐƯỢC GẮN TELEMETRY THEO DÕI
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs sm:text-sm">
              <div className="p-3 rounded bg-[#FFF8E7] border border-[#DFC9A2] space-y-1">
                <strong className="text-[#2D1B12] block">1. Feature Reach</strong>
                <p className="text-slate-600 text-xs">Bao nhiêu khách hàng đủ điều kiện truy cập vào tính năng?</p>
              </div>
              <div className="p-3 rounded bg-[#FFF8E7] border border-[#DFC9A2] space-y-1">
                <strong className="text-[#2D1B12] block">2. Start Rate</strong>
                <p className="text-slate-600 text-xs">Bao nhiêu khách truy cập thực sự bấm bắt đầu tạo phương án?</p>
              </div>
              <div className="p-3 rounded bg-[#FFF8E7] border border-[#DFC9A2] space-y-1">
                <strong className="text-[#2D1B12] block">3. Step Completion</strong>
                <p className="text-slate-600 text-xs">Điểm drop-off (rời bỏ luồng) nằm ở bước nào trong 4 bước?</p>
              </div>
              <div className="p-3 rounded bg-[#FFF8E7] border border-[#DFC9A2] space-y-1">
                <strong className="text-[#2D1B12] block">4. Submit Rate</strong>
                <p className="text-slate-600 text-xs">Bao nhiêu Maker hoàn thành và gửi được tới Approver?</p>
              </div>
              <div className="p-3 rounded bg-[#FFF8E7] border border-[#DFC9A2] space-y-1">
                <strong className="text-[#2D1B12] block">5. Approval Rate</strong>
                <p className="text-slate-600 text-xs">Bao nhiêu yêu cầu được Approver trong doanh nghiệp phê duyệt?</p>
              </div>
              <div className="p-3 rounded bg-[#FFF8E7] border border-[#DFC9A2] space-y-1">
                <strong className="text-[#2D1B12] block">6. MB Return Rate</strong>
                <p className="text-slate-600 text-xs">Bao nhiêu phương án bị MB trả lại để yêu cầu bổ sung?</p>
              </div>
              <div className="p-3 rounded bg-[#FFF8E7] border border-[#DFC9A2] space-y-1">
                <strong className="text-[#2D1B12] block">7. Return Recovery</strong>
                <p className="text-slate-600 text-xs">Bao nhiêu phương án bị trả lại được Maker sửa và Submit lại?</p>
              </div>
              <div className="p-3 rounded bg-[#FFF8E7] border border-[#DFC9A2] space-y-1">
                <strong className="text-[#2D1B12] block">8. MB Approval Rate</strong>
                <p className="text-slate-600 text-xs">Bao nhiêu phương án cuối cùng được MB phê duyệt hạn mức?</p>
              </div>
              <div className="p-3 rounded bg-[#FFF8E7] border border-[#DFC9A2] space-y-1">
                <strong className="text-[#2D1B12] block">9. Time to Submit</strong>
                <p className="text-slate-600 text-xs">Maker mất bao lâu thời gian active để hoàn thành phần việc của mình?</p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
         * CHAPTER X — KẾT QUẢ BAN ĐẦU
         * ========================================================================= */}
        <section id="sec-10" className="space-y-7 scroll-mt-20">
          <div className="space-y-3">
            <span className="px-3 py-1 rounded-[4px] bg-[#E8D9BE] text-[#5A4030] text-xs sm:text-sm font-bold uppercase tracking-wider">
              X / KẾT QUẢ BAN ĐẦU
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#2D1B12]">
              Đọc kết quả: Phân biệt giữa "Where" và "Why"
            </h2>
            <div className="p-3.5 rounded bg-[#FFF4D6] border border-[#DFC9A2] text-xs sm:text-sm text-[#8C4312] italic">
              <strong>Lưu ý về số liệu:</strong> Dưới đây là khung số liệu chuẩn để hoàn thiện case study portfolio (định dạng [XX]% theo quy định bảo mật thông tin ngân hàng).
            </div>
          </div>

          {/* Metric Cards Portfolio Presentation */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
            <div className="p-4 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-xs text-center space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-[#B86428] font-mono">[XX]%</div>
              <div className="text-xs text-[#5A4030] font-semibold">Khách truy cập đã bắt đầu tạo phương án</div>
            </div>
            <div className="p-4 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-xs text-center space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-[#B86428] font-mono">[XX]%</div>
              <div className="text-xs text-[#5A4030] font-semibold">Maker hoàn thành gửi tới Approver</div>
            </div>
            <div className="p-4 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-xs text-center space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-[#B86428] font-mono">[XX]%</div>
              <div className="text-xs text-[#5A4030] font-semibold">Approver hoàn tất phê duyệt nội bộ</div>
            </div>
            <div className="p-4 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-xs text-center space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-[#B86428] font-mono">[XX]%</div>
              <div className="text-xs text-[#5A4030] font-semibold">Phương án bị MB trả lại yêu cầu bổ sung</div>
            </div>
            <div className="p-4 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-xs text-center space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-[#15803D] font-mono">[XX]%</div>
              <div className="text-xs text-[#5A4030] font-semibold">Phương án được Maker sửa và submit lại</div>
            </div>
            <div className="p-4 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-xs text-center space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-[#15803D] font-mono">[XX phút]</div>
              <div className="text-xs text-[#5A4030] font-semibold">Median Active Time để Maker hoàn tất Journey</div>
            </div>
          </div>

          {/* Cách đọc kết quả */}
          <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-3">
            <div className="text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase tracking-wider">
              1. CÁCH ĐỌC KẾT QUẢ — VẤN ĐỀ TIẾP THEO NẰM Ở ĐÂU?
            </div>
            <p className="text-sm sm:text-base text-[#5A4030] leading-relaxed">
              Kết quả không chỉ dùng để chứng minh sản phẩm “thành công”. Nó phải giúp trả lời: <strong>Vấn đề tiếp theo nằm ở đâu?</strong>
            </p>
            <div className="p-4 rounded bg-[#FFF8E7] border border-[#DFC9A2] space-y-2 text-xs sm:text-sm">
              <p className="text-[#3E2718] leading-relaxed">
                Ví dụ: Nếu Drop-off lớn nhất nằm ở bước Upload hồ sơ ➔ Tuyệt đối không vội vàng redesign component Upload. Cần tiếp tục đào sâu: <em>Người dùng thiếu tài liệu? Không hiểu tài liệu? Không có file đúng kỳ? File quá lớn? Hay không đúng định dạng?</em>
              </p>
              <div className="p-2.5 rounded bg-white border border-[#DFC9A2] text-xs font-bold text-[#8C4312]">
                Product Analytics chỉ cho biết: "WHERE" (Ở đâu). Research tiếp tục giải thích: "WHY" (Vì sao).
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
         * CHAPTER XI — NHỮNG QUYẾT ĐỊNH THIẾT KẾ QUAN TRỌNG NHẤT
         * ========================================================================= */}
        <section id="sec-11" className="space-y-7 scroll-mt-20">
          <div className="space-y-3">
            <span className="px-3 py-1 rounded-[4px] bg-[#E8D9BE] text-[#5A4030] text-xs sm:text-sm font-bold uppercase tracking-wider">
              XI / QUYẾT ĐỊNH THIẾT KẾ QUAN TRỌNG NHẤT
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#2D1B12]">
              5 Điểm sáng tạo giá trị lớn nhất của dự án
            </h2>
            <p className="text-base sm:text-lg text-[#5A4030] leading-relaxed max-w-4xl">
              Nếu recruiter hay giám khảo chỉ nhớ 5 điều về case study này, tôi muốn họ nhớ 5 quyết định thiết kế then chốt:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-5 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-xs space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#B86428] text-white flex items-center justify-center font-bold text-sm">1</div>
              <div className="font-bold text-[#2D1B12] text-base">Dynamic Proposal Form</div>
              <p className="text-xs sm:text-sm text-[#5A4030] leading-relaxed">
                Form thay đổi linh hoạt theo nhu cầu sử dụng vốn thay vì bắt tất cả khách hàng đi qua cùng một bộ trường cứng nhắc.
              </p>
            </div>

            <div className="p-5 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-xs space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#B86428] text-white flex items-center justify-center font-bold text-sm">2</div>
              <div className="font-bold text-[#2D1B12] text-base">Tái sử dụng dữ liệu doanh nghiệp</div>
              <p className="text-xs sm:text-sm text-[#5A4030] leading-relaxed">
                Khách hàng kiểm tra và cập nhật dữ liệu hiện có từ MB thay vì phải gõ lại từ đầu, giảm thiểu sai lệch và rào cản thao tác.
              </p>
            </div>

            <div className="p-5 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-xs space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#B86428] text-white flex items-center justify-center font-bold text-sm">3</div>
              <div className="font-bold text-[#2D1B12] text-base">Save & Resume</div>
              <p className="text-xs sm:text-sm text-[#5A4030] leading-relaxed">
                Một hành trình tín dụng dài và phức tạp có thể được hoàn thành thuận tiện qua nhiều phiên làm việc mà không sợ mất dữ liệu.
              </p>
            </div>

            <div className="p-5 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-xs space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#B86428] text-white flex items-center justify-center font-bold text-sm">4</div>
              <div className="font-bold text-[#2D1B12] text-base">Structured Document Upload</div>
              <p className="text-xs sm:text-sm text-[#5A4030] leading-relaxed">
                Hồ sơ được cấu trúc theo 4 nhóm nghiệp vụ chặt chẽ kèm hướng dẫn chuẩn, thay vì một danh sách file upload rời rạc.
              </p>
            </div>

            <div className="p-5 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-xs space-y-2 col-span-1 md:col-span-2 lg:col-span-2">
              <div className="w-8 h-8 rounded-full bg-[#B86428] text-white flex items-center justify-center font-bold text-sm">5</div>
              <div className="font-bold text-[#2D1B12] text-base">Maker → Approver → MB Workflow & Return Loop</div>
              <p className="text-xs sm:text-sm text-[#5A4030] leading-relaxed">
                Sản phẩm được thiết kế như một Workflow đa vai trò hoàn chỉnh. Đặc biệt, MB Return được thiết kế như một trạng thái chính thức của Journey với action rõ ràng, không phải một System Error bế tắc.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
         * CHAPTER XII — NHỮNG GÌ TÔI HỌC ĐƯỢC
         * ========================================================================= */}
        <section id="sec-12" className="space-y-7 scroll-mt-20">
          <div className="space-y-3">
            <span className="px-3 py-1 rounded-[4px] bg-[#E8D9BE] text-[#5A4030] text-xs sm:text-sm font-bold uppercase tracking-wider">
              XII / NHỮNG GÌ TÔI HỌC ĐƯỢC
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#2D1B12]">
              5 Chiêm nghiệm nghề nghiệp từ dự án B2B Lending
            </h2>
          </div>

          <div className="space-y-3.5">
            {[
              {
                num: '1',
                title: 'B2B không phải trải nghiệm của một Persona đơn lẻ',
                desc: 'Trong cùng một Transaction: Maker tạo, Approver quyết định, MB xử lý. UX phải giúp các vai trò phối hợp trơn tru chứ không chỉ tối ưu thao tác cho một người.'
              },
              {
                num: '2',
                title: 'Một Form dài không nhất thiết phải ngắn hơn',
                desc: 'Đôi khi nghiệp vụ tài chính bắt buộc phải có nhiều thông tin. Mục tiêu của Design không phải là "xóa thật nhiều field", mà là chỉ hỏi đúng thông tin, đúng lúc, đúng ngữ cảnh và cho phép người dùng dừng rồi tiếp tục.'
              },
              {
                num: '3',
                title: 'Prefill cũng tạo ra vấn đề UX mới',
                desc: 'Load dữ liệu lên giúp giảm effort, nhưng đồng thời tạo ra câu hỏi: "Dữ liệu này có được sửa không?". Một giải pháp tốt phải phân định rõ ràng giữa dữ liệu lưu trữ và dữ liệu được phép cập nhật.'
              },
              {
                num: '4',
                title: 'Return không phải Error',
                desc: 'System Error là khi một hành động kỹ thuật không thể thực hiện. Business Return là Journey vẫn đang tiếp tục nhưng cần bổ sung thông tin. Hai trạng thái này cần hai trải nghiệm hoàn toàn khác nhau.'
              },
              {
                num: '5',
                title: 'Production mới là nơi kiểm chứng sản phẩm thực sự',
                desc: 'Prototype cho biết người dùng có thể sử dụng hay không trong môi trường giả lập. Dữ liệu Production mới phản ánh chính xác người dùng thực sự sử dụng sản phẩm như thế nào.'
              }
            ].map((item, idx) => (
              <div key={idx} className="p-4 sm:p-5 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-xs space-y-1.5">
                <div className="font-bold text-[#2D1B12] text-sm sm:text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-[#FFF4D6] border border-[#DFC9A2] text-[#B86428] flex items-center justify-center font-bold text-xs">{item.num}</span>
                  <span>{item.title}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#5A4030] leading-relaxed pl-8">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
         * CHAPTER XIII — ĐIỀU TÔI SẼ LÀM TỐT HƠN
         * ========================================================================= */}
        <section id="sec-13" className="space-y-7 scroll-mt-20">
          <div className="space-y-3">
            <span className="px-3 py-1 rounded-[4px] bg-[#E8D9BE] text-[#5A4030] text-xs sm:text-sm font-bold uppercase tracking-wider">
              XIII / ĐIỀU TÔI SẼ LÀM TỐT HƠN
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#2D1B12]">
              Tự soi rọi để hoàn thiện năng lực Product Designer
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-[12px] bg-[#FFF5F5] border border-[#FECDD3] space-y-2">
              <div className="font-bold text-[#991B1B] text-sm sm:text-base">1. Xác định Measurement Framework sớm hơn</div>
              <p className="text-xs sm:text-sm text-[#5E3A32] leading-relaxed">
                Ngay từ khâu Concept cần định nghĩa chi tiết: Event taxonomy, Step completion, Drop-off gates, Save draft, Resume, Approver time và Return / Resubmit logs.
              </p>
            </div>

            <div className="p-5 rounded-[12px] bg-[#FFF5F5] border border-[#FECDD3] space-y-2">
              <div className="font-bold text-[#991B1B] text-sm sm:text-base">2. Test vai trò Approver sớm hơn</div>
              <p className="text-xs sm:text-sm text-[#5E3A32] leading-relaxed">
                Ở giai đoạn đầu, sự chú ý thường tập trung vào Maker vì Maker có nhiều màn hình nhất. Nhưng Approver (CEO/CFO) mới là Decision Maker quyết định tốc độ duyệt.
              </p>
            </div>

            <div className="p-5 rounded-[12px] bg-[#FFF5F5] border border-[#FECDD3] space-y-2">
              <div className="font-bold text-[#991B1B] text-sm sm:text-base">3. Nghiên cứu nghiệp vụ Upload sâu hơn</div>
              <p className="text-xs sm:text-sm text-[#5E3A32] leading-relaxed">
                UI Upload có thể đơn giản, nhưng việc chuẩn bị hồ sơ nội bộ lại là một Service Problem lớn hơn rất nhiều: <em>"Khách hàng lấy từng tài liệu từ phòng ban nào?"</em>
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
         * CHAPTER XIV — VÒNG CẢI TIẾN TIẾP THEO
         * ========================================================================= */}
        <section id="sec-14" className="space-y-7 scroll-mt-20">
          <div className="space-y-3">
            <span className="px-3 py-1 rounded-[4px] bg-[#E8D9BE] text-[#5A4030] text-xs sm:text-sm font-bold uppercase tracking-wider">
              XIV / VÒNG CẢI TIẾN TIẾP THEO
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#2D1B12]">
              Lộ trình nâng cấp tính năng trong các Sprint kế tiếp
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-xs space-y-1.5">
              <div className="font-bold text-[#B86428] text-sm">1. Hướng dẫn hồ sơ theo ngữ cảnh</div>
              <p className="text-[#5A4030] leading-relaxed">Mỗi tài liệu bổ sung mô tả rõ: Kỳ dữ liệu kế toán, định dạng file, file mẫu và gợi ý đầu mối nội bộ phụ trách.</p>
            </div>

            <div className="p-4 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-xs space-y-1.5">
              <div className="font-bold text-[#B86428] text-sm">2. Return Summary Portal</div>
              <p className="text-[#5A4030] leading-relaxed">Một màn hình tổng kết duy nhất hiển thị: <em>“MB cần bạn cập nhật 2 nội dung”</em> kèm deep-link đi thẳng tới phần cần sửa.</p>
            </div>

            <div className="p-4 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-xs space-y-1.5">
              <div className="font-bold text-[#B86428] text-sm">3. Version History Tracking</div>
              <p className="text-[#5A4030] leading-relaxed">Trực quan hóa lịch sử thay đổi: <em>V1 gửi MB ➔ MB Feedback ➔ V2 đã cập nhật</em> giúp khách hàng dễ dàng đối chiếu.</p>
            </div>

            <div className="p-4 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-xs space-y-1.5">
              <div className="font-bold text-[#B86428] text-sm">4. Tối ưu hóa Approver Journey</div>
              <p className="text-[#5A4030] leading-relaxed">Theo dõi chi tiết thời gian: <em>Maker gửi ➔ Approver mở ➔ Approver quyết định</em> để tìm điểm nghẽn phê duyệt.</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
         * CHAPTER XV — QUY TRÌNH PHÁT TRIỂN SẢN PHẨM
         * ========================================================================= */}
        <section id="sec-15" className="space-y-7 scroll-mt-20">
          <div className="space-y-3">
            <span className="px-3 py-1 rounded-[4px] bg-[#E8D9BE] text-[#5A4030] text-xs sm:text-sm font-bold uppercase tracking-wider">
              XV / QUY TRÌNH PHÁT TRIỂN SẢN PHẨM
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#2D1B12]">
              Vòng lặp phát triển khép kín từ Request đến Next Iteration
            </h2>
          </div>

          <div className="p-5 sm:p-7 rounded-[12px] bg-[#FFFDF6] border-2 border-[#DFC9A2] shadow-[0_3px_0_#D4C39B] space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs sm:text-sm">
              {[
                { step: '1', title: 'Nhận yêu cầu', desc: 'Từ Sếp / Kinh doanh với mục tiêu mở rộng điểm khởi tạo số' },
                { step: '2', title: 'Phân tích yêu cầu', desc: 'Bóc tách Problem, User persona, Business logic và Constraints' },
                { step: '3', title: 'Xây dựng Concept cùng PO', desc: 'Thiết kế User Flow, Wireframe, Prototype và hệ thống UI' },
                { step: '4', title: 'Usability Testing', desc: 'Thu thập Evidence, phát hiện Pattern, đúc kết Insight và Iterate' },
                { step: '5', title: 'Bảo vệ với Giám đốc dự án', desc: 'Review Product Proposal, tiếp nhận Feedback và Approve MVP' },
                { step: '6', title: 'Refinement & Planning', desc: 'BA Analysis, Dev Assessment, chốt Edge cases và Acceptance Criteria' },
                { step: '7', title: 'UAT sản phẩm', desc: 'Nghiệm thu cả 2 lớp: Functional logic và Experience fidelity' },
                { step: '8', title: 'Go-live & Cải tiến', desc: 'Measure Funnel, Rút ra bài học và quay lại vòng phát triển tiếp theo (↺)' }
              ].map((s, idx) => (
                <div key={idx} className="p-3.5 rounded-[8px] bg-[#FFF8E7] border border-[#DFC9A2] space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#B86428] text-white flex items-center justify-center font-bold text-xs">
                      {s.step}
                    </span>
                    <span className="font-bold text-[#2D1B12]">{s.title}</span>
                  </div>
                  <p className="text-xs text-[#5A4030] leading-relaxed pl-7">{s.desc}</p>
                </div>
              ))}
            </div>

            <div className="p-3 rounded bg-[#FFF4D6] border border-[#DFC9A2] text-xs font-bold text-[#8C4312] text-center">
              ↺ Quy trình khép kín: Measure ➔ Learn ➔ Optimize ➔ Quay lại vòng phát triển tiếp theo
            </div>
          </div>
        </section>

        {/* =========================================================================
         * CHAPTER XVI — KẾT LUẬN
         * ========================================================================= */}
        <section id="sec-16" className="space-y-7 scroll-mt-20">
          <div className="space-y-3">
            <span className="px-3 py-1 rounded-[4px] bg-[#E8D9BE] text-[#5A4030] text-xs sm:text-sm font-bold uppercase tracking-wider">
              XVI / KẾT LUẬN
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#2D1B12]">
              Giá trị thực sự của Product Design trong dự án
            </h2>
          </div>

          <div className="p-6 sm:p-8 rounded-[12px] bg-[#FFF4D6] border-2 border-[#B86428] shadow-[0_4px_0_#9E875C] space-y-4">
            <p className="text-base sm:text-lg text-[#3E2718] leading-relaxed">
              Dự án bắt đầu bằng một yêu cầu: <strong>“Xây dựng tính năng cấp hạn mức trung dài hạn trên BIZ MBBank.”</strong>
            </p>
            <p className="text-sm sm:text-base text-[#5A4030] leading-relaxed">
              Nhưng sản phẩm cuối cùng không đơn giản là bốn màn hình: <em>Thông tin phương án → Thông tin doanh nghiệp → Thông tin hồ sơ → Xác nhận.</em>
            </p>
            <p className="text-sm sm:text-base text-[#5A4030] leading-relaxed">
              Phía sau bốn bước đó là một Workflow lớn hơn: <strong>Maker khởi tạo → Chuẩn bị phương án → Approver phê duyệt → MB xử lý → Phê duyệt hoặc trả lại → Maker chỉnh sửa → Submit lại.</strong>
            </p>
            <div className="p-4 sm:p-5 rounded-[10px] bg-white border border-[#DFC9A2] text-base sm:text-lg font-bold text-[#8C4312] leading-relaxed">
              "Giá trị của Product Design trong dự án này không nằm ở số lượng màn hình đã thiết kế. Nó nằm ở việc biến một quy trình tín dụng phức tạp thành một hành trình số có cấu trúc, cho phép nhiều vai trò phối hợp với nhau, duy trì được context qua nhiều phiên làm việc và tạo ra dữ liệu thực tế để sản phẩm tiếp tục được cải tiến sau Go-live."
            </div>
            <div className="pt-2 text-xs sm:text-sm font-mono font-bold text-[#7A3F1F] tracking-wide text-center">
              Từ Business Request ➔ Product Concept ➔ User Validation ➔ Production ➔ Data ➔ Next Iteration.
            </div>
          </div>
        </section>
      </div>

      {/* =========================================================================
       * LIGHTBOX MODAL: FULL RESOLUTION WORKFLOW DIAGRAM
       * ========================================================================= */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-white text-xs sm:text-sm font-bold">
              <div className="flex items-center gap-2">
                <Workflow className="w-4 h-4 text-amber-400" />
                <span>SƠ ĐỒ HÀNH TRÌNH 4 BƯỚC & WORKFLOW MAKER – APPROVER – MB</span>
              </div>
              <button
                onClick={() => setLightboxImage(null)}
                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-slate-200 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-bold text-amber-400 text-base">HÀNH TRÌNH SỐ 4 BƯỚC CHÍNH (MAKER)</div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-slate-300">
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">1. Thông tin phương án (Dynamic)</div>
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">2. Thông tin doanh nghiệp (Prefill)</div>
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">3. Thông tin hồ sơ (4 Nhóm)</div>
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">4. Xác nhận (Review Layer)</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-bold text-sky-400 text-base">WORKFLOW ĐA VAI TRÒ & MB RETURN LOOP</div>
                <div className="p-3 rounded bg-slate-900 border border-slate-800 space-y-1 text-slate-300">
                  <div>• <strong>Maker:</strong> Lập phương án ➔ Gửi phê duyệt nội bộ.</div>
                  <div>• <strong>Approver:</strong> Kiểm tra Decision Summary ➔ Ký duyệt gửi MBBank.</div>
                  <div>• <strong>MBBank:</strong> Tiếp nhận thẩm định ➔ Phê duyệt hoặc Trả lại có lý do.</div>
                  <div>• <strong>Return Loop:</strong> Maker nhận phản hồi ➔ Sửa đúng 2 mục MB yêu cầu ➔ Gửi lại MB.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

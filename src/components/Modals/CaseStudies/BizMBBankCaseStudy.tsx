import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  GitBranch,
  CornerDownRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Users,
  Building,
  Calendar,
  Layers,
  FileText,
  Clock,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Lightbulb,
  Workflow,
  Search,
  Maximize2,
  Play,
  Pause,
  Volume2,
  VolumeX,
  X,
  Shield,
  HelpCircle,
  ExternalLink,
  Target,
  FileCheck,
  Send,
  Eye,
  CheckSquare,
  Activity,
  FileUp,
  UserCheck,
  RotateCcw,
  Check,
  Smartphone,
  Monitor,
  ShieldCheck,
  Zap,
  MessageSquare,
  AlertTriangle,
  Compass,
  ArrowUpRight,
  BarChart3,
  GitCompare,
  RefreshCw,
  Briefcase,
  Database
} from 'lucide-react';
import { ProjectItem } from '../../../types';

interface BizMBBankCaseStudyProps {
  project: ProjectItem;
  onBack: () => void;
}

const CHAPTERS = [
  { id: 'sec-01', num: '01', title: 'Tổng quan' },
  { id: 'sec-02', num: '02', title: 'Phân tích yêu cầu' },
  { id: 'sec-03', num: '03', title: 'Research' },
  { id: 'sec-04', num: '04', title: 'Concept' },
  { id: 'sec-05', num: '05', title: 'Usability Testing' },
  { id: 'sec-06', num: '06', title: 'Chỉnh sửa sau test' },
  { id: 'sec-07', num: '07', title: 'Bảo vệ sản phẩm' },
  { id: 'sec-08', num: '08', title: 'Technical Refinement' },
  { id: 'sec-09', num: '09', title: 'UAT' },
  { id: 'sec-10', num: '10', title: 'Bài học rút ra' }
];

export const BizMBBankCaseStudy: React.FC<BizMBBankCaseStudyProps> = ({
  project,
  onBack
}) => {
  const [activeChapter, setActiveChapter] = useState('sec-01');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [activeTestTab, setActiveTestTab] = useState<'after' | 'before'>('after');
  const [activeIteration, setActiveIteration] = useState<number>(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isMutedVideo, setIsMutedVideo] = useState(true);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const chapterNavRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Kéo chuột để cuộn mượt cho máy tính (Mouse drag-to-scroll)
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

  // Cuộn lên đầu khi mở hoặc chuyển project
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [project.id]);

  // Hỗ trợ lăn chuột dọc -> cuộn ngang mượt mà (Mouse Wheel Redirect)
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

  // Nhận diện chương đang xem khi cuộn nội dung
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

  // Tự động cuộn nút chapter tương ứng vào giữa khung nhìn
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
       * FIXED SUBHEADER: SYNCHRONIZED PARCHMENT & WOOD CHAPTER NAVIGATION
       * ========================================================================= */}
      <div className="shrink-0 z-20 px-3 sm:px-5 py-2.5 bg-[#FFF4D6] border-b-2 border-[#DFC9A2] shadow-xs flex items-center gap-2 relative select-none">
        {/* Scroll Left Button */}
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

        {/* Chapter Buttons Track */}
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
                <span className="ml-1.5 text-[#4A3326] font-medium">
                  • {c.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Scroll Right Button */}
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
       * SCROLLABLE CASE STUDY CONTENT BODY (PARCHMENT CANVAS)
       * ========================================================================= */}
      <div
        ref={scrollContainerRef}
        id="casestudy-body-container"
        className="flex-1 overflow-y-auto p-4 sm:p-7 md:p-8 space-y-12 sm:space-y-16 bg-[#FFF8E7] text-[#2D1B12] voxel-scrollbar font-sans pb-24 relative text-sm sm:text-base"
      >
        {/* =========================================================================
         * CHAPTER 01 — TỔNG QUAN DỰ ÁN & PROJECT SNAPSHOT
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
                WEB & MOBILE
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#2D1B12] tracking-tight leading-[1.2]">
              Thiết kế hành trình vay trung dài hạn cho khách hàng doanh nghiệp
            </h1>

            {/* Core Mission Quote */}
            <div className="p-4 sm:p-5 rounded-[10px] bg-[#FFF4D6] border-l-4 border-[#B86428] text-base sm:text-lg text-[#4A2414] font-medium italic shadow-xs leading-relaxed">
              "Số hóa một hành trình tín dụng phức tạp mà không đánh đổi sự rõ ràng, khả năng kiểm soát và vai trò tư vấn của Relationship Manager."
            </div>
          </div>

          {/* Hero Thumbnail Image Showcase - Lấy từ danh sách bên ngoài */}
          <div className="rounded-[12px] overflow-hidden border-2 sm:border-3 border-[#CBB892] shadow-[0_6px_0_#A89571,0_12px_24px_rgba(0,0,0,0.1)] relative bg-[#1E293B]">
            <img
              src={project.imageUrl || '/assets/projects/project-1-mbbank.png'}
              alt={project.title}
              className="w-full h-auto max-h-[560px] object-cover object-center"
            />
          </div>

          {/* Project Metadata Matrix (4 Columns) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            <div className="p-4 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-1.5">
              <div className="text-xs uppercase tracking-wider font-bold text-[#7A3F1F]">Vai trò</div>
              <div className="text-base font-bold text-[#2D1B12]">Product Designer</div>
              <div className="text-xs sm:text-sm text-[#6B513C]">Lead UX & Strategy</div>
            </div>
            <div className="p-4 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-1.5">
              <div className="text-xs uppercase tracking-wider font-bold text-[#7A3F1F]">Thời gian</div>
              <div className="text-base font-bold text-[#2D1B12]">6 Tháng</div>
              <div className="text-xs sm:text-sm text-[#6B513C]">End-to-End Delivery</div>
            </div>
            <div className="p-4 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-1.5">
              <div className="text-xs uppercase tracking-wider font-bold text-[#7A3F1F]">Đối tượng</div>
              <div className="text-base font-bold text-[#2D1B12]">Upper SME & CIB</div>
              <div className="text-xs sm:text-sm text-[#6B513C]">Quy mô vừa & lớn</div>
            </div>
            <div className="p-4 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-1.5">
              <div className="text-xs uppercase tracking-wider font-bold text-[#7A3F1F]">Phối hợp liên chức năng</div>
              <div className="text-xs sm:text-sm font-semibold text-[#2D1B12] leading-snug">PO, Business, BA, RM, Credit, Dev, QA</div>
            </div>
          </div>

          {/* Phạm vi toàn trình - Đẩy xuống dòng dưới & có icon minh họa từng đầu mục */}
          <div className="p-4 sm:p-5 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-wider font-bold text-[#7A3F1F] flex items-center gap-1.5">
                <Workflow className="w-4 h-4 text-[#B86428]" />
                <span>Phạm vi toàn trình (End-to-End Design Scope)</span>
              </div>
              <span className="text-[11px] font-bold text-[#8C5832] bg-[#FFF4D6] px-2.5 py-0.5 rounded border border-[#DFC9A2]">
                8 Giai đoạn thực thi
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 pt-1">
              {[
                { label: 'Discovery', icon: <Search className="w-4 h-4 text-blue-600" />, desc: 'Khám phá' },
                { label: 'Concept', icon: <Lightbulb className="w-4 h-4 text-amber-600" />, desc: 'Ý tưởng' },
                { label: 'Validation', icon: <UserCheck className="w-4 h-4 text-emerald-600" />, desc: 'Kiểm chứng' },
                { label: 'Review', icon: <Eye className="w-4 h-4 text-indigo-600" />, desc: 'Đánh giá' },
                { label: 'Refinement', icon: <RotateCcw className="w-4 h-4 text-purple-600" />, desc: 'Tinh chỉnh' },
                { label: 'UAT', icon: <CheckSquare className="w-4 h-4 text-teal-600" />, desc: 'Kiểm thử' },
                { label: 'Go-live', icon: <Send className="w-4 h-4 text-rose-600" />, desc: 'Triển khai' },
                { label: 'Optimization', icon: <TrendingUp className="w-4 h-4 text-green-600" />, desc: 'Tối ưu hóa' }
              ].map((step, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-[6px] bg-[#FFF8E7] border border-[#DFC9A2] flex flex-col items-center text-center hover:bg-[#FFECC2] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-white border border-[#DFC9A2] flex items-center justify-center shadow-xs mb-1.5 group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                  <span className="text-xs font-bold text-[#2D1B12] leading-tight">{step.label}</span>
                  <span className="text-[10px] text-[#7A3F1F] mt-0.5">{step.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Deep Dive Problem Framing */}
          <div className="p-5 sm:p-7 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_3px_0_#D4C39B] space-y-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase tracking-wider border-b border-[#EAD9B0] pb-3">
              <Briefcase className="w-4 h-4 text-[#B86428]" />
              <span>01. TỔNG QUAN — MỘT HÀNH TRÌNH GIÁ TRỊ CAO NHƯNG VẪN PHỤ THUỘC NHIỀU VÀO CON NGƯỜI</span>
            </div>

            <p className="text-base sm:text-lg text-[#4A3326] leading-relaxed">
              Vay trung dài hạn là một trong những hành trình tài chính quan trọng đối với khách hàng doanh nghiệp. Nguồn vốn này thường phục vụ những nhu cầu lớn như:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-1">
              {['Đầu tư máy móc', 'Mở rộng nhà xưởng', 'Mua phương tiện', 'Triển khai dự án', 'Mở rộng SXKD'].map((item, idx) => (
                <div key={idx} className="p-3 rounded-[6px] bg-[#FFF8E7] border border-[#DFC9A2] text-xs sm:text-sm font-semibold text-[#3B1D0F] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#B86428]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <p className="text-sm sm:text-base text-[#5A4030] leading-relaxed pt-1">
              Tuy nhiên, hành trình hiện tại vẫn phụ thuộc nhiều vào RM, tài liệu offline và việc trao đổi qua nhiều kênh rời rạc.
            </p>

            {/* Business Request vs Real Product Framing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 sm:p-5 rounded-[8px] bg-[#FFF5EB] border border-[#FCD34D] space-y-2">
                <div className="text-xs sm:text-sm font-bold text-[#B45309] uppercase flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-[#D97706]" />
                  <span>Yêu cầu ban đầu từ Business</span>
                </div>
                <p className="text-sm sm:text-base text-[#451A03] font-medium leading-relaxed italic">
                  "Đưa hành trình vay trung dài hạn lên BIZ MBBank, giúp khách hàng có thể chủ động khởi tạo nhu cầu vay trên kênh số."
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-[8px] bg-[#F0FDF4] border border-[#86EFAC] space-y-2">
                <div className="text-xs sm:text-sm font-bold text-[#15803D] uppercase flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-[#16A34A]" />
                  <span>Nhận định của PO & Product Designer</span>
                </div>
                <p className="text-sm sm:text-base text-[#14532D] font-medium leading-relaxed italic">
                  "Làm thế nào để khách hàng hiểu mình cần chuẩn bị gì, phối hợp được với các vai trò trong doanh nghiệp và luôn biết điều gì sẽ xảy ra tiếp theo trong một hành trình tín dụng phức tạp?"
                </p>
              </div>
            </div>
          </div>

          {/* PROJECT SNAPSHOT SCORECARD */}
          <div className="p-5 sm:p-7 rounded-[12px] bg-[#FFFDF6] border-2 border-[#DFC9A2] shadow-[0_3px_0_#D4C39B] space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#EAD9B0] pb-3 gap-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#2D1B12] uppercase tracking-wider">
                <BarChart3 className="w-4 h-4 text-[#B86428]" />
                <span>PROJECT SNAPSHOT — ĐỐI CHIẾU TRƯỚC VÀ SAU 8 TUẦN GO-LIVE</span>
              </div>
              <span className="text-xs font-bold text-[#8C5832] uppercase tracking-wider bg-[#FFF4D6] px-3 py-1 rounded border border-[#DFC9A2]">
                Dữ liệu mô phỏng chuẩn xác
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Cột 1: Trước cải tiến */}
              <div className="p-4 sm:p-5 rounded-[10px] bg-[#FFF5F5] border border-[#FECDD3] space-y-3.5">
                <div className="text-xs sm:text-sm font-bold text-[#991B1B] uppercase flex items-center justify-between">
                  <span>TRƯỚC CẢI TIẾN</span>
                  <span className="px-2 py-0.5 rounded bg-rose-100 text-xs font-mono">Baseline</span>
                </div>
                <div className="space-y-3 text-sm text-[#5E3A32]">
                  <div className="p-3 rounded bg-white/90 border border-rose-200 space-y-1">
                    <div className="text-2xl font-black text-[#991B1B]">34%</div>
                    <div>Khách hàng bắt đầu luồng hoàn thành việc gửi yêu cầu.</div>
                  </div>
                  <div className="p-3 rounded bg-white/90 border border-rose-200 space-y-1">
                    <div className="text-2xl font-black text-[#991B1B]">41%</div>
                    <div>Rời bỏ tại giai đoạn chuẩn bị hồ sơ.</div>
                  </div>
                  <div className="p-3 rounded bg-white/90 border border-rose-200 space-y-1">
                    <div className="text-2xl font-black text-[#991B1B]">38%</div>
                    <div>Hồ sơ đã gửi cần bổ sung ít nhất một lần.</div>
                  </div>
                  <div className="p-3 rounded bg-white/90 border border-rose-200 space-y-1">
                    <div className="text-2xl font-black text-[#991B1B]">47%</div>
                    <div>Yêu cầu cần RM hỗ trợ trước khi khách hàng có thể submit.</div>
                  </div>
                </div>
              </div>

              {/* Cột 2: Sau 8 tuần go-live */}
              <div className="p-4 sm:p-5 rounded-[10px] bg-[#F0FDF4] border border-[#BBF7D0] space-y-3.5">
                <div className="text-xs sm:text-sm font-bold text-[#15803D] uppercase flex items-center justify-between">
                  <span>SAU 8 TUẦN GO-LIVE</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-xs font-mono">Post Go-live</span>
                </div>
                <div className="space-y-3 text-sm text-[#14532D]">
                  <div className="p-3 rounded bg-white/90 border border-emerald-200 space-y-1">
                    <div className="text-2xl font-black text-[#15803D]">52%</div>
                    <div>Tỷ lệ hoàn thành gửi yêu cầu thành công.</div>
                  </div>
                  <div className="p-3 rounded bg-white/90 border border-emerald-200 space-y-1">
                    <div className="text-2xl font-black text-[#15803D]">24%</div>
                    <div>Hồ sơ cần bổ sung (giảm đáng kể tỷ lệ làm lại).</div>
                  </div>
                  <div className="p-3 rounded bg-white/90 border border-emerald-200 space-y-1">
                    <div className="text-2xl font-black text-[#15803D]">31 phút</div>
                    <div>Thời gian active trung vị để hoàn thành (giảm từ 52 phút).</div>
                  </div>
                  <div className="p-3 rounded bg-white/90 border border-emerald-200 space-y-1">
                    <div className="text-2xl font-black text-[#15803D]">29%</div>
                    <div>Yêu cầu cần RM hỗ trợ trước submit.</div>
                  </div>
                </div>
              </div>

              {/* Cột 3: Kết quả chính */}
              <div className="p-4 sm:p-5 rounded-[10px] bg-[#FFFBEB] border border-[#FDE68A] space-y-3.5 md:col-span-2 lg:col-span-1">
                <div className="text-xs sm:text-sm font-bold text-[#B45309] uppercase flex items-center justify-between">
                  <span>KẾT QUẢ CỐT LÕI</span>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-xs font-mono">Key Impact</span>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-2.5 text-sm">
                  <div className="p-3.5 rounded-lg bg-white/95 border border-amber-300 space-y-1">
                    <div className="text-2xl font-black text-[#15803D]">+18 điểm %</div>
                    <div className="text-[#5A4030] font-bold">Completion Rate</div>
                  </div>
                  <div className="p-3.5 rounded-lg bg-white/95 border border-amber-300 space-y-1">
                    <div className="text-2xl font-black text-[#15803D]">−14 điểm %</div>
                    <div className="text-[#5A4030] font-bold">Hồ sơ bổ sung</div>
                  </div>
                  <div className="p-3.5 rounded-lg bg-white/95 border border-amber-300 space-y-1">
                    <div className="text-2xl font-black text-[#15803D]">−40%</div>
                    <div className="text-[#5A4030] font-bold">Thời gian hoàn thành</div>
                  </div>
                  <div className="p-3.5 rounded-lg bg-white/95 border border-amber-300 space-y-1">
                    <div className="text-2xl font-black text-[#15803D]">−18 điểm %</div>
                    <div className="text-[#5A4030] font-bold">RM Intervention</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
         * CHAPTER 02 — TỪ YÊU CẦU KINH DOANH ĐẾN BÀI TOÁN SẢN PHẨM
         * ========================================================================= */}
        <section id="sec-02" className="space-y-7 scroll-mt-20">
          <div className="space-y-3">
            <span className="px-3 py-1 rounded-[4px] bg-[#E8D9BE] text-[#5A4030] text-xs sm:text-sm font-bold uppercase tracking-wider">
              02 / PHÂN TÍCH YÊU CẦU
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#2D1B12]">
              Từ yêu cầu kinh doanh đến bài toán sản phẩm
            </h2>
            <p className="text-base sm:text-lg text-[#5A4030] leading-relaxed max-w-4xl">
              Yêu cầu bắt đầu từ Business, không phải từ một UX Problem. Yêu cầu sản phẩm được chuyển từ Business xuống Product Owner. Ở thời điểm đầu tiên, solution khá đơn giản: <em>“Cho phép doanh nghiệp đăng ký nhu cầu vay trung dài hạn trên BIZ MBBank.”</em>
            </p>
            <p className="text-sm sm:text-base text-[#4A3326] font-semibold">
              Tôi cùng PO chưa đi thẳng vào wireframe. Chúng tôi bóc tách yêu cầu thành bốn lớp bài toán:
            </p>
          </div>

          {/* Bento Grid 4 Lớp bài toán */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Lớp 1: Business */}
            <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-3.5">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1E3A8A] uppercase">
                <Target className="w-4 h-4 text-[#2563EB]" />
                <span>1. BUSINESS (NGÂN HÀNG CẦN)</span>
              </div>
              <ul className="space-y-2.5 text-sm sm:text-base text-[#334155]">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#2563EB] font-bold text-base">✓</span>
                  <span>Gia tăng tỷ lệ khách hàng chủ động khởi tạo nhu cầu vay.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#2563EB] font-bold text-base">✓</span>
                  <span>Số hóa một phần hành trình tín dụng.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#2563EB] font-bold text-base">✓</span>
                  <span>Giảm thao tác hỗ trợ lặp lại của Relationship Manager (RM).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#2563EB] font-bold text-base">✓</span>
                  <span>Thu thập nhu cầu và hồ sơ có cấu trúc ngay từ đầu.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#2563EB] font-bold text-base">✓</span>
                  <span>Tạo nền tảng chuẩn để mở rộng các hành trình Lending khác sau này.</span>
                </li>
              </ul>
            </div>

            {/* Lớp 2: Customer */}
            <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-3.5">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#15803D] uppercase">
                <Users className="w-4 h-4 text-[#16A34A]" />
                <span>2. CUSTOMER (KHÁCH HÀNG CẦN)</span>
              </div>
              <ul className="space-y-2.5 text-sm sm:text-base text-[#334155]">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#16A34A] font-bold text-base">✓</span>
                  <span>Hiểu điều kiện trước khi bắt đầu để không mất thời gian vô ích.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#16A34A] font-bold text-base">✓</span>
                  <span>Biết chính xác cần chuẩn bị tài liệu gì cho mục đích của mình.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#16A34A] font-bold text-base">✓</span>
                  <span>Không phải nhập lại thông tin doanh nghiệp mà ngân hàng đã có.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#16A34A] font-bold text-base">✓</span>
                  <span>Phối hợp mượt mà giữa người lập hồ sơ và người duyệt có thẩm quyền.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#16A34A] font-bold text-base">✓</span>
                  <span>Theo dõi được tiến độ minh bạch và có RM hỗ trợ khi tình huống phức tạp.</span>
                </li>
              </ul>
            </div>

            {/* Lớp 3: Operation */}
            <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-3.5">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#B45309] uppercase">
                <ShieldCheck className="w-4 h-4 text-[#D97706]" />
                <span>3. OPERATION (VẬN HÀNH PHẢI KIỂM SOÁT)</span>
              </div>
              <ul className="space-y-2.5 text-sm sm:text-base text-[#334155]">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#D97706] font-bold text-base">●</span>
                  <span>Rà soát chặt chẽ điều kiện tín dụng và tuân thủ quy chế NHNN.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#D97706] font-bold text-base">●</span>
                  <span>Hồ sơ bắt buộc theo quy định pháp lý tín dụng trung dài hạn.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#D97706] font-bold text-base">●</span>
                  <span>Kiểm soát vai trò Maker / Approver theo ủy quyền doanh nghiệp.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#D97706] font-bold text-base">●</span>
                  <span>Xử lý các trường hợp ngoại lệ, thời hạn hiệu lực của hồ sơ và quy trình chuyển RM.</span>
                </li>
              </ul>
            </div>

            {/* Lớp 4: Technology */}
            <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-3.5">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase">
                <Database className="w-4 h-4 text-[#B86428]" />
                <span>4. TECHNOLOGY (GIỚI HẠN CÔNG NGHỆ & THỜI ĐIỂM)</span>
              </div>
              <p className="text-sm sm:text-base text-[#5A4030] leading-relaxed">
                Không phải toàn bộ hành trình đều có thể số hóa ngay trong MVP. Một số bước như:
              </p>
              <div className="grid grid-cols-2 gap-2.5 text-xs sm:text-sm text-[#4A3326] font-medium pt-0.5">
                <div className="p-2.5 rounded bg-[#FFF8E7] border border-[#DFC9A2]">Thẩm định chuyên sâu</div>
                <div className="p-2.5 rounded bg-[#FFF8E7] border border-[#DFC9A2]">Đánh giá tài sản bảo đảm</div>
                <div className="p-2.5 rounded bg-[#FFF8E7] border border-[#DFC9A2]">Phê duyệt tín dụng cuối</div>
                <div className="p-2.5 rounded bg-[#FFF8E7] border border-[#DFC9A2]">Khoản vay cấu trúc đặc thù</div>
              </div>
              <p className="text-xs sm:text-sm text-[#6B513C] italic pt-1">
                ...vẫn bắt buộc cần nghiệp vụ chuyên môn và con người tham gia trực tiếp.
              </p>
            </div>
          </div>

          {/* First Core Principle Statement */}
          <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFF4D6] border-2 border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] flex items-start gap-3.5">
            <Shield className="w-6 h-6 text-[#B86428] shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <div className="text-xs sm:text-sm font-bold text-[#B86428] uppercase tracking-wider">
                NGUYÊN TẮC THIẾT KẾ ĐẦU TIÊN CỦA DỰ ÁN
              </div>
              <p className="text-base sm:text-lg font-bold text-[#2D1B12] leading-relaxed">
                "Không cố gắng thay thế toàn bộ quy trình tín dụng bằng digital. Hãy số hóa những phần khách hàng có thể chủ động, và tạo handoff tốt ở những phần vẫn cần con người."
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
         * CHAPTER 03 — BENCHMARK ĐỐI THỦ VÀ HÌNH THÀNH GIẢ THUYẾT
         * ========================================================================= */}
        <section id="sec-03" className="space-y-7 scroll-mt-20">
          <div className="space-y-3">
            <span className="px-3 py-1 rounded-[4px] bg-[#E8D9BE] text-[#5A4030] text-xs sm:text-sm font-bold uppercase tracking-wider">
              03 / RESEARCH
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#2D1B12]">
              Benchmark đối thủ và hình thành giả thuyết
            </h2>
            <p className="text-base sm:text-lg text-[#5A4030] leading-relaxed max-w-4xl">
              Trước khi thiết kế, chúng tôi muốn biết thị trường đang giải bài toán này thế nào. Tôi tiến hành benchmark đa chiều:
            </p>
          </div>

          {/* Benchmark Scope Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5 text-center">
            <div className="p-4 sm:p-5 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-xs">
              <div className="text-3xl font-black text-[#2D1B12]">8</div>
              <div className="text-xs sm:text-sm text-[#7A3F1F] font-bold mt-1">Ngân hàng trong nước</div>
            </div>
            <div className="p-4 sm:p-5 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-xs">
              <div className="text-3xl font-black text-[#2D1B12]">3</div>
              <div className="text-xs sm:text-sm text-[#7A3F1F] font-bold mt-1">SME Banking Quốc tế</div>
            </div>
            <div className="p-4 sm:p-5 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-xs">
              <div className="text-3xl font-black text-[#2D1B12]">2</div>
              <div className="text-xs sm:text-sm text-[#7A3F1F] font-bold mt-1">B2B Lending Ngoài ngành</div>
            </div>
            <div className="p-4 sm:p-5 rounded-[10px] bg-[#FFF4D6] border-2 border-[#DFC9A2] shadow-xs flex flex-col justify-center">
              <div className="text-3xl font-black text-[#B86428]">13</div>
              <div className="text-xs sm:text-sm text-[#4A2414] font-bold uppercase mt-1">Sản phẩm / Hành trình phân tích</div>
            </div>
          </div>

          {/* 7 Benchmark Criteria Pills */}
          <div className="p-4 sm:p-5 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] space-y-2.5">
            <div className="text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase tracking-wider">
              7 TIÊU CHÍ SO SÁNH BENCHMARK ĐƯỢC CHUẨN HÓA
            </div>
            <div className="flex flex-wrap gap-2.5 pt-1">
              {[
                '1. Entry point',
                '2. Eligibility',
                '3. Số bước đăng ký',
                '4. Document requirement',
                '5. Save draft',
                '6. Maker / Approver',
                '7. Tracking & human support'
              ].map((crit, idx) => (
                <span key={idx} className="px-3.5 py-2 rounded-[5px] bg-[#FFF8E7] border border-[#DFC9A2] text-xs sm:text-sm font-semibold text-[#2D1B12]">
                  {crit}
                </span>
              ))}
            </div>
          </div>

          {/* 5 Notable Patterns */}
          <div className="space-y-3.5">
            <div className="text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#B86428]" />
              <span>5 PATTERN NỔI BẬT RÚT RA TỪ THỊ TRƯỜNG</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 sm:p-5 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                  Pattern 01
                </span>
                <div className="text-base font-bold text-[#2D1B12]">Eligibility trước Form</div>
                <p className="text-xs sm:text-sm text-[#5A4030] leading-relaxed">
                  Các trải nghiệm tốt nhất không bắt người dùng điền toàn bộ form thông tin dài dòng rồi mới báo doanh nghiệp không phù hợp điều kiện.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A] bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                  Pattern 02
                </span>
                <div className="text-base font-bold text-[#2D1B12]">Progressive Disclosure</div>
                <p className="text-xs sm:text-sm text-[#5A4030] leading-relaxed">
                  Chỉ hỏi những thông tin cần thiết theo từng giai đoạn, giảm tải nhận thức và tránh gây sốc tải trọng dữ liệu cho người khởi tạo.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D97706] bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                  Pattern 03
                </span>
                <div className="text-base font-bold text-[#2D1B12]">Contextual Checklist</div>
                <p className="text-xs sm:text-sm text-[#5A4030] leading-relaxed">
                  Danh sách hồ sơ tự động biến đổi động theo nhu cầu vay, loại tài sản và ngành nghề thay vì dùng một checklist chung cồng kềnh.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7C3AED] bg-purple-50 px-2.5 py-0.5 rounded border border-purple-200">
                  Pattern 04
                </span>
                <div className="text-base font-bold text-[#2D1B12]">Draft Recovery</div>
                <p className="text-xs sm:text-sm text-[#5A4030] leading-relaxed">
                  Luồng tài chính doanh nghiệp dài ngày bắt buộc phải có khả năng lưu nháp tự động và dễ dàng quay lại tiếp tục mà không mất dữ liệu.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-2 col-span-1 md:col-span-2 lg:col-span-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#B86428] bg-orange-50 px-2.5 py-0.5 rounded border border-orange-200">
                  Pattern 05
                </span>
                <div className="text-base font-bold text-[#2D1B12]">Human Handoff có ngữ cảnh</div>
                <p className="text-xs sm:text-sm text-[#5A4030] leading-relaxed">
                  Các sản phẩm B2B phức tạp luôn duy trì chuyên gia tư vấn (RM), nhưng việc chuyển giao phải giữ nguyên 100% dữ liệu đã nhập, không bắt khách hàng lặp lại thông tin.
                </p>
              </div>
            </div>
          </div>

          {/* 4 Hypotheses Grid */}
          <div className="p-5 sm:p-7 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_3px_0_#D4C39B] space-y-4">
            <div className="text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase tracking-wider flex items-center gap-2">
              <Target className="w-4 h-4 text-[#B86428]" />
              <span>4 GIẢ THUYẾT BAN ĐẦU (INITIAL HYPOTHESES)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-[8px] bg-[#FFF8E7] border border-[#DFC9A2] space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-[#B86428] text-white flex items-center justify-center font-bold text-xs">H1</span>
                  <span className="font-bold text-[#2D1B12] text-sm sm:text-base">Rào cản chuẩn bị hồ sơ</span>
                </div>
                <p className="text-xs sm:text-sm text-[#5A4030] leading-relaxed pl-9">
                  Khách hàng bỏ luồng không phải vì không có nhu cầu, mà vì chưa hiểu mình cần chuẩn bị những gì trước khi bắt đầu.
                </p>
              </div>

              <div className="p-4 rounded-[8px] bg-[#FFF8E7] border border-[#DFC9A2] space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-[#B86428] text-white flex items-center justify-center font-bold text-xs">H2</span>
                  <span className="font-bold text-[#2D1B12] text-sm sm:text-base">Gánh nặng checklist tĩnh</span>
                </div>
                <p className="text-xs sm:text-sm text-[#5A4030] leading-relaxed pl-9">
                  Một checklist hồ sơ giống nhau cho mọi khách hàng tạo ra gánh nặng tâm lý và thao tác không cần thiết.
                </p>
              </div>

              <div className="p-4 rounded-[8px] bg-[#FFF8E7] border border-[#DFC9A2] space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-[#B86428] text-white flex items-center justify-center font-bold text-xs">H3</span>
                  <span className="font-bold text-[#2D1B12] text-sm sm:text-base">Hai vai trò - Hai trải nghiệm</span>
                </div>
                <p className="text-xs sm:text-sm text-[#5A4030] leading-relaxed pl-9">
                  Người lập hồ sơ (Maker) và người phê duyệt (Approver) cần hai trải nghiệm và mức độ chi tiết thông tin hoàn toàn khác nhau.
                </p>
              </div>

              <div className="p-4 rounded-[8px] bg-[#FFF8E7] border border-[#DFC9A2] space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-[#B86428] text-white flex items-center justify-center font-bold text-xs">H4</span>
                  <span className="font-bold text-[#2D1B12] text-sm sm:text-base">Handoff thông minh cho RM</span>
                </div>
                <p className="text-xs sm:text-sm text-[#5A4030] leading-relaxed pl-9">
                  RM vẫn bắt buộc cần tồn tại trong hành trình, nhưng tuyệt đối không nên yêu cầu khách hàng phải cung cấp lại thông tin đã nhập trên kênh số.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
         * CHAPTER 04 — CONCEPT ĐẦU TIÊN: FLOW TRƯỚC, UI SAU
         * ========================================================================= */}
        <section id="sec-04" className="space-y-7 scroll-mt-20">
          <div className="space-y-3">
            <span className="px-3 py-1 rounded-[4px] bg-[#E8D9BE] text-[#5A4030] text-xs sm:text-sm font-bold uppercase tracking-wider">
              04 / CONCEPT
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#2D1B12]">
              Concept đầu tiên — Flow trước, UI sau
            </h2>
            <p className="text-base sm:text-lg text-[#5A4030] leading-relaxed max-w-4xl">
              Từ business requirement và benchmark, tôi cùng PO xây dựng User Flow đầu tiên trước khi vẽ bất kỳ màn hình chi tiết nào.
            </p>
          </div>

          {/* Complete Authentic User Flow Diagram (Flow V1) */}
          <div className="p-5 sm:p-7 rounded-[12px] bg-[#FFFDF6] border-2 border-[#DFC9A2] shadow-[0_3px_0_#D4C39B] space-y-5">
            {/* Header Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#EAD9B0] pb-3 gap-2.5">
              <div>
                <div className="text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase tracking-wider flex items-center gap-2">
                  <Workflow className="w-4 h-4 text-[#B86428]" />
                  <span>SƠ ĐỒ USER FLOW TOÀN BỘ LUỒNG (FLOW V1)</span>
                </div>
                <p className="text-xs text-[#6B513C] mt-0.5">
                  11 Bước nghiệp vụ • 3 Vai trò phối hợp liên thông • 3 Điểm rẽ nhánh điều kiện (Decision Gates)
                </p>
              </div>

              {/* Legend Badges */}
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold">
                <span className="px-2.5 py-1 rounded-[4px] bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                  <span>Maker (Kế toán)</span>
                </span>
                <span className="px-2.5 py-1 rounded-[4px] bg-[#FAF5FF] border border-[#E9D5FF] text-[#6B21A8] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#9333EA]" />
                  <span>Approver (CEO/CFO)</span>
                </span>
                <span className="px-2.5 py-1 rounded-[4px] bg-[#F0FDF4] border border-[#BBF7D0] text-[#166534] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
                  <span>Bank & RM MB</span>
                </span>
                <span className="px-2.5 py-1 rounded-[4px] bg-[#FFFBEB] border border-[#FDE68A] text-[#92400E] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-[1px] bg-[#D97706] rotate-45" />
                  <span>Decision Gate</span>
                </span>
              </div>
            </div>

            {/* User Flow Canvas */}
            <div className="space-y-6 pt-1">
              {/* =========================================================================
               * SWIMLANE 1: MAKER (KẾ TOÁN VIÊN / KẾ TOÁN TRƯỞNG)
               * ========================================================================= */}
              <div className="rounded-[10px] bg-[#F8FAFC] border-2 border-[#BFDBFE]/80 overflow-hidden shadow-xs">
                {/* Lane Header */}
                <div className="bg-[#EFF6FF] px-4 py-2.5 border-b border-[#BFDBFE] flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#1E40AF] uppercase tracking-wider">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />
                    <span>LANE 01: VAI TRÒ MAKER (KẾ TOÁN VIÊN & KẾ TOÁN TRƯỞNG)</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#1E40AF] bg-[#DBEAFE] px-2.5 py-0.5 rounded font-semibold">
                    BIZ MBBank Web Portal
                  </span>
                </div>

                <div className="p-4 sm:p-6 space-y-4">
                  {/* Start Node */}
                  <div className="flex justify-center">
                    <div className="px-4 py-2 rounded-full bg-[#1E293B] text-white text-xs sm:text-sm font-bold shadow-md flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                      <span>BẮT ĐẦU: Doanh nghiệp phát sinh nhu cầu cấp hạn mức TDH</span>
                    </div>
                  </div>

                  {/* Flow Arrow Down */}
                  <div className="flex justify-center">
                    <div className="w-0.5 h-5 bg-[#94A3B8]" />
                  </div>

                  {/* Step 01 & Step 02 Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {/* Step 01 */}
                    <div className="p-4 rounded-[8px] bg-white border border-[#CBD5E1] shadow-xs space-y-1.5 hover:border-blue-500 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          BƯỚC 01 • KHÁM PHÁ
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">Landing & Calculator</span>
                      </div>
                      <div className="font-bold text-[#0F172A] text-sm sm:text-base">
                        Tìm hiểu sản phẩm & Ước tính hạn mức
                      </div>
                      <p className="text-xs text-[#475569] leading-relaxed">
                        Nhập số tiền dự kiến & kỳ hạn mong muốn để xem bảng tính toán chi phí vốn, dòng tiền hoàn vốn ước tính.
                      </p>
                    </div>

                    {/* Step 02 */}
                    <div className="p-4 rounded-[8px] bg-white border border-[#CBD5E1] shadow-xs space-y-1.5 hover:border-blue-500 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          BƯỚC 02 • SÀNG LỌC
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">Quick Eligibility</span>
                      </div>
                      <div className="font-bold text-[#0F172A] text-sm sm:text-base">
                        Khảo sát điều kiện tín dụng sơ bộ
                      </div>
                      <p className="text-xs text-[#475569] leading-relaxed">
                        Trả lời 4 câu hỏi sàng lọc cốt lõi: Hoạt động ≥ 2 năm, doanh thu tối thiểu, lịch sử CIC không nợ xấu nhóm 2+.
                      </p>
                    </div>
                  </div>

                  {/* Flow Arrow Down */}
                  <div className="flex justify-center">
                    <div className="w-0.5 h-5 bg-[#94A3B8]" />
                  </div>

                  {/* Decision Gate 01 */}
                  <div className="p-4 rounded-[10px] bg-[#FFFBEB] border-2 border-[#FCD34D] shadow-sm space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#92400E]">
                        <span className="w-3 h-3 rounded-[2px] bg-[#D97706] rotate-45 shrink-0" />
                        <span>DECISION GATE 01: DOANH NGHIỆP CÓ ĐẠT ĐIỀU KIỆN SƠ BỘ?</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#B45309] uppercase font-bold">Conditional Branch</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                      {/* Branch Yes */}
                      <div className="p-3 rounded-[6px] bg-[#F0FDF4] border border-[#86EFAC] space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-[#15803D]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                          <span>NHÁNH ĐẠT (YES)</span>
                        </div>
                        <p className="text-[#14532D] leading-relaxed">
                          Doanh nghiệp đạt tiêu chí ban đầu ➔ Chuyển tiếp ngay sang Bước 03 trên BIZ Portal.
                        </p>
                      </div>

                      {/* Branch No (Handoff to RM) */}
                      <div className="p-3 rounded-[6px] bg-[#FFF1F2] border border-[#FECDD3] space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-[#BE123C]">
                          <AlertCircle className="w-3.5 h-3.5 text-[#E11D48]" />
                          <span>NHÁNH KHÔNG ĐẠT (NO) ➔ CHUYỂN RM TƯ VẤN</span>
                        </div>
                        <p className="text-[#881337] leading-relaxed">
                          Chuyển sang kênh RM tư vấn trực tiếp để cấu trúc lại giải pháp tài chính hoặc đề xuất gói vay khác.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Flow Arrow Down */}
                  <div className="flex justify-center">
                    <div className="w-0.5 h-5 bg-[#94A3B8]" />
                  </div>

                  {/* Step 03, 04, 05, 06 Pipeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {/* Step 03 */}
                    <div className="p-3.5 rounded-[8px] bg-white border border-[#CBD5E1] shadow-xs space-y-1.5 hover:border-blue-500 transition-colors">
                      <span className="text-[11px] font-mono font-bold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        BƯỚC 03
                      </span>
                      <div className="font-bold text-[#0F172A] text-xs sm:text-sm">
                        Khởi tạo nhu cầu vay chi tiết
                      </div>
                      <p className="text-[11px] text-[#475569] leading-relaxed">
                        Nhập hạn mức đề xuất (85 Tỷ), kỳ hạn (60T), mục đích vốn & tài sản bảo đảm.
                      </p>
                    </div>

                    {/* Step 04 */}
                    <div className="p-3.5 rounded-[8px] bg-white border border-[#CBD5E1] shadow-xs space-y-1.5 hover:border-blue-500 transition-colors">
                      <span className="text-[11px] font-mono font-bold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        BƯỚC 04
                      </span>
                      <div className="font-bold text-[#0F172A] text-xs sm:text-sm">
                        Đối soát pháp lý (Auto-Prefill)
                      </div>
                      <p className="text-[11px] text-[#475569] leading-relaxed">
                        Hệ thống tự động điền sẵn MST, người đại diện, tài khoản và lịch sử tín dụng MB.
                      </p>
                    </div>

                    {/* Step 05 */}
                    <div className="p-3.5 rounded-[8px] bg-white border border-[#CBD5E1] shadow-xs space-y-1.5 hover:border-blue-500 transition-colors">
                      <span className="text-[11px] font-mono font-bold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        BƯỚC 05
                      </span>
                      <div className="font-bold text-[#0F172A] text-xs sm:text-sm">
                        Checklist hồ sơ động theo ngành
                      </div>
                      <p className="text-[11px] text-[#475569] leading-relaxed">
                        Thuật toán sinh danh mục chứng từ bắt buộc (BCTC kiểm toán, phương án hoàn vốn).
                      </p>
                    </div>

                    {/* Step 06 */}
                    <div className="p-3.5 rounded-[8px] bg-white border border-[#CBD5E1] shadow-xs space-y-1.5 hover:border-blue-500 transition-colors">
                      <span className="text-[11px] font-mono font-bold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        BƯỚC 06
                      </span>
                      <div className="font-bold text-[#0F172A] text-xs sm:text-sm">
                        Upload & Kiểm tra định dạng
                      </div>
                      <p className="text-[11px] text-[#475569] leading-relaxed">
                        Tải tệp PDF/Excel; hệ thống tự động kiểm tra chữ ký số, dung lượng và tính toàn vẹn.
                      </p>
                    </div>
                  </div>

                  {/* Flow Arrow Down */}
                  <div className="flex justify-center">
                    <div className="w-0.5 h-5 bg-[#94A3B8]" />
                  </div>

                  {/* Decision Gate 02 */}
                  <div className="p-4 rounded-[10px] bg-[#FFFBEB] border-2 border-[#FCD34D] shadow-sm space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#92400E]">
                        <span className="w-3 h-3 rounded-[2px] bg-[#D97706] rotate-45 shrink-0" />
                        <span>DECISION GATE 02: HỒ SƠ ĐÃ ĐẦY ĐỦ 100% CHECKLIST BẮT BUỘC?</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#B45309] uppercase font-bold">Pre-Validation Gate</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                      {/* Branch Yes */}
                      <div className="p-3 rounded-[6px] bg-[#F0FDF4] border border-[#86EFAC] space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-[#15803D]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                          <span>ĐỦ HỒ SƠ 100% ➔ SẴN SÀNG TRÌNH DUYỆT</span>
                        </div>
                        <p className="text-[#14532D] leading-relaxed">
                          Tất cả hồ sơ pháp lý & tài chính hợp lệ ➔ Kích hoạt màn hình xác nhận lập hồ sơ.
                        </p>
                      </div>

                      {/* Branch Draft */}
                      <div className="p-3 rounded-[6px] bg-[#FEF3C7] border border-[#FCD34D] space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-[#92400E]">
                          <RotateCcw className="w-3.5 h-3.5 text-[#D97706]" />
                          <span>CHƯA ĐỦ HỒ SƠ ➔ AUTO-SAVE DRAFT & GỢI Ý ĐẦU MỐI</span>
                        </div>
                        <p className="text-[#78350F] leading-relaxed">
                          Lưu nháp tự động; gợi ý rõ tài liệu còn thiếu thuộc phòng ban nào để bổ sung sau mà không mất tiến trình.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Flow Arrow Down */}
                  <div className="flex justify-center">
                    <div className="w-0.5 h-5 bg-[#94A3B8]" />
                  </div>

                  {/* Step 07 */}
                  <div className="p-4 rounded-[8px] bg-white border border-[#CBD5E1] shadow-xs space-y-1.5 hover:border-blue-500 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        BƯỚC 07 • XÁC NHẬN LẬP HỒ SƠ
                      </span>
                      <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Maker Verification Passed
                      </span>
                    </div>
                    <div className="font-bold text-[#0F172A] text-sm sm:text-base">
                      Maker đối soát tổng thể & Xác nhận chuyển cấp thẩm quyền
                    </div>
                    <p className="text-xs text-[#475569] leading-relaxed">
                      Kế toán trưởng rà soát tóm tắt toàn bộ gói hồ sơ, kiểm tra điều khoản và nhấn xác nhận: <strong>"Chuyển Lãnh đạo phê duyệt nội bộ"</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {/* =========================================================================
               * CROSS-ROLE HANDOFF BRIDGE 1: MAKER ➔ APPROVER
               * ========================================================================= */}
              <div className="flex items-center justify-center py-1">
                <div className="px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2">
                  <Send className="w-3.5 h-3.5" />
                  <span>⇄ HANDOFF NỘI BỘ: Thông báo tức thì qua Push App BIZ Mobile + SMS OTP tới CEO/CFO</span>
                  <ArrowDown className="w-4 h-4 animate-bounce" />
                </div>
              </div>

              {/* =========================================================================
               * SWIMLANE 2: APPROVER (CHỦ TỊCH / CEO / CFO)
               * ========================================================================= */}
              <div className="rounded-[10px] bg-[#FAF5FF] border-2 border-[#E9D5FF]/80 overflow-hidden shadow-xs">
                {/* Lane Header */}
                <div className="bg-[#F3E8FF] px-4 py-2.5 border-b border-[#E9D5FF] flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#6B21A8] uppercase tracking-wider">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#9333EA]" />
                    <span>LANE 02: VAI TRÒ APPROVER (LÃNH ĐẠO CẤP CAO — CEO / CFO)</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#6B21A8] bg-[#E9D5FF] px-2.5 py-0.5 rounded font-semibold">
                    BIZ MBBank Mobile App
                  </span>
                </div>

                <div className="p-4 sm:p-6 space-y-4">
                  {/* Step 08 & Step 09 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {/* Step 08 */}
                    <div className="p-4 rounded-[8px] bg-white border border-[#D8B4FE] shadow-xs space-y-1.5 hover:border-purple-500 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-[#7E22CE] bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                          BƯỚC 08 • TIẾP NHẬN
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">Push Notification</span>
                      </div>
                      <div className="font-bold text-[#0F172A] text-sm sm:text-base">
                        Nhận thông báo hồ sơ chờ duyệt trên BIZ Mobile
                      </div>
                      <p className="text-xs text-[#475569] leading-relaxed">
                        Lãnh đạo nhận thông báo đẩy tức thì trên smartphone khi đang đi công tác: <em>"Có 01 hồ sơ cấp hạn mức TDH 85 Tỷ đang chờ phê duyệt."</em>
                      </p>
                    </div>

                    {/* Step 09 */}
                    <div className="p-4 rounded-[8px] bg-white border border-[#D8B4FE] shadow-xs space-y-1.5 hover:border-purple-500 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-[#7E22CE] bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                          BƯỚC 09 • THẨM ĐỊNH
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">1-Page Decision Summary</span>
                      </div>
                      <div className="font-bold text-[#0F172A] text-sm sm:text-base">
                        Xem Decision Summary 1 trang trên Mobile App
                      </div>
                      <p className="text-xs text-[#475569] leading-relaxed">
                        Tóm lược đầy đủ 4 điểm cốt lõi để ra quyết định: Nhu cầu vay (85 Tỷ), Kỳ hạn (60T), Kế toán lập, Cam kết mục đích vốn.
                      </p>
                    </div>
                  </div>

                  {/* Flow Arrow Down */}
                  <div className="flex justify-center">
                    <div className="w-0.5 h-5 bg-[#94A3B8]" />
                  </div>

                  {/* Decision Gate 03 */}
                  <div className="p-4 rounded-[10px] bg-[#FFFBEB] border-2 border-[#FCD34D] shadow-sm space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#92400E]">
                        <span className="w-3 h-3 rounded-[2px] bg-[#D97706] rotate-45 shrink-0" />
                        <span>DECISION GATE 03: LÃNH ĐẠO PHÊ DUYỆT ĐỀ XUẤT VAY?</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#B45309] uppercase font-bold">Executive Approval</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                      {/* Branch Approve */}
                      <div className="p-3 rounded-[6px] bg-[#F0FDF4] border border-[#86EFAC] space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-[#15803D]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                          <span>ĐỒNG Ý DUYỆT (APPROVE) ➔ KÝ SỐ SMART CA</span>
                        </div>
                        <p className="text-[#14532D] leading-relaxed">
                          Chấp thuận khoản vay ➔ Mở luồng ký số bảo mật bằng sinh trắc học FaceID trên điện thoại.
                        </p>
                      </div>

                      {/* Branch Reject / Edit */}
                      <div className="p-3 rounded-[6px] bg-[#FFF1F2] border border-[#FECDD3] space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-[#BE123C]">
                          <RotateCcw className="w-3.5 h-3.5 text-[#E11D48]" />
                          <span>YÊU CẦU ĐIỀU CHỈNH ➔ TRẢ LẠI MAKER</span>
                        </div>
                        <p className="text-[#881337] leading-relaxed">
                          Trả hồ sơ về Maker kèm ghi chú lý do điều chỉnh cụ thể qua hệ thống để cập nhật lại.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Flow Arrow Down */}
                  <div className="flex justify-center">
                    <div className="w-0.5 h-5 bg-[#94A3B8]" />
                  </div>

                  {/* Step 10 */}
                  <div className="p-4 rounded-[8px] bg-white border border-[#D8B4FE] shadow-xs space-y-1.5 hover:border-purple-500 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#7E22CE] bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                        BƯỚC 10 • KÝ DUYỆT SỐ PHÁP LÝ
                      </span>
                      <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Smart CA Signed
                      </span>
                    </div>
                    <div className="font-bold text-[#0F172A] text-sm sm:text-base">
                      Ký duyệt bằng chữ ký số Smart CA & Nộp hồ sơ sang Ngân hàng
                    </div>
                    <p className="text-xs text-[#475569] leading-relaxed">
                      Lãnh đạo quét FaceID để ký số điện tử có giá trị pháp lý tương đương con dấu; hệ thống tự động đóng gói hồ sơ mã hóa và gửi sang MBBank.
                    </p>
                  </div>
                </div>
              </div>

              {/* =========================================================================
               * CROSS-ROLE HANDOFF BRIDGE 2: DOANH NGHIỆP ➔ MBBANK
               * ========================================================================= */}
              <div className="flex items-center justify-center py-1">
                <div className="px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 via-teal-600 to-emerald-600 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>⇄ HANDOFF SANG NGÂN HÀNG: Toàn bộ gói hồ sơ mã hóa chuyển thẳng vào Core Banking qua Secure API Gateway</span>
                  <ArrowDown className="w-4 h-4 animate-bounce" />
                </div>
              </div>

              {/* =========================================================================
               * SWIMLANE 3: HỆ THỐNG MBBANK & RELATIONSHIP MANAGER (RM)
               * ========================================================================= */}
              <div className="rounded-[10px] bg-[#F0FDF4] border-2 border-[#BBF7D0]/80 overflow-hidden shadow-xs">
                {/* Lane Header */}
                <div className="bg-[#DCFCE7] px-4 py-2.5 border-b border-[#BBF7D0] flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#166534] uppercase tracking-wider">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]" />
                    <span>LANE 03: HỆ THỐNG MBBANK CORE & RELATIONSHIP MANAGER (RM)</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#166534] bg-[#BBF7D0] px-2.5 py-0.5 rounded font-semibold">
                    Core Banking & Staff CRM
                  </span>
                </div>

                <div className="p-4 sm:p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {/* Step 11 */}
                    <div className="p-4 rounded-[8px] bg-white border border-[#86EFAC] shadow-xs space-y-1.5 hover:border-emerald-500 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-[#15803D] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          BƯỚC 11 • TIỀN THẨM ĐỊNH TỰ ĐỘNG
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">Underwriting Engine</span>
                      </div>
                      <div className="font-bold text-[#0F172A] text-sm sm:text-base">
                        Tiền thẩm định tự động 30s & Cập nhật Real-time Tracking
                      </div>
                      <p className="text-xs text-[#475569] leading-relaxed">
                        Hệ thống đối soát dữ liệu thuế, báo cáo tín dụng, cấp mã định danh hồ sơ TDH và cập nhật tiến độ minh bạch cho khách hàng trên BIZ Portal.
                      </p>
                    </div>

                    {/* Step 12: Contextual RM Handoff */}
                    <div className="p-4 rounded-[8px] bg-white border border-[#86EFAC] shadow-xs space-y-1.5 hover:border-emerald-500 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-[#15803D] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          BÀN GIAO RM CHI NHÁNH
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">Contextual CRM</span>
                      </div>
                      <div className="font-bold text-[#0F172A] text-sm sm:text-base">
                        Chuyên viên RM tiếp nhận hồ sơ có ngữ cảnh đầy đủ
                      </div>
                      <p className="text-xs text-[#475569] leading-relaxed">
                        RM phụ trách nhận thông báo qua CRM nội bộ với toàn bộ dữ liệu & tài liệu đã đối soát, chủ động liên hệ doanh nghiệp để thẩm định thực địa & giải ngân.
                      </p>
                    </div>
                  </div>

                  {/* Flow Arrow Down */}
                  <div className="flex justify-center">
                    <div className="w-0.5 h-5 bg-[#94A3B8]" />
                  </div>

                  {/* End Node */}
                  <div className="flex justify-center">
                    <div className="px-6 py-2.5 rounded-full bg-[#15803D] text-white text-xs sm:text-sm font-bold shadow-md flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                      <span>HOÀN THÀNH: Hồ sơ chuyển duyệt thực địa ➔ Doanh nghiệp theo dõi hạn mức & giải ngân</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Core Principles of V1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 sm:p-5 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-xs space-y-2">
              <div className="text-xs sm:text-sm font-bold text-[#15803D] uppercase">1. Không nhập lại dữ liệu</div>
              <p className="text-xs sm:text-sm text-[#5A4030] leading-relaxed">
                Thông tin doanh nghiệp, người đại diện và lịch sử giao dịch được prefill tự động nếu hệ thống ngân hàng đã có.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-xs space-y-2">
              <div className="text-xs sm:text-sm font-bold text-[#2563EB] uppercase">2. Cho phép dừng & quay lại</div>
              <p className="text-xs sm:text-sm text-[#5A4030] leading-relaxed">
                Auto-save theo từng bước, không bắt khách hàng hoàn thành tất cả tài liệu phức tạp chỉ trong một phiên đăng nhập.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-xs space-y-2">
              <div className="text-xs sm:text-sm font-bold text-[#D97706] uppercase">3. Hồ sơ theo nhu cầu</div>
              <p className="text-xs sm:text-sm text-[#5A4030] leading-relaxed">
                Checklist thay đổi theo: Mục đích vay, Loại tài sản bảo đảm, Quy mô nhu cầu và Profile tín dụng của doanh nghiệp.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-xs space-y-2">
              <div className="text-xs sm:text-sm font-bold text-[#7C3AED] uppercase">4. Tách Maker & Approver</div>
              <p className="text-xs sm:text-sm text-[#5A4030] leading-relaxed">
                Maker chuẩn bị chi tiết kỹ thuật. Approver (CEO/CFO) chỉ nhận màn hình tóm tắt thông tin cần thiết để ra quyết định.
              </p>
            </div>
          </div>

          {/* 3 Clickable Scenarios */}
          <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_3px_0_#D4C39B] space-y-3.5">
            <div className="text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase tracking-wider">
              3 KỊCH BẢN KIỂM THỬ PROTOTYPE END-TO-END
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs sm:text-sm">
              <div className="p-4 rounded-[8px] bg-[#FFF8E7] border border-[#DFC9A2] space-y-1.5">
                <div className="font-bold text-[#15803D] text-sm sm:text-base">Scenario A — Luồng tiêu chuẩn</div>
                <p className="text-[#5A4030] leading-relaxed">Doanh nghiệp đủ điều kiện sơ bộ và có đầy đủ hồ sơ pháp lý, BCTC kiểm toán.</p>
              </div>
              <div className="p-4 rounded-[8px] bg-[#FFF8E7] border border-[#DFC9A2] space-y-1.5">
                <div className="font-bold text-[#D97706] text-sm sm:text-base">Scenario B — Luồng thiếu hồ sơ</div>
                <p className="text-[#5A4030] leading-relaxed">Doanh nghiệp thiếu một số hồ sơ dự án, cần lưu nháp và yêu cầu bổ sung sau.</p>
              </div>
              <div className="p-4 rounded-[8px] bg-[#FFF8E7] border border-[#DFC9A2] space-y-1.5">
                <div className="font-bold text-[#2563EB] text-sm sm:text-base">Scenario C — Luồng phức tạp</div>
                <p className="text-[#5A4030] leading-relaxed">Nhu cầu vốn đặc thù quy mô lớn cần chuyển tiếp RM tiếp nhận trực tiếp.</p>
              </div>
            </div>
          </div>

          {/* Showcase Section: User Flow & Prototype Video */}
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase tracking-wider flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#B86428]" />
                <span>USER FLOW TOÀN BỘ LUỒNG & PROTOTYPE DEMO</span>
              </div>
              <button
                onClick={() => setLightboxImage('flow')}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#B86428] hover:text-[#8C4312] cursor-pointer"
              >
                <Maximize2 className="w-4 h-4" />
                <span>Phóng to sơ đồ</span>
              </button>
            </div>

            {/* Voxel Monitor Prototype Player */}
            <div className="rounded-[12px] p-4 sm:p-6 bg-[#0E1A2B] border-2 border-[#DFC9A2] shadow-xl text-slate-200 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-sky-400 font-bold">
                  <Play className="w-4 h-4 fill-sky-400" />
                  <span>PROTOTYPE INTERACTIVE DEMO (60 – 90 GIÂY)</span>
                </div>
                <span className="text-xs text-slate-400 font-mono">Scenario: Cấp hạn mức 85 Tỷ VNĐ</span>
              </div>

              <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 aspect-video max-h-[380px] flex items-center justify-center">
                <div className="text-center space-y-3.5 p-6">
                  <div className="w-16 h-16 rounded-full bg-sky-500/20 border-2 border-sky-400 text-sky-300 flex items-center justify-center mx-auto cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                  >
                    {isPlayingVideo ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 fill-sky-400 ml-1" />}
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-base sm:text-lg font-bold text-white">Interactive Prototype Walkthrough</div>
                    <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                      {isPlayingVideo
                        ? 'Đang mô phỏng tương tác thực tế giữa Web Portal của Kế toán viên và Mobile App của CEO...'
                        : 'Bấm để xem video mô phỏng hành trình hoàn chỉnh 11 bước từ khởi tạo đến duyệt và bàn giao RM.'}
                    </p>
                  </div>
                </div>

                {/* Player Controls Bar */}
                <div className="absolute bottom-0 inset-x-0 bg-slate-950/90 backdrop-blur-xs px-4 py-2.5 flex items-center justify-between text-xs sm:text-sm text-slate-300 border-t border-slate-800">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setIsPlayingVideo(!isPlayingVideo)} className="hover:text-white cursor-pointer">
                      {isPlayingVideo ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <span className="font-mono text-xs text-slate-400">01:18 / 01:30</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setIsMutedVideo(!isMutedVideo)} className="hover:text-white cursor-pointer">
                      {isMutedVideo ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <span className="text-xs px-2.5 py-0.5 rounded bg-sky-950 border border-sky-800 text-sky-300 font-mono">1080p HD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
         * CHAPTER 05 — KIỂM CHỨNG VÀ 5 PHÁT HIỆN THEN CHỐT
         * ========================================================================= */}
        <section id="sec-05" className="space-y-7 scroll-mt-20">
          <div className="space-y-3">
            <span className="px-3 py-1 rounded-[4px] bg-[#E8D9BE] text-[#5A4030] text-xs sm:text-sm font-bold uppercase tracking-wider">
              05 / USABILITY TESTING
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#2D1B12]">
              Kiểm chứng concept với khách hàng thật
            </h2>
            <p className="text-base sm:text-lg text-[#5A4030] leading-relaxed max-w-4xl">
              Chúng tôi test concept trước khi BA phân tích chi tiết. Mục tiêu của research không phải hỏi: <em>“Anh/chị có thích giao diện này không?”</em> mà là kiểm chứng:
            </p>
            <div className="p-4 rounded-[8px] bg-[#FFF4D6] border-l-4 border-[#B86428] text-sm sm:text-base font-bold text-[#4A2414] italic leading-relaxed">
              "Hành trình chúng tôi đang xây có phù hợp với cách doanh nghiệp thực sự vay vốn hay không?"
            </div>
          </div>

          {/* Research Sample & Structure */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-3.5">
              <div className="text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase tracking-wider">
                MẪU NGHIÊN CỨU (RESEARCH SAMPLE)
              </div>
              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="flex items-center justify-between p-3 rounded bg-[#FFF8E7] border border-[#DFC9A2]">
                  <span className="font-bold text-[#2D1B12] text-sm sm:text-base">12 Khách hàng doanh nghiệp</span>
                  <span className="text-xs font-semibold text-[#6B513C]">Upper SME & CIB</span>
                </div>
                <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
                  <div className="p-2.5 rounded bg-[#FFF8E7] border border-[#DFC9A2]">
                    <div className="font-bold text-[#B86428] text-base">5</div>
                    <div>Kế toán viên</div>
                  </div>
                  <div className="p-2.5 rounded bg-[#FFF8E7] border border-[#DFC9A2]">
                    <div className="font-bold text-[#B86428] text-base">4</div>
                    <div>Chủ DN / CFO</div>
                  </div>
                  <div className="p-2.5 rounded bg-[#FFF8E7] border border-[#DFC9A2]">
                    <div className="font-bold text-[#B86428] text-base">3</div>
                    <div>Người phê duyệt</div>
                  </div>
                </div>
                <div className="p-3 rounded bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E3A8A] text-xs sm:text-sm leading-relaxed">
                  <strong>+ 5 Relationship Manager (RM):</strong> Interview chuyên sâu riêng biệt để hiểu quy trình hỗ trợ nội bộ phía ngân hàng.
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-3.5">
              <div className="text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase tracking-wider">
                CẤU TRÚC PHIÊN PHỎNG VẤN (45 – 50 PHÚT / PHIÊN)
              </div>
              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="p-3 rounded bg-[#FFF8E7] border border-[#DFC9A2] space-y-1">
                  <div className="flex justify-between font-bold text-[#2D1B12] text-sm">
                    <span>15 phút đầu</span>
                    <span className="text-[#B86428]">Hiểu hành vi hiện tại</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6B513C] leading-relaxed">Khai thác thói quen chuẩn bị hồ sơ, các kênh liên hệ và rào cản lớn nhất.</p>
                </div>
                <div className="p-3 rounded bg-[#FFF8E7] border border-[#DFC9A2] space-y-1">
                  <div className="flex justify-between font-bold text-[#2D1B12] text-sm">
                    <span>25 phút</span>
                    <span className="text-[#B86428]">Thực hiện task trên Prototype</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6B513C] leading-relaxed">Quan sát trực tiếp tương tác, cảm xúc và các điểm phân vân khi điền đơn.</p>
                </div>
                <div className="p-3 rounded bg-[#FFF8E7] border border-[#DFC9A2] space-y-1">
                  <div className="flex justify-between font-bold text-[#2D1B12] text-sm">
                    <span>10 phút cuối</span>
                    <span className="text-[#B86428]">Debrief & Đào sâu</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6B513C] leading-relaxed">Đặt câu hỏi vì sao đối với những khoảnh khắc người dùng dừng lại lâu hoặc thắc mắc.</p>
                </div>
              </div>
            </div>
          </div>

          {/* 6 Core User Tasks */}
          <div className="p-4 sm:p-5 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] space-y-2.5">
            <div className="text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase tracking-wider">
              6 NHIỆM VỤ CHÍNH TRONG BUỔI TEST PROTOTYPE
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-1 text-xs sm:text-sm">
              {[
                '1. Kiểm tra phù hợp',
                '2. Tạo nhu cầu vay 5 tỷ',
                '3. Xác định hồ sơ',
                '4. Upload tài liệu',
                '5. Gửi người duyệt',
                '6. Theo dõi sau submit'
              ].map((task, idx) => (
                <div key={idx} className="p-3 rounded bg-[#FFF8E7] border border-[#DFC9A2] font-semibold text-[#2D1B12] text-center">
                  {task}
                </div>
              ))}
            </div>
          </div>

          {/* 5 Core Findings & Design Responses */}
          <div className="space-y-4 pt-2">
            <div className="text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase tracking-wider flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-[#B86428]" />
              <span>06. NHỮNG GÌ CHÚNG TÔI HỌC ĐƯỢC (5 FINDINGS & DESIGN RESPONSES)</span>
            </div>

            <div className="space-y-4">
              {/* Finding 01 */}
              <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="text-xs sm:text-sm font-bold text-[#991B1B] uppercase">Finding 01</div>
                  <span className="text-xs sm:text-sm font-mono font-bold text-[#B86428] bg-[#FFF4D6] px-3 py-1 rounded border border-[#DFC9A2]">
                    9 / 12 Khách hàng gặp phải
                  </span>
                </div>
                <div className="text-base sm:text-lg font-bold text-[#2D1B12]">
                  Khách hàng chưa sẵn sàng khi bắt đầu tìm hiểu khoản vay
                </div>
                <p className="text-sm sm:text-base text-[#5A4030] leading-relaxed">
                  9/12 khách hàng cho biết họ thường chưa có đầy đủ tài liệu khi bắt đầu tìm hiểu khoản vay. Điều đó làm thay đổi hoàn toàn cách chúng tôi nhìn vấn đề:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1 text-xs sm:text-sm">
                  <div className="p-3.5 rounded bg-rose-50 border border-rose-200 text-[#7F1D1D] space-y-1">
                    <div className="font-bold text-sm">Góc nhìn cũ:</div>
                    <div className="leading-relaxed">“Làm sao để người dùng hoàn thành form nhanh hơn?”</div>
                  </div>
                  <div className="p-3.5 rounded bg-emerald-50 border border-emerald-200 text-[#14532D] space-y-1">
                    <div className="font-bold text-sm">Góc nhìn mới (Design Response):</div>
                    <strong className="leading-relaxed block">“Làm sao để giúp khách hàng biết mình cần chuẩn bị gì trước khi đầu tư thời gian vào form?”</strong>
                  </div>
                </div>
              </div>

              {/* Finding 02 */}
              <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="text-xs sm:text-sm font-bold text-[#991B1B] uppercase">Finding 02</div>
                  <span className="text-xs sm:text-sm font-mono font-bold text-[#B86428] bg-[#FFF4D6] px-3 py-1 rounded border border-[#DFC9A2]">
                    8 / 12 Khách hàng thắc mắc
                  </span>
                </div>
                <div className="text-base sm:text-lg font-bold text-[#2D1B12]">
                  “Danh sách hồ sơ” đơn thuần là chưa đủ
                </div>
                <p className="text-sm sm:text-base text-[#5A4030] leading-relaxed">
                  8/12 khách hàng hỏi: <em>“Tại sao ngân hàng lại cần tài liệu này?”</em>. Vấn đề không phải chỉ là liệt kê tài liệu, mà khách hàng cần hiểu: Hồ sơ dùng để làm gì? Có tài liệu thay thế không? Ai trong doanh nghiệp thường giữ tài liệu đó?
                </p>
                <div className="p-4 rounded bg-[#FFF8E7] border border-[#DFC9A2] space-y-2 text-xs sm:text-sm">
                  <strong className="text-[#B86428] block text-sm">Design Response — Checklist thông minh được bổ sung 5 trường dữ liệu:</strong>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-center font-semibold text-[#2D1B12] pt-1">
                    <div className="p-2 rounded bg-white border border-[#DFC9A2]">1. Tên tài liệu</div>
                    <div className="p-2 rounded bg-white border border-[#DFC9A2]">2. Vì sao cần</div>
                    <div className="p-2 rounded bg-white border border-[#DFC9A2]">3. Định dạng file</div>
                    <div className="p-2 rounded bg-white border border-[#DFC9A2]">4. File mẫu (Ví dụ)</div>
                    <div className="p-2 rounded bg-white border border-[#DFC9A2]">5. Tài liệu thay thế</div>
                  </div>
                </div>
              </div>

              {/* Finding 03 */}
              <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="text-xs sm:text-sm font-bold text-[#991B1B] uppercase">Finding 03</div>
                  <span className="text-xs sm:text-sm font-mono font-bold text-[#B86428] bg-[#FFF4D6] px-3 py-1 rounded border border-[#DFC9A2]">
                    10 / 12 Doanh nghiệp xác nhận
                  </span>
                </div>
                <div className="text-base sm:text-lg font-bold text-[#2D1B12]">
                  Một flow nhưng nhiều người tham gia
                </div>
                <p className="text-sm sm:text-base text-[#5A4030] leading-relaxed">
                  Trong 10/12 doanh nghiệp, người chuẩn bị hồ sơ không phải là người có quyền ký duyệt. Flow V1 vẫn còn quá tập trung vào một người dùng đơn lẻ.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1 text-xs sm:text-sm">
                  <div className="p-3.5 rounded bg-[#FFF8E7] border border-[#DFC9A2] space-y-1.5">
                    <strong className="text-[#2D1B12] block text-sm sm:text-base">Maker View (Người soạn thảo):</strong>
                    <p className="text-[#5A4030] leading-relaxed">Giao diện Web Portal chi tiết, hỗ trợ upload nhiều file, lưu nháp, kiểm tra lỗi và gửi duyệt nội bộ.</p>
                  </div>
                  <div className="p-3.5 rounded bg-[#FFF8E7] border border-[#DFC9A2] space-y-1.5">
                    <strong className="text-[#2D1B12] block text-sm sm:text-base">Approver Summary (Người ký duyệt):</strong>
                    <p className="text-[#5A4030] leading-relaxed">Không phải xem lại 7 bước. Nhận ngay 1 trang tóm tắt: Nhu cầu vay, Mục đích, Giá trị, Thời hạn, Hồ sơ chính, Cam kết và ký 1-chạm.</p>
                  </div>
                </div>
              </div>

              {/* Finding 04 */}
              <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="text-xs sm:text-sm font-bold text-[#991B1B] uppercase">Finding 04</div>
                  <span className="text-xs sm:text-sm font-mono font-bold text-[#B86428] bg-[#FFF4D6] px-3 py-1 rounded border border-[#DFC9A2]">
                    7 / 12 Khách hàng bối rối
                  </span>
                </div>
                <div className="text-base sm:text-lg font-bold text-[#2D1B12]">
                  Status mang ngôn ngữ nội bộ ngân hàng
                </div>
                <p className="text-sm sm:text-base text-[#5A4030] leading-relaxed">
                  Trong Prototype V1 chúng tôi sử dụng trạng thái <em>“Đang xử lý”</em>. 7/12 khách hàng không biết: Ai đang xử lý? Bao lâu? Mình cần làm gì?
                </p>
                <div className="p-4 rounded bg-[#EFF6FF] border border-[#BFDBFE] space-y-2 text-xs sm:text-sm text-[#1E3A8A]">
                  <strong className="text-sm">Design Response — Mỗi trạng thái được tái thiết kế trả lời 3 câu hỏi cốt tử:</strong>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 font-semibold text-center text-sm">
                    <div className="p-2.5 rounded bg-white border border-blue-200">1. Ai đang xử lý?</div>
                    <div className="p-2.5 rounded bg-white border border-blue-200">2. Bạn cần làm gì?</div>
                    <div className="p-2.5 rounded bg-white border border-blue-200">3. Điều gì xảy ra tiếp theo?</div>
                  </div>
                </div>
              </div>

              {/* Finding 05 */}
              <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="text-xs sm:text-sm font-bold text-[#991B1B] uppercase">Finding 05</div>
                  <span className="text-xs sm:text-sm font-mono font-bold text-[#B86428] bg-[#FFF4D6] px-3 py-1 rounded border border-[#DFC9A2]">
                    10 / 12 Khách hàng có nhu cầu
                  </span>
                </div>
                <div className="text-base sm:text-lg font-bold text-[#2D1B12]">
                  RM vẫn rất quan trọng trong hành trình
                </div>
                <p className="text-sm sm:text-base text-[#5A4030] leading-relaxed">
                  10/12 khách hàng muốn có khả năng liên hệ RM trong các trường hợp: Không hiểu điều kiện, Khoản vay phức tạp, Hồ sơ đặc thù, Cần tư vấn cấu trúc vay.
                </p>
                <div className="p-4 rounded bg-[#FFF4D6] border-l-4 border-[#B86428] text-sm sm:text-base font-bold text-[#4A2414] italic leading-relaxed">
                  "Mục tiêu không phải giảm RM bằng mọi giá. Mục tiêu là giảm những hỗ trợ lặp lại để RM có thể tập trung vào tư vấn giá trị cao hơn."
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
         * CHAPTER 06 — ITERATION: PROTOTYPE V1 → V2
         * ========================================================================= */}
        <section id="sec-06" className="space-y-7 scroll-mt-20">
          <div className="space-y-3">
            <span className="px-3 py-1 rounded-[4px] bg-[#E8D9BE] text-[#5A4030] text-xs sm:text-sm font-bold uppercase tracking-wider">
              06 / CHỈNH SỬA SAU TEST
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#2D1B12]">
              Iteration — Prototype V1 → V2
            </h2>
            <p className="text-base sm:text-lg text-[#5A4030] leading-relaxed max-w-4xl">
              Từ bằng chứng thực tế thu thập được, chúng tôi thực hiện 6 vòng lặp cải tiến cốt lõi để nâng cấp trải nghiệm từ V1 lên V2 hoàn chỉnh:
            </p>
          </div>

          {/* Interactive Before / After Selector */}
          <div className="flex items-center gap-2.5 p-1.5 rounded-[8px] bg-[#FFF4D6] border border-[#DFC9A2] w-fit">
            <button
              onClick={() => setActiveTestTab('after')}
              className={`px-3.5 py-1.5 rounded-[5px] text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTestTab === 'after'
                  ? 'bg-[#15803D] text-white shadow-xs'
                  : 'text-[#7A3F1F] hover:bg-[#FFF8E7]'
              }`}
            >
              Xem thiết kế cải tiến (AFTER V2)
            </button>
            <button
              onClick={() => setActiveTestTab('before')}
              className={`px-3.5 py-1.5 rounded-[5px] text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTestTab === 'before'
                  ? 'bg-[#991B1B] text-white shadow-xs'
                  : 'text-[#7A3F1F] hover:bg-[#FFF8E7]'
              }`}
            >
              Xem phiên bản gốc (BEFORE V1)
            </button>
          </div>

          {/* 6 Detailed Changes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Thay đổi 01 */}
            <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-3">
              <div className="text-xs sm:text-sm font-bold text-[#B86428] uppercase">Thay đổi 01 — Eligibility (Kiểm tra điều kiện)</div>
              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className={`p-3 rounded border leading-relaxed ${activeTestTab === 'before' ? 'bg-rose-50 border-rose-300 ring-2 ring-rose-400' : 'bg-[#FFF8E7] border-[#DFC9A2]'}`}>
                  <strong className="text-rose-800 block mb-1 text-sm font-bold">BEFORE:</strong>
                  Khách hàng bắt đầu nhập thông tin ngay lập tức mà không biết trước mình cần gì.
                </div>
                <div className={`p-3 rounded border leading-relaxed ${activeTestTab === 'after' ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-400' : 'bg-[#FFF8E7] border-[#DFC9A2]'}`}>
                  <strong className="text-emerald-800 block mb-1 text-sm font-bold">AFTER:</strong>
                  Thêm bước <strong>“Kiểm tra mức độ sẵn sàng”</strong>: Hiển thị điều kiện cơ bản, khoảng thời gian dự kiến, hồ sơ chính và ai cần tham gia.
                </div>
              </div>
            </div>

            {/* Thay đổi 02 */}
            <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-3">
              <div className="text-xs sm:text-sm font-bold text-[#B86428] uppercase">Thay đổi 02 — Wording (Thuật ngữ tín dụng)</div>
              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className={`p-3 rounded border leading-relaxed ${activeTestTab === 'before' ? 'bg-rose-50 border-rose-300 ring-2 ring-rose-400' : 'bg-[#FFF8E7] border-[#DFC9A2]'}`}>
                  <strong className="text-rose-800 block mb-1 text-sm font-bold">BEFORE: "Hạn mức đề xuất"</strong>
                  5/12 người hiểu nhầm đây là số tiền ngân hàng đã đồng ý giải ngân ngay.
                </div>
                <div className={`p-3 rounded border leading-relaxed ${activeTestTab === 'after' ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-400' : 'bg-[#FFF8E7] border-[#DFC9A2]'}`}>
                  <strong className="text-emerald-800 block mb-1 text-sm font-bold">AFTER: "Nhu cầu vốn dự kiến"</strong>
                  Giải thích rõ ràng: <em>"Số tiền doanh nghiệp mong muốn vay. Hạn mức cuối cùng phụ thuộc kết quả thẩm định."</em>
                </div>
              </div>
            </div>

            {/* Thay đổi 03 */}
            <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-3">
              <div className="text-xs sm:text-sm font-bold text-[#B86428] uppercase">Thay đổi 03 — Upload Error (Thông báo lỗi)</div>
              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className={`p-3 rounded border leading-relaxed ${activeTestTab === 'before' ? 'bg-rose-50 border-rose-300 ring-2 ring-rose-400' : 'bg-[#FFF8E7] border-[#DFC9A2]'}`}>
                  <strong className="text-rose-800 block mb-1 text-sm font-bold">BEFORE:</strong>
                  Thông báo chung chung gây bế tắc: <em>"Hồ sơ không hợp lệ."</em>
                </div>
                <div className={`p-3 rounded border leading-relaxed ${activeTestTab === 'after' ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-400' : 'bg-[#FFF8E7] border-[#DFC9A2]'}`}>
                  <strong className="text-emerald-800 block mb-1 text-sm font-bold">AFTER:</strong>
                  Thông báo chính xác nguyên nhân kèm giải pháp: <em>"Báo cáo tài chính chưa đúng định dạng PDF hoặc XLSX"</em> + Nút <strong>"Tải lại hồ sơ"</strong>.
                </div>
              </div>
            </div>

            {/* Thay đổi 04 */}
            <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-3">
              <div className="text-xs sm:text-sm font-bold text-[#B86428] uppercase">Thay đổi 04 — Draft (Lưu nháp bản ghi)</div>
              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className={`p-3 rounded border leading-relaxed ${activeTestTab === 'before' ? 'bg-rose-50 border-rose-300 ring-2 ring-rose-400' : 'bg-[#FFF8E7] border-[#DFC9A2]'}`}>
                  <strong className="text-rose-800 block mb-1 text-sm font-bold">BEFORE:</strong>
                  Bắt người dùng phải chủ động bấm nút <em>"Lưu"</em> thủ công. Nếu lỡ thoát sẽ mất trắng.
                </div>
                <div className={`p-3 rounded border leading-relaxed ${activeTestTab === 'after' ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-400' : 'bg-[#FFF8E7] border-[#DFC9A2]'}`}>
                  <strong className="text-emerald-800 block mb-1 text-sm font-bold">AFTER:</strong>
                  <strong>Auto-save tự động</strong> sau mỗi thao tác nhập, kèm thông báo trấn an trực quan: <em>"Đã lưu lúc 10:24"</em>.
                </div>
              </div>
            </div>

            {/* Thay đổi 05 */}
            <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-3">
              <div className="text-xs sm:text-sm font-bold text-[#B86428] uppercase">Thay đổi 05 — Approval (Phê duyệt của lãnh đạo)</div>
              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className={`p-3 rounded border leading-relaxed ${activeTestTab === 'before' ? 'bg-rose-50 border-rose-300 ring-2 ring-rose-400' : 'bg-[#FFF8E7] border-[#DFC9A2]'}`}>
                  <strong className="text-rose-800 block mb-1 text-sm font-bold">BEFORE:</strong>
                  Người duyệt bị bắt phải duyệt qua toàn bộ biểu mẫu dài dòng 7 bước như người lập.
                </div>
                <div className={`p-3 rounded border leading-relaxed ${activeTestTab === 'after' ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-400' : 'bg-[#FFF8E7] border-[#DFC9A2]'}`}>
                  <strong className="text-emerald-800 block mb-1 text-sm font-bold">AFTER:</strong>
                  <strong>Decision Summary</strong> — Một màn hình duy nhất tập trung: Nhu cầu vốn, Thời hạn, Mục đích, Hồ sơ, Người lập và Điều khoản cần xác nhận.
                </div>
              </div>
            </div>

            {/* Thay đổi 06 */}
            <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-3">
              <div className="text-xs sm:text-sm font-bold text-[#B86428] uppercase">Thay đổi 06 — RM Handoff (Chuyển giao con người)</div>
              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className={`p-3 rounded border leading-relaxed ${activeTestTab === 'before' ? 'bg-rose-50 border-rose-300 ring-2 ring-rose-400' : 'bg-[#FFF8E7] border-[#DFC9A2]'}`}>
                  <strong className="text-rose-800 block mb-1 text-sm font-bold">BEFORE:</strong>
                  Một câu thông báo lạnh lùng: <em>"Chuyển RM xử lý."</em>
                </div>
                <div className={`p-3 rounded border leading-relaxed ${activeTestTab === 'after' ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-400' : 'bg-[#FFF8E7] border-[#DFC9A2]'}`}>
                  <strong className="text-emerald-800 block mb-1 text-sm font-bold">AFTER:</strong>
                  <em>"Relationship Manager đang hỗ trợ yêu cầu của bạn."</em> Hiển thị: RM phụ trách, SĐT, Trạng thái, Thời gian dự kiến và cam kết: <strong>Toàn bộ thông tin và hồ sơ đã được chuyển. Bạn không cần nhập lại.</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
         * CHAPTER 07 — CHỐT CONCEPT VÀ BẢO VỆ VỚI GIÁM ĐỐC DỰ ÁN
         * ========================================================================= */}
        <section id="sec-07" className="space-y-7 scroll-mt-20">
          <div className="space-y-3">
            <span className="px-3 py-1 rounded-[4px] bg-[#E8D9BE] text-[#5A4030] text-xs sm:text-sm font-bold uppercase tracking-wider">
              07 / BẢO VỆ SẢN PHẨM
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#2D1B12]">
              Chốt concept và bảo vệ với Giám đốc dự án
            </h2>
            <p className="text-base sm:text-lg text-[#5A4030] leading-relaxed max-w-4xl">
              Sau hai vòng prototype, tôi cùng PO đóng gói solution thành một Product Proposal hoàn chỉnh, sẵn sàng bảo vệ trước Ban Giám đốc và các bên liên quan.
            </p>
          </div>

          {/* Proposal Ingredients */}
          <div className="p-5 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] space-y-3">
            <div className="text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase tracking-wider">
              9 THÀNH TỐ TRONG BỘ PRODUCT PROPOSAL ĐƯỢC ĐÓNG GÓI
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 text-xs sm:text-sm font-semibold text-[#2D1B12] pt-1">
              {[
                '1. Business Problem',
                '2. Customer Evidence',
                '3. Benchmark thị trường',
                '4. User Flow chi tiết',
                '5. Clickable Prototype',
                '6. Scope phân kỳ',
                '7. Technical Constraint',
                '8. MVP Definition',
                '9. Expected Metrics'
              ].map((comp, idx) => (
                <div key={idx} className="p-3 rounded bg-[#FFF8E7] border border-[#DFC9A2] text-center">
                  {comp}
                </div>
              ))}
            </div>
          </div>

          {/* Scope Defense Matrix: MVP vs Out of Scope */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFFDF6] border border-[#BBF7D0] shadow-[0_2px_0_#A7F3D0] space-y-3.5">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#15803D] uppercase">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                <span>PHẠM VI BẢO VỆ THÀNH CÔNG CHO MVP (IN-SCOPE)</span>
              </div>
              <div className="grid grid-cols-2 gap-2.5 text-xs sm:text-sm text-[#14532D]">
                <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200">✓ Eligibility Check</div>
                <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200">✓ Khởi tạo nhu cầu</div>
                <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200">✓ Dynamic Checklist</div>
                <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200">✓ Upload & Validation</div>
                <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200">✓ Auto-save Draft</div>
                <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200">✓ Maker / Approver split</div>
                <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200">✓ Ký số Smart CA</div>
                <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200">✓ Transparent Tracking</div>
                <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200 col-span-2">✓ Contextual RM Handoff</div>
              </div>
            </div>

            <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFFDF6] border border-[#FECDD3] shadow-[0_2px_0_#FDA4AF] space-y-3.5">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#991B1B] uppercase">
                <X className="w-4 h-4 text-[#DC2626]" />
                <span>PHẠM VI ĐƯỢC CHỦ ĐỘNG TÁCH RA (OUT OF SCOPE)</span>
              </div>
              <div className="space-y-2.5 text-xs sm:text-sm text-[#7F1D1D]">
                <div className="p-3 rounded bg-rose-50 border border-rose-200 flex items-start gap-2.5">
                  <span className="font-bold">✕</span>
                  <span>Tự động phê duyệt tín dụng (Credit Policy bắt buộc thẩm định con người).</span>
                </div>
                <div className="p-3 rounded bg-rose-50 border border-rose-200 flex items-start gap-2.5">
                  <span className="font-bold">✕</span>
                  <span>Định giá tài sản bảo đảm tự động hoàn toàn.</span>
                </div>
                <div className="p-3 rounded bg-rose-50 border border-rose-200 flex items-start gap-2.5">
                  <span className="font-bold">✕</span>
                  <span>Credit Scoring hoàn toàn tự động không có RM kiểm tra.</span>
                </div>
                <div className="p-3 rounded bg-rose-50 border border-rose-200 flex items-start gap-2.5">
                  <span className="font-bold">✕</span>
                  <span>Các cấu trúc khoản vay phức tạp liên ngân hàng / tài trợ đa bên.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Decision & Value Delivered */}
          <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFF4D6] border-2 border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-2.5">
            <div className="text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase tracking-wider flex items-center gap-2">
              <Check className="w-4 h-4 text-[#B86428]" />
              <span>KẾT QUẢ PHÊ DUYỆT & GIÁ TRỊ RÚT NGẮN THỜI GIAN</span>
            </div>
            <p className="text-sm sm:text-base text-[#4A3326] leading-relaxed">
              Concept được thông qua sau <strong>2 vòng review</strong>. Một thay đổi chiến lược lớn sau vòng đầu: <em>Scope được thu hẹp từ “Digital Lending End-to-End” thành “Digital Origination + Transparent Tracking”.</em>
            </p>
            <div className="p-3.5 rounded bg-white/80 border border-[#DFC9A2] text-sm sm:text-base font-bold text-[#15803D]">
              ★ Việc chủ động thu hẹp scope giúp toàn đội ngũ go-live MVP sớm hơn khoảng 6 tuần so với kế hoạch ban đầu!
            </div>
          </div>
        </section>

        {/* =========================================================================
         * CHAPTER 08 — BA ANALYSIS → REFINEMENT → DEVELOPMENT
         * ========================================================================= */}
        <section id="sec-08" className="space-y-7 scroll-mt-20">
          <div className="space-y-3">
            <span className="px-3 py-1 rounded-[4px] bg-[#E8D9BE] text-[#5A4030] text-xs sm:text-sm font-bold uppercase tracking-wider">
              08 / TECHNICAL REFINEMENT
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#2D1B12]">
              BA Analysis → Refinement → Development
            </h2>
            <p className="text-base sm:text-lg text-[#5A4030] leading-relaxed max-w-4xl">
              Sau khi concept được duyệt, BA bắt đầu phân tích chi tiết. Tôi tiếp tục tham gia refinement hàng tuần cùng PO, BA, Dev, QA, Credit và đại diện RM để giải quyết bài toán kỹ thuật thực tế.
            </p>
          </div>

          {/* 23 Edge Cases Categorization */}
          <div className="p-5 sm:p-7 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_3px_0_#D4C39B] space-y-4">
            <div className="flex items-center justify-between border-b border-[#EAD9B0] pb-3">
              <div className="text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#B86428]" />
                <span>23 EDGE CASES ĐƯỢC PHÁT HIỆN VÀ BỔ SUNG VÀO FLOW</span>
              </div>
              <span className="text-xs sm:text-sm font-mono text-[#B86428] font-bold">Total: 23 Scenarios</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 text-xs sm:text-sm">
              <div className="p-3.5 rounded-[8px] bg-[#FFF8E7] border border-[#DFC9A2] space-y-1.5">
                <div className="font-bold text-[#2563EB] text-sm">6 Permission Cases</div>
                <p className="text-xs sm:text-sm text-[#5A4030] leading-relaxed">Phân quyền thay đổi giữa chừng, mất quyền duyệt, ủy quyền tạm thời.</p>
              </div>
              <div className="p-3.5 rounded-[8px] bg-[#FFF8E7] border border-[#DFC9A2] space-y-1.5">
                <div className="font-bold text-[#16A34A] text-sm">5 Document Cases</div>
                <p className="text-xs sm:text-sm text-[#5A4030] leading-relaxed">File quá 25MB, định dạng lạ, file scan mờ, thiếu chữ ký số con dấu.</p>
              </div>
              <div className="p-3.5 rounded-[8px] bg-[#FFF8E7] border border-[#DFC9A2] space-y-1.5">
                <div className="font-bold text-[#D97706] text-sm">4 Approval Cases</div>
                <p className="text-xs sm:text-sm text-[#5A4030] leading-relaxed">Approver từ chối có comment, yêu cầu sửa 1 phần, hết hạn duyệt 72h.</p>
              </div>
              <div className="p-3.5 rounded-[8px] bg-[#FFF8E7] border border-[#DFC9A2] space-y-1.5">
                <div className="font-bold text-[#7C3AED] text-sm">3 Session Cases</div>
                <p className="text-xs sm:text-sm text-[#5A4030] leading-relaxed">Mất mạng giữa chừng, timeout phiên đăng nhập, xung đột đa thiết bị.</p>
              </div>
              <div className="p-3.5 rounded-[8px] bg-[#FFF8E7] border border-[#DFC9A2] space-y-1.5 col-span-2 sm:col-span-1">
                <div className="font-bold text-[#B86428] text-sm">5 RM Exception</div>
                <p className="text-xs sm:text-sm text-[#5A4030] leading-relaxed">RM đổi chi nhánh, chuyển giao khẩn cấp, tài sản cần giám định hiện trường.</p>
              </div>
            </div>
          </div>

          {/* 4 Crucial Design & Business Decisions */}
          <div className="space-y-3.5">
            <div className="text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase tracking-wider">
              4 QUYẾT ĐỊNH NGHIỆP VỤ QUAN TRỌNG ĐƯỢC CHỐT TRONG REFINEMENT
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 sm:p-5 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-xs space-y-2">
                <div className="font-bold text-[#2D1B12] text-sm sm:text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-[#FFF4D6] border border-[#DFC9A2] text-[#B86428] flex items-center justify-center font-bold text-xs">1</span>
                  <span>Hồ sơ hết hiệu lực</span>
                </div>
                <p className="text-[#5A4030] leading-relaxed pl-8">
                  Tuyệt đối <strong>không xóa hồ sơ cũ</strong>. Hiển thị thông báo trạng thái rõ ràng: <em>“Hồ sơ đã hết hiệu lực — vui lòng cập nhật bản mới nhất”</em> để khách hàng đối chiếu bản cũ.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-xs space-y-2">
                <div className="font-bold text-[#2D1B12] text-sm sm:text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-[#FFF4D6] border border-[#DFC9A2] text-[#B86428] flex items-center justify-center font-bold text-xs">2</span>
                  <span>Người duyệt từ chối hồ sơ</span>
                </div>
                <p className="text-[#5A4030] leading-relaxed pl-8">
                  Maker nhận được thông báo tức thời gồm: Lý do cụ thể, Comment chi tiết của lãnh đạo và nút CTA dẫn thẳng tới đúng mục cần sửa mà không phải nhập lại từ đầu.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-xs space-y-2">
                <div className="font-bold text-[#2D1B12] text-sm sm:text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-[#FFF4D6] border border-[#DFC9A2] text-[#B86428] flex items-center justify-center font-bold text-xs">3</span>
                  <span>API thất bại sau khi submit</span>
                </div>
                <p className="text-[#5A4030] leading-relaxed pl-8">
                  Không bắt người dùng nhập lại bất cứ thông tin nào. Hệ thống tự động lưu giữ Transaction ID trên thiết bị và cung cấp cơ chế One-click Retry an toàn.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-xs space-y-2">
                <div className="font-bold text-[#2D1B12] text-sm sm:text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-[#FFF4D6] border border-[#DFC9A2] text-[#B86428] flex items-center justify-center font-bold text-xs">4</span>
                  <span>RM nhận case trên hệ thống nội bộ</span>
                </div>
                <p className="text-[#5A4030] leading-relaxed pl-8">
                  Màn hình CRM của RM nhận đầy đủ: Profile công ty, Nhu cầu vay, Danh mục tài liệu đã tải, Tiến độ từng bước và toàn bộ nhật ký lỗi mà khách hàng từng gặp phải.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
         * CHAPTER 09 — UAT & ĐO LƯỜNG SAU 8 TUẦN GO-LIVE
         * ========================================================================= */}
        <section id="sec-09" className="space-y-7 scroll-mt-20">
          <div className="space-y-3">
            <span className="px-3 py-1 rounded-[4px] bg-[#E8D9BE] text-[#5A4030] text-xs sm:text-sm font-bold uppercase tracking-wider">
              09 / UAT
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#2D1B12]">
              UAT & Đo lường sau 8 tuần go-live
            </h2>
            <p className="text-base sm:text-lg text-[#5A4030] leading-relaxed max-w-4xl">
              Sau khi Development bàn giao build hoàn chỉnh, tôi trực tiếp tham gia chiến dịch kiểm thử chấp nhận người dùng (UAT) cùng PO, BA và QA.
            </p>
          </div>

          {/* UAT Coverage & 2 Testing Rounds */}
          <div className="p-5 sm:p-7 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_3px_0_#D4C39B] space-y-4">
            <div className="flex items-center justify-between border-b border-[#EAD9B0] pb-3">
              <div className="text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase tracking-wider">
                UAT COVERAGE — 46 TEST SCENARIOS
              </div>
              <span className="text-xs sm:text-sm font-mono text-[#15803D] font-bold">100% Pass Round 2</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs sm:text-sm">
              <div className="p-3.5 rounded bg-[#FFF8E7] border border-[#DFC9A2] space-y-1">
                <strong className="text-[#2D1B12] text-sm sm:text-base block mb-1">17 Happy Path Scenarios</strong>
                <p className="text-[#5A4030] leading-relaxed">Khởi tạo thành công, đính kèm đầy đủ BCTC, duyệt Smart CA, gửi RM thông suốt.</p>
              </div>
              <div className="p-3.5 rounded bg-[#FFF8E7] border border-[#DFC9A2] space-y-1">
                <strong className="text-[#2D1B12] text-sm sm:text-base block mb-1">21 Exception Scenarios</strong>
                <p className="text-[#5A4030] leading-relaxed">Thiếu hồ sơ, từ chối duyệt, file lỗi định dạng, timeout phiên đăng nhập, mất kết nối.</p>
              </div>
              <div className="p-3.5 rounded bg-[#FFF8E7] border border-[#DFC9A2] space-y-1">
                <strong className="text-[#2D1B12] text-sm sm:text-base block mb-1">8 Responsive / State Scenarios</strong>
                <p className="text-[#5A4030] leading-relaxed">Giao diện trên Web màn hình lớn, Tablet và các dòng điện thoại iOS/Android khác nhau.</p>
              </div>
            </div>

            {/* Round 1 vs Round 2 Results */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1 text-xs sm:text-sm">
              <div className="p-4 rounded bg-[#FFF5EB] border border-[#FCD34D] space-y-2">
                <div className="flex justify-between font-bold text-[#B45309] text-sm">
                  <span>KẾT QUẢ UAT VÒNG 1</span>
                  <span>39 / 46 PASS (7 ISSUES)</span>
                </div>
                <div className="text-[#5A4030] space-y-1.5 leading-relaxed">
                  <div>• <strong>3 UX Issues:</strong> Loading state chưa rõ, wording status khác prototype, Approver Summary thiếu mục đích vay.</div>
                  <div>• <strong>2 Functional Issues:</strong> Draft restore bị delay, upload retry chưa tự động refresh.</div>
                  <div>• <strong>2 Responsive Issues:</strong> Hiển thị lệch nút trên thiết bị mobile có viewport hẹp.</div>
                </div>
              </div>

              <div className="p-4 rounded bg-[#F0FDF4] border border-[#86EFAC] space-y-2">
                <div className="flex justify-between font-bold text-[#15803D] text-sm">
                  <span>KẾT QUẢ UAT VÒNG 2</span>
                  <span>46 / 46 PASS (100%)</span>
                </div>
                <p className="text-[#14532D] leading-relaxed pt-1">
                  Toàn bộ 7 issues phát sinh được đội ngũ Dev và Design phối hợp giải quyết triệt để và regression test thành công, đạt tiêu chuẩn khắt khe để Go-live!
                </p>
              </div>
            </div>
          </div>

          {/* Rollout Strategy */}
          <div className="p-4 sm:p-5 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] space-y-2.5">
            <div className="text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase tracking-wider">
              CHIẾN LƯỢC TRIỂN KHAI GO-LIVE (ROLLOUT PHASES)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm">
              <div className="p-3.5 rounded bg-[#FFF8E7] border border-[#DFC9A2]">
                <strong className="text-[#B86428] text-sm block mb-0.5">Phase 1 (Tuần 1): 10% Khách hàng đủ điều kiện</strong>
                <p className="text-[#5A4030] leading-relaxed">Theo dõi log sự kiện và ghi nhận phản hồi ban đầu của RM chi nhánh.</p>
              </div>
              <div className="p-3.5 rounded bg-[#FFF8E7] border border-[#DFC9A2]">
                <strong className="text-[#15803D] text-sm block mb-0.5">Phase 2 (Tuần 3 trở đi): 100% Khách hàng mục tiêu</strong>
                <p className="text-[#5A4030] leading-relaxed">Mở rộng toàn bộ cho tập khách hàng doanh nghiệp Upper SME & CIB trên BIZ MBBank.</p>
              </div>
            </div>
          </div>

          {/* Full Metrics Deep Dive Table */}
          <div className="p-5 sm:p-7 rounded-[12px] bg-[#FFFDF6] border-2 border-[#DFC9A2] shadow-[0_3px_0_#D4C39B] space-y-4">
            <div className="flex items-center justify-between border-b border-[#EAD9B0] pb-3">
              <div className="text-xs sm:text-sm font-bold text-[#2D1B12] uppercase tracking-wider flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#15803D]" />
                <span>KẾT QUẢ ĐO LƯỜNG CHI TIẾT SAU 8 TUẦN GO-LIVE</span>
              </div>
              <span className="text-xs sm:text-sm font-mono text-[#8C5832]">8 Weeks Post-launch</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-[#DFC9A2] text-[#7A3F1F] font-bold">
                    <th className="py-3 px-3.5">Chỉ số đo lường</th>
                    <th className="py-3 px-3.5">Trước cải tiến</th>
                    <th className="py-3 px-3.5">Sau 8 tuần go-live</th>
                    <th className="py-3 px-3.5">Mức độ thay đổi</th>
                    <th className="py-3 px-3.5">Động lực tạo ra kết quả</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAD9B0] text-[#334155]">
                  <tr>
                    <td className="py-3 px-3.5 font-bold text-[#2D1B12]">Completion Rate</td>
                    <td className="py-3 px-3.5 text-rose-700 font-mono text-sm">34%</td>
                    <td className="py-3 px-3.5 text-emerald-700 font-mono font-bold text-base">52%</td>
                    <td className="py-3 px-3.5 font-bold text-[#15803D] text-sm">+18 điểm %</td>
                    <td className="py-3 px-3.5 text-xs sm:text-sm text-[#5A4030] leading-relaxed">Khách hàng hiểu điều kiện và danh mục hồ sơ từ bước Readiness.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3.5 font-bold text-[#2D1B12]">Hồ sơ cần bổ sung</td>
                    <td className="py-3 px-3.5 text-rose-700 font-mono text-sm">38%</td>
                    <td className="py-3 px-3.5 text-emerald-700 font-mono font-bold text-base">24%</td>
                    <td className="py-3 px-3.5 font-bold text-[#15803D] text-sm">−14 điểm %</td>
                    <td className="py-3 px-3.5 text-xs sm:text-sm text-[#5A4030] leading-relaxed">Dynamic checklist cung cấp hướng dẫn định dạng và file mẫu chi tiết.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3.5 font-bold text-[#2D1B12]">Median Completion Time</td>
                    <td className="py-3 px-3.5 text-rose-700 font-mono text-sm">52 phút</td>
                    <td className="py-3 px-3.5 text-emerald-700 font-mono font-bold text-base">31 phút</td>
                    <td className="py-3 px-3.5 font-bold text-[#15803D] text-sm">−40% thời gian</td>
                    <td className="py-3 px-3.5 text-xs sm:text-sm text-[#5A4030] leading-relaxed">Dữ liệu doanh nghiệp được prefill tự động, giảm thao tác gõ lặp lại.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3.5 font-bold text-[#2D1B12]">RM Intervention trước submit</td>
                    <td className="py-3 px-3.5 text-rose-700 font-mono text-sm">47%</td>
                    <td className="py-3 px-3.5 text-emerald-700 font-mono font-bold text-base">29%</td>
                    <td className="py-3 px-3.5 font-bold text-[#15803D] text-sm">−18 điểm %</td>
                    <td className="py-3 px-3.5 text-xs sm:text-sm text-[#5A4030] leading-relaxed">Khách hàng tự phục vụ (Self-service) ở các bước chuẩn bị cơ bản.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3.5 font-bold text-[#2D1B12]">Draft Recovery trong 7 ngày</td>
                    <td className="py-3 px-3.5 text-slate-400">Chưa đo lường</td>
                    <td className="py-3 px-3.5 text-emerald-700 font-mono font-bold text-base">61%</td>
                    <td className="py-3 px-3.5 font-bold text-[#15803D] text-sm">Đo lường mới</td>
                    <td className="py-3 px-3.5 text-xs sm:text-sm text-[#5A4030] leading-relaxed">Tính năng Auto-save và thông báo nhắc nhở quay lại bản nháp thông minh.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3.5 font-bold text-[#2D1B12]">Approval Time nội bộ</td>
                    <td className="py-3 px-3.5 text-rose-700 font-mono text-sm">19 giờ</td>
                    <td className="py-3 px-3.5 text-emerald-700 font-mono font-bold text-base">11 giờ</td>
                    <td className="py-3 px-3.5 font-bold text-[#15803D] text-sm">−42% thời gian</td>
                    <td className="py-3 px-3.5 text-xs sm:text-sm text-[#5A4030] leading-relaxed">Decision Summary 1 trang trên Mobile giúp CEO ký duyệt mọi lúc mọi nơi.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =========================================================================
         * CHAPTER 10 — NHÌN LẠI, QUY TRÌNH 14 BƯỚC & CLOSING
         * ========================================================================= */}
        <section id="sec-10" className="space-y-7 scroll-mt-20">
          <div className="space-y-3">
            <span className="px-3 py-1 rounded-[4px] bg-[#E8D9BE] text-[#5A4030] text-xs sm:text-sm font-bold uppercase tracking-wider">
              10 / BÀI HỌC RÚT RA
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#2D1B12]">
              Tự soi rọi, Next Iteration & Triết lý phát triển
            </h2>
            <p className="text-base sm:text-lg text-[#5A4030] leading-relaxed max-w-4xl">
              Một case study trung thực không thể chỉ có câu chuyện thành công. Sau 8 tuần vận hành, chúng tôi nghiêm túc nhìn nhận những gì chưa đạt được và vạch ra lộ trình tiếp theo.
            </p>
          </div>

          {/* 12. Những gì chưa đạt được */}
          <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFF5F5] border border-[#FECDD3] space-y-3.5">
            <div className="text-xs sm:text-sm font-bold text-[#991B1B] uppercase flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#DC2626]" />
              <span>12. NHỮNG GÌ CHÚNG TÔI VẪN CHƯA ĐẠT ĐƯỢC</span>
            </div>
            <p className="text-sm sm:text-base text-[#5E3A32] leading-relaxed">
              Sau 8 tuần, chúng tôi vẫn ghi nhận <strong>24% hồ sơ</strong> cần bổ sung tài liệu. Phân tích sâu cho thấy phần lớn rơi vào: Báo cáo tài chính, Hồ sơ tài sản và Hồ sơ dự án mở rộng.
            </p>
            <div className="p-3.5 rounded bg-white/80 border border-rose-200 text-xs sm:text-sm text-[#7F1D1D] space-y-1">
              <strong className="text-sm block">Phát hiện một vấn đề hoàn toàn mới:</strong>
              <p className="leading-relaxed">Khách hàng hiểu checklist tốt hơn nhưng vẫn chưa biết: <em>“Tài liệu này tôi lấy ở phòng ban nào trong doanh nghiệp của mình?”</em> — Đây chính là đề bài input cho iteration tiếp theo.</p>
            </div>
          </div>

          {/* 13. Next Iteration 4 Pillars */}
          <div className="p-5 sm:p-7 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_3px_0_#D4C39B] space-y-4">
            <div className="text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#B86428]" />
              <span>13. KẾ HOẠCH CHO VÒNG LẶP TIẾP THEO (NEXT ITERATION)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs sm:text-sm">
              <div className="p-4 rounded bg-[#FFF8E7] border border-[#DFC9A2] space-y-1.5">
                <div className="font-bold text-[#B86428] text-sm sm:text-base">01 — Smart Checklist</div>
                <p className="text-[#5A4030] leading-relaxed">Gợi ý phòng ban nào thường giữ tài liệu, tài liệu thay thế và mẫu biểu chuẩn.</p>
              </div>
              <div className="p-4 rounded bg-[#FFF8E7] border border-[#DFC9A2] space-y-1.5">
                <div className="font-bold text-[#B86428] text-sm sm:text-base">02 — Reuse Existing Documents</div>
                <p className="text-[#5A4030] leading-relaxed">Nếu ngân hàng đã lưu tài liệu còn thời hạn hiệu lực, tuyệt đối không bắt khách hàng tải lại.</p>
              </div>
              <div className="p-4 rounded bg-[#FFF8E7] border border-[#DFC9A2] space-y-1.5">
                <div className="font-bold text-[#B86428] text-sm sm:text-base">03 — Document Health Check</div>
                <p className="text-[#5A4030] leading-relaxed">Kiểm tra tự động định dạng, con dấu, ngày hết hạn và dữ liệu cơ bản trước khi nộp.</p>
              </div>
              <div className="p-4 rounded bg-[#FFF8E7] border border-[#DFC9A2] space-y-1.5">
                <div className="font-bold text-[#B86428] text-sm sm:text-base">04 — Credit Dashboard</div>
                <p className="text-[#5A4030] leading-relaxed">Một nơi tập trung duy nhất để quản lý: Nhu cầu mới, hồ sơ đang xử lý, khoản vay và nghĩa vụ sau giải ngân.</p>
              </div>
            </div>
          </div>

          {/* 14 & 15. Điều làm tốt vs Điều chưa làm tốt */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 14. Điều làm tốt */}
            <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-3.5">
              <div className="text-xs sm:text-sm font-bold text-[#15803D] uppercase flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                <span>14. ĐIỀU TÔI ĐÃ LÀM TỐT</span>
              </div>
              <div className="space-y-2.5 text-xs sm:text-sm text-[#334155]">
                <div className="p-3 rounded bg-emerald-50/70 border border-emerald-200">
                  <strong className="text-[#14532D] text-sm block mb-1">• Tham gia từ trước khi requirement được đóng:</strong>
                  <span className="leading-relaxed">Tôi không nhận một bản PRD tĩnh đã hoàn thành rồi mới vẽ UI, mà cùng PO xác định đúng bản chất bài toán từ đầu.</span>
                </div>
                <div className="p-3 rounded bg-emerald-50/70 border border-emerald-200">
                  <strong className="text-[#14532D] text-sm block mb-1">• Prototype trước khi đầu tư Development:</strong>
                  <span className="leading-relaxed">Việc test concept sớm trước khi BA phân tích chi tiết giúp loại bỏ rủi ro sai lệch flow, tiết kiệm rất lớn chi phí làm lại.</span>
                </div>
                <div className="p-3 rounded bg-emerald-50/70 border border-emerald-200">
                  <strong className="text-[#14532D] text-sm block mb-1">• Không cố loại bỏ con người:</strong>
                  <span className="leading-relaxed">Thấu hiểu rằng trong B2B Lending, trải nghiệm tốt nhất là digital hóa phần chuẩn hóa, và đưa RM vào đúng thời điểm có giá trị.</span>
                </div>
                <div className="p-3 rounded bg-emerald-50/70 border border-emerald-200">
                  <strong className="text-[#14532D] text-sm block mb-1">• Bám sát sản phẩm đến sau Go-live:</strong>
                  <span className="leading-relaxed">Vai trò không kết thúc ở design handoff, mà tiếp tục đồng hành qua Refinement, UAT, Launching và phân tích log sự kiện.</span>
                </div>
              </div>
            </div>

            {/* 15. Điều chưa làm tốt */}
            <div className="p-5 sm:p-6 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-[0_2px_0_#D4C39B] space-y-3.5">
              <div className="text-xs sm:text-sm font-bold text-[#991B1B] uppercase flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#DC2626]" />
                <span>15. ĐIỀU TÔI CHƯA LÀM TỐT (BÀI HỌC CẢI THIỆN)</span>
              </div>
              <div className="space-y-2.5 text-xs sm:text-sm text-[#334155]">
                <div className="p-3 rounded bg-rose-50/70 border border-rose-200">
                  <strong className="text-[#7F1D1D] text-sm block mb-1">• Measurement Framework được xây quá muộn:</strong>
                  <span className="leading-relaxed">Ban đầu tập trung nhiều vào concept và flow, một số sự kiện hành vi chưa được gắn tracking ngay khiến số liệu baseline ban đầu thiếu độ sâu.</span>
                </div>
                <div className="p-3 rounded bg-rose-50/70 border border-rose-200">
                  <strong className="text-[#7F1D1D] text-sm block mb-1">• Research ban đầu thiên nhiều về người khởi tạo:</strong>
                  <span className="leading-relaxed">Tuyển mẫu ban đầu chủ yếu là kế toán viên (Maker), sau đó mới nhận ra tầm ảnh hưởng then chốt của người duyệt (Approver).</span>
                </div>
                <div className="p-3 rounded bg-rose-50/70 border border-rose-200">
                  <strong className="text-[#7F1D1D] text-sm block mb-1">• Benchmark từng ảnh hưởng quá mạnh đến giải pháp:</strong>
                  <span className="leading-relaxed">Một vài pattern đối thủ từng được team mặc định là best practice, nhưng khi test mới nhận ra nó không phù hợp với thói quen doanh nghiệp Việt Nam.</span>
                </div>
              </div>
            </div>
          </div>

        </section>
      </div>

      {/* =========================================================================
       * LIGHTBOX MODAL: FULL RESOLUTION USER FLOW DIAGRAM
       * ========================================================================= */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-6xl w-full max-h-[90vh] bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-white text-xs sm:text-sm font-bold">
              <div className="flex items-center gap-2">
                <Workflow className="w-4 h-4 text-sky-400" />
                <span>SƠ ĐỒ LUỒNG TOÀN TRÌNH 11 BƯỚC: BIZ MBBANK LENDING FLOW</span>
              </div>
              <button
                onClick={() => setLightboxImage(null)}
                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-100px)] space-y-4 text-slate-200">
              <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-950 p-6 text-center space-y-4">
                <div className="text-base sm:text-lg font-bold text-sky-400">KIẾN TRÚC LUỒNG 11 BƯỚC HOÀN CHỈNH</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-left text-xs sm:text-sm text-slate-300">
                  <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
                    <strong className="text-sky-300 text-sm sm:text-base block">1. Kế toán viên (Maker):</strong>
                    <p className="text-slate-400 leading-relaxed">Kiểm tra mức độ sẵn sàng, chuẩn bị checklist động theo ngành nghề, upload BCTC và submit nội bộ.</p>
                  </div>
                  <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
                    <strong className="text-emerald-300 text-sm sm:text-base block">2. Lãnh đạo (CFO/CEO - Approver):</strong>
                    <p className="text-slate-400 leading-relaxed">Xem Decision Summary 1 trang trên Mobile App, đối soát cam kết và ký số Smart CA.</p>
                  </div>
                  <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
                    <strong className="text-purple-300 text-sm sm:text-base block">3. Chuyên viên RM MBBank:</strong>
                    <p className="text-slate-400 leading-relaxed">Tiếp nhận hồ sơ có ngữ cảnh đầy đủ qua CRM nội bộ để hỗ trợ khách hàng không gián đoạn.</p>
                  </div>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => setLightboxImage(null)}
                    className="px-6 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-semibold cursor-pointer"
                  >
                    Đóng cửa sổ xem chi tiết (Esc)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

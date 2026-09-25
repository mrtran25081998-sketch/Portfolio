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
  Car,
  Factory,
  ArrowRight,
  AlertTriangle,
  BarChart3,
  Maximize2,
  Eye,
  Check,
  FileText,
  Clock,
  ArrowDown,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  FolderOpen
} from 'lucide-react';
import { ProjectItem } from '../../../types';

interface BizMBBankCaseStudyProps {
  project: ProjectItem;
  onBack: () => void;
}

interface VisualItem {
  src: string;
  fallbackText?: string;
  type: 'UI DESIGN' | 'USER FLOW' | 'WIREFRAME' | 'PROTOTYPE' | 'UAT / BUILD' | 'SLIDE DECK';
  caption?: string;
  aspect?: string;
  badge?: string;
}

const CHAPTERS = [
  { id: 'sec-hero', num: '00', title: 'Giới thiệu' },
  { id: 'sec-01', num: '01', title: 'Tổng quan' },
  { id: 'sec-02', num: '02', title: 'Làm rõ bài toán' },
  { id: 'sec-03', num: '03', title: 'Bài toán thiết kế' },
  { id: 'sec-04', num: '04', title: 'Xây dựng giải pháp' },
  { id: 'sec-05', num: '05', title: 'Usability Testing' },
  { id: 'sec-06', num: '06', title: 'Bảo vệ giải pháp' },
  { id: 'sec-07', num: '07', title: 'BA & Dev' },
  { id: 'sec-08', num: '08', title: 'UAT' },
  { id: 'sec-09', num: '09', title: 'Go-live & Tracking' },
  { id: 'sec-10', num: '10', title: 'Nhìn lại' },
  { id: 'sec-11', num: '11', title: 'Cải tiến tiếp' }
];

export const BizMBBankCaseStudy: React.FC<BizMBBankCaseStudyProps> = ({
  project
}) => {
  const [activeChapter, setActiveChapter] = useState('sec-hero');
  const [lightboxVisual, setLightboxVisual] = useState<VisualItem | null>(null);
  const [lightboxZoom, setLightboxZoom] = useState<number>(1);

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

    el.addEventListener('wheel', handleWheel, { passive: false });
    el.addEventListener('scroll', checkScrollability);
    window.addEventListener('resize', checkScrollability);

    return () => {
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('scroll', checkScrollability);
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

  // Handle ESC for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxVisual(null);
        setLightboxZoom(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollChapters = (direction: 'left' | 'right') => {
    if (chapterNavRef.current) {
      chapterNavRef.current.scrollBy({
        left: direction === 'left' ? -240 : 240,
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

  const openLightbox = (visual: VisualItem) => {
    setLightboxVisual(visual);
    setLightboxZoom(1);
  };

  /**
   * Component VisualBlock: Renders clean browser/canvas mockup.
   * If image loads, displays it; otherwise shows a professional Product Design placeholder.
   */
  const VisualBlock: React.FC<{
    item: VisualItem;
    className?: string;
    showZoomHint?: boolean;
  }> = ({ item, className = '', showZoomHint = true }) => {
    const [imgFailed, setImgFailed] = useState(false);

    return (
      <div
        onClick={() => openLightbox(item)}
        className={`group relative rounded-[10px] overflow-hidden border border-[#D5C29D] bg-[#FDFBF7] shadow-xs cursor-pointer hover:border-[#B86428] hover:shadow-md transition-all ${className}`}
      >
        {/* Minimalist Browser Header Bar */}
        <div className="px-3 py-2 bg-[#F6EEDD] border-b border-[#E8DCB8] flex items-center justify-between text-[11px] select-none">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E8A598]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#F5D588]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#A8DAB5]" />
            <span className="ml-2 font-mono text-[10px] font-bold text-[#8C6D4C] uppercase tracking-wider">
              {item.type}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {item.badge && (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EADBBE] text-[#5A4030]">
                {item.badge}
              </span>
            )}
            {showZoomHint && (
              <span className="text-[#8C6D4C] opacity-60 group-hover:opacity-100 flex items-center gap-1 text-[10px] font-semibold transition-opacity">
                <Maximize2 className="w-3 h-3" />
                <span>Zoom</span>
              </span>
            )}
          </div>
        </div>

        {/* Visual Content Body */}
        <div className="relative bg-[#FAF6EE] flex items-center justify-center min-h-[180px] overflow-hidden">
          {!imgFailed ? (
            <img
              src={item.src}
              alt={item.caption || item.type}
              onError={() => setImgFailed(true)}
              className="w-full h-auto object-cover object-top max-h-[580px] transition-transform duration-300 group-hover:scale-[1.01]"
              loading="lazy"
            />
          ) : (
            /* High-fidelity Product Design Placeholder */
            <div className="p-6 sm:p-8 w-full flex flex-col items-center justify-center text-center space-y-3 bg-gradient-to-b from-[#FBF8F1] to-[#F5EEDB]">
              <div className="w-12 h-12 rounded-full bg-[#EFE4CA] border border-[#DFC9A2] flex items-center justify-center text-[#B86428]">
                {item.type === 'USER FLOW' ? (
                  <Workflow className="w-6 h-6" />
                ) : item.type === 'WIREFRAME' ? (
                  <Layers className="w-6 h-6" />
                ) : (
                  <Eye className="w-6 h-6" />
                )}
              </div>

              <div className="space-y-1 max-w-md">
                <div className="inline-block px-2.5 py-0.5 rounded bg-[#FFF0D4] border border-[#DFC9A2] text-xs font-mono font-bold text-[#B86428] uppercase tracking-wider">
                  {item.type} — Replace with actual asset
                </div>
                <p className="text-xs text-[#5A4030] font-medium leading-relaxed">
                  {item.fallbackText || item.caption || 'Asset location ready for production screenshots'}
                </p>
                <div className="font-mono text-[10px] text-[#8C6D4C] bg-[#ECE0C2]/60 px-2 py-1 rounded inline-block">
                  {item.src}
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs text-[#B86428] font-bold pt-1 opacity-80 group-hover:opacity-100">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Bấm để xem chi tiết</span>
              </div>
            </div>
          )}
        </div>

        {/* Optional Caption Footer */}
        {item.caption && (
          <div className="px-3.5 py-2 bg-[#F8F1E2] border-t border-[#E8DCB8] text-[11px] text-[#6B513C] flex items-center justify-between">
            <span className="font-medium italic">{item.caption}</span>
            <span className="text-[10px] text-[#9E8364] font-mono">BIZ MBBank Web</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-[#FFF8E7] select-text">
      {/* =========================================================================
       * FIXED SUBHEADER: CHAPTER NAVIGATION
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
                className={`px-3 py-1.5 rounded-[5px] font-sans text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#F4C542] text-[#2D1B12] shadow-[0_2px_0_#9E875C] ring-1 ring-[#D9A726] scale-[1.02]'
                    : 'bg-[#FFF8E7] hover:bg-[#FFECC2] text-[#7A3F1F] border border-[#DFC9A2]'
                }`}
                title={c.title}
              >
                <span className={isActive ? 'text-[#2D1B12] font-black' : 'text-[#8C5832] font-bold'}>
                  {c.num}
                </span>
                <span className="ml-1 text-[#4A3326] font-medium">• {c.title}</span>
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
       * SCROLLABLE CASE STUDY CONTENT BODY (MAX WIDTH ~1240PX)
       * ========================================================================= */}
      <div
        ref={scrollContainerRef}
        id="casestudy-body-container"
        className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-12 sm:space-y-16 bg-[#FFF8E7] text-[#2D1B12] voxel-scrollbar font-sans pb-24 relative"
      >
        <div className="max-w-[1240px] mx-auto space-y-14 sm:space-y-16">

          {/* =====================================================================
           * SECTION 00: HERO — BIZ MBBANK
           * ===================================================================== */}
          <section id="sec-hero" className="space-y-6 pt-1">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* Left Column: Title, Subtitle, Metadata (5 Cols) */}
              <div className="lg:col-span-5 space-y-4 max-w-xl">
                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-[4px] bg-[#F4C542]/30 border border-[#B86428]/40 text-[#B86428] text-xs font-bold uppercase tracking-wider inline-block">
                    PRODUCT DESIGN CASE STUDY
                  </span>
                  <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#2D1B12] tracking-tight leading-[1.2]">
                    BIZ MBBank
                    <span className="block text-2xl sm:text-3xl text-[#8C4312] font-bold mt-1">
                      Cấp hạn mức trung dài hạn
                    </span>
                  </h1>
                </div>

                <p className="text-base sm:text-lg text-[#5A4030] leading-relaxed">
                  Xây dựng hành trình số giúp khách hàng doanh nghiệp khởi tạo, hoàn thiện và gửi phương án trung dài hạn tới MB.
                </p>

                {/* Metadata Grid (6 Items) */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                  <div className="p-3 rounded-[8px] bg-[#FFFDF6] border border-[#DFC9A2] space-y-0.5">
                    <div className="text-[10px] uppercase font-bold text-[#7A3F1F]">Loại dự án</div>
                    <div className="text-xs sm:text-sm font-bold text-[#2D1B12]">Xây dựng mới · 0→1</div>
                  </div>
                  <div className="p-3 rounded-[8px] bg-[#FFFDF6] border border-[#DFC9A2] space-y-0.5">
                    <div className="text-[10px] uppercase font-bold text-[#7A3F1F]">Trạng thái</div>
                    <div className="text-xs sm:text-sm font-bold text-[#15803D]">Đã triển khai</div>
                  </div>
                  <div className="p-3 rounded-[8px] bg-[#FFFDF6] border border-[#DFC9A2] space-y-0.5">
                    <div className="text-[10px] uppercase font-bold text-[#7A3F1F]">Lĩnh vực</div>
                    <div className="text-xs sm:text-sm font-bold text-[#2D1B12]">Doanh nghiệp · Tín dụng</div>
                  </div>
                  <div className="p-3 rounded-[8px] bg-[#FFFDF6] border border-[#DFC9A2] space-y-0.5">
                    <div className="text-[10px] uppercase font-bold text-[#7A3F1F]">Nền tảng</div>
                    <div className="text-xs sm:text-sm font-bold text-[#2D1B12]">Web Portal</div>
                  </div>
                  <div className="p-3 rounded-[8px] bg-[#FFFDF6] border border-[#DFC9A2] space-y-0.5">
                    <div className="text-[10px] uppercase font-bold text-[#7A3F1F]">Vai trò</div>
                    <div className="text-xs sm:text-sm font-bold text-[#2D1B12]">Product Designer</div>
                  </div>
                  <div className="p-3 rounded-[8px] bg-[#FFFDF6] border border-[#DFC9A2] space-y-0.5">
                    <div className="text-[10px] uppercase font-bold text-[#7A3F1F]">Năm</div>
                    <div className="text-xs sm:text-sm font-bold text-[#2D1B12]">2026</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Hero Composition (7 Cols) */}
              <div className="lg:col-span-7 space-y-3">
                <VisualBlock
                  item={{
                    src: '/case-study/term-loan-case-study/01-entry-hero.jpg',
                    fallbackText: 'Màn hình khởi tạo Phương án trung dài hạn trên BIZ MBBank Web',
                    type: 'UI DESIGN',
                    caption: 'Màn hình chính Đề nghị cấp hạn mức trung dài hạn dành cho khách hàng doanh nghiệp',
                    badge: 'UI Thực tế'
                  }}
                  className="shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
                />
              </div>
            </div>
          </section>

          {/* =====================================================================
           * SECTION I: TỔNG QUAN DỰ ÁN
           * ===================================================================== */}
          <section id="sec-01" className="space-y-6 scroll-mt-20">
            <div className="space-y-2 border-b border-[#DFC9A2] pb-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D1B12]">
                I. Tổng quan dự án
              </h2>
            </div>

            {/* Giới thiệu ngắn (<600px width) */}
            <p className="text-base text-[#5A4030] leading-relaxed max-w-2xl">
              Phương án trung dài hạn là một hành trình tín dụng có nhiều thông tin, nhiều hồ sơ và nhiều bên cùng tham gia. Tôi phụ trách thiết kế trải nghiệm xuyên suốt để khách hàng doanh nghiệp có thể khởi tạo phương án, bổ sung hồ sơ, thực hiện phê duyệt nội bộ và gửi MB xử lý trực tiếp trên BIZ MBBank.
            </p>

            {/* 4 Số lớn: Tổng quan nhanh */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
              <div className="p-4 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] text-center space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-[#B86428] font-mono">0 → 1</div>
                <div className="text-xs text-[#5A4030] font-semibold">Xây dựng mới</div>
              </div>
              <div className="p-4 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] text-center space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-[#B86428] font-mono">4</div>
                <div className="text-xs text-[#5A4030] font-semibold">Bước chính của Maker</div>
              </div>
              <div className="p-4 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] text-center space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-[#B86428] font-mono">3</div>
                <div className="text-xs text-[#5A4030] font-semibold">Vai trò: Maker → Approver → MB</div>
              </div>
              <div className="p-4 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] text-center space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-[#B86428] font-mono">1</div>
                <div className="text-xs text-[#5A4030] font-semibold">Luồng xuyên suốt & Return loop</div>
              </div>
            </div>

            {/* Horizontal Journey: 4 Bước chính */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold text-[#7A3F1F] uppercase tracking-wider">
                HÀNH TRÌNH 4 BƯỚC CỦA MAKER
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { step: '01', title: 'Thông tin phương án', desc: 'Dynamic Form theo nhu cầu vốn' },
                  { step: '02', title: 'Thông tin doanh nghiệp', desc: 'Điền sẵn dữ liệu MB đã có' },
                  { step: '03', title: 'Thông tin hồ sơ', desc: 'Cấu trúc 4 nhóm tài liệu' },
                  { step: '04', title: 'Xác nhận', desc: 'Review Layer trước khi gửi duyệt' }
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-[8px] bg-[#FFF8E7] border border-[#DFC9A2] space-y-1">
                    <div className="text-xs font-mono font-bold text-[#B86428]">{item.step}</div>
                    <div className="text-xs sm:text-sm font-bold text-[#2D1B12]">{item.title}</div>
                    <div className="text-[11px] text-[#6B513C]">{item.desc}</div>
                  </div>
                ))}
              </div>

              {/* 4 screens thực tế tương ứng 4 bước của Maker */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <VisualBlock
                  item={{
                    src: '/case-study/term-loan-case-study/02-maker-step-1-vehicle-dynamic-form.jpg',
                    fallbackText: 'Bước 1: Thông tin phương án (Dynamic Form)',
                    type: 'UI DESIGN',
                    caption: 'Bước 1: Thông tin phương án (Form động)',
                    badge: 'Bước 01'
                  }}
                />
                <VisualBlock
                  item={{
                    src: '/case-study/term-loan-case-study/13-maker-step-2-company-prefill-readonly-editable.jpg',
                    fallbackText: 'Bước 2: Thông tin doanh nghiệp',
                    type: 'UI DESIGN',
                    caption: 'Bước 2: Thông tin doanh nghiệp (Prefill)',
                    badge: 'Bước 02'
                  }}
                />
                <VisualBlock
                  item={{
                    src: '/case-study/term-loan-case-study/10-maker-step-3-documents-four-groups-upload.jpg',
                    fallbackText: 'Bước 3: Thông tin hồ sơ',
                    type: 'UI DESIGN',
                    caption: 'Bước 3: Thông tin hồ sơ (4 nhóm tài liệu)',
                    badge: 'Bước 03'
                  }}
                />
                <VisualBlock
                  item={{
                    src: '/case-study/term-loan-case-study/08-resume-draft-confirmation.jpg',
                    fallbackText: 'Bước 4: Xác nhận và review',
                    type: 'UI DESIGN',
                    caption: 'Bước 4: Xác nhận (Review tổng hợp)',
                    badge: 'Bước 04'
                  }}
                />
              </div>
            </div>

            {/* Bài toán & Highlight quote */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2 items-center">
              <div className="md:col-span-7 space-y-3">
                <h3 className="text-sm font-bold text-[#7A3F1F] uppercase tracking-wider">
                  Bài toán đặt ra
                </h3>
                <p className="text-sm sm:text-base text-[#5A4030] leading-relaxed max-w-xl">
                  Trước dự án, sản phẩm chưa có một hành trình số hoàn chỉnh cho Phương án trung dài hạn. Maker phải chuẩn bị nhiều nhóm thông tin và hồ sơ. Approver cần kiểm tra trước khi gửi. Trong quá trình xử lý, MB có thể trả phương án lại để khách hàng bổ sung hoặc chỉnh sửa.
                </p>
                <p className="text-sm sm:text-base text-[#5A4030] leading-relaxed max-w-xl">
                  Nếu chỉ chuyển toàn bộ nghiệp vụ thành một biểu mẫu online, kết quả sẽ là một hành trình rất dài, nhiều trường thông tin và khó kiểm soát.
                </p>
              </div>

              <div className="md:col-span-5 p-5 rounded-[10px] bg-[#FFF4D6] border-l-4 border-[#B86428] shadow-xs">
                <div className="text-base sm:text-lg font-bold text-[#4A2414] italic leading-relaxed">
                  “Bài toán của tôi là đơn giản hóa trải nghiệm mà không làm mất logic tín dụng phía sau.”
                </div>
              </div>
            </div>

            {/* 5 Giải pháp tóm gọn */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold text-[#7A3F1F] uppercase tracking-wider">
                5 ĐỊNH HƯỚNG GIẢI PHÁP
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {[
                  { title: 'Biểu mẫu động', desc: 'Chỉ hiển thị thông tin phù hợp với nhu cầu sử dụng vốn.' },
                  { title: 'Điền sẵn dữ liệu', desc: 'Tận dụng dữ liệu định danh doanh nghiệp MB đã có sẵn.' },
                  { title: 'Lưu và tiếp tục', desc: 'Cho phép dừng lại và quay lại sau mà không mất dữ liệu.' },
                  { title: 'Phân nhóm hồ sơ', desc: 'Giúp khách hàng hiểu mình cần chuẩn bị đúng tài liệu gì.' },
                  { title: 'Trả lại và gửi lại', desc: 'Maker chỉnh sửa đúng phần MB yêu cầu, giữ nguyên phần cũ.' }
                ].map((sol, idx) => (
                  <div key={idx} className="p-3.5 rounded-[8px] bg-[#FFFDF6] border border-[#DFC9A2] space-y-1">
                    <div className="text-xs sm:text-sm font-bold text-[#2D1B12]">{sol.title}</div>
                    <p className="text-xs text-[#6B513C] leading-relaxed">{sol.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =====================================================================
           * SECTION II: LÀM RÕ BÀI TOÁN
           * ===================================================================== */}
          <section id="sec-02" className="space-y-6 scroll-mt-20">
            <div className="space-y-2 border-b border-[#DFC9A2] pb-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D1B12]">
                II. Làm rõ bài toán
              </h2>
              <p className="text-sm sm:text-base text-[#6B513C]">
                Trước khi thiết kế giao diện, tôi và PO cần hiểu toàn bộ vòng đời của một phương án tín dụng.
              </p>
            </div>

            {/* Block 01: Yêu cầu ban đầu & Những câu hỏi mở */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-5 space-y-3 max-w-xl">
                <div className="text-xs font-bold text-[#7A3F1F] uppercase tracking-wider">
                  Yêu cầu ban đầu từ Business
                </div>
                <div className="p-3.5 rounded bg-[#FFF4D6] border border-[#DFC9A2] text-sm italic text-[#4A2414] font-medium">
                  “Xây dựng tính năng để khách hàng doanh nghiệp đề nghị cấp hạn mức trung dài hạn trực tiếp trên BIZ MBBank.”
                </div>
                <p className="text-xs sm:text-sm text-[#5A4030] leading-relaxed pt-1">
                  Nhưng phía sau yêu cầu đó còn nhiều câu hỏi nghiệp vụ và trải nghiệm chưa được trả lời:
                </p>
                <ul className="space-y-1.5 text-xs sm:text-sm text-[#5A4030] pl-3 list-disc">
                  <li>Maker cần đi qua những bước nào?</li>
                  <li>Dữ liệu nào phải nhập, dữ liệu nào MB đã có?</li>
                  <li>Approver tham gia ở đâu trong quy trình?</li>
                  <li>Hồ sơ được tổ chức như thế nào?</li>
                  <li>MB trả phương án lại thì chuyện gì xảy ra? Dữ liệu cũ có được giữ lại hay không?</li>
                </ul>
              </div>

              {/* Visual: User Flow Thực Tế (Full-width / 7 cols) */}
              <div className="lg:col-span-7 space-y-2">
                {/* Replace with actual User Flow */}
                <VisualBlock
                  item={{
                    src: '/case-study/medium-term-credit/02-user-flow/user-flow-full.png',
                    fallbackText: 'Sơ đồ User Flow thực tế: Maker → Approver → MB tiếp nhận / Trả lại / Gửi lại',
                    type: 'USER FLOW',
                    caption: 'User Flow toàn trình: Phối hợp 3 vai trò và xử lý vòng Return Loop',
                    badge: 'User Flow thật'
                  }}
                />
              </div>
            </div>

            {/* Block 02: Không phải phương án nào cũng giống nhau (2 Cột) */}
            <div className="space-y-3 pt-3">
              <div className="text-xs font-bold text-[#7A3F1F] uppercase tracking-wider">
                KHÔNG PHẢI PHƯƠNG ÁN NÀO CŨNG GIỐNG NHAU
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-[10px] bg-[#EFF6FF] border border-[#BFDBFE] space-y-2">
                  <div className="font-bold text-[#1E40AF] text-sm flex items-center gap-2">
                    <Car className="w-4 h-4" />
                    <span>Mua xe ô tô đi lại</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-700">
                    <span className="p-1 rounded bg-white">• Hợp đồng mua bán</span>
                    <span className="p-1 rounded bg-white">• Tình trạng xe</span>
                    <span className="p-1 rounded bg-white">• Thương hiệu</span>
                    <span className="p-1 rounded bg-white">• Số chỗ ngồi</span>
                    <span className="p-1 rounded bg-white">• Đơn giá</span>
                    <span className="p-1 rounded bg-white">• Số lượng</span>
                    <span className="p-1 rounded bg-white col-span-2">• Thời gian bàn giao</span>
                  </div>
                </div>

                <div className="p-4 rounded-[10px] bg-[#FAF5FF] border border-[#E9D5FF] space-y-2">
                  <div className="font-bold text-[#6B21A8] text-sm flex items-center gap-2">
                    <Factory className="w-4 h-4" />
                    <span>Đầu tư dự án</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-700">
                    <span className="p-1 rounded bg-white">• Tên dự án</span>
                    <span className="p-1 rounded bg-white">• Mục đích đầu tư</span>
                    <span className="p-1 rounded bg-white">• Địa điểm</span>
                    <span className="p-1 rounded bg-white">• Tổng mức đầu tư</span>
                    <span className="p-1 rounded bg-white">• Cơ cấu nguồn vốn</span>
                    <span className="p-1 rounded bg-white">• Kế hoạch triển khai</span>
                    <span className="p-1 rounded bg-white col-span-2">• Nguồn trả nợ</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded bg-[#FFFDF6] border border-[#DFC9A2] text-xs sm:text-sm text-[#5A4030] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span>“Nếu đưa tất cả vào cùng một form, khách hàng sẽ phải đọc rất nhiều thông tin không liên quan.”</span>
                <span className="font-bold text-[#8C4312] whitespace-nowrap">★ Chỉ hỏi những gì liên quan tới phương án hiện tại</span>
              </div>

              {/* Visual Before / After: Wireframe Static vs Dynamic */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {/* Replace with actual Wireframe: Before */}
                <VisualBlock
                  item={{
                    src: '/case-study/medium-term-credit/03-wireframe/wireframe-form-before.png',
                    fallbackText: 'Wireframe ban đầu: Một biểu mẫu tĩnh dài cho mọi nhu cầu vay vốn',
                    type: 'WIREFRAME',
                    caption: 'BEFORE: Một form dài cho mọi nhu cầu — Nhiều trường thừa không liên quan',
                    badge: 'Before'
                  }}
                />

                {/* Replace with actual Wireframe: After */}
                <VisualBlock
                  item={{
                    src: '/case-study/medium-term-credit/03-wireframe/wireframe-form-after.png',
                    fallbackText: 'Wireframe cải tiến: Dynamic Form thay đổi theo từng lựa chọn nhu cầu vốn',
                    type: 'WIREFRAME',
                    caption: 'AFTER: Form thay đổi linh hoạt theo nhu cầu vốn được chọn',
                    badge: 'After'
                  }}
                />
              </div>
            </div>
          </section>

          {/* =====================================================================
           * SECTION III: XÁC ĐỊNH BÀI TOÁN THIẾT KẾ
           * ===================================================================== */}
          <section id="sec-03" className="space-y-6 scroll-mt-20">
            <div className="space-y-2 border-b border-[#DFC9A2] pb-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D1B12]">
                III. Xác định bài toán thiết kế
              </h2>
            </div>

            {/* Highlight Question */}
            <div className="p-5 sm:p-6 rounded-[10px] bg-[#FFF4D6] border-2 border-[#DFC9A2] shadow-xs">
              <div className="text-base sm:text-lg font-bold text-[#3E2718] leading-relaxed">
                “Làm sao để Maker hoàn thành một phương án tín dụng có nhiều dữ liệu và hồ sơ, phối hợp được với Approver và xử lý được yêu cầu chỉnh sửa từ MB mà không phải bắt đầu lại từ đầu?”
              </div>
            </div>

            {/* 4 Nguyên tắc thiết kế */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {[
                { num: '01', title: 'Chỉ hiển thị thông tin khi thực sự liên quan.' },
                { num: '02', title: 'Không yêu cầu nhập lại dữ liệu MB đã có.' },
                { num: '03', title: 'Một hành trình dài phải có khả năng dừng và quay lại.' },
                { num: '04', title: 'Khi MB trả lại, khách hàng phải biết chính xác cần sửa gì.' }
              ].map((p, idx) => (
                <div key={idx} className="p-4 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] space-y-2">
                  <div className="text-lg font-mono font-black text-[#B86428]">{p.num}</div>
                  <p className="text-xs sm:text-sm font-semibold text-[#2D1B12] leading-snug">{p.title}</p>
                </div>
              ))}
            </div>

            {/* Visual: Complex Business Logic → 4 Principles → Simplified Experience */}
            <VisualBlock
              item={{
                src: '/case-study/medium-term-credit/02-user-flow/decision-points-map.png',
                fallbackText: 'Sơ đồ chuyển dịch: Complex Business Logic → 4 Design Principles → Simplified Experience',
                type: 'USER FLOW',
                caption: 'Kiến trúc chuyển hóa logic nghiệp vụ phức tạp thành trải nghiệm số tinh gọn',
                badge: 'Logic Architecture'
              }}
            />
          </section>

          {/* =====================================================================
           * SECTION IV: XÂY DỰNG GIẢI PHÁP CÙNG PO (70% VISUAL)
           * ===================================================================== */}
          <section id="sec-04" className="space-y-8 scroll-mt-20">
            <div className="space-y-2 border-b border-[#DFC9A2] pb-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D1B12]">
                IV. Xây dựng giải pháp cùng PO
              </h2>
              <p className="text-sm sm:text-base text-[#6B513C]">
                Mỗi quyết định thiết kế đều được cụ thể hóa bằng visual thực tế, giải quyết logic trước khi giải quyết visual.
              </p>
            </div>

            {/* 01: Flow trước, UI sau */}
            <div className="space-y-3">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-[#B86428]">01</span>
                <h3 className="text-lg font-bold text-[#2D1B12]">Flow trước, UI sau</h3>
                <p className="text-xs sm:text-sm text-[#5A4030] max-w-xl">
                  Ở giai đoạn đầu, tôi và PO tập trung vào luồng người dùng và khung giao diện trước khi làm giao diện chi tiết.
                </p>
              </div>

              {/* Replace with actual Wireframe / UI */}
              <VisualBlock
                item={{
                  src: '/case-study/medium-term-credit/03-wireframe/flow-wireframe-ui-trio.png',
                  fallbackText: 'Tiến trình ba bước trực quan: User Flow → Wireframe → UI Design',
                  type: 'WIREFRAME',
                  caption: 'Tiến trình thiết kế: User Flow ➔ Wireframe khung xương ➔ UI Design hoàn thiện'
                }}
              />
            </div>

            {/* 02: Biểu mẫu động (3 Screens side by side) */}
            <div className="space-y-3 pt-3">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-[#B86428]">02</span>
                <h3 className="text-lg font-bold text-[#2D1B12]">Biểu mẫu động</h3>
                <p className="text-xs sm:text-sm text-[#5A4030] max-w-xl">
                  Maker chọn: <strong>Mua xe ô tô đi lại</strong>, <strong>Đầu tư dự án</strong> hoặc <strong>Khác</strong>. Sau lựa chọn này, cấu trúc biểu mẫu tự động thay đổi.
                </p>
                <div className="text-xs font-bold text-[#8C4312] italic">
                  “Giảm những gì người dùng phải đọc, không chỉ những gì họ phải nhập.”
                </div>
              </div>

              {/* 3 UI Screenshots side-by-side */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <VisualBlock
                  item={{
                    src: '/case-study/term-loan-case-study/02-maker-step-1-vehicle-dynamic-form.jpg',
                    fallbackText: 'UI Mua xe ô tô đi lại: Trường số chỗ, dòng xe, đơn giá, bàn giao',
                    type: 'UI DESIGN',
                    caption: 'Mua xe ô tô: Hiển thị đúng trường liên quan tới phương tiện & đơn giá',
                    badge: 'Mua xe'
                  }}
                />

                <VisualBlock
                  item={{
                    src: '/case-study/term-loan-case-study/03-maker-step-1-investment-project-dynamic-form.jpg',
                    fallbackText: 'UI Đầu tư dự án: Tên dự án, địa điểm, tổng mức, cơ cấu vốn, nguồn trả',
                    type: 'UI DESIGN',
                    caption: 'Đầu tư dự án: Hiển thị trường tên dự án, tổng mức và cơ cấu nguồn vốn',
                    badge: 'Dự án'
                  }}
                />

                <VisualBlock
                  item={{
                    src: '/case-study/term-loan-case-study/04-maker-step-1-other-dynamic-form.jpg',
                    fallbackText: 'UI Nhu cầu vốn khác: Thuyết minh mục đích vốn và dự toán chi phí',
                    type: 'UI DESIGN',
                    caption: 'Nhu cầu khác: Form thu gọn tập trung vào phương án hoàn vốn',
                    badge: 'Nhu cầu khác'
                  }}
                />
              </div>
            </div>

            {/* 03: Chỉ mở thông tin khi khách hàng cần (Progressive Disclosure) */}
            <div className="space-y-3 pt-3">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-[#B86428]">03</span>
                <h3 className="text-lg font-bold text-[#2D1B12]">Chỉ mở thông tin khi khách hàng cần</h3>
                <p className="text-xs sm:text-sm text-[#5A4030] max-w-xl">
                  Các phương án sử dụng vốn tại MB chỉ mở trường thông tin khi khách hàng thực sự lựa chọn checkbox tương ứng.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <VisualBlock
                  item={{
                    src: '/case-study/term-loan-case-study/06-maker-step-1-funding-checkbox-collapsed.jpg',
                    fallbackText: 'UI Trước khi chọn: Checkbox chưa chọn ➔ Thu gọn, không chiếm diện tích',
                    type: 'UI DESIGN',
                    caption: 'BEFORE: Checkbox chưa chọn — Chỉ hiển thị tên phương án, form gọn gàng',
                    badge: 'Chưa chọn (Đóng)'
                  }}
                />

                <VisualBlock
                  item={{
                    src: '/case-study/term-loan-case-study/05-maker-step-1-funding-details-expanded.jpg',
                    fallbackText: 'UI Sau khi chọn: Checkbox đã chọn ➔ Mở các trường thông tin chi tiết',
                    type: 'UI DESIGN',
                    caption: 'AFTER: Checkbox đã chọn — Mở trường thông tin chi tiết và số tiền cần tài trợ',
                    badge: 'Đã chọn (Mở)'
                  }}
                />
              </div>
            </div>

            {/* 04: Lưu và tiếp tục */}
            <div className="space-y-3 pt-3">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-[#B86428]">04</span>
                <h3 className="text-lg font-bold text-[#2D1B12]">Lưu và tiếp tục</h3>
                <p className="text-xs sm:text-sm text-[#5A4030] max-w-xl">
                  Một phương án tín dụng không phải lúc nào cũng có thể hoàn thành trong một lần. Hệ thống hỗ trợ lưu thủ công, tự động lưu ngầm và khôi phục nháp.
                </p>
              </div>

              {/* Flow nhỏ: Đang nhập -> Lưu -> Thoát -> Quay lại -> Tiếp tục */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs font-bold text-[#2D1B12]">
                <div className="p-2 rounded bg-[#FFFDF6] border border-[#DFC9A2]">1. Đang nhập</div>
                <div className="p-2 rounded bg-[#FFFDF6] border border-[#DFC9A2]">2. Lưu nháp</div>
                <div className="p-2 rounded bg-[#FFFDF6] border border-[#DFC9A2]">3. Tạm thoát</div>
                <div className="p-2 rounded bg-[#FFFDF6] border border-[#DFC9A2]">4. Quay lại</div>
                <div className="p-2 rounded bg-[#FFFDF6] border border-[#DFC9A2] col-span-2 sm:col-span-1">5. Tiếp tục</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <VisualBlock
                  item={{
                    src: '/case-study/term-loan-case-study/07-maker-save-autosave.jpg',
                    fallbackText: 'Toast lưu thành công và bộ đếm tự động lưu trên panel bên phải',
                    type: 'UI DESIGN',
                    caption: 'Cơ chế bảo toàn dữ liệu: Toast lưu thành công và bộ đếm tự động lưu trên panel bên phải',
                    badge: 'Save & Autosave'
                  }}
                />

                <VisualBlock
                  item={{
                    src: '/case-study/term-loan-case-study/08-resume-draft-confirmation.jpg',
                    fallbackText: 'Mở lại hồ sơ nháp với dữ liệu đã có',
                    type: 'UI DESIGN',
                    caption: 'Khôi phục bản nháp (Resume): Dữ liệu đã điền được giữ nguyên vẹn, tiếp tục bước đang dang dở',
                    badge: 'Resume Draft'
                  }}
                />
              </div>
            </div>

            {/* 05: Điền sẵn thông tin doanh nghiệp */}
            <div className="space-y-3 pt-3">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-[#B86428]">05</span>
                <h3 className="text-lg font-bold text-[#2D1B12]">Điền sẵn thông tin doanh nghiệp</h3>
                <p className="text-xs sm:text-sm text-[#5A4030] max-w-xl">
                  Tận dụng dữ liệu MB đã có để khách hàng kiểm tra thay vì nhập lại. Phân biệt rõ thông tin xem và thông tin có thể chỉnh sửa.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200 text-[#14532D]">
                  <strong className="block">ĐIỀN SẴN</strong> Tên doanh nghiệp
                </div>
                <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200 text-[#14532D]">
                  <strong className="block">ĐIỀN SẴN</strong> Số ĐKKD & Mã số thuế
                </div>
                <div className="p-2.5 rounded bg-slate-100 border border-slate-300 text-slate-700">
                  <strong className="block">CHỈ ĐỌC</strong> Thông tin pháp lý cố định
                </div>
                <div className="p-2.5 rounded bg-amber-50 border border-amber-200 text-amber-900">
                  <strong className="block">CÓ THỂ SỬA</strong> Thông tin liên hệ & người đại diện
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <VisualBlock
                  item={{
                    src: '/case-study/term-loan-case-study/13-maker-step-2-company-prefill-readonly-editable.jpg',
                    fallbackText: 'UI Thông tin doanh nghiệp: Dữ liệu được prefill với bảng người đại diện pháp luật',
                    type: 'UI DESIGN',
                    caption: 'Bước 2 — Điền sẵn dữ liệu: Tận dụng mã số thuế và thông tin định danh MB đã lưu',
                    badge: 'Prefill MB'
                  }}
                />

                <VisualBlock
                  item={{
                    src: '/case-study/term-loan-case-study/14-maker-step-2-company-editable-modal.jpg',
                    fallbackText: 'Modal chỉnh sửa người đại diện pháp luật với các trường nhập liệu',
                    type: 'UI DESIGN',
                    caption: 'Modal chỉnh sửa: Cập nhật người đại diện pháp luật và thông tin liên hệ mới',
                    badge: 'Modal Edit'
                  }}
                />
              </div>
            </div>

            {/* 06: Tổ chức hồ sơ */}
            <div className="space-y-3 pt-3">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-[#B86428]">06</span>
                <h3 className="text-lg font-bold text-[#2D1B12]">Tổ chức hồ sơ</h3>
                <p className="text-xs sm:text-sm text-[#5A4030] max-w-xl">
                  Hồ sơ được chia theo 4 nhóm rõ ràng thay vì một danh sách file dài gây ngợp.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold text-[#2D1B12] text-center">
                <div className="p-2 rounded bg-[#FFFDF6] border border-[#DFC9A2]">01 Đơn đề nghị</div>
                <div className="p-2 rounded bg-[#FFFDF6] border border-[#DFC9A2]">02 Giấy tờ pháp lý</div>
                <div className="p-2 rounded bg-[#FFFDF6] border border-[#DFC9A2]">03 Năng lực tài chính</div>
                <div className="p-2 rounded bg-[#FFFDF6] border border-[#DFC9A2]">04 Hồ sơ phương án</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <VisualBlock
                  item={{
                    src: '/case-study/term-loan-case-study/10-maker-step-3-documents-four-groups-upload.jpg',
                    fallbackText: 'Đơn đề nghị và Giấy tờ pháp lý, file đã có và vùng kéo thả upload',
                    type: 'UI DESIGN',
                    caption: '4 Nhóm hồ sơ: Đơn đề nghị và Giấy tờ pháp lý kèm vùng kéo thả upload',
                    badge: '4 Nhóm hồ sơ'
                  }}
                />

                <VisualBlock
                  item={{
                    src: '/case-study/term-loan-case-study/11-maker-step-3-financial-capability-documents.jpg',
                    fallbackText: 'Nhóm Năng lực tài chính với nhiều loại PDF/XLSX và vùng upload',
                    type: 'UI DESIGN',
                    caption: 'Nhóm Năng lực tài chính: Hỗ trợ nhiều định dạng (PDF/XLSX) và hướng dẫn chuẩn',
                    badge: 'Tài chính'
                  }}
                />

                <VisualBlock
                  item={{
                    src: '/case-study/term-loan-case-study/12-maker-step-3-plan-documents-upload.jpg',
                    fallbackText: 'Nhóm Hồ sơ phương án và file minh chứng',
                    type: 'UI DESIGN',
                    caption: 'Nhóm Hồ sơ phương án: Đính kèm chứng từ chi phí và hóa đơn liên quan',
                    badge: 'Phương án'
                  }}
                />
              </div>
            </div>

            {/* 07: Xác nhận trước khi gửi */}
            <div className="space-y-3 pt-3">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-[#B86428]">07</span>
                <h3 className="text-lg font-bold text-[#2D1B12]">Xác nhận trước khi gửi</h3>
                <p className="text-xs sm:text-sm text-[#5A4030] max-w-xl">
                  Review Layer ưu tiên tóm tắt các điểm quyết định, kèm tính năng Xem thêm / Thu gọn.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <VisualBlock
                  item={{
                    src: '/case-study/term-loan-case-study/08-resume-draft-confirmation.jpg',
                    fallbackText: 'Trang tổng hợp xác nhận với dữ liệu phương án',
                    type: 'UI DESIGN',
                    caption: 'Review Layer: Tóm tắt thông tin quan trọng trước khi gửi phê duyệt',
                    badge: 'Review Mặc định'
                  }}
                />

                <VisualBlock
                  item={{
                    src: '/case-study/term-loan-case-study/09-confirmation-view-more-expanded.jpg',
                    fallbackText: 'Khối Thông tin phương án được mở rộng và có hành động Thu gọn',
                    type: 'UI DESIGN',
                    caption: 'Khối Thông tin phương án được mở rộng kèm hành động Thu gọn linh hoạt',
                    badge: 'Xem thêm / Thu gọn'
                  }}
                />
              </div>
            </div>

            {/* 08: Hoàn tất submit & Theo dõi trạng thái giao dịch */}
            <div className="space-y-3 pt-3">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-[#B86428]">08</span>
                <h3 className="text-lg font-bold text-[#2D1B12]">Gửi yêu cầu & Theo dõi trạng thái giao dịch</h3>
                <p className="text-xs sm:text-sm text-[#5A4030] max-w-xl">
                  Sau khi Maker bấm gửi, hệ thống hiển thị thông báo thành công cùng mã số tham chiếu và tự động cập nhật trạng thái vào danh sách giao dịch.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <VisualBlock
                  item={{
                    src: '/case-study/term-loan-case-study/15-maker-submit-success.jpg',
                    fallbackText: 'Màn Gửi yêu cầu thành công, số tham chiếu và hai hành động tiếp theo',
                    type: 'UI DESIGN',
                    caption: 'Gửi yêu cầu thành công: Cung cấp số tham chiếu và nút quay về Danh sách',
                    badge: 'Submit Success'
                  }}
                />

                <VisualBlock
                  item={{
                    src: '/case-study/term-loan-case-study/16-transaction-status-maker-submitted.jpg',
                    fallbackText: 'Giao dịch vừa gửi xuất hiện ở đầu danh sách với trạng thái Đã gửi - Đang phân công RM',
                    type: 'UI DESIGN',
                    caption: 'Danh sách giao dịch: Bản ghi vừa tạo xuất hiện ở đầu với trạng thái "Đã gửi - Đang phân công RM"',
                    badge: 'Transaction Tracking'
                  }}
                />
              </div>
            </div>
          </section>

          {/* =====================================================================
           * SECTION V: USABILITY TESTING (V1 -> FINDING -> DECISION -> V2)
           * ===================================================================== */}
          <section id="sec-05" className="space-y-8 scroll-mt-20">
            <div className="space-y-2 border-b border-[#DFC9A2] pb-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D1B12]">
                V. Usability Testing
              </h2>
              <p className="text-sm sm:text-base text-[#6B513C]">
                Kiểm chứng luồng và các giả thuyết thiết kế với người dùng trước khi Dev phát triển sâu.
              </p>
            </div>

            {/* Testing Flow Banner */}
            <div className="p-3.5 rounded-[8px] bg-[#FFFDF6] border border-[#DFC9A2] flex flex-wrap items-center justify-between text-xs font-semibold text-[#2D1B12] gap-2">
              <span>Nguyên mẫu Prototype</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#B86428]" />
              <span>Người dùng thực hiện task</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#B86428]" />
              <span>Quan sát hành vi</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#B86428]" />
              <span>Phát hiện vấn đề</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#B86428]" />
              <span className="text-[#8C4312] font-bold">Điều chỉnh thiết kế</span>
            </div>

            {/* 6 Tasks */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
              <div className="p-2.5 rounded bg-[#FFF8E7] border border-[#DFC9A2] text-center font-medium">01. Tạo phương án xe</div>
              <div className="p-2.5 rounded bg-[#FFF8E7] border border-[#DFC9A2] text-center font-medium">02. Tạo phương án dự án</div>
              <div className="p-2.5 rounded bg-[#FFF8E7] border border-[#DFC9A2] text-center font-medium">03. Kiểm tra TT DN</div>
              <div className="p-2.5 rounded bg-[#FFF8E7] border border-[#DFC9A2] text-center font-medium">04. Tải hồ sơ</div>
              <div className="p-2.5 rounded bg-[#FFF8E7] border border-[#DFC9A2] text-center font-medium">05. Kiểm tra trước gửi</div>
              <div className="p-2.5 rounded bg-[#FFF8E7] border border-[#DFC9A2] text-center font-medium">06. Xử lý MB trả lại</div>
            </div>

            {/* 5 Findings (Format: V1 -> WHAT WE FOUND -> DECISION -> V2) */}
            <div className="space-y-6 pt-2">
              <div className="text-xs font-bold text-[#7A3F1F] uppercase tracking-wider">
                5 PHÁT HIỆN THEN CHỐT & VÒNG LẶP ITERATION
              </div>

              {/* Finding 01 */}
              <div className="p-5 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#B86428] bg-[#FFF0D4] px-2 py-0.5 rounded">FINDING 01</span>
                  <span className="text-xs font-bold text-[#2D1B12]">Trường nghiệp vụ khó hiểu</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 rounded bg-rose-50/70 border border-rose-200 text-xs text-[#7F1D1D] space-y-1">
                    <strong className="block text-sm text-[#991B1B]">WHAT WE FOUND (V1):</strong>
                    <div>Người dùng hiểu lựa chọn Mua xe / Dự án, nhưng một số trường tín dụng khó hiểu nếu chỉ có label đơn thuần.</div>
                  </div>
                  <div className="p-3 rounded bg-emerald-50/70 border border-emerald-200 text-xs text-[#14532D] space-y-1">
                    <strong className="block text-sm text-[#15803D]">DECISION & V2:</strong>
                    <div>Bổ sung Tooltip giải thích thuật ngữ, supporting text và placeholder mô phỏng giá trị thực tế.</div>
                  </div>
                </div>
                {/* Replace with actual UI: Finding 01 */}
                <VisualBlock
                  item={{
                    src: '/case-study/medium-term-credit/08-usability-testing/finding-01-tooltip.png',
                    fallbackText: 'V1 screenshot có annotation vào field khó hiểu ➔ V2 screenshot có tooltip & supporting text',
                    type: 'UI DESIGN',
                    caption: 'Finding 01: Bổ sung Tooltip và chú thích ngữ cảnh cho các trường tín dụng phức tạp'
                  }}
                />
              </div>

              {/* Finding 02 */}
              <div className="p-5 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#B86428] bg-[#FFF0D4] px-2 py-0.5 rounded">FINDING 02</span>
                  <span className="text-xs font-bold text-[#2D1B12]">Dữ liệu điền sẵn gây phân vân</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 rounded bg-rose-50/70 border border-rose-200 text-xs text-[#7F1D1D] space-y-1">
                    <strong className="block text-sm text-[#991B1B]">WHAT WE FOUND (V1):</strong>
                    <div>Dữ liệu DN hiển thị sẵn khiến người dùng tưởng là thông tin cố định của ngân hàng và không biết có được sửa không.</div>
                  </div>
                  <div className="p-3 rounded bg-emerald-50/70 border border-emerald-200 text-xs text-[#14532D] space-y-1">
                    <strong className="block text-sm text-[#15803D]">DECISION & V2:</strong>
                    <div>Phân biệt rõ: “Thông tin MB đang lưu” và “Thông tin khách hàng có thể cập nhật”, gắn icon Edit rõ ràng.</div>
                  </div>
                </div>
                {/* Replace with actual UI: Finding 02 */}
                <VisualBlock
                  item={{
                    src: '/case-study/medium-term-credit/08-usability-testing/finding-02-editable.png',
                    fallbackText: 'BEFORE: Trạng thái Editable/Read-only chưa rõ ➔ AFTER: Phân biệt rõ hai trạng thái bằng visual tag',
                    type: 'UI DESIGN',
                    caption: 'Finding 02: Tách biệt rõ ràng trạng thái Thông tin cố định vs Thông tin được phép cập nhật'
                  }}
                />
              </div>

              {/* Finding 03 */}
              <div className="p-5 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#B86428] bg-[#FFF0D4] px-2 py-0.5 rounded">FINDING 03</span>
                  <span className="text-xs font-bold text-[#2D1B12]">Khó khăn ở việc chuẩn bị hồ sơ</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 rounded bg-rose-50/70 border border-rose-200 text-xs text-[#7F1D1D] space-y-1">
                    <strong className="block text-sm text-[#991B1B]">WHAT WE FOUND (V1):</strong>
                    <div>Khó khăn không nằm ở thao tác kéo thả tệp, mà nằm ở việc không biết cần chuẩn bị tài liệu gì, kỳ nào, mẫu nào.</div>
                  </div>
                  <div className="p-3 rounded bg-emerald-50/70 border border-emerald-200 text-xs text-[#14532D] space-y-1">
                    <strong className="block text-sm text-[#15803D]">DECISION & V2:</strong>
                    <div>Thêm hướng dẫn chi tiết ngay dưới từng tệp: Loại tài liệu, kỳ kế toán, định dạng (PDF/XLSX), tính bắt buộc.</div>
                  </div>
                </div>
                {/* Replace with actual UI: Finding 03 */}
                <VisualBlock
                  item={{
                    src: '/case-study/medium-term-credit/08-usability-testing/finding-03-doc-guidance.png',
                    fallbackText: 'BEFORE: Nút upload file đơn thuần ➔ AFTER: Upload + hướng dẫn chi tiết tài liệu gì, kỳ nào, bắt buộc',
                    type: 'UI DESIGN',
                    caption: 'Finding 03: Bổ sung chỉ dẫn chi tiết về kỳ báo cáo và định dạng chuẩn cho từng loại hồ sơ'
                  }}
                />
              </div>

              {/* Finding 04 */}
              <div className="p-5 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#B86428] bg-[#FFF0D4] px-2 py-0.5 rounded">FINDING 04</span>
                  <span className="text-xs font-bold text-[#2D1B12]">Trang xác nhận quá dài</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 rounded bg-rose-50/70 border border-rose-200 text-xs text-[#7F1D1D] space-y-1">
                    <strong className="block text-sm text-[#991B1B]">WHAT WE FOUND (V1):</strong>
                    <div>Người dùng bị quá tải thông tin khi phải cuộn chuột qua danh sách hàng chục trường trước khi bấm gửi duyệt.</div>
                  </div>
                  <div className="p-3 rounded bg-emerald-50/70 border border-emerald-200 text-xs text-[#14532D] space-y-1">
                    <strong className="block text-sm text-[#15803D]">DECISION & V2:</strong>
                    <div>Đưa thông tin cốt lõi vào Summary tóm tắt; các phần chi tiết để ở trạng thái Thu gọn / Xem thêm.</div>
                  </div>
                </div>
                {/* Replace with actual UI: Finding 04 */}
                <VisualBlock
                  item={{
                    src: '/case-study/medium-term-credit/08-usability-testing/finding-04-summary.png',
                    fallbackText: 'BEFORE: Trang xác nhận dài ➔ AFTER: Tóm tắt thông tin quyết định kèm Xem thêm khi cần',
                    type: 'UI DESIGN',
                    caption: 'Finding 04: Tối ưu màn xác nhận với cấu trúc Summary trước, mở rộng chi tiết theo nhu cầu'
                  }}
                />
              </div>

              {/* Finding 05 */}
              <div className="p-5 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#B86428] bg-[#FFF0D4] px-2 py-0.5 rounded">FINDING 05</span>
                  <span className="text-xs font-bold text-[#2D1B12]">Thông báo MB trả lại chưa chỉ rõ hành động</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 rounded bg-rose-50/70 border border-rose-200 text-xs text-[#7F1D1D] space-y-1">
                    <strong className="block text-sm text-[#991B1B]">WHAT WE FOUND (V1):</strong>
                    <div>Thông báo chung chung kiểu “Phương án chưa hợp lệ” khiến Maker hoang mang, không biết phải sửa cái gì.</div>
                  </div>
                  <div className="p-3 rounded bg-emerald-50/70 border border-emerald-200 text-xs text-[#14532D] space-y-1">
                    <strong className="block text-sm text-[#15803D]">DECISION & V2:</strong>
                    <div>Hiển thị rõ: “MB cần bạn cập nhật 2 nội dung” kèm lý do cụ thể và CTA dẫn thẳng tới đúng mục cần sửa.</div>
                  </div>
                </div>
                <VisualBlock
                  item={{
                    src: '/case-study/term-loan-case-study/22-mb-return-detail-no-reason-shown.jpg',
                    fallbackText: 'Trang chi tiết mở từ hồ sơ MB trả lại nhưng không hiển thị lý do trả lại',
                    type: 'UI DESIGN',
                    caption: 'Thực tế quan sát trên Prototype: Màn chi tiết khi MB trả lại chưa hiển thị lý do cụ thể ➔ Đưa ra quyết định bổ sung checklist lý do trả lại & CTA điều hướng',
                    badge: 'Finding Proof'
                  }}
                />
              </div>
            </div>

            {/* Prototype Showcase & Luồng Phê duyệt */}
            <div className="p-5 sm:p-7 rounded-[12px] bg-[#FFFDF6] border-2 border-[#DFC9A2] shadow-xs space-y-4 pt-4">
              <div className="flex items-center justify-between border-b border-[#DFC9A2] pb-3">
                <div className="text-xs font-bold text-[#7A3F1F] uppercase tracking-wider flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#B86428]" />
                  <span>PROTOTYPE REVIEW: LUỒNG CHỜ PHÊ DUYỆT & GỬI DUYỆT</span>
                </div>
                <span className="text-xs font-mono text-[#8C4312] font-semibold bg-[#FFF4D6] px-2.5 py-0.5 rounded">
                  Prototype Walkthrough
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <VisualBlock
                  item={{
                    src: '/case-study/term-loan-case-study/17-waiting-approval-review-creator-view.jpg',
                    fallbackText: 'Mở hồ sơ mẫu Chờ phê duyệt ở trang review tổng hợp',
                    type: 'PROTOTYPE',
                    caption: 'Trạng thái Chờ phê duyệt: Mở hồ sơ mẫu ở trang review tổng hợp để kiểm tra thông tin',
                    badge: 'Chờ phê duyệt'
                  }}
                />

                <VisualBlock
                  item={{
                    src: '/case-study/term-loan-case-study/18-waiting-approval-submit-success.jpg',
                    fallbackText: 'Sau khi bấm Xác nhận duyệt gửi sang MB',
                    type: 'PROTOTYPE',
                    caption: 'Xác nhận duyệt: Prototype hoàn tất gửi duyệt phương án trung dài hạn sang MB',
                    badge: 'Phê duyệt xong'
                  }}
                />
              </div>
            </div>
          </section>

          {/* =====================================================================
           * SECTION VI: BẢO VỆ GIẢI PHÁP VỚI GIÁM ĐỐC DỰ ÁN
           * ===================================================================== */}
          <section id="sec-06" className="space-y-6 scroll-mt-20">
            <div className="space-y-2 border-b border-[#DFC9A2] pb-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D1B12]">
                VI. Bảo vệ giải pháp với Giám đốc dự án
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#5A4030] leading-relaxed max-w-2xl">
              Sau vòng Usability Testing và tinh chỉnh, tôi cùng PO đóng gói lại giải pháp để trình bày với Giám đốc dự án.
            </p>

            {/* Flow trình bày */}
            <div className="p-3.5 rounded-[8px] bg-[#FFF8E7] border border-[#DFC9A2] flex flex-wrap items-center justify-between text-xs font-semibold text-[#2D1B12] gap-2">
              <span>Yêu cầu ban đầu</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#B86428]" />
              <span>Bài toán</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#B86428]" />
              <span>Luồng đề xuất</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#B86428]" />
              <span>Prototype</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#B86428]" />
              <span>Kết quả Testing</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#B86428]" />
              <span className="text-[#8C4312] font-bold">Phạm vi phát triển MVP</span>
            </div>

            {/* Highlight Quote */}
            <div className="p-4 rounded-[10px] bg-[#FFF4D6] border-l-4 border-[#B86428] text-sm sm:text-base font-bold text-[#4A2414] italic">
              “Mục tiêu không phải chứng minh giao diện đẹp, mà thống nhất rằng giải pháp giải quyết đúng bài toán và đủ khả thi để phát triển.”
            </div>

            {/* Replace with actual presentation slide / diagram */}
            <VisualBlock
              item={{
                src: '/case-study/medium-term-credit/10-presentation/proposal-deck-summary.png',
                fallbackText: 'Bộ tài liệu Product Proposal bảo vệ trước Giám đốc dự án: Problem, Solution, Scope MVP',
                type: 'SLIDE DECK',
                caption: 'Product Proposal: Thống nhất mục tiêu kinh doanh, phạm vi MVP và tính khả thi vận hành'
              }}
            />

            {/* MVP Scope: 3 Cột */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold text-[#7A3F1F] uppercase tracking-wider">
                PHẠM VI MVP THEO 3 VAI TRÒ
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-[10px] bg-[#EFF6FF] border border-[#BFDBFE] space-y-2">
                  <div className="font-bold text-[#1E40AF]">MAKER</div>
                  <ul className="space-y-1 text-slate-700 pl-3 list-disc">
                    <li>Khởi tạo phương án trung dài hạn</li>
                    <li>Điền Dynamic Form theo nhu cầu vốn</li>
                    <li>Xác nhận thông tin DN prefill</li>
                    <li>Upload hồ sơ theo 4 nhóm</li>
                    <li>Review & Gửi duyệt nội bộ</li>
                    <li>Sửa và gửi lại khi MB trả về</li>
                  </ul>
                </div>

                <div className="p-4 rounded-[10px] bg-[#FAF5FF] border border-[#E9D5FF] space-y-2">
                  <div className="font-bold text-[#6B21A8]">APPROVER</div>
                  <ul className="space-y-1 text-slate-700 pl-3 list-disc">
                    <li>Nhận thông báo phương án cần duyệt</li>
                    <li>Xem trang Decision Summary</li>
                    <li>Kiểm tra các tài liệu đính kèm</li>
                    <li>Ký phê duyệt và submit sang MB</li>
                  </ul>
                </div>

                <div className="p-4 rounded-[10px] bg-[#FFFBEB] border border-[#FDE68A] space-y-2">
                  <div className="font-bold text-[#92400E]">MBBANK</div>
                  <ul className="space-y-1 text-slate-700 pl-3 list-disc">
                    <li>Tiếp nhận phương án qua hệ thống</li>
                    <li>Kiểm tra dữ liệu và hồ sơ</li>
                    <li>Phê duyệt hạn mức hoặc Trả lại kèm lý do chi tiết</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* =====================================================================
           * SECTION VII: LÀM RÕ YÊU CẦU CÙNG BA VÀ DEV
           * ===================================================================== */}
          <section id="sec-07" className="space-y-6 scroll-mt-20">
            <div className="space-y-2 border-b border-[#DFC9A2] pb-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D1B12]">
                VII. Làm rõ yêu cầu cùng BA và Dev
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#5A4030] leading-relaxed max-w-2xl">
              Sau khi giải pháp được duyệt, BA và Dev bắt đầu đi sâu vào các quy tắc để đưa thiết kế thành sản phẩm có thể vận hành.
            </p>

            {/* Sơ đồ 3 Cột: BA, PRODUCT DESIGNER, DEV */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] space-y-2">
                <div className="font-bold text-[#7A3F1F] uppercase">BA</div>
                <div className="space-y-1 text-[#5A4030]">
                  <div>• Quy tắc nghiệp vụ</div>
                  <div>• Validation từng trường</div>
                  <div>• Data mapping Core Banking</div>
                  <div>• Phân quyền người dùng</div>
                  <div>• Status lifecycle</div>
                  <div>• File rule & Return rule</div>
                </div>
              </div>

              <div className="p-4 rounded-[10px] bg-[#FFFDF6] border border-[#B86428] shadow-xs space-y-2">
                <div className="font-bold text-[#B86428] uppercase">PRODUCT DESIGNER</div>
                <div className="space-y-1 text-[#2D1B12] font-medium">
                  <div>• Interaction logic</div>
                  <div>• UI States (Default, Active, Disabled)</div>
                  <div>• Error & Warning message</div>
                  <div>• Empty state & Loading</div>
                  <div>• Edge cases handling</div>
                  <div>• UI Design system consistency</div>
                </div>
              </div>

              <div className="p-4 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] space-y-2">
                <div className="font-bold text-[#7A3F1F] uppercase">DEV</div>
                <div className="space-y-1 text-[#5A4030]">
                  <div>• APIs Prefill</div>
                  <div>• Dynamic Form rendering</div>
                  <div>• Multi-file upload engine</div>
                  <div>• Autosave background sync</div>
                  <div>• Maker/Approver permission check</div>
                  <div>• State management & Resubmit</div>
                </div>
              </div>
            </div>

            {/* 5 Edge Cases (Mini UI cards) */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold text-[#7A3F1F] uppercase tracking-wider">
                XỬ LÝ 5 EDGE CASES THỰC TẾ
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {[
                  { title: 'Autosave thất bại', desc: 'Hiển thị mốc thời gian lưu gần nhất, cảnh báo trước khi thoát' },
                  { title: 'Upload lỗi từng file', desc: 'Không làm mất các file khác đã tải lên thành công, cho phép Retry' },
                  { title: 'Dữ liệu DN sai', desc: 'Chỉ định rõ trường nào sửa được, trường nào cần liên hệ chi nhánh' },
                  { title: 'Approver mở bản cũ', desc: 'Cảnh báo version conflict khi Maker vừa cập nhật nội dung' },
                  { title: 'MB trả lại hồ sơ', desc: 'Chỉ mở khóa đúng 2 trường MB yêu cầu, giữ nguyên vẹn dữ liệu khác' }
                ].map((edge, idx) => (
                  <div key={idx} className="p-3 rounded-[8px] bg-[#FFF8E7] border border-[#DFC9A2] space-y-1 text-xs">
                    <strong className="text-[#2D1B12] block font-bold">{edge.title}</strong>
                    <p className="text-[#6B513C] leading-snug">{edge.desc}</p>
                  </div>
                ))}
              </div>

              {/* Replace with actual UI: Edge cases */}
              <VisualBlock
                item={{
                  src: '/case-study/medium-term-credit/11-refinement/edge-cases-ui.png',
                  fallbackText: '5 Mini UI minh họa xử lý Edge Cases: Autosave, Upload lỗi, Conflict version, MB trả lại',
                  type: 'UI DESIGN',
                  caption: 'Các trạng thái ngoại lệ (Edge Cases) được thiết kế chi tiết nhằm đảm bảo luồng không bị tắc nghẽn'
                }}
              />
            </div>
          </section>

          {/* =====================================================================
           * SECTION VIII: UAT
           * ===================================================================== */}
          <section id="sec-08" className="space-y-6 scroll-mt-20">
            <div className="space-y-2 border-b border-[#DFC9A2] pb-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D1B12]">
                VIII. UAT
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#5A4030] leading-relaxed max-w-2xl">
              Khi Dev bàn giao phiên bản phát triển, tôi tham gia UAT cùng PO, BA, QA và Dev. Tôi kiểm tra hai lớp song song:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-[10px] bg-[#EFF6FF] border border-[#BFDBFE] space-y-1">
                <div className="font-bold text-[#1E40AF] text-sm">Lớp 1: Nghiệp vụ (Functional)</div>
                <p className="text-xs text-slate-700">“Sản phẩm có chạy đúng theo quy tắc tín dụng đã phân tích không?”</p>
              </div>

              <div className="p-4 rounded-[10px] bg-[#F0FDF4] border border-[#86EFAC] space-y-1">
                <div className="font-bold text-[#15803D] text-sm">Lớp 2: Trải nghiệm (Experience)</div>
                <p className="text-xs text-slate-700">“Trải nghiệm sau khi phát triển có còn đúng với thiết kế và tương tác không?”</p>
              </div>
            </div>

            {/* Replace with UAT screenshot: Design vs Dev Build */}
            <VisualBlock
              item={{
                src: '/case-study/medium-term-credit/12-uat/design-vs-build-uat.png',
                fallbackText: 'So sánh song song DESIGN vs DEVELOPMENT BUILD với các annotations: Đúng (✓), Cần chỉnh (△), Lỗi (✕)',
                type: 'UAT / BUILD',
                caption: 'UAT đối soát: So sánh giao diện thiết kế Figma vs Bản dựng Development thực tế'
              }}
            />

            {/* UAT Scenarios Checklist (10 kịch bản) */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold text-[#7A3F1F] uppercase tracking-wider">
                10 KỊCH BẢN KIỂM THỬ UAT
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                {[
                  '1. Happy Path',
                  '2. Dynamic Form',
                  '3. Mở / Thu gọn',
                  '4. Lưu và tiếp tục',
                  '5. Prefill dữ liệu',
                  '6. Upload hồ sơ',
                  '7. Confirmation',
                  '8. Permission',
                  '9. MB Return',
                  '10. Resubmit'
                ].map((s, idx) => (
                  <div key={idx} className="p-2 rounded bg-[#FFFDF6] border border-[#DFC9A2] flex items-center gap-1.5 font-medium text-[#2D1B12]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D] shrink-0" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* VÒNG ĐỜI HỒ SƠ & THỰC THI RETURN LOOP TRÊN PRODUCTION */}
            <div className="space-y-6 pt-4 border-t border-[#DFC9A2]">
              <div className="space-y-1">
                <div className="text-xs font-bold text-[#7A3F1F] uppercase tracking-wider">
                  VÒNG ĐỜI HỒ SƠ & THỰC THI RETURN LOOP THỰC TẾ TẠI MB
                </div>
                <p className="text-xs sm:text-sm text-[#5A4030]">
                  Sau khi hồ sơ được duyệt và chuyển sang ngân hàng, toàn bộ vòng đời trạng thái được phản ánh trực quan qua danh sách giao dịch và trang chi tiết.
                </p>
              </div>

              {/* Giai đoạn 1: MB Đang xử lý */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#1E40AF] bg-[#EFF6FF] px-2 py-0.5 rounded border border-[#BFDBFE]">
                    TRẠNG THÁI 01 · MB ĐANG XỬ LÝ
                  </span>
                  <span className="text-xs text-[#5A4030]">Hồ sơ được phân công RM và bắt đầu thẩm định tín dụng</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <VisualBlock
                    item={{
                      src: '/case-study/term-loan-case-study/20-mb-processing-transaction-status.jpg',
                      fallbackText: 'Danh sách được lọc theo MB đang xử lý',
                      type: 'UI DESIGN',
                      caption: 'Danh sách giao dịch: Lọc theo trạng thái MB đang xử lý với hai hồ sơ mẫu',
                      badge: 'MB Đang xử lý'
                    }}
                  />
                  <VisualBlock
                    item={{
                      src: '/case-study/term-loan-case-study/19-mb-processing-detail.jpg',
                      fallbackText: 'Chi tiết hồ sơ mở từ dòng MB đang xử lý',
                      type: 'UI DESIGN',
                      caption: 'Màn hình chi tiết: Xem lại toàn bộ thông tin phương án đang được ngân hàng thẩm định',
                      badge: 'Chi tiết thẩm định'
                    }}
                  />
                </div>
              </div>

              {/* Giai đoạn 2: MB Trả lại hồ sơ */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#B45309] bg-[#FFFBEB] px-2 py-0.5 rounded border border-[#FDE68A]">
                    TRẠNG THÁI 02 · MB TRẢ LẠI HỒ SƠ
                  </span>
                  <span className="text-xs text-[#5A4030]">Khi hồ sơ cần bổ sung tài liệu hoặc điều chỉnh phương án</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <VisualBlock
                    item={{
                      src: '/case-study/term-loan-case-study/21-mb-returned-transaction-status.jpg',
                      fallbackText: 'Danh sách được lọc theo MB trả lại',
                      type: 'UI DESIGN',
                      caption: 'Danh sách giao dịch: Nhận diện rõ các hồ sơ ở trạng thái MB trả lại cần xử lý',
                      badge: 'MB Trả lại'
                    }}
                  />
                  <VisualBlock
                    item={{
                      src: '/case-study/term-loan-case-study/22-mb-return-detail-no-reason-shown.jpg',
                      fallbackText: 'Chi tiết hồ sơ MB trả lại',
                      type: 'UI DESIGN',
                      caption: 'Màn hình chi tiết hồ sơ MB trả lại: Điểm xuất phát để Maker mở lại form và cập nhật thông tin',
                      badge: 'Chi tiết trả lại'
                    }}
                  />
                </div>
              </div>

              {/* Giai đoạn 3: Vòng lặp Return Loop (Edit -> Confirm -> Resubmit) */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#8C4312] bg-[#FFF0D4] px-2 py-0.5 rounded border border-[#DFC9A2]">
                    VÒNG LẶP RETURN LOOP · MAKER SỬA ➔ XÁC NHẬN ➔ GỬI LẠI
                  </span>
                  <span className="text-xs text-[#5A4030]">Bảo toàn dữ liệu cũ, chỉ cập nhật phần yêu cầu mà không phải làm lại từ đầu</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  <VisualBlock
                    item={{
                      src: '/case-study/term-loan-case-study/23-maker-edit-returned-application.jpg',
                      fallbackText: 'Maker quay lại bước 1 và chỉnh sửa dữ liệu đã điền',
                      type: 'UI DESIGN',
                      caption: '01. Chỉnh sửa: Maker quay lại form, bổ sung đúng thông tin MB yêu cầu',
                      badge: 'Maker Edit'
                    }}
                  />
                  <VisualBlock
                    item={{
                      src: '/case-study/term-loan-case-study/24-maker-resubmit-confirmation.jpg',
                      fallbackText: 'Trang xác nhận trước khi gửi lại hồ sơ',
                      type: 'UI DESIGN',
                      caption: '02. Xác nhận gửi lại: Kiểm tra tóm tắt thông tin đã chỉnh sửa',
                      badge: 'Resubmit Confirm'
                    }}
                  />
                  <VisualBlock
                    item={{
                      src: '/case-study/term-loan-case-study/25-maker-resubmit-success.jpg',
                      fallbackText: 'Gửi lại thành công với số tham chiếu mới',
                      type: 'UI DESIGN',
                      caption: '03. Gửi lại thành công: Cấp số tham chiếu mới và đẩy lại vào hàng chờ xử lý',
                      badge: 'Resubmit Success'
                    }}
                  />
                </div>
              </div>

              {/* Giai đoạn 4: MB Phê duyệt */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#15803D] bg-[#F0FDF4] px-2 py-0.5 rounded border border-[#86EFAC]">
                    TRẠNG THÁI 04 · MB PHÊ DUYỆT THÀNH CÔNG
                  </span>
                  <span className="text-xs text-[#5A4030]">Phương án hoàn tất thẩm định và cấp hạn mức chính thức</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <VisualBlock
                    item={{
                      src: '/case-study/term-loan-case-study/26-mb-approved-transaction-status.jpg',
                      fallbackText: 'Danh sách được lọc theo MB phê duyệt',
                      type: 'UI DESIGN',
                      caption: 'Danh sách giao dịch: Lọc các hồ sơ MB đã phê duyệt cấp hạn mức thành công',
                      badge: 'MB Phê duyệt'
                    }}
                  />
                  <VisualBlock
                    item={{
                      src: '/case-study/term-loan-case-study/27-mb-approved-detail.jpg',
                      fallbackText: 'Chi tiết hồ sơ mở từ dòng MB phê duyệt',
                      type: 'UI DESIGN',
                      caption: 'Màn hình chi tiết: Toàn bộ thông tin phê duyệt hạn mức trung dài hạn đã có hiệu lực',
                      badge: 'Chi tiết phê duyệt'
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* =====================================================================
           * SECTION IX: GO-LIVE VÀ TRACKING
           * ===================================================================== */}
          <section id="sec-09" className="space-y-6 scroll-mt-20">
            <div className="space-y-2 border-b border-[#DFC9A2] pb-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D1B12]">
                IX. Go-live và Tracking
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#5A4030] leading-relaxed max-w-2xl">
              Vì đây là tính năng xây dựng mới, chưa có một hành trình số cũ để so sánh. Sau Go-live, mục tiêu đầu tiên là tạo baseline dữ liệu cho sản phẩm.
            </p>

            {/* Visual Funnel: 12 Bước (Full width) */}
            <div className="space-y-3 pt-1">
              <div className="text-xs font-bold text-[#7A3F1F] uppercase tracking-wider">
                PRODUCT TRACKING FUNNEL (12 BƯỚC)
              </div>

              {/* Replace with actual Tracking Funnel visual */}
              <VisualBlock
                item={{
                  src: '/case-study/medium-term-credit/13-tracking/funnel-tracking-full.png',
                  fallbackText: 'Sơ đồ Funnel theo dõi từ Khách hàng đủ điều kiện ➔ Maker gửi duyệt ➔ Approver duyệt ➔ MB phê duyệt',
                  type: 'UI DESIGN',
                  caption: 'Toàn bộ phễu chuyển đổi 12 bước được gắn telemetry theo dõi trên Production'
                }}
              />
            </div>

            {/* 8 Chỉ số chính */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold text-[#7A3F1F] uppercase tracking-wider">
                8 CHỈ SỐ CỐT LÕI ĐƯỢC ĐO LƯỜNG
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs text-[#5A4030]">
                <div className="p-2.5 rounded bg-[#FFFDF6] border border-[#DFC9A2] font-semibold text-[#2D1B12]">• Tỷ lệ tiếp cận tính năng</div>
                <div className="p-2.5 rounded bg-[#FFFDF6] border border-[#DFC9A2] font-semibold text-[#2D1B12]">• Tỷ lệ bắt đầu phương án</div>
                <div className="p-2.5 rounded bg-[#FFFDF6] border border-[#DFC9A2] font-semibold text-[#2D1B12]">• Tỷ lệ hoàn thành từng bước</div>
                <div className="p-2.5 rounded bg-[#FFFDF6] border border-[#DFC9A2] font-semibold text-[#2D1B12]">• Tỷ lệ Maker hoàn thành</div>
                <div className="p-2.5 rounded bg-[#FFFDF6] border border-[#DFC9A2] font-semibold text-[#2D1B12]">• Tỷ lệ Approver phê duyệt</div>
                <div className="p-2.5 rounded bg-[#FFFDF6] border border-[#DFC9A2] font-semibold text-[#2D1B12]">• Tỷ lệ MB trả lại hồ sơ</div>
                <div className="p-2.5 rounded bg-[#FFFDF6] border border-[#DFC9A2] font-semibold text-[#2D1B12]">• Tỷ lệ gửi lại sau khi trả</div>
                <div className="p-2.5 rounded bg-[#FFFDF6] border border-[#DFC9A2] font-semibold text-[#2D1B12]">• Thời gian hoàn thành (Active)</div>
              </div>
            </div>

            {/* Impact Placeholders */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              <div className="p-4 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] text-center space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-[#B86428] font-mono">[XX]%</div>
                <div className="text-xs text-[#5A4030] font-semibold">Maker hoàn thành</div>
              </div>
              <div className="p-4 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] text-center space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-[#B86428] font-mono">[XX]%</div>
                <div className="text-xs text-[#5A4030] font-semibold">Gửi lại thành công sau khi MB trả</div>
              </div>
              <div className="p-4 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] text-center space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-[#B86428] font-mono">[XX phút]</div>
                <div className="text-xs text-[#5A4030] font-semibold">Thời gian hoàn thành trung vị</div>
              </div>
            </div>
            <div className="text-[11px] text-[#8C6D4C] italic text-center">
              * Cập nhật bằng dữ liệu Production thực tế sau Go-live.
            </div>

            {/* WHERE vs WHY Visual */}
            <div className="p-4 sm:p-5 rounded-[10px] bg-[#FFF4D6] border border-[#DFC9A2] space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#DFC9A2] pb-2 text-xs font-bold text-[#8C4312]">
                <span>TRACKING ➔ WHERE? (Điểm rơi ở đâu)</span>
                <span>RESEARCH ➔ WHY? (Tại sao lại rơi)</span>
              </div>
              <p className="text-xs sm:text-sm text-[#4A2414] leading-relaxed">
                Ví dụ: Drop-off tại bước Hồ sơ <strong>KHÔNG ĐỒNG NGHĨA</strong> với việc Upload UI có vấn đề. Nguyên nhân thực tế có thể là: doanh nghiệp chưa có tài liệu, chưa có số liệu đúng kỳ kế toán, sai định dạng file, hoặc phải chờ xin phê duyệt từ phòng ban khác.
              </p>
            </div>
          </section>

          {/* =====================================================================
           * SECTION X: NHÌN LẠI DỰ ÁN (2 CỘT NHIỀU WHITESPACE)
           * ===================================================================== */}
          <section id="sec-10" className="space-y-6 scroll-mt-20">
            <div className="space-y-2 border-b border-[#DFC9A2] pb-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D1B12]">
                X. Nhìn lại dự án
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Left Column: Những gì tiếp tục giữ */}
              <div className="p-5 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] space-y-4">
                <div className="text-xs font-bold text-[#15803D] uppercase tracking-wider flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#16A34A]" />
                  <span>NHỮNG GÌ TÔI MUỐN TIẾP TỤC GIỮ</span>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-[#3E2718]">
                  <div className="space-y-1">
                    <strong className="block text-[#15803D]">01. Không nhảy thẳng vào giao diện</strong>
                    <p className="text-[#5A4030] leading-relaxed">
                      Đi theo trình tự: Bài toán ➔ Luồng (Flow) ➔ Nguyên mẫu (Wireframe/Prototype) ➔ Giao diện chi tiết.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <strong className="block text-[#15803D]">02. Kiểm thử trước khi Dev phát triển sâu</strong>
                    <p className="text-[#5A4030] leading-relaxed">
                      Usability Testing sớm giúp loại bỏ rủi ro hiểu sai quy trình, tiết kiệm đáng kể effort làm lại.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <strong className="block text-[#15803D]">03. Không chỉ thiết kế luồng thuận lợi (Happy Path)</strong>
                    <p className="text-[#5A4030] leading-relaxed">
                      Trong B2B Lending, thiết kế trạng thái Return, Autosave và lỗi là yếu tố quyết định sự liền mạch.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <strong className="block text-[#15803D]">04. Theo sản phẩm tới Go-live</strong>
                    <p className="text-[#5A4030] leading-relaxed">
                      Đồng hành cùng BA và Dev trong Refinement và UAT để đảm bảo trải nghiệm thực tế đúng với thiết kế.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Nếu làm lại sẽ thay đổi */}
              <div className="p-5 rounded-[12px] bg-[#FFFDF6] border border-[#DFC9A2] space-y-4">
                <div className="text-xs font-bold text-[#991B1B] uppercase tracking-wider flex items-center gap-1.5">
                  <RotateCcw className="w-4 h-4 text-[#DC2626]" />
                  <span>NẾU LÀM LẠI, TÔI SẼ THAY ĐỔI</span>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-[#3E2718]">
                  <div className="space-y-1">
                    <strong className="block text-[#991B1B]">01. Xác định Tracking sớm hơn</strong>
                    <p className="text-[#5A4030] leading-relaxed">
                      Định nghĩa schema sự kiện và funnel telemetry ngay từ khâu Concept để có baseline dữ liệu sâu hơn.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <strong className="block text-[#991B1B]">02. Đưa Approver vào Research sớm hơn</strong>
                    <p className="text-[#5A4030] leading-relaxed">
                      Giai đoạn đầu tập trung nhiều vào Maker; Approver (lãnh đạo duyệt) cũng cần được phỏng vấn sớm để tối ưu Decision Summary.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <strong className="block text-[#991B1B]">03. Đi sâu hơn vào quá trình chuẩn bị hồ sơ</strong>
                    <p className="text-[#5A4030] leading-relaxed">
                      Nghiên cứu sâu nguồn gốc tài liệu nội bộ của doanh nghiệp để cung cấp hướng dẫn chính xác hơn nữa.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =====================================================================
           * SECTION XI: NHỮNG GÌ TÔI MUỐN CẢI TIẾN TIẾP (FUTURE CONCEPTS)
           * ===================================================================== */}
          <section id="sec-11" className="space-y-6 scroll-mt-20">
            <div className="space-y-2 border-b border-[#DFC9A2] pb-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D1B12]">
                XI. Những gì tôi muốn cải tiến tiếp
              </h2>
              <div className="inline-block px-2.5 py-0.5 rounded bg-[#FFF0D4] border border-[#DFC9A2] text-xs font-mono font-bold text-[#B86428]">
                ĐÂY LÀ ĐỀ XUẤT TIẾP THEO (FUTURE CONCEPT) · CHƯA PHẢI TÍNH NĂNG GO-LIVE
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 01: Hướng dẫn hồ sơ theo ngữ cảnh */}
              <div className="p-4 sm:p-5 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] space-y-2">
                <div className="text-xs font-mono font-bold text-[#B86428]">01</div>
                <div className="font-bold text-[#2D1B12] text-sm sm:text-base">
                  Hướng dẫn hồ sơ tại đúng ngữ cảnh
                </div>
                <p className="text-xs text-[#5A4030] leading-relaxed">
                  Concept UI trả lời trực diện: Cần tài liệu gì? Kỳ nào? Định dạng? Có ví dụ mẫu? Có tài liệu thay thế không?
                </p>
                {/* Replace with actual UI: Future Concept 1 */}
                <VisualBlock
                  item={{
                    src: '/case-study/medium-term-credit/14-future/future-contextual-docs.png',
                    fallbackText: 'Concept UI: Modal hướng dẫn tài liệu chi tiết có file mẫu tải về và danh sách tài liệu thay thế',
                    type: 'UI DESIGN',
                    caption: 'FUTURE CONCEPT: Hướng dẫn hồ sơ theo ngữ cảnh',
                    badge: 'Future Concept'
                  }}
                />
              </div>

              {/* 02: Trang riêng cho phương án bị MB trả lại */}
              <div className="p-4 sm:p-5 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] space-y-2">
                <div className="text-xs font-mono font-bold text-[#B86428]">02</div>
                <div className="font-bold text-[#2D1B12] text-sm sm:text-base">
                  Trang riêng cho phương án bị MB trả lại
                </div>
                <p className="text-xs text-[#5A4030] leading-relaxed">
                  Hiển thị tập trung: “MB cần bạn cập nhật 2 nội dung” ➔ Thông tin phương án / Hồ sơ ➔ Nút CTA đi thẳng tới phần cần chỉnh sửa.
                </p>
                {/* Replace with actual UI: Future Concept 2 */}
                <VisualBlock
                  item={{
                    src: '/case-study/medium-term-credit/14-future/future-return-portal.png',
                    fallbackText: 'Concept UI: Màn hình chuyên biệt quản lý các nội dung MB yêu cầu cập nhật kèm deep-link',
                    type: 'UI DESIGN',
                    caption: 'FUTURE CONCEPT: Return Summary Portal dành riêng cho phương án cần sửa',
                    badge: 'Future Concept'
                  }}
                />
              </div>

              {/* 03: Lịch sử phiên bản */}
              <div className="p-4 sm:p-5 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] space-y-2">
                <div className="text-xs font-mono font-bold text-[#B86428]">03</div>
                <div className="font-bold text-[#2D1B12] text-sm sm:text-base">
                  Lịch sử phiên bản (Version History)
                </div>
                <p className="text-xs text-[#5A4030] leading-relaxed">
                  Timeline minh bạch: V1 Maker gửi ➔ MB trả lại ➔ V2 Maker cập nhật ➔ Approver duyệt ➔ MB xử lý.
                </p>
                {/* Replace with actual UI: Future Concept 3 */}
                <VisualBlock
                  item={{
                    src: '/case-study/medium-term-credit/14-future/future-version-history.png',
                    fallbackText: 'Concept UI: Dòng thời gian trực quan hóa các phiên bản nộp và các thay đổi giữa V1 và V2',
                    type: 'UI DESIGN',
                    caption: 'FUTURE CONCEPT: Lịch sử phiên bản đối soát',
                    badge: 'Future Concept'
                  }}
                />
              </div>

              {/* 04: Theo dõi hành trình Approver */}
              <div className="p-4 sm:p-5 rounded-[10px] bg-[#FFFDF6] border border-[#DFC9A2] space-y-2">
                <div className="text-xs font-mono font-bold text-[#B86428]">04</div>
                <div className="font-bold text-[#2D1B12] text-sm sm:text-base">
                  Theo dõi hành trình Approver
                </div>
                <p className="text-xs text-[#5A4030] leading-relaxed">
                  Đo lường chi tiết: Maker gửi ➔ Approver mở ➔ Approver phê duyệt. Đánh giá Time to Open, Time to Approve và Return Rate nội bộ.
                </p>
                {/* Replace with actual UI: Future Concept 4 */}
                <VisualBlock
                  item={{
                    src: '/case-study/medium-term-credit/14-future/future-approver-tracking.png',
                    fallbackText: 'Concept UI: Dashboard đo lường thời gian xử lý của cấp phê duyệt doanh nghiệp',
                    type: 'UI DESIGN',
                    caption: 'FUTURE CONCEPT: Tối ưu thời gian duyệt của Approver',
                    badge: 'Future Concept'
                  }}
                />
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* =========================================================================
       * FULL-FEATURED LIGHTBOX MODAL (PAN & ZOOM SUPPORT)
       * ========================================================================= */}
      {lightboxVisual && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in select-none"
          onClick={() => {
            setLightboxVisual(null);
            setLightboxZoom(1);
          }}
        >
          <div
            className="relative max-w-6xl w-full max-h-[95vh] bg-[#1E293B] rounded-xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Toolbar */}
            <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-white text-xs sm:text-sm font-bold">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px] uppercase font-bold shrink-0">
                  {lightboxVisual.type}
                </span>
                <span className="truncate text-slate-300 text-xs font-medium">
                  {lightboxVisual.caption || lightboxVisual.src}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {/* Zoom Controls */}
                <button
                  onClick={() => setLightboxZoom((z) => Math.max(0.75, z - 0.25))}
                  className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  title="Thu nhỏ"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="font-mono text-xs text-slate-400 w-12 text-center">
                  {Math.round(lightboxZoom * 100)}%
                </span>
                <button
                  onClick={() => setLightboxZoom((z) => Math.min(2.5, z + 0.25))}
                  className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  title="Phóng to"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <div className="w-px h-4 bg-slate-800 mx-1" />
                <button
                  onClick={() => {
                    setLightboxVisual(null);
                    setLightboxZoom(1);
                  }}
                  className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Đóng (ESC)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Lightbox Canvas Area */}
            <div className="p-4 sm:p-6 overflow-auto max-h-[calc(95vh-90px)] flex items-center justify-center bg-slate-900/60">
              <div
                style={{ transform: `scale(${lightboxZoom})`, transformOrigin: 'center center' }}
                className="transition-transform duration-150 max-w-full"
              >
                <img
                  src={lightboxVisual.src}
                  alt={lightboxVisual.caption || lightboxVisual.type}
                  className="max-w-full h-auto max-h-[80vh] object-contain rounded-lg border border-slate-800 shadow-xl"
                  onError={(e) => {
                    // Fallback to placeholder in lightbox
                    (e.target as HTMLElement).style.display = 'none';
                    const parent = (e.target as HTMLElement).parentElement;
                    if (parent) {
                      const div = document.createElement('div');
                      div.className =
                        'p-8 text-center text-slate-300 space-y-2 bg-slate-950 rounded-lg border border-slate-800 max-w-lg';
                      div.innerHTML = `<div class="font-bold text-amber-400 text-sm">${lightboxVisual.type} — Replace with actual asset</div><div class="text-xs text-slate-400">${lightboxVisual.fallbackText || lightboxVisual.src}</div><div class="text-[10px] font-mono text-slate-500 pt-1">${lightboxVisual.src}</div>`;
                      parent.appendChild(div);
                    }
                  }}
                />
              </div>
            </div>

            {/* Lightbox Caption Footer */}
            <div className="px-4 py-2 bg-slate-950/80 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>{lightboxVisual.caption || 'Product Design Screenshot'}</span>
              <span className="font-mono text-[10px] text-slate-500">Phím ESC để đóng</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
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
  ArrowUpRight
} from 'lucide-react';
import { ProjectItem } from '../../../types';

interface BizMBBankCaseStudyProps {
  project: ProjectItem;
  onBack: () => void;
}

const CHAPTERS = [
  { id: 'sec-01', num: '01', title: 'Tổng quan' },
  { id: 'sec-02', num: '02', title: 'Bối cảnh & Giả thuyết' },
  { id: 'sec-03', num: '03', title: 'Nghiên cứu' },
  { id: 'sec-04', num: '04', title: 'Customer Journey' },
  { id: 'sec-05', num: '05', title: 'HMW & Ưu tiên' },
  { id: 'sec-06', num: '06', title: 'Chiến lược' },
  { id: 'sec-07', num: '07', title: 'Flow & Prototype' },
  { id: 'sec-08', num: '08', title: 'Giải pháp UI' },
  { id: 'sec-09', num: '09', title: 'Usability Testing' },
  { id: 'sec-10', num: '10', title: 'Tác động & Bài học' }
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
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-[#F8FAFC] select-text">
      {/* =========================================================================
       * FIXED SUBHEADER: MODERN GLASSMORPHIC CHAPTER NAVIGATION
       * ========================================================================= */}
      <div className="shrink-0 z-20 px-3 sm:px-5 py-2.5 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs flex items-center gap-2 relative select-none">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A1D37] text-white hover:bg-[#132A4D] font-sans text-xs font-semibold shrink-0 transition-all shadow-xs cursor-pointer active:scale-95"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">QUAY LẠI</span>
        </button>

        {/* Scroll Left Button */}
        <button
          onClick={() => scrollChapters('left')}
          disabled={!canScrollLeft}
          className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 border transition-all cursor-pointer ${
            canScrollLeft
              ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-xs active:scale-95'
              : 'opacity-25 cursor-not-allowed bg-slate-50 border-transparent text-slate-400'
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
                className={`px-3 py-1 rounded-md font-sans text-[11px] sm:text-xs font-medium transition-all shrink-0 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#0284C7] text-white font-semibold shadow-xs shadow-sky-500/30 ring-1 ring-sky-600 scale-[1.02]'
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-600 hover:text-slate-900 border border-slate-200/60'
                }`}
                title={c.title}
              >
                <span className={isActive ? 'text-sky-100 font-bold' : 'text-slate-500 font-semibold'}>{c.num}</span>
                <span className="ml-1.5">
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
          className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 border transition-all cursor-pointer ${
            canScrollRight
              ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-xs active:scale-95'
              : 'opacity-25 cursor-not-allowed bg-slate-50 border-transparent text-slate-400'
          }`}
          title="Cuộn sang phải"
          aria-label="Cuộn sang phải"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className="hidden xl:flex items-center gap-1.5 font-sans text-xs px-2.5 py-1 rounded-full bg-sky-50 border border-sky-200/80 text-sky-700 shrink-0 font-semibold ml-1">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>ENTERPRISE CASE STUDY</span>
        </div>
      </div>

      {/* =========================================================================
       * SCROLLABLE CASE STUDY CONTENT BODY (MODERN TECH CANVAS)
       * ========================================================================= */}
      <div
        ref={scrollContainerRef}
        id="casestudy-body-container"
        className="flex-1 overflow-y-auto p-4 sm:p-7 md:p-9 space-y-10 sm:space-y-14 bg-[#F8FAFC] text-slate-800 custom-scrollbar font-sans pb-20 relative"
      >
        {/* =========================================================================
         * SECTION 01 — PROJECT OVERVIEW (TỔNG QUAN)
         * ========================================================================= */}
        <section id="sec-01" className="space-y-6 pt-1">
          {/* Editorial Header */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wide uppercase">
              <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
                01 • PRODUCT DESIGN CASE STUDY
              </span>
              <span className="text-slate-400">•</span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-200/80 text-slate-700">
                BIZ MBBANK 2.0
              </span>
              <span className="text-slate-400">•</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                UPPER SME & CIB
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold text-slate-900 tracking-tight leading-[1.2]">
              Thiết kế lại hành trình cấp hạn mức trung dài hạn cho doanh nghiệp
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-4xl pt-0.5">
              Biến quy trình thẩm định tín dụng phức tạp thành một trải nghiệm số minh bạch, có hướng dẫn thông minh (Readiness Check & Dynamic Checklist) và kết nối liền mạch với Relationship Manager (RM) — tạo chuẩn mực mới cho ngân hàng số doanh nghiệp phân khúc quy mô lớn.
            </p>
          </div>

          {/* Metadata Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all">
              <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">Vai trò chính</div>
              <div className="text-sm font-bold text-slate-900 mt-1">Product Designer</div>
              <div className="text-xs text-slate-500 mt-0.5">Lead UX, Information Architecture & Design System</div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all">
              <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">Sản phẩm & Nền tảng</div>
              <div className="text-sm font-bold text-slate-900 mt-1">BIZ MBBank Web & Mobile</div>
              <div className="text-xs text-slate-500 mt-0.5">Đồng bộ đa nền tảng Web Portal & Smart App</div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all">
              <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">Khách hàng mục tiêu</div>
              <div className="text-sm font-bold text-slate-900 mt-1">Upper SME & CIB</div>
              <div className="text-xs text-slate-500 mt-0.5">Kế toán viên, Kế toán trưởng, CFO/CEO & RM MBBank</div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all">
              <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">Phạm vi tác động</div>
              <div className="text-sm font-bold text-slate-900 mt-1">6 Điểm chạm cốt lõi</div>
              <div className="text-xs text-slate-500 mt-0.5">Khởi tạo • Hồ sơ • Duyệt 1-chạm • Gửi • Tracking • RM</div>
            </div>
          </div>

          {/* Executive Summary 4-Column Board */}
          <div className="p-5 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Target className="w-4 h-4 text-sky-600" />
                <span>TÓM TẮT ĐIỀU HÀNH (EXECUTIVE PROJECT SUMMARY)</span>
              </div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Core Impact Matrix</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-100 space-y-1.5">
                <div className="text-xs font-bold text-rose-700 uppercase flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                  <span>VẤN ĐỀ (PROBLEM)</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Drop-off lên đến <strong>62%</strong> ngay bước nộp hồ sơ; trung bình phải bổ sung <strong>3–5 lần</strong>; RM phải can thiệp thủ công từ quá sớm và khách hàng hoàn toàn mù mờ tiến độ.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-sky-50/50 border border-sky-100 space-y-1.5">
                <div className="text-xs font-bold text-sky-700 uppercase flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-sky-600" />
                  <span>TIẾP CẬN (APPROACH)</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Kết hợp phân tích định lượng (Product Funnel Log 6 tháng) và phỏng vấn định tính chuyên sâu 4 nhóm mắt xích (Maker, Checker, Approver, RM) để giải mã rào cản tâm lý.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 space-y-1.5">
                <div className="text-xs font-bold text-emerald-700 uppercase flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>GIẢI PHÁP (SOLUTION)</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Readiness Check trước khi cam kết; Dynamic Checklist thông minh theo ngành nghề; Luồng Decision Summary ký duyệt 1-chạm cho CEO; Timeline minh bạch & Bàn giao RM có ngữ cảnh.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 space-y-1.5">
                <div className="text-xs font-bold text-indigo-700 uppercase flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
                  <span>KẾT QUẢ ĐO LƯỜNG</span>
                </div>
                <div className="text-xs space-y-1 pt-0.5">
                  <div className="flex justify-between font-medium"><span className="text-slate-600">Tỷ lệ hoàn thành:</span> <strong className="text-emerald-700 font-bold">+[XX]%</strong></div>
                  <div className="flex justify-between font-medium"><span className="text-slate-600">Bổ sung hồ sơ:</span> <strong className="text-emerald-700 font-bold">−[XX]%</strong></div>
                  <div className="flex justify-between font-medium"><span className="text-slate-600">Thời gian tạo đơn:</span> <strong className="text-emerald-700 font-bold">−[XX]%</strong></div>
                </div>
              </div>
            </div>
          </div>

          {/* Large Hero Showcase: MacBook Pro & iPhone Enterprise Frame */}
          <div className="rounded-2xl p-4 sm:p-7 bg-gradient-to-b from-[#0A192F] via-[#0F2744] to-[#071324] border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between text-slate-300 border-b border-blue-900/50 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="font-sans text-xs text-sky-200 font-semibold ml-2">BIZ MBBank Enterprise Suite • Cấp hạn mức trung dài hạn</span>
              </div>
              <span className="font-mono text-[11px] text-sky-400 bg-sky-950/80 px-2.5 py-0.5 rounded border border-sky-800 hidden sm:inline">
                Upper SME & CIB Edition
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center pt-2">
              {/* Left 8 Cols: Web Portal View */}
              <div className="lg:col-span-8 rounded-xl bg-[#091527] border border-blue-900/80 shadow-2xl overflow-hidden">
                {/* Web Header */}
                <div className="bg-[#050D1A] px-4 py-2.5 flex items-center justify-between border-b border-blue-900/60">
                  <div className="flex items-center gap-2">
                    <span className="text-rose-500 text-sm font-bold">★</span>
                    <span className="text-sky-400 font-extrabold text-xs tracking-tight">MB</span>
                    <span className="text-slate-300 text-[11px] font-semibold border-l border-slate-700 pl-2 ml-1">BIZ Portal Enterprise</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-[10px] text-slate-300">
                    <span className="px-2 py-0.5 rounded bg-blue-950/80 border border-blue-800 text-sky-300 font-mono">MST: 0102030405</span>
                    <span className="hidden sm:inline">CTCP TẬP ĐOÀN CÔNG NGHỆ & SẢN XUẤT</span>
                  </div>
                </div>

                {/* Web Body UI Content */}
                <div className="p-4 sm:p-5 space-y-4 font-sans text-slate-200 text-xs">
                  {/* Stepper bar */}
                  <div className="flex items-center justify-between bg-slate-900/90 p-3 rounded-lg border border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-[10px]">✓</span>
                      <span className="font-semibold text-white">1. Kiểm tra điều kiện</span>
                    </div>
                    <div className="h-0.5 w-10 bg-emerald-500 hidden sm:block" />
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold text-[10px]">2</span>
                      <span className="font-semibold text-sky-300">2. Chuẩn bị hồ sơ</span>
                    </div>
                    <div className="h-0.5 w-10 bg-slate-700 hidden sm:block" />
                    <div className="flex items-center gap-2 text-slate-400">
                      <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px]">3</span>
                      <span>3. Phê duyệt nội bộ</span>
                    </div>
                    <div className="h-0.5 w-10 bg-slate-700 hidden sm:block" />
                    <div className="flex items-center gap-2 text-slate-400">
                      <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px]">4</span>
                      <span>4. Gửi MBBank</span>
                    </div>
                  </div>

                  {/* Main Content Showcase: Dynamic Checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-xs flex items-center gap-1.5">
                          <FileCheck className="w-3.5 h-3.5 text-sky-400" />
                          <span>Danh mục hồ sơ tài chính (3/4)</span>
                        </span>
                        <span className="text-[10px] text-emerald-400 font-semibold">75% Hoàn tất</span>
                      </div>
                      <div className="space-y-1.5 text-[11px]">
                        <div className="flex items-center justify-between p-1.5 rounded bg-slate-950/60 border border-slate-800 text-slate-300">
                          <span className="flex items-center gap-1.5">
                            <span className="text-emerald-400">●</span> Báo cáo tài chính 2 năm kiểm toán
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">PDF • 12MB</span>
                        </div>
                        <div className="flex items-center justify-between p-1.5 rounded bg-slate-950/60 border border-slate-800 text-slate-300">
                          <span className="flex items-center gap-1.5">
                            <span className="text-emerald-400">●</span> Quyết định đầu tư dự án mở rộng
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">PDF • 4.8MB</span>
                        </div>
                        <div className="flex items-center justify-between p-1.5 rounded bg-amber-950/30 border border-amber-800/60 text-amber-200">
                          <span className="flex items-center gap-1.5">
                            <span className="text-amber-400 animate-pulse">●</span> Hồ sơ phương án trả nợ & dòng tiền
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold cursor-pointer">
                            Bổ sung ngay
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-xs flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Tóm tắt đề xuất cấp hạn mức</span>
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-700 text-emerald-300">
                          Đã sơ duyệt
                        </span>
                      </div>
                      <div className="space-y-1.5 text-[11px] text-slate-300">
                        <div className="flex justify-between border-b border-slate-800 pb-1">
                          <span className="text-slate-400">Nhu cầu vốn dự kiến:</span>
                          <span className="font-bold text-sky-300 font-mono">85.000.000.000 VNĐ</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-800 pb-1">
                          <span className="text-slate-400">Thời hạn đề xuất:</span>
                          <span className="font-semibold text-white">60 Tháng (Trung dài hạn)</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-800 pb-1">
                          <span className="text-slate-400">RM phụ trách chi nhánh:</span>
                          <span className="font-semibold text-sky-400">Nguyễn Tuấn Anh • CN Hoàn Kiếm</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right 4 Cols: Mobile App View (Approver Flow) */}
              <div className="lg:col-span-4 flex justify-center">
                <div className="w-[260px] rounded-2xl bg-slate-950 border-2 border-slate-700 shadow-2xl p-3 space-y-3 relative overflow-hidden">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800 pb-1.5">
                    <div className="flex items-center gap-1">
                      <span className="text-rose-500 font-bold">★</span>
                      <span className="text-white font-bold">BIZ MB</span>
                    </div>
                    <span className="text-emerald-400 font-semibold">Chờ CEO ký</span>
                  </div>

                  <div className="space-y-2 text-slate-200">
                    <div className="text-xs font-bold text-white">Phê duyệt yêu cầu cấp hạn mức TDH</div>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5 text-[10px]">
                      <div className="flex justify-between"><span className="text-slate-400">Doanh nghiệp:</span> <span className="font-bold text-white truncate max-w-[110px]">Tập đoàn Công nghệ</span></div>
                      <div className="flex justify-between"><span className="text-slate-400">Hạn mức đề nghị:</span> <strong className="text-emerald-400 font-mono text-xs">85 Tỷ VNĐ</strong></div>
                      <div className="flex justify-between"><span className="text-slate-400">Người khởi tạo:</span> <span className="text-slate-300">Kế toán trưởng (Đã ký)</span></div>
                    </div>

                    <div className="p-2 rounded bg-sky-950/60 border border-sky-800/80 text-[10px] text-sky-200 flex items-start gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                      <span>Đã kiểm tra đầy đủ 4/4 hồ sơ pháp lý & phương án hoàn vốn.</span>
                    </div>

                    <button className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wide shadow-md transition-all cursor-pointer">
                      KÝ DUYỆT BẰNG SMART CA
                    </button>
                    <div className="text-center text-[9px] text-slate-400 hover:text-slate-300 cursor-pointer">
                      Xem tóm tắt hồ sơ đính kèm
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
         * SECTION 02 — BỐI CẢNH & GIẢ THUYẾT (CONTEXT & SIGNALS)
         * ========================================================================= */}
        <section id="sec-02" className="space-y-6 scroll-mt-20">
          <div className="space-y-2">
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
              02 / BỐI CẢNH & GIẢ THUYẾT
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Một hành trình có giá trị cao nhưng khó bắt đầu
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl">
              Vay vốn trung dài hạn là đòn bẩy sống còn của phân khúc Upper SME và CIB để đầu tư dây chuyền sản xuất mới, mở rộng nhà xưởng, mua sắm phương tiện vận tải và tài trợ dự án quy mô lớn từ hàng chục đến hàng trăm tỷ đồng.
            </p>
          </div>

          {/* 6 Early Warning Signals Bento */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>6 TÍN HIỆU CẢNH BÁO TỪ THỰC TẾ VẬN HÀNH (INITIAL SIGNALS)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-600">TÍN HIỆU 01</span>
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                </div>
                <div className="text-sm font-bold text-slate-900">Khách hàng bắt đầu nhưng drop-off sớm</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Lượng click nút "Đăng ký cấp hạn mức" rất cao nhưng hơn 60% rời bỏ ngay màn hình đầu tiên khi thấy bảng danh sách yêu cầu tài liệu vô tận.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-600">TÍN HIỆU 02</span>
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                </div>
                <div className="text-sm font-bold text-slate-900">Hồ sơ phải bổ sung từ 3 – 5 lần</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Doanh nghiệp tải lên sai biểu mẫu báo cáo tài chính, thiếu phụ lục hợp đồng mở rộng dự án khiến chuyên viên quan hệ khách hàng (RM) phải yêu cầu làm lại liên tục.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-600">TÍN HIỆU 03</span>
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                </div>
                <div className="text-sm font-bold text-slate-900">RM phải can thiệp thủ công từ quá sớm</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Thay vì phục vụ tự động (Self-service), RM phải gọi điện hướng dẫn từng file qua Zalo/Email, biến kênh số thành một biểu mẫu tĩnh vô hồn.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-600">TÍN HIỆU 04</span>
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                </div>
                <div className="text-sm font-bold text-slate-900">Bản nháp (Draft) bị bỏ dở hàng loạt</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Dữ liệu ghi nhận hàng ngàn hồ sơ dừng lại ở trạng thái "Đang soạn thảo" trên 30 ngày mà không có bất kỳ hành động tiếp theo nào từ người dùng.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600">TÍN HIỆU 05</span>
                  <span className="w-2 h-2 rounded-full bg-slate-400" />
                </div>
                <div className="text-sm font-bold text-slate-900">Tắc nghẽn ở khâu lãnh đạo ký duyệt</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Kế toán viên chuẩn bị xong hồ sơ trên Web Portal nhưng CEO/CFO thường xuyên đi công tác, không thể mở máy tính đăng nhập vào hệ thống để phê duyệt.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600">TÍN HIỆU 06</span>
                  <span className="w-2 h-2 rounded-full bg-slate-400" />
                </div>
                <div className="text-sm font-bold text-slate-900">Khách hàng hoàn toàn mù mờ trạng thái</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Sau khi nhấn nút "Gửi ngân hàng", màn hình chỉ hiện một dòng trạng thái "Đang xử lý" chung chung khiến doanh nghiệp lo âu và liên tục gọi điện giục giã.
                </p>
              </div>
            </div>
          </div>

          {/* Core Hypothesis Banner */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#0A1D37] to-[#112D56] text-white space-y-2 shadow-md">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-sky-300" />
              <span>GIẢ THUYẾT CỐT LÕI (CORE HYPOTHESIS)</span>
            </div>
            <p className="text-sm sm:text-base font-semibold leading-relaxed text-slate-100">
              “Nếu phân rã việc nộp hồ sơ thành các bước nhỏ có chuẩn bị trước (Readiness Check), tùy biến danh mục tài liệu theo từng ngành nghề (Dynamic Checklist), tách biệt luồng soạn thảo với luồng phê duyệt 1-chạm của lãnh đạo trên di động, và kết nối minh bạch tiến trình với RM — thì tỷ lệ hoàn thành hồ sơ sẽ tăng trưởng vượt bậc và giảm thiểu số lần phải bổ sung.”
            </p>
            <div className="text-xs text-sky-300/80 pt-1 font-medium">
              → Chúng tôi quyết định bước vào giai đoạn nghiên cứu thực địa để kiểm chứng giả thuyết này.
            </div>
          </div>
        </section>

        {/* =========================================================================
         * SECTION 03 — NGHIÊN CỨU (RESEARCH: DATA FUNNEL & 4 ROLES INTERVIEW)
         * ========================================================================= */}
        <section id="sec-03" className="space-y-6 scroll-mt-20">
          <div className="space-y-2">
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
              03 / NGHIÊN CỨU & KHÁM PHÁ
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Đi tìm nguồn gốc điểm gãy qua dữ liệu & phỏng vấn sâu
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl">
              Để không rơi vào cái bẫy cảm tính, chúng tôi triển khai song song hai phương pháp: Phân tích định lượng nhật ký sự kiện trên hệ thống thực tế và Phỏng vấn sâu 18 đại diện thuộc 4 nhóm mắt xích tham gia hành trình.
            </p>
          </div>

          {/* Method 01: Product Data Funnel */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <TrendingUp className="w-4 h-4 text-sky-600" />
                <span>PHƯƠNG PHÁP 01: PHÂN TÍCH PHỄU DỮ LIỆU SẢN PHẨM (QUANTITATIVE FUNNEL)</span>
              </div>
              <span className="text-xs text-slate-500 hidden sm:inline">Trích xuất log 6 tháng • BIZ MBBank Web</span>
            </div>

            {/* Visual Funnel Step Progress */}
            <div className="space-y-3 pt-1">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">1. Nhấp nút "Tìm hiểu & Khởi tạo hạn mức TDH"</span>
                  <span className="text-slate-900 font-bold font-mono">100% Khách hàng</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-sky-500 rounded-full w-full" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">2. Nhấn nút "Tạo hồ sơ đề nghị"</span>
                  <span className="text-slate-900 font-bold font-mono">74%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-sky-500 rounded-full w-[74%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-rose-600">
                  <span className="flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                    <span>3. Tải lên tài liệu hồ sơ (DROP-OFF LỚN NHẤT)</span>
                  </span>
                  <span className="font-mono">28% (Rơi rụng −62%)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full w-[28%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">4. Ký số & Gửi ngân hàng thành công</span>
                  <span className="text-emerald-600 font-bold font-mono">12% Completion Rate</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-[12%]" />
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700">
              <strong className="text-slate-900">Key Data Finding:</strong> Điểm nghẽn không nằm ở nhu cầu vay vốn. Nó nằm ở <strong>sự thiếu chuẩn bị và thiếu rõ ràng</strong> trước khi khách hàng cam kết bắt đầu tải lên tài liệu.
            </div>
          </div>

          {/* Method 02: 4 Persona Deep Interviews */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <Users className="w-4 h-4 text-sky-600" />
              <span>PHƯƠNG PHÁP 02: PHỎNG VẤN SÂU 4 NHÓM VAI TRÒ (QUALITATIVE INTERVIEWS)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Persona 1: Maker */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs">
                      KT
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Kế toán viên (Maker)</div>
                      <div className="text-[11px] text-slate-500">Người trực tiếp chuẩn bị hồ sơ</div>
                    </div>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 font-semibold text-slate-600">
                    Trực tiếp thao tác
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-xs text-slate-700 italic leading-relaxed">
                  “Mở màn hình lên thấy yêu cầu 15 loại giấy tờ mà không biết ngành sản xuất của mình cần nộp mục nào. Sợ nộp sai sếp mắng nên em tắt luôn để gọi hỏi RM cho chắc.”
                </div>

                <div className="text-xs text-slate-600 space-y-1">
                  <div><strong>Ma sát chính:</strong> Choáng ngợp trước danh sách checklist tĩnh, thiếu giải thích thuật ngữ nghiệp vụ ngân hàng.</div>
                </div>
              </div>

              {/* Persona 2: Checker */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">
                      KT
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Kế toán trưởng & Ban kiểm soát</div>
                      <div className="text-[11px] text-slate-500">Người soát xét & ủy quyền</div>
                    </div>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 font-semibold text-amber-700">
                    Kiểm soát rủi ro
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-xs text-slate-700 italic leading-relaxed">
                  “Muốn giao cho nhân viên soạn thảo nhưng tài khoản BIZ MBBank cũ chỉ có 1 cấp quyền duy nhất. Tôi không thể đưa tài khoản có quyền chuyển tiền cho nhân viên làm hồ sơ vay được.”
                </div>

                <div className="text-xs text-slate-600 space-y-1">
                  <div><strong>Ma sát chính:</strong> Thiếu cơ chế phân quyền đa vai trò (Maker - Checker) trong luồng tạo hồ sơ tín dụng.</div>
                </div>
              </div>

              {/* Persona 3: Approver */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                      CEO
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Người phê duyệt (CFO / CEO)</div>
                      <div className="text-[11px] text-slate-500">Đại diện pháp luật ký số</div>
                    </div>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 font-semibold text-emerald-700">
                    Quyết định tối cao
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-xs text-slate-700 italic leading-relaxed">
                  “Tôi thường xuyên đi gặp đối tác ở công trường, không mở máy tính để đọc 20 file PDF được. Tôi cần 1 trang tóm tắt số liệu trọng yếu (Hạn mức, Dòng tiền hoàn vốn, Rủi ro) trên điện thoại để ký 1-chạm.”
                </div>

                <div className="text-xs text-slate-600 space-y-1">
                  <div><strong>Ma sát chính:</strong> Thiếu màn hình Decision Summary tối ưu cho thiết bị di động của lãnh đạo.</div>
                </div>
              </div>

              {/* Persona 4: RM */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                      RM
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Relationship Manager (RM MBBank)</div>
                      <div className="text-[11px] text-slate-500">Chuyên viên quản lý khách hàng</div>
                    </div>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 font-semibold text-indigo-700">
                    Đối tác đồng hành
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-xs text-slate-700 italic leading-relaxed">
                  “Khách hàng gọi nhờ hỗ trợ nhưng tôi không thấy được bản nháp họ đang nhập dở trên Portal. Cuối cùng tôi đành bảo khách gửi file qua email hoặc Zalo để tôi làm thủ công trên máy nội bộ.”
                </div>

                <div className="text-xs text-slate-600 space-y-1">
                  <div><strong>Ma sát chính:</strong> Kênh số và RM bị đứt đoạn dữ liệu; không có cơ chế chuyển giao (Handoff) có ngữ cảnh.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Research Synthesis Table */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              BẢNG TỔNG HỢP: NGUỒN DỮ LIỆU → BẰNG CHỨNG → PHÁT HIỆN → INSIGHT
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100/80 text-slate-700 uppercase font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3 rounded-l-lg">Nguồn (Source)</th>
                    <th className="p-3">Bằng chứng thực tế (Evidence)</th>
                    <th className="p-3">Phát hiện (Finding)</th>
                    <th className="p-3 rounded-r-lg">Insight cốt lõi (Core Insight)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="p-3 font-semibold text-sky-700">Analytics Funnel</td>
                    <td className="p-3">Drop-off 62% tại màn hình tải hồ sơ</td>
                    <td className="p-3">Khách hàng bị choáng ngợp bởi danh sách 15 mục giấy tờ không rõ định dạng</td>
                    <td className="p-3 font-medium text-slate-900">Khách hàng cần một bài tự kiểm tra (Readiness Check) trước khi bắt đầu tải file.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-amber-700">User Interview</td>
                    <td className="p-3">Người làm hồ sơ (Kế toán) khác người ký duyệt (CEO)</td>
                    <td className="p-3">Sản phẩm hiện tại thiết kế như hành trình của 1 cá nhân đơn lẻ</td>
                    <td className="p-3 font-medium text-slate-900">Đây là hành trình phối hợp đa vai trò, cần tách biệt luồng soạn thảo và màn hình tóm tắt duyệt.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-indigo-700">RM Operations</td>
                    <td className="p-3">70% khách gọi RM xin danh mục tài liệu chuẩn</td>
                    <td className="p-3">Handoff giữa kênh Digital và RM bị đứt đoạn, mất dữ liệu đã nhập</td>
                    <td className="p-3 font-medium text-slate-900">RM không phải bằng chứng self-service thất bại; RM là một phần tự nhiên của hành trình cần được số hóa handoff.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =========================================================================
         * SECTION 04 — CUSTOMER JOURNEY (7 BƯỚC + 3 INSIGHTS + LIGHTBOX)
         * ========================================================================= */}
        <section id="sec-04" className="space-y-6 scroll-mt-20">
          <div className="space-y-2">
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
              04 / BẢN ĐỒ HÀNH TRÌNH KHÁCH HÀNG (JOURNEY MAP)
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Phân rã hành trình 7 bước để định vị các điểm ma sát
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl">
              Chúng tôi vẽ lại hành trình thực tế từ lúc doanh nghiệp phát sinh nhu cầu đến khi nhận kết quả phê duyệt chính thức để phân tích hành động, dữ liệu và cảm xúc qua từng giai đoạn.
            </p>
          </div>

          {/* 7-Step Swimlane Journey Infographic */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                <Workflow className="w-4 h-4 text-sky-600" />
                <span>SWIMLANE JOURNEY: 7 GIAI ĐOẠN TÍN DỤNG DOANH NGHIỆP</span>
              </div>
              <button
                onClick={() => setLightboxImage('/assets/lending-flow.webp')}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200/80 text-xs font-semibold transition-colors cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Mở rộng toàn màn hình</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="font-bold text-sky-700">01. TÌM HIỂU</div>
                <div className="text-slate-600 text-[11px]">Đánh giá nhu cầu đầu tư thiết bị/nhà xưởng.</div>
                <div className="pt-1.5 border-t border-slate-200 text-[11px] text-slate-500">Cảm xúc: Tự tin</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="font-bold text-sky-700">02. KHỞI TẠO</div>
                <div className="text-slate-600 text-[11px]">Chọn gói vay & nhập số vốn đề xuất.</div>
                <div className="pt-1.5 border-t border-slate-200 text-[11px] text-slate-500">Cảm xúc: Hào hứng</div>
              </div>
              <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200 space-y-2">
                <div className="font-bold text-rose-700">03. CHUẨN BỊ HỒ SƠ</div>
                <div className="text-slate-700 text-[11px]">Thu thập BCTC, hồ sơ pháp lý, phương án vốn.</div>
                <div className="pt-1.5 border-t border-rose-200 text-[11px] font-bold text-rose-600">🔴 TẮC NGHẼN LỚN</div>
              </div>
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
                <div className="font-bold text-amber-700">04. DUYỆT NỘI BỘ</div>
                <div className="text-slate-700 text-[11px]">Kế toán trưởng & CEO ký số xác nhận.</div>
                <div className="pt-1.5 border-t border-amber-200 text-[11px] font-bold text-amber-600">⚠️ Chậm trễ ký</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="font-bold text-sky-700">05. GỬI MBBANK</div>
                <div className="text-slate-600 text-[11px]">Hồ sơ đẩy vào hệ thống thẩm định tín dụng.</div>
                <div className="pt-1.5 border-t border-slate-200 text-[11px] text-slate-500">Cảm xúc: Chờ đợi</div>
              </div>
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
                <div className="font-bold text-amber-700">06. THEO DÕI</div>
                <div className="text-slate-700 text-[11px]">Chờ thẩm định pháp lý và tài sản bảo đảm.</div>
                <div className="pt-1.5 border-t border-amber-200 text-[11px] font-bold text-amber-600">⚠️ Mù mờ tiến trình</div>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                <div className="font-bold text-emerald-700">07. RM HỖ TRỢ</div>
                <div className="text-slate-700 text-[11px]">Chuyên viên RM liên hệ hoàn tất hợp đồng.</div>
                <div className="pt-1.5 border-t border-emerald-200 text-[11px] font-bold text-emerald-600">🟢 An tâm</div>
              </div>
            </div>
          </div>

          {/* 3 Converged Core Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-sky-700">
                <span className="w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center font-bold">1</span>
                <span>INSIGHT 01: SỰ CHUẨN BỊ QUAN TRỌNG HƠN FORM NHẬP</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Khách hàng không sợ điền thông tin ngắn; họ sợ bắt đầu một hành trình lớn mà không biết trước mình cần chuẩn bị những gì và khả năng được cấp hạn mức là bao nhiêu.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-700">
                <span className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center font-bold">2</span>
                <span>INSIGHT 02: TÁCH BẠCH SOẠN THẢO VÀ PHÊ DUYỆT</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Kế toán cần công cụ chi tiết trên màn hình lớn (Web Portal) để đối soát số liệu; trong khi CEO chỉ cần một màn hình tóm tắt quyết định (Decision Summary) trên điện thoại để ký số.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center font-bold">3</span>
                <span>INSIGHT 03: HYBRID EXPERIENCE (DIGITAL + RM)</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Vay doanh nghiệp không thể 100% no-touch. Kênh số phải là trợ thủ đắc lực giúp RM hiểu ngay khách hàng đang vướng ở đâu thay vì bắt khách hàng làm lại từ đầu.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
         * SECTION 05 — HMW & ƯU TIÊN (PRIORITIZATION: IN-SCOPE VS OUT-OF-SCOPE)
         * ========================================================================= */}
        <section id="sec-05" className="space-y-6 scroll-mt-20">
          <div className="space-y-2">
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
              05 / HMW & MA TRẬN ƯU TIÊN
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Phân kỳ cơ hội và hội tụ vào giải pháp khả thi nhất
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl">
              Từ các điểm nghẽn, chúng tôi đặt ra 4 câu hỏi "Làm thế nào để..." (How Might We) và hội tụ thành ma trận phạm vi rõ ràng: Những gì đưa vào MVP và những gì dứt khoát loại trừ để bảo đảm an toàn tín dụng.
            </p>
          </div>

          {/* HMW 4 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1.5">
              <div className="text-xs font-bold text-sky-700 uppercase">HMW 01 • CHUẨN BỊ TRƯỚC</div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Làm thế nào để giúp doanh nghiệp tự đánh giá điều kiện và nắm rõ danh mục tài liệu cần thiết <strong>chỉ trong 2 phút</strong> trước khi chính thức tạo hồ sơ?
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1.5">
              <div className="text-xs font-bold text-sky-700 uppercase">HMW 02 • ĐƠN GIẢN HÓA CHECKLIST</div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Làm thế nào để danh mục hồ sơ tự động co giãn thông minh theo từng loại hình doanh nghiệp thay vì hiển thị toàn bộ 15 danh mục gây hoang mang?
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1.5">
              <div className="text-xs font-bold text-sky-700 uppercase">HMW 03 • PHÊ DUYỆT LÃNH ĐẠO</div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Làm thế nào để CEO có thể kiểm tra đủ dữ liệu cốt lõi và ký duyệt hồ sơ bằng Smart CA trên điện thoại di động trong chưa đầy 60 giây?
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1.5">
              <div className="text-xs font-bold text-sky-700 uppercase">HMW 04 • KẾT NỐI HYBRID RM</div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Làm thế nào để khi khách hàng gặp vướng mắc, RM có thể xem ngay bản nháp và hỗ trợ giải quyết mà khách hàng không bị mất dữ liệu đã nhập?
              </p>
            </div>
          </div>

          {/* Scope Matrix: In-Scope vs Out-of-Scope */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* In Scope */}
            <div className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>PHẠM VI THIẾT KẾ MVP (IN-SCOPE)</span>
              </div>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Bộ câu hỏi trắc nghiệm kiểm tra điều kiện sơ bộ (Readiness Check 2 phút).</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Dynamic Checklist phân loại hồ sơ theo quy mô và ngành nghề doanh nghiệp.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Màn hình Decision Summary tóm tắt số liệu trọng yếu cho lãnh đạo trên Mobile.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Timeline theo dõi trạng thái thẩm định đa chặng minh bạch với contact RM.</span>
                </div>
              </div>
            </div>

            {/* Out of Scope */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
                <AlertCircle className="w-4 h-4 text-slate-500" />
                <span>NGOÀI PHẠM VI MVP (OUT-OF-SCOPE)</span>
              </div>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-start gap-2">
                  <span className="text-slate-400">✕</span>
                  <span><strong>Không can thiệp chính sách tín dụng:</strong> Không tự ý cắt giảm các chứng từ pháp lý bắt buộc theo quy định Ngân hàng Nhà nước.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-slate-400">✕</span>
                  <span><strong>Không thay thế hội đồng tín dụng:</strong> Hệ thống không tự động ra quyết định giải ngân mà chỉ hỗ trợ hoàn thiện hồ sơ thẩm định.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-slate-400">✕</span>
                  <span><strong>Không xây dựng hệ thống Core Banking mới:</strong> Tận dụng và tích hợp trực tiếp các API hiện hữu của MBBank.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
         * SECTION 06 — CHIẾN LƯỢC TRẢI NGHIỆM (5 PILLARS BENTO GRID)
         * ========================================================================= */}
        <section id="sec-06" className="space-y-6 scroll-mt-20">
          <div className="space-y-2">
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
              06 / CHIẾN LƯỢC TRẢI NGHIỆM
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              5 Trụ cột kiến tạo chuẩn mực ngân hàng số doanh nghiệp
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl">
              Chúng tôi định hình 5 nguyên lý thiết kế xuyên suốt để dẫn dắt mọi quyết định từ cấu trúc thông tin (IA) đến từng micro-interaction trên cả hai nền tảng Web và Mobile.
            </p>
          </div>

          {/* 5 Pillars Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
                <CheckSquare className="w-5 h-5" />
              </div>
              <div className="text-sm font-bold text-slate-900">1. Chuẩn bị trước khi cam kết</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Không bắt khách hàng điền form ngay. Cho phép khách hàng thực hiện bài kiểm tra điều kiện trong 2 phút để biết trước khả năng đáp ứng và danh mục giấy tờ cần chuẩn bị.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <div className="text-sm font-bold text-slate-900">2. Hướng dẫn theo ngữ cảnh thực tế</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mỗi mục tài liệu đều có file mẫu đính kèm, giải thích định dạng cho phép, dung lượng tối đa và lý do vì sao ngân hàng cần tài liệu đó.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-sm font-bold text-slate-900">3. Phối hợp đúng vai trò doanh nghiệp</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tách biệt giao diện cho nhân viên kế toán (soạn thảo chi tiết trên Web) và lãnh đạo doanh nghiệp (xem tóm tắt trọng yếu và ký số trên Mobile).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-sm font-bold text-slate-900">4. Minh bạch sau khi nhấn gửi</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Thay thế thông báo "Đang xử lý" tĩnh bằng Timeline tiến độ đa chặng: Ai đang xử lý, bước tiếp theo là gì và dự kiến hoàn tất khi nào.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2.5 md:col-span-2 lg:col-span-2">
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <Workflow className="w-5 h-5" />
              </div>
              <div className="text-sm font-bold text-slate-900">5. Kênh số và RM là một hành trình liền mạch</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                RM không đứng ngoài ứng dụng. Khi khách hàng bấm "Cần RM hỗ trợ", toàn bộ bản nháp và điểm vướng mắc được đồng bộ tức thì sang CRM nội bộ của RM để cuộc gọi hỗ trợ diễn ra chính xác mà không cần giải thích lại.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
         * SECTION 07 — FLOW & PROTOTYPE (VISUAL CLIMAX 01)
         * ========================================================================= */}
        <section id="sec-07" className="space-y-6 scroll-mt-20">
          <div className="space-y-2">
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
              07 / USER FLOW & NGUYÊN MẪU TƯƠNG TÁC
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Sơ đồ luồng toàn trình 9 bước & Nguyên mẫu trực quan
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl">
              Sơ đồ User Flow kết hợp đồng bộ giữa Web Portal (Kế toán soạn thảo) và Mobile App (Lãnh đạo ký duyệt) cùng Video Prototype kịch bản thực tế 85 Tỷ VNĐ.
            </p>
          </div>

          {/* Interactive User Flow Banner */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Workflow className="w-4 h-4 text-sky-600" />
                <span>SƠ ĐỒ 9 BƯỚC HÀNH TRÌNH TƯƠNG TÁC (USER FLOW)</span>
              </div>
              <button
                onClick={() => setLightboxImage('/assets/lending-flow.webp')}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sky-600 text-white hover:bg-sky-500 text-xs font-semibold shadow-xs transition-all cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Xem bản vẽ phân giải cao (Lightbox)</span>
              </button>
            </div>

            {/* 9-Step Horizontal Progress Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="font-bold text-sky-700">1. Nhu cầu</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Xác định vốn</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="font-bold text-sky-700">2. Readiness</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Tự kiểm tra</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="font-bold text-sky-700">3. Khởi tạo</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Chọn gói vay</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="font-bold text-sky-700">4. Checklist</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Tải tài liệu</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="font-bold text-sky-700">5. Validate</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Kiểm tra lỗi</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="font-bold text-sky-700">6. Soát xét</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Kế toán trưởng</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="font-bold text-sky-700">7. CEO Ký</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Mobile SmartCA</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="font-bold text-sky-700">8. Gửi Bank</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Tiếp nhận hồ sơ</div>
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800">
                <div className="font-bold">9. Tracking</div>
                <div className="text-[10px] text-emerald-600 mt-0.5">Đồng hành RM</div>
              </div>
            </div>

            {/* Flow Banner Box */}
            <div
              onClick={() => setLightboxImage('/assets/lending-flow.webp')}
              className="p-6 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 text-white text-center cursor-pointer hover:ring-2 hover:ring-sky-400 transition-all space-y-2"
            >
              <div className="inline-flex p-3 rounded-full bg-slate-800/80 border border-slate-700 text-sky-400">
                <Workflow className="w-6 h-6" />
              </div>
              <div className="text-sm font-bold">NHẤP ĐỂ XEM SƠ ĐỒ USER FLOW PHÂN GIẢI CAO (INTERACTIVE LIGHTBOX)</div>
              <p className="text-xs text-slate-400 max-w-xl mx-auto">
                Hiển thị toàn bộ các điểm rẽ nhánh logic nghiệp vụ, các bước kiểm tra hợp lệ tự động và điểm kích hoạt kết nối với Relationship Manager.
              </p>
            </div>
          </div>

          {/* Video Prototype Studio Display Frame */}
          <div className="rounded-2xl p-4 sm:p-6 bg-slate-950 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between text-slate-300 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-sky-400" />
                <span className="font-bold text-xs text-white">NGUYÊN MẪU TƯƠNG TÁC (INTERACTIVE PROTOTYPE DEMO)</span>
              </div>
              <span className="text-xs text-slate-400 font-mono">Kịch bản: Hạn mức 85 Tỷ VNĐ</span>
            </div>

            <div className="relative rounded-xl overflow-hidden bg-slate-900 aspect-video flex items-center justify-center border border-slate-800">
              <div className="text-center space-y-3 p-6">
                <div className="w-14 h-14 rounded-full bg-sky-600/20 border border-sky-500/40 text-sky-400 flex items-center justify-center mx-auto animate-pulse">
                  <Play className="w-6 h-6 ml-0.5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Video Prototype: Trọn vẹn hành trình từ Web đến Mobile</div>
                  <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                    Mô phỏng luồng kế toán tải BCTC lên Web Portal, tự động validate file, chuyển quyền ký số tức thì về điện thoại của CEO.
                  </p>
                </div>
                <div className="flex justify-center gap-2 pt-2">
                  <span className="text-[11px] px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono">Thời lượng: 02:45</span>
                  <span className="text-[11px] px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono">Figma Prototype 60fps</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
         * SECTION 08 — GIẢI PHÁP SẢN PHẨM (PRODUCT SOLUTION SHOWCASE)
         * ========================================================================= */}
        <section id="sec-08" className="space-y-6 scroll-mt-20">
          <div className="space-y-2">
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
              08 / GIẢI PHÁP SẢN PHẨM CHI TIẾT
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              5 Đột phá giao diện giải quyết triệt để 5 điểm nghẽn
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl">
              Mỗi giải pháp được thiết kế với sự thấu hiểu sâu sắc tâm lý người dùng doanh nghiệp và sự phối hợp đa mắt xích.
            </p>
          </div>

          <div className="space-y-5">
            {/* Solution 01: Readiness Check */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <div className="text-xs font-bold text-sky-700 uppercase">GIẢI PHÁP 01</div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">Readiness Check: Tự kiểm tra điều kiện trước khi bắt đầu</h3>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                  Giải quyết Drop-off 62%
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                <div className="lg:col-span-6 space-y-2 text-xs text-slate-600 leading-relaxed">
                  <p>
                    Thay vì buộc khách hàng đối mặt ngay với 15 biểu mẫu trống, chúng tôi tạo ra bài kiểm tra 3 bước nhanh:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-slate-700 font-medium">
                    <li>Doanh thu hàng năm và thời gian hoạt động thực tế.</li>
                    <li>Mục đích cấp vốn: Mua sắm máy móc hay mở rộng dự án.</li>
                    <li>Tài sản bảo đảm hiện có (Bất động sản, máy móc hình thành từ vốn vay).</li>
                  </ul>
                  <p>
                    Hệ thống tính toán sơ bộ mức trần hạn mức khả dụng và danh sách giấy tờ chính xác cần chuẩn bị, giúp khách hàng tự tin bước vào quy trình.
                  </p>
                </div>

                <div className="lg:col-span-6 p-4 rounded-xl bg-slate-900 text-white space-y-3">
                  <div className="text-xs font-bold text-sky-400">Mô phỏng Widget: Bộ tính toán hạn mức khả dụng</div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between p-2 rounded bg-slate-800/80 border border-slate-700">
                      <span className="text-slate-300">Thời gian hoạt động:</span>
                      <span className="font-bold text-white">Trên 3 năm (Hợp lệ ✓)</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-slate-800/80 border border-slate-700">
                      <span className="text-slate-300">Ước tính hạn mức trần:</span>
                      <span className="font-bold text-emerald-400 font-mono">100 Tỷ VNĐ</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-slate-800/80 border border-slate-700">
                      <span className="text-slate-300">Tài liệu cần chuẩn bị:</span>
                      <span className="font-bold text-sky-300">4 Nhóm tài liệu cốt lõi</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Solution 02: Dynamic Checklist */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <div className="text-xs font-bold text-indigo-700 uppercase">GIẢI PHÁP 02</div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">Dynamic Checklist: Danh mục tài liệu thông minh theo ngành nghề</h3>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Giảm 3-5 lần bổ sung hồ sơ
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                <div className="lg:col-span-6 space-y-2 text-xs text-slate-600 leading-relaxed">
                  <p>
                    Checklist co giãn thông minh: Nếu khách hàng chọn "Mua sắm máy móc thiết bị", danh mục chỉ hiển thị hợp đồng kinh tế và báo giá nhà cung cấp.
                  </p>
                  <p>
                    Mỗi ô upload có file mẫu chuẩn tải về, kiểm tra định dạng tức thời (Client-side validation) và thanh tiến độ hoàn tất % trực quan.
                  </p>
                </div>

                <div className="lg:col-span-6 p-4 rounded-xl bg-slate-900 text-white space-y-2.5 text-xs">
                  <div className="flex justify-between text-xs font-bold text-slate-200">
                    <span>Hồ sơ tài chính sản xuất (Hoàn tất 3/4)</span>
                    <span className="text-emerald-400">75%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-3/4" />
                  </div>
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between p-2 rounded bg-slate-800/80 text-[11px]">
                      <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> Báo cáo tài chính kiểm toán 2024</span>
                      <span className="text-slate-400 font-mono">Đã duyệt</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-slate-800/80 text-[11px]">
                      <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> Tờ khai thuế GTGT 4 quý gần nhất</span>
                      <span className="text-slate-400 font-mono">Đã duyệt</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Solution 03: Decision Summary for Approver */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <div className="text-xs font-bold text-emerald-700 uppercase">GIẢI PHÁP 03</div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">Decision Summary: Luồng phê duyệt 1-chạm cho CEO trên Mobile</h3>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Giảm thời gian duyệt 5 ngày xuống dưới 4h
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                <div className="lg:col-span-7 space-y-2 text-xs text-slate-600 leading-relaxed">
                  <p>
                    Lãnh đạo không mở từng file văn bản để đọc. Toàn bộ hồ sơ phức tạp được cô đọng thành một trang Decision Summary trên BIZ MBBank App.
                  </p>
                  <p>
                    Hiển thị 3 chỉ số cốt lõi: Số vốn đề nghị, Nguồn trả nợ dự kiến, và Xác nhận thẩm định nội bộ từ Kế toán trưởng. Tích hợp trực tiếp chữ ký số Smart CA để ký mọi lúc mọi nơi.
                  </p>
                </div>

                <div className="lg:col-span-5 p-4 rounded-xl bg-slate-950 border border-slate-800 text-white space-y-2 text-xs">
                  <div className="text-[11px] font-bold text-emerald-400">BIZ MB Mobile • CEO Decision Screen</div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1 text-[11px]">
                    <div className="flex justify-between"><span className="text-slate-400">Hạn mức đề xuất:</span> <strong className="text-white font-mono">85.000.000.000 VNĐ</strong></div>
                    <div className="flex justify-between"><span className="text-slate-400">Thời hạn vay:</span> <span>60 Tháng</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Kế toán trưởng:</span> <span className="text-emerald-400 font-semibold">Đã ký xác nhận ✓</span></div>
                  </div>
                  <button className="w-full py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs tracking-wide">
                    Xác nhận ký số Smart CA
                  </button>
                </div>
              </div>
            </div>

            {/* Solution 04: Live Tracking Timeline */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <div className="text-xs font-bold text-amber-700 uppercase">GIẢI PHÁP 04</div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">Timeline minh bạch: Theo dõi tiến độ đa chặng thời gian thực</h3>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                  Triệt tiêu tâm lý lo âu
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                <div className="lg:col-span-6 space-y-2 text-xs text-slate-600 leading-relaxed">
                  <p>
                    Thay vì để khách hàng rơi vào khoảng lặng sau khi gửi hồ sơ, hệ thống hiển thị Timeline rõ ràng:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-slate-700 font-medium">
                    <li>Hồ sơ đã tiếp nhận tại Chi nhánh Hoàn Kiếm.</li>
                    <li>Đang thẩm định tài sản bảo đảm (Dự kiến xong trong 48h).</li>
                    <li>Thông tin trực tiếp chuyên viên thụ lý hồ sơ (Tên, SĐT, Email).</li>
                  </ul>
                </div>

                <div className="lg:col-span-6 p-4 rounded-xl bg-slate-900 text-white space-y-2.5 text-xs">
                  <div className="text-xs font-bold text-sky-400">Tiến trình hồ sơ #MB-85920</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                      <span>✓</span> <span>1. Tiếp nhận hồ sơ thành công (10:30 Hôm qua)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sky-300 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                      <span>2. Thẩm định phương án vốn (Dự kiến xong 16:00 Hôm nay)</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                      <span>○</span> <span>3. Phê duyệt hạn mức tín dụng</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Solution 05: Contextual RM Handoff */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <div className="text-xs font-bold text-purple-700 uppercase">GIẢI PHÁP 05</div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">Contextual RM Handoff: Bàn giao kênh số sang chuyên viên có ngữ cảnh</h3>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                  Hybrid Banking Experience
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                <div className="lg:col-span-6 space-y-2 text-xs text-slate-600 leading-relaxed">
                  <p>
                    Bất kỳ lúc nào người dùng gặp vướng mắc ở một mục tài liệu, họ có thể nhấn nút "Yêu cầu RM giải đáp mục này".
                  </p>
                  <p>
                    Hệ thống tự động chụp ngữ cảnh bản nháp và gửi thông báo đến máy tính của RM. Khi RM gọi điện thoại lại, họ biết chính xác khách hàng đang thắc mắc gì mà không bắt khách hàng giải thích lại từ đầu.
                  </p>
                </div>

                <div className="lg:col-span-6 p-4 rounded-xl bg-slate-900 text-white space-y-2.5 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-bold text-sky-400">Thẻ hỗ trợ chuyên viên RM</span>
                    <span className="text-emerald-400 text-[10px] font-semibold">Đang online</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-sky-300">
                      RM
                    </div>
                    <div>
                      <div className="font-bold text-white">Nguyễn Tuấn Anh</div>
                      <div className="text-slate-400 text-[11px]">Chuyên viên Khách hàng Doanh nghiệp • CN Hoàn Kiếm</div>
                    </div>
                  </div>
                  <div className="p-2 rounded bg-slate-800/80 text-[11px] text-slate-300">
                    Ngữ cảnh chia sẻ: <em>Thắc mắc hồ sơ máy móc nhập khẩu hợp đồng số 104/2025</em>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
         * SECTION 09 — USABILITY TESTING (BEFORE / AFTER COMPARISON)
         * ========================================================================= */}
        <section id="sec-09" className="space-y-6 scroll-mt-20">
          <div className="space-y-2">
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
              09 / USABILITY TESTING & CẢI TIẾN
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Kiểm chứng trên người dùng thật qua 4 vòng lặp
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl">
              Chúng tôi tiến hành 4 vòng thử nghiệm khả năng sử dụng (Usability Testing) với 12 kế toán và lãnh đạo doanh nghiệp để phát hiện các lỗ hổng trải nghiệm và liên tục tinh chỉnh.
            </p>
          </div>

          {/* Interactive Before vs After Control */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-sky-600" />
                <span>BỘ SO SÁNH TRỰC DIỆN: TRƯỚC (BEFORE) VS SAU (AFTER)</span>
              </div>

              <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-100">
                <button
                  onClick={() => setActiveTestTab('after')}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                    activeTestTab === 'after'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  ★ AFTER (CẢI TIẾN MỚI)
                </button>
                <button
                  onClick={() => setActiveTestTab('before')}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                    activeTestTab === 'before'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  BEFORE (TRƯỚC ĐÂY)
                </button>
              </div>
            </div>

            {/* 4 Iteration Selector Tabs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {[
                { title: 'Vòng 1: Đơn giản hóa biểu mẫu BCTC' },
                { title: 'Vòng 2: Cảnh báo file lỗi tức thì' },
                { title: 'Vòng 3: Tách luồng duyệt di động' },
                { title: 'Vòng 4: Widget kết nối chuyên viên RM' }
              ].map((it, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIteration(idx)}
                  className={`p-2.5 rounded-xl text-left text-xs font-semibold transition-all cursor-pointer border ${
                    activeIteration === idx
                      ? 'bg-sky-50 border-sky-300 text-sky-900 ring-1 ring-sky-300'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="text-[10px] text-slate-400 uppercase">Iteration 0{idx + 1}</div>
                  <div className="truncate mt-0.5">{it.title}</div>
                </button>
              ))}
            </div>

            {/* Comparison Display Box */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-900 text-white space-y-3">
              {activeTestTab === 'after' ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-400">★ THIẾT KẾ CẢI TIẾN (AFTER SOLUTION)</span>
                    <span className="text-slate-400 text-[11px]">Đã qua kiểm thử thực tế 12 doanh nghiệp</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Hệ thống tự động phân loại hồ sơ, hiển thị trạng thái hoàn thành theo %, có nút gọi RM ngay tại điểm vướng mắc và màn hình Decision Summary 1-chạm cho CEO trên Mobile.
                  </p>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-emerald-300">
                    ✓ Kết quả kiểm thử: Tỷ lệ hoàn thành tác vụ tăng lên 88%, thời gian nộp hồ sơ giảm từ 5 ngày xuống dưới 4 giờ.
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-rose-400">BEFORE (GIAO DIỆN CŨ TRƯỚC ĐÂY)</span>
                    <span className="text-slate-400 text-[11px]">Giai đoạn khởi điểm dự án</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Một trang form dài vô tận gồm 15 ô tải file giống nhau, không có mẫu BCTC chuẩn đính kèm, không báo lỗi ngay khi upload file quá dung lượng và không hỗ trợ duyệt trên di động.
                  </p>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-rose-300">
                    ✕ Kết quả thực tế cũ: Drop-off 62%, 70% khách hàng phải gọi điện ra quầy chi nhánh nhờ RM làm thủ công.
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* =========================================================================
         * SECTION 10 — TÁC ĐỘNG, BÀI HỌC & LỘ TRÌNH (IMPACT & REFLECTION)
         * ========================================================================= */}
        <section id="sec-10" className="space-y-6 scroll-mt-20">
          <div className="space-y-2">
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
              10 / TÁC ĐỘNG & BÀI HỌC KINH NGHIỆM
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Thiết kế tốt không chỉ đơn giản hóa — nó trao quyền kiểm soát
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl">
              Tổng kết hiệu quả đo lường trung thực, tác động đa chiều và những bài học xương máu đúc kết được trong quá trình thiết kế sản phẩm tài chính doanh nghiệp quy mô lớn.
            </p>
          </div>

          {/* 4 Measurable Scorecards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono">+[XX]%</div>
              <div className="text-xs font-bold text-slate-900">Tỷ lệ hoàn thành hồ sơ</div>
              <div className="text-[11px] text-slate-500">Nhờ Readiness Check & Dynamic Checklist</div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono">−[XX]%</div>
              <div className="text-xs font-bold text-slate-900">Tần suất bổ sung hồ sơ</div>
              <div className="text-[11px] text-slate-500">Giảm từ 3-5 lần xuống dưới 1 lần</div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono">−[XX]%</div>
              <div className="text-xs font-bold text-slate-900">Thời gian tạo đơn & duyệt</div>
              <div className="text-[11px] text-slate-500">Rút ngắn từ 5 ngày còn dưới 4 giờ</div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono">−[XX]%</div>
              <div className="text-xs font-bold text-slate-900">Can thiệp RM quá sớm</div>
              <div className="text-[11px] text-slate-500">Giảm tải vận hành chi nhánh đáng kể</div>
            </div>
          </div>

          {/* What went well vs What could be better */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>ĐIỀU TÔI ĐÃ LÀM TỐT (WHAT I DID WELL)</span>
              </div>
              <div className="space-y-2 text-xs text-slate-700 leading-relaxed">
                <div>• <strong>Chuyển đổi bài toán:</strong> Chuyển yêu cầu nghiệp vụ phức tạp của ngân hàng thành hành trình có định hướng rõ ràng cho khách hàng.</div>
                <div>• <strong>Kết hợp phương pháp:</strong> Dùng định lượng để tìm chính xác điểm gãy và dùng định tính để giải mã tâm lý người dùng.</div>
                <div>• <strong>Giữ phạm vi MVP thực tế:</strong> Không vẽ giải pháp viển vông, tập trung giải quyết triệt để 3 điểm nghẽn lớn nhất.</div>
                <div>• <strong>Cầu nối Digital & RM:</strong> Biến RM thành đồng minh của kênh số thay vì đặt hai kênh ở thế cạnh tranh.</div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-rose-50/40 border border-rose-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-800 uppercase tracking-wider">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>ĐIỀU CÓ THỂ LÀM TỐT HƠN (WHAT COULD BE BETTER)</span>
              </div>
              <div className="space-y-2 text-xs text-slate-700 leading-relaxed">
                <div>• <strong>Measurement Framework:</strong> Khung đo lường chỉ số sản phẩm chưa được thiết lập đủ sớm ngay từ giai đoạn Discovery.</div>
                <div>• <strong>Bị ảnh hưởng quy trình nội bộ:</strong> Ở những bản wireframe đầu tiên, tôi vô tình bê nguyên các bước phê duyệt nội bộ của ngân hàng vào UI người dùng.</div>
                <div>• <strong>Phỏng vấn vai trò:</strong> Chưa mời đủ đại diện pháp chế (Legal & Compliance) vào các phiên thảo luận thiết kế ban đầu.</div>
              </div>
            </div>
          </div>

          {/* 4 Lessons Learned Grid */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>4 BÀI HỌC KINH NGHIỆM XƯƠNG MÁU (KEY LESSONS)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
              <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs space-y-1.5">
                <div className="font-bold text-slate-900">1. Không số hóa quy trình xấu</div>
                <p className="text-slate-600 leading-relaxed">
                  Số hóa một quy trình thủ công phức tạp chỉ tạo ra một sản phẩm số phức tạp hơn. Nhiệm vụ của Product Designer là tái cấu trúc lại hành trình trước khi vẽ UI.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs space-y-1.5">
                <div className="font-bold text-slate-900">2. RM là đồng minh, không phải đối thủ</div>
                <p className="text-slate-600 leading-relaxed">
                  Trong ngân hàng doanh nghiệp, công nghệ không thay thế con người. Thiết kế tốt nhất là trao cho RM thông tin và công cụ tốt nhất để phục vụ khách hàng.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs space-y-1.5">
                <div className="font-bold text-slate-900">3. Thiết kế cho sự chuẩn bị</div>
                <p className="text-slate-600 leading-relaxed">
                  Với sản phẩm tài chính phức tạp, chuẩn bị tâm lý và tài liệu cho người dùng trước khi bắt đầu mang lại giá trị cao hơn việc tối ưu hóa nút bấm trong form.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs space-y-1.5">
                <div className="font-bold text-slate-900">4. Đo lường liên tục bằng dữ liệu thật</div>
                <p className="text-slate-600 leading-relaxed">
                  Mọi giả định thiết kế đều là phỏng đoán cho đến khi được kiểm chứng bằng log sự kiện, tỷ lệ drop-off và phản hồi trực tiếp từ người dùng cuối.
                </p>
              </div>
            </div>
          </div>

          {/* 3-Phase Roadmap Timeline */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              LỘ TRÌNH PHÁT TRIỂN TIẾP THEO (PRODUCT ROADMAP)
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-sky-700">GIAI ĐOẠN 01 (0 – 3 THÁNG)</div>
                <div className="text-slate-700 font-semibold">Tối ưu MVP & Đánh giá phễu</div>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Đo lường các chỉ số drop-off thực tế, A/B Testing bộ câu hỏi Readiness Check và hoàn thiện Dynamic Checklist.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-indigo-700">GIAI ĐOẠN 02 (3 – 9 THÁNG)</div>
                <div className="text-slate-700 font-semibold">Tự động hóa OCR & AI Báo cáo</div>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Tích hợp công nghệ OCR bóc tách tự động dữ liệu BCTC và tự động đối chiếu số dư tiền gửi tại MBBank.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-purple-700">GIAI ĐOẠN 03 (9 – 18 THÁNG)</div>
                <div className="text-slate-700 font-semibold">Cấp hạn mức phê duyệt trước (Pre-approved)</div>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Ứng dụng mô hình chấm điểm tín dụng hành vi dòng tiền để chủ động đề xuất hạn mức sẵn cho khách hàng uy tín.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Back Button */}
          <div className="pt-4 flex justify-center">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0A1D37] text-white hover:bg-[#132A4D] font-sans text-xs sm:text-sm font-semibold shadow-md transition-all cursor-pointer active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>QUAY LẠI DANH SÁCH DỰ ÁN CỦA TÔI</span>
            </button>
          </div>
        </section>
      </div>

      {/* =========================================================================
       * LIGHTBOX MODAL: FULL RESOLUTION USER FLOW / JOURNEY DIAGRAM
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
            <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-white text-xs font-bold">
              <div className="flex items-center gap-2">
                <Workflow className="w-4 h-4 text-sky-400" />
                <span>SƠ ĐỒ LUỒNG TOÀN TRÌNH: BIZ MBBANK ENTERPRISE LENDING</span>
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
                <div className="text-sm font-bold text-sky-400">CHI TIẾT KIẾN TRÚC LUỒNG 9 BƯỚC HOÀN CHỈNH</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left text-xs text-slate-300">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <strong className="text-sky-300">1. Kế toán viên (Maker):</strong>
                    <p className="text-slate-400 text-[11px] leading-relaxed">Soạn thảo hồ sơ, kiểm tra điều kiện sơ bộ, tải báo cáo tài chính và theo dõi tiến độ trên Web Portal.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <strong className="text-emerald-300">2. Lãnh đạo (CFO/CEO):</strong>
                    <p className="text-slate-400 text-[11px] leading-relaxed">Xem Decision Summary, đối soát 3 chỉ số trọng yếu và ký số bảo mật Smart CA trên Mobile App.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <strong className="text-purple-300">3. Chuyên viên RM:</strong>
                    <p className="text-slate-400 text-[11px] leading-relaxed">Tiếp nhận bản nháp có ngữ cảnh qua CRM nội bộ để hỗ trợ khách hàng tức thì mà không cần làm lại từ đầu.</p>
                  </div>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => setLightboxImage(null)}
                    className="px-5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
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

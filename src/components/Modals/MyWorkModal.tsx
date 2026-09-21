import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  FileText,
  Sparkles,
  TrendingUp,
  Building,
  Layers,
  Scan,
  Check,
  Award,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Users,
  Lightbulb,
  Workflow,
  Compass,
  ArrowRight,
  ShieldCheck,
  Target
} from 'lucide-react';
import { ProjectItem } from '../../types';
import { projectsData } from '../../data/portfolioData';
import {
  GameModal,
  GameModalBody,
  VoxelButton
} from './common/GameModalComponents';
import { BizMBBankCaseStudy } from './CaseStudies/BizMBBankCaseStudy';

interface MyWorkModalProps {
  onClose: () => void;
  onProjectChange: (title: string) => void;
}

export const MyWorkModal: React.FC<MyWorkModalProps> = ({
  onClose,
  onProjectChange
}) => {
  const [activeProjectId, setActiveProjectId] = useState<string>(projectsData[0].id);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ProjectItem | null>(null);

  const caseStudyBodyRef = useRef<HTMLDivElement>(null);
  const listBodyRef = useRef<HTMLDivElement>(null);
  const chipsContainerRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Kéo chuột để cuộn mượt cho máy tính (Mouse drag-to-scroll)
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const hasMovedRef = useRef(false);

  const checkScrollability = () => {
    const el = chipsContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 6);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 6);
  };

  useEffect(() => {
    const el = chipsContainerRef.current;
    if (!el) return;

    checkScrollability();

    // Hỗ trợ lăn chuột dọc -> cuộn ngang mượt mà (Mouse Wheel Redirect)
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
      checkScrollability();
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

  const scrollChips = (direction: 'left' | 'right') => {
    if (chipsContainerRef.current) {
      chipsContainerRef.current.scrollBy({
        left: direction === 'left' ? -240 : 240,
        behavior: 'smooth'
      });
      setTimeout(checkScrollability, 300);
    }
  };

  const handleChipsMouseDown = (e: React.MouseEvent) => {
    const el = chipsContainerRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.pageX - el.offsetLeft;
    startScrollLeftRef.current = el.scrollLeft;
  };

  const handleChipsMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !chipsContainerRef.current) return;
    const el = chipsContainerRef.current;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.4;
    if (Math.abs(walk) > 4) {
      hasMovedRef.current = true;
    }
    el.scrollLeft = startScrollLeftRef.current - walk;
    checkScrollability();
  };

  const handleChipsMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Khi mở Case study, luôn cuộn lên đầu container
  const handleOpenCaseStudy = (project: ProjectItem) => {
    setSelectedCaseStudy(project);
    requestAnimationFrame(() => {
      if (caseStudyBodyRef.current) {
        caseStudyBodyRef.current.scrollTop = 0;
      }
      const el = document.getElementById('casestudy-body-container');
      if (el) el.scrollTop = 0;
    });
  };

  // Khi quay lại danh sách, cuộn mượt về đúng dự án đó
  const handleBackToList = () => {
    const targetId = selectedCaseStudy?.id;
    setSelectedCaseStudy(null);
    if (targetId) {
      setTimeout(() => {
        const element = document.getElementById(`work-${targetId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    }
  };

  // Đảm bảo cuộn lên đầu mỗi khi selectedCaseStudy thay đổi
  useEffect(() => {
    if (selectedCaseStudy) {
      if (caseStudyBodyRef.current) {
        caseStudyBodyRef.current.scrollTop = 0;
      }
      const timer = setTimeout(() => {
        if (caseStudyBodyRef.current) {
          caseStudyBodyRef.current.scrollTop = 0;
        }
        const el = document.getElementById('casestudy-body-container');
        if (el) el.scrollTop = 0;
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [selectedCaseStudy]);

  const handleScrollToProject = (project: ProjectItem) => {
    setActiveProjectId(project.id);
    onProjectChange(project.title);
    const element = document.getElementById(`work-${project.id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    const chipElement = document.getElementById(`chip-${project.id}`);
    if (chipElement) {
      chipElement.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
    }
  };

  // Render UI Mockup sinh động riêng biệt cho từng dự án
  const renderProjectMockup = (p: ProjectItem, index: number, isLarge = false) => {
    if (index === 0) {
      // 01. BIZ MBBank Cấp hạn mức TDH - Laptop + Smartphone Mockup
      return (
        <div className={`relative z-10 w-full ${isLarge ? 'max-w-2xl' : 'max-w-lg'} flex items-center justify-center py-2 sm:py-4`}>
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full pointer-events-none" />

          {/* Laptop Frame */}
          <div className="relative w-[92%] sm:w-[90%] bg-[#0B1322] rounded-t-[10px] border border-slate-700/80 shadow-[0_20px_40px_rgba(0,0,0,0.8)] overflow-hidden">
            {/* Top Browser Bar */}
            <div className="bg-[#0D1A30] px-3 py-1.5 flex items-center justify-between border-b border-blue-900/50">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
              </div>
              <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-[4px] bg-[#070F1E] border border-blue-900/40 text-[9px] text-slate-300 font-mono">
                <span className="text-rose-500 font-bold">★</span>
                <span>bizmbbank.com.vn</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[8px] text-emerald-400 font-mono hidden sm:inline">2.0 Live</span>
              </div>
            </div>

            {/* Laptop Screen Content - Realistic BIZ MBBank UI */}
            <div className="p-3 sm:p-3.5 bg-[#070D18] text-white space-y-2.5 text-[10px]">
              {/* Header Navbar */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 font-bold">
                    <span className="text-rose-500 font-black text-sm">★</span>
                    <span className="text-sky-400 font-extrabold tracking-tight">MB</span>
                    <span className="text-[10px] text-slate-300 font-medium ml-1">BIZ MBBank 2.0</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-slate-400 hidden sm:inline">Xin chào,</span>
                  <span className="text-[9px] font-bold text-slate-200">Enterprise Corp</span>
                  <div className="w-4 h-4 rounded-full bg-blue-600 text-[8px] flex items-center justify-center font-bold">
                    E
                  </div>
                </div>
              </div>

              {/* Main Dashboard Grid */}
              <div className="grid grid-cols-12 gap-2">
                {/* Left Mini Sidebar */}
                <div className="col-span-3 space-y-1 pr-1 border-r border-slate-800/80 hidden sm:block">
                  <div className="px-1.5 py-1 rounded bg-blue-600/30 text-sky-300 text-[8px] font-semibold flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-sky-400" />
                    <span>Tổng quan</span>
                  </div>
                  <div className="px-1.5 py-0.5 text-slate-400 text-[8px] hover:text-slate-200">Tài khoản</div>
                  <div className="px-1.5 py-0.5 text-slate-400 text-[8px] hover:text-slate-200">Tiền gửi</div>
                  <div className="px-1.5 py-0.5 text-emerald-400 text-[8px] font-medium flex items-center justify-between">
                    <span>Cấp TDH</span>
                    <span className="text-[7px] px-1 rounded bg-emerald-500/20 text-emerald-300">Hot</span>
                  </div>
                  <div className="px-1.5 py-0.5 text-slate-400 text-[8px] hover:text-slate-200">Dòng tiền</div>
                </div>

                {/* Center / Right Content */}
                <div className="col-span-12 sm:col-span-9 space-y-2">
                  {/* Account Overview & Credit Limit */}
                  <div className="grid grid-cols-2 gap-2">
                    {/* Account Balance Card with Donut visual */}
                    <div className="p-2 rounded-[6px] bg-[#0E1729] border border-blue-900/40 relative overflow-hidden">
                      <div className="text-[8px] text-slate-400">Tổng tài khoản</div>
                      <div className="text-xs sm:text-sm font-bold font-mono text-white mt-0.5">
                        2,600,000,000 <span className="text-[8px] text-slate-400 font-normal">VND</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <div className="w-3 h-3 rounded-full border-2 border-sky-400 border-t-amber-400 shrink-0" />
                        <span className="text-[7px] text-emerald-400 font-medium">Khả dụng 100%</span>
                      </div>
                    </div>

                    {/* TDH Overdraft Limit Card */}
                    <div className="p-2 rounded-[6px] bg-[#0D211A] border border-emerald-800/40 relative overflow-hidden">
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] text-emerald-300 font-medium">Hạn mức TDH (CIB)</span>
                        <span className="text-[7px] px-1 py-0.2 rounded bg-emerald-500/30 text-emerald-200 font-mono">
                          Auto-Approve
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm font-bold font-mono text-emerald-400 mt-0.5">
                        10,000,000,000 <span className="text-[8px] text-emerald-300/70 font-normal">VND</span>
                      </div>
                      <div className="text-[7px] text-slate-300 mt-1 flex items-center gap-1">
                        <span className="text-emerald-400">⚡</span>
                        <span>Phê duyệt & giải ngân: &lt; 4 Giờ</span>
                      </div>
                    </div>
                  </div>

                  {/* Cash Flow Visual & Fast Action */}
                  <div className="p-2 rounded-[6px] bg-[#0A1220] border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-end gap-1 h-5 px-1 bg-slate-900 rounded">
                        <div className="w-1.5 h-2 bg-sky-500 rounded-t-sm" />
                        <div className="w-1.5 h-3.5 bg-blue-500 rounded-t-sm" />
                        <div className="w-1.5 h-4 bg-emerald-500 rounded-t-sm" />
                        <div className="w-1.5 h-3 bg-sky-400 rounded-t-sm" />
                      </div>
                      <div>
                        <div className="text-[8px] font-bold text-slate-200">Quản trị dòng tiền đa tài khoản</div>
                        <div className="text-[7px] text-slate-400">Đối soát real-time và tài trợ vốn CIB</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-[3px] bg-sky-500/20 text-sky-300 text-[8px] font-bold border border-sky-500/30">
                      LIVE STATS
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Laptop Base / Hinge */}
            <div className="h-2.5 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 border-t border-slate-600 flex justify-center items-center">
              <div className="w-12 h-1 bg-slate-800 rounded-full" />
            </div>
          </div>

          {/* Floating Smartphone Mockup (Overlapping on bottom left) */}
          <div className="absolute -bottom-1 -left-2 sm:-left-3 w-28 sm:w-34 bg-[#0A101D] rounded-[12px] border-2 border-slate-600/90 shadow-[0_16px_36px_rgba(0,0,0,0.9)] overflow-hidden z-20">
            {/* Phone Speaker Notch */}
            <div className="h-2.5 bg-black flex justify-center items-center">
              <div className="w-6 h-1 bg-slate-700 rounded-full" />
            </div>

            {/* Phone Screen UI */}
            <div className="p-2 bg-[#080E1A] text-white text-[8px] space-y-1.5">
              <div className="flex justify-between items-center pb-1 border-b border-slate-800">
                <div className="flex items-center gap-1 font-bold">
                  <span className="text-rose-500 text-[9px]">★</span>
                  <span className="text-sky-400">MB</span>
                </div>
                <span className="text-[7px] text-slate-400 font-mono">09:41</span>
              </div>

              <div className="p-1 rounded bg-[#0E182A] border border-blue-900/30">
                <div className="text-[7px] text-slate-400">Hạn mức thấu chi</div>
                <div className="text-[9px] font-bold text-emerald-400 font-mono">10 Tỷ VND</div>
              </div>

              <div className="grid grid-cols-2 gap-1 pt-0.5">
                <div className="p-1 rounded bg-white/5 text-center">
                  <div className="text-[6px] text-slate-400">Giải ngân</div>
                  <div className="text-[7px] font-bold text-sky-300">Tức thì</div>
                </div>
                <div className="p-1 rounded bg-white/5 text-center">
                  <div className="text-[6px] text-slate-400">Chữ ký số</div>
                  <div className="text-[7px] font-bold text-emerald-300">OTP Soft</div>
                </div>
              </div>

              <div className="py-1 px-1.5 rounded-[4px] bg-[#00E676] text-slate-950 font-bold text-center text-[7px] tracking-wide">
                XÁC NHẬN CẤP VỐN
              </div>
            </div>
          </div>
        </div>
      );
    } else if (index === 1) {
      // 02. BIZ MBBank 2.0 Enterprise Ecosystem
      return (
        <div className={`relative z-10 w-full ${isLarge ? 'max-w-2xl' : 'max-w-md'} flex items-center justify-center py-2`}>
          {/* Laptop Enterprise Portal */}
          <div className="relative w-[90%] bg-[#0F172A] rounded-t-[6px] border-2 border-[#B91C1C]/60 shadow-[0_12px_24px_rgba(0,0,0,0.6)] overflow-hidden">
            <div className="bg-[#1C1012] px-3 py-1.5 flex items-center justify-between border-b border-rose-900/40">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-[1px] bg-rose-500" />
                <div className="w-2 h-2 rounded-[1px] bg-amber-500" />
                <div className="w-2 h-2 rounded-[1px] bg-emerald-500" />
              </div>
              <div className="text-[10px] font-pixel text-rose-200 truncate px-2">
                mbbank.com.vn • Enterprise Banking Platform
              </div>
              <span className="text-[9px] font-mono text-emerald-400">200K+ DOANH NGHIỆP</span>
            </div>

            <div className="p-3 bg-[#0A070B] text-white space-y-2 text-[10px]">
              <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                <div className="flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-rose-500" />
                  <span className="font-bold text-slate-100">QUẢN TRỊ DÒNG TIỀN ĐA TÀI KHOẢN</span>
                </div>
                <span className="px-1.5 py-0.5 rounded-[2px] bg-rose-500/20 text-rose-300 font-pixel text-[9px]">
                  Multi-Role Matrix
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 pt-0.5">
                <div className="p-1.5 rounded-[4px] bg-white/5 border border-white/10 text-center">
                  <div className="text-[8px] text-slate-400">Kế toán viên</div>
                  <div className="text-xs font-bold text-sky-400 mt-0.5">Lập lệnh</div>
                  <div className="text-[7px] text-emerald-400 mt-0.5">✓ 42 Lệnh chờ</div>
                </div>
                <div className="p-1.5 rounded-[4px] bg-white/5 border border-white/10 text-center">
                  <div className="text-[8px] text-slate-400">Kế toán trưởng</div>
                  <div className="text-xs font-bold text-amber-400 mt-0.5">Kiểm soát</div>
                  <div className="text-[7px] text-amber-300 mt-0.5">⚡ Đã đối soát</div>
                </div>
                <div className="p-1.5 rounded-[4px] bg-white/5 border border-white/10 text-center">
                  <div className="text-[8px] text-slate-400">Giám đốc (CEO)</div>
                  <div className="text-xs font-bold text-emerald-400 mt-0.5">Ký duyệt</div>
                  <div className="text-[7px] text-emerald-400 mt-0.5">1-Touch OTP</div>
                </div>
              </div>

              <div className="p-2 rounded-[4px] bg-gradient-to-r from-rose-950/40 to-slate-900 border border-rose-500/30 flex items-center justify-between">
                <div>
                  <div className="text-[8px] text-slate-300">Giao dịch quốc tế & Chuyển tiền lô</div>
                  <div className="text-[10px] font-bold text-white mt-0.5">NPS Tăng +32 Điểm</div>
                </div>
                <span className="px-2 py-0.5 rounded-[2px] bg-rose-600 text-[8px] font-bold text-white font-pixel">
                  REAL-TIME PUSH
                </span>
              </div>
            </div>
            <div className="h-2 bg-[#2D1B1E] border-t border-rose-900/50" />
          </div>
        </div>
      );
    } else if (index === 2) {
      // 03. KienlongBank eKYC & Digital Onboarding
      return (
        <div className={`relative z-10 w-full ${isLarge ? 'max-w-2xl' : 'max-w-md'} flex items-center justify-center py-2 gap-3`}>
          {/* Smartphone 1: Smart ID Scanning */}
          <div className="w-36 sm:w-42 bg-[#0F172A] rounded-[10px] border-2 border-orange-500/60 shadow-[0_12px_24px_rgba(0,0,0,0.7)] overflow-hidden">
            <div className="h-2.5 bg-black flex justify-center items-center">
              <div className="w-6 h-1 bg-slate-700 rounded-full" />
            </div>
            <div className="p-2.5 bg-[#0C0F17] text-white space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-bold text-orange-400">KienlongBank</span>
                <span className="text-[7px] px-1 py-0.5 rounded bg-emerald-500/20 text-emerald-300">AI Assist</span>
              </div>

              {/* ID Card Scanner Preview */}
              <div className="relative p-2 rounded-[4px] bg-orange-950/30 border border-orange-500/40 text-center space-y-1">
                <Scan className="w-5 h-5 text-orange-400 mx-auto animate-pulse" />
                <div className="text-[8px] font-bold text-slate-200">Quét CCCD thông minh</div>
                <div className="text-[7px] text-emerald-400">Tự động căn chỉnh & lấy nét</div>
              </div>

              <div className="py-1 px-1.5 rounded-[3px] bg-orange-500 text-slate-950 font-bold text-center text-[8px] font-pixel">
                TIẾP TỤC: XÁC THỰC
              </div>
            </div>
          </div>

          {/* Smartphone 2: Biometric Liveness Verification */}
          <div className="w-36 sm:w-42 bg-[#0F172A] rounded-[10px] border-2 border-emerald-500/60 shadow-[0_12px_24px_rgba(0,0,0,0.7)] overflow-hidden">
            <div className="h-2.5 bg-black flex justify-center items-center">
              <div className="w-6 h-1 bg-slate-700 rounded-full" />
            </div>
            <div className="p-2.5 bg-[#0A1612] text-white space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-bold text-emerald-400">Liveness Face</span>
                <span className="text-[7px] font-mono text-emerald-300">98% Match</span>
              </div>

              <div className="p-2 rounded-[4px] bg-emerald-950/40 border border-emerald-500/30 text-center">
                <div className="w-7 h-7 mx-auto rounded-full border-2 border-dashed border-emerald-400 flex items-center justify-center text-[10px]">
                  👤
                </div>
                <div className="text-[8px] font-bold text-white mt-1">Định danh thành công!</div>
                <div className="text-[7px] text-slate-300">Mở tài khoản: 7 Phút</div>
              </div>

              <div className="py-1 px-1.5 rounded-[3px] bg-emerald-500 text-slate-950 font-bold text-center text-[8px] font-pixel">
                CẤP SỐ TÀI KHOẢN
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      // 04. AgileTech Multi-Tenant Fintech Platform
      return (
        <div className={`relative z-10 w-full ${isLarge ? 'max-w-2xl' : 'max-w-md'} flex items-center justify-center py-2`}>
          <div className="relative w-[90%] bg-[#0F172A] rounded-t-[6px] border-2 border-rose-500/60 shadow-[0_12px_24px_rgba(0,0,0,0.6)] overflow-hidden">
            <div className="bg-[#1F101A] px-3 py-1.5 flex items-center justify-between border-b border-rose-900/40">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-[1px] bg-rose-500" />
                <div className="w-2 h-2 rounded-[1px] bg-amber-500" />
                <div className="w-2 h-2 rounded-[1px] bg-emerald-500" />
              </div>
              <div className="text-[10px] font-pixel text-rose-200 truncate px-2">
                AgileTech • Trading Terminal & Tokens
              </div>
              <span className="text-[9px] font-mono text-rose-300">WCAG AA</span>
            </div>

            <div className="p-3 bg-[#0B060F] text-white space-y-2 text-[10px]">
              <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                <div className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-rose-400" />
                  <span className="font-bold text-slate-100">DESIGN SYSTEM MULTI-TENANT</span>
                </div>
                <span className="px-1.5 py-0.5 rounded-[2px] bg-purple-500/20 text-purple-300 font-pixel text-[9px]">
                  12+ Partners
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-0.5">
                <div className="p-2 rounded-[4px] bg-white/5 border border-white/10">
                  <div className="text-[8px] text-slate-400">Trading Interface</div>
                  <div className="text-xs font-bold text-rose-400 mt-0.5 font-mono">Order Book 0.05s</div>
                  <div className="text-[7px] text-emerald-400 mt-0.5">Real-time WebSocket</div>
                </div>

                <div className="p-2 rounded-[4px] bg-white/5 border border-white/10">
                  <div className="text-[8px] text-slate-400">Tiết kiệm thời gian</div>
                  <div className="text-xs font-bold text-emerald-400 mt-0.5 font-mono">-45% Time-to-market</div>
                  <div className="text-[7px] text-slate-400 mt-0.5">Global Figma Tokens</div>
                </div>
              </div>

              <div className="p-1.5 rounded-[4px] bg-purple-950/40 border border-purple-500/30 flex items-center justify-between">
                <div className="text-[8px] text-slate-300">White-label Theme Engine: Đổi giao diện 1 file config</div>
                <span className="px-2 py-0.5 rounded-[2px] bg-rose-500 text-[8px] font-bold text-white font-pixel">
                  ACTIVE
                </span>
              </div>
            </div>
            <div className="h-2 bg-[#2D1225] border-t border-rose-900/50" />
          </div>
        </div>
      );
    }
  };

  /* =========================================================================
   * GIAO DIỆN CHI TIẾT CASE STUDY (KHI ẤN "XEM CASE STUDY CHI TIẾT")
   * ========================================================================= */
  if (selectedCaseStudy) {
    const projectIndex = projectsData.findIndex((p) => p.id === selectedCaseStudy.id);

    // Deep-dive 10-Chapter Case Study cho BIZ MBBank Vay Trung Dài Hạn Doanh Nghiệp
    if (selectedCaseStudy.id === 'proj-1') {
      return (
        <GameModal
          key={`casestudy-modal-${selectedCaseStudy.id}`}
          areaKey="work"
          onClose={onClose}
          maxWidthClass="max-w-[1140px]"
          titleOverride="CASE STUDY • BIZ MBBANK VAY TRUNG DÀI HẠN"
          onBack={handleBackToList}
          backLabel="QUAY LẠI"
        >
          <GameModalBody
            ref={caseStudyBodyRef}
            id="casestudy-body-container"
            key={`casestudy-body-${selectedCaseStudy.id}`}
            autoScrollToTop={true}
            className="space-y-6 sm:space-y-8"
          >
            <BizMBBankCaseStudy
              project={selectedCaseStudy}
              onBack={handleBackToList}
            />
          </GameModalBody>
        </GameModal>
      );
    }

    return (
      <GameModal
        key={`casestudy-modal-${selectedCaseStudy.id}`}
        areaKey="work"
        onClose={onClose}
        maxWidthClass="max-w-[1040px]"
        titleOverride={`CASE STUDY • ${selectedCaseStudy.owner}`}
        onBack={handleBackToList}
        backLabel="QUAY LẠI"
      >
        <GameModalBody
          ref={caseStudyBodyRef}
          id="casestudy-body-container"
          key={`casestudy-body-${selectedCaseStudy.id}`}
          autoScrollToTop={true}
          className="space-y-6 sm:space-y-8"
        >
          {/* Top Back Navigation Pill */}
          <div className="flex items-center justify-between gap-3 border-b-2 border-[#DFC9A2] pb-3">
            <button
              onClick={handleBackToList}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[6px] bg-[#FFF4D6] hover:bg-[#FFECC2] border-2 border-[#CBB892] text-[#7A3F1F] font-sans text-xs font-bold shadow-[0_2px_0_#A89571] active:translate-y-0.5 cursor-pointer transition-all"
            >
              <ArrowLeft className="w-4 h-4 text-[#7A3F1F]" />
              <span>QUAY LẠI DANH SÁCH DỰ ÁN</span>
            </button>

            <span className="text-xs font-sans text-[#7A3F1F] font-bold hidden sm:inline">
              PROJECT {projectIndex >= 0 ? `0${projectIndex + 1}` : ''} / 0{projectsData.length}
            </span>
          </div>

          {/* Hero Header Section */}
          <div className="space-y-3 bg-[#FFFDF7] p-5 sm:p-7 rounded-[10px] border-2 border-[#CBB892] shadow-[0_4px_0_#A89571]">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-2.5 py-1 rounded-[4px] bg-[#176B73] text-[#FFF4D6] font-sans text-xs font-bold">
                {selectedCaseStudy.category}
              </span>
              <span className="text-[#A89571]">•</span>
              <span className="text-xs font-sans text-[#7A3F1F] font-bold">
                {selectedCaseStudy.badge || '2018 – Hiện tại'}
              </span>
              <span className="text-[#A89571]">•</span>
              <span className="px-2.5 py-0.5 rounded-[4px] bg-[#E8F0FE] border border-[#B3D1FF] text-[#176B73] font-sans text-[11px] font-bold">
                {selectedCaseStudy.owner}
              </span>
            </div>

            <h1 className="font-sans text-2xl sm:text-3xl font-bold text-[#2D1B12] leading-tight">
              {selectedCaseStudy.title}
            </h1>

            {/* Quick Meta Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-[6px] bg-[#FFF8E7] border border-[#D4C39B]">
                <div className="text-[10px] font-sans text-[#7A3F1F] uppercase">Vai trò chính</div>
                <div className="text-sm font-bold text-[#2D1B12] mt-0.5">{selectedCaseStudy.role}</div>
              </div>
              <div className="p-3 rounded-[6px] bg-[#FFF8E7] border border-[#D4C39B]">
                <div className="text-[10px] font-sans text-[#7A3F1F] uppercase">Khách hàng / Chủ quản</div>
                <div className="text-sm font-bold text-[#2D1B12] mt-0.5 truncate">{selectedCaseStudy.owner}</div>
              </div>
              <div className="col-span-2 sm:col-span-1 p-3 rounded-[6px] bg-[#FFF8E7] border border-[#D4C39B]">
                <div className="text-[10px] font-sans text-[#7A3F1F] uppercase">Phân khúc sản phẩm</div>
                <div className="text-sm font-bold text-[#2D1B12] mt-0.5 truncate">{selectedCaseStudy.category}</div>
              </div>
            </div>

            <p className="text-sm text-[#4A3326] leading-relaxed pt-1">
              {selectedCaseStudy.summary}
            </p>
          </div>

          {/* Large Visual Screen Showcase */}
          <div className="rounded-[10px] overflow-hidden border-2 sm:border-3 border-[#CBB892] shadow-[0_6px_0_#A89571] relative bg-[#1E293B]">
            {selectedCaseStudy.imageUrl ? (
              <div className="relative w-full overflow-hidden">
                <img
                  src={selectedCaseStudy.imageUrl}
                  alt={selectedCaseStudy.title}
                  className="w-full h-auto max-h-[560px] object-cover object-center"
                />
              </div>
            ) : (
              <div className="p-4 sm:p-6 flex items-center justify-center">
                {renderProjectMockup(selectedCaseStudy, projectIndex >= 0 ? projectIndex : 0, true)}
              </div>
            )}
          </div>

          {/* Key Metrics Trio */}
          <div className="space-y-2">
            <div className="text-xs font-sans font-bold text-[#7A3F1F] uppercase">
              ★ Chỉ số thành tựu cốt lõi (Key Metrics)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {selectedCaseStudy.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-[8px] bg-[#FFFDF7] border-2 border-[#CBB892] shadow-[0_3px_0_#A89571] text-center"
                >
                  <div className="font-sans text-xl sm:text-2xl font-bold text-[#4F9D18]">
                    {m.value}
                  </div>
                  <div className="text-xs text-[#6B513C] mt-1 font-semibold">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 1. Bối cảnh dự án & Chân dung người dùng */}
          {(selectedCaseStudy.caseStudy.background || selectedCaseStudy.caseStudy.targetAudience) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {selectedCaseStudy.caseStudy.background && (
                <div className="p-5 sm:p-6 rounded-[8px] bg-[#FFFDF7] border-2 border-[#CBB892] shadow-[0_3px_0_#A89571] space-y-2.5">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-[#7A3F1F]" />
                    <h3 className="font-sans text-sm sm:text-base font-bold text-[#7A3F1F] uppercase">
                      Bối cảnh & Mục tiêu chiến lược
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#4A3326] leading-relaxed">
                    {selectedCaseStudy.caseStudy.background}
                  </p>
                </div>
              )}

              {selectedCaseStudy.caseStudy.targetAudience && (
                <div className="p-5 sm:p-6 rounded-[8px] bg-[#FFFDF7] border-2 border-[#CBB892] shadow-[0_3px_0_#A89571] space-y-2.5">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#7A3F1F]" />
                    <h3 className="font-sans text-sm sm:text-base font-bold text-[#7A3F1F] uppercase">
                      Chân dung người dùng mục tiêu
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#4A3326] leading-relaxed">
                    {selectedCaseStudy.caseStudy.targetAudience}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* 2. Case Study Core: Problem & Deep Pain Points */}
          <div className="p-5 sm:p-6 rounded-[8px] bg-[#FFFDF7] border-2 border-[#E0A899] shadow-[0_3px_0_#C48372] space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-base">⚔️</span>
              <h3 className="font-sans text-sm sm:text-base font-bold text-[#B91C1C] uppercase">
                Bài toán cốt lõi & Điểm đau thực tế (Problem & Pain Points)
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#4A3326] leading-relaxed">
              {selectedCaseStudy.caseStudy.problem}
            </p>

            {selectedCaseStudy.caseStudy.painPoints && selectedCaseStudy.caseStudy.painPoints.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                {selectedCaseStudy.caseStudy.painPoints.map((pain, pIdx) => (
                  <div
                    key={pIdx}
                    className="p-3.5 rounded-[6px] bg-[#FFF8F6] border border-[#F0BCB0] space-y-1.5"
                  >
                    <div className="flex items-start gap-1.5 font-sans text-xs font-bold text-[#991B1B]">
                      <AlertCircle className="w-3.5 h-3.5 text-[#DC2626] shrink-0 mt-0.5" />
                      <span>{pain.title}</span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-[#5E3A32] leading-normal">
                      {pain.desc}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 3. Quy trình & Phương pháp luận thiết kế (Design Process) */}
          {selectedCaseStudy.caseStudy.processSteps && selectedCaseStudy.caseStudy.processSteps.length > 0 && (
            <div className="p-5 sm:p-6 rounded-[8px] bg-[#FFFDF7] border-2 border-[#CBB892] shadow-[0_3px_0_#A89571] space-y-4">
              <div className="flex items-center gap-2">
                <Workflow className="w-4 h-4 text-[#7A3F1F]" />
                <h3 className="font-sans text-sm sm:text-base font-bold text-[#7A3F1F] uppercase">
                  Quy trình & Phương pháp luận Product Design
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {selectedCaseStudy.caseStudy.processSteps.map((step, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3.5 rounded-[6px] bg-[#FFF9EB] border border-[#DFC9A2] flex flex-col justify-between space-y-2"
                  >
                    <div className="space-y-1">
                      <div className="font-sans text-[10px] sm:text-xs font-bold text-[#D97706] tracking-wider uppercase">
                        {step.step}
                      </div>
                      <div className="font-sans text-xs sm:text-sm font-bold text-[#2D1B12]">
                        {step.title}
                      </div>
                    </div>
                    <p className="text-[11px] sm:text-xs text-[#4A3326] leading-relaxed pt-1 border-t border-[#E8D9BE]">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Chiến lược & Giải pháp Product Design chi tiết */}
          <div className="p-5 sm:p-6 rounded-[8px] bg-[#FFFDF7] border-2 border-[#A2D396] shadow-[0_3px_0_#7FB871] space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-base">🛡️</span>
              <h3 className="font-sans text-sm sm:text-base font-bold text-[#2E7D32] uppercase">
                Chiến lược & Giải pháp thiết kế đột phá
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#4A3326] leading-relaxed">
              {selectedCaseStudy.caseStudy.solution}
            </p>

            {selectedCaseStudy.caseStudy.keySolutions && selectedCaseStudy.caseStudy.keySolutions.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                {selectedCaseStudy.caseStudy.keySolutions.map((sol, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3.5 rounded-[6px] bg-[#F7FCF6] border border-[#BDE3B6] flex flex-col justify-between space-y-2"
                  >
                    <div className="space-y-1">
                      <div className="flex items-start gap-1.5 font-sans text-xs sm:text-sm font-bold text-[#1E5622]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" />
                        <span>{sol.title}</span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-[#355337] leading-normal">
                        {sol.desc}
                      </p>
                    </div>
                    {sol.highlight && (
                      <div className="pt-2 border-t border-[#D3EED0] text-[10px] sm:text-[11px] font-sans font-bold text-[#15803D] bg-[#EAF8E7] px-2 py-1 rounded-[4px]">
                        ★ {sol.highlight}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 5. Hiệu quả đo lường Trước vs Sau (Before vs After) */}
          {selectedCaseStudy.caseStudy.beforeAfter && selectedCaseStudy.caseStudy.beforeAfter.length > 0 && (
            <div className="p-5 sm:p-6 rounded-[8px] bg-[#FFFDF7] border-2 border-[#CBB892] shadow-[0_3px_0_#A89571] space-y-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#16A34A]" />
                <h3 className="font-sans text-sm sm:text-base font-bold text-[#7A3F1F] uppercase">
                  Đo lường Hiệu quả & Chỉ số Thực tế (Trước vs Sau)
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {selectedCaseStudy.caseStudy.beforeAfter.map((item, bIdx) => (
                  <div
                    key={bIdx}
                    className="p-3.5 rounded-[6px] bg-[#FFF9EB] border border-[#DFC9A2] flex flex-col justify-between space-y-2 text-center"
                  >
                    <div className="font-sans text-[11px] font-bold text-[#6B513C] uppercase">
                      {item.metric}
                    </div>
                    <div className="space-y-1.5 my-1">
                      <div className="text-[11px] text-[#991B1B] bg-[#FEE2E2] px-2 py-0.5 rounded-[4px] font-semibold">
                        Trước: {item.before}
                      </div>
                      <div className="text-xs font-sans font-bold text-[#15803D] bg-[#DCFCE7] px-2 py-1 rounded-[4px]">
                        Sau: {item.after}
                      </div>
                    </div>
                    {item.note && (
                      <p className="text-[10px] sm:text-[11px] text-[#4A3326] leading-tight italic pt-1 border-t border-[#E8D9BE]">
                        {item.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. Deliverables Section */}
          <div className="p-5 sm:p-6 rounded-[8px] bg-[#FFFDF7] border-2 border-[#CBB892] shadow-[0_3px_0_#A89571] space-y-3">
            <h3 className="font-sans text-sm sm:text-base font-bold text-[#7A3F1F] uppercase flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#F4C542]" />
              <span>Sản phẩm bàn giao chính (Key Deliverables)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {selectedCaseStudy.caseStudy.deliverables.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 text-xs sm:text-sm text-[#2D1B12] bg-[#FFF8E7] p-2.5 rounded-[5px] border border-[#CBB892]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#4F9D18] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 7. Bài học kinh nghiệm & Đúc kết sản phẩm */}
          {selectedCaseStudy.caseStudy.learnings && selectedCaseStudy.caseStudy.learnings.length > 0 && (
            <div className="p-5 sm:p-6 rounded-[8px] bg-[#FFFDF7] border-2 border-[#F6D285] shadow-[0_3px_0_#D9A726] space-y-3">
              <h3 className="font-sans text-sm sm:text-base font-bold text-[#92400E] uppercase flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-[#D97706]" />
                <span>Bài học kinh nghiệm & Đúc kết sản phẩm (Key Learnings)</span>
              </h3>
              <div className="space-y-2">
                {selectedCaseStudy.caseStudy.learnings.map((learning, lIdx) => (
                  <div
                    key={lIdx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-[#451A03] bg-[#FEF3C7] p-3 rounded-[6px] border border-[#FDE68A]"
                  >
                    <span className="font-sans text-[#D97706] font-bold shrink-0 mt-0.5">✦</span>
                    <span className="leading-relaxed">{learning}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 8. Impact Highlight */}
          {selectedCaseStudy.impact && (
            <div className="p-4 sm:p-5 rounded-[8px] bg-[#F0FDF4] border-2 border-[#BBF7D0] shadow-[0_2px_0_#86EFAC] flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
              <div>
                <div className="font-sans text-xs sm:text-sm font-bold text-[#166534] uppercase">
                  Hiệu quả kinh doanh tổng thể (Measurable Business Impact)
                </div>
                <p className="text-xs sm:text-sm text-[#14532D] mt-1 leading-relaxed">
                  {selectedCaseStudy.impact}
                </p>
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-sans text-[#7A3F1F] font-bold mr-1">Từ khóa chuyên môn:</span>
            {selectedCaseStudy.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="text-xs font-sans px-2.5 py-1 rounded-[4px] bg-[#FFF4D6] border border-[#D4C39B] text-[#7A3F1F]"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Bottom Action Buttons */}
          <div className="pt-4 border-t-2 border-[#DFC9A2] flex flex-wrap items-center justify-between gap-3">
            <VoxelButton
              variant="secondary"
              size="md"
              onClick={handleBackToList}
              icon={<ArrowLeft className="w-4 h-4" />}
            >
              Quay lại danh sách dự án
            </VoxelButton>

            <a
              href={selectedCaseStudy.demoUrl || 'https://mbbank.com.vn'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-[6px] bg-[#F4C542] hover:bg-[#FFD55C] active:bg-[#D9A726] border-2 border-[#4A2414] text-[#2D1B12] font-sans text-xs sm:text-sm font-bold shadow-[0_3px_0_#4A2414] active:translate-y-0.5 transition-all"
            >
              <span>XEM DỰ ÁN TRỰC TIẾP</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </a>
          </div>
        </GameModalBody>
      </GameModal>
    );
  }

  /* =========================================================================
   * GIAO DIỆN DANH SÁCH TẤT CẢ DỰ ÁN (SCROLLABLE FEED)
   * ========================================================================= */
  return (
    <GameModal
      key="projects-list-modal"
      areaKey="work"
      onClose={onClose}
      maxWidthClass="max-w-[1040px]"
    >
      <GameModalBody
        ref={listBodyRef}
        key="projects-list-body"
        id="projects-list-container"
        className="!pt-0 !space-y-0"
      >
        {/* Tiêu đề mốc thời gian: 2018 – Hiện tại */}
        <div className="pt-4 sm:pt-6 pb-2.5">
          <div className="text-xl sm:text-3xl font-pixel font-bold text-black tracking-tight">
            2018 – Hiện tại
          </div>
        </div>

        {/* Top Sticky Quick Jump Plaque: Bám sát mép trên header khi scroll, hỗ trợ lăn chuột + kéo chuột + nút bấm */}
        <div className="sticky top-0 z-30 bg-[#FFF8E7] -mx-4 sm:-mx-7 md:-mx-8 px-3 sm:px-6 md:px-7 py-2 flex items-center gap-1 sm:gap-1.5">
          {canScrollLeft && (
            <button
              onClick={() => scrollChips('left')}
              aria-label="Cuộn sang trái"
              className="p-1 sm:p-1.5 rounded-[4px] bg-[#FFFDF7] border border-[#CBB892] text-[#4A2414] hover:bg-[#F4C542] transition-colors shrink-0 shadow-[0_1px_0_#A89571] active:translate-y-0.5 cursor-pointer z-10"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          )}

          <div
            ref={chipsContainerRef}
            onMouseDown={handleChipsMouseDown}
            onMouseMove={handleChipsMouseMove}
            onMouseUp={handleChipsMouseUp}
            onMouseLeave={handleChipsMouseUp}
            className="flex-1 flex items-center justify-start gap-2 overflow-x-auto py-1 select-none cursor-grab active:cursor-grabbing scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {projectsData.map((p, idx) => {
              const isActive = activeProjectId === p.id;
              const chipLabel = p.owner || p.title;

              return (
                <button
                  key={p.id}
                  id={`chip-${p.id}`}
                  onClick={(e) => {
                    if (hasMovedRef.current) {
                      e.preventDefault();
                      return;
                    }
                    handleScrollToProject(p);
                  }}
                  className={`px-3 py-1.5 rounded-[6px] text-xs font-pixel font-bold border transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                    isActive
                      ? 'bg-[#F4C542] border-[#4A2414] text-[#2D1B12] shadow-[0_2px_0_#4A2414] -translate-y-0.5'
                      : 'bg-[#FFFDF7] border-[#CBB892] text-[#6B513C] hover:border-[#7A3F1F] hover:bg-[#FFECC2] shadow-[0_1px_0_#A89571]'
                  }`}
                >
                  <span className="text-[#7A3F1F] font-black">0{idx + 1}</span>
                  <span className="truncate max-w-[140px] sm:max-w-[180px]">{chipLabel}</span>
                </button>
              );
            })}
          </div>

          {canScrollRight && (
            <button
              onClick={() => scrollChips('right')}
              aria-label="Cuộn sang phải"
              className="p-1 sm:p-1.5 rounded-[4px] bg-[#FFFDF7] border border-[#CBB892] text-[#4A2414] hover:bg-[#F4C542] transition-colors shrink-0 shadow-[0_1px_0_#A89571] active:translate-y-0.5 cursor-pointer z-10"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Danh sách toàn bộ các dự án được hiển thị liên tục (Scrollable Project Feed) */}
        <div className="pt-4 sm:pt-5 pb-4 space-y-8 sm:space-y-10">
          {projectsData.map((project, index) => {
            return (
              <div
                key={project.id}
                id={`work-${project.id}`}
                className="scroll-mt-24 rounded-[8px] sm:rounded-[10px] bg-[#FFFDF7] border-2 sm:border-3 border-[#CBB892] shadow-[0_6px_0_#A89571,0_12px_24px_rgba(0,0,0,0.06)] overflow-hidden transition-all"
              >
                {/* Main Content Grid: Left UI Mockup + Right Specs (Đồng bộ chuẩn giao diện Game Voxel RPG) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[360px]">
                  {/* Left: Project Image (Full viền / Edge-to-Edge) */}
                  <div className="lg:col-span-6 xl:col-span-7 relative overflow-hidden border-b-2 lg:border-b-0 lg:border-r-2 border-[#CBB892] min-h-[240px] sm:min-h-[320px] lg:min-h-full bg-[#1E293B]">
                    {project.imageUrl ? (
                      <div
                        className="relative w-full h-full min-h-[240px] sm:min-h-[320px] lg:min-h-full flex items-stretch cursor-pointer group overflow-hidden"
                        onClick={() => handleOpenCaseStudy(project)}
                      >
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                          loading="lazy"
                        />
                        {/* Subtle hover effect */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 pointer-events-none" />
                        {/* Index badge */}
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-[4px] bg-[#1E293B]/85 backdrop-blur-md border border-[#CBB892]/60 text-[10px] font-pixel font-bold text-[#F4C542] shadow-md pointer-events-none">
                          0{index + 1}
                        </div>
                      </div>
                    ) : (
                      <div className="p-5 sm:p-7 flex items-center justify-center h-full">
                        {renderProjectMockup(project, index)}
                      </div>
                    )}
                  </div>

                  {/* Right: Project Information (Chỉ hiện các thông tin theo ảnh mẫu, đồng bộ phong cách Game UI) */}
                  <div className="lg:col-span-6 xl:col-span-5 p-5 sm:p-7 flex flex-col justify-between space-y-5 bg-[#FFFDF7]">
                    <div className="space-y-4">
                      {/* Phân loại & Divider line */}
                      <div className="flex items-center gap-3">
                        <span className="font-pixel text-xs sm:text-sm font-bold text-[#176B73] uppercase tracking-wide">
                          {project.category}
                        </span>
                        <div className="h-[2px] bg-[#E2D4B7] flex-1" />
                      </div>

                      {/* Tiêu đề dự án */}
                      <h2 className="font-pixel text-xl sm:text-2xl font-bold text-[#2D1B12] leading-snug">
                        {project.title}
                      </h2>

                      {/* Vai trò */}
                      <div className="space-y-1">
                        <div className="text-[11px] sm:text-xs font-pixel text-[#7A3F1F] uppercase font-bold tracking-wide">
                          Vai trò
                        </div>
                        <div className="text-sm sm:text-base font-bold text-[#2D1B12]">
                          {project.role}
                        </div>
                      </div>

                      {/* Chủ dự án */}
                      <div className="space-y-1">
                        <div className="text-[11px] sm:text-xs font-pixel text-[#7A3F1F] uppercase font-bold tracking-wide">
                          Chủ dự án
                        </div>
                        <div className="text-sm sm:text-base font-bold text-[#2D1B12]">
                          {project.owner}
                        </div>
                      </div>
                    </div>

                    {/* Nút Xem dự án ↗ màu xanh lá chuẩn Game UI (Voxel 3D button) */}
                    <button
                      onClick={() => handleOpenCaseStudy(project)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[6px] bg-[#4F9D18] hover:bg-[#63B722] active:bg-[#386D12] text-[#FFF4D6] font-pixel text-xs sm:text-sm font-bold border-2 border-[#2F5E0F] shadow-[0_3px_0_#23470B] active:shadow-none active:translate-y-[3px] transition-all cursor-pointer self-start group mt-2"
                    >
                      <span>Xem dự án</span>
                      <ArrowUpRight className="w-4 h-4 stroke-[2.5] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Explorer Prompt */}
        <div className="text-center py-3 text-xs font-pixel text-[#7A3F1F] bg-[#FFF4D6] p-3 rounded-[8px] border border-[#D4C39B]">
          <span>✨ BẠN ĐÃ XEM HẾT TẤT CẢ {projectsData.length} DỰ ÁN TRONG PHÂN KHU DỰ ÁN CỦA TÔI ✨</span>
        </div>
      </GameModalBody>
    </GameModal>
  );
};

import React, { useState } from 'react';
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
  Check
} from 'lucide-react';
import { ProjectItem } from '../../../types';
import { VoxelButton } from '../common/GameModalComponents';

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

  const scrollToChapter = (id: string) => {
    setActiveChapter(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-8 sm:space-y-12 select-text pb-12">
      {/* =========================================================================
       * STICKY / TOP CHAPTER PROGRESS NAVIGATION
       * ========================================================================= */}
      <div className="sticky top-0 z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 py-2.5 bg-[#FFF4D6]/95 backdrop-blur-md border-b-2 border-[#DFC9A2] shadow-sm flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[5px] bg-[#3B1D0F] text-[#FFF4D6] hover:bg-[#4A2414] font-pixel text-xs font-bold shrink-0 transition-colors shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">QUAY LẠI</span>
        </button>

        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-0.5">
          {CHAPTERS.map((c) => {
            const isActive = activeChapter === c.id;
            return (
              <button
                key={c.id}
                onClick={() => scrollToChapter(c.id)}
                className={`px-2 sm:px-2.5 py-1 rounded-[4px] font-pixel text-[10px] sm:text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#F4C542] text-[#2D1B12] shadow-[0_2px_0_#9E875C] scale-105'
                    : 'bg-[#FFF8E7] text-[#7A3F1F] hover:bg-[#FFECC2] border border-[#DFC9A2]'
                }`}
                title={c.title}
              >
                <span>{c.num}</span>
                <span className="hidden md:inline ml-1 font-sans font-medium text-[11px] text-[#4A3326]">
                  • {c.title}
                </span>
              </button>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-1.5 font-pixel text-xs text-[#7A3F1F] shrink-0 font-bold">
          <Sparkles className="w-3.5 h-3.5 text-[#F4C542]" />
          <span>DEEP DIVE QUEST</span>
        </div>
      </div>

      {/* =========================================================================
       * SECTION 01 — PROJECT OVERVIEW (TỔNG QUAN)
       * ========================================================================= */}
      <section id="sec-01" className="space-y-6 pt-2 scroll-mt-16">
        {/* Editorial Section Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-pixel text-xs sm:text-sm font-bold text-[#B86428] tracking-wider uppercase">
            <span className="px-2 py-0.5 rounded bg-[#F4C542]/30 border border-[#B86428]/40">
              01 / PROJECT OVERVIEW
            </span>
            <span>✦ CASE STUDY SẢN PHẨM</span>
          </div>
          <h1 className="font-pixel text-2xl sm:text-4xl lg:text-5xl font-bold text-[#2D1B12] leading-[1.15]">
            Thiết kế lại hành trình cấp hạn mức trung dài hạn cho doanh nghiệp
          </h1>
          <p className="font-sans text-base sm:text-lg text-[#5A4030] leading-relaxed max-w-4xl pt-1">
            Biến một quy trình tín dụng phức tạp thành hành trình số rõ ràng, có hướng dẫn và kết nối liền mạch với Relationship Manager (RM) — kiến tạo chuẩn mực trải nghiệm ngân hàng số doanh nghiệp phân khúc Upper SME & CIB.
          </p>
        </div>

        {/* Structured Metadata Badges Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-[8px] bg-[#FFFDF7] border-2 border-[#CBB892] shadow-[0_3px_0_#A89571]">
            <div className="font-pixel text-[10px] text-[#7A3F1F] uppercase font-bold tracking-wider">VAI TRÒ (ROLE)</div>
            <div className="font-sans text-sm font-bold text-[#2D1B12] mt-1">Product Designer</div>
            <div className="font-sans text-[11px] text-[#6B513C] mt-0.5">End-to-end UX, IA, Interaction & Design System</div>
          </div>
          <div className="p-3.5 rounded-[8px] bg-[#FFFDF7] border-2 border-[#CBB892] shadow-[0_3px_0_#A89571]">
            <div className="font-pixel text-[10px] text-[#7A3F1F] uppercase font-bold tracking-wider">SẢN PHẨM (PRODUCT)</div>
            <div className="font-sans text-sm font-bold text-[#2D1B12] mt-1">BIZ MBBank Web & Mobile</div>
            <div className="font-sans text-[11px] text-[#6B513C] mt-0.5">Đồng bộ đa nền tảng Portal & App</div>
          </div>
          <div className="p-3.5 rounded-[8px] bg-[#FFFDF7] border-2 border-[#CBB892] shadow-[0_3px_0_#A89571]">
            <div className="font-pixel text-[10px] text-[#7A3F1F] uppercase font-bold tracking-wider">ĐỐI TƯỢNG (CUSTOMER)</div>
            <div className="font-sans text-sm font-bold text-[#2D1B12] mt-1">Upper SME & CIB</div>
            <div className="font-sans text-[11px] text-[#6B513C] mt-0.5">Kế toán trưởng, CFO, CEO & Giám đốc vận hành</div>
          </div>
          <div className="p-3.5 rounded-[8px] bg-[#FFFDF7] border-2 border-[#CBB892] shadow-[0_3px_0_#A89571]">
            <div className="font-pixel text-[10px] text-[#7A3F1F] uppercase font-bold tracking-wider">PHẠM VI (SCOPE)</div>
            <div className="font-sans text-sm font-bold text-[#2D1B12] mt-1">6 Điểm chạm cốt lõi</div>
            <div className="font-sans text-[11px] text-[#6B513C] mt-0.5">Khởi tạo • Hồ sơ • Duyệt • Gửi • Theo dõi • RM</div>
          </div>
        </div>

        {/* Project Summary Board: Problem -> Approach -> Solution -> Outcomes */}
        <div className="p-5 sm:p-7 rounded-[10px] bg-[#FFF8E7] border-2 border-[#DFC9A2] shadow-[0_4px_0_#BCA67F] space-y-5">
          <div className="font-pixel text-sm font-bold text-[#2D1B12] flex items-center gap-2">
            <Target className="w-4 h-4 text-[#B86428]" />
            <span>TÓM TẮT DỰ ÁN (EXECUTIVE PROJECT SUMMARY)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-3.5 rounded-[6px] bg-white border border-[#DFC9A2] space-y-1.5">
              <div className="font-pixel text-xs font-bold text-[#991B1B] uppercase flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                <span>VẤN ĐỀ</span>
              </div>
              <p className="font-sans text-xs text-[#4A3326] leading-relaxed">
                Khách hàng bắt đầu nhưng drop-off cao; hồ sơ phải bổ sung từ 3-5 lần; RM phải can thiệp thủ công từ quá sớm và khách hàng mù mờ trạng thái.
              </p>
            </div>

            <div className="p-3.5 rounded-[6px] bg-white border border-[#DFC9A2] space-y-1.5">
              <div className="font-pixel text-xs font-bold text-[#1D4ED8] uppercase flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-blue-600" />
                <span>CÁCH TIẾP CẬN</span>
              </div>
              <p className="font-sans text-xs text-[#4A3326] leading-relaxed">
                Kết hợp song song Phân tích phễu dữ liệu sản phẩm (Quantitative) và Phỏng vấn chuyên sâu 4 nhóm vai trò (Qualitative) để tìm ra nguồn gốc nút thắt.
              </p>
            </div>

            <div className="p-3.5 rounded-[6px] bg-white border border-[#DFC9A2] space-y-1.5">
              <div className="font-pixel text-xs font-bold text-[#15803D] uppercase flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>GIẢI PHÁP</span>
              </div>
              <p className="font-sans text-xs text-[#4A3326] leading-relaxed">
                Readiness Check trước cam kết; Dynamic Checklist theo ngành nghề; Luồng phê duyệt 1-chạm cho lãnh đạo; Timeline minh bạch & Bàn giao RM có ngữ cảnh.
              </p>
            </div>

            <div className="p-3.5 rounded-[6px] bg-white border border-[#DFC9A2] space-y-1.5">
              <div className="font-pixel text-xs font-bold text-[#7A3F1F] uppercase flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-[#B86428]" />
                <span>KẾT QUẢ ĐO LƯỜNG</span>
              </div>
              <div className="font-sans text-xs space-y-1 text-[#2D1B12]">
                <div className="flex justify-between font-semibold"><span className="text-[#6B513C]">Tỷ lệ hoàn thành:</span> <strong className="text-emerald-700 font-bold">+[XX]%</strong></div>
                <div className="flex justify-between font-semibold"><span className="text-[#6B513C]">Bổ sung hồ sơ:</span> <strong className="text-emerald-700 font-bold">−[XX]%</strong></div>
                <div className="flex justify-between font-semibold"><span className="text-[#6B513C]">Thời gian tạo đơn:</span> <strong className="text-emerald-700 font-bold">−[XX]%</strong></div>
              </div>
            </div>
          </div>
        </div>

        {/* Large Hero Editorial Visual: BIZ MBBank Web & Mobile Mockups */}
        <div className="rounded-[12px] p-4 sm:p-8 bg-gradient-to-b from-[#0B1528] via-[#0F1E38] to-[#0A1222] border-2 sm:border-3 border-[#CBB892] shadow-[0_8px_0_#A89571] space-y-4">
          <div className="flex items-center justify-between text-[#DFC9A2] border-b border-blue-900/40 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="font-pixel text-xs text-sky-200 ml-2">BIZ MBBank 2.0 • HỆ THỐNG CẤP HẠN MỨC TRUNG DÀI HẠN</span>
            </div>
            <span className="font-mono text-[11px] text-sky-400 hidden sm:inline">Upper SME & CIB Enterprise Suite</span>
          </div>

          {/* Combined Web & Mobile Realistic UI Presentation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-2">
            {/* Left 8 Cols: Web Portal View */}
            <div className="lg:col-span-8 rounded-[8px] bg-[#0E1B33] border border-blue-800/60 shadow-2xl overflow-hidden">
              {/* Web Header */}
              <div className="bg-[#091325] px-4 py-2.5 flex items-center justify-between border-b border-blue-900/60">
                <div className="flex items-center gap-2">
                  <span className="text-rose-500 text-sm">★</span>
                  <span className="text-sky-400 font-bold text-xs tracking-tight">MB</span>
                  <span className="text-slate-300 text-[11px] font-semibold border-l border-slate-700 pl-2 ml-1">BIZ Portal Enterprise</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-slate-300">
                  <span className="px-2 py-0.5 rounded bg-blue-950 border border-blue-800 text-sky-300 font-mono">MST: 0102030405</span>
                  <span className="hidden sm:inline">CTCP TẬP ĐOÀN CÔNG NGHỆ & SẢN XUẤT</span>
                </div>
              </div>

              {/* Web Body UI Content */}
              <div className="p-4 sm:p-6 space-y-4 font-sans text-slate-200 text-xs">
                {/* Stepper bar */}
                <div className="flex items-center justify-between bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-[10px]">✓</span>
                    <span className="font-semibold text-white">1. Kiểm tra điều kiện</span>
                  </div>
                  <div className="h-0.5 w-12 bg-emerald-500 hidden sm:block" />
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold text-[10px]">2</span>
                    <span className="font-semibold text-sky-300">2. Chuẩn bị hồ sơ</span>
                  </div>
                  <div className="h-0.5 w-12 bg-slate-700 hidden sm:block" />
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px]">3</span>
                    <span>3. Phê duyệt nội bộ</span>
                  </div>
                  <div className="h-0.5 w-12 bg-slate-700 hidden sm:block" />
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px]">4</span>
                    <span>4. Gửi MBBank</span>
                  </div>
                </div>

                {/* Main Content Showcase: Dynamic Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs flex items-center gap-1.5">
                        <FileCheck className="w-3.5 h-3.5 text-sky-400" />
                        Danh mục hồ sơ tài chính (3/4)
                      </span>
                      <span className="text-[10px] text-emerald-400 font-mono font-semibold">75% Hoàn tất</span>
                    </div>
                    <div className="space-y-1.5 text-[11px]">
                      <div className="flex items-center justify-between p-1.5 rounded bg-slate-800/60">
                        <span className="flex items-center gap-1.5 text-slate-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          Báo cáo tài chính 2 năm kiểm toán
                        </span>
                        <span className="text-[9px] text-slate-400">PDF • 12MB</span>
                      </div>
                      <div className="flex items-center justify-between p-1.5 rounded bg-slate-800/60">
                        <span className="flex items-center gap-1.5 text-slate-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          Quyết định đầu tư dự án mở rộng
                        </span>
                        <span className="text-[9px] text-slate-400">PDF • 4.8MB</span>
                      </div>
                      <div className="flex items-center justify-between p-1.5 rounded bg-blue-950/50 border border-sky-500/40">
                        <span className="flex items-center gap-1.5 text-sky-200 font-medium">
                          <Clock className="w-3 h-3 text-amber-400 animate-spin" />
                          Hồ sơ phương án trả nợ & dòng tiền
                        </span>
                        <span className="text-[9px] text-sky-300 underline cursor-pointer">Bổ sung ngay</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-emerald-400" />
                        Tóm tắt đề xuất cấp hạn mức
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">Đã sơ duyệt</span>
                    </div>
                    <div className="space-y-2 text-[11px] pt-1">
                      <div className="flex justify-between border-b border-slate-800 pb-1">
                        <span className="text-slate-400">Nhu cầu vốn dự kiến:</span>
                        <strong className="text-white font-mono text-xs">85.000.000.000 VNĐ</strong>
                      </div>
                      <div className="flex justify-between border-b border-slate-800 pb-1">
                        <span className="text-slate-400">Thời hạn đề xuất:</span>
                        <strong className="text-white">60 Tháng (Trung dài hạn)</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">RM phụ trách chi nhánh:</span>
                        <span className="text-sky-300 font-medium">Nguyễn Tuấn Anh • CN Hoàn Kiếm</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Mobile App View (Approver Flow) */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-[240px] sm:w-[260px] rounded-[24px] bg-[#070D18] p-2.5 border-3 border-slate-700 shadow-2xl space-y-2.5 font-sans">
                {/* Phone Speaker & Notch */}
                <div className="w-20 h-3.5 bg-slate-800 rounded-full mx-auto" />

                <div className="p-2.5 bg-[#0D1829] rounded-[16px] text-white space-y-2 text-[10px]">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                    <div className="flex items-center gap-1">
                      <span className="text-rose-500 text-xs">★</span>
                      <span className="font-bold text-sky-400 text-[10px]">BIZ MB</span>
                    </div>
                    <span className="text-[8px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">Chờ CEO ký</span>
                  </div>

                  <div className="text-[11px] font-bold text-slate-100">
                    Phê duyệt yêu cầu cấp hạn mức TDH
                  </div>

                  <div className="p-2 rounded bg-slate-900/90 border border-slate-800 space-y-1 text-[9px]">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Doanh nghiệp:</span>
                      <span className="text-slate-200 font-semibold truncate max-w-[110px]">Tập đoàn Công nghệ</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Hạn mức đề nghị:</span>
                      <span className="text-emerald-400 font-mono font-bold">85 Tỷ VNĐ</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Người khởi tạo:</span>
                      <span className="text-slate-300">Kế toán trưởng (Đã ký)</span>
                    </div>
                  </div>

                  <div className="p-2 rounded bg-blue-950/60 border border-blue-800/40 text-[9px] text-sky-200">
                    💡 Đã kiểm tra đầy đủ 4/4 hồ sơ pháp lý & phương án hoàn vốn.
                  </div>

                  <div className="pt-1 space-y-1.5">
                    <button className="w-full py-1.5 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-[10px] flex items-center justify-center gap-1 shadow-sm cursor-pointer">
                      <span>KÝ DUYỆT BẰNG SMART CA</span>
                    </button>
                    <button className="w-full py-1 rounded bg-slate-800 text-slate-400 text-[9px] cursor-pointer">
                      Xem tóm tắt hồ sơ đính kèm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
       * SECTION 02 — BỐI CẢNH & GIẢ THUYẾT (CONTEXT & HYPOTHESIS)
       * ========================================================================= */}
      <section id="sec-02" className="space-y-6 pt-4 scroll-mt-16 border-t-2 border-[#EAD9B0]">
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-pixel text-xs sm:text-sm font-bold text-[#B86428] uppercase">
            <span className="px-2 py-0.5 rounded bg-[#F4C542]/30 border border-[#B86428]/40">
              02 / BỐI CẢNH & GIẢ THUYẾT
            </span>
          </div>
          <h2 className="font-pixel text-2xl sm:text-3xl font-bold text-[#2D1B12]">
            Một hành trình có giá trị cao nhưng khó bắt đầu
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#5A4030] leading-relaxed max-w-3xl">
            Vay vốn trung dài hạn là đòn bẩy sống còn của phân khúc Upper SME và CIB để đầu tư dây chuyền sản xuất mới, mở rộng nhà xưởng, mua sắm phương tiện vận tải và tài trợ dự án quy mô lớn từ hàng chục đến hàng trăm tỷ đồng.
          </p>
        </div>

        {/* 6 Initial Signals Grid */}
        <div className="space-y-3">
          <div className="font-pixel text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#B86428]" />
            <span>6 TÍN HIỆU CẢNH BÁO TỪ THỰC TẾ VẬN HÀNH (INITIAL SIGNALS)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {[
              {
                num: '01',
                title: 'Bắt đầu nhưng không hoàn thành',
                desc: 'Khách hàng click vào tính năng khởi tạo trên Portal nhưng tỷ lệ bỏ dở ngay từ bước danh mục hồ sơ đầu tiên lên tới hơn 60%.'
              },
              {
                num: '02',
                title: 'Hồ sơ bổ sung nhiều lần',
                desc: 'Trung bình một bộ hồ sơ gửi sang ngân hàng bị trả về bổ sung từ 3 đến 5 lần do sai lệch mẫu biểu, thiếu tài liệu phụ lục kiểm toán.'
              },
              {
                num: '03',
                title: 'Liên hệ RM từ quá sớm',
                desc: 'Hơn 70% khách hàng nhấc máy gọi RM ngay khi nhìn thấy danh sách yêu cầu vì không hiểu định dạng tài liệu và điều kiện cụ thể.'
              },
              {
                num: '04',
                title: 'Bản lưu nháp (Draft) không quay lại',
                desc: 'Khách hàng lưu bản nháp tạm thời nhưng không bao giờ quay lại tiếp tục, biến hệ thống thành kho lưu trữ hồ sơ chết.'
              },
              {
                num: '05',
                title: 'Người duyệt mất nhiều thời gian',
                desc: 'C-Level (CFO/CEO) không có thời gian đọc hàng chục file đính kèm trên mobile, dẫn đến thời gian chờ duyệt nội bộ kéo dài 3-7 ngày.'
              },
              {
                num: '06',
                title: 'Không hiểu trạng thái xử lý',
                desc: 'Hồ sơ sau khi gửi sang MBBank hiển thị trạng thái chung chung "Đang xử lý", khiến doanh nghiệp bất an và liên tục hối thúc RM.'
              }
            ].map((s, idx) => (
              <div
                key={idx}
                className="p-4 rounded-[8px] bg-[#FFFDF7] border-2 border-[#CBB892] shadow-[0_3px_0_#A89571] space-y-2 hover:-translate-y-0.5 transition-transform"
              >
                <div className="flex items-center justify-between">
                  <span className="font-pixel text-xs font-bold text-[#B86428] px-2 py-0.5 rounded bg-[#FFF4D6] border border-[#DFC9A2]">
                    SIGNAL {s.num}
                  </span>
                  <AlertCircle className="w-4 h-4 text-[#D97706]" />
                </div>
                <h3 className="font-pixel text-sm font-bold text-[#2D1B12]">
                  {s.title}
                </h3>
                <p className="font-sans text-xs text-[#5A4030] leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Hypothesis Callout & Story Transition */}
        <div className="p-5 sm:p-7 rounded-[10px] bg-[#FFF4D6] border-2 border-[#7A3F1F] shadow-[0_4px_0_#542B15] space-y-3">
          <div className="font-pixel text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-[#F4C542]" />
            <span>GIẢ THUYẾT TRẢI NGHIỆM CỐT LÕI (CORE HYPOTHESIS)</span>
          </div>
          <blockquote className="font-sans text-base sm:text-lg font-bold text-[#2D1B12] leading-snug italic border-l-4 border-[#B86428] pl-4 my-2">
            “Khách hàng không từ bỏ vì thiếu nhu cầu vay vốn. Họ từ bỏ vì không hiểu mình cần chuẩn bị gì, chưa sẵn sàng phối hợp nội bộ và không biết điều gì sẽ xảy ra tiếp theo.”
          </blockquote>
          <div className="pt-2 border-t border-[#DFC9A2] flex items-center justify-between">
            <p className="font-sans text-xs sm:text-sm font-semibold text-[#7A3F1F]">
              👉 <em>“Tôi đã có một giả thuyết rõ ràng. Nhưng liệu giả thuyết đó có thực sự chính xác trên dữ liệu thực tế?”</em>
            </p>
            <button
              onClick={() => scrollToChapter('sec-03')}
              className="font-pixel text-xs text-[#B86428] hover:text-[#2D1B12] flex items-center gap-1 font-bold cursor-pointer"
            >
              <span>Xem kiểm chứng</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
       * SECTION 03 — RESEARCH (NGHIÊN CỨU)
       * ========================================================================= */}
      <section id="sec-03" className="space-y-6 pt-4 scroll-mt-16 border-t-2 border-[#EAD9B0]">
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-pixel text-xs sm:text-sm font-bold text-[#B86428] uppercase">
            <span className="px-2 py-0.5 rounded bg-[#F4C542]/30 border border-[#B86428]/40">
              03 / RESEARCH METHODOLOGY
            </span>
          </div>
          <h2 className="font-pixel text-2xl sm:text-3xl font-bold text-[#2D1B12]">
            Dùng dữ liệu để biết vấn đề ở đâu. Dùng phỏng vấn để hiểu vì sao.
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#5A4030] leading-relaxed max-w-3xl">
            Tôi chỉ tập trung vào 2 phương pháp nghiên cứu then chốt để đi thẳng vào bản chất: Phân tích dữ liệu vận hành sản phẩm (Định lượng) và Phỏng vấn chuyên sâu 4 nhóm đối tượng người dùng (Định tính).
          </p>
        </div>

        {/* Two Research Methods Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Method 01: Product & Operational Data Funnel */}
          <div className="p-5 sm:p-6 rounded-[10px] bg-[#FFFDF7] border-2 border-[#CBB892] shadow-[0_4px_0_#A89571] space-y-4">
            <div className="flex items-center justify-between border-b border-[#DFC9A2] pb-2.5">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-pixel text-xs font-bold">
                  METHOD 01
                </span>
                <h3 className="font-pixel text-sm sm:text-base font-bold text-[#2D1B12]">
                  Phân tích dữ liệu sản phẩm & vận hành
                </h3>
              </div>
              <span className="font-sans text-[11px] text-[#7A3F1F] font-semibold">Quantitative</span>
            </div>

            <p className="font-sans text-xs text-[#5A4030] leading-relaxed">
              Trích xuất log sự kiện và phễu chuyển đổi trên hệ thống BIZ MBBank trong 6 tháng gần nhất để đo lường chính xác các điểm rơi:
            </p>

            {/* Funnel Metrics Visualization */}
            <div className="space-y-2 pt-1 font-sans text-xs">
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#4A3326] font-semibold">1. Truy cập trang thông tin vay TDH</span>
                  <span className="font-mono font-bold text-slate-900">100% (Baseline)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full bg-sky-500 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#4A3326] font-semibold">2. Nhấn nút "Tạo hồ sơ đề nghị"</span>
                  <span className="font-mono font-bold text-slate-900">74%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full bg-sky-600 rounded-full" style={{ width: '74%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-red-700 font-bold">3. Tải lên tài liệu hồ sơ (DROP-OFF LỚN)</span>
                  <span className="font-mono font-bold text-red-600">28% (Rơi rụng -62%)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: '28%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#4A3326] font-semibold">4. Ký số & Gửi ngân hàng thành công</span>
                  <span className="font-mono font-bold text-emerald-700">12% Completion Rate</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '12%' }} />
                </div>
              </div>
            </div>

            {/* Evidence Callout */}
            <div className="p-3 rounded-[6px] bg-[#FFF8E7] border border-[#DFC9A2] text-xs space-y-1">
              <strong className="text-[#7A3F1F] font-bold">Key Data Insight:</strong>
              <p className="text-[#4A3326]">
                “Điểm nghẽn không nằm ở nhu cầu vay vốn. Nó nằm ở sự thiếu chuẩn bị và thiếu rõ ràng trước khi khách hàng cam kết hoàn thành hồ sơ.”
              </p>
            </div>
          </div>

          {/* Method 02: In-depth User Role Interviews */}
          <div className="p-5 sm:p-6 rounded-[10px] bg-[#FFFDF7] border-2 border-[#CBB892] shadow-[0_4px_0_#A89571] space-y-4">
            <div className="flex items-center justify-between border-b border-[#DFC9A2] pb-2.5">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-pixel text-xs font-bold">
                  METHOD 02
                </span>
                <h3 className="font-pixel text-sm sm:text-base font-bold text-[#2D1B12]">
                  Phỏng vấn chuyên sâu 4 nhóm vai trò
                </h3>
              </div>
              <span className="font-sans text-[11px] text-[#7A3F1F] font-semibold">Qualitative</span>
            </div>

            <p className="font-sans text-xs text-[#5A4030] leading-relaxed">
              Phỏng vấn 18 đại diện thuộc các mắt xích chính trong chu trình phê duyệt tín dụng doanh nghiệp:
            </p>

            <div className="space-y-2.5 pt-1">
              <div className="p-2.5 rounded-[6px] bg-[#FFF8E7] border border-[#DFC9A2] space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-[#2D1B12]">
                  <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-blue-600" /> Người khởi tạo (Nhân viên tài chính)</span>
                  <span className="text-[10px] text-[#7A3F1F]">“Tôi sợ tải sai mẫu rồi bị bắt làm lại”</span>
                </div>
                <p className="text-[11px] text-[#5A4030]">
                  Gặp áp lực vì không biết danh mục hồ sơ áp dụng cho ngành nghề nào và không thể tự ước tính hạn mức sơ bộ.
                </p>
              </div>

              <div className="p-2.5 rounded-[6px] bg-[#FFF8E7] border border-[#DFC9A2] space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-[#2D1B12]">
                  <span className="flex items-center gap-1.5"><Building className="w-3.5 h-3.5 text-amber-600" /> Kế toán trưởng & Ban kiểm soát</span>
                  <span className="text-[10px] text-[#7A3F1F]">“Thiếu tính năng phân quyền soạn thảo”</span>
                </div>
                <p className="text-[11px] text-[#5A4030]">
                  Cần giao việc cho nhân viên tải file nhưng tài khoản lại chỉ có 1 cấp quyền duy nhất trên hệ thống cũ.
                </p>
              </div>

              <div className="p-2.5 rounded-[6px] bg-[#FFF8E7] border border-[#DFC9A2] space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-[#2D1B12]">
                  <span className="flex items-center gap-1.5"><UserCheck className="w-3.5 h-3.5 text-emerald-600" /> Người phê duyệt (CFO / CEO)</span>
                  <span className="text-[10px] text-[#7A3F1F]">“Tôi không mở nổi 20 file PDF trên mobile”</span>
                </div>
                <p className="text-[11px] text-[#5A4030]">
                  Cần một màn hình Decision Summary tóm tắt số liệu trọng yếu (Hạn mức, Dòng tiền hoàn vốn, Rủi ro) để duyệt 1-chạm.
                </p>
              </div>

              <div className="p-2.5 rounded-[6px] bg-[#FFF8E7] border border-[#DFC9A2] space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-[#2D1B12]">
                  <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-purple-600" /> Relationship Manager (RM MBBank)</span>
                  <span className="text-[10px] text-[#7A3F1F]">“Khách gọi tôi không có thông tin trên app”</span>
                </div>
                <p className="text-[11px] text-[#5A4030]">
                  RM không thấy được bản nháp của khách trên Portal, buộc phải yêu cầu gửi lại tài liệu qua email hoặc Zalo.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Evidence -> Finding -> Insight Mapping Table */}
        <div className="p-5 sm:p-6 rounded-[10px] bg-[#FFFDF7] border-2 border-[#CBB892] shadow-[0_4px_0_#A89571] space-y-3">
          <div className="font-pixel text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase flex items-center gap-2">
            <Workflow className="w-4 h-4 text-[#B86428]" />
            <span>MAPPING: SOURCE → EVIDENCE → FINDING → INSIGHT</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-xs border-collapse">
              <thead>
                <tr className="bg-[#FFF8E7] border-b-2 border-[#DFC9A2] text-[#2D1B12] font-bold">
                  <th className="p-2.5 font-pixel text-[11px]">NGUỒN (SOURCE)</th>
                  <th className="p-2.5">BẰNG CHỨNG THỰC TẾ (EVIDENCE)</th>
                  <th className="p-2.5">PHÁT HIỆN (FINDING)</th>
                  <th className="p-2.5 text-[#B86428]">INSIGHT CỐT LÕI (INSIGHT)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAD9B0] text-[#4A3326]">
                <tr>
                  <td className="p-2.5 font-semibold text-sky-900">Analytics Funnel</td>
                  <td className="p-2.5">Drop-off 62% tại màn hình tải hồ sơ</td>
                  <td className="p-2.5">Khách hàng bị choáng ngợp bởi danh sách 15 mục giấy tờ không rõ định dạng</td>
                  <td className="p-2.5 font-semibold text-[#2D1B12] bg-[#FFF9EB]">
                    Khách hàng cần một bài tự kiểm tra (Readiness Check) trước khi bắt đầu tải file.
                  </td>
                </tr>
                <tr>
                  <td className="p-2.5 font-semibold text-emerald-900">User Interview</td>
                  <td className="p-2.5">Người làm hồ sơ (Kế toán) khác người ký duyệt (CEO)</td>
                  <td className="p-2.5">Sản phẩm hiện tại thiết kế như hành trình của 1 cá nhân đơn lẻ</td>
                  <td className="p-2.5 font-semibold text-[#2D1B12] bg-[#FFF9EB]">
                    Đây là hành trình phối hợp đa vai trò, cần tách biệt luồng soạn thảo và màn hình tóm tắt duyệt.
                  </td>
                </tr>
                <tr>
                  <td className="p-2.5 font-semibold text-purple-900">RM Operations</td>
                  <td className="p-2.5">70% khách gọi RM xin danh mục tài liệu chuẩn</td>
                  <td className="p-2.5">Handoff giữa kênh Digital và RM bị đứt đoạn, mất dữ liệu đã nhập</td>
                  <td className="p-2.5 font-semibold text-[#2D1B12] bg-[#FFF9EB]">
                    RM không phải bằng chứng self-service thất bại; RM là một phần tự nhiên của hành trình cần được số hóa handoff.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =========================================================================
       * SECTION 04 — CURRENT CUSTOMER JOURNEY MAP
       * ========================================================================= */}
      <section id="sec-04" className="space-y-6 pt-4 scroll-mt-16 border-t-2 border-[#EAD9B0]">
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-pixel text-xs sm:text-sm font-bold text-[#B86428] uppercase">
            <span className="px-2 py-0.5 rounded bg-[#F4C542]/30 border border-[#B86428]/40">
              04 / CUSTOMER JOURNEY MAP
            </span>
          </div>
          <h2 className="font-pixel text-2xl sm:text-3xl font-bold text-[#2D1B12]">
            Ba insight lớn định hình hướng giải quyết
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#5A4030] leading-relaxed max-w-3xl">
            Bản đồ hành trình chi tiết 7 giai đoạn trải nghiệm hiện tại, đối soát giữa hành động của khách hàng, bằng chứng định lượng, phản hồi phỏng vấn và các điểm đau thực tế.
          </p>
        </div>

        {/* Wide Visual Journey Map */}
        <div className="p-4 sm:p-6 rounded-[10px] bg-[#FFFDF7] border-2 border-[#CBB892] shadow-[0_4px_0_#A89571] space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-pixel text-xs sm:text-sm font-bold text-[#2D1B12] flex items-center gap-2">
              <Workflow className="w-4 h-4 text-[#B86428]" />
              <span>7 BƯỚC HÀNH TRÌNH KHÁCH HÀNG (END-TO-END JOURNEY)</span>
            </span>
            <button
              onClick={() => setLightboxImage('/assets/lending-flow.webp')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#FFF4D6] border border-[#B86428] font-pixel text-xs text-[#7A3F1F] font-bold hover:bg-[#FFECC2] transition-colors cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Phóng to Journey</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-2.5 pt-1">
            {[
              {
                step: '01. Tìm hiểu',
                action: 'Truy cập banner BIZ MBBank tìm gói vay máy móc/nhà xưởng',
                data: '74% click bắt đầu',
                pain: 'Không biết doanh nghiệp mình có đủ điều kiện hạn mức hay không'
              },
              {
                step: '02. Khởi tạo',
                action: 'Nhập thông tin doanh thu và nhu cầu vốn dự kiến',
                data: 'Drop-off 15%',
                pain: 'Trường nhập cứng nhắc, bắt cam kết hạn mức quá chi tiết từ đầu'
              },
              {
                step: '03. Chuẩn bị hồ sơ',
                action: 'Thu thập báo cáo tài chính, thuế, phương án phương tiện',
                data: 'Drop-off 62%',
                pain: '15 mục checklist tĩnh không phân loại theo ngành nghề, file hay bị lỗi dung lượng'
              },
              {
                step: '04. Phê duyệt nội bộ',
                action: 'Chuyển kế toán trưởng xem xét rồi gửi CEO duyệt',
                data: 'Thời gian trễ 3-7 ngày',
                pain: 'CEO đi công tác không thể mở hàng chục file chứng từ trên điện thoại'
              },
              {
                step: '05. Gửi ngân hàng',
                action: 'Ký số USB Token trên trình duyệt máy tính gửi MBBank',
                data: 'Lỗi cắm token 22%',
                pain: 'Xung đột driver trình duyệt, không có thông báo xác nhận gửi thành công'
              },
              {
                step: '06. Theo dõi',
                action: 'Đăng nhập định kỳ kiểm tra tiến độ giải ngân',
                data: 'Login 4 lần/ngày',
                pain: 'Trạng thái duy nhất "Đang xử lý", không biết đang dừng ở phòng ban nào'
              },
              {
                step: '07. RM hỗ trợ',
                action: 'Gọi điện thoại hoặc nhắn tin Zalo cho RM chi nhánh',
                data: '70% liên hệ thủ công',
                pain: 'RM không xem được dữ liệu nháp của khách, phải gửi lại tài liệu từ đầu'
              }
            ].map((j, idx) => (
              <div
                key={idx}
                className="p-3 rounded-[6px] bg-[#FFF8E7] border border-[#DFC9A2] flex flex-col justify-between space-y-2 text-xs"
              >
                <div className="space-y-1">
                  <div className="font-pixel text-[11px] font-bold text-[#B86428]">
                    {j.step}
                  </div>
                  <p className="font-sans text-[11px] text-[#2D1B12] leading-tight font-medium">
                    {j.action}
                  </p>
                </div>

                <div className="space-y-1.5 pt-1.5 border-t border-[#DFC9A2]/60 text-[10px]">
                  <div className="text-sky-800 font-mono">
                    📊 <strong>Data:</strong> {j.data}
                  </div>
                  <div className="text-red-800 bg-red-50 p-1 rounded border border-red-200">
                    ⚠️ <strong>Pain:</strong> {j.pain}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Core Insights Convergence */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-5 rounded-[8px] bg-[#FFF4D6] border-2 border-[#7A3F1F] shadow-[0_3px_0_#542B15] space-y-2">
            <span className="font-pixel text-xs font-bold text-[#7A3F1F] px-2 py-0.5 rounded bg-white">
              INSIGHT 01
            </span>
            <h3 className="font-pixel text-sm font-bold text-[#2D1B12]">
              Khách hàng cần biết mình đã sẵn sàng hay chưa
            </h3>
            <p className="font-sans text-xs text-[#5A4030] leading-relaxed">
              Khách hàng không muốn mất hàng giờ thu thập báo cáo tài chính rồi mới biết mình thiếu điều kiện thời gian hoạt động hoặc tỷ lệ nợ/vốn. Họ cần một bộ lọc sơ tuyển nhanh 60 giây.
            </p>
          </div>

          <div className="p-5 rounded-[8px] bg-[#FFF4D6] border-2 border-[#7A3F1F] shadow-[0_3px_0_#542B15] space-y-2">
            <span className="font-pixel text-xs font-bold text-[#7A3F1F] px-2 py-0.5 rounded bg-white">
              INSIGHT 02
            </span>
            <h3 className="font-pixel text-sm font-bold text-[#2D1B12]">
              Đây là hành trình phối hợp của nhiều vai trò
            </h3>
            <p className="font-sans text-xs text-[#5A4030] leading-relaxed">
              Nhân viên nhập liệu cần checklist chi tiết; Kế toán trưởng cần kiểm soát chất lượng hồ sơ; CEO chỉ cần 1 màn hình Decision Summary tóm tắt để ký duyệt nhanh bằng sinh trắc học.
            </p>
          </div>

          <div className="p-5 rounded-[8px] bg-[#FFF4D6] border-2 border-[#7A3F1F] shadow-[0_3px_0_#542B15] space-y-2">
            <span className="font-pixel text-xs font-bold text-[#7A3F1F] px-2 py-0.5 rounded bg-white">
              INSIGHT 03
            </span>
            <h3 className="font-pixel text-sm font-bold text-[#2D1B12]">
              RM là một phần của hành trình nhưng handoff bị đứt đoạn
            </h3>
            <p className="font-sans text-xs text-[#5A4030] leading-relaxed">
              Khách hàng không muốn loại bỏ hoàn toàn con người trong khoản vay lớn. Vấn đề là khi chuyển sang RM, dữ liệu đã nhập trên app bị biến mất và khách hàng phải làm lại từ đầu.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
       * SECTION 05 — HMW & PRIORITIZATION (CƠ HỘI & ƯU TIÊN)
       * ========================================================================= */}
      <section id="sec-05" className="space-y-6 pt-4 scroll-mt-16 border-t-2 border-[#EAD9B0]">
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-pixel text-xs sm:text-sm font-bold text-[#B86428] uppercase">
            <span className="px-2 py-0.5 rounded bg-[#F4C542]/30 border border-[#B86428]/40">
              05 / HMW & PRIORITIZATION
            </span>
          </div>
          <h2 className="font-pixel text-2xl sm:text-3xl font-bold text-[#2D1B12]">
            Từ nhiều câu hỏi đến ba cơ hội có giá trị nhất
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#5A4030] leading-relaxed max-w-3xl">
            Quá trình tư duy phân kỳ (Divergent) khám phá toàn bộ câu hỏi How Might We, sau đó hội tụ (Converge) vào 3 trụ cột cơ hội tạo ra tác động lớn nhất trong khuôn khổ MVP khả thi.
          </p>
        </div>

        {/* Divergent -> Convergent Diagram Board */}
        <div className="p-5 sm:p-7 rounded-[10px] bg-[#FFFDF7] border-2 border-[#CBB892] shadow-[0_4px_0_#A89571] space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            {/* Divergent Side */}
            <div className="space-y-3 p-4 rounded-lg bg-[#FFF8E7] border border-[#DFC9A2]">
              <div className="font-pixel text-xs font-bold text-[#7A3F1F] uppercase flex items-center gap-2">
                <span>◀ PHÂN KỲ (DIVERGENT): 4 KHU VỰC CÂU HỎI HMW</span>
              </div>
              <div className="space-y-2 font-sans text-xs">
                <div className="p-2.5 rounded bg-white border border-[#DFC9A2] text-[#4A3326]">
                  <strong>1. Readiness:</strong> Làm sao để doanh nghiệp tự đánh giá khả năng được cấp hạn mức trước khi chuẩn bị giấy tờ?
                </div>
                <div className="p-2.5 rounded bg-white border border-[#DFC9A2] text-[#4A3326]">
                  <strong>2. Documents:</strong> Làm sao để việc chuẩn bị báo cáo tài chính không còn là một bài toán mông lung và dễ sai sót?
                </div>
                <div className="p-2.5 rounded bg-white border border-[#DFC9A2] text-[#4A3326]">
                  <strong>3. Collaboration:</strong> Làm sao để người soạn thảo và người phê duyệt C-Level phối hợp nhịp nhàng trên 2 thiết bị khác nhau?
                </div>
                <div className="p-2.5 rounded bg-white border border-[#DFC9A2] text-[#4A3326]">
                  <strong>4. Tracking & Support:</strong> Làm sao để khách hàng luôn cảm thấy kiểm soát tiến độ và RM tiếp ứng đúng lúc?
                </div>
              </div>
            </div>

            {/* Convergent Side */}
            <div className="space-y-3 p-4 rounded-lg bg-[#EAF8E7] border border-[#BDE3B6]">
              <div className="font-pixel text-xs font-bold text-[#15803D] uppercase flex items-center gap-2">
                <span>▶ HỘI TỤ (CONVERGE): 3 CƠ HỘI ĐỘT PHÁ CỐT LÕI</span>
              </div>
              <div className="space-y-2.5 font-sans text-xs">
                <div className="p-3 rounded bg-white border border-[#BDE3B6] space-y-1">
                  <span className="font-pixel text-[11px] font-bold text-[#15803D] uppercase">01. Readiness & Dynamic Preparation</span>
                  <p className="text-[#2D452F]">
                    Xây dựng luồng tiền kiểm tra 60 giây và danh mục hồ sơ động gợi ý chính xác theo loại hình vay và ngành nghề kinh doanh.
                  </p>
                </div>
                <div className="p-3 rounded bg-white border border-[#BDE3B6] space-y-1">
                  <span className="font-pixel text-[11px] font-bold text-[#15803D] uppercase">02. Multi-role Collaborative Flow</span>
                  <p className="text-[#2D452F]">
                    Tách luồng soạn thảo chi tiết trên Web Portal cho kế toán và màn hình Decision Summary duyệt nhanh 1-chạm trên Mobile cho CEO.
                  </p>
                </div>
                <div className="p-3 rounded bg-white border border-[#BDE3B6] space-y-1">
                  <span className="font-pixel text-[11px] font-bold text-[#15803D] uppercase">03. Transparent Tracking & Contextual RM Handoff</span>
                  <p className="text-[#2D452F]">
                    Minh bạch hóa timeline 4 giai đoạn cụ thể và tạo cầu nối 1-chạm cho RM tiếp nhận nguyên vẹn dữ liệu nháp của khách hàng.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Prioritization Matrix: In Scope vs Out of Scope */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-[8px] bg-[#FFFDF7] border-2 border-[#86EFAC] shadow-[0_3px_0_#4ADE80] space-y-3">
            <div className="font-pixel text-xs sm:text-sm font-bold text-[#166534] uppercase flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
              <span>ƯU TIÊN HÀNG ĐẦU TRONG MVP (IN-SCOPE)</span>
            </div>
            <ul className="space-y-2 font-sans text-xs text-[#14532D]">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Readiness Check:</strong> Kiểm tra tính khả thi và điều kiện hồ sơ trong 60 giây trước khi bắt đầu.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Dynamic Checklist:</strong> Bảng kiểm hồ sơ phân loại thông minh theo ngành nghề và tính năng tự động lưu nháp.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Decision Summary:</strong> Màn hình tóm tắt hồ sơ và ký số Smart CA sinh trắc học trên Mobile App.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Transparent Tracking:</strong> Timeline trạng thái chi tiết theo phòng ban thẩm định và nút kết nối RM có ngữ cảnh.</span>
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-[8px] bg-[#FFFDF7] border-2 border-[#FCA5A5] shadow-[0_3px_0_#F87171] space-y-3">
            <div className="font-pixel text-xs sm:text-sm font-bold text-[#991B1B] uppercase flex items-center gap-2">
              <X className="w-4 h-4 text-[#DC2626]" />
              <span>CHƯA ƯU TIÊN / NGOÀI PHẠM VI MVP (OUT-OF-SCOPE)</span>
            </div>
            <ul className="space-y-2 font-sans text-xs text-[#7F1D1D]">
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">✗</span>
                <span><strong>Credit Policy Changes:</strong> Không can thiệp thay đổi chính sách tín dụng hoặc khẩu vị rủi ro của MBBank.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">✗</span>
                <span><strong>Full Digital Assessment:</strong> Không cố gắng thay thế 100% việc thẩm định thực địa tài sản bảo đảm của các khoản vay trên 50 tỷ.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">✗</span>
                <span><strong>Automatic Large Loan Approval:</strong> Khoản vay trung dài hạn CIB đòi hỏi Hội đồng tín dụng phê duyệt, không thể giải ngân tự động tức thì.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* =========================================================================
       * SECTION 06 — EXPERIENCE STRATEGY (CHIẾN LƯỢC TRẢI NGHIỆM)
       * ========================================================================= */}
      <section id="sec-06" className="space-y-6 pt-4 scroll-mt-16 border-t-2 border-[#EAD9B0]">
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-pixel text-xs sm:text-sm font-bold text-[#B86428] uppercase">
            <span className="px-2 py-0.5 rounded bg-[#F4C542]/30 border border-[#B86428]/40">
              06 / EXPERIENCE STRATEGY
            </span>
          </div>
          <h2 className="font-pixel text-2xl sm:text-3xl font-bold text-[#2D1B12]">
            Từ cơ hội ưu tiên đến 5 trụ cột trải nghiệm
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#5A4030] leading-relaxed max-w-3xl">
            Để giải quyết triệt để sự gián đoạn giữa kênh số và thực tế vận hành, tôi đề xuất chiến lược xây dựng 5 trụ cột trải nghiệm vững chắc.
          </p>
        </div>

        {/* Key Statement Callout */}
        <div className="p-5 sm:p-6 rounded-[10px] bg-[#FFF8E7] border-2 border-[#B86428] shadow-[0_4px_0_#7A3F1F] text-center space-y-2">
          <span className="font-pixel text-xs text-[#B86428] uppercase font-bold tracking-widest">
            ★ CHIẾN LƯỢC CỐT LÕI (STRATEGIC PILLAR STATEMENT) ★
          </span>
          <blockquote className="font-sans text-base sm:text-xl font-bold text-[#2D1B12] leading-snug max-w-3xl mx-auto">
            “Chúng tôi không cố gắng loại bỏ Relationship Manager (RM) khỏi hành trình. Chúng tôi thiết kế lại cách Digital và RM phối hợp để khách hàng không bao giờ bị mất dữ liệu, mất ngữ cảnh và mất cảm giác kiểm soát.”
          </blockquote>
        </div>

        {/* 5 Quest Checkpoints / Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 pt-1">
          {[
            {
              num: '01',
              title: 'Chuẩn bị trước khi bắt đầu',
              desc: 'Bộ lọc Readiness Check 60 giây giúp khách hàng biết chính xác điều kiện và tài liệu cần thiết trước khi bắt tay thực hiện.'
            },
            {
              num: '02',
              title: 'Hướng dẫn theo ngữ cảnh',
              desc: 'Mỗi trường nhập và loại hồ sơ đều có gợi ý dung lượng, định dạng file chuẩn và ví dụ trực quan ngay tại chỗ.'
            },
            {
              num: '03',
              title: 'Phối hợp đúng vai trò',
              desc: 'Tách bạch trải nghiệm: Web Portal cho Kế toán soạn thảo & tải file; Mobile App cho CEO xem tóm tắt và duyệt 1-chạm.'
            },
            {
              num: '04',
              title: 'Minh bạch sau khi gửi',
              desc: 'Timeline 4 bước cập nhật thời gian thực, hiển thị rõ ai đang xử lý, cần làm gì tiếp theo và thời gian dự kiến.'
            },
            {
              num: '05',
              title: 'Digital & RM là một hành trình',
              desc: 'Nút kết nối RM chia sẻ toàn bộ trạng thái và bản nháp hồ sơ để RM tư vấn trúng đích mà không bắt nhập lại.'
            }
          ].map((p, idx) => (
            <div
              key={idx}
              className="p-4 rounded-[8px] bg-[#FFFDF7] border-2 border-[#CBB892] shadow-[0_3px_0_#A89571] flex flex-col justify-between space-y-2 hover:-translate-y-0.5 transition-transform"
            >
              <div className="space-y-1.5">
                <span className="font-pixel text-xs font-bold text-[#2D1B12] px-2 py-0.5 rounded bg-[#F4C542]">
                  PILLAR {p.num}
                </span>
                <h3 className="font-pixel text-xs sm:text-sm font-bold text-[#2D1B12] pt-1">
                  {p.title}
                </h3>
              </div>
              <p className="font-sans text-[11px] sm:text-xs text-[#5A4030] leading-relaxed pt-2 border-t border-[#DFC9A2]">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
       * SECTION 07 — FLOW & PROTOTYPE (VISUAL CLIMAX 01)
       * ========================================================================= */}
      <section id="sec-07" className="space-y-6 pt-4 scroll-mt-16 border-t-2 border-[#EAD9B0]">
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-pixel text-xs sm:text-sm font-bold text-[#B86428] uppercase">
            <span className="px-2 py-0.5 rounded bg-[#F4C542]/30 border border-[#B86428]/40">
              07 / FLOW & PROTOTYPE • VISUAL CLIMAX 01
            </span>
          </div>
          <h2 className="font-pixel text-2xl sm:text-3xl font-bold text-[#2D1B12]">
            Từ chiến lược thành một hành trình có thể trải nghiệm
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#5A4030] leading-relaxed max-w-3xl">
            Sơ đồ User Flow toàn trình 9 bước tích hợp đồng bộ giữa Web Portal và Mobile App, đi kèm nguyên mẫu tương tác thực tế (Interactive Prototype).
          </p>
        </div>

        {/* 9 Steps Flow Badges */}
        <div className="p-4 rounded-[8px] bg-[#FFF8E7] border border-[#DFC9A2] overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max text-xs font-pixel font-bold text-[#2D1B12]">
            {[
              'Khởi tạo nhu cầu',
              'Readiness Check',
              'Chuẩn bị hồ sơ',
              'Upload & Validate',
              'Xác nhận nội bộ',
              'CEO Phê duyệt',
              'Gửi MBBank',
              'Theo dõi Timeline',
              'RM Support'
            ].map((step, sIdx) => (
              <React.Fragment key={sIdx}>
                <span className="px-2.5 py-1 rounded bg-white border border-[#CBB892] shadow-xs">
                  {sIdx + 1}. {step}
                </span>
                {sIdx < 8 && <ArrowRight className="w-3.5 h-3.5 text-[#B86428] shrink-0" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Full-width Flow Viewer Container */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-pixel text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase flex items-center gap-2">
              <Workflow className="w-4 h-4 text-[#B86428]" />
              <span>SƠ ĐỒ HÀNH TRÌNH TƯƠNG TÁC (USER FLOW DIAGRAM)</span>
            </h3>
            <button
              onClick={() => setLightboxImage('/assets/lending-flow.webp')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[5px] bg-[#F4C542] hover:bg-[#FFD55C] border-2 border-[#4A2414] text-[#2D1B12] font-pixel text-xs font-bold shadow-[0_2px_0_#4A2414] active:translate-y-0.5 cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>XEM TOÀN BỘ FLOW (LIGHTBOX)</span>
            </button>
          </div>

          {/* Interactive Flow Box with Fallback */}
          <div
            onClick={() => setLightboxImage('/assets/lending-flow.webp')}
            className="group relative rounded-[10px] bg-[#0E1A2E] border-2 sm:border-3 border-[#CBB892] shadow-[0_6px_0_#A89571] overflow-hidden p-6 text-center cursor-pointer min-h-[220px] sm:min-h-[320px] flex flex-col items-center justify-center space-y-3 hover:border-[#F4C542] transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-blue-900/60 border border-sky-400/40 flex items-center justify-center text-sky-300 group-hover:scale-110 transition-transform">
              <Workflow className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="font-pixel text-sm sm:text-base text-sky-200 font-bold">
                BẢN ĐỒ TOÀN TRÌNH USER FLOW: BIZ MBBANK LENDING
              </div>
              <p className="font-sans text-xs text-slate-400 max-w-lg mx-auto">
                Nhấp để mở sơ đồ độ phân giải cao dạng Lightbox tương tác, hiển thị đầy đủ các điểm rẽ nhánh logic và các trường dữ liệu tự động validate.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-sky-500/20 text-sky-300 font-pixel text-[11px] border border-sky-500/40">
              <span>✦ Click để mở Fullscreen</span>
            </div>
          </div>
        </div>

        {/* Prototype Video Player in Voxel Monitor Frame */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="font-pixel text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase flex items-center gap-2">
              <Play className="w-4 h-4 text-[#B86428]" />
              <span>NGUYÊN MẪU TƯƠNG TÁC THỰC TẾ (INTERACTIVE PROTOTYPE VIDEO)</span>
            </h3>
            <span className="font-mono text-[11px] text-[#7A3F1F] font-semibold">Duration: 01:24 • Scenario: Cấp TDH 85 Tỷ</span>
          </div>

          {/* Voxel Monitor Frame */}
          <div className="rounded-[14px] bg-[#22130B] p-3 sm:p-5 border-4 border-[#4A2414] shadow-[0_8px_0_#1E0D06] space-y-2">
            {/* Monitor Top Bar */}
            <div className="flex items-center justify-between px-2 pb-2 text-[10px] font-pixel text-[#DFC9A2] border-b border-[#3B1D0F]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span className="w-2 h-2 rounded-full bg-yellow-500" />
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span className="ml-1 text-[#F4C542]">VOXEL MONITOR • BIZ MBBANK PROTOTYPE PLAYER</span>
              </div>
              <span className="text-[#D9D2BF]">1920 x 1080 FHD</span>
            </div>

            {/* Video Screen Surface */}
            <div className="relative rounded-[8px] bg-[#0A1220] overflow-hidden min-h-[300px] sm:min-h-[460px] flex flex-col items-center justify-center p-4">
              {/* Media Slot Placeholder / Video container */}
              <div className="text-center space-y-3 max-w-md">
                <div className="w-16 h-16 rounded-full bg-blue-600/30 border-2 border-sky-400 flex items-center justify-center text-sky-300 mx-auto shadow-lg shadow-sky-500/20">
                  <Play className="w-7 h-7 ml-1" />
                </div>
                <div className="space-y-1">
                  <div className="font-pixel text-base sm:text-lg font-bold text-white tracking-wide">
                    [ PROTOTYPE VIDEO • BIZ MBBANK LENDING ]
                  </div>
                  <p className="font-sans text-xs text-slate-300 leading-relaxed">
                    Kịch bản xuyên suốt: Readiness Check → Dynamic Checklist → Upload & Auto-save → Decision Summary trên Mobile → Ký số Smart CA → Timeline theo dõi.
                  </p>
                </div>
                <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono text-[10px] border border-slate-700">
                    /assets/lending-prototype.mp4
                  </span>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-pixel text-[10px] border border-emerald-500/40">
                    Auto-loop • Muted • 60fps
                  </span>
                </div>
              </div>

              {/* Video Player Overlay Controls Bar */}
              <div className="absolute bottom-3 inset-x-3 rounded-[6px] bg-slate-900/90 backdrop-blur-md p-2 flex items-center justify-between border border-slate-700 text-white text-xs font-pixel">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                    className="p-1 hover:text-sky-400 transition-colors cursor-pointer"
                  >
                    {isPlayingVideo ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setIsMutedVideo(!isMutedVideo)}
                    className="p-1 hover:text-sky-400 transition-colors cursor-pointer"
                  >
                    {isMutedVideo ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <span className="text-[10px] text-slate-300 font-mono hidden sm:inline">00:42 / 01:24</span>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>KỊCH BẢN DOANH NGHIỆP CẤP TDH</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
       * SECTION 08 — PRODUCT SOLUTION (CHI TIẾT GIẢI PHÁP UI)
       * ========================================================================= */}
      <section id="sec-08" className="space-y-8 pt-4 scroll-mt-16 border-t-2 border-[#EAD9B0]">
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-pixel text-xs sm:text-sm font-bold text-[#B86428] uppercase">
            <span className="px-2 py-0.5 rounded bg-[#F4C542]/30 border border-[#B86428]/40">
              08 / PRODUCT SOLUTION SHOWCASE
            </span>
          </div>
          <h2 className="font-pixel text-2xl sm:text-3xl font-bold text-[#2D1B12]">
            Mỗi màn hình tồn tại vì một insight cụ thể
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#5A4030] leading-relaxed max-w-3xl">
            Không sử dụng lưới card đồng dạng, tôi thiết kế theo cấu trúc Editorial Showcase: Mỗi giải pháp giải quyết trực diện một điểm nghẽn bằng UI chân thực của ngân hàng số BIZ MBBank.
          </p>
        </div>

        {/* SOLUTION 01: Readiness Screen */}
        <div className="p-5 sm:p-7 rounded-[10px] bg-[#FFFDF7] border-2 border-[#CBB892] shadow-[0_4px_0_#A89571] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DFC9A2] pb-3">
            <div className="flex items-center gap-2">
              <span className="font-pixel text-xs font-bold text-white px-2 py-0.5 rounded bg-[#176B73]">
                SOLUTION 01
              </span>
              <h3 className="font-pixel text-base sm:text-lg font-bold text-[#2D1B12]">
                Readiness Screen — Kiểm tra điều kiện trong 60 giây
              </h3>
            </div>
            <span className="font-sans text-xs text-[#7A3F1F] font-semibold">Web & Mobile Pre-flight</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 space-y-3 font-sans text-xs sm:text-sm text-[#4A3326]">
              <div className="p-2.5 rounded bg-red-50 border border-red-200 text-red-900 text-xs">
                <strong>Insight giải quyết:</strong> Khách hàng chưa biết mình có đủ điều kiện hay không nhưng đã bị bắt tải hàng chục file chứng từ.
              </div>
              <p className="leading-relaxed">
                <strong>Thiết kế:</strong> Một màn hình sơ duyệt với 3 câu hỏi nhanh về mục đích vốn, doanh thu năm liền kề và thời gian hoạt động. Hệ thống kết nối cơ sở dữ liệu thuế để tự điền và đưa ra phản hồi: <em>“Doanh nghiệp đủ điều kiện tiếp cận gói TDH hạn mức tối đa 100 Tỷ”</em>.
              </p>
              <ul className="space-y-1.5 text-xs text-[#5A4030]">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" />
                  <span>Không lưu vết từ chối tín dụng nếu chưa đủ điều kiện</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" />
                  <span>Ước tính biên độ lãi suất & thời hạn vay khả thi</span>
                </li>
              </ul>
            </div>

            {/* Realistic UI Simulation */}
            <div className="lg:col-span-7 rounded-[8px] bg-[#0E1A2E] p-4 text-white font-sans text-xs space-y-3 border border-blue-900/60 shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[10px]">
                <span className="font-bold text-sky-300">BIZ MBBank • KIỂM TRA ĐIỀU KIỆN SƠ BỘ</span>
                <span className="text-emerald-400 font-mono">Thời gian: 60 Giây</span>
              </div>
              <div className="space-y-2 text-[11px]">
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <span>Mục đích vay vốn:</span>
                  <strong className="text-sky-300">Đầu tư mở rộng nhà xưởng & máy móc</strong>
                </div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <span>Doanh thu báo cáo năm gần nhất:</span>
                  <strong className="text-sky-300 font-mono">142.5 Tỷ VNĐ</strong>
                </div>
                <div className="p-3 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-bold text-white">Đủ điều kiện tiếp cận hạn mức đề xuất!</div>
                    <div className="text-[11px] text-emerald-300">Hạn mức khả dụng dự kiến: 80 - 100 Tỷ VNĐ</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SOLUTION 02: Dynamic Checklist */}
        <div className="p-5 sm:p-7 rounded-[10px] bg-[#FFFDF7] border-2 border-[#CBB892] shadow-[0_4px_0_#A89571] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DFC9A2] pb-3">
            <div className="flex items-center gap-2">
              <span className="font-pixel text-xs font-bold text-white px-2 py-0.5 rounded bg-[#176B73]">
                SOLUTION 02
              </span>
              <h3 className="font-pixel text-base sm:text-lg font-bold text-[#2D1B12]">
                Dynamic Checklist & Smart File Parser
              </h3>
            </div>
            <span className="font-sans text-xs text-[#7A3F1F] font-semibold">Web Portal Upload Engine</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* UI Mockup on Left */}
            <div className="lg:col-span-7 rounded-[8px] bg-[#0E1A2E] p-4 text-white font-sans text-xs space-y-3 border border-blue-900/60 shadow-lg order-2 lg:order-1">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[10px]">
                <span className="font-bold text-sky-300">HỒ SƠ TÀI CHÍNH • PHÂN KHÚC CÔNG NGHIỆP CHẾ TẠO</span>
                <span className="text-amber-400 font-mono">Tự động lưu nháp 14:28</span>
              </div>
              <div className="space-y-2 text-[11px]">
                <div className="p-2.5 rounded bg-slate-900 border border-emerald-500/50 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Báo cáo tài chính kiểm toán 2024 (PDF)</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono">Hợp lệ • 18.2 MB</span>
                </div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <FileUp className="w-4 h-4 text-sky-400" />
                    <span>Quyết định phê duyệt dự án đầu tư</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-sky-500/20 text-sky-300">Kéo thả file vào đây</span>
                </div>
                <div className="p-2 rounded bg-amber-950/40 border border-amber-500/30 text-amber-200 text-[10px] flex items-center justify-between">
                  <span>💡 Hỗ trợ tải lên file PDF, XLSX lên tới 50MB. Hệ thống tự nhận diện mục lục.</span>
                  <span className="text-sky-300 underline cursor-pointer">Tải file mẫu chuẩn</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-3 font-sans text-xs sm:text-sm text-[#4A3326] order-1 lg:order-2">
              <div className="p-2.5 rounded bg-red-50 border border-red-200 text-red-900 text-xs">
                <strong>Insight giải quyết:</strong> Khách hàng choáng ngợp trước danh sách hồ sơ tĩnh không liên quan và hay bị lỗi định dạng khi nộp.
              </div>
              <p className="leading-relaxed">
                <strong>Thiết kế:</strong> Danh mục hồ sơ động (Dynamic Checklist) co giãn theo ngành nghề. Nếu doanh nghiệp vay mua máy móc, hệ thống chỉ yêu cầu hợp đồng kinh tế và tờ khai hải quan; loại bỏ các giấy tờ không cần thiết.
              </p>
              <ul className="space-y-1.5 text-xs text-[#5A4030]">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" />
                  <span>Validation tức thời dung lượng và định dạng</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" />
                  <span>Tính năng Auto-save tự động lưu mỗi khi tải xong 1 file</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* SOLUTION 03: Approver Decision Summary */}
        <div className="p-5 sm:p-7 rounded-[10px] bg-[#FFFDF7] border-2 border-[#CBB892] shadow-[0_4px_0_#A89571] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DFC9A2] pb-3">
            <div className="flex items-center gap-2">
              <span className="font-pixel text-xs font-bold text-white px-2 py-0.5 rounded bg-[#176B73]">
                SOLUTION 03
              </span>
              <h3 className="font-pixel text-base sm:text-lg font-bold text-[#2D1B12]">
                Creator Flow + Approver Decision Summary
              </h3>
            </div>
            <span className="font-sans text-xs text-[#7A3F1F] font-semibold">Multi-role Collaboration</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-6 space-y-3 font-sans text-xs sm:text-sm text-[#4A3326]">
              <div className="p-2.5 rounded bg-red-50 border border-red-200 text-red-900 text-xs">
                <strong>Insight giải quyết:</strong> CEO/CFO từ chối đọc hàng chục file đính kèm trên mobile và không mang USB Token khi đi công tác.
              </div>
              <p className="leading-relaxed">
                <strong>Thiết kế:</strong> Màn hình Decision Summary chắt lọc toàn bộ hồ sơ thành 1 trang cô đọng: Nhu cầu vốn, Dòng tiền trả nợ, Ý kiến kiểm soát của Kế toán trưởng. Tích hợp chữ ký số đám mây (Smart CA) ký duyệt bằng FaceID ngay trên điện thoại.
              </p>
              <ul className="space-y-1.5 text-xs text-[#5A4030]">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" />
                  <span>Tách biệt hoàn toàn quyền Soạn thảo vs Quyền Phê duyệt</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" />
                  <span>Ký duyệt bảo mật cấp ngân hàng mọi lúc mọi nơi</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-6 rounded-[8px] bg-[#0E1A2E] p-4 text-white font-sans text-xs space-y-3 border border-blue-900/60 shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[10px]">
                <span className="font-bold text-sky-300">TÓM TẮT TRÌNH PHÊ DUYỆT (DECISION SUMMARY)</span>
                <span className="text-emerald-400 font-mono">Bảo mật FaceID</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-400">Hạn mức đề nghị:</div>
                  <div className="text-sm font-bold text-emerald-400 font-mono mt-0.5">85 Tỷ VNĐ</div>
                </div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-400">Tỷ lệ đảm bảo nợ:</div>
                  <div className="text-sm font-bold text-sky-400 font-mono mt-0.5">145% (BĐS + Máy móc)</div>
                </div>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[10px] space-y-1">
                <div className="text-slate-300 font-semibold">Ý kiến kế toán trưởng:</div>
                <div className="text-slate-400 italic">“Đã rà soát báo cáo dòng tiền dự án 5 năm, đủ khả năng hoàn nợ theo quý.”</div>
              </div>
            </div>
          </div>
        </div>

        {/* SOLUTION 04 & 05: Timeline & Contextual RM Handoff */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Solution 04 */}
          <div className="p-5 sm:p-6 rounded-[10px] bg-[#FFFDF7] border-2 border-[#CBB892] shadow-[0_4px_0_#A89571] space-y-3">
            <div className="flex items-center gap-2 border-b border-[#DFC9A2] pb-2.5">
              <span className="font-pixel text-xs font-bold text-white px-2 py-0.5 rounded bg-[#176B73]">
                SOLUTION 04
              </span>
              <h3 className="font-pixel text-sm sm:text-base font-bold text-[#2D1B12]">
                Status Timeline & Next Action Guidance
              </h3>
            </div>
            <p className="font-sans text-xs text-[#4A3326] leading-relaxed">
              Thay thế thông báo "Đang xử lý" mơ hồ bằng Timeline 4 giai đoạn minh bạch: Ai đang xử lý (Bộ phận Thẩm định rủi ro), Hành động tiếp theo là gì và Thời gian phản hồi dự kiến.
            </p>
            <div className="p-3 rounded bg-[#0E1A2E] text-white font-sans text-xs space-y-2 border border-slate-800">
              <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800 pb-1.5">
                <span>TIẾN ĐỘ THẨM ĐỊNH MBBANK</span>
                <span className="text-sky-300">Giai đoạn 3/4</span>
              </div>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-center gap-2 text-emerald-400">
                  <span>✓</span> <span>Hồ sơ pháp lý & Tư cách doanh nghiệp (Hoàn tất)</span>
                </div>
                <div className="flex items-center gap-2 text-sky-300 font-bold bg-blue-950/60 p-1 rounded">
                  <span className="animate-pulse">●</span> <span>Thẩm định tài sản bảo đảm & Dòng tiền (Đang thực hiện)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <span>○</span> <span>Hội đồng tín dụng ra quyết định phê duyệt</span>
                </div>
              </div>
            </div>
          </div>

          {/* Solution 05 */}
          <div className="p-5 sm:p-6 rounded-[10px] bg-[#FFFDF7] border-2 border-[#CBB892] shadow-[0_4px_0_#A89571] space-y-3">
            <div className="flex items-center gap-2 border-b border-[#DFC9A2] pb-2.5">
              <span className="font-pixel text-xs font-bold text-white px-2 py-0.5 rounded bg-[#176B73]">
                SOLUTION 05
              </span>
              <h3 className="font-pixel text-sm sm:text-base font-bold text-[#2D1B12]">
                Contextual RM Handoff Bridge
              </h3>
            </div>
            <p className="font-sans text-xs text-[#4A3326] leading-relaxed">
              Khi khách hàng bấm nút “Nhờ RM hỗ trợ”, toàn bộ bản nháp và các lỗi thiếu file được đồng bộ sang hệ thống CRM nội bộ của RM, giúp RM nhấc máy là tư vấn ngay đúng điểm nghẽn.
            </p>
            <div className="p-3 rounded bg-[#FFF8E7] border border-[#DFC9A2] space-y-2 text-xs font-sans text-[#4A3326]">
              <div className="flex items-center justify-between font-bold text-[#2D1B12]">
                <span>Chuyên viên RM phụ trách:</span>
                <span className="text-blue-700">Nguyễn Tuấn Anh</span>
              </div>
              <p className="text-[11px] text-[#5A4030]">
                “Hồ sơ nháp của bạn đã được chuyển nguyên vẹn sang RM. Bạn không cần gửi lại tài liệu hay nhập lại thông tin.”
              </p>
              <div className="pt-1 flex gap-2">
                <button className="px-3 py-1 rounded bg-[#3B1D0F] text-[#FFF4D6] font-pixel text-xs font-bold cursor-pointer">
                  Gọi điện RM
                </button>
                <button className="px-3 py-1 rounded bg-white border border-[#CBB892] text-[#7A3F1F] font-pixel text-xs font-bold cursor-pointer">
                  Nhắn tin bảo mật
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
       * SECTION 09 — USABILITY TESTING (VISUAL CLIMAX 02)
       * ========================================================================= */}
      <section id="sec-09" className="space-y-6 pt-4 scroll-mt-16 border-t-2 border-[#EAD9B0]">
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-pixel text-xs sm:text-sm font-bold text-[#B86428] uppercase">
            <span className="px-2 py-0.5 rounded bg-[#F4C542]/30 border border-[#B86428]/40">
              09 / USABILITY TESTING • VISUAL CLIMAX 02
            </span>
          </div>
          <h2 className="font-pixel text-2xl sm:text-3xl font-bold text-[#2D1B12]">
            Kiểm chứng thiết kế bằng người dùng thật
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#5A4030] leading-relaxed max-w-3xl">
            Một thiết kế tốt không thể chỉ dựa trên giả định trong phòng họp. Tôi tổ chức 2 đợt Usability Testing với 12 người dùng đại diện cho 4 nhóm vai trò để quan sát, ghi nhận sai lệch và cải tiến liên tục.
          </p>
        </div>

        {/* 4 Iteration Stories Interactive Tabs */}
        <div className="p-5 sm:p-7 rounded-[10px] bg-[#FFFDF7] border-2 border-[#CBB892] shadow-[0_4px_0_#A89571] space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DFC9A2] pb-3">
            <div className="font-pixel text-xs sm:text-sm font-bold text-[#2D1B12] flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#B86428]" />
              <span>4 VÒNG LẶP CẢI TIẾN TRỌNG YẾU (BEFORE → EVIDENCE → AFTER)</span>
            </div>

            {/* Before / After Toggle Buttons */}
            <div className="flex items-center gap-1 bg-[#FFF4D6] p-1 rounded-[6px] border border-[#CBB892]">
              <button
                onClick={() => setActiveTestTab('after')}
                className={`px-3 py-1 rounded-[4px] font-pixel text-xs font-bold transition-all cursor-pointer ${
                  activeTestTab === 'after'
                    ? 'bg-[#15803D] text-white shadow-xs'
                    : 'text-[#7A3F1F] hover:text-[#2D1B12]'
                }`}
              >
                ★ AFTER (THIẾT KẾ MỚI)
              </button>
              <button
                onClick={() => setActiveTestTab('before')}
                className={`px-3 py-1 rounded-[4px] font-pixel text-xs font-bold transition-all cursor-pointer ${
                  activeTestTab === 'before'
                    ? 'bg-[#991B1B] text-white shadow-xs'
                    : 'text-[#7A3F1F] hover:text-[#2D1B12]'
                }`}
              >
                BEFORE (GIAO DIỆN CŨ)
              </button>
            </div>
          </div>

          {/* Iteration Selector Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { num: '01', label: 'Hạn mức đề xuất' },
              { num: '02', label: 'Báo lỗi tài liệu' },
              { num: '03', label: 'Trạng thái xử lý' },
              { num: '04', label: 'Bàn giao RM' }
            ].map((it, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIteration(idx)}
                className={`p-2 rounded-[6px] text-center font-pixel text-xs font-bold transition-all cursor-pointer border ${
                  activeIteration === idx
                    ? 'bg-[#F4C542] text-[#2D1B12] border-[#4A2414] shadow-[0_2px_0_#4A2414]'
                    : 'bg-[#FFF8E7] text-[#7A3F1F] border-[#DFC9A2] hover:bg-[#FFECC2]'
                }`}
              >
                <span>ITERATION {it.num}</span>
                <div className="font-sans font-normal text-[11px] text-[#4A3326] truncate mt-0.5">
                  {it.label}
                </div>
              </button>
            ))}
          </div>

          {/* Active Iteration Content Card */}
          {activeIteration === 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 rounded-lg bg-[#FFF8E7] border border-[#DFC9A2]">
              <div className="lg:col-span-5 space-y-2.5 font-sans text-xs">
                <div className="font-pixel text-xs text-[#B86428] font-bold uppercase">
                  VÒNG LẶP 01: LÀM RÕ THUẬT NGỮ TÀI CHÍNH
                </div>
                <div className="p-2 rounded bg-white border border-[#DFC9A2]">
                  <strong className="text-red-700">Quan sát (Observation):</strong> Khi thấy nhãn <em>“Hạn mức đề xuất: 85 Tỷ”</em>, 4/5 người dùng hiểu nhầm rằng MBBank đã duyệt số tiền này, tạo kỳ vọng sai lệch nghiêm trọng.
                </div>
                <div className="p-2 rounded bg-white border border-[#DFC9A2]">
                  <strong className="text-emerald-700">Quyết định (Decision):</strong> Đổi sang <em>“Nhu cầu vốn dự kiến”</em> và bổ sung chú thích rõ ràng về bước sơ duyệt.
                </div>
              </div>
              <div className="lg:col-span-7 rounded-[8px] p-4 font-sans text-xs flex flex-col justify-center">
                {activeTestTab === 'after' ? (
                  <div className="bg-[#0E1A2E] p-4 rounded-lg text-white border border-emerald-500/50 space-y-2">
                    <span className="text-[10px] font-pixel text-emerald-400 font-bold">★ AFTER (CẢI TIẾN)</span>
                    <div className="text-xs text-slate-300">Nhu cầu vốn dự kiến của doanh nghiệp:</div>
                    <div className="text-lg font-bold font-mono text-emerald-400">85.000.000.000 VNĐ</div>
                    <p className="text-[10px] text-slate-400 italic">
                      * Con số do doanh nghiệp đề xuất, kết quả phê duyệt chính thức căn cứ trên thẩm định rủi ro.
                    </p>
                  </div>
                ) : (
                  <div className="bg-slate-800 p-4 rounded-lg text-slate-300 border border-red-500/50 space-y-2">
                    <span className="text-[10px] font-pixel text-red-400 font-bold">BEFORE (TRƯỚC ĐÂY)</span>
                    <div className="text-xs">Hạn mức đề xuất:</div>
                    <div className="text-lg font-bold font-mono text-red-300">85.000.000.000 VNĐ</div>
                    <p className="text-[10px] text-slate-400">(Không có giải thích, gây hiểu nhầm đã được cấp)</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeIteration === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 rounded-lg bg-[#FFF8E7] border border-[#DFC9A2]">
              <div className="lg:col-span-5 space-y-2.5 font-sans text-xs">
                <div className="font-pixel text-xs text-[#B86428] font-bold uppercase">
                  VÒNG LẶP 02: BÁO LỖI HỒ SƠ CÓ HÀNH ĐỘNG KHẮC PHỤC
                </div>
                <div className="p-2 rounded bg-white border border-[#DFC9A2]">
                  <strong className="text-red-700">Quan sát (Observation):</strong> Thông báo lỗi chung chung <em>“Hồ sơ không hợp lệ”</em> khiến kế toán hoàn toàn bối rối, không biết file sai ở trang nào hay định dạng nào.
                </div>
                <div className="p-2 rounded bg-white border border-[#DFC9A2]">
                  <strong className="text-emerald-700">Quyết định (Decision):</strong> Chỉ đích danh lỗi: <em>“Báo cáo tài chính chưa đúng định dạng PDF hoặc XLSX”</em> kèm CTA <em>“Tải lại hồ sơ mẫu”</em>.
                </div>
              </div>
              <div className="lg:col-span-7 rounded-[8px] p-4 font-sans text-xs flex flex-col justify-center">
                {activeTestTab === 'after' ? (
                  <div className="bg-[#0E1A2E] p-4 rounded-lg text-white border border-emerald-500/50 space-y-2">
                    <span className="text-[10px] font-pixel text-emerald-400 font-bold">★ AFTER (CẢI TIẾN)</span>
                    <div className="p-2.5 rounded bg-red-950/60 border border-red-500/50 text-red-200 space-y-1">
                      <div className="font-bold text-xs">Báo cáo tài chính chưa đúng định dạng chuẩn!</div>
                      <div className="text-[11px] text-slate-300">Hệ thống yêu cầu file định dạng PDF hoặc XLSX dưới 50MB. Vui lòng kiểm tra lại file đã scan.</div>
                      <button className="mt-1 px-2 py-1 rounded bg-red-600 text-white font-pixel text-[10px] font-bold cursor-pointer">
                        Tải lại hồ sơ đúng chuẩn
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-800 p-4 rounded-lg text-slate-300 border border-red-500/50 space-y-2">
                    <span className="text-[10px] font-pixel text-red-400 font-bold">BEFORE (TRƯỚC ĐÂY)</span>
                    <div className="p-2 rounded bg-red-900/40 text-red-300 text-xs font-bold">
                      Lỗi: Hồ sơ không hợp lệ! (Mã lỗi: ERR_402)
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeIteration === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 rounded-lg bg-[#FFF8E7] border border-[#DFC9A2]">
              <div className="lg:col-span-5 space-y-2.5 font-sans text-xs">
                <div className="font-pixel text-xs text-[#B86428] font-bold uppercase">
                  VÒNG LẶP 03: TRẠNG THÁI TIẾN TRÌNH RÕ NGHĨA
                </div>
                <div className="p-2 rounded bg-white border border-[#DFC9A2]">
                  <strong className="text-red-700">Quan sát (Observation):</strong> Dòng chữ <em>“Đang xử lý”</em> kéo dài 3 ngày làm doanh nghiệp tưởng hệ thống bị treo hoặc nhân viên quên hồ sơ.
                </div>
                <div className="p-2 rounded bg-white border border-[#DFC9A2]">
                  <strong className="text-emerald-700">Quyết định (Decision):</strong> Hiển thị: <em>“Đang chờ phê duyệt tại Hội đồng tín dụng MBBank”</em>, chỉ rõ người phụ trách và thời hạn dự kiến.
                </div>
              </div>
              <div className="lg:col-span-7 rounded-[8px] p-4 font-sans text-xs flex flex-col justify-center">
                {activeTestTab === 'after' ? (
                  <div className="bg-[#0E1A2E] p-4 rounded-lg text-white border border-emerald-500/50 space-y-2">
                    <span className="text-[10px] font-pixel text-emerald-400 font-bold">★ AFTER (CẢI TIẾN)</span>
                    <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
                      <span className="font-bold text-sky-300">Đang chờ phê duyệt hạn mức</span>
                      <span className="text-[10px] text-amber-400">Dự kiến: Trước 17:00 Ngày mai</span>
                    </div>
                    <div className="text-[11px] text-slate-300">
                      Hồ sơ đã qua vòng Thẩm định tài sản. Đang trình Hội đồng tín dụng chi nhánh ký quyết định.
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-800 p-4 rounded-lg text-slate-300 border border-red-500/50 space-y-2">
                    <span className="text-[10px] font-pixel text-red-400 font-bold">BEFORE (TRƯỚC ĐÂY)</span>
                    <div className="text-amber-400 font-bold text-xs">Trạng thái: Đang xử lý</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeIteration === 3 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 rounded-lg bg-[#FFF8E7] border border-[#DFC9A2]">
              <div className="lg:col-span-5 space-y-2.5 font-sans text-xs">
                <div className="font-pixel text-xs text-[#B86428] font-bold uppercase">
                  VÒNG LẶP 04: BÀN GIAO CHO RELATIONSHIP MANAGER
                </div>
                <div className="p-2 rounded bg-white border border-[#DFC9A2]">
                  <strong className="text-red-700">Quan sát (Observation):</strong> Dòng chữ <em>“Chuyển RM xử lý”</em> làm người dùng cảm thấy kênh số thất bại và nghĩ phải đi nộp lại bản cứng.
                </div>
                <div className="p-2 rounded bg-white border border-[#DFC9A2]">
                  <strong className="text-emerald-700">Quyết định (Decision):</strong> Tái định vị thành: <em>“Relationship Manager đang hỗ trợ yêu cầu — Hồ sơ đã chuyển nguyên vẹn, không cần nhập lại”</em>.
                </div>
              </div>
              <div className="lg:col-span-7 rounded-[8px] p-4 font-sans text-xs flex flex-col justify-center">
                {activeTestTab === 'after' ? (
                  <div className="bg-[#0E1A2E] p-4 rounded-lg text-white border border-emerald-500/50 space-y-2">
                    <span className="text-[10px] font-pixel text-emerald-400 font-bold">★ AFTER (CẢI TIẾN)</span>
                    <div className="text-xs font-bold text-sky-300">Chuyên viên RM Tuấn Anh đang xem xét hồ sơ của bạn</div>
                    <div className="text-[11px] text-slate-300">
                      Toàn bộ bản nháp và tài liệu đã được chuyển an toàn. RM sẽ liên hệ qua điện thoại trong vòng 2 giờ làm việc.
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-800 p-4 rounded-lg text-slate-300 border border-red-500/50 space-y-2">
                    <span className="text-[10px] font-pixel text-red-400 font-bold">BEFORE (TRƯỚC ĐÂY)</span>
                    <div className="text-red-400 font-bold text-xs">Hệ thống chuyển hồ sơ sang RM xử lý thủ công.</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
       * SECTION 10 — IMPACT & REFLECTION (TÁC ĐỘNG & ĐÚC KẾT)
       * ========================================================================= */}
      <section id="sec-10" className="space-y-6 pt-4 scroll-mt-16 border-t-2 border-[#EAD9B0]">
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-pixel text-xs sm:text-sm font-bold text-[#B86428] uppercase">
            <span className="px-2 py-0.5 rounded bg-[#F4C542]/30 border border-[#B86428]/40">
              10 / IMPACT & REFLECTION
            </span>
          </div>
          <h2 className="font-pixel text-2xl sm:text-3xl font-bold text-[#2D1B12]">
            Thiết kế tốt không chỉ đơn giản hóa — nó tạo quyền kiểm soát
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#5A4030] leading-relaxed max-w-3xl">
            Tổng kết hiệu quả đo lường trung thực, tác động đa chiều và những bài học xương máu đúc kết được trong quá trình thiết kế sản phẩm tài chính doanh nghiệp quy mô lớn.
          </p>
        </div>

        {/* Honest Business Impact Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-[8px] bg-[#FFFDF7] border-2 border-[#CBB892] shadow-[0_3px_0_#A89571] text-center space-y-1">
            <div className="font-pixel text-2xl sm:text-3xl font-bold text-[#15803D]">+[XX]%</div>
            <div className="font-sans text-xs font-semibold text-[#2D1B12]">Tỷ lệ hoàn thành hồ sơ</div>
            <div className="font-sans text-[10px] text-[#7A3F1F]">Nhờ Readiness Check</div>
          </div>
          <div className="p-4 rounded-[8px] bg-[#FFFDF7] border-2 border-[#CBB892] shadow-[0_3px_0_#A89571] text-center space-y-1">
            <div className="font-pixel text-2xl sm:text-3xl font-bold text-[#15803D]">−[XX]%</div>
            <div className="font-sans text-xs font-semibold text-[#2D1B12]">Tần suất bổ sung hồ sơ</div>
            <div className="font-sans text-[10px] text-[#7A3F1F]">Checklist phân loại chuẩn</div>
          </div>
          <div className="p-4 rounded-[8px] bg-[#FFFDF7] border-2 border-[#CBB892] shadow-[0_3px_0_#A89571] text-center space-y-1">
            <div className="font-pixel text-2xl sm:text-3xl font-bold text-[#15803D]">−[XX]%</div>
            <div className="font-sans text-xs font-semibold text-[#2D1B12]">Thời gian chuẩn bị đơn</div>
            <div className="font-sans text-[10px] text-[#7A3F1F]">Từ 5 ngày còn dưới 4h</div>
          </div>
          <div className="p-4 rounded-[8px] bg-[#FFFDF7] border-2 border-[#CBB892] shadow-[0_3px_0_#A89571] text-center space-y-1">
            <div className="font-pixel text-2xl sm:text-3xl font-bold text-[#15803D]">−[XX]%</div>
            <div className="font-sans text-xs font-semibold text-[#2D1B12]">Can thiệp RM sớm</div>
            <div className="font-sans text-[10px] text-[#7A3F1F]">Giảm tải vận hành chi nhánh</div>
          </div>
        </div>

        {/* What I Did Well vs What Could Be Better */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-[8px] bg-[#FFFDF7] border-2 border-[#86EFAC] shadow-[0_3px_0_#4ADE80] space-y-3">
            <div className="font-pixel text-xs sm:text-sm font-bold text-[#166534] uppercase flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
              <span>ĐIỀU TÔI ĐÃ LÀM TỐT (WHAT I DID WELL)</span>
            </div>
            <ul className="space-y-2 font-sans text-xs text-[#14532D]">
              <li>• <strong>Chuyển đổi bài toán:</strong> Chuyển yêu cầu nghiệp vụ phức tạp của ngân hàng thành hành trình có định hướng rõ ràng cho khách hàng.</li>
              <li>• <strong>Kết hợp phương pháp:</strong> Dùng định lượng để tìm chính xác điểm gãy và dùng định tính để giải mã tâm lý người dùng.</li>
              <li>• <strong>Giữ phạm vi MVP thực tế:</strong> Không vẽ giải pháp viển vông, tập trung giải quyết triệt để 3 điểm nghẽn lớn nhất.</li>
              <li>• <strong>Cầu nối Digital & RM:</strong> Biến RM thành đồng minh của kênh số thay vì đặt hai kênh ở thế cạnh tranh.</li>
            </ul>
          </div>

          <div className="p-5 rounded-[8px] bg-[#FFFDF7] border-2 border-[#FCA5A5] shadow-[0_3px_0_#F87171] space-y-3">
            <div className="font-pixel text-xs sm:text-sm font-bold text-[#991B1B] uppercase flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#DC2626]" />
              <span>ĐIỀU CÓ THỂ LÀM TỐT HƠN (WHAT COULD BE BETTER)</span>
            </div>
            <ul className="space-y-2 font-sans text-xs text-[#7F1D1D]">
              <li>• <strong>Measurement Framework:</strong> Khung đo lường chỉ số sản phẩm chưa được thiết lập đủ sớm ngay từ giai đoạn Discovery.</li>
              <li>• <strong>Bị ảnh hưởng quy trình nội bộ:</strong> Ở những bản wireframe đầu tiên, tôi vô tình bê nguyên các bước phê duyệt nội bộ của ngân hàng vào UI người dùng.</li>
              <li>• <strong>Phỏng vấn vai trò:</strong> Chưa mời đủ đại diện pháp chế (Legal & Compliance) vào các phiên thảo luận thiết kế ban đầu.</li>
            </ul>
          </div>
        </div>

        {/* Biggest Challenge & Key Lessons */}
        <div className="p-5 sm:p-7 rounded-[10px] bg-[#FFF8E7] border-2 border-[#DFC9A2] shadow-[0_4px_0_#BCA67F] space-y-4">
          <div className="space-y-2">
            <div className="font-pixel text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase">
              ⚔️ KHÓ KHĂN LỚN NHẤT TRONG DỰ ÁN
            </div>
            <blockquote className="font-sans text-sm sm:text-base font-bold text-[#2D1B12] italic border-l-4 border-[#B86428] pl-3">
              “Khó khăn lớn nhất không phải là thiết kế giao diện hay vẽ flow. Đó là việc phân biệt đâu là vấn đề thật sự của khách hàng và đâu là sự phức tạp được tạo ra bởi các rào cản quy trình nội bộ của ngân hàng.”
            </blockquote>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#DFC9A2]">
            <div className="font-pixel text-xs sm:text-sm font-bold text-[#2D1B12] uppercase">
              💡 4 BÀI HỌC KINH NGHIỆM ĐẮC GIÁ
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans text-xs text-[#4A3326]">
              <div className="p-3 rounded bg-white border border-[#DFC9A2]">
                <strong>1. Trong B2B:</strong> Người thao tác nhập liệu không phải lúc nào cũng là người ra quyết định cuối cùng.
              </div>
              <div className="p-3 rounded bg-white border border-[#DFC9A2]">
                <strong>2. Dữ liệu là la bàn:</strong> Mọi cải tiến hành trình phải dựa trên bằng chứng dữ liệu thực tế (Evidence) chứ không phải cảm tính.
              </div>
              <div className="p-3 rounded bg-white border border-[#DFC9A2]">
                <strong>3. RM không phải thất bại:</strong> Sự can thiệp của RM là nhu cầu an tâm tất yếu trong giao dịch tài chính lớn, cần được số hóa liền mạch.
              </div>
              <div className="p-3 rounded bg-white border border-[#DFC9A2]">
                <strong>4. UX Writing tạo an tâm:</strong> Trạng thái xử lý phải được viết theo góc nhìn và câu hỏi thắc mắc của khách hàng, không phải mã trạng thái backend.
              </div>
            </div>
          </div>
        </div>

        {/* Next Roadmap */}
        <div className="p-5 rounded-[8px] bg-[#FFFDF7] border-2 border-[#CBB892] shadow-[0_3px_0_#A89571] space-y-3">
          <div className="font-pixel text-xs sm:text-sm font-bold text-[#7A3F1F] uppercase">
            🚀 LỘ TRÌNH PHÁT TRIỂN TIẾP THEO (PRODUCT ROADMAP)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-sans text-xs">
            <div className="p-3 rounded bg-[#FFF8E7] border border-[#DFC9A2]">
              <div className="font-pixel text-[11px] font-bold text-[#B86428]">0 – 3 THÁNG</div>
              <p className="text-[#4A3326] mt-1">Đo lường các chỉ số phễu drop-off và tinh chỉnh micro-copywriting tại các bước tải hồ sơ.</p>
            </div>
            <div className="p-3 rounded bg-[#FFF8E7] border border-[#DFC9A2]">
              <div className="font-pixel text-[11px] font-bold text-[#B86428]">3 – 9 THÁNG</div>
              <p className="text-[#4A3326] mt-1">Tích hợp công nghệ OCR và Open Banking API để tự động trích xuất sao kê thuế và báo cáo tài chính.</p>
            </div>
            <div className="p-3 rounded bg-[#FFF8E7] border border-[#DFC9A2]">
              <div className="font-pixel text-[11px] font-bold text-[#B86428]">9 – 18 THÁNG</div>
              <p className="text-[#4A3326] mt-1">Mở rộng mô hình cấp hạn mức trung dài hạn cho các gói tín dụng xanh và tài trợ chuỗi cung ứng quốc tế.</p>
            </div>
          </div>
        </div>

        {/* Bottom Back To Project List CTA */}
        <div className="pt-6 border-t-2 border-[#DFC9A2] flex flex-wrap items-center justify-between gap-3">
          <VoxelButton
            variant="secondary"
            size="md"
            onClick={onBack}
            icon={<ArrowLeft className="w-4 h-4" />}
          >
            Quay lại danh sách dự án
          </VoxelButton>

          <a
            href={project.demoUrl || 'https://bizmbbank.com.vn'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[6px] bg-[#F4C542] hover:bg-[#FFD55C] active:bg-[#D9A726] border-2 border-[#4A2414] text-[#2D1B12] font-pixel text-xs sm:text-sm font-bold shadow-[0_3px_0_#4A2414] active:translate-y-0.5 transition-all cursor-pointer"
          >
            <span>TRẢI NGHIỆM BIZ MBBANK 2.0</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* =========================================================================
       * LIGHTBOX MODAL FOR FULL-WIDTH USER FLOW
       * ========================================================================= */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] bg-[#0E1A2E] rounded-[10px] border-2 border-[#CBB892] p-4 flex flex-col space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-white font-pixel text-xs">
              <span>SƠ ĐỒ TOÀN TRÌNH USER FLOW • BIZ MBBANK LENDING</span>
              <button
                onClick={() => setLightboxImage(null)}
                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-auto max-h-[75vh] p-4 flex items-center justify-center bg-[#070D18] rounded border border-slate-800">
              {/* If flow image exists or visual schema diagram */}
              <div className="space-y-4 text-center text-white font-sans text-xs">
                <div className="p-4 rounded bg-slate-900/90 border border-slate-700 max-w-2xl text-left space-y-3">
                  <div className="font-pixel text-sm font-bold text-sky-400">
                    SƠ ĐỒ ĐIỂM CHẠM VÀ PHÂN QUYỀN HỆ THỐNG
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                    <div className="p-2 rounded bg-slate-800 border border-slate-700">
                      <strong className="text-sky-300">1. Kế toán viên (Creator):</strong>
                      <p className="text-slate-400 mt-0.5">Soạn thảo hồ sơ, tải báo cáo tài chính, theo dõi tiến độ trên Web Portal.</p>
                    </div>
                    <div className="p-2 rounded bg-slate-800 border border-slate-700">
                      <strong className="text-emerald-300">2. Lãnh đạo (CFO/CEO):</strong>
                      <p className="text-slate-400 mt-0.5">Xem Decision Summary, ký số bảo mật FaceID trên Mobile App.</p>
                    </div>
                    <div className="p-2 rounded bg-slate-800 border border-slate-700">
                      <strong className="text-purple-300">3. Chuyên viên RM:</strong>
                      <p className="text-slate-400 mt-0.5">Tiếp nhận bản nháp hồ sơ qua CRM nội bộ để hỗ trợ tức thì.</p>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 font-mono">
                  Asset Path: /assets/lending-flow.webp (Click X để đóng)
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

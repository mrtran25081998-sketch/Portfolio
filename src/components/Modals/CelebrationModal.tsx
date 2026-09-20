import React from 'react';
import { Sparkles, Trophy, Mail, Compass, X } from 'lucide-react';

interface CelebrationModalProps {
  onClose: () => void;
  onGoToContact: () => void;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({ onClose, onGoToContact }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-md animate-fade-in font-sans">
      <div
        className="relative w-full max-w-md bg-slate-900/95 border-2 border-amber-400 rounded-3xl p-6 sm:p-8 text-center text-white shadow-[0_0_80px_rgba(245,158,11,0.5)] backdrop-blur-2xl space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glowing Trophy Badge */}
        <div className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-300 p-1 shadow-2xl flex items-center justify-center">
          <div className="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center text-amber-300">
            <Trophy className="w-10 h-10 animate-bounce-subtle" />
          </div>
        </div>

        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            100% Khám phá hoàn tất
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white">
            Tuyệt vời! Bạn đã khám phá trọn vẹn thế giới!
          </h2>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            "You’ve explored my whole journey. Let’s create something amazing together!"
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/10 text-xs text-amber-200/90 font-medium">
          🎆 Pháo hoa đang rực sáng trên bầu trời hoàng hôn! Bạn có thể tự do khám phá thêm hoặc kết nối với tôi.
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5 pt-2">
          <a
            href="https://www.dropbox.com/scl/fi/8oxbbolwh2a7dzml0ppvm/CV-Gtran-Product-Designer.pdf?rlkey=k77ay91g13qdetin3dvld68rm&st=31j8xdgh&e=1&dl=0"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all cursor-pointer"
          >
            <span>Tải & Xem My CV trên Dropbox (PDF) ↗</span>
          </a>

          <button
            id="celebration-contact-btn"
            onClick={onGoToContact}
            className="w-full py-3 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 border border-white/10 transition-all cursor-pointer"
          >
            <Mail className="w-4 h-4 text-emerald-400" />
            <span>Liên hệ hợp tác (Contact Me)</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 px-5 rounded-xl bg-transparent hover:bg-white/5 text-slate-400 hover:text-white font-medium text-xs flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Compass className="w-3.5 h-3.5 text-slate-400" />
            <span>Chế độ tự do dạo chơi (Free Roam)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

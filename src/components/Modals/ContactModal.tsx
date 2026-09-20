import React, { useState } from 'react';
import {
  Copy,
  Check,
  Send,
  Sparkles,
  ArrowUpRight,
  Mail,
  Phone,
  MessageSquare
} from 'lucide-react';
import { contactData } from '../../data/portfolioData';
import { soundManager } from '../../audio/soundManager';
import {
  GameModal,
  GameModalBody,
  VoxelButton,
  VoxelCard,
  ModalSection
} from './common/GameModalComponents';

interface ContactModalProps {
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ onClose }) => {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(contactData.phone);
    setCopiedPhone(true);
    soundManager.playButtonBeep();
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactData.email);
    setCopiedEmail(true);
    soundManager.playButtonBeep();
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setIsSubmitted(true);
    soundManager.playFireworks();
  };

  return (
    <GameModal areaKey="contact" onClose={onClose} maxWidthClass="max-w-[880px]">
      <GameModalBody>
        {/* Contact Intro Quote (Text only, no background or border) */}
        <div className="py-2 sm:py-3">
          <p className="font-pixel text-xl sm:text-2xl md:text-3xl font-bold text-[#2D1B12] leading-snug">
            Có thể chúng ta chưa biết nhau, nhưng dự án tiếp theo thì có thể.
          </p>
        </div>

        {/* Contact Info Cards (Phone, Email, Socials) */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Phone Card */}
            <div className="p-4 sm:p-5 rounded-[8px] bg-[#FFFDF7] border-2 border-[#CBB892] shadow-[0_3px_0_#A89571] flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-[11px] font-pixel text-[#7A3F1F] uppercase font-bold flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#B86428]" />
                  <span>Số điện thoại / Zalo</span>
                </div>
                <div className="font-pixel text-lg sm:text-2xl font-bold text-[#2D1B12] tracking-tight">
                  {contactData.phone}
                </div>
              </div>
              <button
                onClick={handleCopyPhone}
                className="w-10 h-10 rounded-[6px] bg-[#FFF4D6] hover:bg-[#F3E2BB] border-2 border-[#7A3F1F] text-[#2D1B12] flex items-center justify-center shadow-[0_2px_0_#7A3F1F] active:shadow-none active:translate-y-0.5 transition-all cursor-pointer shrink-0"
                title="Sao chép số điện thoại"
              >
                {copiedPhone ? (
                  <Check className="w-5 h-5 text-[#2E7D32]" />
                ) : (
                  <Copy className="w-5 h-5 text-[#7A3F1F]" />
                )}
              </button>
            </div>

            {/* Email Card */}
            <div className="p-4 sm:p-5 rounded-[8px] bg-[#FFFDF7] border-2 border-[#CBB892] shadow-[0_3px_0_#A89571] flex items-center justify-between">
              <div className="space-y-1 overflow-hidden pr-2">
                <div className="text-[11px] font-pixel text-[#7A3F1F] uppercase font-bold flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#B86428]" />
                  <span>Hòm thư điện tử</span>
                </div>
                <div className="font-pixel text-base sm:text-xl font-bold text-[#2D1B12] truncate">
                  {contactData.email}
                </div>
              </div>
              <button
                onClick={handleCopyEmail}
                className="w-10 h-10 rounded-[6px] bg-[#FFF4D6] hover:bg-[#F3E2BB] border-2 border-[#7A3F1F] text-[#2D1B12] flex items-center justify-center shadow-[0_2px_0_#7A3F1F] active:shadow-none active:translate-y-0.5 transition-all cursor-pointer shrink-0"
                title="Sao chép email"
              >
                {copiedEmail ? (
                  <Check className="w-5 h-5 text-[#2E7D32]" />
                ) : (
                  <Copy className="w-5 h-5 text-[#7A3F1F]" />
                )}
              </button>
            </div>
          </div>

          {/* Social Profiles as Voxel Item Tokens */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <span className="text-xs font-pixel text-[#7A3F1F] font-bold mr-1">MẠNG XÃ HỘI:</span>

            {/* Behance */}
            <a
              href={contactData.behance}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[6px] bg-[#FFFDF7] border-2 border-[#CBB892] hover:border-[#7A3F1F] text-[#2D1B12] font-pixel text-xs font-bold shadow-[0_2px_0_#A89571] hover:-translate-y-0.5 transition-all"
            >
              <span className="font-bold text-sm text-[#053EFF]">Bē</span>
              <span>Behance</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#6B513C]" />
            </a>

            {/* LinkedIn */}
            <a
              href={contactData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[6px] bg-[#FFFDF7] border-2 border-[#CBB892] hover:border-[#7A3F1F] text-[#2D1B12] font-pixel text-xs font-bold shadow-[0_2px_0_#A89571] hover:-translate-y-0.5 transition-all"
            >
              <span className="font-bold text-sm text-[#0A66C2]">in</span>
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#6B513C]" />
            </a>

            {/* Facebook */}
            <a
              href={contactData.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[6px] bg-[#FFFDF7] border-2 border-[#CBB892] hover:border-[#7A3F1F] text-[#2D1B12] font-pixel text-xs font-bold shadow-[0_2px_0_#A89571] hover:-translate-y-0.5 transition-all"
            >
              <span className="font-bold text-sm text-[#1877F2]">f</span>
              <span>Facebook</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#6B513C]" />
            </a>
          </div>
        </div>

        {/* Message Dispatch Letter Form */}
        <ModalSection
          title="Gửi tin nhắn hoặc lời mời hợp tác"
          subtitle="Form thư trực tiếp gửi về hòm thư của GTran"
          badge="GỬI THƯ"
        >
          {isSubmitted ? (
            <div className="p-6 sm:p-8 rounded-[8px] bg-[#FFFDF7] border-2 border-[#A2D396] shadow-[0_4px_0_#7FB871] text-center space-y-3 animate-fade-in">
              <div className="w-12 h-12 rounded-[6px] bg-[#E8F5E9] border-2 border-[#2E7D32] flex items-center justify-center text-[#2E7D32] mx-auto shadow-sm">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-pixel text-lg sm:text-xl font-bold text-[#2E7D32]">
                Lá thư đã được gửi thành công!
              </h3>
              <p className="text-xs sm:text-sm text-[#4A3326] max-w-md mx-auto">
                Cảm ơn bạn đã quan tâm và liên hệ. Tôi sẽ xem xét và phản hồi trong thời gian sớm nhất qua email hoặc số điện thoại bạn cung cấp.
              </p>
              <div className="pt-2">
                <VoxelButton
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsSubmitted(false)}
                >
                  Gửi lá thư khác
                </VoxelButton>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="p-5 sm:p-6 rounded-[8px] bg-[#FFFDF7] border-2 border-[#CBB892] shadow-[0_4px_0_#A89571] space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-pixel text-xs font-bold text-[#2D1B12] block">
                    Họ tên của bạn *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Nguyễn Văn A"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-[6px] bg-[#FFF4D6] border-2 border-[#7A3F1F] text-[#2D1B12] placeholder-[#8C6E52] text-xs sm:text-sm focus:outline-none focus:border-[#F4C542] focus:ring-2 focus:ring-[#F4C542]/40 transition-all font-sans-body"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-pixel text-xs font-bold text-[#2D1B12] block">
                    Email liên lạc *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-[6px] bg-[#FFF4D6] border-2 border-[#7A3F1F] text-[#2D1B12] placeholder-[#8C6E52] text-xs sm:text-sm focus:outline-none focus:border-[#F4C542] focus:ring-2 focus:ring-[#F4C542]/40 transition-all font-sans-body"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-pixel text-xs font-bold text-[#2D1B12] block">
                  Nội dung trao đổi hoặc lời mời hợp tác dự án... *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Chia sẻ về ý tưởng sản phẩm, mục tiêu hoặc cơ hội nghề nghiệp mà bạn đang tìm kiếm..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-[6px] bg-[#FFF4D6] border-2 border-[#7A3F1F] text-[#2D1B12] placeholder-[#8C6E52] text-xs sm:text-sm focus:outline-none focus:border-[#F4C542] focus:ring-2 focus:ring-[#F4C542]/40 transition-all resize-none font-sans-body"
                />
              </div>

              <div className="pt-1">
                <VoxelButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  icon={<Send className="w-4 h-4" />}
                >
                  Gửi tin nhắn tới GTran
                </VoxelButton>
              </div>
            </form>
          )}
        </ModalSection>
      </GameModalBody>
    </GameModal>
  );
};

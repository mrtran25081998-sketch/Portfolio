import React, { useEffect, useRef } from 'react';
import { X, Check, Star, User, BookOpen, Monitor, MapPin, Mail, Sparkles, ArrowLeft, Gamepad2 } from 'lucide-react';
import { soundManager } from '../../../audio/soundManager';

export type AreaThemeKey = 'about' | 'experience' | 'work' | 'cx' | 'explore' | 'contact' | 'cv' | 'help';

export interface AreaThemeConfig {
  number: string;
  title: string;
  accent: 'grass' | 'gold' | 'water' | 'emerald' | 'orange';
  icon: 'profile' | 'library' | 'monitor' | 'journey' | 'mailbox' | 'gamepad';
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  accentHex: string;
}

export const areaTheme: Record<string, AreaThemeConfig> = {
  about: {
    number: '01',
    title: 'GIỚI THIỆU',
    accent: 'grass',
    icon: 'profile',
    badgeBg: 'bg-[#4F9D18]',
    badgeBorder: 'border-[#33680F]',
    badgeText: 'text-[#FFF4D6]',
    accentHex: '#4F9D18'
  },
  experience: {
    number: '02',
    title: 'KINH NGHIỆM LÀM VIỆC',
    accent: 'gold',
    icon: 'library',
    badgeBg: 'bg-[#F4C542]',
    badgeBorder: 'border-[#9E6700]',
    badgeText: 'text-[#2D1B12]',
    accentHex: '#F4C542'
  },
  work: {
    number: '03',
    title: 'DỰ ÁN CỦA TÔI',
    accent: 'water',
    icon: 'monitor',
    badgeBg: 'bg-[#176B73]',
    badgeBorder: 'border-[#0F474D]',
    badgeText: 'text-[#FFF4D6]',
    accentHex: '#176B73'
  },
  cx: {
    number: '04',
    title: 'KHÁM PHÁ',
    accent: 'emerald',
    icon: 'journey',
    badgeBg: 'bg-[#2E7D32]',
    badgeBorder: 'border-[#1B4D20]',
    badgeText: 'text-[#FFF4D6]',
    accentHex: '#2E7D32'
  },
  explore: {
    number: '04',
    title: 'KHÁM PHÁ',
    accent: 'emerald',
    icon: 'journey',
    badgeBg: 'bg-[#2E7D32]',
    badgeBorder: 'border-[#1B4D20]',
    badgeText: 'text-[#FFF4D6]',
    accentHex: '#2E7D32'
  },
  cv: {
    number: '04',
    title: 'KHÁM PHÁ',
    accent: 'emerald',
    icon: 'journey',
    badgeBg: 'bg-[#2E7D32]',
    badgeBorder: 'border-[#1B4D20]',
    badgeText: 'text-[#FFF4D6]',
    accentHex: '#2E7D32'
  },
  contact: {
    number: '05',
    title: 'LIÊN HỆ',
    accent: 'orange',
    icon: 'mailbox',
    badgeBg: 'bg-[#B86428]',
    badgeBorder: 'border-[#7A3F1F]',
    badgeText: 'text-[#FFF4D6]',
    accentHex: '#B86428'
  },
  help: {
    number: '00',
    title: 'HƯỚNG DẪN ĐIỀU KHIỂN',
    accent: 'gold',
    icon: 'gamepad',
    badgeBg: 'bg-[#B86428]',
    badgeBorder: 'border-[#7A3F1F]',
    badgeText: 'text-[#FFF4D6]',
    accentHex: '#F4C542'
  }
};

export const renderVoxelIcon = (icon: AreaThemeConfig['icon'], className = 'w-5 h-5') => {
  switch (icon) {
    case 'profile':
      return <User className={className} />;
    case 'library':
      return <BookOpen className={className} />;
    case 'monitor':
      return <Monitor className={className} />;
    case 'journey':
      return <MapPin className={className} />;
    case 'mailbox':
      return <Mail className={className} />;
    case 'gamepad':
      return <Gamepad2 className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};

/* ----------------------------------------------------
 * Voxel Rivet / Nail Corner Component
 * ---------------------------------------------------- */
export const VoxelRivet: React.FC<{ position: 'tl' | 'tr' | 'bl' | 'br' }> = ({ position }) => {
  const posClasses = {
    tl: 'top-2 left-2',
    tr: 'top-2 right-2',
    bl: 'bottom-2 left-2',
    br: 'bottom-2 right-2'
  }[position];

  return (
    <div
      className={`absolute ${posClasses} w-2.5 h-2.5 rounded-[2px] bg-[#F4C542] border border-[#7A3F1F] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_1px_1px_rgba(0,0,0,0.5)] pointer-events-none z-30`}
      aria-hidden="true"
    />
  );
};

/* ----------------------------------------------------
 * Voxel Button System
 * ---------------------------------------------------- */
interface VoxelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'wood' | 'accent-green' | 'accent-water';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const VoxelButton: React.FC<VoxelButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className = '',
  onClick,
  ...rest
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    soundManager.playButtonBeep();
    onClick?.(e);
  };

  const baseStyles =
    'relative inline-flex items-center justify-center font-bold font-sans tracking-wide transition-all select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F4C542] focus:ring-offset-2';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs rounded-[6px] gap-1.5 min-h-[36px]',
    md: 'px-4 py-2.5 text-xs sm:text-sm rounded-[6px] gap-2 min-h-[44px]',
    lg: 'px-5 py-3 text-sm sm:text-base rounded-[8px] gap-2.5 min-h-[48px]'
  }[size];

  const variantStyles = {
    primary:
      'bg-[#F4C542] hover:bg-[#FED45B] text-[#2D1B12] border-2 border-[#4A2414] shadow-[0_4px_0_#4A2414] active:shadow-none active:translate-y-1',
    secondary:
      'bg-[#FFF4D6] hover:bg-[#F3E2BB] text-[#2D1B12] border-2 border-[#7A3F1F] shadow-[0_3px_0_#7A3F1F] active:shadow-none active:translate-y-[3px]',
    wood:
      'bg-[#7A3F1F] hover:bg-[#964E26] text-[#FFF4D6] border-2 border-[#4A2414] shadow-[0_3px_0_#2E150B] active:shadow-none active:translate-y-[3px]',
    'accent-green':
      'bg-[#4F9D18] hover:bg-[#63B722] text-[#FFF4D6] border-2 border-[#2F5E0F] shadow-[0_4px_0_#2F5E0F] active:shadow-none active:translate-y-1',
    'accent-water':
      'bg-[#176B73] hover:bg-[#1E8791] text-[#FFF4D6] border-2 border-[#0D4449] shadow-[0_4px_0_#0D4449] active:shadow-none active:translate-y-1'
  }[variant];

  return (
    <button
      onClick={handleClick}
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      {...rest}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

/* ----------------------------------------------------
 * Voxel Card
 * ---------------------------------------------------- */
interface VoxelCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'parchment' | 'wood' | 'stone';
  id?: string;
}

export const VoxelCard: React.FC<VoxelCardProps> = ({
  children,
  className = '',
  variant = 'parchment',
  id
}) => {
  const variantStyles = {
    parchment:
      'bg-[#FFFDF6] border-2 border-[#BCA67F] text-[#2D1B12] shadow-[0_4px_0_#A48B60]',
    wood:
      'bg-[#633319] border-2 border-[#4A2414] text-[#FFF4D6] shadow-[0_4px_0_#33180C]',
    stone:
      'bg-[#E8E1D3] border-2 border-[#A89E88] text-[#2D1B12] shadow-[0_4px_0_#827863]'
  }[variant];

  return (
    <div
      id={id}
      className={`rounded-[8px] p-4 sm:p-5 transition-transform hover:-translate-y-0.5 ${variantStyles} ${className}`}
    >
      {children}
    </div>
  );
};

/* ----------------------------------------------------
 * Area Badge
 * ---------------------------------------------------- */
export const AreaBadge: React.FC<{
  number: string;
  accent?: AreaThemeConfig['accent'];
  className?: string;
}> = ({ number, className = '' }) => {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-[#3B1D0F] border border-[#7A3F1F] text-[#F4C542] font-pixel text-[11px] sm:text-xs font-bold tracking-wider uppercase shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-[1px] bg-[#F4C542]" />
      <span>KHU VỰC {number}</span>
    </div>
  );
};

/* ----------------------------------------------------
 * Modal Section Divider / Header
 * ---------------------------------------------------- */
export const ModalSection: React.FC<{
  title: string;
  subtitle?: string;
  badge?: string;
  className?: string;
  children?: React.ReactNode;
  hideDivider?: boolean;
}> = ({ title, subtitle, badge, className = '', children, hideDivider = false }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className={`flex flex-wrap items-end justify-between gap-2 ${hideDivider ? 'pb-1' : 'border-b-2 border-[#DFC9A2] pb-2.5'}`}>
        <div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-[2px] bg-[#B86428] border border-[#7A3F1F]" />
            <h3 className="font-pixel text-lg sm:text-xl font-bold tracking-wide text-[#2D1B12]">
              {title}
            </h3>
          </div>
          {subtitle && (
            <p className="text-xs sm:text-sm text-[#6B513C] mt-0.5 font-sans-body">
              {subtitle}
            </p>
          )}
        </div>
        {badge && (
          <span className="text-[11px] font-pixel px-2.5 py-0.5 rounded-[4px] bg-[#F3E2BB] border border-[#BCA67F] text-[#6B513C] font-semibold">
            {badge}
          </span>
        )}
      </div>
      {children}
    </div>
  );
};

/* ----------------------------------------------------
 * GameModalHeader
 * ---------------------------------------------------- */
interface GameModalHeaderProps {
  areaKey: AreaThemeKey;
  onClose: () => void;
  titleOverride?: string;
  badgeOverride?: React.ReactNode;
  hideExploredBadge?: boolean;
  onBack?: () => void;
  backLabel?: string;
  hideCenterHeader?: boolean;
}

export const GameModalHeader: React.FC<GameModalHeaderProps> = ({
  areaKey,
  onClose,
  titleOverride,
  badgeOverride,
  hideExploredBadge,
  onBack,
  backLabel,
  hideCenterHeader
}) => {
  const theme = areaTheme[areaKey] || areaTheme.about;

  return (
    <header className="relative z-20 flex items-center justify-between gap-2.5 sm:gap-4 px-3.5 sm:px-6 py-3 sm:py-3.5 bg-[#542B15] border-b-[3px] border-[#381B0C] select-none">
      {/* 2 Top rivets */}
      <VoxelRivet position="tl" />
      <VoxelRivet position="tr" />

      {/* Left: Badge + Icon + Area Title */}
      <div className="flex items-center gap-2 sm:gap-3.5 min-w-0 flex-1 pl-3 sm:pl-2">
        {onBack && (
          <button
            onClick={() => {
              soundManager.playButtonBeep();
              onBack();
            }}
            className="px-2 sm:px-2.5 py-1.5 rounded-[5px] bg-[#B86428] hover:bg-[#D47936] active:bg-[#964E1C] border-2 border-[#4A2414] text-[#FFF4D6] flex items-center gap-1.5 shadow-[0_2px_0_#2E150B] active:translate-y-[2px] transition-transform cursor-pointer font-pixel text-xs font-bold shrink-0"
            title={backLabel || 'Quay lại'}
            aria-label="Quay lại"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{backLabel || 'QUAY LẠI'}</span>
          </button>
        )}

        {!hideCenterHeader && (
          <>
            {/* Voxel Sign Icon Box */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[6px] bg-[#3B1D0F] border-2 border-[#7A3F1F] text-[#F4C542] flex items-center justify-center shadow-[inset_0_2px_0_rgba(0,0,0,0.4),0_2px_0_#2E150B] shrink-0">
              {renderVoxelIcon(theme.icon, 'w-5 h-5 sm:w-5.5 sm:h-5.5')}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                {badgeOverride !== undefined ? (
                  badgeOverride
                ) : (
                  <AreaBadge number={theme.number} />
                )}
              </div>
              <h2
                id="voxel-modal-title"
                className="font-pixel text-xs sm:text-base md:text-lg font-bold tracking-wide text-[#F4C542] drop-shadow-[0_2px_0_#2E150B] leading-tight truncate"
                title={titleOverride || theme.title}
              >
                {titleOverride || theme.title}
              </h2>
            </div>
          </>
        )}
      </div>

      {/* Right: Explored Badge + Block Close Button */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 pr-3 sm:pr-2">
        {/* Explored Badge */}
        {!hideExploredBadge && theme.number !== '00' && (
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-[#386D12] border border-[#264D0B] text-[#FFF4D6] shadow-[0_2px_0_#1E3B09]">
            <Check className="w-3.5 h-3.5 text-[#FFF4D6] stroke-[3]" />
            <span className="font-pixel text-[11px] font-bold tracking-wider uppercase">
              ĐÃ KHÁM PHÁ
            </span>
          </div>
        )}

        {/* Square Stone/Wood Close Button */}
        <button
          onClick={() => {
            soundManager.playButtonBeep();
            onClose();
          }}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-[6px] bg-[#B86428] hover:bg-[#D47936] active:bg-[#964E1C] border-2 border-[#4A2414] text-[#FFF4D6] flex items-center justify-center shadow-[0_3px_0_#2E150B] active:shadow-none active:translate-y-[3px] transition-transform cursor-pointer shrink-0"
          title="Đóng (ESC)"
          aria-label="Đóng popup"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
        </button>
      </div>
    </header>
  );
};

/* ----------------------------------------------------
 * GameModalFooter
 * ---------------------------------------------------- */
interface GameModalFooterProps {
  areaKey: AreaThemeKey;
  onClose: () => void;
  actionButton?: React.ReactNode;
}

export const GameModalFooter: React.FC<GameModalFooterProps> = ({
  areaKey,
  onClose,
  actionButton
}) => {
  const theme = areaTheme[areaKey] || areaTheme.about;

  return (
    <footer className="relative z-20 flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-3.5 bg-[#4A2414] border-t-[3px] border-[#381B0C] select-none">
      {/* 2 Bottom rivets */}
      <VoxelRivet position="bl" />
      <VoxelRivet position="br" />

      {/* Left: Journey Status */}
      <div className="flex items-center gap-2 pl-4 sm:pl-3">
        <div className="w-6 h-6 rounded-[4px] bg-[#F4C542] border border-[#7A3F1F] flex items-center justify-center text-[#2D1B12] shadow-sm">
          <Star className="w-3.5 h-3.5 fill-[#2D1B12]" />
        </div>
        <div className="text-xs font-pixel text-[#FFF4D6] tracking-wide">
          <span>{theme.title}</span>
          <span className="mx-1.5 text-[#F4C542]">★</span>
          <span className="text-[#D9D2BF]">Đã ghi vào nhật ký</span>
        </div>
      </div>

      {/* Right: Action or Close Button */}
      <div className="flex items-center gap-2.5 pr-4 sm:pr-3 w-full sm:w-auto justify-end">
        {actionButton}
        <VoxelButton
          variant="primary"
          size="sm"
          onClick={onClose}
          className="w-full sm:w-auto"
        >
          Đóng & Tiếp tục khám phá
        </VoxelButton>
      </div>
    </footer>
  );
};

/* ----------------------------------------------------
 * GameModalBody
 * ---------------------------------------------------- */
interface GameModalBodyProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  autoScrollToTop?: boolean;
}

export const GameModalBody = React.forwardRef<HTMLDivElement, GameModalBodyProps>(
  ({ children, className = '', id, autoScrollToTop = true }, forwardedRef) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const resolvedRef = (forwardedRef as React.RefObject<HTMLDivElement>) || internalRef;

    useEffect(() => {
      if (autoScrollToTop) {
        if (resolvedRef && 'current' in resolvedRef && resolvedRef.current) {
          resolvedRef.current.scrollTop = 0;
        }
      }
    }, [autoScrollToTop]);

    return (
      <div
        ref={resolvedRef}
        id={id}
        className={`flex-1 overflow-y-auto p-4 sm:p-7 md:p-8 space-y-6 sm:space-y-8 bg-[#FFF8E7] text-[#2D1B12] voxel-scrollbar font-sans-body ${className}`}
      >
        {children}
      </div>
    );
  }
);
GameModalBody.displayName = 'GameModalBody';

/* ----------------------------------------------------
 * GameModal (Root Frame)
 * ---------------------------------------------------- */
interface GameModalProps {
  areaKey: AreaThemeKey;
  onClose: () => void;
  children: React.ReactNode;
  actionButton?: React.ReactNode;
  titleOverride?: string;
  badgeOverride?: React.ReactNode;
  hideExploredBadge?: boolean;
  maxWidthClass?: string;
  onBack?: () => void;
  backLabel?: string;
  hideCenterHeader?: boolean;
}

export const GameModal: React.FC<GameModalProps> = ({
  areaKey,
  onClose,
  children,
  actionButton,
  titleOverride,
  badgeOverride,
  hideExploredBadge,
  maxWidthClass = 'max-w-[960px]',
  onBack,
  backLabel,
  hideCenterHeader
}) => {
  const modalContainerRef = useRef<HTMLDivElement>(null);

  // Global ESC key listener + isolate key presses from character controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
      // Stop movement keys (WASD, Space, Shift, E) from affecting game while modal is open
      if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'Space', 'KeyE', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.stopPropagation();
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div
      id={`voxel-modal-${areaKey}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="voxel-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[rgba(20,16,10,0.55)] backdrop-blur-[3px] animate-fade-in font-sans-body select-text"
      onClick={(e) => {
        // Click on dark overlay closes modal
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Voxel Board Outer Frame */}
      <div
        ref={modalContainerRef}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full ${maxWidthClass} max-h-[min(820px,calc(100vh-48px))] h-full sm:h-auto rounded-[8px] bg-[#7A3F1F] border-[3.5px] border-[#4A2414] shadow-[0_10px_0_#2E150B,0_20px_45px_rgba(0,0,0,0.65)] overflow-hidden flex flex-col animate-voxel-land`}
      >
        {/* Header */}
        <GameModalHeader
          areaKey={areaKey}
          onClose={onClose}
          titleOverride={titleOverride}
          badgeOverride={badgeOverride}
          hideExploredBadge={hideExploredBadge}
          onBack={onBack}
          backLabel={backLabel}
          hideCenterHeader={hideCenterHeader}
        />

        {/* Content Body */}
        {children}
      </div>
    </div>
  );
};

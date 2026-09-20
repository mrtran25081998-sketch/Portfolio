import React from 'react';

interface LogoProps {
  className?: string;
}

/**
 * Official MB Bank (Ngân hàng TMCP Quân đội) Logo
 * Using authentic vector SVG asset matching "Logo light.png"
 */
export const MBBankLogo: React.FC<LogoProps> = ({ className = 'w-full h-full' }) => {
  return (
    <img
      src="/assets/logos/mb.svg"
      alt="MB Bank Logo"
      className={`object-contain ${className}`}
      loading="eager"
      onError={(e) => {
        // Fallback to high-resolution PNG if SVG fails
        (e.currentTarget as HTMLImageElement).src = '/assets/logos/mb_bank.png';
      }}
    />
  );
};

/**
 * Official KienlongBank Logo
 * Using authentic high-resolution brand asset matching "image 22.png"
 */
export const KienlongBankLogo: React.FC<LogoProps> = ({ className = 'w-full h-full' }) => {
  return (
    <img
      src="/assets/logos/kienlongbank.png"
      alt="KienlongBank Logo"
      className={`object-contain ${className}`}
      loading="eager"
    />
  );
};

/**
 * Official AgileTech Vietnam Logo
 * Using authentic transparent asset matching "agitech 1.png"
 */
export const AgileTechLogo: React.FC<LogoProps> = ({ className = 'w-full h-full' }) => {
  return (
    <img
      src="/assets/logos/agiletech_clean.png"
      alt="AgileTech Logo"
      className={`object-contain ${className}`}
      loading="eager"
    />
  );
};


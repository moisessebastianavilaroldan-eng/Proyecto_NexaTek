import React from 'react';

interface LogoProps {
  className?: string;
  isLight?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  isLight = false,
  size = 'md' 
}) => {
  const imageSizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10 sm:h-11 sm:w-11',
    lg: 'h-14 w-14',
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className={`flex items-center gap-3 font-bold tracking-tight select-none ${className}`}>
      {/* Isotipo: Monitor con la N sobre su fondo blanco nítido */}
      <div className="relative flex items-center justify-center rounded-xl overflow-hidden bg-white p-1 border border-slate-200/40 shadow-sm shrink-0">
        <img
          src="/logo-screen.png"
          alt="NEXATEK Isotipo"
          className={`${imageSizeClasses[size]} object-contain`}
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            target.src = '/logo-nexatek.png';
          }}
        />
      </div>

      {/* Letras Oficiales NEXATEK */}
      <div className="flex flex-col leading-none">
        <span className={`${textSizeClasses[size]} font-black tracking-wider ${isLight ? 'text-white' : 'text-brand-dark'}`}>
          NEXA<span className="text-brand-electric">TEK</span>
        </span>
        <span className={`text-[9px] tracking-widest font-bold uppercase mt-0.5 ${isLight ? 'text-slate-300' : 'text-brand-muted'}`}>
          Tecnología & Software
        </span>
      </div>
    </div>
  );
};

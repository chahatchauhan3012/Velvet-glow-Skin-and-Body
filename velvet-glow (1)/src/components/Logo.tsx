import React from 'react';

interface LogoProps {
  variant?: 'header' | 'footer' | 'hero' | 'mark' | 'image';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showTagline?: boolean;
}

export default function Logo({
  variant = 'header',
  size = 'md',
  className = '',
  showTagline = true,
}: LogoProps) {
  if (variant === 'image') {
    const sizeClasses = {
      sm: 'w-8 h-8 md:w-10 md:h-10',
      md: 'w-12 h-12 md:w-14 md:h-14',
      lg: 'w-16 h-16 md:w-20 md:h-20',
      xl: 'w-24 h-24 md:w-32 md:h-32',
    }[size];

    return (
      <div className={`relative flex items-center gap-3 ${className}`}>
        <img
          src="/logo.jpg"
          alt="Velvet Glow Skin & Body Logo"
          referrerPolicy="no-referrer"
          className={`${sizeClasses} rounded-full object-cover shadow-md border border-amber-200/60 ring-2 ring-amber-100/30`}
        />
        {showTagline && (
          <div className="flex flex-col">
            <span className="font-serif text-xl md:text-2xl font-bold tracking-[0.15em] text-stone-900 leading-none">
              VELVET GLOW
            </span>
            <span className="text-[10px] md:text-xs tracking-[0.3em] text-amber-700/90 font-sans font-semibold uppercase mt-1">
              SKIN & BODY
            </span>
          </div>
        )}
      </div>
    );
  }

  // Vector SVG Monogram Logo (Intertwined V & G with Botanical Leaf Branch)
  const isMarkOnly = variant === 'mark';

  const dimensions = {
    sm: { mark: 32, text: 'text-base', sub: 'text-[9px]' },
    md: { mark: 42, text: 'text-xl', sub: 'text-[10px]' },
    lg: { mark: 56, text: 'text-2xl', sub: 'text-[11px]' },
    xl: { mark: 80, text: 'text-4xl', sub: 'text-sm' },
  }[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Monogram Symbol: V + G with Botanical Leaf Branch */}
      <div className="relative flex-shrink-0 flex items-center justify-center">
        <svg
          width={dimensions.mark}
          height={dimensions.mark}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-stone-900 transition-transform duration-300 hover:scale-105"
        >
          {/* Subtle Outer Soft Glow Circle */}
          <circle cx="50" cy="50" r="48" fill="#FDFBF7" stroke="#E6D7C3" strokeWidth="1.5" />
          
          {/* Serif 'V' Letter */}
          <path
            d="M 22 28 L 30 28 L 42 68 L 50 28 L 58 28 L 45 74 L 38 74 Z"
            fill="currentColor"
          />
          
          {/* Serif 'G' Letter */}
          <path
            d="M 76 38 C 72 30 63 26 52 26 C 36 26 26 38 26 52 C 26 66 36 76 52 76 C 65 76 74 69 76 58 L 54 58 L 54 50 L 84 50 L 84 72 C 76 77 65 82 50 82 C 28 82 18 68 18 52 C 18 34 32 20 54 20 C 68 20 78 26 83 34 Z"
            fill="currentColor"
          />

          {/* Botanical Leaf Stem woven between V and G */}
          <g stroke="#8B6B43" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Curved Stem */}
            <path d="M 40 68 C 43 56 46 44 54 32 C 58 26 62 22 66 18" />
            
            {/* Leaves along the Stem */}
            <path d="M 44 56 C 40 52 36 53 38 58 C 41 60 44 58 44 56 Z" fill="#8B6B43" />
            <path d="M 47 48 C 52 45 54 41 49 41 C 46 43 46 47 47 48 Z" fill="#8B6B43" />
            <path d="M 50 40 C 45 36 42 38 43 43 C 46 44 49 42 50 40 Z" fill="#8B6B43" />
            <path d="M 54 33 C 59 30 61 26 56 26 C 53 28 53 31 54 33 Z" fill="#8B6B43" />
            <path d="M 60 25 C 57 21 54 22 55 26 C 57 27 59 26 60 25 Z" fill="#8B6B43" />
          </g>
        </svg>
      </div>

      {/* Brand Text */}
      {!isMarkOnly && (
        <div className="flex flex-col justify-center">
          <span
            className={`font-serif font-bold tracking-[0.18em] text-stone-900 ${dimensions.text} leading-none`}
          >
            VELVET GLOW
          </span>
          {showTagline && (
            <span
              className={`font-sans font-semibold tracking-[0.3em] text-amber-800/80 uppercase ${dimensions.sub} mt-1 leading-none`}
            >
              SKIN & BODY
            </span>
          )}
        </div>
      )}
    </div>
  );
}

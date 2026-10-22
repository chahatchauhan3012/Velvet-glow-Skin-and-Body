import React, { useState, useEffect } from 'react';
import { Sparkles, Truck, ShieldCheck, Gift, ChevronLeft, ChevronRight, X } from 'lucide-react';

const promos = [
  {
    icon: <Sparkles className="w-3.5 h-3.5 text-amber-300" />,
    text: "✨ Special Offer: Get 10% OFF on your first order with code VELVET10",
  },
  {
    icon: <Truck className="w-3.5 h-3.5 text-amber-300" />,
    text: "🚚 Free Express Shipping across India on orders above ₹999",
  },
  {
    icon: <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />,
    text: "🌿 100% Dermatologist Tested & Cruelty-Free Formulations",
  },
  {
    icon: <Gift className="w-3.5 h-3.5 text-amber-300" />,
    text: "🎁 Complimentary Beauty Sample Pouch with every prepaid order",
  },
];

export default function TopPromoBanner({ onOpenQuiz }: { onOpenQuiz?: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % promos.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-amber-100 text-[11px] sm:text-xs py-2 px-4 shadow-sm relative z-50 border-b border-amber-900/30">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Quiz Trigger Button */}
        <button
          onClick={onOpenQuiz}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/30 text-amber-200 transition-all text-[10px] font-medium tracking-wide uppercase cursor-pointer"
        >
          <Sparkles className="w-3 h-3 text-amber-300" />
          <span>Skin Routine Quiz</span>
        </button>

        {/* Center Marquee/Slider */}
        <div className="flex-1 flex items-center justify-center gap-2 overflow-hidden px-2">
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + promos.length) % promos.length)}
            className="text-amber-300/70 hover:text-amber-200 transition p-0.5"
            aria-label="Previous promo"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-2 transition-all duration-500 ease-in-out text-center">
            {promos[currentIndex].icon}
            <span className="font-medium tracking-wide text-amber-100/90 truncate max-w-[280px] sm:max-w-md md:max-w-xl">
              {promos[currentIndex].text}
            </span>
          </div>

          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % promos.length)}
            className="text-amber-300/70 hover:text-amber-200 transition p-0.5"
            aria-label="Next promo"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Close Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsVisible(false)}
            className="text-amber-200/60 hover:text-amber-100 transition p-0.5"
            title="Dismiss Announcement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

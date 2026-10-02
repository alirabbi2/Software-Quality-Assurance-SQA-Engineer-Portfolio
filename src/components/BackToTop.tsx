import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const heroElement = document.getElementById('hero');
      const currentScrollY = window.scrollY;

      // Determine threshold: past the hero section (or 400px fallback)
      if (heroElement) {
        const heroHeight = heroElement.offsetHeight;
        // Becomes visible once scrolled past 70% of hero section
        setIsVisible(currentScrollY > heroHeight * 0.7);
      } else {
        setIsVisible(currentScrollY > 400);
      }

      // Calculate total page scroll percentage
      const totalScrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalScrollableHeight > 0) {
        const progress = Math.min(
          100,
          Math.max(0, (currentScrollY / totalScrollableHeight) * 100)
        );
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // SVG Circular progress ring calculations
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 transition-all duration-300 print:hidden no-print ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
          : 'opacity-0 translate-y-4 pointer-events-none scale-90'
      }`}
    >
      <button
        id="back-to-top-btn"
        onClick={scrollToTop}
        aria-label="Back to top"
        title="Back to top"
        className="group relative flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 shadow-xl backdrop-blur-md hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:shadow-emerald-500/20 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
      >
        {/* Circular Progress Ring */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5"
          viewBox="0 0 44 44"
        >
          {/* Background track circle */}
          <circle
            cx="22"
            cy="22"
            r={radius}
            className="stroke-slate-200 dark:stroke-slate-800"
            strokeWidth="2.5"
            fill="none"
          />
          {/* Animated active progress circle */}
          <circle
            cx="22"
            cy="22"
            r={radius}
            className="stroke-emerald-500 transition-all duration-150 ease-out"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* Icon with hover bounce */}
        <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" />

        {/* Subtle tooltip on hover */}
        <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-[11px] font-semibold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md">
          Back to Top
        </span>
      </button>
    </div>
  );
};

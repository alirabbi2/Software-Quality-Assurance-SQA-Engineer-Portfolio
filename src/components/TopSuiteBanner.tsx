import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Lock,
  BookOpen,
  ShieldCheck,
  Users,
  ArrowRight,
} from 'lucide-react';

interface TopSuiteBannerProps {
  onOpenResume: () => void;
  onOpenCoverLetter: () => void;
  onOpenBlog: () => void;
  onBrandClick?: () => void;
}

export const TopSuiteBanner: React.FC<TopSuiteBannerProps> = ({
  onOpenResume,
  onOpenCoverLetter,
  onOpenBlog,
  onBrandClick,
}) => {
  const [visitorCount, setVisitorCount] = useState(1);

  // Subtle realistic visitor counter pulse (1 to 3 active live visitors)
  useEffect(() => {
    const interval = setInterval(() => {
      // 80% chance of staying 1, occasionally 2
      const random = Math.random();
      if (random > 0.85) {
        setVisitorCount(2);
      } else if (random > 0.96) {
        setVisitorCount(3);
      } else {
        setVisitorCount(1);
      }
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full space-y-4">
      {/* 1. ATS Resume & AI Cover Letter Suite Card */}
      <div className="w-full rounded-2xl bg-[#0c1322] border border-slate-800/90 p-4 sm:p-5 shadow-2xl transition-all hover:border-slate-700/80">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Left: Sparkle Icon + Title + Badge + Subtitle */}
          <div className="flex items-start sm:items-center gap-3.5">
            {/* Sparkle Icon Box with subtle orange glow */}
            <div className="p-2.5 sm:p-3 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 shrink-0 shadow-sm shadow-orange-500/10">
              <Sparkles className="w-5 h-5 text-orange-400" />
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  ATS Resume &amp; AI Cover Letter Suite
                </h3>
                {/* Admin Only Badge */}
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                  <Lock className="w-3 h-3" />
                  <span>Admin Only</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 font-normal">
                Automated ATS templates with Match Score Analysis and tailored AI cover letters.
              </p>
            </div>
          </div>

          {/* Right: 3 Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0 pt-2 lg:pt-0">
            {/* 1. Orange Resume (Admin) -> Button */}
            <button
              id="top-suite-resume-btn"
              onClick={onOpenResume}
              className="px-4 py-2 sm:py-2.5 rounded-xl bg-[#f95738] hover:bg-[#ea4829] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-orange-500/25 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-white/90" />
              <span>Resume (Admin)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* 2. Blue Cover Letter (Admin) Button */}
            <button
              id="top-suite-cover-letter-btn"
              onClick={onOpenCoverLetter}
              className="px-4 py-2 sm:py-2.5 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-blue-600/25 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-white/90" />
              <span>Cover Letter (Admin)</span>
            </button>

            {/* 3. Dark Outline SQA Blog Button */}
            <button
              id="top-suite-blog-btn"
              onClick={onOpenBlog}
              className="px-4 py-2 sm:py-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 hover:border-slate-600 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-orange-400" />
              <span>SQA Blog</span>
            </button>
          </div>

        </div>
      </div>

      {/* 2. Brand Identity & Live Traffic Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-1">
        {/* Left: Alirabbi.QA with Orange Accent and Shield */}
        <div
          onClick={onBrandClick}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          {/* Shield Icon Box */}
          <div className="p-2.5 rounded-xl bg-[#0d1627] border border-orange-500/50 text-orange-400 shadow-sm shadow-orange-500/10 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-5 h-5 text-orange-500" />
          </div>

          <div>
            <div className="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center">
              <span>Alirabbi</span>
              <span className="text-orange-500">.QA</span>
            </div>
            <p className="text-xs text-slate-400 font-medium tracking-wide">
              Software Quality Assurance Engineer
            </p>
          </div>
        </div>

        {/* Right: Live Traffic Pill */}
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0c1322] border border-slate-800/90 shadow-sm">
          <span className="text-xs font-medium text-slate-400">Live Traffic:</span>
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <Users className="w-3 h-3 text-emerald-400" />
            <span>{visitorCount} VISITORS</span>
          </div>
        </div>
      </div>
    </div>
  );
};

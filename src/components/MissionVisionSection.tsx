import React from 'react';
import {
  Target,
  Rocket,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

interface RoadmapStep {
  step: string;
  title: string;
  isActive?: boolean;
  isUltimate?: boolean;
  activeLabel?: string;
  ultimateLabel?: string;
}

const ROADMAP_STEPS: RoadmapStep[] = [
  {
    step: '01',
    title: 'Junior SQA Engineer',
  },
  {
    step: '02',
    title: 'SQA Engineer\n(Present)',
    isActive: true,
    activeLabel: 'ACTIVE',
  },
  {
    step: '03',
    title: 'Senior SQA Engineer',
  },
  {
    step: '04',
    title: 'Quality Engineering Specialist',
  },
  {
    step: '05',
    title: 'QA Technical Lead / Mentor',
  },
  {
    step: '06',
    title: 'QA Platform Founder',
    isUltimate: true,
    ultimateLabel: 'ULTIMATE GOAL',
  },
];

export const MissionVisionSection: React.FC = () => {
  return (
    <section
      id="mission-vision"
      className="py-16 md:py-24 bg-[#090d16] text-slate-100 relative overflow-hidden"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-r from-orange-500/10 via-blue-500/5 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/30">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>Core Direction & Aspirations</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Mission &amp; Vision
          </h2>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Guiding principles driving my software quality engineering journey, technical growth, and future aspirations.
          </p>
        </div>

        {/* Top Two Main Cards: Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-10">
          
          {/* 1. Mission Card */}
          <div className="rounded-3xl p-6 sm:p-8 md:p-10 bg-[#0d1322]/90 border border-slate-800/90 shadow-2xl backdrop-blur-sm flex flex-col justify-between hover:border-orange-500/40 transition-colors duration-300">
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shadow-sm shadow-orange-500/20">
                  <Target className="w-6 h-6 text-orange-400" />
                </div>
                <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-orange-500/10 text-orange-400 border border-orange-500/30">
                  MY MISSION
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug mb-4">
                Deliver Flawless Software Quality &amp; Elevate QA Standards
              </h3>

              <p className="text-sm text-slate-300 sm:text-[15px] leading-relaxed mb-6 font-normal">
                To rigorously safeguard user experience and software reliability through high-impact manual testing, automated API verification, Playwright test frameworks, and continuous integration—ensuring every release is stable, scalable, and resilient.
              </p>
            </div>

            {/* Checklist items */}
            <div className="pt-6 border-t border-slate-800/80 space-y-3.5">
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 shrink-0 mt-0.5" />
                <span>Maintain 100% test coverage for critical user journeys.</span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 shrink-0 mt-0.5" />
                <span>Integrate automated shift-left continuous testing in CI/CD pipelines.</span>
              </div>
            </div>
          </div>

          {/* 2. Vision Card */}
          <div className="rounded-3xl p-6 sm:p-8 md:p-10 bg-[#0d1322]/90 border border-slate-800/90 shadow-2xl backdrop-blur-sm flex flex-col justify-between hover:border-blue-500/40 transition-colors duration-300">
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-sm shadow-blue-500/20">
                  <Rocket className="w-6 h-6 text-blue-400" />
                </div>
                <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-blue-500/10 text-blue-400 border border-blue-500/30">
                  MY VISION
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug mb-4">
                Build Quality Engineering Solutions &amp; Empower QA Talent
              </h3>

              <p className="text-sm text-slate-300 sm:text-[15px] leading-relaxed mb-6 font-normal">
                To evolve into a Quality Engineering Specialist &amp; Founder of a trusted SQA solutions platform—building open-source automation tools, providing enterprise QA services, and educating the next generation of SQA engineers globally.
              </p>
            </div>

            {/* Checklist items */}
            <div className="pt-6 border-t border-slate-800/80 space-y-3.5">
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 shrink-0 mt-0.5" />
                <span>Develop innovative, developer-friendly QA testing software.</span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 shrink-0 mt-0.5" />
                <span>Mentor and build educational resources for aspiring engineers.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Full-width Card: Career Roadmap Flow */}
        <div className="rounded-3xl p-6 sm:p-8 bg-[#0b101c]/90 border border-slate-800 shadow-xl backdrop-blur-sm">
          {/* Card Title & Subtitle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-800/80 mb-6">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Career Roadmap Flow
              </h3>
            </div>
            <span className="text-[11px] sm:text-xs font-mono tracking-widest uppercase text-slate-400">
              Long-Term Growth
            </span>
          </div>

          {/* 6 Step Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {ROADMAP_STEPS.map((step) => {
              if (step.isActive) {
                return (
                  <div
                    key={step.step}
                    className="relative rounded-2xl p-4 sm:p-5 bg-gradient-to-b from-orange-500/10 to-[#0e1422] border-2 border-orange-500/80 shadow-lg shadow-orange-500/10 flex flex-col justify-between min-h-[140px] sm:min-h-[160px] transition-transform hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between gap-1 mb-3">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold font-mono bg-orange-500 text-white">
                        {step.step}
                      </span>
                      {step.activeLabel && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono tracking-wider bg-orange-500/20 text-orange-400 border border-orange-500/40">
                          {step.activeLabel}
                        </span>
                      )}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs sm:text-sm font-bold text-white whitespace-pre-line leading-tight">
                        {step.title}
                      </h4>
                    </div>
                    <div className="flex justify-end pt-3 text-orange-400">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                );
              }

              if (step.isUltimate) {
                return (
                  <div
                    key={step.step}
                    className="relative rounded-2xl p-4 sm:p-5 bg-gradient-to-b from-purple-500/10 to-[#0e1422] border-2 border-purple-500/80 shadow-lg shadow-purple-500/15 flex flex-col justify-between min-h-[140px] sm:min-h-[160px] transition-transform hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between gap-1 mb-3">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold font-mono bg-purple-600 text-white">
                        {step.step}
                      </span>
                      {step.ultimateLabel && (
                        <span className="px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-bold font-mono tracking-wider bg-purple-500/25 text-purple-300 border border-purple-500/40">
                          {step.ultimateLabel}
                        </span>
                      )}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                        {step.title}
                      </h4>
                    </div>
                    <div className="flex justify-end pt-3 text-purple-400">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={step.step}
                  className="relative rounded-2xl p-4 sm:p-5 bg-[#0e1422]/80 border border-slate-800/90 flex flex-col justify-between min-h-[140px] sm:min-h-[160px] hover:border-slate-700 hover:bg-[#11192b] transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold font-mono bg-slate-800 text-slate-400">
                      {step.step}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs sm:text-sm font-semibold text-slate-300 leading-tight">
                      {step.title}
                    </h4>
                  </div>
                  <div className="flex justify-end pt-3 text-slate-600">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

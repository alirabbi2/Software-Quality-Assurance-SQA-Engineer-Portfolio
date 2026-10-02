import React, { useState, useMemo } from 'react';
import {
  CheckCircle2,
  Wrench,
  Terminal,
  Users,
  Layers,
  Search,
  Code2,
  Sparkles,
  SlidersHorizontal,
  X,
  RotateCcw,
  Award,
  Compass,
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export type SkillLevelTier = 'Expert' | 'Proficient' | 'Familiar';

export const SkillsSection: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const categoryMeta: Record<
    string,
    {
      icon: React.ReactNode;
      gradient: string;
      bgLight: string;
      accentText: string;
      border: string;
    }
  > = {
    'qa-tools': {
      icon: <Wrench className="w-5 h-5 text-blue-500" />,
      gradient: 'from-blue-500 via-sky-500 to-cyan-400',
      bgLight: 'bg-blue-50 dark:bg-blue-950/40',
      accentText: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-200 dark:border-blue-800/60',
    },
    'programming-languages': {
      icon: <Code2 className="w-5 h-5 text-purple-500" />,
      gradient: 'from-purple-500 via-indigo-500 to-sky-400',
      bgLight: 'bg-purple-50 dark:bg-purple-950/40',
      accentText: 'text-purple-600 dark:text-purple-400',
      border: 'border-purple-200 dark:border-purple-800/60',
    },
    'qa-methodology': {
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
      gradient: 'from-emerald-500 via-teal-500 to-teal-400',
      bgLight: 'bg-emerald-50 dark:bg-emerald-950/40',
      accentText: 'text-emerald-600 dark:text-emerald-400',
      border: 'border-emerald-200 dark:border-emerald-800/60',
    },
    'soft-skills': {
      icon: <Users className="w-5 h-5 text-amber-500" />,
      gradient: 'from-amber-500 via-orange-500 to-yellow-400',
      bgLight: 'bg-amber-50 dark:bg-amber-950/40',
      accentText: 'text-amber-600 dark:text-amber-400',
      border: 'border-amber-200 dark:border-amber-800/60',
    },
  };

  // Helper to determine exact level tier metadata and styling
  const getLevelMeta = (levelLabel?: string, levelNumber?: number) => {
    let tier: SkillLevelTier = 'Familiar';
    if (levelLabel === 'Expert' || (!levelLabel && (levelNumber ?? 0) >= 90)) {
      tier = 'Expert';
    } else if (levelLabel === 'Proficient' || (!levelLabel && (levelNumber ?? 0) >= 80)) {
      tier = 'Proficient';
    } else {
      tier = 'Familiar';
    }

    switch (tier) {
      case 'Expert':
        return {
          tier: 'Expert' as const,
          label: 'Expert',
          dots: [true, true, true],
          barGradient: 'from-emerald-500 via-teal-400 to-emerald-300',
          badgeBg: 'bg-emerald-500/10 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
          dotColor: 'bg-emerald-500',
          glowColor: 'shadow-emerald-500/20',
          tooltip: 'Production Mastery & Advanced Strategy',
          icon: <Award className="w-3 h-3 text-emerald-500" />,
        };
      case 'Proficient':
        return {
          tier: 'Proficient' as const,
          label: 'Proficient',
          dots: [true, true, false],
          barGradient: 'from-blue-500 via-sky-400 to-cyan-300',
          badgeBg: 'bg-blue-500/10 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-500/30',
          dotColor: 'bg-blue-500',
          glowColor: 'shadow-blue-500/20',
          tooltip: 'Autonomous Implementation & Scripting',
          icon: <SlidersHorizontal className="w-3 h-3 text-blue-500" />,
        };
      case 'Familiar':
      default:
        return {
          tier: 'Familiar' as const,
          label: 'Familiar',
          dots: [true, false, false],
          barGradient: 'from-amber-500 via-orange-400 to-yellow-300',
          badgeBg: 'bg-amber-500/10 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-500/30',
          dotColor: 'bg-amber-500',
          glowColor: 'shadow-amber-500/20',
          tooltip: 'Working Knowledge & Guided Automation',
          icon: <Compass className="w-3 h-3 text-amber-500" />,
        };
    }
  };

  // Calculate overall metrics & level counts
  const allSkills = useMemo(() => SKILL_CATEGORIES.flatMap((c) => c.skills), []);
  const totalSkillsCount = allSkills.length;
  const avgProficiency = Math.round(
    allSkills.reduce((acc, s) => acc + s.level, 0) / totalSkillsCount
  );

  const levelCounts = useMemo(() => {
    const counts = { all: totalSkillsCount, Expert: 0, Proficient: 0, Familiar: 0 };
    allSkills.forEach((s) => {
      const meta = getLevelMeta(s.proficiencyLabel, s.level);
      counts[meta.tier]++;
    });
    return counts;
  }, [allSkills, totalSkillsCount]);

  // Filtered categories and skills based on category, level tier, and search query
  const filteredCategories = useMemo(() => {
    return SKILL_CATEGORIES.map((cat) => {
      if (selectedCategory !== 'all' && cat.id !== selectedCategory) {
        return null;
      }
      const filteredSkills = cat.skills.filter((s) => {
        const meta = getLevelMeta(s.proficiencyLabel, s.level);

        // Check level filter
        if (selectedLevel !== 'all' && meta.tier !== selectedLevel) {
          return false;
        }

        // Check search query
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          return (
            s.name.toLowerCase().includes(query) ||
            (s.categoryBadge && s.categoryBadge.toLowerCase().includes(query)) ||
            meta.label.toLowerCase().includes(query)
          );
        }

        return true;
      });

      if (filteredSkills.length === 0) return null;
      return {
        ...cat,
        skills: filteredSkills,
      };
    }).filter(Boolean) as typeof SKILL_CATEGORIES;
  }, [selectedCategory, selectedLevel, searchQuery]);

  const totalVisibleSkills = filteredCategories.reduce((acc, cat) => acc + cat.skills.length, 0);

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSelectedLevel('all');
    setSearchQuery('');
  };

  const isFiltered = selectedCategory !== 'all' || selectedLevel !== 'all' || searchQuery !== '';

  return (
    <section id="skills" className="py-16 md:py-24 bg-slate-100/50 dark:bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-400">
            <Layers className="w-3.5 h-3.5" />
            <span>Core Competencies &amp; Technical Proficiency</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t.skills.heading}
          </h2>
          <p className="text-base text-slate-700 dark:text-slate-300">
            {t.skills.subheading}
          </p>
        </div>

        {/* Top Summary & Interactive Level Indicator Bar */}
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-slate-900 dark:text-white">
                {totalSkillsCount} Calibrated Skills
              </span>
            </div>
            <div className="hidden sm:block h-3.5 w-px bg-slate-300 dark:bg-slate-700" />
            <div className="flex items-center gap-1.5">
              <span>Overall Depth:</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {avgProficiency}% Avg
              </span>
            </div>
            <div className="hidden sm:block h-3.5 w-px bg-slate-300 dark:bg-slate-700" />
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>STLC Calibrated</span>
            </div>
          </div>

          {/* Interactive Technical Depth Level Indicators */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 dark:text-slate-500 text-[11px] font-semibold mr-1">
              Level Filter:
            </span>

            {/* All Levels */}
            <button
              onClick={() => setSelectedLevel('all')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 border cursor-pointer ${
                selectedLevel === 'all'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-transparent hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <span>All Levels</span>
              <span className="font-mono opacity-80">({levelCounts.all})</span>
            </button>

            {/* Expert Level Pill */}
            <button
              id="skill-level-expert"
              onClick={() => setSelectedLevel(selectedLevel === 'Expert' ? 'all' : 'Expert')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 border cursor-pointer ${
                selectedLevel === 'Expert'
                  ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm'
                  : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
              }`}
            >
              <span className="flex items-center gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </span>
              <span>Expert (&ge;90%)</span>
              <span className="font-mono font-bold">({levelCounts.Expert})</span>
            </button>

            {/* Proficient Level Pill */}
            <button
              id="skill-level-proficient"
              onClick={() => setSelectedLevel(selectedLevel === 'Proficient' ? 'all' : 'Proficient')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 border cursor-pointer ${
                selectedLevel === 'Proficient'
                  ? 'bg-blue-600 text-white border-blue-700 shadow-sm'
                  : 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20 hover:bg-blue-500/20'
              }`}
            >
              <span className="flex items-center gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
              </span>
              <span>Proficient (80-89%)</span>
              <span className="font-mono font-bold">({levelCounts.Proficient})</span>
            </button>

            {/* Familiar Level Pill */}
            <button
              id="skill-level-familiar"
              onClick={() => setSelectedLevel(selectedLevel === 'Familiar' ? 'all' : 'Familiar')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 border cursor-pointer ${
                selectedLevel === 'Familiar'
                  ? 'bg-amber-600 text-white border-amber-700 shadow-sm'
                  : 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20 hover:bg-amber-500/20'
              }`}
            >
              <span className="flex items-center gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
              </span>
              <span>Familiar (70-79%)</span>
              <span className="font-mono font-bold">({levelCounts.Familiar})</span>
            </button>
          </div>

        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-200/80 dark:bg-slate-800/80 w-full sm:w-auto">
            <button
              id="skill-filter-all"
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t.skills.allSkills}
            </button>
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                id={`skill-filter-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-sm'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {/* Quick Skill Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search tools, languages, or levels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Filter State Bar */}
        {isFiltered && (
          <div className="flex items-center justify-between mb-6 px-2 text-xs text-slate-500 dark:text-slate-400">
            <div>
              <span>Showing </span>
              <strong className="text-slate-900 dark:text-white font-mono">{totalVisibleSkills}</strong>
              <span> of </span>
              <strong className="text-slate-700 dark:text-slate-300 font-mono">{totalSkillsCount}</strong>
              <span> skills</span>
              {selectedLevel !== 'all' && (
                <span className="ml-2 px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold">
                  Level: {selectedLevel}
                </span>
              )}
            </div>

            <button
              onClick={resetAllFilters}
              className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold hover:underline cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}

        {/* Skill Groups Grid */}
        {filteredCategories.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
              <Search className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              No skills match your active criteria
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Try adjusting your level filter ({selectedLevel}) or search query to see other technical proficiencies.
            </p>
            <button
              onClick={resetAllFilters}
              className="px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCategories.map((category) => {
              const meta = categoryMeta[category.id] || {
                icon: <Terminal className="w-5 h-5 text-emerald-500" />,
                gradient: 'from-emerald-500 to-teal-500',
                bgLight: 'bg-slate-50 dark:bg-slate-850',
                accentText: 'text-emerald-500',
                border: 'border-slate-200 dark:border-slate-800',
              };

              return (
                <div
                  key={category.id}
                  className="rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow space-y-5"
                >
                  {/* Category Header */}
                  <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 shadow-sm">
                        {meta.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-slate-900 dark:text-white">
                          {category.title}
                        </h3>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {category.skills.length} technical capabilities
                        </span>
                      </div>
                    </div>

                    <span className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg ${meta.bgLight} ${meta.accentText} border ${meta.border}`}>
                      {Math.round(
                        category.skills.reduce((acc, s) => acc + s.level, 0) / category.skills.length
                      )}% Avg
                    </span>
                  </div>

                  {/* Skills with Precision Visual Progress Bars & Level Indicators */}
                  <div className="space-y-4 pt-1">
                    {category.skills.map((skill) => {
                      const isHovered = hoveredSkill === skill.name;
                      const levelMeta = getLevelMeta(skill.proficiencyLabel, skill.level);

                      return (
                        <div
                          key={skill.name}
                          onMouseEnter={() => setHoveredSkill(skill.name)}
                          onMouseLeave={() => setHoveredSkill(null)}
                          className="group space-y-1.5 transition-all"
                        >
                          {/* Label, Category Badge, Level Indicator Pill & Percentage */}
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                {skill.name}
                              </span>
                              {skill.categoryBadge && (
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-slate-700/50">
                                  {skill.categoryBadge}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              {/* Visual Level Indicator Pill */}
                              <div
                                title={levelMeta.tooltip}
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-wide border flex items-center gap-1.5 transition-colors ${levelMeta.badgeBg}`}
                              >
                                {/* 3-dot visual depth indicator */}
                                <span className="flex items-center gap-0.5" aria-hidden="true">
                                  {levelMeta.dots.map((filled, idx) => (
                                    <span
                                      key={idx}
                                      className={`w-1.5 h-1.5 rounded-full ${
                                        filled ? levelMeta.dotColor : 'bg-slate-300 dark:bg-slate-700'
                                      }`}
                                    />
                                  ))}
                                </span>
                                <span>{levelMeta.label}</span>
                              </div>

                              {/* Numeric Percentage */}
                              <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300 w-9 text-right">
                                {skill.level}%
                              </span>
                            </div>
                          </div>

                          {/* Precision Visual Progress Bar with Gauge Notches */}
                          <div className="relative h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800/90 overflow-hidden ring-1 ring-slate-900/5 dark:ring-white/5">
                            {/* Instrument graduation tick marks (25%, 50%, 75%, 90%) */}
                            <div className="absolute left-1/4 top-0 bottom-0 w-px bg-slate-300/40 dark:bg-slate-700/50 pointer-events-none z-10" />
                            <div className="absolute left-2/4 top-0 bottom-0 w-px bg-slate-300/40 dark:bg-slate-700/50 pointer-events-none z-10" />
                            <div className="absolute left-3/4 top-0 bottom-0 w-px bg-slate-300/40 dark:bg-slate-700/50 pointer-events-none z-10" />
                            <div className="absolute left-[90%] top-0 bottom-0 w-px bg-emerald-400/30 pointer-events-none z-10" title="Expert Threshold (90%)" />

                            {/* Dynamic Level-Calibrated Gradient Fill with Interactive Glow */}
                            <div
                              className={`h-full rounded-full bg-gradient-to-r ${levelMeta.barGradient} transition-all duration-700 ease-out relative ${
                                isHovered ? `brightness-110 shadow-sm ${levelMeta.glowColor}` : ''
                              }`}
                              style={{ width: `${skill.level}%` }}
                            >
                              {/* Leading Edge Light Indicator */}
                              <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-white/80 rounded-full shadow-xs" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Testing Methodology Workflow Banner */}
        <div className="mt-12 rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white border border-slate-800 shadow-xl">
          <div className="max-w-3xl mb-6">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Testing Life Cycle (STLC) Workflow
            </span>
            <h3 className="text-xl font-bold mt-1">
              End-to-End Quality Assurance Execution Model
            </h3>
            <p className="text-sm text-slate-200 mt-1">
              How I deliver zero-critical-defect releases through structured testing principles.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { step: '01', title: 'Requirement Analysis', desc: 'FRD & User Stories' },
              { step: '02', title: 'Test Planning', desc: 'Scope, Strategy, SLAs' },
              { step: '03', title: 'Test Case Design', desc: 'BVA & Equivalence' },
              { step: '04', title: 'Environment Setup', desc: 'Chrome DevTools / DB' },
              { step: '05', title: 'Execution & Defect Log', desc: 'Jira Severity/Priority' },
              { step: '06', title: 'Test Closure', desc: 'Sign-off & RTM' },
            ].map((phase) => (
              <div
                key={phase.step}
                className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-mono font-bold text-emerald-400">
                    Phase {phase.step}
                  </span>
                  <h4 className="text-xs font-bold text-white mt-1 line-clamp-2">
                    {phase.title}
                  </h4>
                </div>
                <span className="text-[10px] text-slate-300 mt-2">
                  {phase.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

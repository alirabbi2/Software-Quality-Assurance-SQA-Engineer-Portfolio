import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  FileDown,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  CheckCircle2,
  Bug,
  Award,
  FileCheck,
  Play,
  ArrowRight,
  Cpu,
  Briefcase,
  GraduationCap,
  Compass,
  ArrowUpRight,
  Layers,
  Camera,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { useAnalytics } from '../context/AnalyticsContext';

interface HeroProps {
  onOpenResume: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume, onScrollToSection }) => {
  const { language, t } = useLanguage();
  const { trackResumeDownload } = useAnalytics();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profileImage, setProfileImage] = useState<string>(() => {
    return localStorage.getItem('rabbi_profile_image') || PERSONAL_INFO.avatar;
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setProfileImage(result);
        localStorage.setItem('rabbi_profile_image', result);
        window.dispatchEvent(new Event('rabbi-avatar-updated'));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeClick = () => {
    trackResumeDownload();
    onOpenResume();
  };

  const allSectionsData = [
    {
      id: 'hero',
      title: language === 'bn' ? 'পরিচিতি ও প্রোফাইল' : 'About & Profile',
      desc: language === 'bn' ? 'কিউএ ক্যারিয়ার অবজেক্টিভ, যোগাযোগের বিবরণ ও পরিচিতি' : 'Career objective, credentials, and SQA methodology profile',
      icon: ShieldCheck,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800',
    },
    {
      id: 'skills',
      title: language === 'bn' ? 'প্রযুক্তিগত দক্ষতা' : 'Technical Skills',
      desc: language === 'bn' ? 'পোস্টম্যান, জিরা, টেস্টরেইল, এসকিউএল ও এসটিএলসি ফ্রেমওয়ার্ক' : 'Postman, Jira, TestRail, SQL, STLC, and test design techniques',
      icon: Cpu,
      color: 'text-teal-600 dark:text-teal-400',
      bg: 'bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800',
    },
    {
      id: 'projects',
      title: language === 'bn' ? 'কিউএ প্রজেক্টসমূহ' : 'QA Projects & Artifacts',
      desc: language === 'bn' ? 'ই-কমার্স টেস্ট স্যুট, ডিফেক্ট ট্র্যাকিং রিপোর্ট ও এপিআই কালেকশন' : 'Real-world test plans, bug triage reports & API suites',
      icon: Briefcase,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800',
    },
    {
      id: 'journey',
      title: language === 'bn' ? 'অভিজ্ঞতা ও শিক্ষা' : 'Journey & Education',
      desc: language === 'bn' ? 'ড্যাফোডিল ইন্টারন্যাশনাল বিশ্ববিদ্যালয় সিএসই ও প্রফেশনাল ট্রেনিং' : 'B.Sc. in CSE (DIU), Ostad SQA training & QA career timeline',
      icon: GraduationCap,
      color: 'text-indigo-600 dark:text-indigo-400',
      bg: 'bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800',
    },
    {
      id: 'certifications',
      title: language === 'bn' ? 'সনদপত্র ও স্বীকৃতি' : 'Certifications',
      desc: language === 'bn' ? 'যাচাইকৃত সফটওয়্যার কোয়ালিটি অ্যাসিউরেন্স সার্টিফিকেশন ও ক্রেডেনশিয়াল' : 'Verified SQA certifications, credential IDs & badges',
      icon: Award,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800',
    },
    {
      id: 'tests',
      title: language === 'bn' ? 'লাইভ টেস্ট স্যুট' : 'Live Test Runner',
      desc: language === 'bn' ? '৭টি টেস্ট কেস অটোমেশন সিমুলেশন এবং অডিট পিডিএফ রিপোর্ট ডাউনলোড' : 'Interactive execution of 7 test cases & PDF audit export',
      icon: Play,
      color: 'text-cyan-600 dark:text-cyan-400',
      bg: 'bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800',
    },
    {
      id: 'contact',
      title: language === 'bn' ? 'যোগাযোগ ও নেটওয়ার্ক' : 'Contact & Connect',
      desc: language === 'bn' ? 'বার্তা পাঠান, লিংকডইন নেটওয়ার্কিং ও গিটহাব রিপোজিটরি' : 'Direct contact form, LinkedIn networking & GitHub profile',
      icon: Mail,
      color: 'text-rose-600 dark:text-rose-400',
      bg: 'bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800',
    },
  ];

  return (
    <section
      id="hero"
      className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden"
    >
      {/* Background ambient accents */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-500/5 via-teal-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Content Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Availability Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{t.hero.badge}</span>
            </div>

            {/* Name & Title */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {language === 'bn' ? PERSONAL_INFO.banglaName : PERSONAL_INFO.name}
              </h1>
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                {language === 'bn' ? PERSONAL_INFO.banglaTitle : PERSONAL_INFO.title}
              </h2>
            </div>

            {/* Career Objective */}
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 leading-relaxed max-w-2xl font-normal">
              {language === 'bn' ? PERSONAL_INFO.banglaCareerObjective : PERSONAL_INFO.careerObjective}
            </p>

            {/* Contact Metadata Chips */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{language === 'bn' ? PERSONAL_INFO.banglaLocation : PERSONAL_INFO.location}</span>
              </div>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
              <a
                href={`tel:01336312097`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{PERSONAL_INFO.phone}</span>
              </a>
            </div>

            {/* Social Links & Profiles */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn Profile</span>
              </a>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repos</span>
              </a>
            </div>

            {/* Quick Section Jump Pills (Upore Sob Section) */}
            <div className="pt-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1 mr-1">
                  <Compass className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{language === 'bn' ? 'উপরে সব সেকশন:' : 'Jump to:'}</span>
                </span>
                {[
                  { id: 'skills', label: language === 'bn' ? 'দক্ষতা' : 'Skills' },
                  { id: 'projects', label: language === 'bn' ? 'প্রজেক্ট' : 'Projects' },
                  { id: 'journey', label: language === 'bn' ? 'অভিজ্ঞতা' : 'Journey' },
                  { id: 'certifications', label: language === 'bn' ? 'সনদপত্র' : 'Certs' },
                  { id: 'tests', label: language === 'bn' ? 'টেস্ট স্যুট' : 'Live Tests' },
                  { id: 'contact', label: language === 'bn' ? 'যোগাযোগ' : 'Contact' },
                ].map((s) => (
                  <button
                    key={s.id}
                    id={`hero-pill-${s.id}`}
                    onClick={() => onScrollToSection(s.id)}
                    className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-slate-750 dark:hover:text-emerald-300 border border-slate-200/80 dark:border-slate-700/80 transition-colors shadow-xs"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                id="hero-projects-cta"
                onClick={() => onScrollToSection('projects')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 transition-all hover:-translate-y-0.5"
              >
                <span>{t.hero.ctaProjects}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-resume-cta"
                onClick={handleResumeClick}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all hover:-translate-y-0.5 shadow-sm"
              >
                <FileDown className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{t.hero.ctaResume}</span>
              </button>

              <button
                id="hero-testsuite-cta"
                onClick={() => onScrollToSection('tests')}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Play className="w-4 h-4 text-emerald-500 fill-emerald-500" />
                <span>Run QA Tests</span>
              </button>
            </div>
          </div>

          {/* Right Visual Profile & SQA Metrics Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
              
              {/* Profile Card Header */}
              <div className="flex items-center gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-emerald-500 shrink-0 shadow-md group">
                  <img
                    src={profileImage || PERSONAL_INFO.avatar}
                    alt={`${PERSONAL_INFO.name} - SQA Engineer`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      // Fallback gracefully to avatar
                      (e.target as HTMLImageElement).src = PERSONAL_INFO.avatar;
                    }}
                  />
                  {/* Subtle Change Photo Overlay */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    title="ছবি পরিবর্তন করুন / Update Photo"
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[10px] font-semibold gap-0.5 cursor-pointer"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Change</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div
                    className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 shadow-sm"
                    title="Available for SQA roles"
                  />
                </div>
                <div>
                  <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span>Verified SQA Profile</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {language === 'bn' ? PERSONAL_INFO.banglaName : PERSONAL_INFO.name}
                  </h3>
                  <p className="text-xs text-slate-700 dark:text-slate-300">
                    B.Sc. in CSE • Software QA Engineer
                  </p>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 font-medium"
                  >
                    <Camera className="w-3 h-3" />
                    <span>{language === 'bn' ? 'ছবি আপডেট করুন' : 'Update Photo'}</span>
                  </button>
                </div>
              </div>

              {/* SQA Test Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 mb-1">
                    <span className="text-xs font-medium">Test Execution</span>
                    <FileCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    350+
                  </div>
                  <span className="text-[11px] text-slate-600 dark:text-slate-300">
                    Manual & API test cases
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 mb-1">
                    <span className="text-xs font-medium">Bugs Triaged</span>
                    <Bug className="w-4 h-4 text-rose-500" />
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    95+
                  </div>
                  <span className="text-[11px] text-slate-600 dark:text-slate-300">
                    Logged & verified in Jira
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 mb-1">
                    <span className="text-xs font-medium">STLC Coverage</span>
                    <ShieldCheck className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    100%
                  </div>
                  <span className="text-[11px] text-slate-600 dark:text-slate-300">
                    Functional & regression
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 mb-1">
                    <span className="text-xs font-medium">Data Accuracy</span>
                    <Award className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    99.4%
                  </div>
                  <span className="text-[11px] text-slate-600 dark:text-slate-300">
                    SQL & annotation QA
                  </span>
                </div>
              </div>

              {/* Core Testing Toolkit summary */}
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Primary QA Stack:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['Jira', 'Postman', 'Chrome DevTools', 'SQL', 'TestRail', 'MS Excel', 'Git', 'Agile/Scrum'].map(
                    (tool) => (
                      <span
                        key={tool}
                        className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                      >
                        {tool}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* All Portfolio Sections Quick Access Hub (Upore Sob Section) */}
        <div id="all-sections-hub" className="mt-14 pt-8 border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-xs">
                  <Compass className="w-4 h-4" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                  {language === 'bn' ? 'সকল পোর্টফোলিও সেকশন' : 'All Portfolio Sections'}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                {language === 'bn'
                  ? 'সরাসরি যেকোনো সেকশনে যেতে নিচের কার্ডটিতে ক্লিক করুন'
                  : 'Instant one-click navigation across all 7 Software QA portfolio modules'}
              </p>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>7 Sections Active</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
            {allSectionsData.map((sec) => {
              const Icon = sec.icon;
              return (
                <button
                  key={sec.id}
                  id={`hub-card-${sec.id}`}
                  onClick={() => onScrollToSection(sec.id)}
                  className="group p-4 rounded-xl text-left bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${sec.bg}`}>
                        <Icon className={`w-4 h-4 ${sec.color}`} />
                      </div>
                      <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/50 transition-colors">
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                      <span>{sec.title}</span>
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {sec.desc}
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                    <span>{language === 'bn' ? 'সেকশনে যান' : 'Jump to section'}</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

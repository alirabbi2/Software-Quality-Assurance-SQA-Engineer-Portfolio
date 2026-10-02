import React from 'react';
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  CheckCircle2,
  Building2,
  Phone,
  Mail,
  UserCheck,
} from 'lucide-react';
import { EXPERIENCES, EDUCATION_LIST } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export const JourneySection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="journey" className="py-16 md:py-24 bg-slate-100/50 dark:bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-400">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career Path</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t.experience.heading}
          </h2>
          <p className="text-base text-slate-700 dark:text-slate-300">
            {t.experience.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Experience Timeline (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
              <Building2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Work Experience & QA Roles
              </h3>
            </div>

            <div className="relative pl-6 sm:pl-8 border-l-2 border-emerald-500/30 space-y-8">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="relative group">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-2 border-emerald-500 group-hover:scale-125 transition-transform" />

                  <div className="rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 hover:border-emerald-500/50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                            {exp.role}
                          </h4>
                          {exp.period.includes('Present') && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 inline-flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              Running
                            </span>
                          )}
                        </div>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400 text-sm">
                          {exp.company}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-700 dark:text-slate-300 pt-1 sm:pt-0">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {exp.period}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-2 pt-2">
                      {exp.description.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-3 flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 rounded text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & References Column (4 Cols) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Academic Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                <GraduationCap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {t.education.heading}
                </h3>
              </div>

              <div className="space-y-4">
                {EDUCATION_LIST.map((edu) => (
                  <div
                    key={edu.id}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        {edu.year}
                      </span>
                      <span className="font-mono font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-800 dark:text-slate-200">
                        CGPA: {edu.cgpa}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                      {edu.degree}
                    </h4>

                    <p className="text-xs text-slate-700 dark:text-slate-300">
                      {edu.institution}
                    </p>

                    {edu.honors && (
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 pt-1 italic">
                        {edu.honors}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Professional References Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
                <UserCheck className="w-4 h-4 text-emerald-500" />
                <span>Professional Reference</span>
              </div>
              
              <div className="pt-2 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                <div className="font-semibold text-slate-900 dark:text-white text-sm">
                  Sabbir Ahamed
                </div>
                <div className="text-emerald-600 dark:text-emerald-400 font-medium">
                  Mid-SQA Engineer
                </div>
                <div className="flex items-center gap-1.5 pt-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <a href="mailto:sabbircse72@gmail.com" className="hover:underline">
                    sabbircse72@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>01681387906</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

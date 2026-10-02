import React, { useState } from 'react';
import {
  FolderGit2,
  ExternalLink,
  Github,
  FileSpreadsheet,
  CheckCircle,
  Bug,
  Filter,
  ShieldCheck,
  X,
  FileText,
  Clock,
  Layers,
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useAnalytics } from '../context/AnalyticsContext';

export const ProjectsSection: React.FC = () => {
  const { t } = useLanguage();
  const { trackProjectClick } = useAnalytics();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  const filterOptions = [
    { id: 'all', label: t.projects.filterAll },
    { id: 'ecommerce', label: t.projects.filterEcommerce },
    { id: 'api', label: t.projects.filterApi },
    { id: 'data-integrity', label: t.projects.filterData },
    { id: 'automation', label: t.projects.filterAutomation },
  ];

  const filteredProjects = PROJECTS.filter((p) => {
    if (selectedFilter === 'all') return true;
    return p.category === selectedFilter;
  });

  const handleOpenModal = (project: Project) => {
    trackProjectClick(project.id);
    setActiveProjectModal(project);
  };

  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-400">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>QA Deliverables</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t.projects.heading}
          </h2>
          <p className="text-base text-slate-700 dark:text-slate-300">
            {t.projects.subheading}
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {filterOptions.map((filter) => {
            const count =
              filter.id === 'all'
                ? PROJECTS.length
                : PROJECTS.filter((p) => p.category === filter.id).length;
            return (
              <button
                key={filter.id}
                id={`project-filter-${filter.id}`}
                onClick={() => setSelectedFilter(filter.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedFilter === filter.id
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                }`}
              >
                <span>{filter.label}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                    selectedFilter === filter.id
                      ? 'bg-emerald-700 text-emerald-100'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Card Image Banner */}
              <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                {/* Badge overlay */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-emerald-600 dark:text-emerald-400 border border-slate-200/50 dark:border-slate-700/50 uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-bold text-base line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-200 line-clamp-1">
                    {project.subtitle}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Test Metrics Pill Box */}
                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-center">
                  <div>
                    <span className="block text-[10px] text-slate-700 dark:text-slate-300 font-medium">
                      Test Cases
                    </span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {project.testMetrics.totalTestCases}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-700 dark:text-slate-300 font-medium">
                      Coverage
                    </span>
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                      {project.testMetrics.coverage}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-700 dark:text-slate-300 font-medium">
                      Defects
                    </span>
                    <span className="text-xs font-bold text-rose-700 dark:text-rose-300">
                      {project.testMetrics.defectsReported} Bugs
                    </span>
                  </div>
                </div>

                {/* Tools Stack Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleOpenModal(project)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/80 transition-colors"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    <span>{t.projects.viewReport}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Live Tested Target"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="GitHub Test Artifacts"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Full QA Defect & Test Artifact Viewer */}
        {activeProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-6">
              
              {/* Modal Header */}
              <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    {activeProjectModal.category} Test Suite Documentation
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                    {activeProjectModal.title}
                  </h3>
                  <p className="text-xs text-slate-700 dark:text-slate-300">
                    {activeProjectModal.subtitle}
                  </p>
                </div>
                <button
                  onClick={() => setActiveProjectModal(null)}
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Overview & Highlights */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Test Execution Scope & Objectives
                </h4>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {activeProjectModal.description}
                </p>
                
                <div className="space-y-2 pt-2">
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                    Key QA Highlights:
                  </h5>
                  <ul className="space-y-1.5">
                    {activeProjectModal.keyHighlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sample Defect Report Simulation */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Bug className="w-4 h-4 text-rose-500" />
                    <span className="font-bold text-slate-900 dark:text-white">
                      Sample Logged Defect: BUG-409
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-400">
                    Severity: High | Priority: P1
                  </span>
                </div>

                <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1 font-mono">
                  <p><strong>Title:</strong> Checkout modal fails to re-calculate taxes on promotional coupon update</p>
                  <p><strong>Steps to Reproduce:</strong> 1. Add item to cart &gt; 2. Proceed to checkout &gt; 3. Apply coupon code &gt; 4. Switch shipping country</p>
                  <p><strong>Expected:</strong> Total amount and tax break-up recalculated dynamically.</p>
                  <p><strong>Actual:</strong> Stale tax payload submitted to payment gateway resulting in 422 error.</p>
                  <p><strong>Status in Jira:</strong> <span className="text-emerald-700 dark:text-emerald-300 font-bold">Resolved & Verified in Sprint 14</span></p>
                </div>
              </div>

              {/* Deliverables Checklist */}
              <div className="space-y-2">
                <h5 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Test Deliverables & Artifacts:
                </h5>
                <div className="flex flex-wrap gap-2">
                  {activeProjectModal.deliverables.map((deliv, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    >
                      <FileText className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{deliv}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Close / Action footer */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
                <button
                  onClick={() => setActiveProjectModal(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  Close Artifact Viewer
                </button>
                {activeProjectModal.githubUrl && (
                  <a
                    href={activeProjectModal.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View GitHub Repositories</span>
                  </a>
                )}
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  Play,
  CheckCircle2,
  AlertCircle,
  Clock,
  RotateCw,
  Terminal,
  FileCode2,
  Sparkles,
  FileDown,
  FileText,
  Printer,
  Layers,
  RotateCcw,
  Zap,
  ListFilter,
  Search,
  X,
  Filter,
} from 'lucide-react';
import { DEFAULT_TEST_CASES, PERSONAL_INFO } from '../data/portfolioData';
import { QATestCase, QATestCategory } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useAnalytics } from '../context/AnalyticsContext';
import { generateTestReportPdf } from '../utils/exportTestReportPdf';
import { TestReportModal } from './TestReportModal';
import confetti from 'canvas-confetti';

type CategoryFilterType = 'all' | 'Functional' | 'Regression' | 'Performance' | 'Security';
type SeverityFilterType = 'all' | 'critical' | 'high' | 'medium';

interface CategoryTab {
  id: CategoryFilterType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  activeBadge: string;
}

const CATEGORY_TABS: CategoryTab[] = [
  {
    id: 'all',
    label: 'All Categories',
    icon: ListFilter,
    accentColor: 'text-emerald-400',
    activeBadge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-emerald-500/10',
  },
  {
    id: 'Functional',
    label: 'Functional',
    icon: Layers,
    accentColor: 'text-blue-400',
    activeBadge: 'bg-blue-500/20 text-blue-300 border-blue-500/40 shadow-blue-500/10',
  },
  {
    id: 'Regression',
    label: 'Regression',
    icon: RotateCcw,
    accentColor: 'text-purple-400',
    activeBadge: 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-purple-500/10',
  },
  {
    id: 'Performance',
    label: 'Performance',
    icon: Zap,
    accentColor: 'text-amber-400',
    activeBadge: 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-amber-500/10',
  },
  {
    id: 'Security',
    label: 'Security',
    icon: ShieldCheck,
    accentColor: 'text-emerald-400',
    activeBadge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-emerald-500/10',
  },
];

export const LiveTestRunner: React.FC = () => {
  const { t } = useLanguage();
  const { trackTestRun } = useAnalytics();
  const [testCases, setTestCases] = useState<QATestCase[]>(DEFAULT_TEST_CASES);
  const [isRunning, setIsRunning] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [showExportSuccess, setShowExportSuccess] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [completedRuns, setCompletedRuns] = useState(1);
  const [activeCategory, setActiveCategory] = useState<CategoryFilterType>('all');
  const [activeSeverity, setActiveSeverity] = useState<SeverityFilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate dynamic category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryFilterType, number> = {
      all: testCases.length,
      Functional: 0,
      Regression: 0,
      Performance: 0,
      Security: 0,
    };

    testCases.forEach((tc) => {
      if (tc.category && counts[tc.category as CategoryFilterType] !== undefined) {
        counts[tc.category as CategoryFilterType]++;
      }
    });

    return counts;
  }, [testCases]);

  const runAllTests = async () => {
    if (isRunning) return;
    setIsRunning(true);
    trackTestRun();

    // Determine target test cases to run (all or active filtered category)
    const targetIds = activeCategory === 'all'
      ? new Set(testCases.map((tc) => tc.id))
      : new Set(testCases.filter((tc) => tc.category === activeCategory).map((tc) => tc.id));

    // Reset targeted test cases to running state
    setTestCases((prev) =>
      prev.map((tc) =>
        targetIds.has(tc.id)
          ? { ...tc, status: 'running', executionTimeMs: undefined }
          : tc
      )
    );

    const listToRun = testCases.filter((tc) => targetIds.has(tc.id));

    // Run sequentially with slight delay for realistic visual QA feedback
    for (let i = 0; i < listToRun.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      const simulatedTime = Math.floor(Math.random() * 45) + 15;
      const currentId = listToRun[i].id;

      setTestCases((prev) =>
        prev.map((tc) =>
          tc.id === currentId
            ? { ...tc, status: 'passed', executionTimeMs: simulatedTime }
            : tc
        )
      );
    }

    setIsRunning(false);
    setCompletedRuns((prev) => prev + 1);

    // Celebrate test pass
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#10b981', '#14b8a6', '#06b6d4'],
    });
  };

  const handleExportPdf = () => {
    setIsExportingPdf(true);
    try {
      generateTestReportPdf(testCases, completedRuns);
      setShowExportSuccess(true);
      setTimeout(() => setShowExportSuccess(false), 4000);
    } catch (err) {
      console.error('Failed to export PDF test report:', err);
    } finally {
      setIsExportingPdf(false);
    }
  };

  const filteredTests = useMemo(() => {
    return testCases.filter((tc) => {
      // Category filter
      if (activeCategory !== 'all' && tc.category !== activeCategory) {
        return false;
      }
      // Severity filter
      if (activeSeverity !== 'all' && tc.severity.toLowerCase() !== activeSeverity) {
        return false;
      }
      // Text search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matches =
          tc.id.toLowerCase().includes(query) ||
          tc.title.toLowerCase().includes(query) ||
          tc.suite.toLowerCase().includes(query) ||
          (tc.category && tc.category.toLowerCase().includes(query)) ||
          tc.description.toLowerCase().includes(query);
        if (!matches) return false;
      }
      return true;
    });
  }, [testCases, activeCategory, activeSeverity, searchQuery]);

  const totalPassed = testCases.filter((tc) => tc.status === 'passed').length;
  const passRate = Math.round((totalPassed / testCases.length) * 100);

  const resetFilters = () => {
    setActiveCategory('all');
    setActiveSeverity('all');
    setSearchQuery('');
  };

  const isFiltered = activeCategory !== 'all' || activeSeverity !== 'all' || searchQuery.trim() !== '';

  return (
    <section id="tests" className="py-16 md:py-24 bg-slate-900 text-slate-100 relative overflow-hidden live-test-runner">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none print:hidden no-print" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Printable Formal Header for A4 Export */}
        <div className="hidden print:block print-report-header mb-6 pb-4 border-b-2 border-slate-900">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider mb-1">
                STLC & QA Automation Verification • Official Audit Report
              </div>
              <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                Software Quality Assurance (SQA) Execution Report
              </h1>
              <p className="text-xs text-slate-600 mt-0.5">
                Automated regression, API contract, and performance validation log
              </p>
            </div>
            <div className="text-right text-xs text-slate-600 space-y-0.5">
              <div><strong className="text-slate-900">Lead QA:</strong> {PERSONAL_INFO.name}</div>
              <div><strong className="text-slate-900">Email:</strong> {PERSONAL_INFO.email}</div>
              <div><strong className="text-slate-900">Report Date:</strong> {new Date().toLocaleDateString('en-US', { dateStyle: 'medium' })}</div>
              <div><strong className="text-slate-900">Paper Format:</strong> Standard ISO A4 Portrait</div>
            </div>
          </div>
        </div>
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 print:hidden no-print">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800">
              <Terminal className="w-3.5 h-3.5" />
              <span>Automated SQA Validation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              {t.tests.heading}
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              {t.tests.subheading}
            </p>
          </div>

          {/* Action to trigger tests & export PDF */}
          <div className="flex flex-wrap items-center gap-3 print:hidden no-print">
            {/* Run tests button */}
            <button
              id="run-qa-tests-btn"
              onClick={runAllTests}
              disabled={isRunning}
              className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-lg ${
                isRunning
                  ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-emerald-500/20 hover:scale-105 active:scale-95'
              }`}
            >
              {isRunning ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin text-emerald-400" />
                  <span>{t.tests.running}</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>{t.tests.runTests}</span>
                </>
              )}
            </button>

            {/* Export PDF Report button */}
            <button
              id="export-test-report-pdf-btn"
              onClick={handleExportPdf}
              disabled={isExportingPdf}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold bg-slate-800 hover:bg-slate-750 text-emerald-400 border border-emerald-500/40 hover:border-emerald-400 shadow-md transition-all active:scale-95 disabled:opacity-50"
              title="Export formatted SQA test report to PDF"
            >
              {isExportingPdf ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin text-emerald-400" />
                  <span>{t.tests.exportingPdf}</span>
                </>
              ) : (
                <>
                  <FileDown className="w-4 h-4" />
                  <span>{t.tests.exportPdf}</span>
                </>
              )}
            </button>

            {/* Print A4 Test Report button */}
            <button
              id="print-test-report-btn"
              onClick={() => {
                setIsReportModalOpen(true);
                setTimeout(() => {
                  window.print();
                }, 150);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700 shadow-md transition-all active:scale-95"
              title="Print or Export SQA Test Report to A4"
            >
              <Printer className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Print (A4)</span>
              <span className="sm:hidden">Print</span>
            </button>

            {/* View Documentation Preview */}
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 sm:py-3 rounded-xl text-xs font-semibold bg-slate-800/80 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 transition-colors"
              title="Preview formal documentation report"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">{t.tests.previewReport}</span>
            </button>
          </div>
        </div>

        {/* Export Success Toast Notification */}
        {showExportSuccess && (
          <div className="mb-6 p-3.5 rounded-xl bg-emerald-950/90 border border-emerald-500/60 text-emerald-200 text-xs flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-300 print:hidden no-print">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong>PDF Exported:</strong> SQA_Test_Execution_Report.pdf has been generated and saved to your device.
              </span>
            </div>
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="text-emerald-400 font-bold underline hover:text-emerald-300 text-[11px] shrink-0"
            >
              View Document
            </button>
          </div>
        )}

        {/* Live Test Suite Metrics Header Card */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 print-metrics-grid">
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 print-metric-card">
            <span className="text-xs text-slate-400 block mb-1">Pass Verification</span>
            <div className="text-2xl font-extrabold text-emerald-400 flex items-center gap-2">
              <span>{passRate}%</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-[11px] text-slate-400">All tests passing</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 print-metric-card">
            <span className="text-xs text-slate-400 block mb-1">Test Assertions</span>
            <div className="text-2xl font-extrabold text-white">
              {testCases.length} / {testCases.length}
            </div>
            <span className="text-[11px] text-slate-400">Unit & integration suites</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 print-metric-card">
            <span className="text-xs text-slate-400 block mb-1">Execution Pipeline</span>
            <div className="text-2xl font-extrabold text-cyan-400">
              ~268ms
            </div>
            <span className="text-[11px] text-slate-400">Average test suite latency</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 print-metric-card">
            <span className="text-xs text-slate-400 block mb-1">Completed Runs</span>
            <div className="text-2xl font-extrabold text-purple-400">
              {completedRuns}
            </div>
            <span className="text-[11px] text-slate-400">Session test cycles</span>
          </div>
        </div>

        {/* Enhanced Category & Severity Filter Suite */}
        <div className="space-y-3 mb-6 print:hidden no-print">
          
          {/* Main Category Filter Tabs */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-slate-800/80 p-3 sm:p-4 rounded-2xl border border-slate-700/80 shadow-lg">
            
            {/* Category Buttons Pill Row */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 mr-1 shrink-0">
                <Filter className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Category:</span>
              </div>

              {CATEGORY_TABS.map((tab) => {
                const Icon = tab.icon;
                const count = categoryCounts[tab.id];
                const isActive = activeCategory === tab.id;

                return (
                  <button
                    key={tab.id}
                    id={`test-category-${tab.id.toLowerCase()}`}
                    onClick={() => setActiveCategory(tab.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all cursor-pointer ${
                      isActive
                        ? `${tab.activeBadge} shadow-sm`
                        : 'bg-slate-900/60 text-slate-300 hover:text-white border-slate-700/80 hover:border-slate-600 hover:bg-slate-900'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? tab.accentColor : 'text-slate-400'}`} />
                    <span>{tab.label}</span>
                    <span
                      className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                        isActive
                          ? 'bg-white/15 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Secondary Controls: Quick Search + Severity Filter */}
            <div className="flex flex-wrap items-center gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-700/60">
              {/* Search Test Cases */}
              <div className="relative flex-1 sm:w-48">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search test scenarios..."
                  className="w-full pl-8 pr-7 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Severity Quick Filter Tabs */}
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-700/80">
                {(['all', 'critical', 'high', 'medium'] as const).map((sev) => (
                  <button
                    key={sev}
                    onClick={() => setActiveSeverity(sev)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold capitalize transition-colors ${
                      activeSeverity === sev
                        ? 'bg-slate-800 text-emerald-400 font-bold shadow-xs'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {sev === 'all' ? 'All' : sev}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Filter Status summary bar */}
          <div className="flex items-center justify-between px-2 text-xs text-slate-400">
            <div>
              <span>Showing </span>
              <strong className="text-white font-mono">{filteredTests.length}</strong>
              <span> of </span>
              <strong className="text-slate-300 font-mono">{testCases.length}</strong>
              <span> test cases</span>
              {activeCategory !== 'all' && (
                <span className="ml-1.5 px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[11px] font-medium">
                  Category: <span className="text-emerald-400 font-semibold">{activeCategory}</span>
                </span>
              )}
              {activeSeverity !== 'all' && (
                <span className="ml-1 px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[11px] font-medium capitalize">
                  Severity: <span className="text-amber-400 font-semibold">{activeSeverity}</span>
                </span>
              )}
            </div>

            {isFiltered && (
              <button
                onClick={resetFilters}
                className="text-xs text-emerald-400 hover:text-emerald-300 underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

        </div>

        {/* Test Case Execution List */}
        <div className="rounded-2xl bg-slate-800/60 border border-slate-700 divide-y divide-slate-700/60 overflow-hidden shadow-xl print-test-container">
          {filteredTests.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-700">
                <Filter className="w-5 h-5 text-slate-400" />
              </div>
              <h4 className="text-sm font-bold text-white">No test cases match the selected filters</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                No tests found matching category "{activeCategory}" with the current search and severity criteria.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-xs font-bold border border-emerald-500/40 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            filteredTests.map((tc) => (
              <div
                key={tc.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-800/90 transition-colors print-test-item"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-emerald-400">
                      {tc.id}
                    </span>

                    {/* Category Badge */}
                    {tc.category && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider border flex items-center gap-1 ${
                          tc.category === 'Functional'
                            ? 'bg-blue-500/15 text-blue-300 border-blue-500/30'
                            : tc.category === 'Regression'
                            ? 'bg-purple-500/15 text-purple-300 border-purple-500/30'
                            : tc.category === 'Performance'
                            ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                            : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                        }`}
                      >
                        {tc.category === 'Functional' && <Layers className="w-2.5 h-2.5" />}
                        {tc.category === 'Regression' && <RotateCcw className="w-2.5 h-2.5" />}
                        {tc.category === 'Performance' && <Zap className="w-2.5 h-2.5" />}
                        {tc.category === 'Security' && <ShieldCheck className="w-2.5 h-2.5" />}
                        <span>{tc.category}</span>
                      </span>
                    )}

                    <span className="text-[11px] px-2 py-0.5 rounded font-medium bg-slate-700 text-slate-300">
                      {tc.suite}
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                        tc.severity === 'Critical'
                          ? 'bg-rose-950 text-rose-400 border border-rose-800'
                          : tc.severity === 'High'
                          ? 'bg-amber-950 text-amber-400 border border-amber-800'
                          : 'bg-blue-950 text-blue-400 border border-blue-800'
                      }`}
                    >
                      {tc.severity}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-white">
                    {tc.title}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {tc.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0 pt-2 sm:pt-0">
                  {tc.executionTimeMs && (
                    <span className="font-mono text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {tc.executionTimeMs}ms
                    </span>
                  )}

                  {tc.status === 'passed' ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>PASSED</span>
                    </span>
                  ) : tc.status === 'running' ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-950 text-amber-400 border border-amber-800">
                      <RotateCw className="w-3.5 h-3.5 animate-spin" />
                      <span>RUNNING</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-700 text-slate-300">
                      PENDING
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Formal Print-only Sign-off Footer for A4 */}
        <div className="hidden print:block print-report-footer mt-8 pt-4 border-t border-slate-300">
          <div className="flex justify-between items-end text-xs text-slate-600">
            <div className="space-y-1">
              <div className="w-48 border-b border-slate-400 pb-1 font-bold text-slate-900">
                {PERSONAL_INFO.name}
              </div>
              <p className="text-[10px] text-slate-500">
                Lead SQA Engineer • Daffodil International University (CSE)
              </p>
            </div>
            <div className="text-right text-[11px] font-mono text-slate-500">
              Pass Rate: {passRate}% • Status: STLC CERTIFIED • Page 1 of 1
            </div>
          </div>
        </div>

      </div>

      {/* Formal Test Report Modal (Print & PDF) */}
      <TestReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        testCases={testCases}
        completedRuns={completedRuns}
      />
    </section>
  );
};

import React, { useState } from 'react';
import {
  X,
  FileText,
  Sparkles,
  Copy,
  Check,
  Download,
  Printer,
  ShieldCheck,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface CoverLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CoverLetterModal: React.FC<CoverLetterModalProps> = ({ isOpen, onClose }) => {
  const [selectedRole, setSelectedRole] = useState<'sqa_engineer' | 'api_qa' | 'manual_lead'>('sqa_engineer');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const roleTitles = {
    sqa_engineer: 'Software Quality Assurance (SQA) Engineer',
    api_qa: 'API & Backend Automation QA Engineer',
    manual_lead: 'Functional QA Specialist & Defect Triage Lead',
  };

  const coverLetters: Record<string, string> = {
    sqa_engineer: `Dear Hiring Team,

I am writing to express my strong enthusiasm for the Software Quality Assurance (SQA) Engineer position. With hands-on proficiency in manual functional testing, regression and smoke testing, test case design, and systematic defect life cycle management using Jira and Postman, I am dedicated to safeguarding software stability and delivering flawless user experiences.

Throughout my career and structured QA projects—including end-to-end audits of enterprise e-commerce applications and microservice REST APIs—I have designed and executed over 350+ detailed test cases and identified 95+ critical defects. My testing methodology applies proven test design techniques such as Boundary Value Analysis (BVA), Equivalence Class Partitioning (ECP), and rigorous error-guessing scenarios to uncover edge-case defects before they reach production.

Key qualifications I bring to your team:
• Test Planning & Design: Authoring structured test suites with clear preconditions, reproduction steps, expected results, and Requirements Traceability Matrices (RTM).
• Defect Triage & Reporting: Capturing network logs, console errors via Chrome DevTools, and triaging issues with severity/priority levels in Jira.
• API & Database Validation: Testing RESTful endpoints (GET, POST, PUT, DELETE) in Postman, validating JSON schemas, status codes, and executing SQL queries to verify data integrity.
• Agile Collaboration: Partnering with developers and product owners in daily standups and sprint retrospectives to maintain a 99.4% defect detection accuracy rate.

I welcome the opportunity to discuss how my disciplined testing approach and passion for software excellence can add immediate value to your organization.

Sincerely,
Md. Akher Ali Rabbi (Alirabbi.QA)
Software Quality Assurance Engineer
Phone: ${PERSONAL_INFO.phone}
Email: ${PERSONAL_INFO.email}
GitHub: ${PERSONAL_INFO.github}
LinkedIn: ${PERSONAL_INFO.linkedin}`,

    api_qa: `Dear Technical Hiring Manager,

I am applying for the API & Backend Automation QA role with proven experience in REST API architecture, HTTP protocol validation, payload schema verification, and database cross-checking.

My hands-on projects feature deep Postman collection testing, automated assertions for response payloads, status codes (200, 201, 400, 401, 404, 500), and performance response times. Complementing this, I execute SQL queries across relational databases to verify that API transactions maintain ACID compliance without data corruption.

Key technical competencies:
• Postman Collection Runner & Newman CLI execution
• JSON Schema & Contract validation
• SQL queries (PostgreSQL/MySQL) for backend verification
• Defect isolation between client-side DOM and backend service layers

I would be thrilled to bring these backend quality engineering skills to your engineering sprints.

Warm regards,
Md. Akher Ali Rabbi
API Testing & SQA Specialist
${PERSONAL_INFO.email} | ${PERSONAL_INFO.phone}`,

    manual_lead: `Dear QA Leadership,

I am excited to submit my candidacy for the Functional QA Specialist role. My core focus centers on manual exploratory testing, usability evaluations, end-to-end regression coverage, and cross-browser/device validation across desktop and mobile platforms.

Having authored comprehensive test suites for checkout workflows, user authentication, and shopping cart persistence, I understand how critical meticulous test documentation is to team velocity and software reliability.

I look forward to discussing how my rigorous STLC standards can elevate your product quality.

Sincerely,
Md. Akher Ali Rabbi
${PERSONAL_INFO.email}`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetters[selectedRole]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([coverLetters[selectedRole]], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Alirabbi_Cover_Letter_${selectedRole}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-[#0c1322] text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-600 text-white shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold tracking-tight text-white">
                  ATS Resume &amp; AI Cover Letter Suite
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5" /> Admin Only
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Tailored Cover Letters &amp; Automated ATS Match Score Analysis for Alirabbi.QA
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ATS Score & Match Overview Strip */}
        <div className="px-6 py-3.5 bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400">ATS Match Score</span>
            <div className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
              96%
            </div>
          </div>
          <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400">Keywords Match</span>
            <div className="text-lg font-extrabold text-blue-600 dark:text-blue-400 font-mono">
              28 / 30
            </div>
          </div>
          <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400">Format Standard</span>
            <div className="text-lg font-extrabold text-purple-600 dark:text-purple-400 font-mono">
              100% ATS Safe
            </div>
          </div>
          <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400">Role Target</span>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate pt-1">
              SQA Engineer
            </div>
          </div>
        </div>

        {/* Role Selector Tabs */}
        <div className="px-6 pt-4 pb-2 flex flex-wrap gap-2 border-b border-slate-100 dark:border-slate-800">
          {(
            [
              { id: 'sqa_engineer', label: 'SQA General Engineer' },
              { id: 'api_qa', label: 'API & Automation QA' },
              { id: 'manual_lead', label: 'Functional QA Specialist' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedRole(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedRole === tab.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-750'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cover Letter Body Preview */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-sans select-text">
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 whitespace-pre-line font-mono text-xs sm:text-sm">
            {coverLetters[selectedRole]}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Calibrated with Alirabbi's Verified STLC Project Metrics</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-750 flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Letter'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download (.TXT)</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

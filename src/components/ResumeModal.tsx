import React from 'react';
import {
  X,
  Printer,
  Download,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import {
  PERSONAL_INFO,
  EXPERIENCES,
  EDUCATION_LIST,
  CERTIFICATIONS,
  PROJECTS,
  SKILL_CATEGORIES,
} from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadMarkdown = () => {
    const resumeText = `
# MD. AKHER ALI RABBI
Software Quality Assurance (SQA) Engineer
Location: ${PERSONAL_INFO.location}
Phone: ${PERSONAL_INFO.phone}
Email: ${PERSONAL_INFO.email}
LinkedIn: ${PERSONAL_INFO.linkedin}
GitHub: ${PERSONAL_INFO.github}

## CAREER OBJECTIVE
${PERSONAL_INFO.careerObjective}

## PROFESSIONAL EXPERIENCE
${EXPERIENCES.map((e) => `### ${e.role} - ${e.company} (${e.period})
${e.description.map((d) => `- ${d}`).join('\n')}`).join('\n\n')}

## SQA PROJECTS
${PROJECTS.map((p) => `### ${p.title} (${p.subtitle})
${p.description}
Tools: ${p.tools.join(', ')}
Test Cases: ${p.testMetrics.totalTestCases} | Defects Reported: ${p.testMetrics.defectsReported}`).join('\n\n')}

## ACADEMIC QUALIFICATION
${EDUCATION_LIST.map((ed) => `- ${ed.degree}, ${ed.institution} (${ed.year}) - CGPA: ${ed.cgpa}`).join('\n')}

## CERTIFICATIONS
${CERTIFICATIONS.map((c) => `- ${c.title} (${c.issuer}, ${c.year})`).join('\n')}

## REFERENCES
Sabbir Ahamed (Mid-Sqa Engineer) | Mail: sabbircse72@gmail.com | Phone: 01681387906
    `.trim();

    const blob = new Blob([resumeText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'MD_AKHER_ALI_RABBI_SQA_RESUME.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
      >
        
        {/* Modal Action Header (Excluded from Print) */}
        <div className="print:hidden flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Curriculum Vitae
            </span>
            <span className="text-xs text-slate-700 dark:text-slate-300">
              • Verified SQA Engineer
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={handleDownloadMarkdown}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Text</span>
            </button>

            <button
              onClick={onClose}
              title="Close modal (Esc or R)"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans space-y-6">
          
          {/* Header */}
          <div className="border-b-2 border-slate-900 dark:border-slate-100 pb-5 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase">
                  MD. AKHER ALI RABBI
                </h1>
                <h2 className="text-base sm:text-lg font-semibold text-emerald-700 dark:text-emerald-400">
                  Software Quality Assurance (SQA) Engineer
                </h2>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-700 dark:text-slate-300 pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                {PERSONAL_INFO.location}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                {PERSONAL_INFO.phone}
              </span>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                {PERSONAL_INFO.email}
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <Linkedin className="w-3.5 h-3.5 text-slate-500" />
                linkedin.com/in/{PERSONAL_INFO.linkedinHandle}
              </a>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                <Github className="w-3.5 h-3.5 text-slate-500" />
                github.com/{PERSONAL_INFO.githubHandle}
              </a>
            </div>
          </div>

          {/* Career Objective */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-300 dark:border-slate-700 pb-0.5">
              CAREER OBJECTIVE
            </h3>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
              {PERSONAL_INFO.careerObjective}
            </p>
          </div>

          {/* Skills Breakdown */}
          <div className="space-y-2">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-300 dark:border-slate-700 pb-0.5">
              SKILLS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 dark:text-white">Software Testing & QA</h4>
                <ul className="list-disc list-inside space-y-0.5 text-slate-700 dark:text-slate-300 text-[11px]">
                  <li>Manual Testing (Functional, Regression, Smoke, Sanity)</li>
                  <li>Test Case Design, Execution & Documentation</li>
                  <li>Bug/Defect Life Cycle Management</li>
                  <li>SDLC & STLC Processes</li>
                  <li>API Testing & Postman</li>
                  <li>QA & QC Best Practices</li>
                </ul>

                <h4 className="font-bold text-slate-900 dark:text-white pt-2">QA Tools & Platforms</h4>
                <ul className="list-disc list-inside space-y-0.5 text-slate-700 dark:text-slate-300 text-[11px]">
                  <li>Jira — Bug Tracking & Project Management</li>
                  <li>Postman — API Testing & Validation</li>
                  <li>Chrome DevTools — Web UI & Network Testing</li>
                  <li>GitHub — Version Control & Test Repository</li>
                  <li>Microsoft Excel — Test Reporting & Data Analysis</li>
                </ul>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 dark:text-white">Technical Skills</h4>
                <ul className="list-disc list-inside space-y-0.5 text-slate-700 dark:text-slate-300 text-[11px]">
                  <li>Agile / Scrum Methodology</li>
                  <li>REST API Concepts & Testing</li>
                  <li>Test Documentation & Reporting</li>
                  <li>SQL (Basic) — Database & Data Validation</li>
                  <li>HTML, CSS — Web Element Inspection</li>
                </ul>

                <h4 className="font-bold text-slate-900 dark:text-white pt-2">Soft Skills</h4>
                <ul className="list-disc list-inside space-y-0.5 text-slate-700 dark:text-slate-300 text-[11px]">
                  <li>Analytical Thinking & Attention to Detail</li>
                  <li>Problem Solving & Decision Making</li>
                  <li>Team Collaboration & Communication</li>
                  <li>Time Management & Work Under Pressure</li>
                  <li>Requirement Analysis & Documentation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-300 dark:border-slate-700 pb-0.5">
              PROFESSIONAL EXPERIENCE
            </h3>
            
            <div className="space-y-4">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex justify-between items-baseline text-xs font-bold text-slate-900 dark:text-white">
                    <span>
                      {exp.role} — <span className="italic font-normal">{exp.company}</span>
                    </span>
                    <span className="font-mono text-[11px] text-slate-700 dark:text-slate-300 font-normal">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-700 dark:text-slate-300">
                    {exp.description.map((line, idx) => (
                      <li key={idx}>{line}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* SQA Projects */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-300 dark:border-slate-700 pb-0.5">
              SQA- PROJECTS
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
                <h4 className="font-bold text-slate-900 dark:text-white">E-Commerce website</h4>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  Details: Automation Exercise
                </p>
                <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  Quality Assurance Defect Report
                </p>
                <ul className="list-disc list-inside text-[11px] text-slate-700 dark:text-slate-300 space-y-0.5">
                  <li>Functional Testing & Regression Testing</li>
                  <li>UI Testing</li>
                  <li>Test Case Design & Execution</li>
                  <li>Bug Report & Test Summary Report</li>
                </ul>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
                <h4 className="font-bold text-slate-900 dark:text-white">E-Commerce website</h4>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  Details: Product Store
                </p>
                <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  Home / Landing Page Module Test Case Report
                </p>
                <ul className="list-disc list-inside text-[11px] text-slate-700 dark:text-slate-300 space-y-0.5">
                  <li>Manual Functional Testing</li>
                  <li>Test Case Design & Execution</li>
                  <li>Defect Reporting (Severity & Priority)</li>
                  <li>UI & Usability Testing</li>
                  <li>Test Summary & Metrics Reporting</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Academic Qualification */}
          <div className="space-y-2">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-300 dark:border-slate-700 pb-0.5">
              ACADEMIC QUALIFICATION
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px] border border-slate-200 dark:border-slate-800">
                <thead className="bg-slate-100 dark:bg-slate-800 font-bold">
                  <tr>
                    <th className="p-1.5 border-b">Degree</th>
                    <th className="p-1.5 border-b">Subject</th>
                    <th className="p-1.5 border-b">Institution</th>
                    <th className="p-1.5 border-b">Year</th>
                    <th className="p-1.5 border-b">CGPA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {EDUCATION_LIST.map((edu) => (
                    <tr key={edu.id}>
                      <td className="p-1.5 font-semibold">{edu.degree.split(' ')[0]}</td>
                      <td className="p-1.5">{edu.subject}</td>
                      <td className="p-1.5">{edu.institution}</td>
                      <td className="p-1.5">{edu.year}</td>
                      <td className="p-1.5 font-bold">{edu.cgpa}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Certifications & References */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1.5">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-300 dark:border-slate-700 pb-0.5">
                CERTIFICATIONS & TRAINING
              </h3>
              <ul className="list-disc list-inside text-[11px] text-slate-700 dark:text-slate-300 space-y-1">
                {CERTIFICATIONS.map((cert) => (
                  <li key={cert.id}>
                    <strong>{cert.title}</strong> — {cert.issuer} ({cert.year})
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-300 dark:border-slate-700 pb-0.5">
                REFERENCES
              </h3>
              <div className="text-[11px] text-slate-700 dark:text-slate-300 space-y-0.5">
                <p><strong>Name:</strong> Sabbir Ahamed</p>
                <p><strong>Deg:</strong> Mid-Sqa Engineer</p>
                <p><strong>Mail:</strong> sabbircse72@gmail.com</p>
                <p><strong>No:</strong> 01681387906</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  Award,
  CheckCircle,
  FileCheck2,
  ExternalLink,
  Clock,
  ShieldCheck,
  FileDown,
} from 'lucide-react';
import { CERTIFICATIONS } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { useAnalytics } from '../context/AnalyticsContext';

interface CertificationsSectionProps {
  onOpenResume: () => void;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({ onOpenResume }) => {
  const { t } = useLanguage();
  const { trackResumeDownload } = useAnalytics();
  const [verifiedModal, setVerifiedModal] = useState<string | null>(null);

  const handleDownload = () => {
    trackResumeDownload();
    onOpenResume();
  };

  return (
    <section id="certifications" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-400">
            <Award className="w-3.5 h-3.5" />
            <span>Credentials & Upskilling</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t.certifications.heading}
          </h2>
          <p className="text-base text-slate-700 dark:text-slate-300">
            {t.certifications.subheading}
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              className="rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4 hover:border-emerald-500/50 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <FileCheck2 className="w-5 h-5" />
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      cert.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : cert.status === 'Ongoing'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                        : 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                    }`}
                  >
                    {cert.status}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 font-medium">
                    {cert.issuer}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-300 flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {cert.year}
                </span>

                <button
                  onClick={() => setVerifiedModal(cert.title)}
                  className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-200 hover:underline"
                >
                  Verify
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Downloadable Resume Callout Banner */}
        <div className="mt-12 rounded-2xl p-6 sm:p-8 bg-emerald-900/10 dark:bg-emerald-950/30 border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center justify-center sm:justify-start gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span>Looking for Md. Akher Ali Rabbi's Full Resume?</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Complete with contact details, technical skills inventory, project defect triage, and references.
            </p>
          </div>

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 shrink-0 transition-transform hover:scale-105"
          >
            <FileDown className="w-4 h-4" />
            <span>Open & Download Resume</span>
          </button>
        </div>

        {/* Credential Verification Modal simulation */}
        {verifiedModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">
                    Verified Credential
                  </h4>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                    Status: Authenticated Record
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-1.5 font-mono">
                <p><strong>Program:</strong> {verifiedModal}</p>
                <p><strong>Candidate:</strong> Md. Akher Ali Rabbi</p>
                <p><strong>Domain:</strong> SQA / Quality Engineering</p>
                <p><strong>Verification Code:</strong> BD-SQA-VAL-2026</p>
              </div>

              <button
                onClick={() => setVerifiedModal(null)}
                className="w-full py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 text-white"
              >
                Close Verification Notice
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

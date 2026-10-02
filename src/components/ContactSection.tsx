import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ShieldCheck,
  Linkedin,
  Github,
  Users,
  ArrowUpRight,
  ExternalLink,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { useAnalytics } from '../context/AnalyticsContext';
import confetti from 'canvas-confetti';

interface ContactSectionProps {
  onOpenHireModal?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenHireModal }) => {
  const { language, t } = useLanguage();
  const { addContactMessage } = useAnalytics();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'job_opportunity' as const,
    subject: '',
    message: '',
    honeypot: '', // bot protection
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.name.trim()) {
      errs.name = 'Please enter your full name or company.';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email format (e.g. name@domain.com).';
    }

    if (!formData.subject.trim()) {
      errs.subject = 'Subject line is required.';
    } else if (formData.subject.trim().length < 3) {
      errs.subject = 'Subject should be at least 3 characters.';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please provide message details.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Bot trap detection
    if (formData.honeypot) {
      return;
    }

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate safe server dispatch & local database persistence
    await new Promise((resolve) => setTimeout(resolve, 650));

    addContactMessage({
      name: formData.name.trim(),
      email: formData.email.trim(),
      inquiryType: formData.inquiryType,
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    });

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Trigger celebration
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#10b981', '#14b8a6', '#3b82f6'],
    });
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      inquiryType: 'job_opportunity',
      subject: '',
      message: '',
      honeypot: '',
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden">
      {/* Anchor for Hire Me */}
      <div id="hire-me" className="scroll-mt-24" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-400">
            <Mail className="w-3.5 h-3.5" />
            <span>Connect & Collaborate</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t.contact.heading}
          </h2>
          <p className="text-base text-slate-700 dark:text-slate-300">
            {t.contact.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Contact Details Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Hire Me Announcement Card */}
            <div className="rounded-2xl p-6 bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-transparent dark:from-orange-950/40 dark:via-slate-900/60 border-2 border-orange-500/30 dark:border-orange-500/30 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#f95738] text-white shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  Available for Hire
                </span>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  Immediate Start
                </span>
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Looking for an SQA Engineer?
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  Open for Full-time, Remote, Contract, and Consultation roles in Software Quality Assurance, Manual & API Testing.
                </p>
              </div>

              {onOpenHireModal && (
                <button
                  type="button"
                  onClick={onOpenHireModal}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#f95738] hover:bg-[#e8492a] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-orange-500/25 transition-all hover:scale-[1.01]"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Direct Hire Request</span>
                </button>
              )}
            </div>

            <div className="rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Contact Information
              </h3>
              
              <div className="space-y-4">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-700 dark:text-slate-300 block font-medium">Direct Email</span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 break-all">
                      {PERSONAL_INFO.email}
                    </span>
                  </div>
                </a>

                <a
                  href="tel:01336312097"
                  className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-700 dark:text-slate-300 block font-medium">Phone & WhatsApp</span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                      {PERSONAL_INFO.phone}
                    </span>
                  </div>
                </a>

                <div className="flex items-start gap-3.5 p-3 rounded-xl">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-700 dark:text-slate-300 block font-medium">Location</span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      {language === 'bn' ? PERSONAL_INFO.banglaLocation : PERSONAL_INFO.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Response SLA Notice */}
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-start gap-3 text-xs text-emerald-900 dark:text-emerald-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Fast QA Response:</strong> Inquiries are checked multiple times daily. Expected response within 12–24 business hours.
                </span>
              </div>
            </div>

            {/* Connect with me - Professional Networking Badges */}
            <div className="rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {t.contact.connectTitle || 'Connect with me'}
                    </h3>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">
                      Professional Social Media & Code Repositories
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  Open to Network
                </span>
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {t.contact.connectSubtitle || 'Connect on LinkedIn for career opportunities or follow my GitHub for automated QA test suites & bug triage repositories.'}
              </p>

              {/* Social Media Badges */}
              <div className="space-y-3 pt-1">
                {/* LinkedIn Badge */}
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="block p-4 rounded-xl border border-blue-200/80 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:border-blue-400 dark:hover:border-blue-700 transition-all duration-200 group shadow-sm"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-11 h-11 rounded-xl bg-[#0A66C2] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                        <Linkedin className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-bold text-slate-900 dark:text-white truncate">
                            Md. Akher Ali Rabbi
                          </span>
                          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Active on LinkedIn" />
                        </div>
                        <span className="text-xs text-blue-700 dark:text-blue-300 block font-medium">
                          LinkedIn Profile • SQA Engineer
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 shrink-0 group-hover:translate-x-0.5 transition-transform">
                      <span className="hidden sm:inline">Connect</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-blue-200/50 dark:border-blue-900/40 flex flex-wrap items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white dark:bg-slate-800 text-blue-800 dark:text-blue-200 border border-blue-100 dark:border-blue-900/60">
                      Manual & Automated Testing
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                      Job Inquiries & Referrals
                    </span>
                  </div>
                </a>

                {/* GitHub Badge */}
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="block p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-850/60 hover:bg-slate-100/80 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition-all duration-200 group shadow-sm"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-11 h-11 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                        <Github className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-bold text-slate-900 dark:text-white truncate">
                            alirabbi2
                          </span>
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                            GitHub
                          </span>
                        </div>
                        <span className="text-xs text-slate-600 dark:text-slate-400 block font-medium truncate">
                          Automated Test Suites & QA Projects
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold text-slate-700 dark:text-slate-300 shrink-0 group-hover:translate-x-0.5 transition-transform">
                      <span className="hidden sm:inline">Explore</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-800/80 flex flex-wrap items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/60">
                      E-Commerce Testing Suites
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                      Postman API Collections
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {t.contact.successTitle}
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                    {t.contact.successDesc}
                  </p>
                  <button
                    onClick={handleReset}
                    className="mt-4 px-6 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Bot honeypot */}
                  <input
                    type="text"
                    name="contact_honeypot"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        {t.contact.nameLabel} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder={t.contact.namePlaceholder}
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: '' });
                        }}
                        className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border ${
                          errors.name
                            ? 'border-rose-500 focus:ring-rose-500/20'
                            : 'border-slate-200 dark:border-slate-700 focus:border-emerald-500'
                        } text-slate-900 dark:text-white focus:outline-none focus:ring-2`}
                      />
                      {errors.name && (
                        <p className="text-[11px] text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        {t.contact.emailLabel} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder={t.contact.emailPlaceholder}
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border ${
                          errors.email
                            ? 'border-rose-500 focus:ring-rose-500/20'
                            : 'border-slate-200 dark:border-slate-700 focus:border-emerald-500'
                        } text-slate-900 dark:text-white focus:outline-none focus:ring-2`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Inquiry Category */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {t.contact.inquiryTypeLabel}
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          inquiryType: e.target.value as typeof formData.inquiryType,
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    >
                      <option value="job_opportunity">{t.contact.inquiryJob}</option>
                      <option value="contract">{t.contact.inquiryContract}</option>
                      <option value="consultation">{t.contact.inquiryConsultation}</option>
                      <option value="general">{t.contact.inquiryGeneral}</option>
                    </select>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {t.contact.subjectLabel} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder={t.contact.subjectPlaceholder}
                      value={formData.subject}
                      onChange={(e) => {
                        setFormData({ ...formData, subject: e.target.value });
                        if (errors.subject) setErrors({ ...errors, subject: '' });
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border ${
                        errors.subject
                          ? 'border-rose-500 focus:ring-rose-500/20'
                          : 'border-slate-200 dark:border-slate-700 focus:border-emerald-500'
                      } text-slate-900 dark:text-white focus:outline-none focus:ring-2`}
                    />
                    {errors.subject && (
                      <p className="text-[11px] text-rose-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.subject}</span>
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {t.contact.messageLabel} <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      placeholder={t.contact.messagePlaceholder}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: '' });
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border ${
                        errors.message
                          ? 'border-rose-500 focus:ring-rose-500/20'
                          : 'border-slate-200 dark:border-slate-700 focus:border-emerald-500'
                      } text-slate-900 dark:text-white focus:outline-none focus:ring-2`}
                    />
                    {errors.message && (
                      <p className="text-[11px] text-rose-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-transform active:scale-[0.98] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>{t.contact.submitting}</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{t.contact.submitButton}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

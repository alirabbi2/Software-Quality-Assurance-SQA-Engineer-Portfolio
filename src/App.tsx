import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { AnalyticsProvider, useAnalytics } from './context/AnalyticsContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { JourneySection } from './components/JourneySection';
import { CertificationsSection } from './components/CertificationsSection';
import { MissionVisionSection } from './components/MissionVisionSection';
import { LiveTestRunner } from './components/LiveTestRunner';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { TopSuiteBanner } from './components/TopSuiteBanner';
import { ResumeModal } from './components/ResumeModal';
import { CoverLetterModal } from './components/CoverLetterModal';
import { BlogModal } from './components/BlogModal';
import { HireMeModal } from './components/HireMeModal';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthModal } from './components/AuthModal';
import { NotificationToast } from './components/NotificationToast';
import { OfflineBanner } from './components/OfflineBanner';

const PortfolioContent: React.FC = () => {
  const { trackSectionView } = useAnalytics();
  const { toggleTheme } = useTheme();
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCoverLetterOpen, setIsCoverLetterOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const [isHireMeOpen, setIsHireMeOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(2);
  const [shortcutFeedback, setShortcutFeedback] = useState<string | null>(null);

  // Global event listener for keyboard shortcuts: 'D' for Dark Mode toggle, 'R' for Resume modal
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Prevent firing shortcuts when user is actively typing in input fields, textareas, selects, or editable containers
      const target = event.target as HTMLElement | null;
      if (target) {
        const tagName = target.tagName.toUpperCase();
        if (
          tagName === 'INPUT' ||
          tagName === 'TEXTAREA' ||
          tagName === 'SELECT' ||
          target.isContentEditable
        ) {
          return;
        }
      }

      // Avoid overriding standard browser modifier shortcuts (e.g. Ctrl+R reload, Ctrl+D bookmark, Cmd+R, Alt+keys)
      if (event.ctrlKey || event.metaKey || event.altKey) {
        return;
      }

      if (event.key === 'd' || event.key === 'D') {
        event.preventDefault();
        toggleTheme();
        setShortcutFeedback('Theme toggled (D)');
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => setShortcutFeedback(null), 1800);
      } else if (event.key === 'r' || event.key === 'R') {
        event.preventDefault();
        setIsResumeOpen((prev) => !prev);
        setShortcutFeedback('Resume Modal (R)');
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => setShortcutFeedback(null), 1800);
      } else if (event.key === 'Escape') {
        setIsResumeOpen(false);
        setIsAdminOpen(false);
        setIsNotificationOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [toggleTheme]);

  // Track section views as user scrolls
  useEffect(() => {
    const sections = ['hero', 'skills', 'projects', 'journey', 'certifications', 'tests', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackSectionView(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [trackSectionView]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNotificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setNotificationCount(0);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white transition-colors duration-200">
      {/* Offline Status Listener */}
      <OfflineBanner />

      {/* Navigation Bar */}
      <Navbar
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenHireMe={() => setIsHireMeOpen(true)}
        onTriggerNotification={handleNotificationClick}
        notificationCount={notificationCount}
      />

      {/* Real-time notifications toast */}
      <NotificationToast
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        <Hero
          onOpenResume={() => setIsResumeOpen(true)}
          onScrollToSection={scrollToSection}
        />
        <MissionVisionSection />
        <SkillsSection />
        <ProjectsSection />
        <JourneySection />
        <CertificationsSection onOpenResume={() => setIsResumeOpen(true)} />
        <LiveTestRunner />
        <ContactSection onOpenHireModal={() => setIsHireMeOpen(true)} />

        {/* ATS Resume & AI Cover Letter Suite + Alirabbi.QA Identity & Live Traffic (at the bottom) */}
        <section id="bottom-suite" className="bg-[#070d18] py-12 border-t border-slate-800/90">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TopSuiteBanner
              onOpenResume={() => setIsResumeOpen(true)}
              onOpenCoverLetter={() => setIsCoverLetterOpen(true)}
              onOpenBlog={() => setIsBlogOpen(true)}
              onBrandClick={() => scrollToSection('hero')}
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
      <CoverLetterModal
        isOpen={isCoverLetterOpen}
        onClose={() => setIsCoverLetterOpen(false)}
      />
      <BlogModal
        isOpen={isBlogOpen}
        onClose={() => setIsBlogOpen(false)}
      />
      <HireMeModal
        isOpen={isHireMeOpen}
        onClose={() => setIsHireMeOpen(false)}
        onNavigateToSection={scrollToSection}
      />
      <AdminDashboard isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      <AuthModal />

      {/* Floating Back to Top Button */}
      <BackToTop />

      {/* Global Shortcut HUD Feedback */}
      {shortcutFeedback && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-in fade-in zoom-in-95 duration-200">
          <div className="px-4 py-2 rounded-full bg-slate-900/95 text-white dark:bg-white/95 dark:text-slate-900 backdrop-blur-md shadow-xl border border-slate-700/50 dark:border-slate-300/50 flex items-center gap-2 text-xs font-bold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{shortcutFeedback}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <AnalyticsProvider>
            <PortfolioContent />
          </AnalyticsProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

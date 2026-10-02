import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AnalyticsSummary, ContactMessage, AnalyticsEvent } from '../types';

interface AnalyticsContextType {
  summary: AnalyticsSummary;
  messages: ContactMessage[];
  recentEvents: AnalyticsEvent[];
  trackSectionView: (sectionName: string) => void;
  trackProjectClick: (projectId: string) => void;
  trackResumeDownload: () => void;
  trackTestRun: () => void;
  addContactMessage: (msg: Omit<ContactMessage, 'id' | 'timestamp' | 'read' | 'status'>) => void;
  markMessageRead: (id: string) => void;
  deleteMessage: (id: string) => void;
  exportAnalyticsJson: () => void;
}

const STORAGE_KEY_ANALYTICS = 'rabbi_portfolio_analytics';
const STORAGE_KEY_MESSAGES = 'rabbi_portfolio_messages';
const STORAGE_KEY_EVENTS = 'rabbi_portfolio_events';

const INITIAL_MESSAGES: ContactMessage[] = [
  {
    id: 'msg_001',
    name: 'Sarah Jenkins',
    email: 'sarah.j@fintechsolutions.com',
    subject: 'Senior QA / SQA Engineer Opening at FinTech Labs',
    message: 'Hello Akher Ali, we reviewed your e-commerce automation and Postman API test reports. Your structured defect triage approach aligns directly with our sprint quality standards. Would you be available for a brief introductory call?',
    inquiryType: 'job_opportunity',
    timestamp: '2026-09-19T14:32:00Z',
    read: true,
    status: 'replied',
  },
  {
    id: 'msg_002',
    name: 'Tariq Mahmud',
    email: 'tariq@nexustech.bd',
    subject: 'API Automation & Load Validation Consultation',
    message: 'Hi Rabbi, we are looking for a QA specialist to audit our RESTful backend microservices and design Postman collection test scripts. Please let us know your availability.',
    inquiryType: 'consultation',
    timestamp: '2026-09-20T09:15:00Z',
    read: false,
    status: 'new',
  },
];

const INITIAL_SUMMARY: AnalyticsSummary = {
  totalVisitors: 842,
  sectionViews: {
    hero: 1240,
    about: 980,
    skills: 820,
    projects: 1150,
    experience: 780,
    certifications: 690,
    tests: 540,
    contact: 460,
  },
  projectClicks: {
    'automation-exercise': 312,
    'product-store-qa': 245,
    'rest-api-suite': 298,
    'factory-erp-data-qa': 180,
    'ai-ml-data-qa': 165,
  },
  resumeDownloads: 142,
  contactSubmissions: 18,
  testsRunCount: 89,
  avgEngagementSeconds: 146,
};

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [summary, setSummary] = useState<AnalyticsSummary>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_ANALYTICS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_SUMMARY;
      }
    }
    return INITIAL_SUMMARY;
  });

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_MESSAGES);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_MESSAGES;
      }
    }
    return INITIAL_MESSAGES;
  });

  const [recentEvents, setRecentEvents] = useState<AnalyticsEvent[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_EVENTS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [
      {
        id: 'evt_1',
        type: 'section_view',
        details: 'Viewed Projects Section',
        timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
        device: 'Desktop Chrome (Windows 11)',
      },
      {
        id: 'evt_2',
        type: 'resume_download',
        details: 'Downloaded Resume PDF',
        timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
        device: 'Mobile Safari (iOS 18)',
      },
    ];
  });

  // Save changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ANALYTICS, JSON.stringify(summary));
  }, [summary]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_EVENTS, JSON.stringify(recentEvents.slice(0, 50)));
  }, [recentEvents]);

  const addEvent = useCallback((type: AnalyticsEvent['type'], details: string) => {
    const newEvent: AnalyticsEvent = {
      id: 'evt_' + Math.random().toString(36).substring(7),
      type,
      details,
      timestamp: new Date().toISOString(),
      device: `${window.innerWidth < 768 ? 'Mobile' : 'Desktop'} ${navigator.userAgent.includes('Firefox') ? 'Firefox' : 'Chrome/Safari'}`,
    };
    setRecentEvents((prev) => [newEvent, ...prev.slice(0, 49)]);
  }, []);

  const trackSectionView = useCallback((sectionName: string) => {
    setSummary((prev) => ({
      ...prev,
      sectionViews: {
        ...prev.sectionViews,
        [sectionName]: (prev.sectionViews[sectionName] || 0) + 1,
      },
    }));
  }, []);

  const trackProjectClick = useCallback((projectId: string) => {
    setSummary((prev) => ({
      ...prev,
      projectClicks: {
        ...prev.projectClicks,
        [projectId]: (prev.projectClicks[projectId] || 0) + 1,
      },
    }));
    addEvent('project_click', `Viewed Project: ${projectId}`);
  }, [addEvent]);

  const trackResumeDownload = useCallback(() => {
    setSummary((prev) => ({
      ...prev,
      resumeDownloads: prev.resumeDownloads + 1,
    }));
    addEvent('resume_download', 'Downloaded Full Resume');
  }, [addEvent]);

  const trackTestRun = useCallback(() => {
    setSummary((prev) => ({
      ...prev,
      testsRunCount: prev.testsRunCount + 1,
    }));
    addEvent('test_run', 'Executed Portfolio QA Automated Test Suite');
  }, [addEvent]);

  const addContactMessage = useCallback((msg: Omit<ContactMessage, 'id' | 'timestamp' | 'read' | 'status'>) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: 'msg_' + Date.now(),
      timestamp: new Date().toISOString(),
      read: false,
      status: 'new',
    };
    setMessages((prev) => [newMsg, ...prev]);
    setSummary((prev) => ({
      ...prev,
      contactSubmissions: prev.contactSubmissions + 1,
    }));
    addEvent('contact_submit', `Received message from ${msg.name} (${msg.email})`);
  }, [addEvent]);

  const markMessageRead = useCallback((id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: true, status: m.status === 'new' ? 'replied' : m.status } : m))
    );
  }, []);

  const deleteMessage = useCallback((id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const exportAnalyticsJson = useCallback(() => {
    const exportData = {
      exportDate: new Date().toISOString(),
      summary,
      messagesCount: messages.length,
      messages,
      recentEvents,
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rabbi-sqa-portfolio-analytics-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [summary, messages, recentEvents]);

  return (
    <AnalyticsContext.Provider
      value={{
        summary,
        messages,
        recentEvents,
        trackSectionView,
        trackProjectClick,
        trackResumeDownload,
        trackTestRun,
        addContactMessage,
        markMessageRead,
        deleteMessage,
        exportAnalyticsJson,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};

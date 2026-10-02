export type Language = 'en' | 'bn';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'ecommerce' | 'api' | 'data-integrity' | 'automation';
  description: string;
  keyHighlights: string[];
  deliverables: string[];
  tools: string[];
  testMetrics: {
    totalTestCases: number;
    passed: number;
    failed: number;
    defectsReported: number;
    coverage: string;
  };
  liveDemoUrl?: string;
  githubUrl?: string;
  reportUrl?: string;
  featured: boolean;
  image: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  skills: {
    name: string;
    level: number; // 0 to 100
    categoryBadge?: string;
    proficiencyLabel?: string;
    highlight?: string;
  }[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  degree: string;
  subject: string;
  institution: string;
  year: string;
  cgpa: string;
  honors?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  status: 'Completed' | 'Ongoing' | 'Professional';
  credentialId?: string;
  badgeColor: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  inquiryType: 'job_opportunity' | 'contract' | 'consultation' | 'general';
  timestamp: string;
  read: boolean;
  status: 'new' | 'replied' | 'archived';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'recruiter' | 'visitor';
  provider: 'google' | 'github' | 'guest';
}

export interface AnalyticsEvent {
  id: string;
  type: 'page_view' | 'section_view' | 'project_click' | 'resume_download' | 'contact_submit' | 'test_run';
  details: string;
  timestamp: string;
  device: string;
}

export interface AnalyticsSummary {
  totalVisitors: number;
  sectionViews: Record<string, number>;
  projectClicks: Record<string, number>;
  resumeDownloads: number;
  contactSubmissions: number;
  testsRunCount: number;
  avgEngagementSeconds: number;
}

export type QATestCategory = 'Functional' | 'Regression' | 'Performance' | 'Security';

export interface QATestCase {
  id: string;
  suite: string;
  category?: QATestCategory | string;
  title: string;
  description: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'pending' | 'running' | 'passed' | 'failed';
  executionTimeMs?: number;
}

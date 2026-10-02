import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Calendar,
  Clock,
  Tag,
  ArrowRight,
  CheckCircle2,
  Bookmark,
  Share2,
} from 'lucide-react';

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  content: string[];
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'api-testing-guide',
    title: 'Architecting Scalable API Test Suites with Postman & Newman',
    excerpt:
      'How to design reusable pre-request scripts, automate JSON schema assertion contracts, and run automated regression checks in CI/CD.',
    category: 'API Testing',
    readTime: '6 min read',
    date: 'Sep 2026',
    content: [
      'In modern microservices architectures, API testing provides the earliest and fastest defect detection loop. Before touching the UI, a robust API test suite validates business logic and contract integrity.',
      'Key Steps for Enterprise Postman Suites:',
      '1. Environment Parameterization: Decouple base URLs, auth bearer tokens, and test user identities into dynamic environment variables.',
      '2. Pre-Request Token Refreshing: Automate OAuth token fetching before executing endpoint batches.',
      '3. Contract Validation using AJV & JSON Schemas: Ensure payload fields, types, and required attributes conform to Swagger/OpenAPI specs.',
      '4. Continuous Execution: Export collections and execute headlessly via Newman inside GitHub Actions on every pull request.',
    ],
  },
  {
    id: 'bva-ecp-e-commerce',
    title: 'Defeating Edge-Case Bugs: Boundary Value Analysis in E-Commerce',
    excerpt:
      'Applying Equivalence Class Partitioning and Boundary Value Analysis to checkout carts, coupon thresholds, and currency boundary values.',
    category: 'Test Design',
    readTime: '5 min read',
    date: 'Aug 2026',
    content: [
      'Most software defects cluster at the boundaries of input ranges. A field accepting 1 to 99 items must be rigorously probed at 0, 1, 2, 98, 99, 100, and negative numbers.',
      'In our Automation Exercise e-commerce testing suite, boundary tests immediately surfaced 3 critical issues:',
      '• Adding 0 quantity to cart triggered 500 internal server exceptions instead of graceful 400 validation messages.',
      '• Coupon codes requiring a minimum $100 cart failed when cart total was exactly $100.00 due to strict floating point comparison (`> 100` instead of `>= 100`).',
      'Systematic test design turns guesswork into mathematical certainty.',
    ],
  },
  {
    id: 'jira-defect-lifecycle',
    title: 'Writing Jira Defect Reports that Developers Actually Appreciate',
    excerpt:
      'The anatomy of a zero-friction defect report: reproduction steps, network payloads, console logs, and environment isolation.',
    category: 'STLC Workflow',
    readTime: '4 min read',
    date: 'Aug 2026',
    content: [
      'A great QA engineer does not just find bugs; they shorten the time-to-fix by delivering actionable, reproducible defect tickets.',
      'Golden Rules for Defect Reports:',
      '• Clear Title Formula: [Module] Action failed with specific symptom under specific precondition.',
      '• Exact Environment Spec: Browser version, viewport resolution, user credentials, and OS.',
      '• Step-by-Step Reproduction: Minimal steps to trigger the bug deterministically.',
      '• Network Payload & Console Logs: Attach HAR files or specific failed API response status codes from Chrome DevTools.',
    ],
  },
];

export const BlogModal: React.FC<BlogModalProps> = ({ isOpen, onClose }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost>(BLOG_POSTS[0]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-[#0c1322] text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-orange-500/20 border border-orange-500/40 text-orange-400">
              <BookOpen className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                SQA Engineering Blog &amp; Knowledge Hub
              </h3>
              <p className="text-xs text-slate-400">
                Technical insights on testing methodologies, API verification, and defect lifecycles by Alirabbi.QA
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

        {/* Content Layout */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 min-h-0">
          {/* Article List Sidebar */}
          <div className="md:col-span-5 border-r border-slate-200 dark:border-slate-800 p-4 space-y-3 bg-slate-50/50 dark:bg-slate-950/50 overflow-y-auto">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2">
              Featured SQA Publications
            </span>

            {BLOG_POSTS.map((post) => {
              const isSelected = selectedPost.id === post.id;
              return (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className={`p-3.5 rounded-xl cursor-pointer transition-all border text-left space-y-1.5 ${
                    isSelected
                      ? 'bg-white dark:bg-slate-850 border-orange-500/50 shadow-md shadow-orange-500/5'
                      : 'bg-white/60 dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="px-2 py-0.5 rounded-md bg-orange-500/10 text-orange-600 dark:text-orange-400 font-semibold">
                      {post.category}
                    </span>
                    <span>{post.readTime}</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Active Article Viewer */}
          <div className="md:col-span-7 p-6 overflow-y-auto space-y-4">
            <div className="space-y-2 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold border border-orange-500/20">
                  {selectedPost.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {selectedPost.readTime}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {selectedPost.date}
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white leading-snug">
                {selectedPost.title}
              </h2>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              {selectedPost.content.map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Author: Md. Akher Ali Rabbi (Alirabbi.QA)</span>
              <span className="text-emerald-500 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Peer Reviewed
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            More test case walkthroughs available in GitHub &amp; Jira reports.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 transition-colors"
          >
            Close Reader
          </button>
        </div>

      </div>
    </div>
  );
};

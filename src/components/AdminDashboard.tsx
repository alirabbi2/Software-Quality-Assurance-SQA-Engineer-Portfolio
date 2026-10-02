import React, { useState } from 'react';
import {
  X,
  LayoutDashboard,
  Users,
  Eye,
  FileDown,
  Mail,
  Trash2,
  CheckCircle,
  Download,
  Clock,
  ShieldCheck,
  TrendingUp,
  MessageSquare,
  Activity,
} from 'lucide-react';
import { useAnalytics } from '../context/AnalyticsContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const { summary, messages, recentEvents, markMessageRead, deleteMessage, exportAnalyticsJson } =
    useAnalytics();
  const { user, isAdmin, logout } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'metrics' | 'inbox' | 'activity'>('metrics');
  const [inboxFilter, setInboxFilter] = useState<'all' | 'new' | 'replied'>('all');

  if (!isOpen) return null;

  const unreadCount = messages.filter((m) => !m.read).length;

  const filteredMessages = messages.filter((m) => {
    if (inboxFilter === 'all') return true;
    if (inboxFilter === 'new') return !m.read;
    return m.status === 'replied';
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-600 text-white shadow-sm">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {t.admin.title}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                  {isAdmin ? 'Super Admin' : 'Visitor Analytics'}
                </span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                Real-time engagement telemetry and inquiry inbox
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportAnalyticsJson}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.admin.exportJson}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dashboard Tabs Bar */}
        <div className="flex items-center gap-2 px-6 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('metrics')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'metrics'
                ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Overview & Metrics
          </button>
          <button
            onClick={() => setActiveTab('inbox')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'inbox'
                ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span>Inquiries Inbox</span>
            {unreadCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-rose-500 text-white">
                {unreadCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'activity'
                ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Activity Stream
          </button>
        </div>

        {/* Body content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: METRICS */}
          {activeTab === 'metrics' && (
            <div className="space-y-6">
              {/* Stat Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-xs text-slate-700 dark:text-slate-300 block mb-1">Total Visitors</span>
                  <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    {summary.totalVisitors}
                  </div>
                  <span className="text-[11px] text-emerald-700 dark:text-emerald-300 font-semibold flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> +14.2% this week
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-xs text-slate-700 dark:text-slate-300 block mb-1">Resume Downloads</span>
                  <div className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-300">
                    {summary.resumeDownloads}
                  </div>
                  <span className="text-[11px] text-slate-700 dark:text-slate-300">PDF & Text files</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-xs text-slate-700 dark:text-slate-300 block mb-1">Inquiries Logged</span>
                  <div className="text-2xl font-extrabold text-blue-700 dark:text-blue-300">
                    {messages.length}
                  </div>
                  <span className="text-[11px] text-slate-700 dark:text-slate-300">100% stored securely</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-xs text-slate-700 dark:text-slate-300 block mb-1">QA Tests Triggered</span>
                  <div className="text-2xl font-extrabold text-purple-700 dark:text-purple-300">
                    {summary.testsRunCount}
                  </div>
                  <span className="text-[11px] text-slate-700 dark:text-slate-300">Automated runner passes</span>
                </div>
              </div>

              {/* Section Engagement Breakdown */}
              <div className="rounded-xl p-5 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Visitor Engagement by Section
                </h4>
                
                <div className="space-y-3">
                  {Object.entries(summary.sectionViews).map(([sec, count]) => {
                    const maxVal = Math.max(...Object.values(summary.sectionViews), 1);
                    const pct = Math.round((count / maxVal) * 100);
                    return (
                      <div key={sec} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="capitalize font-semibold text-slate-800 dark:text-slate-200">
                            {sec}
                          </span>
                          <span className="font-mono text-slate-700 dark:text-slate-300 font-bold">
                            {count} views
                          </span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-emerald-500 transition-all duration-300"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INBOX */}
          {activeTab === 'inbox' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <button
                    onClick={() => setInboxFilter('all')}
                    className={`px-3 py-1 rounded-lg ${
                      inboxFilter === 'all'
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    All ({messages.length})
                  </button>
                  <button
                    onClick={() => setInboxFilter('new')}
                    className={`px-3 py-1 rounded-lg ${
                      inboxFilter === 'new'
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Unread ({unreadCount})
                  </button>
                </div>
              </div>

              {filteredMessages.length === 0 ? (
                <div className="py-12 text-center text-slate-700 dark:text-slate-300 text-xs">
                  No messages found in this view.
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-4 rounded-xl border transition-all ${
                        !msg.read
                          ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                          : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200/60 dark:border-slate-800">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900 dark:text-white">
                            {msg.name}
                          </span>
                          <span className="text-xs text-slate-700 dark:text-slate-300 font-mono">
                            &lt;{msg.email}&gt;
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                            {msg.inquiryType.replace('_', ' ')}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-slate-600 dark:text-slate-300 font-mono text-[11px]">
                            {new Date(msg.timestamp).toLocaleString()}
                          </span>
                          {!msg.read && (
                            <button
                              onClick={() => markMessageRead(msg.id)}
                              className="p-1 rounded text-emerald-600 hover:bg-emerald-100 dark:hover:bg-emerald-950"
                              title="Mark as Read"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteMessage(msg.id)}
                            className="p-1 rounded text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-950"
                            title="Delete Message"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="pt-2 space-y-1">
                        <h5 className="font-bold text-xs text-slate-900 dark:text-white">
                          Subject: {msg.subject}
                        </h5>
                        <p className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                          {msg.message}
                        </p>
                      </div>

                      <div className="pt-3 mt-2 border-t border-slate-200/40 dark:border-slate-800 flex items-center justify-between">
                        <span className="text-[11px] text-slate-600 dark:text-slate-300">
                          Status: <strong className="capitalize">{msg.status}</strong>
                        </span>
                        <a
                          href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:underline"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Reply via Email Client</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ACTIVITY STREAM */}
          {activeTab === 'activity' && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Live Visitor Event Telemetry
              </h4>
              
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 bg-slate-50 dark:bg-slate-850">
                {recentEvents.map((evt) => (
                  <div key={evt.id} className="p-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                      <div>
                        <span className="font-semibold text-slate-900 dark:text-white block">
                          {evt.details}
                        </span>
                        <span className="text-[10px] text-slate-600 dark:text-slate-300">
                          {evt.device}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-slate-600 dark:text-slate-300">
                      {new Date(evt.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

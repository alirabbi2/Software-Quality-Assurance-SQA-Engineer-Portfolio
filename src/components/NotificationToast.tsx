import React, { useState, useEffect } from 'react';
import { Bell, X, CheckCircle, ShieldCheck, Sparkles } from 'lucide-react';

interface NotificationToastProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ isOpen, onClose }) => {
  const [permissionState, setPermissionState] = useState<NotificationPermission>('default');
  const [alerts, setAlerts] = useState<Array<{ id: string; title: string; time: string }>>([
    {
      id: 'al_1',
      title: 'New QA Project Artifact: E-Commerce Automation Exercise Defect Matrix published',
      time: 'Just now',
    },
    {
      id: 'al_2',
      title: 'Candidate Availability Status: Actively Interviewing for SQA Roles',
      time: '2 hours ago',
    },
  ]);

  useEffect(() => {
    if ('Notification' in window) {
      setPermissionState(Notification.permission);
    }
  }, []);

  const requestBrowserPush = async () => {
    if ('Notification' in window) {
      try {
        const perm = await Notification.requestPermission();
        setPermissionState(perm);
        if (perm === 'granted') {
          new Notification('Md. Akher Ali Rabbi | SQA Portfolio', {
            body: 'Push notifications enabled. You will receive updates on new QA defect reports and portfolio releases!',
            icon: '/favicon.ico',
          });
        }
      } catch (e) {
        console.warn('Notification permission error', e);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-20 right-4 sm:right-6 z-50 w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-3 animate-in slide-in-from-top-4 duration-200">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600">
            <Bell className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-xs text-slate-900 dark:text-white">
            Activity Alerts & Notifications
          </h4>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2">
        {alerts.map((al) => (
          <div
            key={al.id}
            className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-850 text-xs space-y-0.5 border border-slate-100 dark:border-slate-800"
          >
            <p className="font-medium text-slate-800 dark:text-slate-200 leading-snug">
              {al.title}
            </p>
            <span className="text-[10px] text-slate-600 dark:text-slate-300 block">
              {al.time}
            </span>
          </div>
        ))}
      </div>

      {permissionState !== 'granted' && (
        <div className="pt-1">
          <button
            onClick={requestBrowserPush}
            className="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Enable Real-Time Browser Alerts</span>
          </button>
        </div>
      )}
    </div>
  );
};

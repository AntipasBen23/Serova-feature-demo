'use client';

import { useEffect, useState } from 'react';

export interface Alert {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message: string;
  timestamp: string;
}

interface AlertNotificationProps {
  alerts: Alert[];
  onDismiss: (id: string) => void;
}

export default function AlertNotification({ alerts, onDismiss }: AlertNotificationProps) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
      {alerts.map((alert) => (
        <AlertItem key={alert.id} alert={alert} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function AlertItem({ alert, onDismiss }: { alert: Alert; onDismiss: (id: string) => void }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fade in
    setTimeout(() => setIsVisible(true), 10);

    // Auto dismiss after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onDismiss(alert.id), 300);
    }, 5000);

    return () => clearTimeout(timer);
  }, [alert.id, onDismiss]);

  const getAlertStyle = () => {
    switch (alert.type) {
      case 'success':
        return 'bg-green-500/10 border-green-500/50 text-green-400';
      case 'warning':
        return 'bg-yellow-500/10 border-yellow-500/50 text-yellow-400';
      case 'info':
        return 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400';
    }
  };

  const getIcon = () => {
    switch (alert.type) {
      case 'success':
        return '✓';
      case 'warning':
        return '⚠';
      case 'info':
        return 'ℹ';
    }
  };

  return (
    <div
      className={`
        border rounded-lg p-4 shadow-lg backdrop-blur-sm
        transform transition-all duration-300 ease-out
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        ${getAlertStyle()}
      `}
    >
      <div className="flex items-start gap-3">
        <span className="text-xl">{getIcon()}</span>
        <div className="flex-1">
          <h4 className="font-semibold text-white mb-1">{alert.title}</h4>
          <p className="text-sm opacity-90">{alert.message}</p>
          <p className="text-xs opacity-60 mt-1">{alert.timestamp}</p>
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => onDismiss(alert.id), 300);
          }}
          className="text-white/50 hover:text-white"
        >
          ×
        </button>
      </div>
    </div>
  );
}
'use client';

import { useState, useCallback } from 'react';
import { Alert } from '@/components/AlertNotification';

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const addAlert = useCallback((
    type: Alert['type'],
    title: string,
    message: string
  ) => {
    const newAlert: Alert = {
      id: `alert-${Date.now()}-${Math.random()}`,
      type,
      title,
      message,
      timestamp: new Date().toLocaleTimeString(),
    };

    setAlerts((prev) => [...prev, newAlert]);
  }, []);

  const dismissAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setAlerts([]);
  }, []);

  return {
    alerts,
    addAlert,
    dismissAlert,
    clearAll,
  };
}
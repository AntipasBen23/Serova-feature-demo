'use client';

import { useEffect } from 'react';
import PatientList from '@/components/PatientList';
import Header from '@/components/Header';
import AlertNotification from '@/components/AlertNotification';
import { useAlerts } from '@/hooks/useAlerts';

export default function Home() {
  const { alerts, addAlert, dismissAlert } = useAlerts();

  useEffect(() => {
    // Simulate alerts after component mounts
    const timer1 = setTimeout(() => {
      addAlert(
        'info',
        'ML Pipeline Active',
        'Processing neoantigen candidates for PT-2025-001'
      );
    }, 2000);

    const timer2 = setTimeout(() => {
      addAlert(
        'success',
        'High Confidence Match',
        'BRAF V600E neoantigen scored 94% for PT-2025-002'
      );
    }, 5000);

    const timer3 = setTimeout(() => {
      addAlert(
        'warning',
        'Low HLA Coverage',
        'PT-2025-003: Consider additional HLA typing'
      );
    }, 8000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [addAlert]);

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            NeuroVax Command
          </h1>
          <p className="text-slate-400">
            Real-time ML pipeline monitoring for personalized cancer vaccines
          </p>
        </div>
        <PatientList />
      </main>
      
      <AlertNotification alerts={alerts} onDismiss={dismissAlert} />
    </div>
  );
}
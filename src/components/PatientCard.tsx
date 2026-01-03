'use client';

import { Patient } from '@/types';
import { useRouter } from 'next/navigation';
import { useProgressSimulation } from '@/hooks/useProgressSimulation';

interface PatientCardProps {
  patient: Patient;
}

export default function PatientCard({ patient }: PatientCardProps) {
  const router = useRouter();
  const simulatedProgress = useProgressSimulation(patient.progress, patient.status);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'processing':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'queued':
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div
      onClick={() => router.push(`/patient/${patient.id}`)}
      className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-cyan-500/50 transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">{patient.id}</h3>
          <p className="text-sm text-slate-400">{patient.tumorType}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
            patient.status
          )}`}
        >
          {patient.status}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-xs text-slate-500 mb-1">Mutations</p>
          <p className="text-lg font-semibold text-white">{patient.mutations}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 mb-1">Candidates</p>
          <p className="text-lg font-semibold text-white">{patient.neoantigenCandidates}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 mb-1">Sequenced</p>
          <p className="text-sm font-medium text-white">{patient.sequencingDate}</p>
        </div>
      </div>

      {patient.status === 'processing' && (
        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-2">
            <span>ML Analysis Progress</span>
            <span>{simulatedProgress}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2">
            <div
              className="bg-cyan-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${simulatedProgress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
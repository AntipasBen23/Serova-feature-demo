'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import patientsData from '@/data/patients.json';
import neoantigensData from '@/data/neoantigens.json';
import { Patient, Neoantigen } from '@/types';
import NeoantigenTable from '@/components/NeoantigenTable';

export default function PatientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const patient = patientsData.patients.find((p) => p.id === id) as Patient | undefined;
  const neoantigens = (neoantigensData as Record<string, Neoantigen[]>)[id] || [];

  if (!patient) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-white">Patient not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="border-b border-slate-800 bg-slate-900">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => router.push('/')}
            className="text-cyan-400 hover:text-cyan-300 text-sm mb-2"
          >
            ← Back to Pipeline
          </button>
          <h1 className="text-2xl font-bold text-white">{patient.id}</h1>
          <p className="text-slate-400">{patient.tumorType}</p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <p className="text-xs text-slate-500 mb-1">Status</p>
            <p className="text-lg font-semibold text-white capitalize">{patient.status}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <p className="text-xs text-slate-500 mb-1">Total Mutations</p>
            <p className="text-lg font-semibold text-white">{patient.mutations}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <p className="text-xs text-slate-500 mb-1">Candidates</p>
            <p className="text-lg font-semibold text-white">{patient.neoantigenCandidates}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <p className="text-xs text-slate-500 mb-1">Sequencing Date</p>
            <p className="text-lg font-semibold text-white">{patient.sequencingDate}</p>
          </div>
        </div>

        <NeoantigenTable neoantigens={neoantigens} patientId={patient.id} />
      </main>
    </div>
  );
}
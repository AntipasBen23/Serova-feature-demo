'use client';

import { useState } from 'react';
import patientsData from '@/data/patients.json';
import { Patient } from '@/types';
import PatientCard from './PatientCard';

export default function PatientList() {
  const [patients] = useState<Patient[]>(patientsData.patients);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">
          Active Pipeline ({patients.length} patients)
        </h2>
      </div>

      <div className="grid gap-4">
        {patients.map((patient) => (
          <PatientCard key={patient.id} patient={patient} />
        ))}
      </div>
    </div>
  );
}
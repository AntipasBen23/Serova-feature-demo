'use client';

import { Neoantigen } from '@/types';

interface NeoantigenTableProps {
  neoantigens: Neoantigen[];
  patientId: string;
}

export default function NeoantigenTable({ neoantigens, patientId }: NeoantigenTableProps) {
  if (neoantigens.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 text-center">
        <p className="text-slate-400">No neoantigen data available for this patient yet.</p>
      </div>
    );
  }

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'High':
        return 'text-green-400 bg-green-500/10';
      case 'Medium':
        return 'text-yellow-400 bg-yellow-500/10';
      case 'Low':
        return 'text-slate-400 bg-slate-500/10';
      default:
        return 'text-slate-400 bg-slate-500/10';
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-800">
        <h2 className="text-xl font-semibold text-white">Top Neoantigen Candidates</h2>
        <p className="text-sm text-slate-400 mt-1">Ranked by ML confidence score</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-800/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Peptide Sequence
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Gene/Mutation
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                HLA Allele
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                ML Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Immunogenicity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Confidence
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {neoantigens.map((neo) => (
              <tr key={neo.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-cyan-400 font-semibold">#{neo.rank}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <code className="text-sm font-mono text-white bg-slate-800 px-2 py-1 rounded">
                    {neo.peptideSequence}
                  </code>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">{neo.gene}</div>
                  <div className="text-xs text-slate-500">{neo.mutation}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-slate-300">{neo.hlaAllele}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-slate-800 rounded-full h-2">
                      <div
                        className="bg-cyan-400 h-2 rounded-full"
                        style={{ width: `${neo.mlScore * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-white">
                      {(neo.mlScore * 100).toFixed(0)}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-white">{neo.immunogenicity.toFixed(1)}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(
                      neo.confidence
                    )}`}
                  >
                    {neo.confidence}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
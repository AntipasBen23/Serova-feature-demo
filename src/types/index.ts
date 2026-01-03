export interface Patient {
  id: string;
  name: string;
  tumorType: string;
  status: 'queued' | 'processing' | 'completed';
  progress: number;
  sequencingDate: string;
  mutations: number;
  neoantigenCandidates: number;
}

export interface Neoantigen {
  id: string;
  peptideSequence: string;
  gene: string;
  mutation: string;
  hlaAllele: string;
  mlScore: number;
  immunogenicity: number;
  bindingAffinity: number;
  confidence: 'High' | 'Medium' | 'Low';
  rank: number;
}
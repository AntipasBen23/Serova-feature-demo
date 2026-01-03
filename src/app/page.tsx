import PatientList from '@/components/PatientList';
import Header from '@/components/Header';

export default function Home() {
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
    </div>
  );
}
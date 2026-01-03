export default function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-900">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-cyan-400 rounded-lg flex items-center justify-center">
            <span className="text-slate-950 font-bold text-sm">NV</span>
          </div>
          <span className="text-white font-semibold text-lg">NeuroVax Command</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-slate-400">ML Pipeline Active</span>
          </div>
        </div>
      </div>
    </header>
  );
}
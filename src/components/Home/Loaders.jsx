import { Loader2, Database } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[#F4F5F7] flex flex-col items-center justify-center">
      <Loader2 className="w-10 h-10 text-[#0D1F4D] animate-spin mb-4" />
      <p className="text-[#0D1F4D] font-black uppercase tracking-widest text-xs">Cargando datos reales...</p>
    </div>
  );
}

export function ErrorScreen({ error }) {
  return (
    <div className="min-h-screen bg-[#F4F5F7] flex items-center justify-center p-6 text-center">
      <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl max-w-sm w-full">
        <Database className="w-12 h-12 text-rose-500 mx-auto mb-4" />
        <h2 className="text-xl font-black text-slate-900 mb-2">Fallo de lectura</h2>
        <p className="text-slate-500 text-sm font-medium mb-6">{error}</p>
        <button onClick={() => window.location.reload()} className="w-full bg-[#0D1F4D] text-[#D6FF00] px-4 py-3.5 rounded-xl font-black text-sm uppercase tracking-wide hover:bg-slate-900 transition-colors">
          Reintentar
        </button>
      </div>
    </div>
  );
}
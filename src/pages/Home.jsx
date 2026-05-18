import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [codigoSimulado, setCodigoSimulado] = useState('');

  const handleSimularEscaneo = (e) => {
    e.preventDefault();
    if (codigoSimulado.trim()) {
      // Simula el redireccionamiento directo que haría el código QR físico
      navigate(`/conductor/${codigoSimulado.trim().toUpperCase()}`);
    } else {
      alert("Por favor, selecciona o ingresa un código de unidad.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex justify-center font-sans">
      <div className="w-full max-w-md bg-[#f8fafc] sm:my-8 sm:rounded-[2.5rem] sm:shadow-2xl overflow-hidden flex flex-col relative pb-6">
        
        {/* CABECERA DE MARCA */}
        <div className="bg-slate-900 pt-8 pb-6 px-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center tracking-tight">
            <span className="text-xl font-black text-white">Vial</span>
            <span className="text-xl font-black text-emerald-400">Centiva</span>
          </div>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
            Módulo Pasajero
          </span>
        </div>

        {/* VISOR DE ESCANEO SIMULADO (UI de Cámara Nativa) */}
        <div className="p-6 flex-grow flex flex-col justify-center items-center relative bg-slate-950">
          
          {/* Guías del Escáner QR en las esquinas */}
          <div className="absolute w-64 h-64 border-2 border-white/20 rounded-3xl z-0"></div>
          <div className="absolute w-64 h-64 flex flex-col justify-between z-10 pointer-events-none p-1">
            <div className="flex justify-between">
              <div className="w-8 h-8 border-t-4 border-l-4 border-emerald-400 rounded-tl-xl"></div>
              <div className="w-8 h-8 border-t-4 border-r-4 border-emerald-400 rounded-tr-xl"></div>
            </div>
            {/* Animación de línea láser de escaneo */}
            <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse shadow-[0_0_15px_rgba(52,211,153,1)]"></div>
            <div className="flex justify-between">
              <div className="w-8 h-8 border-b-4 border-l-4 border-emerald-400 rounded-bl-xl"></div>
              <div className="w-8 h-8 border-b-4 border-r-4 border-emerald-400 rounded-br-xl"></div>
            </div>
          </div>

          {/* Información Contextual en pantalla de la cámara */}
          <div className="relative z-20 text-center flex flex-col items-center max-w-xs">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md mb-4 text-white">
              <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h2M4 8h16M4 16h16M4 4h16v16H4V4z"></path></svg>
            </div>
            <h2 className="text-white font-black text-lg mb-2">Escaneo Automático QR</h2>
            <p className="text-slate-400 text-xs font-medium leading-relaxed mb-6">
              En condiciones reales, escanear el sticker del paradero abrirá la auditoría de forma inmediata.
            </p>

            {/* PANEL DE CONTROL DE PRUEBA (Para la defensa ante el Jurado) */}
            <form onSubmit={handleSimularEscaneo} className="w-full bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-white/5 shadow-2xl">
              <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                Selecciona una unidad piloto:
              </span>
              
              {/* Botones rápidos de inyección de datos */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setCodigoSimulado('JUAN001')}
                  className={`py-2 px-3 rounded-xl text-xs font-black transition-all ${codigoSimulado === 'JUAN001' ? 'bg-emerald-500 text-white shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                >
                  Unidad 014 (Juan)
                </button>
                <button
                  type="button"
                  onClick={() => setCodigoSimulado('PEDRO099')}
                  className={`py-2 px-3 rounded-xl text-xs font-black transition-all ${codigoSimulado === 'PEDRO099' ? 'bg-emerald-500 text-white shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                >
                  Unidad 099 (Pedro)
                </button>
              </div>

              {/* Input mimetizado como terminal de lectura */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Código QR"
                  value={codigoSimulado}
                  onChange={(e) => setCodigoSimulado(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-center text-xs font-mono font-black uppercase text-emerald-400 tracking-widest focus:outline-none focus:border-emerald-500"
                  readOnly
                />
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-400 text-white font-black px-4 rounded-xl text-xs transition-colors active:scale-95 flex items-center justify-center shadow-lg shadow-emerald-500/20"
                >
                  Simular
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* FOOTER EDUCATIVO */}
        <div className="px-6 py-4 bg-white border-t border-slate-100 flex justify-between items-center">
          <p className="text-[11px] font-bold text-slate-400 leading-none">
            © 2026 VialCentiva Inc.
          </p>
          <button 
            onClick={() => navigate('/privacy')}
            className="text-slate-500 hover:text-slate-900 text-[11px] font-black uppercase tracking-wider transition-colors"
          >
            Políticas de Privacidad
          </button>
        </div>

      </div>
    </div>
  );
}
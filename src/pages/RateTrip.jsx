import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerPerfilConductor, guardarCalificacion } from '../services/api';

export default function RateTrip() {
  const { codigoQR } = useParams();
  const navigate = useNavigate();

  const [conductor, setConductor] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState(null);

  const [respuestas, setRespuestas] = useState({
    velocidad: null,
    celular: null,
    trato: null,
    paradero: null,
    limpieza: null,
    celularPasajero: null
  });
  const [errorCelular, setErrorCelular] = useState(null);

  useEffect(() => {
    async function cargarConductor() {
      const respuesta = await obtenerPerfilConductor(codigoQR);
      if (respuesta.exito) {
        setConductor(respuesta.datos);
      } else {
        setError(respuesta.error);
      }
      setCargando(false);
    }
    if (codigoQR) cargarConductor();
  }, [codigoQR]);

  const marcarTodoExcelente = () => {
    setRespuestas({
      velocidad: true,
      celular: true,
      trato: true,
      paradero: true,
      limpieza: true,
      celularPasajero: respuestas.celularPasajero
    });
  };

  const handleToggle = (campo, valor) => {
    setRespuestas({ ...respuestas, [campo]: valor });
  };

  const validarCelular = (celular) => {
    if (!celular) return true;
    return /^\d{7,15}$/.test(celular.replace(/\s/g, ''));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (respuestas.velocidad === null || respuestas.celular === null ||
        respuestas.trato === null || respuestas.paradero === null || respuestas.limpieza === null) {
      alert("Por favor, responde todos los criterios antes de enviar.");
      return;
    }

    if (respuestas.celularPasajero && !validarCelular(respuestas.celularPasajero)) {
      setErrorCelular("Ingresa un número de celular válido (7-15 dígitos)");
      return;
    }

    setEnviando(true);
    const resultado = await guardarCalificacion(conductor.conductor_id, respuestas);
    setEnviando(false);

    if (resultado.exito) {
      navigate('/gracias', { state: { celular: respuestas.celularPasajero } });
    } else {
      alert(resultado.error);
    }
  };

  if (cargando) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center font-sans">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
        <div className="text-slate-400 font-bold uppercase tracking-widest text-xs">Preparando auditoría</div>
      </div>
    );
  }

  if (error || !conductor) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 font-sans">
        <div className="bg-white p-8 rounded-[2rem] shadow-xl text-center w-full max-w-sm">
          <svg className="w-12 h-12 text-rose-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <p className="text-slate-900 font-black text-lg mb-6">Error al conectar con la unidad</p>
          <button onClick={() => navigate('/')} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold">Volver al inicio</button>
        </div>
      </div>
    );
  }

  const criterios = [
    { 
      id: 'velocidad', label: 'Velocidad prudente', desc: 'Sin maniobras bruscas',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
    },
    { 
      id: 'celular', label: 'Evitó uso de celular', desc: 'Atención total al volante',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>
    },
    { 
      id: 'trato', label: 'Trato respetuoso', desc: 'Servicio cordial al pasajero',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path></svg>
    },
    { 
      id: 'paradero', label: 'Respetó el paradero', desc: 'Estacionamiento seguro',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
    },
    { 
      id: 'limpieza', label: 'Unidad limpia', desc: 'Asientos e interior ordenados',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex justify-center font-sans pb-[100px] sm:pb-8">
      
      <div className="w-full max-w-md bg-[#f8fafc] sm:my-8 sm:rounded-[2.5rem] sm:shadow-2xl sm:overflow-hidden relative flex flex-col">

        {/* CABECERA CORPORATIVA ASIMÉTRICA */}
        <div className="bg-slate-900 rounded-bl-[3rem] px-6 pt-8 pb-14 text-white relative z-0 shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <div className="flex items-center gap-2.5">
    <div className="bg-white h-7 w-7 rounded-lg p-1 flex items-center justify-center shadow-md shrink-0 border border-slate-100">
      <img src="/logo_vialcentiva.png" alt="Logo" className="max-h-full max-w-full object-contain" />
    </div>
    <div className="flex items-center tracking-tight text-base">
      <span className="font-black text-white">Vial</span>
      <span className="font-black text-emerald-400">Centiva</span>
    </div>
  </div>
          </div>
          
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-white rounded-[1.2rem] flex items-center justify-center shadow-inner shrink-0 transform -rotate-3">
              <span className="text-2xl font-black text-slate-900 transform rotate-3">
                {conductor.nombre_publico.substring(0, 2).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-slate-400 text-[10px] uppercase tracking-widest font-black mb-1">Evaluando a</p>
              <h1 className="text-2xl font-black leading-tight text-white mb-1">{conductor.nombre_publico}</h1>
            </div>
          </div>
        </div>

        {/* CUERPO DEL FORMULARIO */}
        <form onSubmit={handleSubmit} className="px-5 -mt-8 relative z-10 flex flex-col gap-5 pb-32">
          
          {/* NUEVO: AVISO DE EMPODERAMIENTO CIUDADANO (Trust Banner) */}
          <div className="bg-indigo-50/90 border border-indigo-100 rounded-2xl p-4 flex gap-4 items-center shadow-sm relative overflow-hidden backdrop-blur-sm">
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-indigo-400/10 rounded-full blur-xl"></div>
            <div className="w-10 h-10 bg-white text-indigo-600 rounded-xl flex items-center justify-center shrink-0 border border-indigo-100 shadow-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            </div>
            <div className="relative z-10">
              <h4 className="text-[13px] font-black text-indigo-950 mb-0.5 tracking-wide leading-tight">Evalúa con total libertad</h4>
              <p className="text-[11px] text-indigo-800/80 font-medium leading-relaxed">
                No permitas que el conductor influya en tu calificación. Tu opinión honesta y privada garantiza el bienestar de todos.
              </p>
            </div>
          </div>

          {/* BOTÓN MAESTRO PREMIUM */}
          <button
            type="button"
            onClick={marcarTodoExcelente}
            className="w-full relative overflow-hidden bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-5 shadow-lg shadow-orange-500/20 flex items-center gap-4 group transition-transform active:scale-95 border border-white/20 mt-1"
          >
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm shrink-0">
              <svg className="w-7 h-7 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd"></path></svg>
            </div>
            <div className="text-left">
              <span className="block text-white font-black text-[17px] tracking-wide leading-tight drop-shadow-sm">
                ¡Viaje de 5 estrellas!
              </span>
              <span className="block text-white/80 text-[11px] font-bold uppercase tracking-wider mt-0.5">
                Marcar todo como excelente
              </span>
            </div>
          </button>

          <div className="flex items-center gap-3 my-1">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Evaluación Detallada</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          {/* CRITERIOS: Smart Cards Estilo iOS */}
          <div className="flex flex-col gap-4">
            {criterios.map((c) => (
              <div key={c.id} className="bg-white p-5 rounded-[1.5rem] shadow-sm border border-slate-100 flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 shrink-0 border border-slate-100">
                    {c.icon}
                  </div>
                  <div>
                    <h4 className="text-[15px] font-black text-slate-800 leading-none mb-1">{c.label}</h4>
                    <p className="text-[12px] text-slate-500 font-medium leading-tight">{c.desc}</p>
                  </div>
                </div>
                
                {/* Controles Segmentados (Unified Switch) */}
                <div className="flex gap-2 bg-slate-100 p-1.5 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => handleToggle(c.id, true)}
                    className={`flex-1 py-3 rounded-xl text-[13px] font-black transition-all duration-300 ${
                      respuestas[c.id] === true 
                      ? 'bg-emerald-500 text-white shadow-md' 
                      : 'text-slate-500 hover:bg-white/60'
                    }`}
                  >
                    Sí cumple
                  </button>
                  <button
                    type="button"
                    onClick={() => handleToggle(c.id, false)}
                    className={`flex-1 py-3 rounded-xl text-[13px] font-black transition-all duration-300 ${
                      respuestas[c.id] === false 
                      ? 'bg-rose-500 text-white shadow-md' 
                      : 'text-slate-500 hover:bg-white/60'
                    }`}
                  >
                    No cumple
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Tarjeta de Sorteo / Fidelización (Oscura y Premium) */}
          <div className="bg-slate-900 rounded-[1.5rem] p-6 relative overflow-hidden shadow-xl shadow-slate-900/10 mt-2 mb-6">
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <svg className="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path></svg>
            </div>
            <div className="relative z-10">
              <h4 className="text-[14px] font-black text-white mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path></svg>
                Acumula VialTickets
              </h4>
              <p className="text-[12px] text-slate-400 mb-4 font-medium leading-relaxed">
                Ingresa tu número (opcional) para participar en sorteos y descuentos en la asociación.
              </p>
              <input
                type="tel"
                placeholder="Ingresa tu celular"
                value={respuestas.celularPasajero || ''}
                onChange={(e) => {
                  setRespuestas({ ...respuestas, celularPasajero: e.target.value || null });
                  setErrorCelular(null);
                }}
                className={`w-full px-5 py-3.5 rounded-xl border-2 text-[14px] font-bold bg-white/5 text-white placeholder-slate-500 focus:outline-none transition-all ${
                  errorCelular ? 'border-rose-500 focus:bg-rose-500/10' : 'border-slate-700 focus:border-emerald-400 focus:bg-white/10'
                }`}
              />
              {errorCelular && <p className="text-[11px] text-rose-400 mt-2 font-bold">{errorCelular}</p>}
            </div>
          </div>
          
        </form>

        {/* FLOATING ACTION BAR (Sticky Footer estilo App Nativa) */}
        <div className="fixed sm:absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-4 px-5 z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.03)] flex justify-center">
          <div className="w-full max-w-md">
            <button
              onClick={handleSubmit}
              disabled={enviando}
              className={`w-full text-white text-[16px] font-black py-4 rounded-2xl shadow-lg transition-all flex justify-center items-center gap-2 ${
                enviando 
                ? 'bg-slate-300 cursor-not-allowed' 
                : 'bg-slate-900 hover:bg-slate-800 active:scale-95 shadow-slate-900/20'
              }`}
            >
              {enviando ? 'Procesando auditoría...' : 'Enviar calificación'}
              {!enviando && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
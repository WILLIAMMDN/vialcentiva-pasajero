import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerPerfilConductor, guardarCalificacion } from '../services/api';
import { ChevronLeft, ChevronRight, Star, ShieldCheck, CheckCircle2, ThumbsUp, ThumbsDown, Ticket } from 'lucide-react';

export default function RateTrip() {
  const { codigoQR } = useParams();
  const navigate = useNavigate();

  const [conductor, setConductor] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState(null);

  // Estado para capturar si la imagen falla al cargar
  const [imgError, setImgError] = useState(false);

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
      if (respuesta.exito && respuesta.datos) {
        setConductor(respuesta.datos);
        setImgError(false);
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
      alert("Por favor, responde todos los criterios antes de enviar la auditoría.");
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

  // ==========================================
  // PANTALLA DE CARGA 
  // ==========================================
  if (cargando) {
    return (
      <div className="min-h-screen bg-[#00B5E2] flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          <div className="text-white font-black uppercase tracking-widest text-sm">Preparando auditoría...</div>
        </div>
      </div>
    );
  }

  // ==========================================
  // PANTALLA DE ERROR
  // ==========================================
  if (error || !conductor) {
    return (
      <div className="min-h-screen bg-[#F4F5F7] flex items-center justify-center p-6 font-sans">
        <div className="bg-white p-8 rounded-3xl shadow-xl text-center w-full max-w-sm border border-gray-100">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
             <span className="text-red-500 font-black text-2xl">X</span>
          </div>
          <p className="text-[#031549] font-black text-xl mb-6">Error al conectar con la unidad</p>
          <button onClick={() => navigate('/')} className="w-full py-4 bg-[#031549] text-white font-black hover:bg-black transition-colors rounded-xl">
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const nombreMostrar = conductor?.nombre_abreviado || conductor?.nombre_publico || 'Conductor';
  const iniciales = nombreMostrar.substring(0, 2).toUpperCase();

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
    <div className="min-h-screen bg-[#F4F5F7] flex flex-col font-sans pb-[100px]">
      
      {/* 1. HEADER (Limpio y Blanco) */}
      <header className="bg-white flex items-center justify-between px-6 h-[80px] sticky top-0 z-50 shadow-sm border-b border-gray-100">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 -ml-2 text-[#031549] hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft strokeWidth={3} className="w-7 h-7" />
        </button>
        <div className="flex items-center gap-2">
          <img src="/logo_vialcentiva.png" alt="VialCentiva" className="h-8 w-auto object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
          <span className="font-black text-[#031549] text-xl tracking-tighter">VialCentiva</span>
        </div>
        <div className="w-7 h-7"></div> 
      </header>

      {/* 2. HERO DE EVALUACIÓN CON FOTO FLOTANTE */}
      <div className="bg-[#00B5E2] pt-8 pb-24 px-6 text-center relative z-0">
        <div className="inline-block bg-[#FFD500] px-4 py-1.5 shadow-sm mb-3">
          <p className="text-[#031549] text-xs font-black tracking-widest uppercase">
            EVALUACIÓN EN CURSO
          </p>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">
          Calificando a <br/> {nombreMostrar}
        </h1>
      </div>

      {/* 3. CONTENEDOR PRINCIPAL DEL FORMULARIO */}
      <form onSubmit={handleSubmit} className="px-5 sm:px-8 relative z-20 flex flex-col gap-5 -mt-14">
        
        {/* FOTO FLOTANTE DEL CONDUCTOR (Idéntica a DriverProfile) */}
        <div className="relative mx-auto -mt-10 mb-2">
          <div className="w-32 h-32 bg-white rounded-full p-1.5 shadow-2xl relative z-10 mx-auto">
            <div className="w-full h-full bg-[#F4F5F7] rounded-full overflow-hidden flex items-center justify-center border border-gray-100">
              {conductor?.foto_url && !imgError ? (
                <img 
                  src={conductor.foto_url} 
                  alt="Perfil" 
                  className="w-full h-full object-cover" 
                  onError={() => setImgError(true)} 
                />
              ) : (
                <span className="text-5xl font-black text-[#031549] tracking-tighter">
                  {iniciales}
                </span>
              )}
            </div>
          </div>
          <div className="absolute bottom-0 right-2 bg-[#00B5E2] border-4 border-white rounded-full shadow-lg z-20 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-white fill-[#031549]" strokeWidth={1.5} />
          </div>
        </div>

        {/* TRUST BANNER (Estilo Premium) */}
        <div className="bg-blue-50/80 border border-blue-100 rounded-2xl p-4 flex gap-4 items-center shadow-sm relative overflow-hidden">
          <div className="w-10 h-10 bg-white text-[#00B5E2] rounded-xl flex items-center justify-center shrink-0 border border-blue-50 shadow-sm">
             <ShieldCheck className="w-6 h-6" strokeWidth={2.5} />
          </div>
          <div className="relative z-10">
            <h4 className="text-[13px] font-black text-[#031549] mb-0.5 tracking-tight">Evaluación 100% Privada</h4>
            <p className="text-[11px] text-[#031549]/70 font-bold leading-relaxed">
              El conductor no sabrá quién lo calificó. Tu honestidad garantiza un mejor transporte. No dejes que el conductor influya en tu evaluación, ¡califica con total sinceridad!
            </p>
          </div>
        </div>

        {/* BOTÓN RÁPIDO: TODO EXCELENTE */}
        <button
          type="button"
          onClick={marcarTodoExcelente}
          className="w-full bg-[#FFD500] hover:bg-[#e6c000] border-2 border-[#FFD500] rounded-2xl p-5 shadow-[0_8px_20px_rgba(255,213,0,0.25)] flex items-center gap-4 transition-transform active:scale-95 group mt-2"
        >
          <div className="w-12 h-12 bg-white/40 rounded-xl flex items-center justify-center shrink-0">
            <Star className="w-7 h-7 text-[#031549] fill-[#031549]" />
          </div>
          <div className="text-left">
            <span className="block text-[#031549] font-black text-[17px] tracking-wide leading-tight">
              ¡Viaje de 5 estrellas!
            </span>
            <span className="block text-[#031549]/80 text-[11px] font-black uppercase tracking-widest mt-1">
              Marcar todo como excelente
            </span>
          </div>
        </button>

        <div className="flex items-center gap-3 my-2">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Evaluación Detallada</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* CRITERIOS: Tarjetas Limpias y Botones Rediseñados */}
        <div className="flex flex-col gap-4">
          {criterios.map((c) => (
            <div key={c.id} className="bg-white p-5 rounded-[1.5rem] shadow-[0_4px_15px_rgba(0,0,0,0.02)] border border-gray-100 flex flex-col gap-4">
              
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-slate-50 flex items-center justify-center text-[#031549] shrink-0 border border-gray-100">
                  {c.icon}
                </div>
                <div>
                  <h4 className="text-[15px] font-black text-[#031549] leading-none mb-1.5">{c.label}</h4>
                  <p className="text-[12px] text-gray-500 font-bold leading-tight">{c.desc}</p>
                </div>
              </div>
              
              {/* Controles Rediseñados (Mucho más intuitivos y premium) */}
              <div className="flex gap-3 mt-1">
                <button
                  type="button"
                  onClick={() => handleToggle(c.id, true)}
                  className={`flex-1 py-3.5 rounded-xl text-[14px] font-black flex items-center justify-center gap-2 transition-all duration-300 ${
                    respuestas[c.id] === true 
                    ? 'bg-[#00B5E2] text-white shadow-[0_4px_15px_rgba(0,181,226,0.35)] ring-2 ring-[#00B5E2] ring-offset-2' 
                    : 'bg-[#F4F5F7] text-gray-400 hover:bg-gray-200 border border-transparent'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" strokeWidth={3} /> SÍ
                </button>
                <button
                  type="button"
                  onClick={() => handleToggle(c.id, false)}
                  className={`flex-1 py-3.5 rounded-xl text-[14px] font-black flex items-center justify-center gap-2 transition-all duration-300 ${
                    respuestas[c.id] === false 
                    ? 'bg-rose-500 text-white shadow-[0_4px_15px_rgba(244,63,94,0.35)] ring-2 ring-rose-500 ring-offset-2' 
                    : 'bg-[#F4F5F7] text-gray-400 hover:bg-gray-200 border border-transparent'
                  }`}
                >
                  <ThumbsDown className="w-4 h-4" strokeWidth={3} /> NO
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* TARJETA FIDELIZACIÓN / SORTEOS (Look Corporativo) */}
        <div className="bg-[#031549] rounded-[1.5rem] p-6 relative overflow-hidden shadow-xl mt-4 mb-8">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Ticket className="w-24 h-24 text-white" />
          </div>
          <div className="relative z-10">
            <h4 className="text-[14px] font-black text-white mb-2 flex items-center gap-2">
              <Star className="w-5 h-5 text-[#FFD500] fill-[#FFD500]" />
              Acumula VialTickets
            </h4>
            <p className="text-[12px] text-blue-100/80 mb-5 font-bold leading-relaxed pr-6">
              Ingresa tu celular (opcional) para participar en sorteos y obtener descuentos en los negocios de la ciudad.
            </p>
            <input
              type="tel"
              placeholder="Ingresa tu celular"
              value={respuestas.celularPasajero || ''}
              onChange={(e) => {
                setRespuestas({ ...respuestas, celularPasajero: e.target.value || null });
                setErrorCelular(null);
              }}
              className={`w-full px-5 py-4 rounded-xl border-2 text-[14px] font-black bg-white/10 text-white placeholder-blue-200/50 outline-none transition-all ${
                errorCelular ? 'border-rose-500 focus:bg-rose-500/10' : 'border-blue-800 focus:border-[#00B5E2] focus:bg-white/20'
              }`}
            />
            {errorCelular && <p className="text-[11px] text-rose-400 mt-2 font-black">{errorCelular}</p>}
          </div>
        </div>
        
      </form>

      {/* 4. FLOATING ACTION BAR (Botón Inferior) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 px-5 z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] flex justify-center">
        <div className="w-full max-w-md">
          <button
            onClick={handleSubmit}
            disabled={enviando}
            className={`w-full text-white text-[16px] font-black py-4 rounded-2xl shadow-lg transition-all flex justify-center items-center gap-2 ${
              enviando 
              ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
              : 'bg-[#031549] hover:bg-black active:scale-95 shadow-[#031549]/20'
            }`}
          >
            {enviando ? 'Enviando auditoría...' : 'Finalizar y Calificar'}
            {!enviando && <ChevronRight className="w-5 h-5" strokeWidth={3} />}
          </button>
        </div>
      </div>

    </div>
  );
}
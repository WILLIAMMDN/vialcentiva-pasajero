import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { obtenerDiasCalificados } from '../services/api';

export default function ThankYou() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Capturamos el celular del estado de navegación de forma segura
  const celularPasajero = location.state?.celular || null;

  const [diasCalificados, setDiasCalificados] = useState(0);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarDias() {
      // Consultamos la API enviando el celular para el cruce híbrido en la ventana móvil
      const resultado = await obtenerDiasCalificados(celularPasajero);
      if (resultado.exito) {
        setDiasCalificados(resultado.diasCalificados);
      }
      setCargando(false);
    }
    cargarDias();
  }, [celularPasajero]); 

  if (cargando) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center font-sans">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
        <div className="text-slate-400 font-bold uppercase tracking-widest text-xs">Validando racha...</div>
      </div>
    );
  }

  // Calculamos el porcentaje de progreso de forma segura (Máximo 100%)
  const progreso = Math.min((diasCalificados / 2) * 100, 100);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex justify-center font-sans sm:pb-8">
      
      {/* CONTENEDOR PRINCIPAL: Estilo Premium Card */}
      <div className="w-full max-w-md bg-[#f8fafc] sm:my-8 sm:rounded-[2.5rem] sm:shadow-2xl sm:overflow-hidden relative flex flex-col">

        {/* CABECERA CON LOGO CLICKEABLE */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img
              src="/logo_vialcentiva.png"
              alt="VialCentiva"
              className="h-6 w-auto object-contain"
            />
            <span className="text-xs font-black text-slate-600 uppercase">Volver</span>
          </button>
        </div>

        {/* CABECERA CORPORATIVA DE ÉXITO */}
        <div className="bg-slate-900 rounded-bl-[3rem] px-6 pt-12 pb-20 text-center relative z-0 shadow-lg overflow-hidden">
          {/* Brillo de fondo sutil */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            {/* Ícono de Éxito Flotante */}
            <div className="w-20 h-20 bg-emerald-500/10 border-2 border-emerald-400/30 rounded-full flex items-center justify-center mb-5 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
              <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/40">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
            </div>

            <h1 className="text-3xl font-black text-white tracking-tight mb-1">¡Auditoría Exitosa!</h1>
            <p className="text-emerald-400 text-[11px] font-black uppercase tracking-widest">
              Tu participación mejora el paradero
            </p>
          </div>
        </div>

        {/* CUERPO SUPERPUESTO */}
        <div className="px-5 -mt-12 relative z-10 flex flex-col gap-5 pb-8 flex-grow">

          {/* MÓDULO DE GAMIFICACIÓN: Racha de uso */}
          <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100">
            <div className="flex justify-between items-end mb-4">
              <div>
                <h3 className="text-[15px] font-black text-slate-800 leading-none mb-1">Tu racha activa</h3>
                <p className="text-[12px] text-slate-500 font-medium">Desbloquea beneficios de usuario</p>
              </div>
              <div className="bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                <span className="text-[13px] font-black text-emerald-600">{diasCalificados} / 2 <span className="text-[10px] uppercase">días</span></span>
              </div>
            </div>

            {/* Barra de Progreso Premium */}
            <div className="relative w-full h-4 bg-slate-100 rounded-full overflow-hidden mb-4 shadow-inner border border-slate-200/50">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progreso}%` }}
              >
                {/* Brillo interno de la barra */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-white/20 rounded-full"></div>
              </div>
            </div>

            {/* Explicación Dinámica de la Regla de Negocio */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100/80">
              <p className="text-[12px] text-slate-600 font-medium leading-relaxed">
                {diasCalificados < 2 ? (
                  <>
                    Evalúa tus viajes en <span className="font-bold text-slate-800">1 día más</span> dentro de la próxima semana para activar tus VialTickets y entrar a los sorteos de la asociación.
                  </>
                ) : (
                  <>
                    <span className="font-bold text-emerald-600">¡Objetivo alcanzado!</span> Has calificado en 2 días distintos. Tus VialTickets están activos para el próximo sorteo del paradero.
                  </>
                )}
              </p>
            </div>
          </div>

          {/* BANNER DE FIDELIZACIÓN (Punto Digital - VIP Ticket Style) */}
          <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-[1.5rem] p-6 relative overflow-hidden shadow-lg shadow-orange-500/20 group">
            {/* Marca de agua / Textura de fondo */}
            <div className="absolute -right-4 -top-4 opacity-20 transform rotate-12 group-hover:rotate-45 transition-transform duration-700">
              <svg className="w-32 h-32 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path></svg>
            </div>
            
            <div className="relative z-10 flex gap-4 items-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm shrink-0 border border-white/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path></svg>
              </div>
              <div>
                <h4 className="text-[15px] font-black text-white leading-tight mb-1 drop-shadow-sm">Beneficios Exclusivos</h4>
                <p className="text-[11px] text-white/90 font-medium leading-relaxed drop-shadow-sm">
                  Mantén tu racha para obtener cupones de descuento y servicios técnicos en aliados locales como <span className="font-bold">Punto Digital</span>.
                </p>
              </div>
            </div>
          </div>

          {/* ESPACIADOR FLEXIBLE para empujar el botón al fondo si la pantalla es muy alta */}
          <div className="flex-grow"></div>

          {/* BOTÓN DE RETORNO (Estilo App Nativa) */}
          <button
            onClick={() => navigate('/')}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white text-[16px] font-black py-4 rounded-2xl shadow-lg shadow-slate-900/10 transition-all active:scale-95 flex justify-center items-center gap-2 mt-4"
          >
            Entendido, volver al inicio
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          </button>

        </div>
      </div>
    </div>
  );
}
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { obtenerDiasCalificados } from '../services/api';
// Se importan los mejores iconos modernos y ligeros de lucide-react
import { ChevronRight, CheckCircle2, Flame, Ticket, Home } from 'lucide-react';

export default function ThankYou() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Capturamos el celular del estado de navegación de forma segura
  const celularPasajero = location.state?.celular || null;

  const [diasCalificados, setDiasCalificados] = useState(0);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarDias() {
      // Consultamos la API enviando el celular para el cruce híbrido[cite: 15]
      const resultado = await obtenerDiasCalificados(celularPasajero);
      if (resultado.exito) {
        setDiasCalificados(resultado.diasCalificados);
      }
      setCargando(false);
    }
    cargarDias();
  }, [celularPasajero]); 

  // ==========================================
  // PANTALLA DE CARGA CORPORATIVA
  // ==========================================
  if (cargando) {
    return (
      <div className="min-h-screen bg-[#00B5E2] flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          <div className="text-white font-black uppercase tracking-widest text-sm">Validando tu impacto...</div>
        </div>
      </div>
    );
  }

  // Calculamos el porcentaje de progreso de forma segura (Máximo 100%)[cite: 15]
  const progreso = Math.min((diasCalificados / 2) * 100, 100);

  // ==========================================
  // PANTALLA PRINCIPAL DE ÉXITO
  // ==========================================
  return (
    <div className="min-h-screen bg-[#F4F5F7] flex flex-col font-sans relative">
      
      {/* 1. HEADER (Blanco y limpio) */}
      <header className="bg-white flex items-center justify-center px-6 h-[80px] sticky top-0 z-50 shadow-sm border-b border-gray-100">
        <div className="flex items-center gap-2">
          <img src="/logo_vialcentiva.png" alt="VialCentiva" className="h-8 w-auto object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
          <span className="font-black text-[#031549] text-xl tracking-tighter">VialCentiva</span>
        </div>
      </header>

      {/* 2. HERO DE ÉXITO (Cian con alto contraste) */}
      <div className="bg-[#00B5E2] pt-12 pb-24 px-6 text-center z-10 flex flex-col items-center">
        
        {/* Ícono de Éxito Flotante */}
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl mb-6 relative">
          <CheckCircle2 className="w-16 h-16 text-[#00B5E2] fill-[#031549]" strokeWidth={1} />
          {/* Brillo sutil de celebración */}
          <div className="absolute inset-0 rounded-full ring-4 ring-white/30 animate-ping"></div>
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-[#031549] tracking-tight mb-4">
          ¡Auditoría Exitosa!
        </h1>
        
        <div className="inline-block bg-[#FFD500] px-5 py-2 shadow-sm">
          <p className="text-[#031549] text-sm font-black tracking-widest uppercase">
            Tu participación mejora la ciudad
          </p>
        </div>
      </div>

      {/* 3. CONTENEDOR DE GAMIFICACIÓN Y RECOMPENSAS (Blanco) */}
      <div className="bg-white rounded-t-[2.5rem] px-6 pt-10 pb-[120px] flex-grow shadow-[0_-10px_40px_rgba(3,21,73,0.1)] relative z-20 -mt-10">

        {/* MÓDULO DE RACHA (Diseño UI Moderno) */}
        <div className="bg-[#F4F5F7] rounded-3xl p-6 border border-gray-100 mb-6">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h3 className="text-lg font-black text-[#031549] flex items-center gap-2 mb-1">
                <Flame className="w-5 h-5 text-[#FFD500] fill-[#FFD500]" /> Tu racha activa
              </h3>
              <p className="text-[12px] text-gray-500 font-bold uppercase tracking-wider">Desbloquea beneficios</p>
            </div>
            {/* Etiqueta de días calificados */}
            <div className="bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm flex items-center gap-1">
              <span className="text-xl font-black text-[#00B5E2] leading-none">{diasCalificados}</span>
              <span className="text-gray-400 font-black text-sm">/ 2 <span className="text-[10px] uppercase">días</span></span>
            </div>
          </div>

          {/* Barra de Progreso Plana */}
          <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-5">
            <div
              className="absolute top-0 left-0 h-full bg-[#00B5E2] rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progreso}%` }}
            ></div>
          </div>

          {/* Explicación Dinámica de la Regla de Negocio[cite: 15] */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <p className="text-[13px] text-[#031549]/80 font-bold leading-relaxed">
              {diasCalificados < 2 ? (
                <>
                  Evalúa tus viajes en <span className="text-[#00B5E2] font-black text-[15px]">1 día más</span> dentro de la próxima semana para activar tus VialTickets y entrar a los sorteos.
                </>
              ) : (
                <>
                  <span className="font-black text-[#00B5E2] text-[15px]">¡Objetivo alcanzado!</span> Has calificado en 2 días distintos. Tus VialTickets están activos para el próximo sorteo.
                </>
              )}
            </p>
          </div>
        </div>

        {/* BANNER DE FIDELIZACIÓN (Estilo Corporativo Azul Marino) */}
        <div className="bg-[#031549] rounded-3xl p-6 relative overflow-hidden shadow-xl mt-4">
          <div className="absolute -right-4 -top-4 opacity-10">
            <Ticket className="w-32 h-32 text-white" />
          </div>
          
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 border border-white/20 mb-4">
              <Ticket className="w-6 h-6 text-[#00B5E2]" />
            </div>
            <h4 className="text-[18px] font-black text-white leading-tight mb-2 drop-shadow-sm">
              Beneficios Exclusivos
            </h4>
            <p className="text-[13px] text-blue-100/80 font-medium leading-relaxed pr-4">
              Mantén tu racha para obtener cupones de descuento y servicios técnicos en aliados locales como <span className="font-black text-[#FFD500]">Punto Digital</span>.
            </p>
          </div>
        </div>

      </div>

      {/* 4. BOTÓN DE RETORNO FIJO (Bloque Sólido) */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 p-4 z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] flex justify-center">
        <div className="w-full max-w-xl">
          <button
            onClick={() => navigate('/')}
            className="w-full bg-[#031549] hover:bg-black text-white text-[16px] font-black py-5 shadow-xl transition-all active:scale-95 flex justify-center items-center gap-2"
          >
            <Home className="w-5 h-5" strokeWidth={2.5} />
            Volver al inicio
          </button>
        </div>
      </div>

    </div>
  );
}
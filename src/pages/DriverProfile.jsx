import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { obtenerPerfilConductor } from '../services/api';
import { ChevronLeft, ChevronRight, Star, ShieldCheck, Route, CheckCircle } from 'lucide-react';

export default function DriverProfile() {
  const navigate = useNavigate();
  const { codigoQR } = useParams();
  
  const [conductor, setConductor] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarDatos() {
      const resultado = await obtenerPerfilConductor(codigoQR);
      if (resultado.exito && resultado.datos) {
        setConductor(resultado.datos);
        
        // 🔥 SOLUCIÓN: Guardamos el QR en la memoria del navegador para que el Home lo encuentre
        localStorage.setItem('ultimo_qr_evaluado', codigoQR);
        
      } else {
        alert("No se encontró información para este código QR.");
        navigate('/'); 
      }
      setCargando(false);
    }
    cargarDatos();
  }, [codigoQR, navigate]);

  // ==========================================
  // PANTALLA DE CARGA 
  // ==========================================
  if (cargando) {
    return (
      <div className="min-h-screen bg-[#00B5E2] flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          <div className="text-white font-black uppercase tracking-widest text-sm">Cargando perfil...</div>
        </div>
      </div>
    );
  }

  // ==========================================
  // EXTRACCIÓN DE DATOS 
  // ==========================================
  const nombreMostrar = conductor?.nombre_abreviado || conductor?.nombre_publico || 'Conductor';
  const unidadMostrar = conductor?.numero_padron || conductor?.numero_unidad || '--';
  const totalViajes = conductor?.total_viajes || conductor?.total_calificaciones || 0;
  const promedio = conductor?.promedio_estrellas || conductor?.promedio || 0;
  const paradero = conductor?.paradero || 'General';
  const nivelSello = conductor?.nivel_sello || 'Registrado';
  
  const iniciales = nombreMostrar.substring(0, 2).toUpperCase();

  // ==========================================
  // PANTALLA PRINCIPAL
  // ==========================================
  return (
    <div className="min-h-screen w-full bg-[#00B5E2] flex flex-col font-sans">
      
      {/* 1. HEADER */}
      <header className="bg-white flex items-center justify-between px-6 h-[80px] sticky top-0 z-50 shadow-sm">
        <button 
          onClick={() => navigate('/')} 
          className="p-2 -ml-2 text-[#031549] hover:opacity-70 transition-opacity"
        >
          <ChevronLeft strokeWidth={3} className="w-7 h-7" />
        </button>
        
        <div className="flex items-center gap-2">
          <img 
            src="/logo_vialcentiva.png" 
            alt="VialCentiva" 
            className="h-8 w-auto object-contain"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="flex items-center tracking-tighter text-xl">
            <span className="font-black text-[#031549]">VialCentiva</span>
          </div>
        </div>
        
        <div className="w-7 h-7"></div> 
      </header>

      {/* 2. ZONA HERO DEL CONDUCTOR */}
      <section className="flex flex-col items-center pt-10 pb-8 px-6 text-center z-10">
        
        <div className="relative mb-6">
          <div className="w-40 h-40 bg-white rounded-full p-2 shadow-2xl relative z-10">
            <div className="w-full h-full bg-[#F4F5F7] rounded-full overflow-hidden flex items-center justify-center border border-gray-100">
              
              {conductor?.foto_url ? (
                <img 
                  src={conductor.foto_url} 
                  alt="Perfil" 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <span className="text-6xl font-black text-[#031549] tracking-tighter">
                  {iniciales}
                </span>
              )}

            </div>
          </div>
          
          <div className="absolute bottom-1 right-2 bg-[#00B5E2] border-4 border-[#00B5E2] rounded-full shadow-lg z-20 flex items-center justify-center">
            <CheckCircle className="w-7 h-7 text-white fill-[#031549]" strokeWidth={1.5} />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-[#031549] leading-none tracking-tight mb-4">
          {nombreMostrar}
        </h1>

        <div className="inline-block bg-[#FFD500] px-5 py-2 mb-4 shadow-sm">
          <p className="text-[#031549] text-sm md:text-base font-black tracking-widest uppercase">
            UNIDAD • {unidadMostrar}
          </p>
        </div>

        <p className="text-[#031549]/80 font-black text-lg flex items-center gap-2">
          <Route className="w-5 h-5 text-[#031549]" /> Paradero {paradero}
        </p>

      </section>

      {/* 3. ZONA INFERIOR BLANCA */}
      <section className="bg-white w-full rounded-t-[2.5rem] px-6 pt-10 pb-8 flex flex-col flex-grow shadow-[0_-10px_40px_rgba(3,21,73,0.15)] relative z-20">
        
        {/* Grilla de Estadísticas */}
        <div className="grid grid-cols-3 gap-2 mb-8 divide-x divide-gray-100 bg-[#F4F5F7] rounded-3xl py-4 border border-gray-100">
          
          <div className="flex flex-col items-center justify-center">
            <p className="text-slate-400 text-[10px] uppercase tracking-widest font-black mb-1">Rating</p>
            <div className="flex items-center gap-1">
              <span className="text-3xl font-black text-[#031549]">
                {Number(totalViajes) < 3 ? '-' : promedio}
              </span>
              <Star className="w-5 h-5 text-[#FFD500] fill-[#FFD500] -mt-1" />
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center">
            <p className="text-slate-400 text-[10px] uppercase tracking-widest font-black mb-1">Nivel</p>
            <div className="flex items-center gap-1 text-[#00B5E2]">
              <ShieldCheck className="w-5 h-5" strokeWidth={3} />
              <span className="text-xl font-black uppercase text-[#031549] tracking-tight">{nivelSello}</span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <p className="text-slate-400 text-[10px] uppercase tracking-widest font-black mb-1">Viajes</p>
            <p className="text-3xl font-black text-[#031549]">{totalViajes}</p>
          </div>

        </div>

        {/* Mensaje de Contexto */}
        <div className="mb-auto">
          {Number(totalViajes) < 3 ? (
            <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100">
              <p className="text-[#031549] text-sm font-bold leading-relaxed text-center">
                Esta unidad ha sido validada. Su calificación pública aparecerá tras recibir 3 evaluaciones. ¡Ayuda a la comunidad calificando!
              </p>
            </div>
          ) : (
            <p className="text-slate-500 text-center text-sm font-bold leading-relaxed px-4">
              Conductor consolidado. Su nivel refleja el compromiso con la seguridad vial reportado por la comunidad de pasajeros.
            </p>
          )}
        </div>

        {/* Botón */}
        <button 
          onClick={() => navigate(`/calificar/${codigoQR}`)}
          className="bg-[#031549] text-white w-full py-5 mt-8 font-black text-xl hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-xl"
        >
          ¡Calificar viaje! <ChevronRight className="w-6 h-6" strokeWidth={3} />
        </button>

        <div className="text-center mt-6">
          <button 
            onClick={() => navigate('/privacy')}
            className="text-slate-400 hover:text-[#031549] text-[11px] font-black uppercase tracking-widest transition-colors underline underline-offset-4"
          >
            Políticas de Privacidad
          </button>
        </div>

      </section>

    </div>
  );
}
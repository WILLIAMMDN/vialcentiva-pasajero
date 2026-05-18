import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { obtenerPerfilConductor } from '../services/api';

export default function DriverProfile() {
  const navigate = useNavigate();
  const { codigoQR } = useParams();
  
  const [conductor, setConductor] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarDatos() {
      const resultado = await obtenerPerfilConductor(codigoQR);
      if (resultado.exito) {
        setConductor(resultado.datos);
      } else {
        alert("No se encontró información para este código QR.");
        navigate('/'); 
      }
      setCargando(false);
    }
    cargarDatos();
  }, [codigoQR, navigate]);

  if (cargando) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-slate-900 border-t-emerald-400 rounded-full animate-spin"></div>
          <div className="text-slate-500 font-bold uppercase tracking-widest text-xs">Sincronizando</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center sm:p-6 font-sans">
      
      {/* CONTENEDOR PRINCIPAL: Estilo Premium Card */}
      <div className="w-full max-w-sm bg-white sm:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col min-h-[100dvh] sm:min-h-0 relative">

        {/* CABECERA ASIMÉTRICA OSCURA (Contraste y Autoridad) */}
        <div className="bg-slate-900 rounded-br-[4rem] pt-8 pb-10 px-8 text-white relative z-20 shadow-lg">
          
          {/* Navegación Superior */}
          {/* REMPLAZAR EXCLUSIVAMENTE ESTE BLOQUE: Navegación Superior Coherente */}
<div className="flex justify-between items-center mb-8">
  <button 
    onClick={() => navigate('/')} 
    className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors shrink-0"
  >
    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path>
    </svg>
  </button>
  
  {/* BRANDING INTEGRADO: Sin cajas compitiendo con el avatar del conductor */}
  <div className="flex items-center gap-2">
    {/* Isotipo vectorial de la mototaxi oficial */}
    <div className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-md shrink-0">
      {/* Tu logo real en caja blanca pequeña tipo ícono de app */}
<div className="bg-white h-12 w-12 rounded-xl p-1 flex items-center justify-center shadow-md shrink-0 border border-slate-100">
  <img 
    src="/logo_vialcentiva.png" 
    alt="VialCentiva" 
    className="max-h-full max-w-full object-contain" 
  />
</div>
    </div>
    {/* Texto de marca integrado en alta definición */}
    <div className="flex items-center tracking-tight text-lg">
      <span className="font-black text-white">Vial</span>
      <span className="font-black text-emerald-400">Centiva</span>
    </div>
  </div>
  
  {/* Elemento fantasma para el centrado exacto */}
  <div className="w-10 h-10 invisible shrink-0"></div>
</div>

          {/* Info del Conductor y Avatar */}
          <div className="flex items-center gap-6">
            
            {/* Avatar Premium con Check de Verificación */}
            <div className="relative">
              <div className="w-24 h-24 bg-white rounded-[1.5rem] p-1 shadow-xl">
                <div className="w-full h-full bg-slate-100 rounded-[1.2rem] overflow-hidden flex items-center justify-center">
                  {conductor.foto_url ? (
                    <img 
                      src={conductor.foto_url} 
                      alt={`Foto de ${conductor.nombre_publico}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl font-black text-slate-900 tracking-tighter">
                      {conductor.nombre_publico.substring(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
              {/* Badge Flotante de Escudo/Check */}
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-full p-1.5 border-4 border-slate-900 shadow-sm">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
            </div>
            
            {/* Textos del Perfil */}
            <div className="flex-1">
              <h1 className="text-2xl font-black leading-tight mb-2">
                {conductor.nombre_publico}
              </h1>
              <div className="inline-block bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/5">
                <p className="text-emerald-300 text-[10px] font-black tracking-widest uppercase">
                  Unidad • {conductor.numero_unidad}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* GRILLA DE ESTADÍSTICAS (Estructura Limpia) */}
        <div className="flex justify-between items-center px-8 py-7 bg-white relative z-10 border-b border-slate-100">
          
          {/* Viajes */}
          <div className="flex flex-col items-center flex-1">
            <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold mb-1.5">Viajes</p>
            <p className="text-2xl font-black text-slate-800">{conductor.total_calificaciones}</p>
          </div>
          
          <div className="w-px h-10 bg-slate-100"></div>
          
          {/* Nivel */}
          <div className="flex flex-col items-center flex-1">
            <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold mb-1.5">Nivel</p>
            <p className="text-lg font-black text-emerald-500 uppercase tracking-wide">{conductor.nivel_sello}</p>
          </div>
          
          <div className="w-px h-10 bg-slate-100"></div>
          
          {/* Rating */}
          <div className="flex flex-col items-center flex-1">
            <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold mb-1.5">Rating</p>
            <div className="flex justify-center items-center gap-1">
              <span className="text-2xl font-black text-slate-800">
                {Number(conductor.total_calificaciones) < 3 ? '-' : conductor.promedio}
              </span>
              <span className="text-amber-400 text-lg mb-0.5">★</span>
            </div>
          </div>
        </div>

        {/* SECCIÓN INFORMACIÓN / ARRANQUE EN FRÍO */}
        <div className="px-8 py-8 flex-grow bg-slate-50/50">
          <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">
            Resumen del Conductor
          </h2>
          
          {Number(conductor.total_calificaciones) < 3 ? (
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                <span className="font-bold text-emerald-700 text-sm uppercase tracking-wide">Identidad Validada</span>
              </div>
              <p className="text-slate-600 text-[13px] leading-relaxed font-medium">
                Unidad registrada en el <b>Paradero {conductor.paradero}</b>. Su reputación se hará pública al alcanzar 3 evaluaciones. ¡Sé uno de los primeros en calificar!
              </p>
            </div>
          ) : (
            <p className="text-slate-600 text-[14px] leading-relaxed font-medium">
              Conductor consolidado del <b>Paradero {conductor.paradero}</b>. Su nivel actual refleja el compromiso con la seguridad vial y el trato al pasajero reportado por la comunidad ciudadana.
            </p>
          )}
        </div>
            <div className="text-center pt-6">
            <button 
              onClick={() => navigate('/privacy')}
              className="text-slate-400 hover:text-slate-600 text-[11px] font-black uppercase tracking-wider transition-colors"
            >
              Políticas de Privacidad
            </button>
            </div>
        {/* BOTÓN INFERIOR ANCLADO (Asimétrico Oscuro con microinteracción) */}
        <div 
          onClick={() => navigate(`/calificar/${codigoQR}`)}
          className="bg-slate-900 rounded-tl-[3.5rem] pl-10 pr-6 py-6 flex justify-between items-center cursor-pointer hover:bg-slate-800 transition-colors mt-auto group shadow-[0_-10px_20px_rgba(0,0,0,0.05)]"
        >
          <span className="text-white text-lg font-black tracking-wide group-hover:translate-x-1 transition-transform">
            Calificar viaje
          </span>
          <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
}
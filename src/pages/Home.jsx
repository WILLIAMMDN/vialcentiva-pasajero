import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, ShieldCheck, MapPin, QrCode, Smartphone, Database, Lock, ChevronRight, Award } from 'lucide-react';
export default function Home() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  // Efecto visual para transiciones de entrada fluidas al cargar la página
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-200 pb-20 relative overflow-hidden">

      {/* 1. CABECERA CORPORATIVA YANGO-STYLE */}
      <header className="bg-[#0D1F4D] text-white flex items-center justify-between px-5 h-[72px] sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-3.5">
          <div className="bg-white p-1.5 rounded-lg h-10 w-10 flex items-center justify-center shadow-sm">
            <img src="/logo_vialcentiva.png" alt="VialCentiva" className="max-h-full max-w-full object-contain" />
          </div>
          <span className="font-black text-2xl italic tracking-tighter">VIALCENTIVA</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/privacy')} 
            className="bg-white/10 hover:bg-white text-white hover:text-[#0D1F4D] text-[13px] font-bold px-5 py-2.5 rounded-full hidden sm:block transition-all duration-300 border border-white/20 hover:border-white"
          >
            Términos legales
          </button>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </header>

      {/* 2. BREADCRUMB CLÁSICO */}
      <div className="px-6 py-3.5 text-[12px] uppercase tracking-widest font-black text-slate-400 bg-white border-b border-slate-200 flex items-center gap-2 shadow-sm relative z-40">
        <span className="hover:text-[#0D1F4D] cursor-pointer transition-colors">Inicio</span> 
        <ChevronRight className="w-3.5 h-3.5" /> 
        <span className="text-[#0D1F4D]">Plataforma Pasajero</span>
      </div>

      {/* 3. HERO IMAGE CON OVERLAY Y ANIMACIÓN */}
      <div className="w-full h-[50vh] min-h-[400px] relative bg-slate-900 overflow-hidden">
        <img
          src="/vial_centiva_pasajero.jpg"
          alt="Transporte VialCentiva"
          className={`w-full h-full object-cover transition-all duration-1000 ease-out ${mounted ? 'scale-100 opacity-90' : 'scale-105 opacity-0'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
      </div>

      {/* 4. TARJETA CTA SUPERPUESTA (Animada y Refinada) */}
      <div className={`px-5 -mt-24 relative z-10 max-w-4xl mx-auto transform transition-all duration-1000 delay-150 ease-out ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        <div className="bg-emerald-500 rounded-[2rem] p-8 md:p-12 text-center text-slate-950 shadow-[0_20px_50px_rgba(16,185,129,0.3)] border border-emerald-400 relative overflow-hidden">
          {/* Textura de fondo sutil para dar aspecto premium */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-400 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
          
          <div className="relative z-10">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 leading-[1.05]">
              Tu evaluación ha sido <br className="hidden md:block"/> criptográficamente asegurada.
            </h1>
            <p className="text-sm md:text-lg font-bold opacity-90 mb-8 max-w-2xl mx-auto">
              Has dado el primer paso para transformar la seguridad urbana en Apurímac.
            </p>
            <div className="inline-flex items-center justify-center gap-2.5 bg-[#0D1F4D] text-white px-8 py-4 rounded-full font-bold text-sm shadow-xl cursor-default hover:bg-slate-900 transition-colors">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Validación en la Nube Activa
            </div>
          </div>
        </div>
      </div>

      {/* 5. SECCIÓN: INFORMACIÓN Y CÓMO FUNCIONA */}
      <main className={`px-6 pt-20 pb-16 max-w-4xl mx-auto transform transition-all duration-1000 delay-300 ease-out ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        
        <div className="text-center mb-16">
          <h2 className="text-[2rem] md:text-[2.75rem] font-black tracking-tighter text-[#0D1F4D] mb-6 leading-tight">
            No es una app. <br className="hidden md:block"/> Es tu seguridad.
          </h2>
          <p className="text-slate-600 font-medium leading-relaxed text-base md:text-lg max-w-3xl mx-auto">
            VialCentiva es un proyecto tecnológico diseñado para que el pasajero no tenga que descargar ninguna aplicación pesada. Tu cámara y un código QR único son suficientes para verificar el servicio en menos de 20 segundos.
          </p>
        </div>

        {/* Grilla de 3 Pasos Clásica */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-blue-50 text-[#0D1F4D] rounded-2xl flex items-center justify-center mb-6">
              <QrCode className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">1. Escaneo Directo</h3>
            <p className="text-slate-600 text-sm font-medium leading-relaxed">
              El QR actúa como llave. Al leerlo desde la mototaxi, la plataforma extrae de inmediato el perfil público y la reputación histórica del conductor.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
              <Smartphone className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">2. Auditoría Rápida</h3>
            <p className="text-slate-600 text-sm font-medium leading-relaxed">
              Evalúas 5 dimensiones críticas (velocidad, uso de celular, respeto al paradero, trato y limpieza) en un formulario optimizado para pantallas móviles.
            </p>
          </div>

          <div className="bg-[#0D1F4D] p-8 rounded-3xl shadow-xl text-white relative overflow-hidden">
            <div className="absolute -right-4 -top-4 opacity-10">
              <MapPin className="w-32 h-32" />
            </div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/10 text-emerald-400 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black mb-3 tracking-tight">3. Regla de 2 Días</h3>
              <p className="text-slate-300 text-sm font-medium leading-relaxed">
                Premiamos la constancia. Al calificar en 2 días distintos, obtienes VialTickets canjeables por sorteos semanales; déjanos tu número.
              </p>
            </div>
          </div>
        </div>

        {/* SECCIÓN DE SEGURIDAD (Tecnicismo profesional) */}
        <div className="bg-slate-100 rounded-[2.5rem] p-8 md:p-12 border border-slate-200 flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-200 text-slate-700 font-black text-[10px] uppercase tracking-widest rounded-md">
              <Database className="w-3.5 h-3.5" /> Tu información está protegida
            </div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 leading-tight">
              Tus datos blindados por <br className="hidden lg:block"/> políticas RLS.
            </h2>
            <p className="text-slate-600 font-medium text-sm md:text-base leading-relaxed">
              La plataforma opera sobre protocolos de seguridad. Implementamos total segurida para evitar fraudes y garantizar la integridad de tu evaluación. Tus datos personales y de viaje están encriptados y solo se utilizan para mejorar la seguridad vial.
            </p>
          </div>
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="w-32 h-32 bg-white rounded-full shadow-2xl flex items-center justify-center border-8 border-slate-50 relative">
              <div className="absolute inset-0 border-4 border-emerald-500 rounded-full animate-[spin_10s_linear_infinite] border-t-transparent border-l-transparent"></div>
              <Lock className="w-12 h-12 text-[#0D1F4D]" />
            </div>
          </div>
        </div>
      </main>

      {/* 6. FOOTER CLÁSICO */}
      <footer className="bg-white border-t border-slate-200 py-12 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3 grayscale opacity-80">
            <img src="/logo_vialcentiva.png" alt="VialCentiva" className="w-8 h-8 object-contain" />
            <span className="font-black text-slate-900 text-lg tracking-tight">VialCentiva</span>
          </div>
          <div className="text-center md:text-right">
            <p className="text-slate-600 font-bold text-sm">Proyecto de Ingeniería de Sistemas y Seguridad</p>
            <p className="text-slate-400 font-medium text-xs mt-1">© {new Date().getFullYear()} Reto de Innovación. Apurímac, Perú.</p>
          </div>
        </div>
      </footer>

      {/* 7. BOTÓN FLOTANTE INFERIOR DERECHO */}
      <button 
        onClick={() => navigate('/privacy')}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-[#0D1F4D] text-white rounded-full flex items-center justify-center shadow-[0_10px_25px_rgba(13,31,77,0.4)] hover:scale-110 hover:bg-slate-900 transition-all duration-300 z-50 group ${mounted ? 'scale-100' : 'scale-0'}`}
        aria-label="Términos y Privacidad"
      >
        <ShieldCheck className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>

    </div>
  );
}
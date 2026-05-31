import { Store, Wrench, Database, Lock, CheckCircle2 } from 'lucide-react';

export function BeneficiosSection({ mounted, listaBeneficios }) {
  return (
    <section className={`transform transition-all duration-700 delay-400 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} pt-8`}>
      
      {/* CABECERA CENTRADA ESTILO REFERENCIA */}
      <div className="text-center mb-10 md:mb-12">
        <h2 className="text-3xl md:text-4xl font-black text-[#031549] leading-tight tracking-tight mb-3">
          Conoce nuestros <br className="hidden md:block"/>
          módulos de beneficios
        </h2>
        <p className="text-[#031549]/80 font-bold text-sm md:text-base max-w-md mx-auto">
          Una plataforma, múltiples alianzas para premiar tu responsabilidad vial.
        </p>
      </div>

      {/* GRID DE TARJETAS LIMPIAS (B2B SaaS Style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 px-2 md:px-0">
        {listaBeneficios.length > 0 ? (
          listaBeneficios.map((beneficio) => (
            <div 
              key={beneficio.id} 
              className="bg-white rounded-[1.5rem] p-6 md:p-8 shadow-[0_10px_40px_-10px_rgba(3,21,73,0.1)] border border-slate-100 flex flex-col items-start hover:-translate-y-1 transition-transform duration-300"
            >
              {/* Icono con estilo neobrutalista sutil (Borde oscuro + Sombra amarilla) */}
              <div className="w-14 h-14 rounded-full border-2 border-[#031549] bg-white flex items-center justify-center shadow-[3px_3px_0px_#FFD500] mb-6 shrink-0">
                {beneficio.tipo_negocio === 'Limpieza' ? <Store className="w-6 h-6 text-[#031549]" /> : <Wrench className="w-6 h-6 text-[#031549]" />}
              </div>
              
              <div className="w-full">
                <div className="flex justify-between items-start mb-3 gap-2">
                  <h3 className="text-lg md:text-xl font-black text-[#031549] leading-tight">
                    {beneficio.nombre_negocio}
                  </h3>
                  <span className="bg-[#FFD500] text-[#031549] px-2.5 py-1 rounded-md text-[10px] font-black whitespace-nowrap border border-[#D4B200]/30 shrink-0">
                    {beneficio.costo_puntos} PTS
                  </span>
                </div>
                
                <p className="text-[#031549]/70 text-sm font-medium leading-relaxed mb-4">
                  {beneficio.descripcion}
                </p>

                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#031549]/50 pt-4 border-t border-slate-100">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{beneficio.tipo_negocio} • Nivel {beneficio.nivel_requerido}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-white p-10 rounded-[1.5rem] border border-slate-200 text-center shadow-sm">
            <Store className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-[#031549]/60 font-bold text-sm">Red de beneficios en desarrollo y validación.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export function SeguridadSection({ mounted }) {
  return (
    <section className={`transform transition-all duration-700 delay-500 ease-out ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} w-full relative mt-20 md:mt-28`}>
      
      {/* CORTE EN PARÁBOLA SUPERIOR */}
      <div className="w-full -mb-1 relative z-10">
        <svg viewBox="0 0 1440 120" className="w-full h-[40px] md:h-[70px] block" preserveAspectRatio="none">
          <path fill="#00B5E2" d="M0,60 C480,180 960,-60 1440,60 L1440,120 L0,120 Z"></path>
        </svg>
      </div>

      {/* BLOQUE CENTRAL CIAN */}
      <div className="bg-[#00B5E2] w-full px-6 py-10 md:py-16 relative z-20">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
          
          <div className="flex-1 space-y-5 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#031549] text-white font-black text-[10px] uppercase tracking-widest rounded-md">
              <Database className="w-3.5 h-3.5 text-[#FFD500]" /> Arquitectura Segura
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#031549] leading-tight">
              Datos protegidos y <br className="hidden md:block"/> métricas transparentes.
            </h2>
            <p className="text-[#031549]/80 font-bold text-sm md:text-base leading-relaxed max-w-lg mx-auto md:mx-0">
              La plataforma procesa las evaluaciones matemáticamente para garantizar un historial inmutable. Nuestro objetivo es visibilizar las buenas prácticas del transporte público local.
            </p>
          </div>
          
          <div className="w-28 h-28 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center border-8 border-[#009AC0] shrink-0 shadow-xl">
            <Lock className="w-12 h-12 md:w-14 md:h-14 text-[#031549]" />
          </div>

        </div>
      </div>

      {/* CORTE EN PARÁBOLA INFERIOR (Invertido) */}
      <div className="w-full -mt-1 relative z-10">
        <svg viewBox="0 0 1440 120" className="w-full h-[40px] md:h-[70px] block rotate-180" preserveAspectRatio="none">
          <path fill="#00B5E2" d="M0,60 C480,180 960,-60 1440,60 L1440,120 L0,120 Z"></path>
        </svg>
      </div>

    </section>
  );
}

export function Footer() {
  return (
    <footer className="text-center px-6 pt-10 pb-12 relative z-0">
      <div className="flex items-center justify-center gap-2 mb-4 grayscale opacity-60">
        <img src="/logo_vialcentiva.png" alt="Logo VialCentiva" className="w-6 h-6 object-contain" />
        <span className="font-black text-[#031549] text-sm uppercase tracking-wider">VialCentiva</span>
      </div>
      <p className="text-[#031549] text-[11px] font-black uppercase tracking-widest mb-1">
        Innovation Challenge {new Date().getFullYear()}
      </p>
      <p className="text-[#031549]/60 text-[10px] font-bold uppercase tracking-wider">
        Ingeniería de Sistemas • Apurímac
      </p>
    </footer>
  );
}
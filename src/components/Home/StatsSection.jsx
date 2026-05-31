import { Eye, ShieldCheck, Users } from 'lucide-react';

export function StatsSection({ mounted, stats }) {
  return (
    <section className={`w-full max-w-xl mx-auto transform transition-all duration-700 delay-200 ease-out ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
      
      {/* TÍTULO CON ESTILO CORPORATIVO */}
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-black text-[#031549] leading-tight tracking-tight">
          Impacto en <br className="hidden md:block"/>
          <span className="inline-block bg-[#FFD500] px-2 py-0.5 mt-1">Tiempo Real</span>
        </h2>
      </div>

      {/* ESTRUCTURA TIPO TIMELINE (Basada en la referencia visual) */}
      <div className="relative flex flex-col gap-8 pl-2 md:pl-4">
        {/* Línea vertical conectora cian */}
        <div className="absolute left-[27px] md:left-[35px] top-4 bottom-4 w-1 bg-[#00B5E2] z-0"></div>

        <StatItem 
          icon={<Eye className="w-6 h-6 md:w-7 md:h-7 text-white" />} 
          label="Visitas en la plataforma" 
          value={stats.visitasTotales.toLocaleString()} 
        />
        <StatItem 
          icon={<ShieldCheck className="w-6 h-6 md:w-7 md:h-7 text-white" />} 
          label="Viajes auditados" 
          value={stats.viajesCalificados.toLocaleString()} 
        />
        <StatItem 
          icon={<Users className="w-6 h-6 md:w-7 md:h-7 text-white" />} 
          label="Conductores activos" 
          value={stats.conductoresActivos} 
        />
      </div>
    </section>
  );
}

// Subcomponente estructurado para la línea de tiempo
function StatItem({ icon, label, value }) {
  return (
    <div className="relative z-10 flex items-center gap-6 md:gap-8">
      {/* Círculo sólido cian con borde grueso para cortar la línea de fondo */}
      <div className="w-14 h-14 md:w-16 md:h-16 bg-[#00B5E2] rounded-full flex items-center justify-center shrink-0 border-[6px] border-[#F4F5F7]">
        {icon}
      </div>
      <div className="pt-1">
        <span className="text-4xl md:text-5xl font-black text-[#031549] block leading-none tracking-tighter">
          {value}
        </span>
        <span className="text-sm md:text-base font-bold text-[#031549]/70 mt-1 block">
          {label}
        </span>
      </div>
    </div>
  );
}
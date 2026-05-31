import { Users, BookOpen, Building2 } from 'lucide-react';

export function AboutSection({ mounted }) {
  return (
    <section className={`transform transition-all duration-700 delay-600 ease-out ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} px-6 py-16 bg-white`}>
      
      {/* Título de Sección */}
      <div className="max-w-4xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-black text-[#031549] tracking-tight mb-4">
        ¿Quiénes<span className="text-[#00B5E2]"> Somos?</span>
        </h2>
        <p className="text-[#031549]/70 font-bold max-w-2xl">
          VialCentiva nace de la necesidad de mejorar el transporte y el tránsito en el Perú para lograr una cultura de cumplimiento y respeto a las normas.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Espacio para Foto Grupal */}
        <div className="bg-slate-100 rounded-[2rem] aspect-[4/3] flex items-center justify-center border-2 border-dashed border-slate-300 overflow-hidden">
        <img 
            src="/equipo.png" 
            alt="Foto del equipo de trabajo" 
            className="w-full h-full object-cover"
        />
        </div>

        {/* Descripción e Info Institucional */}
        <div className="space-y-6">
          <InfoCard 
            icon={<img 
                    src="unajma.png" 
                    alt="AAP" 
                    className="w-10 h-10 object-contain rounded-lg" 
                />} 
            title="UNIVERSIDAD NACIONAL JOSÉ MARÍA ARGUEDAS" 
            text="Desarrolladores de la Universidad Nacional José María Arguedas (UNAJMA)." 
          />
          <InfoCard 
            icon={<img 
                    src="app.png" 
                    alt="AAP" 
                    className="w-10 h-10 object-contain rounded-lg" 
                />} 
            title="AAP" 
            text="Colaboración activa con asociaciones de mototaxistas y entidades locales comprometidas con la seguridad vial." 
          />
        </div>
      </div>
    </section>
  );
}

function InfoCard({ icon, title, text }) {
  return (
    <div className="flex gap-4">
      <div className="w-12 h-12 bg-[#FFD500] rounded-xl flex items-center justify-center shrink-0 shadow-[3px_3px_0px_#031549]">
        {icon}
      </div>
      <div>
        <h3 className="font-black text-[#031549] text-lg">{title}</h3>
        <p className="text-[#031549]/70 font-medium text-sm leading-relaxed mt-1">{text}</p>
      </div>
    </div>
  );
}
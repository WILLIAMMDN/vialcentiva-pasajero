import { Menu, ChevronRight, CheckCircle2 } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white flex items-center justify-between px-6 h-[80px] sticky top-0 z-50">
      {/* LOGO Y MARCA EN AZUL MARINO OSCURO */}
      <div className="flex items-center gap-3">
        <img
          src="/logo_vialcentiva.png"
          alt="Logo VialCentiva"
          className="h-8 w-auto object-contain"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <span className="font-black text-2xl tracking-tighter text-[#031549]">
          VialCentiva
        </span>
      </div>
      
      {/* MENÚ HAMBURGUESA CLÁSICO SIN CAJAS */}
      <button className="p-2 focus:outline-none hover:opacity-70 transition-opacity">
        <Menu className="w-8 h-8 text-[#031549]" strokeWidth={2.5} />
      </button>
    </header>
  );
}

export function Hero({ mounted, ultimoQR, navigate }) {
  return (
    <section className="w-full bg-[#00B5E2] relative flex flex-col justify-between min-h-[90vh]">
      
      {/* BLOQUE DE TEXTO SUPERIOR */}
      <div className={`px-6 pt-12 pb-10 md:pt-16 max-w-xl mx-auto w-full z-10 transform transition-all duration-700 ease-out ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        
        {/* ETIQUETA BLANCA */}
        <div className="flex items-center gap-2 mb-8 text-white">
          <CheckCircle2 className="w-8 h-8" strokeWidth={3} />
          <span className="font-black text-2xl tracking-tight">REGISTRADO</span>
        </div>

        {/* TITULAR CON RESALTADO AMARILLO */}
        <div className="mb-6 space-y-1">
          <h1 className="text-[2.5rem] md:text-5xl font-black text-[#031549] leading-tight tracking-tight">
            Viaje calificado,
          </h1>
          <div className="inline-block bg-[#FFD500] px-2 py-0.5">
            <h1 className="text-[2.5rem] md:text-5xl font-black text-[#031549] leading-none tracking-tight">
              evaluación exitosa
            </h1>
          </div>
        </div>

        {/* PÁRRAFO DESCRIPTIVO BLANCO */}
        <p className="text-white font-bold text-lg md:text-xl leading-snug max-w-sm mb-8">
          Tu evaluación ha sido registrada de forma segura. Gracias por contribuir a un transporte público de mototaxis más transparente y de calidad.
        </p>

        {/* BOTÓN SÓLIDO AZUL MARINO */}
        <button 
          onClick={() => {
             if(ultimoQR) navigate(`/${ultimoQR}`);
             else navigate('/');
          }}
          className="bg-[#031549] text-white px-8 py-4 font-black text-[17px] hover:bg-black transition-colors flex items-center justify-center gap-2 w-full sm:w-auto shadow-lg"
        >
          ¡Volver al perfil! <ChevronRight className="w-5 h-5" strokeWidth={3} />
        </button>
      </div>

      {/* INTEGRACIÓN DE LA IMAGEN EN LA PARTE INFERIOR CON CORTE PARABÓLICO */}
<div className={`relative w-full h-[45vh] md:h-[55vh] mt-auto z-0 transform transition-all duration-1000 delay-200 ease-out overflow-hidden ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
  {/* Borde superior para integrar la foto con el fondo plano suavemente */}
  <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-[#00B5E2] to-transparent z-10"></div>
  <img
    src="/vial_centiva_pasajero.jpg"
    alt="Transporte VialCentiva"
    
    className="w-full h-full object-cover object-bottom" 
    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1614741319717-353d2627e268?auto=format&fit=crop&w=1200&q=80' }}
  />
  
  {/* NUEVO: Curva Parabólica (SVG) para transición profesional */}
  {/* CAMBIO 2: Reduje la altura del contenedor del SVG a h-[80px] y h-[120px] */}
  <div className="absolute bottom-0 left-0 w-full h-[80px] md:h-[120px] z-20">
    <svg 
      viewBox="0 0 1440 320" 
      className="absolute bottom-0 w-full h-full translate-y-[1px]" 
      preserveAspectRatio="none"
    >
      <path 
        fill="#F4F5F7" 
        fillOpacity="1" 
      
        d="M0,200 C360,320 1080,320 1440,200 L1440,320 L0,320 Z"

 
      ></path>
    </svg>
  </div>
</div>

      
    </section>
  );
}
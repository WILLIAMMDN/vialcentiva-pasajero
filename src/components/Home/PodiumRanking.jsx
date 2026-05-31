import { MapPin, Star, ShieldCheck, Crown, Medal } from 'lucide-react';

export function PodiumRanking({ mounted, rankingConductores }) {
  const top3 = rankingConductores.slice(0, 3);
  const otros = rankingConductores.slice(3);

  const primero = top3[0] || null;
  const segundo = top3[1] || null;
  const tercero = top3[2] || null;

  return (
    <section className={`transform transition-all duration-700 delay-300 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} bg-white rounded-[2rem] shadow-md overflow-hidden flex flex-col`}>
      
      {/* 1. CABECERA BLANCA CON TIPOGRAFÍA AGRESIVA */}
      <div className="pt-10 px-6 md:px-10 pb-2 bg-white relative z-20">
        <h2 className="text-3xl md:text-4xl font-black text-[#031549] leading-tight tracking-tight mb-2">
          Ranking <br className="hidden md:block"/>
          <span className="inline-block bg-[#FFD500] px-2 py-0.5 mt-1 text-[#031549]">Andahuaylas</span>
        </h2>
        <p className="text-[#031549]/70 font-bold text-sm md:text-base mt-2">
          Los mejores conductores de mototaxis valorados por la gente local.
        </p>
      </div>

      {/* 2. CORTE EN PARÁBOLA / WAVE SVG */}
      <div className="w-full -mb-1 relative z-10 mt-6">
        <svg viewBox="0 0 1440 120" className="w-full h-[40px] md:h-[70px] block" preserveAspectRatio="none">
          <path fill="#00B5E2" d="M0,60 C480,180 960,-60 1440,60 L1440,120 L0,120 Z"></path>
        </svg>
      </div>

      {/* 3. ZONA CIAN (EL PODIO Y LA LISTA) */}
      <div className="bg-[#00B5E2] w-full px-5 md:px-10 pb-12 relative z-20 flex-1">
        
        {rankingConductores.length > 0 ? (
          <>
            {/* EL ATRIO (PODIO) - Visualización estática sin clics */}
            <div className="flex justify-center items-end gap-2 sm:gap-6 mb-14 pt-8">
              {segundo && <PodiumStep conductor={segundo} position={2} />}
              {primero && <PodiumStep conductor={primero} position={1} />}
              {tercero && <PodiumStep conductor={tercero} position={3} />}
            </div>

            {/* LISTA DEL 4TO LUGAR EN ADELANTE (Contenedor Inteligente con Scroll) */}
            {otros.length > 0 && (
              <div className="mt-4">
                <h3 className="text-[11px] font-black uppercase tracking-widest text-[#031549] mb-4 ml-1 opacity-80">
                  Siguientes Posiciones
                </h3>
                {/* Caja con altura máxima y scroll interno para no deformar la página */}
                <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                  {otros.map((conductor, idx) => (
                    <div 
                      key={conductor.id}
                      className="bg-white rounded-xl p-3 flex items-center justify-between shadow-sm transition-colors"
                    >
                      {/* min-w-0 y shrink-0 aseguran que los textos largos no rompan el layout */}
                      <div className="flex items-center gap-4 min-w-0">
                        <span className="text-[#031549] font-black text-xl w-6 text-center shrink-0">{idx + 4}</span>
                        <img src={conductor.foto_url || '/placeholder.jpg'} alt="Avatar" className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0" />
                        <div className="min-w-0 flex-1 pr-2">
                          <h4 className="font-black text-[#031549] text-sm leading-tight truncate">
                            {conductor.nombre_abreviado}
                          </h4>
                          <p className="text-[10px] text-[#031549]/60 uppercase flex items-center gap-1 font-bold mt-0.5 truncate">
                            <MapPin className="w-3 h-3 shrink-0" /> Unidad {conductor.unidades?.[0]?.numero_padron || 'S/N'}
                          </p>
                        </div>
                      </div>
                      
                      {/* Badge de calificación en amarillo sólido */}
                      <div className="bg-[#FFD500] px-3 py-1.5 rounded-lg flex items-center gap-1 shrink-0">
                        <Star className="w-3.5 h-3.5 text-[#031549] fill-[#031549]" />
                        <span className="font-black text-[#031549] text-sm">{conductor.promedio_estrellas}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white/10 p-8 rounded-2xl border border-white/20 text-center mt-6">
            <Medal className="w-12 h-12 text-white/50 mx-auto mb-3" />
            <p className="text-white font-bold text-sm">Aún no hay conductores calificados para el atrio de honor.</p>
          </div>
        )}
      </div>

      {/* Estilo local para una barra de scroll delgada y elegante */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1); 
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(3, 21, 73, 0.3); 
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(3, 21, 73, 0.5); 
        }
      `}} />
    </section>
  );
}

// Subcomponente interno del pilar (Sin interacción ni navegación)
function PodiumStep({ conductor, position }) {
  const isFirst = position === 1;
  const isSecond = position === 2;
  
  // Jerarquía de alturas
  const stepHeight = isFirst ? 'h-40 sm:h-48' : isSecond ? 'h-32 sm:h-40' : 'h-24 sm:h-32';
  
  // Colores corporativos aplicados al podio para contraste máximo
  const stepColor = isFirst 
    ? 'bg-[#FFD500] border-[#D4B200] text-[#031549]' 
    : isSecond 
      ? 'bg-[#031549] border-[#020B26] text-white' 
      : 'bg-white border-slate-200 text-[#031549]';
      
  const avatarSize = isFirst ? 'w-20 h-20 sm:w-24 sm:h-24 -mt-12' : 'w-16 h-16 sm:w-20 sm:h-20 -mt-10';
  
  return (
    <div className="flex flex-col items-center relative w-1/3 max-w-[140px]">
      
      {isFirst && (
        <div className="absolute -top-20 z-20 animate-bounce">
          <Crown className="w-10 h-10 text-[#FFD500] fill-[#FFD500] drop-shadow-md" />
        </div>
      )}
      
      {/* Contenedor visual del avatar (eliminado cursor-pointer y navegaciones) */}
      <div className="flex flex-col items-center z-10 w-full">
        <div className={`${avatarSize} rounded-2xl p-1 bg-white shadow-xl relative`}>
          <img src={conductor.foto_url || '/placeholder.jpg'} alt="Avatar" className="w-full h-full object-cover rounded-xl bg-slate-100" />
          <div className="absolute -bottom-2 -right-2 bg-white rounded-md px-1.5 border border-slate-200 shadow-sm flex items-center">
            <ShieldCheck className={`w-3 h-3 ${isFirst ? 'text-[#031549]' : 'text-slate-400'}`} />
          </div>
        </div>
        
        {/* Nombre y Estrellas con text-truncate para evitar desbordes */}
        <div className="text-center mt-3 mb-3 px-1 w-full min-w-0">
          <h3 className="font-black text-[#031549] text-sm sm:text-base leading-tight truncate w-full mb-1">
            {conductor.nombre_abreviado}
          </h3>
          <div className="flex items-center justify-center gap-1 bg-[#031549] px-2 py-0.5 rounded-full mx-auto w-max shadow-sm shrink-0">
            <Star className="w-2.5 h-2.5 text-[#FFD500] fill-[#FFD500]" />
            <span className="font-bold text-white text-[11px] pt-px">{conductor.promedio_estrellas}</span>
          </div>
        </div>
      </div>

      {/* Estructura Sólida del Pilar */}
      <div className={`w-full ${stepHeight} ${stepColor} rounded-t-xl shadow-lg border-t-4 border-x-2 relative flex flex-col items-center justify-start pt-4`}>
        <span className="font-black text-4xl sm:text-5xl opacity-90 tracking-tighter">{position}</span>
      </div>
    </div>
  );
}
import { useNavigate } from 'react-router-dom';

export default function Privacy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8fafc] flex justify-center font-sans">
      <div className="w-full max-w-md bg-[#f8fafc] sm:my-8 sm:rounded-[2.5rem] sm:shadow-2xl overflow-hidden flex flex-col relative pb-6">
        
        {/* CABECERA MINIMALISTA */}
        <div className="bg-white border-b border-slate-100 px-5 pt-6 pb-4 flex items-center gap-4 sticky top-0 z-20 backdrop-blur-md bg-white/90">
          <button 
            onClick={() => navigate(-1)} 
            className="w-10 h-10 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors shrink-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <div>
            <p className="text-[10px] uppercase tracking-widest font-black text-emerald-500 mb-0.5">VialCentiva Legal</p>
            <h1 className="text-base font-bold text-slate-900 leading-none">Privacidad de Datos</h1>
          </div>
        </div>

        {/* TEXTO DE POLÍTICAS */}
        <div className="px-6 py-6 flex flex-col gap-6 flex-grow overflow-y-auto max-h-[calc(100vh-160px)] sm:max-h-none text-left">
          
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide mb-2">1. Anonimato del Pasajero</h3>
            <p className="text-slate-600 text-[12px] font-medium leading-relaxed">
              Toda evaluación realizada a través de nuestra plataforma es completamente **estricta, confidencial y anónima**. El conductor auditado jamás tendrá acceso a tu número de celular, nombre o identidad del dispositivo.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide mb-2">2. Uso de Datos</h3>
            <p className="text-slate-600 text-[12px] font-medium leading-relaxed">
              Los datos recopilados (velocidad, trato, paradero, limpieza) se procesan matemáticamente con el fin de generar el ranking público de los conductores y optimizar la toma de decisiones dentro de la asociación de transportes.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide mb-2">3. Control Antifraude</h3>
            <p className="text-slate-600 text-[12px] font-medium leading-relaxed">
              Utilizamos un identificador único encriptado de dispositivo (`dispositivo_id`) con el único fin de evitar la manipulación de calificaciones y asegurar que se registre un máximo de una evaluación legítima por viaje.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide mb-2">4. Sorteos y Beneficios</h3>
            <p className="text-slate-600 text-[12px] font-medium leading-relaxed">
              El ingreso opcional de tu número celular se utiliza de manera exclusiva para la asignación y acumulación de VialTickets válidos para sorteos tecnológicos organizados en conjunto con aliados como **Punto Digital**.
            </p>
          </div>

          {/* BOTÓN CERRAR */}
          <button
            onClick={() => navigate(-1)}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white text-[14px] font-black py-4 rounded-xl shadow-md transition-all active:scale-95 text-center mt-4"
          >
            Entendido, regresar
          </button>

        </div>
      </div>
    </div>
  );
}
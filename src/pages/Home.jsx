import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase'; // Asegúrate de que esta ruta sea correcta

// Importamos todas las piezas modulares de la nueva carpeta
import { LoadingScreen, ErrorScreen } from '../components/Home/Loaders';
import { Header, Hero } from '../components/Home/HeroSection';
import { StatsSection } from '../components/Home/StatsSection';
import { PodiumRanking } from '../components/Home/PodiumRanking';
import { BeneficiosSection, SeguridadSection, Footer } from '../components/Home/Complementos';
import { AboutSection } from '../components/Home/AboutSection';

export default function Home() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  
  const [rankingConductores, setRankingConductores] = useState([]);
  const [listaBeneficios, setListaBeneficios] = useState([]);
  const [stats, setStats] = useState({ 
    visitasTotales: 0, viajesCalificados: 0, conductoresActivos: 0 
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const ultimoQR = localStorage.getItem('ultimo_qr_evaluado');

  useEffect(() => {
    setMounted(true);
    const fetchDatosProduccion = async () => {
      try {
        setIsLoading(true);

        // 1. VISITAS REALES
        const { data: statsData } = await supabase.from('estadisticas').select('total_visitas').limit(1).maybeSingle();
        const visitasReales = statsData?.total_visitas || 0;
        supabase.rpc('incrementar_visita').then().catch(() => {});

        // 2. RANKING REAL (Ordenado por estrellas)
        const { data: rankingData, error: rankingErr } = await supabase
          .from('conductores')
          .select('id, codigo_acceso, nombre_abreviado, foto_url, paradero, nivel_sello, promedio_estrellas, total_viajes, unidades(numero_padron)')
          .order('promedio_estrellas', { ascending: false })
          .limit(10);
        if (rankingErr) throw rankingErr;
        setRankingConductores(rankingData || []);

        // 3. BENEFICIOS REALES
        const { data: benData, error: benErr } = await supabase
          .from('beneficios_cupones')
          .select('id, descripcion, costo_puntos, nivel_requerido, aliados(nombre_negocio, tipo_negocio, nivel_alianza)');
        if (benErr) throw benErr;
        
        const beneficiosMapeados = benData ? benData.map(b => ({
            id: b.id, descripcion: b.descripcion, costo_puntos: b.costo_puntos, nivel_requerido: b.nivel_requerido,
            nombre_negocio: b.aliados?.nombre_negocio || 'Aliado VialCentiva', tipo_negocio: b.aliados?.tipo_negocio || 'Servicio', nivel_alianza: b.aliados?.nivel_alianza || 'Aliado'
        })) : [];
        setListaBeneficios(beneficiosMapeados);

        // 4. ESTADÍSTICAS REALES
        const { count: countConductores } = await supabase.from('conductores').select('*', { count: 'exact', head: true });
        const { count: countCalificaciones } = await supabase.from('calificaciones').select('*', { count: 'exact', head: true });

        setStats({ visitasTotales: visitasReales, viajesCalificados: countCalificaciones || 0, conductoresActivos: countConductores || 0 });

      } catch (err) {
        console.error("Error de BD:", err.message);
        setError("Revisa tu conexión a Supabase o permisos RLS.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDatosProduccion();
  }, []);

  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} />;

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-slate-900 font-sans pb-24 overflow-x-hidden">
      <Header />
      <Hero mounted={mounted} ultimoQR={ultimoQR} navigate={navigate} />
      
      <main className="w-full max-w-4xl mx-auto px-5 pt-12 space-y-16">
        <StatsSection mounted={mounted} stats={stats} />
        <PodiumRanking mounted={mounted} rankingConductores={rankingConductores} ultimoQR={ultimoQR} navigate={navigate} />
        <BeneficiosSection mounted={mounted} listaBeneficios={listaBeneficios} />
        <AboutSection mounted={mounted} /> {/* <--- AÑADE ESTO AQUÍ */}
        <SeguridadSection mounted={mounted} />
        
      </main>

      <Footer />
    </div>
  );
}
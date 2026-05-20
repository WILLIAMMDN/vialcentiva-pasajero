import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importación ordenada de las vistas core del sistema
import Home from './pages/Home';
import Privacy from './pages/Privacy';
import DriverProfile from './pages/DriverProfile';
import RateTrip from './pages/RateTrip';
import ThankYou from './pages/ThankYou';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Portal Institucional / Landing Page */}
        <Route path="/" element={<Home />} />
        
        {/* 2. Soporte Legal y Cumplimiento */}
        <Route path="/privacy" element={<Privacy />} />

        {/* 3. Flujo Core Dinámico del Pasajero (Ecosistema QR) */}
        {/* Pantalla de lectura y perfil público del chofer */}
        <Route path="/:codigoQR" element={<DriverProfile />} />
        
        {/* Formulario técnico de auditoría vial */}
        <Route path="/calificar/:codigoQR" element={<RateTrip />} />
        
        {/* Pantalla de éxito, control de racha y VialTickets */}
        <Route path="/gracias" element={<ThankYou />} />
      </Routes>
    </BrowserRouter>
  );
}
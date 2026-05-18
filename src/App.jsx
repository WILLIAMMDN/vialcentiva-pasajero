import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DriverProfile from './pages/DriverProfile';
import RateTrip from './pages/RateTrip';
import ThankYou from './pages/ThankYou';
import Privacy from './pages/Privacy';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/conductor/:codigoQR" element={<DriverProfile />} />
        <Route path="/calificar/:codigoQR" element={<RateTrip />} />
        <Route path="/gracias" element={<ThankYou />} />
        <Route path="/privacy" element={<Privacy />} /> 
      </Routes>
    </BrowserRouter>
  );
}
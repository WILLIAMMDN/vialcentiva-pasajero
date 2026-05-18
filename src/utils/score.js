export function calcularPuntaje({ velocidad, celular, paradero, trato, limpieza }) {
  // Convertimos los booleanos a 1 (cumplió) o 0 (no cumplió) y multiplicamos por su peso
  const puntaje =
    (velocidad ? 1 : 0) * 0.30 +
    (celular ? 1 : 0) * 0.20 +
    (paradero ? 1 : 0) * 0.20 +
    (trato ? 1 : 0) * 0.20 +
    (limpieza ? 1 : 0) * 0.10;
    
  return Number((puntaje * 5).toFixed(2)); // Multiplicamos por 5 para escala de estrellas
}

export function calcularNivel(promedio, totalCalificaciones) {
  if (totalCalificaciones >= 60 && promedio >= 4.7) return 'Oro';
  if (totalCalificaciones >= 30 && promedio >= 4.5) return 'Plata';
  if (totalCalificaciones >= 10 && promedio >= 4.2) return 'Bronce';
  return 'Registrado';
}
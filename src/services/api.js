import { supabase } from './supabase';
import { calcularPuntaje } from '../utils/score';
import { getDeviceId } from '../utils/device';

/**
 * 1. OBTENER PERFIL DEL CONDUCTOR
 * Busca al conductor por su código QR en la vista pública.
 */
/**
 * 1. OBTENER PERFIL DEL CONDUCTOR (Adaptado a tu BD real)
 */
export async function obtenerPerfilConductor(codigoQR) {
  try {
    // Buscamos en la tabla unidades y hacemos un JOIN automático con conductores
    const { data, error } = await supabase
      .from('unidades')
      .select(`
        numero_padron,
        placa,
        qr_unico,
        conductores (
          id,
          nombre_abreviado,
          paradero,
          nivel_sello,
          promedio_estrellas,
          total_viajes
        )
      `)
      .eq('qr_unico', codigoQR)
      .single();

    if (error) throw new Error('No se encontró el vehículo');

    if (!data.conductores) {
      throw new Error('Este vehículo no tiene conductor asignado');
    }

    // Aplanamos los datos para que tu DriverProfile.jsx los lea sin problemas
    const perfil = {
      conductor_id: data.conductores.id,
      nombre_publico: data.conductores.nombre_abreviado,
      paradero: data.conductores.paradero,
      numero_unidad: data.numero_padron,
      promedio: data.conductores.promedio_estrellas,
      total_calificaciones: data.conductores.total_viajes,
      nivel_sello: data.conductores.nivel_sello
    };
    
    return { exito: true, datos: perfil };
  } catch (error) {
    console.error("Error BD:", error.message);
    return { exito: false, error: error.message };
  }
}

/**
 * 2. ENVIAR CALIFICACIÓN
 * Procesa las respuestas de la interfaz, calcula el VialScore y lo envía.
 */
export async function guardarCalificacion(conductorId, respuestas) {
  try {
    // 1. Calculamos el puntaje exacto si lo necesitas para la lógica interna
    const puntajeFinal = calcularPuntaje(respuestas); 
    
    // 2. Generamos la huella del dispositivo para control antifraude
    const deviceId = getDeviceId();

    // 3. Preparamos los datos EXACTOS como se llaman en tu base de datos real
    const payload = {
      conductor_id: conductorId,
      dispositivo_id: deviceId, // Corregido: device_id -> dispositivo_id
      celular_pasajero: respuestas.celularPasajero || null, // Alineado con el estado de React
      velocidad_prudente: respuestas.velocidad,
      sin_celular: respuestas.celular,
      trato_respetuoso: respuestas.trato,
      respeto_paradero: respuestas.paradero,
      limpieza_unidad: respuestas.limpieza
      // Quitamos puntaje_final porque no existe en tu tabla de calificaciones física
    };

    const { error } = await supabase
      .from('calificaciones')
      .insert(payload);

    if (error) {
      // Manejo de error si el pasajero intenta calificar dos veces el mismo día 
      if (error.code === '23505') { 
        throw new Error('Ya has calificado a este conductor hoy. ¡Gracias por participar!');
      }
      console.error("Error Supabase:", error);
      throw new Error('Hubo un problema de conexión al guardar tu calificación.');
    }

    return { exito: true };
  } catch (error) {
    console.error("Error en guardarCalificacion:", error.message);
    return { exito: false, error: error.message };
  }
}

/**
 * 3. OBTENER DÍAS CALIFICADOS ESTA SEMANA
 * Cuenta cuántos días diferentes el usuario ha calificado en los últimos 7 días
 */
/**
 * 3. OBTENER DÍAS CALIFICADOS ESTA SEMANA (Calendario + Híbrido)
 * Cuenta cuántos días diferentes el usuario ha calificado en la semana actual (Lunes-Domingo)
 */
/**
 * 3. OBTENER DÍAS CALIFICADOS (Estrategia B: Rango Móvil de 7 Días Híbrido)
 * Cuenta cuántos días diferentes el usuario ha calificado en los últimos 7 días naturales.
 */
export async function obtenerDiasCalificados(celular = null) {
  try {
    const deviceId = getDeviceId();

    // Calculamos la ventana móvil: exactamente 7 días hacia atrás desde este milisegundo
    const hace7Dias = new Date();
    hace7Dias.setDate(hace7Dias.getDate() - 7);

    // Consulta base: Filtramos las calificaciones dentro de la ventana de 7 días
    let query = supabase
      .from('calificaciones')
      .select('fecha_hora')
      .gte('fecha_hora', hace7Dias.toISOString());

    // Control Híbrido: Si hay celular, busca por celular O por huella de dispositivo
    if (celular) {
      query = query.or(`celular_pasajero.eq.${celular},dispositivo_id.eq.${deviceId}`);
    } else {
      query = query.eq('dispositivo_id', deviceId);
    }

    const { data, error } = await query;

    if (error) throw new Error('No se pudo obtener los días calificados');

    // Agrupamos por fecha calendario única para eliminar horas duplicadas
    const diasUnicos = new Set(
      data.map(row => new Date(row.fecha_hora).toDateString())
    );

    return { exito: true, diasCalificados: diasUnicos.size };
  } catch (error) {
    console.error("Error en obtenerDiasCalificados:", error.message);
    return { exito: false, diasCalificados: 0 };
  }
}
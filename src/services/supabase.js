import { createClient } from '@supabase/supabase-js'

// Aquí Vite lee tus variables secretas del archivo .env.local
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Esta es una validación de seguridad por si olvidaste poner las variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Faltan variables de entorno de Supabase')
}

// Aquí se crea y se exporta la conexión lista para usarse
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
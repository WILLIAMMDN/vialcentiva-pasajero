# Despliegue online

El modulo Pasajero funciona como una web publica mobile-first. El usuario llega desde un QR fisico instalado en la unidad y la app consulta Supabase en la nube.

## Variables de produccion

Configurar estas variables en el proveedor de hosting:

```env
VITE_SUPABASE_URL=https://TU-PROYECTO.supabase.co
VITE_SUPABASE_ANON_KEY=TU_SUPABASE_ANON_KEY
```

## Build

```bash
npm install
npm run build
```

El directorio de salida es `dist/`.

## Rutas SPA

El repositorio incluye `public/_redirects` para que rutas como `/:codigoQR`, `/calificar/:codigoQR` y `/gracias` funcionen al recargar en hosting tipo Netlify. En otros proveedores se debe configurar un rewrite hacia `index.html`.

## Relacion con el modulo Conductor

La app del conductor genera el QR con:

```env
VITE_APP_PASAJERO_URL=https://dominio-publico-del-pasajero/calificar
```

Por eso el despliegue online del pasajero debe estar disponible antes de imprimir o distribuir QR definitivos.

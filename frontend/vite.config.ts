import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'serve-markdown',
      configureServer(server) {
        server.middlewares.use('/api/protocolos', (_req, res) => {
          const mdPath = path.resolve(process.cwd(), '../protocolos_traducidos.md');
          if (fs.existsSync(mdPath)) {
            res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
            res.end(fs.readFileSync(mdPath));
          } else {
            res.statusCode = 404;
            res.end('# Archivo no encontrado');
          }
        });
      }
    }
  ],
  server: {
    fs: {
      // Permitir acceso a archivos un nivel arriba de la raíz del frontend
      allow: ['..'],
    },
  },
})


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

export default defineConfig({
  plugins: [react()],
  // server: {
  //   port: 3006,
  //   host: true,  // Network: use --host to expose xabarini yo‘q qiladi
  // },
})

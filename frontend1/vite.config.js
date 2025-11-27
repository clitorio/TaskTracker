import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    server: {
        port: 3000, // change to any port you want
        host: true, // optional: allow LAN access
    },
    plugins: [react()],
})

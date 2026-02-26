/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Essencial para gerar a pasta /out para o Render
  images: {
    unoptimized: true, // Obrigatório para exportação estática usando next/image
  },
  // Desativa o linting no build se quiser agilizar o deploy (opcional)
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;

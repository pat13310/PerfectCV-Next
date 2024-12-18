/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        pathname: '/api/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      }
    ],
  },
  
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb'
    }
  },
  
  serverExternalPackages: ['pdfjs-dist', 'mammoth'],
  
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false
      };
    }
    
    // Configuration spécifique pour PDF.js
    config.module.rules.push({
      test: /pdfjs-dist\/build\/pdf\.worker\.js$/,
      type: 'asset/source'
    });

    // Alias pour pdfjs-dist
    config.resolve.alias['pdfjs-dist'] = 'pdfjs-dist/legacy';

    // Support pour les fichiers .mjs
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto'
    });

    // Résoudre les problèmes d'import
    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts', '.tsx'],
    };

    return config;
  },
  
  transpilePackages: ['next/font', 'ansi-styles', 'next-intl'],
  
  reactStrictMode: true,

  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'fr',
    localeDetection: false
  },
  
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  }
}

module.exports = nextConfig;

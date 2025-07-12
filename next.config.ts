// import path from 'path';
// import type { NextConfig } from 'next';

// const nextConfig: NextConfig = {
//   webpack(config) {
//     config.resolve.alias = {
//       ...(config.resolve.alias || {}),
//       '@': path.resolve(__dirname, 'src'),
//     };
//     return config;
//   },
// };

// export default nextConfig;


import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: [],
  },

  trailingSlash: false,
  webpack(config, { isServer, dev }) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname, 'src'),
    };
    
    // Fix for route groups in Next.js 15
    if (!isServer && !dev) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: {
            enforce: true,
            priority: 1,
          },
        },
      };
    }
    
    return config;
  },
};

export default nextConfig;
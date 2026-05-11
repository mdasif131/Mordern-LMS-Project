/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "mdasif-ms.t3.tigrisfiles.io",
        port: '',
        protocol: 'https'
        
      },
    ],
  },
}

export default nextConfig

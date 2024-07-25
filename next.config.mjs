/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
      },
      {
        protocol: "https",
        hostname: "ymv2bzalx31dbsus.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;

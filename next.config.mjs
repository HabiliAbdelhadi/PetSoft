/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "bytegrad.com", protocol: "https" },
      { hostname: "images.unsplash.com", protocol: "https" },
      { hostname: "via.placeholder.com", protocol: "https" },
    ],
  },
};

export default nextConfig;

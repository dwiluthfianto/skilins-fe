/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
      },
      {
        protocol: "https",
        hostname: "api.skilins.online",
        port: "",
        pathname: "/public/**",
      },
    ],
  },
};

export default nextConfig;

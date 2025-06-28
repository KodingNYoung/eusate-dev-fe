/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.pexels.com", protocol: "https" },
      { hostname: "images.unsplash.com", protocol: "https" },
      {
        hostname: "organisations-documents-dev.s3.eu-west-1.amazonaws.com",
        protocol: "https",
      },
    ],
  },
}

export default nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
         {
            hostname: "*.patreon.com",
         },
         {
            hostname: "*.patreonusercontent.com",
         },
      ],
   },
};

module.exports = nextConfig;

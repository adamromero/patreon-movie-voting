/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      domains: ["c10.patreonusercontent.com"],
   },
   // async rewrites() {
   //    return [
   //       {
   //          source: "/api/:path*",
   //          destination: `${process.env.API_URL}/:path*`,
   //       },
   //    ];
   // },
};

module.exports = nextConfig;

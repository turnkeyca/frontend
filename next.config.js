module.exports = {
  async redirects() {
    return [
      {
        source: "/renter/contact",
        destination: "/renter/contact/edit",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: `/:path*`,
        destination: `${process.env.API_URI}/:path*`,
      },
    ];
  },
};

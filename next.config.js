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
    return {
      fallback: [
        {
          source: `/:path*`,
          destination: `${process.env.API_URI}/:path*`,
        },
      ]
    };
  },
};

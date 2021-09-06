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
      beforeFiles: [
        {
          source: `/v1/:path*`,
          destination: `${process.env.API_URI}/v1/:path*`,
        },
      ]
    };
  },
};

module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: false,
      },
      {
        source: "/renter/contact",
        destination: "/renter/contact/edit",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return process.env.NODE_ENV === "production"
      ? [
          {
            source: `/:path*`,
            destination: `https://testapi.turnkeyapp.ca/:path*`,
          },
        ]
      : [
          {
            source: `/:path*`,
            destination: `http://localhost:4202/:path*`,
          },
        ];
  },
};

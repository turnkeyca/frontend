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
    // RH - will be changed to https://api.turnkeyapp.ca/:path* eventually
    if (process.env.NODE_ENV === "production") {
      return [
        {
          source: `/:path*`,
          destination: `https://testapi.turnkeyapp.ca/:path*`,
        },
      ];
    }
    if (process.env.NODE_ENV === "test") {
      return [
        {
          source: `/:path*`,
          destination: `https://testapi.turnkeyapp.ca/:path*`,
        },
      ];
    }
    return [
      {
        source: `/:path*`,
        destination: `http://localhost:4202/:path*`,
      },
    ];
  },
};

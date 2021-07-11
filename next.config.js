module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return process.env.NODE_ENV === "production"
      ? []
      : [
          {
            source: `/:path*`,
            destination: `http://localhost:4202/:path*`,
          },
        ];
  },
};

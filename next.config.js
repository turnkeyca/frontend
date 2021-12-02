module.exports = {
  async redirects() {
    return [
      {
        source: `/v1/:path*`,
        destination: `${process.env.API_URI}/v1/:path*`,
        permanent: true,
      },
    ];
  },
};

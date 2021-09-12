module.exports = {
  images: {
    domains: [`lh3.googleusercontent.com`],
  },
  async redirects() {
    return [
      {
        source: `/renter/contact`,
        destination: `/renter/contact/edit`,
        permanent: false,
      },
      {
        source: `/v1/:path*`,
        destination: `${process.env.API_URI}/v1/:path*`,
        permanent: true,
      },
    ];
  },
};

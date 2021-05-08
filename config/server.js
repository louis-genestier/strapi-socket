module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('', process.env.URL),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'ce3e5755870396111087145cd613f173'),
    },
  },
});

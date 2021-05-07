module.exports = ({ env }) => ({
  url: env('', process.env.BACK_URL),
});

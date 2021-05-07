module.exports = ({ env }) => ({
  url: env('', process.env.HEROKU_URL),
});

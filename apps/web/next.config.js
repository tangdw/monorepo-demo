const withTM = require("next-transpile-modules")(["ui", "mp-modules"]);

module.exports = withTM({
  reactStrictMode: true,
});

const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

function createCorsOptions(env) {
  return {
    origin(origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      if (env.CORS_ORIGIN.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origin not allowed by CORS"));
    },
    credentials: true,
  };
}

const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many authentication attempts, please try again later.",
});

function applySecurity(app, env) {
  app.disable("x-powered-by");
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
  app.use(cors(createCorsOptions(env)));
}

module.exports = {
  applySecurity,
  authRateLimiter,
  createCorsOptions,
};

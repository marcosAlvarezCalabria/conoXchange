const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const DEFAULT_ALLOWED_ORIGINS = [
  "https://conoxchange.fly.dev",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

function createCorsOptions(env) {
  const allowedOrigins = new Set([
    ...DEFAULT_ALLOWED_ORIGINS,
    ...(env.CORS_ORIGIN || []),
  ]);

  return {
    origin(origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.has(origin)) {
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
  DEFAULT_ALLOWED_ORIGINS,
};

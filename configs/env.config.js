const REQUIRED_ENV_KEYS = ["MONGODB_URI", "SESSION_SECRET"];

function parseBoolean(value, defaultValue = false) {
  if (typeof value === "undefined") {
    return defaultValue;
  }

  return value === "true";
}

function parseAllowedOrigins(value) {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function validateEnvironment(rawEnv) {
  const missingKeys = REQUIRED_ENV_KEYS.filter((key) => !rawEnv[key]);

  if (missingKeys.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingKeys.join(", ")}`
    );
  }

  return {
    NODE_ENV: rawEnv.NODE_ENV || "development",
    PORT: Number(rawEnv.PORT || 3000),
    MONGODB_URI: rawEnv.MONGODB_URI,
    SESSION_SECRET: rawEnv.SESSION_SECRET,
    SESSION_SECURE: parseBoolean(rawEnv.SESSION_SECURE),
    CORS_ORIGIN: parseAllowedOrigins(rawEnv.CORS_ORIGIN),
  };
}

function getEnv(rawEnv = process.env) {
  return validateEnvironment(rawEnv);
}

module.exports = {
  REQUIRED_ENV_KEYS,
  getEnv,
  parseAllowedOrigins,
  parseBoolean,
  validateEnvironment,
};

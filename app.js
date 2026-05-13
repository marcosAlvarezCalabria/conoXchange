require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const createError = require("http-errors");
const { getEnv } = require("./configs/env.config");
const routes = require("./configs/routes.config");
const { applySecurity, authRateLimiter } = require("./configs/security.config");
const {
  createSessionMiddleware,
  loadUserSession,
} = require("./configs/session.config");

require("./configs/hbs.config");

function createApp() {
  const app = express();
  const env = getEnv();

  app.set("trust proxy", 1);
  app.set("view engine", "hbs");
  app.set("views", `${__dirname}/views`);

  applySecurity(app, env);

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(createSessionMiddleware());
  app.use(loadUserSession);
  app.use(["/login", "/register"], authRateLimiter);
  app.use(express.static(`${__dirname}/public`));
  app.use("/", routes);

  app.use((req, res, next) => next(createError(404, "Router not found")));
  app.use((error, req, res, next) => {
    if (
      error instanceof mongoose.Error.CastError &&
      error.message.includes("_id")
    ) {
      error = createError(404, "Resource not found");
    } else if (!error.status) {
      error = createError(500, "Internal server error");
    }

    console.error(error);
    res.status(error.status).render(`errors/${error.status}`);
  });

  return app;
}

if (require.main === module) {
  const env = getEnv();
  require("./configs/db.config");

  const app = createApp();
  app.listen(env.PORT, () =>
    console.info(`application running on port ${env.PORT}`)
  );
}

module.exports = { createApp };

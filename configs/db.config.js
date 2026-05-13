const mongoose = require("mongoose");
const { getEnv } = require("./env.config");

const env = getEnv();

mongoose
  .connect(env.MONGODB_URI)
  .then(() => console.info("Successfully connected to the database"))
  .catch((error) =>
    console.error("An error occurred while trying to connect to the database", error)
  );
    

const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/conoXchange";

mongoose.connect(MONGODB_URI)
    .then(() =>
        console.info(`Sucessfully connected to the database ${MONGODB_URI}`)
    )
    .catch((error) => 
        console.info(`An error ocurred trying to connect to the database ${MONGODB_URI}`,error)
    )
    
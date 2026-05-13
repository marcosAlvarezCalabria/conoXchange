const expressSession = require("express-session");
const MongoStore = require("connect-mongo");
const User = require("../models/user.model");
const mongoose = require("mongoose");
const { getEnv } = require("./env.config");

function buildSessionConfig() {
    const env = getEnv();

    return {
        secret: env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            sameSite: "strict",
            secure: env.SESSION_SECURE,
            maxAge: 14 * 24 * 60 * 60 * 1000,
        },
        proxy: env.SESSION_SECURE,
        store: MongoStore.create({
            mongoUrl: mongoose.connection._connectionString || env.MONGODB_URI,
            ttl: 14 * 24 * 60 * 60,
        }),
    };
}

function createSessionMiddleware() {
    return expressSession(buildSessionConfig());
}

module.exports.loadUserSession = (req, res, next) => {
    const userId = req.session.userId
    if(!userId){
        next()
    } else {
        User.findById(userId)
            .then((user) => {
                req.user = user;
                res.locals.currentUser = user;
                //console.debug(`esto es currentUser ${user.username}`)
                next();
            })
            .catch(next)
    }

}

module.exports.buildSessionConfig = buildSessionConfig;
module.exports.createSessionMiddleware = createSessionMiddleware;

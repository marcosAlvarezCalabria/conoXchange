const expressSession = require("express-session");
const MongoStore = require("connect-mongo");
const User = require("../models/user.model");
const mongoose = require("mongoose");

module.exports.session = expressSession({
    secret: process.env.SESSION_SECRET || "top-secret",
    resave: false,
    saveUninitialized:false,
    cookie: {
        httpOnly: true,
        secure: process.env.SESSION_SECURE === "true",
        maxAge: 14*24*60*60*1000
    },
    proxy: process.env.SESSION_SECURE === "true",
    store: MongoStore.create({
        mongoUrl:mongoose.connection._connectionString,
        ttl: 14*24*60*60,
    })
});

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
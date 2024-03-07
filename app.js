require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const authMiddleware = require("./middlewares/auth.middleware");

//Init configurations
require('./configs/hbs.config');
require("./configs/db.config");

const app = express();

app.set ("view engine", "hbs");
app.set('views',`${__dirname}/views`);

//middlewares
const { session ,loadUserSession} = require("./configs/session.config");
app.use(session);
app.use(loadUserSession);

app.use(express.urlencoded());

//session middleware

//application routes
const routes= require('./configs/routes.config');
app.use('/',routes);


const port = 3000;
app.listen(port,() => console.info (`aplication running port ${ port }`));

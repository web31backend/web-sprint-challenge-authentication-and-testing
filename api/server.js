const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

let session = require("express-session");
let KnexSessionStore = require("connect-session-knex")(session);
let dbConnection = require("../database/dbConfig");

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

let sessionConfiguration = {
    name: "legacy", // session id name
    secret: process.env.SESSION_SECRET || "our little secret", 
    cookie: {
        maxAge: 1000 * 60 * 10, // 10m cookie
        secure: process.env.USE_SECURE_COOKIES || false, // false for dev usage
        httpOnly: true, // JS code on client cannot access cookie
    },
    resave: false,
    saveUninitialized: true,
    store: new KnexSessionStore({
        knex: dbConnection,
        tablename: "sessions",
        sidfieldname: "sid",
        createtable: true,
        clearInterval: 1000 * 60 * 30, // interval check for removal of expired sessions
    }),
};

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session(sessionConfiguration)); // cookie creation

// AUTH AND JOKES ENDPOINTS
server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

// BASE ENDPOINT
server.get('/api', (req, res) => {
    res.status(200).json({ api: "up" })
})

module.exports = server;

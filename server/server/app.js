require('dotenv').config()
const express = require('express');
const cors = require('cors');
// const http = require('http');
// const morgan = require('morgan')
var redis = require("redis");
var session = require('express-session');
var redisStore = require('connect-redis')(session);
const {
    ApolloServer
} = require('apollo-server-express');
const typeDefs = require('./graphql/schema')
const resolvers = require('./graphql/resolvers/resolvers')
const {
    User,
    Item
} = require('./../database/models')
const {
    __prod__
} = require('./constant');

//* setup express server

const app = express()

//* set cors

app.use(cors({
    origin: "http://localhost:8080",
    credentials: true
}))

//* set Redis and session
const redisClient = redis.createClient()

app.use(
    session({
        name: process.env.COOKIE_NAME,
        store: new redisStore({
            host: "127.0.0.1",
            port: 6379,
            ttl: 200,
            client: redisClient,
            disableTouch: true
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 12, //12 h
            httpOnly: true,
            sameSite: "lax", //csrf
            secure: __prod__ // coockie work only https
        },
        saveUninitialized: false,
        secret: process.env.REDIS_SECRET,
        resave: false,
    })
)

//* setup apollo server

const apolloServer = new ApolloServer({
    introspection: true,
    typeDefs,
    resolvers,
    context: async ({
        req
    }) => {
        return {
            req,
            User,
            Item
        }
    }
})

apolloServer.applyMiddleware({
    app,
    path: "/graphql",
    cors: false

});

module.exports = app
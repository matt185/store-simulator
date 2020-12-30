require('dotenv').config();
const __prod__ = process.env.NODE_ENV === "production";

const SERVER_PORT = 4000;

const globalAuth = ["master"];
const partialAuth = ["master", "admin"];


module.exports = {
    __prod__,
    SERVER_PORT,
    globalAuth,
    partialAuth,
};
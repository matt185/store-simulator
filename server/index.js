require('dotenv').config();
const app = require('./server/app');
const {
    SERVER_PORT
} = require('./server/constant')
const {
    sequelize
} = require("./database/models");
(async () => {

    //* connect and verify database status 
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');

        //* initialize express server

        app.listen(SERVER_PORT, () => {
            console.log(`app running on http://localhost:${SERVER_PORT}/graphql`)
        })
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

})()
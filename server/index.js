require('dotenv').config();
//const db = require('./database/models');
const app = require('./server/app');
const PORT = process.env.PORT || 4000;
const {
    sequelize
} = require("./database/models");
(async () => {

    //* connect and verify database status 
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');

        //* initialize express server

        app.listen(PORT, () => {
            console.log(`app running on http://localhost:${PORT}/graphql`)
        })
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

})()
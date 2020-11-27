require('dotenv').config();
const db = require('./database/db');


(async () => {

    //* connect and verify database status 
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    //* initialize express server


})()
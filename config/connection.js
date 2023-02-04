const mysql = require('mysql2');
require('dotenv').config()


const db = mysql.createConnection(
    {
        user: process.env.DATABASE,
        password: process.env.DB_USER,
        database: process.env.DB_PASSWORD, 

    }
)

module.exports = db;
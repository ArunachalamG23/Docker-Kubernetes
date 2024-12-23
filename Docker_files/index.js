const express = require('express');
const mysql = require('mysql2/promise');
const app = express();

// Read environment variables
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const PORT = 3000;

// MySQL connection test
app.get('/db', async (req, res) => {
    try {
        const connection = await mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD,
            database: DB_NAME,
        });
        const [rows] = await connection.execute('SELECT "Database Connection Successful" AS message;');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Default route
app.get('/', (req, res) => {
    res.send('Node.js is up and running!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

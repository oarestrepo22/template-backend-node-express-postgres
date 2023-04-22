const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();

// CORS
app.use(cors());

// Conexion db => Pool de conexiones Postgres
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
});

// Lectura y parse del body
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
    res.send('Hello World !');
});

module.exports = app;

const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

// Initialize the Express app
const app = express();
const port = 4000;

// Middleware
app.use(bodyParser.json());

// Set up PostgreSQL pool
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "postgress",
  port: 5432,
});

// Routes
app.get('/',(req,res)=>{
    res.send("This is the Node Server Page");
});

// Start the server
app.listen(port, () => {
  console.log(`Blog server running at http://localhost:${port}`);
});

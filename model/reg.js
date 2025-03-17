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
// Create a new blog post
app.post('/api/blogs', async (req, res) => {
  const { duration, category, tags, image, author, title, subtitle, description } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO blogs (duration, category, tags, image, author, title, subtitle, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [duration, category, tags, image, author, title, subtitle, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating blog post', err);
    res.status(500).json({ message: 'Error creating blog post' });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Blog server running at http://localhost:${port}`);
});

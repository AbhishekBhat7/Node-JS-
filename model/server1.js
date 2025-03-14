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

// Get all blog posts
app.get('/api/blogs', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blogs ORDER BY date DESC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching blogs', err);
    res.status(500).json({ message: 'Error fetching blogs' });
  }
});

// Get a single blog post by ID
app.get('/api/blogs/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM blogs WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Blog post not found' });
    }
  } catch (err) {
    console.error('Error fetching blog by ID', err);
    res.status(500).json({ message: 'Error fetching blog post' });
  }
});

// Update a blog post by ID
app.put('/api/blogs/:id', async (req, res) => {
  const { id } = req.params;
  const { duration, category, tags, image, author, title, subtitle, description } = req.body;

  try {
    const result = await pool.query(
      'UPDATE blogs SET duration = $1, category = $2, tags = $3, image = $4, author = $5, title = $6, subtitle = $7, description = $8 WHERE id = $9 RETURNING *',
      [duration, category, tags, image, author, title, subtitle, description, id]
    );
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Blog post not found' });
    }
  } catch (err) {
    console.error('Error updating blog post', err);
    res.status(500).json({ message: 'Error updating blog post' });
  }
});

// Delete a blog post by ID
app.delete('/api/blogs/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM blogs WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length > 0) {
      res.status(200).json({ message: 'Blog post deleted successfully' });
    } else {
      res.status(404).json({ message: 'Blog post not found' });
    }
  } catch (err) {
    console.error('Error deleting blog post', err);
    res.status(500).json({ message: 'Error deleting blog post' });
  }
});


// For updating the likes
// Increment the likes for a specific blog post by calling this api 
app.put('/api/blogs/:id/like', async (req, res) => {
    const { id } = req.params;
  
    try {
      // Increment the likes by 1
      const result = await pool.query(
        'UPDATE blogs SET likes = likes + 1 WHERE id = $1 RETURNING *',
        [id]
      );
  
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).json({ message: 'Blog post not found' });
      }
    } catch (err) {
      console.error('Error updating likes', err);
      res.status(500).json({ message: 'Error updating likes' });
    }
  });
  
// decrementing the likes for a specific blog post by using id
// Increment the likes for a specific blog post by calling this api 
app.put('/api/blogs/:id/unlike', async (req, res) => {
    const { id } = req.params;
  
    try {
      // Increment the likes by 1
      const result = await pool.query(
        'UPDATE blogs SET likes = likes - 1 WHERE id = $1 RETURNING *',
        [id]
      );
  
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).json({ message: 'Blog post not found' });
      }
    } catch (err) {
      console.error('Error updating likes', err);
      res.status(500).json({ message: 'Error updating likes' });
    }
  });

// Start the server
app.listen(port, () => {
  console.log(`Blog server running at http://localhost:${port}`);
});

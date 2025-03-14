POST to /api/blogs to create a new blog post.
GET to /api/blogs to get all blog posts.
GET to /api/blogs/:id to get a single blog post by ID.
PUT to /api/blogs/:id to update a blog post.
DELETE to /api/blogs/:id to delete a blog post.

For Incrimenting the likes we use to call api as 
PUT to api/blogs/2/like 



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
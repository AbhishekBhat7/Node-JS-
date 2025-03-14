CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  duration INT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[],
  image TEXT,
  author TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  description TEXT NOT NULL,
  likes INT DEFAULT 0,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

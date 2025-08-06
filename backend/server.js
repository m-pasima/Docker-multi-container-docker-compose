const express = require('express');
const { Pool } = require('pg');
const app = express();
const pool = new Pool({
  host: process.env.PGHOST || 'localhost',
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'mysecretpassword',
  database: process.env.PGDATABASE || 'devopsacademy',
  port: 5432
});
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Create table if not exists, then insert enquiry
app.post('/api/enquiry', async (req, res) => {
  try {
    await pool.query(
      `CREATE TABLE IF NOT EXISTS enquiries (
        id SERIAL PRIMARY KEY,
        name TEXT, email TEXT, message TEXT, ts TIMESTAMP DEFAULT NOW()
      )`
    );
    await pool.query(
      'INSERT INTO enquiries (name, email, message) VALUES ($1, $2, $3)',
      [req.body.name, req.body.email, req.body.message]
    );
    res.status(201).json({status: "ok"});
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "db error"});
  }
});

// (Optional) View enquiries
app.get('/api/enquiry', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM enquiries ORDER BY ts DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({error: "db error"});
  }
});

app.get('/api/contacts', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT name, email, message FROM enquiries ORDER BY ts DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({error: "db error"});
  }
});

app.listen(3000, () => console.log("Backend running on 3000"));

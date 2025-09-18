const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  host: process.env.POSTGRES_HOST || 'postgres',
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'appdb',
  port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432,
});

app.get('/api/hello', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() as now');
    return res.json({ message: `Hello from backend — db time: ${result.rows[0].now}` });
  } catch (err) {
    console.error('DB error', err);
    return res.json({ message: 'Hello from backend — DB unreachable' });
  }
});

app.listen(port, () => console.log(`Backend listening on ${port}`));

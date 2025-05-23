const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Beispiel-Route
app.post('/api/click', async (req, res) => {
  try {
    await pool.query('INSERT INTO clicks (timestamp) VALUES (NOW())');
    res.status(200).json({ message: 'Click gespeichert!' });
  } catch (err) {
    console.error('❌ Fehler bei /api/click:', err);
    res.status(500).json({ error: 'Interner Fehler' });
  }
});

// Server starten
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ Server läuft auf Port ${port}`);
});

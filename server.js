const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
app.use(cors()); // Erlaubt Anfragen von anderen Ursprüngen (z. B. GitHub Pages)
app.use(bodyParser.json());

// Datenbankverbindung
const pool = new Pool({
    connectionString: 'postgres://user:pass@host:5432/dbname', // Supabase oder lokal
    ssl: { rejectUnauthorized: false } // nur bei gehosteten Datenbanken nötig
});

// API-Endpunkt
app.post('/api/click', async (req, res) => {
    const { player, clicks } = req.body;
    if (!player || !clicks) {
        return res.status(400).json({ error: 'Invalid data' });
    }

    try {
        await pool.query('INSERT INTO clicks (player, clicks) VALUES ($1, $2)', [player, clicks]);
        res.status(200).json({ message: 'Saved' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.listen(3000, () => {
    console.log('Server läuft auf Port 3000');
});

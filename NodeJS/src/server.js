const express = require('express');
const db = require('./db');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is running.');
});

app.get('/users', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        res.status(500).send('Database error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/test', async (req, res) => {
    res.send('Test server running on port');
});
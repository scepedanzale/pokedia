const express = require('express');
const cors = require('cors');
const fs = require('fs');


const app = express();
const PORT = 5000;

app.use(cors());

const pokemonData = JSON.parse(fs.readFileSync('./pokemon_slim.json', 'utf8'));

app.get('/pokemon', (req, res) => {
    const { offset = '0', limit = '50', filters } = req.query;

    const offsetNum = parseInt(offset);
    const limitNum = parseInt(limit);

    let filtered = [...pokemonData];
    //filtri

    const paginated = filtered.slice(offsetNum, offsetNum + limitNum);

    res.status(200).json({
        results: paginated,
        total: filtered.length
    })
})

app.listen(PORT, () => {
    console.log("Server in ascolto");
})
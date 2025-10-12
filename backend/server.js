const express = require('express');
const cors = require('cors');
const fs = require('fs');


const app = express();
const PORT = 5000;

app.use(cors());

const pokemonData = JSON.parse(fs.readFileSync('./pokemon_slim.json', 'utf8'));

app.get('/pokemon', (req, res) => {
    const { offset = '0', pageLimit = '20', maxResults = '20', filters } = req.query;

    const offsetNum = parseInt(offset);
    const pageLimitNum = parseInt(pageLimit);
    const maxResultsNum = parseInt(maxResults);

    let filtersObj = {};
    if (filters) {
        try {
            filtersObj = JSON.parse(filters);
        } catch (err) {
            console.warn('filters non valido:', filters);
        }
    }else console.log('NO FILTRI')

    let filtered = [...pokemonData];
    //filtri
    if (filtersObj.name) filtered = filtered.filter(p => p?.name.toLowerCase().includes(filtersObj.name.toLowerCase()));

    filtered = filtered.slice(0, maxResultsNum);

    const paginated = filtered.slice(offsetNum, offsetNum + pageLimitNum);

    res.status(200).json({
        results: paginated,
        total: filtered.length
    })
})

app.listen(PORT, () => {
    console.log("Server in ascolto");
})
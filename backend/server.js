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
    console.log('SERVER.JS', filters)

    let filtersObj = {};
    if (filters) {
        try {
            filtersObj = JSON.parse(filters);
        } catch (err) {
            console.warn('filters non valido:', filters);
        }
    }
    console.log('OBJ', filtersObj)

    let filtered = [...pokemonData];
    //filtri
    if (filtersObj.name) filtered = filtered.filter(p => p?.name.toLowerCase().includes(filtersObj.name.toLowerCase()));
    if (filtersObj.types && filtersObj.types.length > 0) {
        filtered = filtered.filter(pokemon => {
            const pokemonTypes = pokemon.types.map(t => t.type.name);
            return filtersObj.types.some(type => pokemonTypes.includes(type));
        }); 
    }

    filtered = filtered.slice(0, maxResultsNum);

    // paginazione
    const paginated = filtered.slice(offsetNum, offsetNum + pageLimitNum);

    res.status(200).json({
        results: paginated,
        total: filtered.length
    })
})

app.listen(PORT, () => {
    console.log("Server in ascolto");
})
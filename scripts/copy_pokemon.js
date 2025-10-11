import axios from "axios";
import fs from "fs";


const BASE_URL = "https://pokeapi.co/api/v2";

const fetchAllPokemon = () => {
    return axios(BASE_URL + '/pokemon?limit=1000')
        .then(response => {
            console.log(response)
            return response.data.results;
        })
        .catch(err => {
            console.log(err)
        })
}

const fetchDetail = async (pokemon) => {
    try {
        const pokeRes = await axios(pokemon.url)
        const poke = pokeRes.data

        const specieRes = await axios(pokemon.url.replace('pokemon', 'pokemon-species'));
        const specie = specieRes.data

        const result = {
            abilities: poke.abilities,
            forms: poke.forms,
            game_indices: poke.game_indices,
            height: poke.height,
            id: poke.id,
            is_default: poke.is_default,
            location_area_encounters: poke.location_area_encounters,
            moves: poke.moves,
            name: poke.name,
            specie: {
                base_happiness: specie.base_happiness,
                capture_rate: specie.capture_rate,
                color: specie.color,
                egg_groups: specie.egg_groups,
                evolution_chains: specie.evolution_chains,
                evolves_from_species: specie.evolves_from_species,
                form_descriptions: specie.form_descriptions,
                forms_switchable: specie.forms_switchable,
                gender_rate: specie.gender_rate,
                genera: specie.genera,
                generation: specie.generation,
                habitat: specie.habitat,
                has_gender_differences: specie.has_gender_differences,
                hatch_counter: specie.hatch_counter,
                is_baby: specie.is_baby,
                is_legendary: specie.is_legendary,
                is_mythical: specie.is_mythical,
                name: specie.name,
                shape: specie.shape,
                varieties: specie.varieties,
            },
            sprites: {
                front_default: poke.sprites?.front_default,
                artwork_front_default: poke.sprites?.other['official-artwork']?.front_default,
                animation: poke.sprites?.other?.showdown?.front_default
            },
            stats: poke.stats,
            types: poke.types,
            weight: poke.weight
        }

        console.log('RESULT', result);

        return result;
    } catch (err) {
        console.log(err);
    }
}

const main = async () => {
    const results = [];
    const allPokemon = await fetchAllPokemon();
    console.log(allPokemon);

    const concurrency = 20;

    for (let i = 0; i <= allPokemon.length; i += concurrency) {
        const batch = allPokemon.slice(i, i + concurrency);
        const batchRes = await Promise.all(batch.map(fetchDetail));
        results.push(...batchRes.filter(r => r));

        console.log(`Pokemon scaricati: ${results.length}/${allPokemon.length}`);
    }
    console.log('✔️ Download completato.')

    fs.writeFileSync('pokemon_slim.json', JSON.stringify(results, null, 2));
    console.log('File salvato: pokemon_slim.json');
}

main();
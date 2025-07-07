import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { urlSinglePokemon } from '../../../config/config';
import { Capitalize, formatString } from '../../../functions/functions';

export default function SingleEvolution({ evolution, currentPokemonName, numEvolution }) {

    const [singlePokemon, setSinglePokemon] = useState({});   // pokémon dell'evoluzione

    useEffect(() => {
        if (evolution) {
            axios(urlSinglePokemon + evolution.name)
                .then(response => {
                    setSinglePokemon(response.data)
                    console.log(response.data)
                    console.log(evolution)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }, [evolution])

    const evolutionDetailsMap = {
        gender: { label: 'Genre', format: (v) => (v === 0 ? 'male' : v === 1 ? 'female' : '') },
        held_item: { label: 'Needs item', format: (v) => v?.name },
        item: { label: 'Item', format: (v) => v?.name },
        known_move: { label: 'Move', format: (v) => v?.name },
        known_move_type: { label: 'Move type', format: (v) => v?.name },
        location: { label: 'Location', format: (v) => v?.name },
        min_affection: { label: 'Min level affection' },
        min_beauty: { label: 'Min level beauty' },
        min_happiness: { label: 'Min level happiness' },
        min_level: { label: 'Min level' },
        needs_overworld_rain: { label: 'Needs rain', format: (v) => (v ? 'Yes' : '') },
        party_species: { label: 'Party species', format: (v) => v?.name },
        party_type: { label: 'Party type', format: (v) => v?.name },
        relative_physical_stats: { label: 'Physical stats' },
        time_of_day: { label: 'Time of day' },
        trade_species: { label: 'Trade species', format: (v) => v?.name },
        trigger: { label: 'Trigger', format: (v) => v?.name },
        turn_upside_down: { label: 'Turn upside down', format: (v) => (v ? 'Yes' : '') },
    };

    return (
        singlePokemon &&
        <div className='evolution-container'>
            <Link to={`/pokemon/${singlePokemon.id}`} state={{ singlePokemon }} className={`evolution ${singlePokemon.name === currentPokemonName ? 'evolution-selected ' + singlePokemon.types[0].type.name : ''}`}>
                <img
                    src={singlePokemon?.sprites?.front_default}
                    title={singlePokemon.name}
                />
            </Link>
            <div>
                {
                    numEvolution == 1 ?
                        <p className='italic'>{Capitalize(currentPokemonName)} non ha evoluzioni</p>
                        :
                        Object.entries(evolution?.evolution_details || {}).map(([key, value]) => {
                            if (value === null || value === false || value === '') return null;

                            const label = evolutionDetailsMap[key].label;
                            const displayValue =
                                typeof value === 'object'
                                    ? value?.name || JSON.stringify(value)
                                    : evolutionDetailsMap[key].format;

                            return (
                                <p key={key}>
                                    {label}: {displayValue}
                                </p>
                            )
                        })
                }
            </div>
        </div>
    )
}

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { urlSinglePokemon } from '../../../config/config';
import { formatPokemonName } from '../../../utils/string';
import { evolutionDetailsMap } from '../../../constants/evolutionDetailsMap';

export default function SingleEvolution({ evolution, currentPokemonName, numEvolution }) {

    const [singlePokemon, setSinglePokemon] = useState({});   // pokémon dell'evoluzione

    useEffect(() => {
        if (evolution) {
            axios(urlSinglePokemon + evolution.name)
                .then(response => {
                    setSinglePokemon(response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }, [evolution])


    return (
        singlePokemon &&
        <div className='evolution-container'>
            <Link
                to={`/pokemon/${singlePokemon.id}`}
                state={{ singlePokemon }}
                className={`evolution ${singlePokemon.name === currentPokemonName ? 'evolution-selected ' + singlePokemon.types[0].type.name : ''}`}
            >
                <img
                    src={singlePokemon?.sprites?.front_default}
                    title={singlePokemon.name}
                />
            </Link>
            <div className='evolution-desc'>
                {
                    numEvolution == 1 ?
                        <p className='italic'>{formatPokemonName(currentPokemonName)} has not evolutions.</p>
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

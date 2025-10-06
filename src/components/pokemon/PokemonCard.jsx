import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { Capitalize, pokemonId } from '../../functions/functions';

export default function PokemonCard({ pokemon }) {

    const [singlePokemon, setSinglePokemon] = useState([]);

    useEffect(() => {
        if (pokemon.url) {
            axios(pokemon.url)
                .then(response => {
                    setSinglePokemon(response.data)
                    console.log('SINGLE POKEMON', singlePokemon)
                })
                .catch(error => console.error(error))
        }
    }, [pokemon])

    return (
        singlePokemon.name && singlePokemon?.sprites?.front_default &&
        <div className='pokemon-card'>
            <Link to={`/pokemon/${singlePokemon.id}`} state={{ singlePokemon }}>
                <img src={singlePokemon.sprites.front_default}/>
                <div className='pokemon-card__text'>
                    <span>#{pokemonId(singlePokemon.id)}</span>
                    <p>{Capitalize(singlePokemon.name)}</p>
                </div>
            </Link>
        </div>
    )
}

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { Capitalize, pokemonId } from '../../functions/functions';
import { fetchData } from '../../utils/api';

export default function PokemonCard({ pokemon }) {

    const [singlePokemon, setSinglePokemon] = useState([]);
    const pokemonUrl = pokemon?.url.replace("pokemon-species", "pokemon") || pokemon.url;

    useEffect(() => {
        if (pokemonUrl) {
            fetchData(pokemonUrl)
                .then(response => setSinglePokemon(response))
                .catch(error => console.error(error))
        }
    }, [pokemon])

    return (
        singlePokemon?.name && singlePokemon?.sprites?.front_default &&
        <div className='pokemon-card'>
            <Link to={`/pokemon/${singlePokemon.id}`} state={{ singlePokemon }}>
                <img src={singlePokemon.sprites.front_default} />
                <div className='pokemon-card__text'>
                    <span>#{pokemonId(singlePokemon.id)}</span>
                    <p>{Capitalize(singlePokemon.name)}</p>
                </div>
            </Link>
        </div>
    )
}

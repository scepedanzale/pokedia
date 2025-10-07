import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { fetchData } from '../../utils/api';
import { formatPokemonName } from '../../utils/string';
import { formatPokemonId } from '../../utils/pokemon';

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
                    <span>#{formatPokemonId(singlePokemon.id)}</span>
                    <p>{formatPokemonName(singlePokemon.name)}</p>
                </div>
            </Link>
        </div>
    )
}

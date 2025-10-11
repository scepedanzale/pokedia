import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { fetchData } from '../../utils/api';
import { formatPokemonName } from '../../utils/string';
import { formatPokemonId } from '../../utils/pokemon';

export default function PokemonCard({ pokemon }) {

    /* const [singlePokemon, setSinglePokemon] = useState([]);
    const pokemonUrl = pokemon?.url.replace("pokemon-species", "pokemon") || pokemon.url; */

    /* useEffect(() => {
        if (pokemonUrl) {
            fetchData(pokemonUrl)
                .then(response => setSinglePokemon(response))
                .catch(error => console.error(error))
        }
    }, [pokemon]) */

    return (
        pokemon?.name && pokemon?.sprites?.front_default &&
        <div className='pokemon-card'>
            <Link to={`/pokemon/${pokemon.id}`} state={{ pokemon }}>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} loading='lazy' />
                <div className='pokemon-card__text'>
                    <span>#{formatPokemonId(pokemon.id)}</span>
                    <p>{formatPokemonName(pokemon.name)}</p>
                </div>
            </Link>
        </div>
    )
}

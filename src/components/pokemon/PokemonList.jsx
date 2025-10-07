import { useEffect, useState } from 'react'
import { urlAllPokemon } from '../../config/config'
import PokemonCard from './PokemonCard';
import SearchPokemon from './SearchPokemon';
import Wrapper from '../layout/Wrapper';
import Pagination from '../Pagination';
import { fetchData } from '../../utils/api';
import { getWithExpiry, saveWithExpiry } from '../../utils/storage';
import Loader from '../ui/Loader';
import Error from '../ui/Error';

export default function PokemonList({ pokemonListProp, limit }) {

    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);

    const [pokemonList, setPokemonList] = useState([]); // lista pokemon
    const [visiblePokemon, setVisiblePokemon] = useState([]); // Pokémon mostrati


    useEffect(() => {
        const loadPokemon = () => {
            setLoader(true);
            setVisiblePokemon([]);
            if (pokemonListProp) setPokemonList(pokemonListProp);   // controllo se c'è lista da prop
            else {
                const stored = getWithExpiry('pokemonList');
                if (stored) setPokemonList(stored); // controllo se in localstorage
                else {
                    fetchData(urlAllPokemon + '?limit=10000')   // chiamata
                        .then(response => {
                            setPokemonList(response.results);
                            saveWithExpiry('pokemonList', response.results);
                        })
                        .catch(error => {
                            console.error(error);
                            setError(true);
                        });
                }
            }
            setLoader(false);
        }

        loadPokemon();
    }, [pokemonListProp]);


    return (
        <Wrapper>
            {!pokemonListProp && <SearchPokemon
                pokemonList={pokemonList}
                onChange={setVisiblePokemon}
                setError={setError}
                setLoader={setLoader}
            />}

            {loader && <Loader />}
            {error && <Error />}
            {/* Lista pokemon */}
            <section>
                <div id='pokemon-list'>
                    {visiblePokemon && visiblePokemon.map((p, index) => (
                        <PokemonCard key={index} pokemon={p?.pokemon ?? p} />
                    ))}
                </div>
            </section>
            {/* Paginazione */}
            {pokemonList.length > 0 ?
                <Pagination recordSet={pokemonList} setVisibleList={(data) => setVisiblePokemon(data)} limit={limit} />
                :
                <p>Pokémon not found</p>
            }
        </Wrapper>
    )
}

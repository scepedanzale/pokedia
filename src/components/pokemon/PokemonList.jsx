import { useEffect, useState } from 'react'
import PokemonCard from './PokemonCard';
import SearchPokemon from './SearchPokemon';
import Wrapper from '../layout/Wrapper';
import Pagination from '../Pagination';
import Loader from '../ui/Loader';
import Error from '../ui/Error';
import axios from 'axios';

export default function PokemonList({ pokemonListProp, limit, queryParam }) {

    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);

    const [pokemonList, setPokemonList] = useState([]); // lista pokemon

    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    // chiamata back
    const fetchPage = async (page = 1, limit = 50, filters = {}) => {
        try {
            const offset = (page - 1) * limit;
            const params = { limit, offset, ...filters };
            const res = await axios.get('http://localhost:5000/pokemon', { params });

            return {
                data: res.data.results,   // Pokémon della pagina
                total: res.data.total     // totale Pokémon lato server
            };
        } catch (err) {
            console.error('Errore fetchPage:', err);
            return { data: [], total: 0 };
        }
    };

    useEffect(() => {
        const loadPokemon = async () => {
            setLoader(true);
            if (pokemonListProp) {
                setPokemonList(pokemonListProp);   // controllo se c'è lista da prop
                setLoader(false);
            }
            else {
                try {
                    const { data, total } = await fetchPage(currentPage, limit);
                    setPokemonList(data);
                    setTotalCount(total);
                } catch (err) {
                    console.log(err)
                }finally{
                    setLoader(false)
                }
            }
        }

        loadPokemon();
    }, [pokemonListProp, currentPage, limit]);


    return (
        <Wrapper>
            {!pokemonListProp && <SearchPokemon
                pokemonList={pokemonList}
                setError={setError}
                setLoader={setLoader}
            />}

            {loader && <Loader />}
            {error && <Error />}
            {/* Lista pokemon */}
            <section>
                <div className='pokemon-list'>
                    {pokemonList.map((p, index) => (
                        <PokemonCard key={index} pokemon={p} />
                    ))}
                </div>
            </section>
            {/* Paginazione */}
            {pokemonList?.length > 0 ?
                <Pagination
                    limit={limit}
                    totalCount={totalCount}
                    queryParam={queryParam}
                    onPageChange={setCurrentPage}
                />
                :
                <p>Pokémon not found</p>
            }
        </Wrapper>
    )
}

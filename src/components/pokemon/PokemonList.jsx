import { useEffect, useState } from 'react'
import PokemonCard from './PokemonCard';
import SearchPokemon from './SearchPokemon';
import Wrapper from '../layout/Wrapper';
import Pagination from '../Pagination';
import Loader from '../ui/Loader';
import Error from '../ui/Error';
import { fetchPage } from '../../utils/api';

export default function PokemonList({ pokemonListProp, pageLimit, totalResults, queryParam }) {

    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);

    const [pokemonList, setPokemonList] = useState([]); // lista pokemon

    const [totalCount, setTotalCount] = useState(totalResults || 0);
    const [currentPage, setCurrentPage] = useState(1);

    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({});

    useEffect(() => {
        console.log('FILTRI', filters)
        console.log('TOTAL RES', totalResults)
        console.log('TOTAL COUNT', totalCount)
    }, [totalResults, totalCount, filters])

    useEffect(() => {
        const loadPokemon = async () => {
            setLoader(true);
            if (pokemonListProp) {
                setPokemonList(pokemonListProp);   // controllo se c'è lista da prop
                setLoader(false);
            }
            else {  
                try {
                    const { data, total } = await fetchPage({
                        page: currentPage,
                        pageLimit,
                        maxResults: totalResults,
                        filters: { ...filters, name: search }
                    });
                    console.log('pokemonlist', data, total)
                    setPokemonList(data);
                    setTotalCount(total);
                } catch (err) {
                    console.log(err)
                } finally {
                    setLoader(false)
                }
            }
        }

        loadPokemon();
    }, [pokemonListProp, currentPage, pageLimit, search, filters]);


    return (
        <Wrapper>
            {!pokemonListProp && <SearchPokemon
                setSearch={setSearch}
                setFilters={setFilters}
                setError={setError}
                setLoader={setLoader}
            />}

            {loader && <Loader />}
            {error && <Error />}
            {/* Lista pokemon */}
            <section>
                <div className='pokemon-list'>
                    {pokemonList.length > 0 && !loader ? pokemonList.map((p, index) => (
                        <PokemonCard key={index} pokemon={p} />
                    ))
                        :
                        <p>Pokémon not found</p>
                    }
                </div>
            </section>
            {/* Paginazione */}
            {pokemonList?.length > 0 &&
                <Pagination
                    pageLimit={pageLimit}
                    totalCount={totalCount}
                    queryParam={queryParam}
                    onPageChange={setCurrentPage}
                />
            }
        </Wrapper>
    )
}

import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { urlAllPokemon } from '../../config/config'
import { FaArrowUp } from "react-icons/fa";
import PokemonCard from './PokemonCard';
import SearchPokemon from './SearchPokemon';
import Loader from '../Loader';
import Error from '../Error';
import Wrapper from '../layout/Wrapper';

export default function PokemonList({ pokemonListProp }) {

    const [scrollY, setScrollY] = useState(window.scrollY);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);

    const [pokemonList, setPokemonList] = useState([]); // lista pokemon
    const [visiblePokemon, setVisiblePokemon] = useState([]); // Pokémon effettivamente mostrati

    const numPokemon = 50; // numero pokemon da visualizzare
    const [offset, setOffset] = useState(0); // numero partenza pokemon da aggiungere

    const initialLoad = useRef(true);

    const FIFTEEN_DAYS_MS = 15 * 24 * 60 * 60 * 1000; // 15 giorni in ms

    const saveWithExpiry = (key, data, ttl = FIFTEEN_DAYS_MS) => {
        const now = Date.now();
        const item = {
            data,
            expiry: now + ttl,
        };
        localStorage.setItem(key, JSON.stringify(item));
    };

    const getWithExpiry = (key) => {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) return null;

        try {
            const item = JSON.parse(itemStr);
            if (Date.now() > item.expiry) {
                localStorage.removeItem(key);
                return null;
            }
            return item.data;
        } catch {
            localStorage.removeItem(key);
            return null;
        }
    };

    console.log('PROPSS', pokemonListProp)

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (initialLoad.current) {
            initialLoad.current = false;
            return;
        }

    }, [initialLoad])

    useEffect(() => {
        setLoader(true);
        setVisiblePokemon([]);
        if (pokemonListProp?.length > 0) {
            setPokemonList(pokemonListProp);
            setVisiblePokemon(pokemonListProp.slice(0, numPokemon));
            setLoader(false);
        } else {
            const stored = getWithExpiry('pokemonList');
            if (stored) {
                setPokemonList(stored);
                setVisiblePokemon(stored.slice(0, numPokemon));
                setLoader(false);
            } else {
                axios.get(urlAllPokemon + '?limit=10000')
                    .then(res => {
                        setPokemonList(res.data.results);
                        setVisiblePokemon(res.data.results.slice(0, numPokemon));
                        saveWithExpiry('pokemonList', res.data.results);
                        setLoader(false);
                    })
                    .catch(error => {
                        console.error(error);
                        setLoader(false);
                        setError(true);
                    });
            }
        }
    }, [pokemonListProp]);

    const loadMorePokemon = () => {
        const newOffset = offset + numPokemon;
        setOffset(newOffset);
        const nextBatch = pokemonList.slice(0, newOffset + numPokemon);
        setVisiblePokemon(nextBatch);
    };
    visiblePokemon&&console.log(visiblePokemon)

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
            <div id="top"></div>
            <div id='pokemon-list'>
                {visiblePokemon && visiblePokemon.map((p, index) => (
                    <PokemonCard key={index} pokemon={p?.pokemon ?? p} />
                ))}
            </div>
            {pokemonList &&
                <>
                    {scrollY > 200 && <a href='#top' className='button back-to-top'><FaArrowUp /></a>}
                    {
                        visiblePokemon.length < pokemonList.length &&
                        <button
                            type='button'
                            className='button'
                            onClick={loadMorePokemon}
                        >
                            Load more
                        </button>
                    }
                </>
            }
        </Wrapper>
    )
}

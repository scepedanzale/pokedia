import { useEffect, useState } from 'react';
import Wrapper from '../components/layout/Wrapper';
import { urlGenerations } from '../config/config';
import axios from 'axios';
import { formatString } from '../functions/functions';
import Breadcrumb from '../components/Breadcrumb';
import { fetchData } from '../utils/api';
import Loader from '../components/Loader';
import Error from '../components/Error';
import PokemonList from '../components/pokemon/PokemonList';

export default function Generations() {

    const [generations, setGenerations] = useState([]);
    const [error, setError] = useState(false);
    const [loader, setLoader] = useState(false);


    useEffect(() => {
        const loadGenerations = async () => {
            try {
                setLoader(true);
                const data = await fetchData(urlGenerations);
                if (data.results) {
                    console.log(data)
                    const results = await Promise.all(
                        data.results.map(element => fetchData(element.url))
                    );

                    setGenerations(results);
                    console.log(results)
                } else setError(true)
            } catch (error) {
                console.log(error)
            } finally {
                setLoader(false)
            }
        }

        loadGenerations();
    }, [])



    return (
        <Wrapper>
            <Breadcrumb />
            {loader && <Loader />}
            {error && <Error />}
            <section>
                <h1>Generations</h1>
                <ul>
                    {generations?.map((gen, index) => (
                        <li key={index}>
                            <h2>{formatString(gen.name)}</h2>
                            <span>{formatString(gen?.main_region?.name)}</span>
                            <PokemonList pokemonListProp={gen?.pokemon_species}/>
                        </li>
                    ))} 
                </ul>
            </section>
        </Wrapper>
    )
}

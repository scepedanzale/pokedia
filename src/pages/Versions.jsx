import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { urlGenerations } from '../config/config';
import Wrapper from '../components/layout/Wrapper';
import Breadcrumb from '../components/Breadcrumb';
import Loader from '../components/Loader';
import Error from '../components/Error';
import PokemonList from '../components/pokemon/PokemonList';
import { fetchData } from '../utils/api';
import { formatString } from '../utils/string';

export default function Versions() {

    const [generations, setGenerations] = useState([]);
    const [error, setError] = useState(false);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        const loadGenerations = async () => {
            try {
                setLoader(true);
                const data = await fetchData(urlGenerations);

                if (data.results) {
                    console.log('Generation data', data);

                    const results = await Promise.all(
                        data.results.map(async (element) => {
                            const generation = await fetchData(element.url);
                            const versions = await Promise.all(
                                generation.version_groups.map(async (ver) => {
                                    const versionData = await fetchData(ver.url);
                                    return versionData
                                })
                            )

                            return {
                                ...generation,
                                versions
                            }
                        })
                    );

                    setGenerations(results);
                    console.log('RESULTSSS', results)
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
            <section id='versions'>
                <h1>Versions</h1>
                <ul>
                    {generations?.map((gen, index) => (
                        <li key={index}>
                            <h2>{formatString(gen.name)}</h2>
                            <div className='version-detail'>
                                <h3>Region: </h3>
                                <Link to={`/regions/${gen.main_region.name}`}>{formatString(gen?.main_region?.name)}</Link>
                            </div>

                            <div className='version-detail'>
                                <h3>Games: </h3>
                                <div className='badge-list'>
                                    {gen.versions.map((version, i) => (
                                        version.versions.map(v => (
                                            <span key={i} className='badge'>{formatString(v.name)}</span>
                                        ))
                                    ))}
                                </div>
                            </div>

                            {gen.types.length > 0 &&
                                <div className='version-detail'>
                                    <h3>New Types: </h3>
                                    <div className='badge-list'>
                                        {gen.types.map((type, i) => (
                                            <Link key={i} to={`/types/${type.name}`} className={`type ${type.name}`}>{formatString(type.name)}</Link>
                                        ))}
                                    </div>
                                </div>
                            }
                            <PokemonList pokemonListProp={gen?.pokemon_species} limit={10} />
                        </li>
                    ))}
                </ul>
            </section>
        </Wrapper>
    )
}

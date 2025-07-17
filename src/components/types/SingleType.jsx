import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { urlTypes } from '../../config/config';
import { typeImages } from '../../config/types';
import { Capitalize, formatString } from '../../functions/functions';
import PokemonList from '../pokemon/PokemonList';
import Loader from '../Loader';
import Error from '../Error';
import Breadcrumb from '../Breadcrumb';
import Wrapper from '../layout/Wrapper';

export default function SingleType() {

    const { type_name } = useParams();

    const urlType = location.state?.urlType || null;

    const [type, setType] = useState({})
    const [typeImg, setTypeImg] = useState('')

    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoader(true);
        axios(urlType ?? `${urlTypes}${type_name}`)
            .then((response) => {
                setType(response.data);
                setLoader(false);
            })
            .catch((error) => {
                console.error('Errore fetch tipo:', error);
                setError(true);
            })
            .finally(() => {
                setLoader(false);
            });
    }, [urlType, type_name]);

    useEffect(() => {
        setTypeImg(typeImages[type?.name])
    }, [type])



    return (
        <Wrapper>
            {loader && <Loader />}
            {error && <Error />}
            {type?.pokemon &&
                <div id='type-page'>
                    <Breadcrumb />
                    <header>
                        <img src={typeImg} />

                        <div className="intro">
                            <h1>{Capitalize(type.name)}</h1>

                            <div id='type-effects'>
                                <h2 className={`text-${type.name}`}>Effects</h2>
                                <ul>
                                    {Object.entries(type?.damage_relations).map(([key, value]) => (
                                        <li key={key}>
                                            <span>{formatString(key)}: </span>
                                            <div>
                                                {value.length > 0 ? value.map((damage, index) => (
                                                    <Link to={`/types/${damage.name}`} key={index} className={`type ${damage.name}`}>
                                                        {damage.name}
                                                    </Link>
                                                ))
                                                    :
                                                    <span>-</span>
                                                }
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </header>

                    {/* pokemon */}
                    <section>
                        <h2 className={`text-${type.name}`}>Pokémon</h2>
                        <PokemonList pokemonListProp={type?.pokemon} />
                    </section>
                </div>
            }
        </Wrapper>
    )
}

import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import axios from 'axios';
import { urlTypes } from '../../config/config';
import { typeImages } from '../../config/types';
import { Capitalize, formatString } from '../../functions/functions';

export default function SingleType() {

    const { type_name } = useParams();

    const location = useLocation();
    const urlType = location.state;

    const [type, setType] = useState({})
    const [typeImg, setTypeImg] = useState('')

    useEffect(() => {
        axios(urlType ?? urlTypes + type_name)
            .then(response => {
                setType(response.data)
                console.log(response.data)
            })
            .catch(e => {
                console.error(e)
            })
    }, [urlType, type_name])

    useEffect(() => {
        setTypeImg(typeImages[type?.name])
    }, [type])

    return (
        type?.pokemon &&
        <section id='type-page'>
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
            <div className='pokemon-list'>
                <h2 className={`text-${type.name}`}>Pokémon</h2>
                <div className='badge-list'>
                    {type?.pokemon.map((p, index) => (
                        index < 30 &&
                        <p key={index} className='badge'>
                            <Link to={`/pokemon/${p.pokemon.name}`}>
                                {p.pokemon.name}
                            </Link>
                        </p>
                    ))}
                </div>
            </div>

        </section>
    )
}

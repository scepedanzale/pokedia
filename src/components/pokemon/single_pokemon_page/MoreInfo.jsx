import { useEffect, useState } from 'react'
import axios from 'axios';
import { Capitalize } from '../../../functions/functions';

export default function MoreInfo({ currentPokemon }) {

    const [selected, setSelected] = useState('moves');

    const [defaultOrder, setDefaultOrder] = useState([]);
    const [abcOrder, setAbcOrder] = useState([]);

    const [order, setOrder] = useState('default')

    const handleMoreInfo = async (info) => {
        setSelected(info)
        if (info === 'moves') {
            setDefaultOrder(currentPokemon?.moves || 'Information not available')
        } else if (info === 'games') {
            setDefaultOrder(currentPokemon?.game_indices || 'Information not available')
        } else if (info === 'locations') {
            const response = await axios.get(currentPokemon?.location_area_encounters)
            await setDefaultOrder(response.data || []);
        }
    }

    const handleOrder = (value) => {
        setOrder(value)
    }

    useEffect(() => {
        if (order === 'abc') {
            if (selected === 'moves') {
                setAbcOrder([...defaultOrder].sort((a, b) => a.move.name.localeCompare(b.move.name)));
            } else if (selected === 'games') {
                setAbcOrder([...defaultOrder].sort((a, b) => a.version.name.localeCompare(b.version.name)));
            } else if (selected === 'locations') {
                setAbcOrder([...defaultOrder].sort((a, b) => a.location_area.name.localeCompare(b.location_area.name)));
            }
        }
    }, [order, defaultOrder, selected]);


    useEffect(() => {
        handleMoreInfo('moves')
        setSelected('moves')
    }, [currentPokemon])

    return (
        <section id='more-info'>
            <div>
                <div id='controller' className={currentPokemon?.types[0].type.name}>
                    <span
                        className={selected === 'moves' && 'active'}
                        onClick={() => handleMoreInfo('moves')}
                    >
                        MOVES
                    </span>
                    <span
                        className={selected === 'games' && 'active'}
                        onClick={() => handleMoreInfo('games')}
                    >
                        GAMES
                    </span>
                    <span
                        className={selected === 'locations' && 'active'}
                        onClick={() => handleMoreInfo('locations')}
                    >
                        LOCATIONS
                    </span>
                </div>

                {/* ordine predefinito, alfabetico */}
                <button
                    id='order-btn'
                    className={`text-${currentPokemon?.types[0].type.name} border-${currentPokemon?.types[0].type.name}`}
                    onClick={() => handleOrder(order === 'default' ? 'abc' : 'default')}
                >
                    {order === 'default' ? 'abc' : 'default'}
                </button>

                <div className='badge-list'>
                    {(order === 'default' ? defaultOrder : abcOrder).map((element, index) => {
                        const name =
                            element.move?.name ||
                            element.version?.name ||
                            element.location_area?.name ||
                            '';
                        return <p key={index} className='badge'>{Capitalize(name)}</p>;
                    })}
                </div>

            </div>
        </section>
    )
}

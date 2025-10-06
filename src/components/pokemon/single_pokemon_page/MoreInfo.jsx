import { useEffect, useState } from 'react'
import axios from 'axios';
import { Capitalize } from '../../../functions/functions';

export default function MoreInfo({ currentPokemon }) {

    const [selected, setSelected] = useState('moves');

    const [defaultOrder, setDefaultOrder] = useState([]);
    const [abcOrder, setAbcOrder] = useState([]);

    const [order, setOrder] = useState('default');

    const getItemName = (item) => {
        if (selected === 'moves') return item.move?.name || '';
        if (selected === 'games') return item.version?.name || '';
        return '';
    };

    const handleMoreInfo = async (info) => {
        setSelected(info);

        let data = [];

        if (info === 'moves') {
            data = currentPokemon?.moves || [];
        } else if (info === 'games') {
            data = currentPokemon?.game_indices || [];
        } 

        setDefaultOrder(data);
        setAbcOrder([...data].sort((a, b) => getItemName(a).localeCompare(getItemName(b))));
    }

    useEffect(() => {
        handleMoreInfo('moves');
        setSelected('moves');
    }, [currentPokemon])

    const handleOrder = (value) => {
        setOrder(value);
    }

    const displayedList = order === 'default' ? defaultOrder : abcOrder;

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
                </div>

                {/* ordine predefinito, alfabetico */}
                <button
                    id='order-btn'
                    className={`text-${currentPokemon?.types[0].type.name} border-${currentPokemon?.types[0].type.name}`}
                    onClick={() => handleOrder(order === 'default' ? 'abc' : 'default')}
                >
                    {order === 'default' ? 'abc' : 'default'}
                </button>

                {/* Lista */}
                <div className='badge-list'>
                    {displayedList.length > 0 ? displayedList.map((element, index) => {
                        return <p key={index} className='badge'>{Capitalize(getItemName(element))}</p>;
                    })
                        :
                        'Information not avaible'
                    }
                </div>

            </div>
        </section>
    )
}

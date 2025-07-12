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
        if (selected === 'locations') return item.location_area?.name || '';
        return '';
    };

    const handleMoreInfo = async (info) => {
        setSelected(info);

        let data = [];

        if (info === 'moves') {
            data = currentPokemon?.moves || [];
        } else if (info === 'games') {
            data = currentPokemon?.game_indices || [];
        } else if (info === 'locations') {
            try {
                const response = await axios.get(currentPokemon?.location_area_encounters);
                data = response.data || [];
                handleLocation(data)
                console.log(response.data);
            } catch (error) {
                data = [];
            }
        }

        setDefaultOrder(data);
        setAbcOrder([...data].sort((a, b) => getItemName(a).localeCompare(getItemName(b))));
    }

    const handleLocation = (data) => {
        data.forEach(el=>{
            console.log(el.location_area)
            fetchLocation(el.location_area.url)
        })
    }
    /* Location */
    const fetchLocation = (url) => {
        try{
            axios(url)
            .then(response=>{
                fetchLocationRegion(response.data.location.url)
                console.log(response.data)
            })
        }catch(error){
            console.log(error);
        }
    }
    /* Region */
    const fetchLocationRegion = (url) => {
        try{
            axios(url)
            .then(response=>{
                console.log(response.data.region.name)
            })
        }catch(error){
            console.log(error);
        }
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

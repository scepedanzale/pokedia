import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { urlSinglePokemon } from '../../../config/config'
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { formatPokemonId } from '../../../utils/pokemon';


export default function PreNextPokemon({ currentPokemon }) {

    const [prev, setPrev] = useState({});
    const [next, setNext] = useState({});

    useEffect(() => {
        if (currentPokemon) {
            fetchPrevPokemon();
            fetchNextPokemon();
        }
    }, [currentPokemon])

    const fetchPrevPokemon = () => {
        axios(urlSinglePokemon + (currentPokemon.id - 1))
            .then(response => {
                setPrev(response.data);
            })
            .catch(e => {
                console.error(e);
            })
    }
    const fetchNextPokemon = () => {
        axios(urlSinglePokemon + (currentPokemon.id + 1))
            .then(response => {
                setNext(response.data);
            })
            .catch(e => {
                console.error(e);
            })
    }

    return (
        <div id='pre-next-buttons'>
            {currentPokemon.id !== 1 &&
                <Link to={`/pokemon/${prev.id}`} className='prev button'>
                    <div className='flex'>
                        <IoIosArrowBack />
                        <span>#{formatPokemonId(prev.id)}</span>
                    </div>
                </Link>
            }
            <Link to={`/pokemon/${next.id}`} className='next button'>
                <div className='flex'>
                    <span>#{formatPokemonId(next.id)}</span>
                    <IoIosArrowForward />
                </div>
            </Link>
        </div>
    )
}

import { useEffect, useState } from 'react'
import Wrapper from '../components/layout/Wrapper'
import axios from 'axios';
import { urlHabitat } from '../config/config';
import { Link } from 'react-router-dom';
import { formatString } from '../utils/string';

export default function Habitats() {
    const [habitats, setHabitats] = useState([]);

    const fetchHabitat = () => {
        try {
            axios(urlHabitat)
                .then(response => {
                    setHabitats(response.data.results);
                    console.log(response.data)
                })
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => fetchHabitat(), []);
    return (
        <Wrapper>
            <div className="habitats">
                {habitats.map((habitat, index) => (
                    <Link to={`/regions/habitat/${habitat.name}`} key={index}>
                        <div className='habitat-card'>
                            <img src={`./imgs/habitats/${habitat.name}.jpg`} alt="" />
                            <span>{formatString(habitat.name)}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </Wrapper>
    )
}

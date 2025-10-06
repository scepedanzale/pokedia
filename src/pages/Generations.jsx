import { useEffect, useState } from 'react';
import Wrapper from '../components/layout/Wrapper';
import { urlGenerations } from '../config/config';
import axios from 'axios';
import { formatString } from '../functions/functions';

export default function Generations() {

    const [generations, setGenerations] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const generationsData = await fetchData(urlGenerations);
                setGenerations(generationsData);
                for (const area of generationsData) {
                    const locationArea = await fetchData(area.location_area.url);
                    const location = await fetchData(locationArea.location.url);
                    data.push({
                        location_area: area.location_area.name,
                        location: location.name,
                        region: location.region.name
                    });
                }
    
            } catch (error) {
                console.error(error);
            }
        }
        fetch();
    }, [])

    const fetchData = (url) => {
        return axios(url)
            .then(response => {
                return response.data.results;
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <Wrapper>
            <section>
                <h1>Generations</h1>
                <ul>
                    {generations?.map((gen, index) => (
                        <li key={index}>{formatString(gen.name)}</li>
                    ))}
                </ul>
            </section>
        </Wrapper>
    )
}

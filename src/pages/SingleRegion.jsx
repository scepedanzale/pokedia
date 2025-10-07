import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { urlRegions } from '../config/config';
import { IoLogoGameControllerB } from "react-icons/io";
import axios from 'axios';
import Breadcrumb from '../components/Breadcrumb';
import Wrapper from '../components/layout/Wrapper';
import LocationList from '../components/regions/LocationList';
import { formatString } from '../utils/string';
import Error from '../components/ui/Error';
import Loader from '../components/ui/Loader';


export default function SingleRegion() {
    const { region_name } = useParams();
    const [error, setError] = useState(false);
    const [loader, setLoader] = useState(false);

    const [region, setRegion] = useState({});

    useEffect(() => {
        setLoader(true);
        axios(urlRegions + region_name)
            .then(response => {
                setRegion(response.data);
                setError(false);
            })
            .catch(error => {
                console.error(error);
                setError(true);
            })
            .finally(() => setLoader(false))
    }, [region_name])

    return (
        <Wrapper>
            {error && <Error />}
            {loader && <Loader/>}

            {region?.version_groups &&
                <div id="region-page">
                    <Breadcrumb />
                    <header>
                        <img src={`/imgs/maps/${region_name}.webp`} alt="" loading='lazy' />
                        <div>
                            <div className='region-info'>
                                <h1>{formatString(region_name)}</h1>
                                <p>{region?.names.map((name, index) => (
                                    name.language.name === 'ja-Hrkt' && <span key={index}>{name.name}</span>
                                ))}</p>
                            </div>
                            <div className='versions'>
                                <h2><IoLogoGameControllerB /></h2>
                                <ul>
                                    {region?.version_groups.map((ver, index) => (
                                        <li key={index}>{formatString(ver.name)}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </header>

                    <LocationList locations={region?.locations} />
                </div>
            }
        </Wrapper>
    )
}

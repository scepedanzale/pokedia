import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { urlRegions } from '../config/config';
import axios from 'axios';
import { formatString } from '../functions/functions';
import Breadcrumb from '../components/Breadcrumb';

export default function SingleRegion() {
    const { region_name } = useParams();
    const [region, setRegion] = useState({});
    const location = useLocation();

    useEffect(() => {
        try {
            axios(urlRegions + region_name)
                .then(response => {
                    console.log(response.data);
                    setRegion(response.data);
                })
        } catch (error) {
            console.error(error);
        }
    }, [region_name])
    return (
        <>
            {region?.version_groups &&
                <div id="region-page">
                    <Breadcrumb path={location.pathname}/>
                    <header>
                        <img src={`/imgs/maps/${region_name}.webp`} alt="" />
                        <div>
                            <div className='region-info'>
                                <h1>{formatString(region_name)}</h1>
                                <p>{region?.names.map((name, index) => (
                                    name.language.name === 'ja-Hrkt' && <span key={index}>{name.name}</span>
                                ))}</p>
                            </div>
                            <div className='versions'>
                                <h2>Versioni</h2>
                                <ul className='badge-list'>
                                    {region?.version_groups.map((ver, index) => (
                                        <li key={index} className='badge'>{ver.name}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </header>
                </div>
            }
        </>
    )
}

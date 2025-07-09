import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { urlRegions } from "../config/config";
import Breadcrumb from "../components/Breadcrumb";


export default function WorldMap() {
    const location = useLocation();
    const [regions, setRegions] = useState([]);

    useEffect(() => {
        try {
            axios(urlRegions)
                .then(response => {
                    setRegions(response.data.results);
                    console.log(response.data)
                })
        } catch (error) {
            console.error(error)
        }
    }, [])
    return (
        <>
            {/* Ricerca region */}
            <Breadcrumb path={location.pathname} />
            <div id="world-map-wrapper">
                <img src="/imgs/world_map.jpeg" alt="" />
                {regions && regions.map((region, index) => (
                    region.name !== 'hisui' &&
                    <Link
                        to={`/regions/${region.name}`}
                        key={index}
                        className={`pin ${region.name}`}
                    >
                        <span className="pin-icon"></span>
                        <span className="pin-label">{region.name}</span>
                    </Link>

                ))}
            </div>
            <p>Mappa non ufficiale che unifica le regioni descritte nel mondo Pokémon.</p>
        </>
    )
}

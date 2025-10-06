import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { urlRegions } from "../config/config";
import Breadcrumb from "../components/Breadcrumb";
import Map from "../components/Map";
import Wrapper from "../components/layout/Wrapper";
import Habitats from "../components/Habitats";


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
        <Wrapper>
            {/* Ricerca region */}
            <Breadcrumb path={location.pathname} />
            <div id="world-map-container">
                <h1>Pokémon World Map</h1>
                <Map regions={regions} />
                <p>Not official map.</p>
            </div>
            <div id="habitat">
                <h2>Habitat</h2>
                <Habitats/>
            </div>
        </Wrapper>
    )
}

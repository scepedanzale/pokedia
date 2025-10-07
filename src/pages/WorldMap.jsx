import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
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
            <section>
                <div id="world-map-container">
                    <h1>Pokémon World Map</h1>
                    <Map regions={regions} />
                    <p>Not official map.</p>
                </div>
            </section>

            <section>
                <div id="habitat">
                    <h2>Habitat</h2>
                    <Habitats />
                </div>
            </section>
        </Wrapper>
    )
}

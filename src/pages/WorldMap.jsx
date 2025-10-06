import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { urlHabitat, urlRegions } from "../config/config";
import Breadcrumb from "../components/Breadcrumb";
import Map from "../components/Map";
import Wrapper from "../components/layout/Wrapper";
import { formatString } from "../functions/functions";


export default function WorldMap() {
    const location = useLocation();
    const [regions, setRegions] = useState([]);
    const [habitats, setHabitats] = useState([]);

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
    fetchHabitat();
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
                <div className="badge-list">
                    {habitats.map((habitat, index) => (
                        <p key={index} className="badge">{formatString(habitat.name)}</p>
                    ))}
                </div>
            </div>
        </Wrapper>
    )
}

import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { urlRegions } from "../config/config";
import Breadcrumb from "../components/Breadcrumb";
import Map from "../components/Map";
import Wrapper from "../components/layout/Wrapper";


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
            <Map regions={regions}/>
            <p>Mappa non ufficiale che unifica le regioni descritte nel mondo Pokémon.</p>
        </Wrapper>
    )
}

import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom"
import { urlLocation } from "../config/config";
import Wrapper from "../components/layout/Wrapper";
import { formatString } from "../functions/functions";
import Breadcrumb from "../components/Breadcrumb";
import PokemonList from "../components/pokemon/PokemonList";
import Loader from "../components/Loader";
import Error from "../components/Error";

export default function SingleLocation() {

    const { location_name } = useParams();
    const location = useLocation();

    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);

    const [singleLocation, setSingleLocation] = useState({});
    const [pokemonLocation, setPokemonLocation] = useState([]);

    useEffect(() => {
        setLoader(true);
        try {
            axios(urlLocation + location_name)
                .then(response => {
                    setSingleLocation(response.data);
                    fetchAreas(response.data.areas);
                    
                })
        } catch (error) {
            console.error(error);
            setLoader(false);
            setError(true);
        }
    }, [location_name])

    const fetchAreas = (areas) => {
        areas.forEach((area) => {
            axios(area.url)
                .then(response => {
                    console.log(response.data)
                    setPokemonLocation(response.data.pokemon_encounters);
                    setLoader(false);
                })
                .catch(error => {
                    console.error(error)
                })
        })
    }

    return (
        <Wrapper>
            {singleLocation.names &&
                <div id="location-page">
                    <Breadcrumb path={location.pathname} />
                    {loader && <Loader />}
                    {error && <Error />}
                    <header>
                        <h1>{formatString(location_name)}</h1>
                        <p>{formatString(singleLocation.region.name)}</p>
                    </header>

                    <section>
                        <h2>Areas</h2>
                        <ul className="badge-list">
                            {singleLocation?.areas.map((area, index) => (
                                <li key={index} className="badge">{formatString(area.name)}</li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2>Pokemon</h2>
                        {loader ? <Loader />
                            :
                            pokemonLocation.length > 0
                                ? <PokemonList pokemonListProp={pokemonLocation} />
                                :
                                <p>Non si trovano Pokémon in questa location.</p>
                        }
                    </section>
                </div>
            }
        </Wrapper>
    )
}

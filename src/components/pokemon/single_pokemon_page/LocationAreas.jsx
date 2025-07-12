import { useEffect, useState } from "react";
import Map from "../../Map";
import axios from "axios";
import { formatString } from "../../../functions/functions";

export default function LocationAreas({ locationAreaEncountersUrl }) {

    const [places, setPlaces] = useState([])

    useEffect(() => {
        const fetch = async () => {
            const location_areas = await fetchData(locationAreaEncountersUrl);

            let data = [];

            for (const area of location_areas) {
                const locationArea = await fetchData(area.location_area.url);
                const location = await fetchData(locationArea.location.url);
                data.push({
                    location_area: area.location_area.name,
                    location: location.name,
                    region: location.region.name
                });
            }
            if (places.length !== location_areas.length) {
                setPlaces(data);
            }
        }
        fetch();
    }, [locationAreaEncountersUrl])

    const fetchData = (url) => {
        return axios(url)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log(error);
                return [];
            })
    }

    const isLargeScreen = () => window.innerWidth >= 1024; // o altra soglia

    const handleClick = (region) => {
        if (isLargeScreen()) return; // su grandi schermi l'hover gestisce tutto
        toggleLabel(region);
    };

    const handleHover = (region, isLeaving = false) => {
        if (!isLargeScreen()) return; // su piccoli schermi l'hover non fa nulla
        const label = document.querySelector('.pin.' + region + ' .pin-label');
        if (label) label.style.display = isLeaving ? 'none' : 'block';
    };

    const toggleLabel = (region) => {
        const label = document.querySelector('.pin.' + region + ' .pin-label');
        if (label) label.style.display = label.style.display === 'none' ? 'block' : 'none';
    };


    return (
        <section id="location-areas">
            <h2>Location Areas</h2>
            {places.length > 0 ?
                <div id="world-map-wrapper">
                    <Map
                        regions={
                            places.reduce((acc, place) => {
                                if (!acc.some(r => r.name === place.region)) {
                                    acc.push({ name: place.region });
                                }
                                return acc;
                            }, [])
                        }
                    />

                    <ul>
                        {places.length > 5 &&
                            <div id="scroll">
                                <div id="scroll-point"></div>
                            </div>
                        }
                        {places.map((place, index) => (
                            <li
                                key={index}
                                onClick={() => handleClick(place.region)}
                                onMouseEnter={() => handleHover(place.region)}
                                onMouseLeave={() => handleHover(place.region, true)}
                            >
                                <p className="location-area">{formatString(place.location_area)}</p>
                                <span className="location">
                                    {formatString(place.location)} - {formatString(place.region)}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
                :
                <p>No location areas found for this Pokémon.</p>
            }
        </section>
    )
}

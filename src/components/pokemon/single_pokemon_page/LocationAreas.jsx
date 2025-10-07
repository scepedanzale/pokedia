import { useEffect, useState } from "react";
import Map from "../../Map";
import { formatString } from "../../../utils/string";
import { fetchData } from "../../../utils/api";
import MouseAnimation from "../../ui/MouseAnimation";
import Loader from "../../ui/Loader";
import Error from "../../ui/Error";

export default function LocationAreas({ locationAreaEncountersUrl }) {

    const [places, setPlaces] = useState([]);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoader(true);
        setError(false);
        setPlaces([]);

        const fetch = async () => {
            try {
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
            } catch (error) {
                console.error(error);
                setError(true);
            }
            setLoader(false);
        }
        fetch();
    }, [locationAreaEncountersUrl])

    const isLargeScreen = () => window.innerWidth >= 1024;

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

            {loader && <Loader />}
            {error && <Error />}
            {places?.length > 0 &&
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
                        {places.length > 5 && <MouseAnimation/>}
                        {places.map((place, index) => (
                            <li
                                key={index}
                                onClick={() => handleClick(place.region)}
                                onMouseEnter={() => handleHover(place.region)}
                                onMouseLeave={() => handleHover(place.region, true)}
                            >
                                <p className="location-area">{formatString(place.location_area)}</p>
                                <span className="location">{formatString(place.location)} - {formatString(place.region)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            }
        </section>
    )
}

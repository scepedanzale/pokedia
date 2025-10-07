import { useMemo } from "react";
import { formatString } from "../../utils/string";
import { Link, useParams } from "react-router-dom";
import { CATEGORY_ORDER, getGenericCategory } from "../../utils/regions";

export default function LocationList({ locations }) {
    const { region_name } = useParams();
    
    const groupLocations = (locations) => {
        return locations.reduce((map, location) => {
            const category = getGenericCategory(location.name);
            if (!map[category]) map[category] = [];
            map[category].push(location.name);
            return map;
        }, {});
    }
    
    const grouped = useMemo(() => groupLocations(locations), [locations]);

    return (
        <section id='region-locations'>
            {CATEGORY_ORDER.map((category) => {
                const items = grouped[category];
                if (!items || items.length === 0) return;
                return (
                    <>
                        <h2 key={category}>{category}</h2>
                        <ul className='badge-list'>
                            {items?.sort().map((item) => (
                                <li key={item} className='badge'>
                                    <Link to={`/regions/${region_name}/${item}`}>
                                        {formatString(item)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </>
                )
            })}
        </section>
    );
}
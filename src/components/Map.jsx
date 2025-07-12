import { Link } from "react-router-dom";

export default function Map({regions}) {
    console.log(regions);
    return (
        <div id="world-map">
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
    )
}

import { useEffect, useMemo, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { urlRegions } from '../config/config';
import axios from 'axios';
import { formatString } from '../functions/functions';
import Breadcrumb from '../components/Breadcrumb';
import { IoLogoGameControllerB } from "react-icons/io";
import Wrapper from '../components/layout/Wrapper';



export default function SingleRegion() {
    const { region_name } = useParams();
    const location = useLocation();

    const [region, setRegion] = useState({});

    const CATEGORY_ORDER = [
        "Cities and Towns",
        "Provinces and Local Regions",
        "Routes and Paths",
        "Biomes and Natural Environments",
        "Bases or Outposts",
        "Mystical or Sacred Places",
        "Institutional Structures",
        "Event or Legendary Locations",
        "Other"
    ];

    const getGenericCategory = (name) => {
        if (!name) return "Altro";
        const lower = name.toLowerCase();

        const patterns = [
            // Cities and Towns
            { regex: /\b(city|town|village|port|plaza|plateau|burg|square|market)\b/, category: "Cities and Towns" },

            // Provinces and Local Regions
            { regex: /\b(province|area|region|zone|badlands)\b/, category: "Provinces and Local Regions" },

            // Routes and Paths
            { regex: /\b(route|road|path|trail|bridge|entrance|tunnel|outskirts|way|riverbank|pass|lane|walk|pathway|gate|drawbridge|plain|gauntlet)\b/, category: "Routes and Paths" },

            // Biomes and Natural Environments
            { regex: /\b(lake|lakefront|desert|forest|woods|wilds|fields|biome|coast|sea|island|islands|cavern|cave|passage|gorge|pool|falls|hill|valley|reef|bush|beach|cliff|canyon|slope|wilderness|lowlands|wetlands|grove|bed|foot|cap|mirror|seat|tangle|drift|woods|bay|spring|meadow|mountain|mount|ironworks|paradise|garden|moor|sanctuary|chasm|grotto|field|slab|underwater|shore|islet|jungle|plains|ranch|pelago)\b/, category: "Biomes and Natural Environments" },

            // Bases or Outposts
            { regex: /\b(base|camp|fort|outpost|pillar|squad|training|hq|bldg|battleground|secretariat|hideout)\b/, category: "Bases or Outposts" },

            // Mystical or Sacred Places
            { regex: /\b(shrine|den|temple|altar|chamber|ruins|rock|cemetery|weald|dungeon|roost|spring|hall of origin|distortion|dreamyard|relic|rumination|strange|tomb|pyre|mirage|crescent|soaring|scorched|lighthouse|well|unknown|roaming|ultra space)\b/, category: "Mystical or Sacred Places" },

            // Institutional Structures
            { regex: /\b(academy|league|club|gym|lab|labs|facility|dojo|tower|station|mansion|plant|ship|mine|lair|castle|palace|factory|chateau|maison|safari|hotel|library|tv|school|cycle shop|restaurant|villa|museum|co|store|day care|house|terminal|global|corner|arcade|hall|park|subway|sewers|storage|studio|laboratory|frigate|mall|avenue|theater|room|complex|treehollow|resort|center|truck|battle|mauville|ss|dome|pokeathlon|pokewalker|megamart|megalopolis|observatory)\b/, category: "Institutional Structures" },
        ];

        for (const { regex, category } of patterns) {
            if (regex.test(lower)) return category;
        }

        return "Altro";
    };


    const groupLocations = (locations) => {
        return locations.reduce((map, location) => {
            const category = getGenericCategory(location.name);
            if (!map[category]) map[category] = [];
            map[category].push(location.name);
            return map;
        }, {});
    }

    const LocationList = ({ locations }) => {
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
                                    <li key={item} className='badge'>{formatString(item)}</li>
                                ))}
                            </ul>
                        </>
                    )
                })}
            </section>
        );
    }

    useEffect(() => {
        try {
            axios(urlRegions + region_name)
                .then(response => {
                    console.log(response.data);
                    setRegion(response.data);
                })
        } catch (error) {
            console.error(error);
        }
    }, [region_name])

    return (
        <Wrapper>
            {region?.version_groups &&
                <div id="region-page">
                    <Breadcrumb path={location.pathname} />
                    <header>
                        <img src={`/imgs/maps/${region_name}.webp`} alt="" loading='lazy'/>
                        <div>
                            <div className='region-info'>
                                <h1>{formatString(region_name)}</h1>
                                <p>{region?.names.map((name, index) => (
                                    name.language.name === 'ja-Hrkt' && <span key={index}>{name.name}</span>
                                ))}</p>
                            </div>
                            <div className='versions'>
                                <h2><IoLogoGameControllerB /></h2>
                                <ul>
                                    {region?.version_groups.map((ver, index) => (
                                        <li key={index}>{formatString(ver.name)}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </header>

                    <LocationList locations={region?.locations} />
                </div>
            }
        </Wrapper>
    )
}

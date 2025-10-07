import { AiOutlineSound } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import { formatPokemonName } from '../../../utils/string';
import { calculateStatsPercentage, formatGenderRate, formatPokemonId } from '../../../utils/pokemon';

export default function Details({ currentPokemon, specie }) {

    // verso pokemon
    const playSound = (url) => {
        const a = new Audio(url);
        a.play();
    }

    return (
        <div id='pokemon-info'>
            <div>
                <div className='pokemon-meta'>
                    {/* id */}
                    <p>
                        <span>#{formatPokemonId(currentPokemon.id)}</span>
                        <br />
                        <b className={currentPokemon?.types[0]?.type?.name}>{specie?.is_legendary && 'LEGENDARY'}</b>
                    </p>
                    {/* verso */}
                    <button
                        type='button'
                        className={`cry-button text-${currentPokemon?.types[0]?.type?.name}`}
                        onClick={() => playSound(currentPokemon.cries.latest)}
                    >
                        <AiOutlineSound />
                    </button>
                </div>
                {/* nome */}
                <div id='pokemon-identity'>
                    <h1>{formatPokemonName(currentPokemon?.name)}</h1>
                    {specie.genera && specie.genera.map((g, index) => (
                        <p key={index} className={`text-${currentPokemon?.types[0]?.type?.name}`}>{g.language.name == 'en' && g.genus}</p>
                    ))}
                </div>
            </div>
            {/* Tipo */}
            <div>
                {currentPokemon?.types &&
                    currentPokemon.types.map((t, index) => (
                        <Link to={`/types/${t.type.name}`} key={index} className={`type ${t.type.name}`}>
                            {formatPokemonName(t.type.name)}
                        </Link>
                    ))}
            </div>
            <div id='pokemon-profile'>
                {/* peso e altezza */}
                <p>Height: {currentPokemon.height * 10}cm</p>
                <p>Weight: {currentPokemon.weight / 10}kg</p>
                {/* habitat */}
                {specie?.habitat && <p>Habitat: {specie.habitat.name}</p>}
                {/* capture rate */}
                {specie?.capture_rate && <p>Capture rate: {calculateStatsPercentage(specie.capture_rate)}%</p>}
                {/* Gender rate */}
                {specie?.gender_rate && <p>Gender rate: {formatGenderRate(specie.gender_rate)}</p>}
            </div>
        </div>
    )
}

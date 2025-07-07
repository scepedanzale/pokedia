import { Capitalize, genderRate, pokemonId, stats } from '../../../functions/functions'
import { AiOutlineSound } from 'react-icons/ai'
import { Link } from 'react-router-dom';

export default function Details({ currentPokemon, specie }) {

    // verso pokemon
    function playSound(url) {
        const a = new Audio(url);
        a.play();
    }

    return (
        <div id='pokemon-info'>
            {/* nome e numero */}
            <div>
                <div className='pokemon-meta'>
                    <p>
                        <span>#{pokemonId(currentPokemon.id)}</span>
                        <br />
                        <b className={`${currentPokemon?.types[0]?.type?.name}`}>{specie?.is_legendary && 'LEGENDARY'}</b>
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
                <div className='pokemon-info'>
                    <h1>{Capitalize(currentPokemon?.name)}</h1>
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
                            {Capitalize(t.type.name)}
                        </Link>
                    ))}
            </div>
            <div className='pokemon-profile'>
                {/* peso e altezza */}
                <p>Height: {currentPokemon.height * 10}cm</p>
                <p>Weight: {currentPokemon.weight / 10}kg</p>
                {/* habitat */}
                {specie?.habitat && <p>Habitat: {specie.habitat.name}</p>}
                {/* capture rate */}
                {specie?.capture_rate && <p>Capture rate: {stats(specie.capture_rate)}%</p>}
                {/* Gender rate */}
                {specie?.gender_rate && <p>Gender rate: {genderRate(specie.gender_rate)}</p>}
            </div>
        </div>
    )
}

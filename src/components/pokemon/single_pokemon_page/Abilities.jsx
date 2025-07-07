import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Abilities({ currentPokemon }) {

    const [abilities, setAbilities] = useState([])

    useEffect(() => {
        if (currentPokemon.abilities) {
            const fetchPokemonAbility = async () => {
                try {
                    const request = currentPokemon.abilities.map(a =>
                        axios(a.ability.url)
                            .then(response => (response.data))
                            .catch(e => console.log(e)))
                    const result = await Promise.all(request);
                    setAbilities(result)
                } catch (err) {
                    console.log(err);
                }
            }
            fetchPokemonAbility();
        }
    }, [currentPokemon])

    return (
        <section id='abilities'>
            <h2>Abilities</h2>
            {abilities && abilities.map((ability, index) => (
                <div key={index} className='ability'>
                    <p className={`ability-name text-${currentPokemon?.types[0].type.name}`}>{ability.name}</p>
                    <p>{ability?.effect_entries && ability.effect_entries.map((effect) => (
                        (effect.language.name === 'en' || effect.language.name === 'it') && effect.effect
                    ))}</p>
                </div>

            ))}
        </section>
    )
}

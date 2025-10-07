import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { formatPokemonName } from '../../../utils/string';

export default function Forms({ currentPokemon, specie }) {

    const [forms, setForms] = useState([]);

    useEffect(() => {
        if (specie.varieties) {
            const fetchPokemonForms = async () => {
                try {
                    const requests = specie.varieties.map(variety =>
                        axios(variety.pokemon.url).then(response => (response.data))
                    );

                    const results = await Promise.all(requests);
                    setForms(results);
                } catch (error) {
                    console.error("Error fetching Pokémon forms:", error);
                }
            };
            fetchPokemonForms();
        }
    }, [specie]);


    return (
        <section id='forms'>
            <h2>Forms</h2>
            {forms && forms.map((singlePokemon) => (
                <Link to={`/pokemon/ ${singlePokemon.id}`} state={{ singlePokemon }} key={singlePokemon.id} className={`${(singlePokemon?.name === currentPokemon?.name) && 'text-' + currentPokemon?.types[0].type.name}`}>
                    {formatPokemonName(singlePokemon?.name)} {singlePokemon.is_default && '(forma predefinita)'}
                </Link>
            ))}
        </section>
    )
}

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Wrapper from '../components/layout/Wrapper';
import Breadcrumb from '../components/Breadcrumb';
import PokemonList from '../components/pokemon/PokemonList';
import { urlHabitat } from '../config/config';
import axios from 'axios';

export default function SingleHabitat() {

    const { habitat_name } = useParams();
    const [habitat, setHabitat] = useState({});
    console.log(habitat_name)

    const fetchHabitat = () => {
        try {
            axios(urlHabitat + habitat_name)
                .then(response => {
                    // normalizzo url pokemon per la lista
                    setHabitat({
                        ...response.data,
                        pokemon_species: response.data.pokemon_species.map(species => ({
                            name: species.name,
                            url: species.url.replace('pokemon-species', 'pokemon')
                        }))
                    })
                })
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => fetchHabitat(), []);




    return (
        <Wrapper>
            <Breadcrumb/>
            <h1>{habitat_name}</h1>
            <PokemonList pokemonListProp={habitat.pokemon_species} />
        </Wrapper>
    )
}

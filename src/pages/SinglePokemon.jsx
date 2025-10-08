import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios';
import { urlSinglePokemon } from '../config/config';
import Abilities from '../components/pokemon/single_pokemon_page/Abilities';
import MoreInfo from '../components/pokemon/single_pokemon_page/MoreInfo';
import Details from '../components/pokemon/single_pokemon_page/Details';
import Stats from '../components/pokemon/single_pokemon_page/Stats';
import Forms from '../components/pokemon/single_pokemon_page/Forms';
import PreNextPokemon from '../components/pokemon/single_pokemon_page/PreNextPokemon';
import Evolutions from '../components/pokemon/single_pokemon_page/Evolutions';
import LocationAreas from '../components/pokemon/single_pokemon_page/LocationAreas';
import Wrapper from '../components/layout/Wrapper';


export default function SinglePokemon() {
  const location = useLocation();
  const { singlePokemon } = location.state || {};

  const { id } = useParams();

  const [currentPokemon, setCurrentPokemon] = useState(singlePokemon || {});
  const [specie, setSpecie] = useState({});

  useEffect(() => {
    if(singlePokemon) setCurrentPokemon(singlePokemon);
    else{   // se viene da url
      axios(urlSinglePokemon + id)
        .then(response => {
          setCurrentPokemon(response.data)
        })
    }
  }, [singlePokemon, id])

  
  useEffect(() => {
    if (currentPokemon?.species) {
      axios(currentPokemon.species.url)
        .then(response => {
          setSpecie(response.data);
        })
        .catch(error => console.error('Error fetching species data:', error));
    }
  }, [currentPokemon]);


  return (
    currentPokemon?.name && specie &&
    <>
      <Wrapper>
        <PreNextPokemon currentPokemon={currentPokemon} />

        <div id='pokemon-page'>

          {/* Prev and Next pokemon */}

          {/* Header */}
          <header>
            <div className={`images ${currentPokemon?.types[0]?.type?.name}`}>
              <img id='pokemon-img' src={currentPokemon?.sprites?.other['official-artwork'].front_default} />
              <img id='pokemon-gif' src={currentPokemon?.sprites?.other.showdown.front_default} />
            </div>

            {/* Specifiche */}
            <Details currentPokemon={currentPokemon} specie={specie} />
          </header>

          {/* Statistiche */}
          <Stats currentPokemon={currentPokemon} />

          {/* Forme */}
          <Forms specie={specie} currentPokemon={currentPokemon} />

          {/* Evoluzioni */}
          <Evolutions currentPokemon={currentPokemon} />

          {/* Abilità */}
          <Abilities currentPokemon={currentPokemon} />

          {/* Location Areas */}
          <LocationAreas locationAreaEncountersUrl={currentPokemon.location_area_encounters} />

          {/* More info: moves, games, location */}
          <MoreInfo currentPokemon={currentPokemon} />

        </div>
      </Wrapper>
    </>
  )
}

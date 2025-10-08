import { useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import PokemonCard from "./PokemonCard";
import PokemonList from "./PokemonList";

export default function SearchPokemon({ pokemonList, setError, setLoader }) {
  const inputField = useRef();
  const [input, setInput] = useState('');
  const [pokemonSearched, setPokemonSearched] = useState([]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [scrollY, setScrollY] = useState(window.scrollY);

  useEffect(() => {
    if (!input || !pokemonList || pokemonList.length === 0) return;

    if (input.length < 3) setPokemonSearched([]);

    if (input.length >= 3) {
      setLoader(true);

      try {
        const filtered = pokemonList.filter(pokemon =>
          pokemon.name.toLowerCase().startsWith(input.toLowerCase())
        );
        setPokemonSearched(filtered)
      } catch (error) {
        console.error(error);
        setError(true);
      }
      setLoader(false);
    }
  }, [input, pokemonList]);

  const handleInputCollapse = () => inputField.current?.classList.toggle('collapse');


  return (
    <>
      <div className="search-container">
        <input
          ref={inputField}
          type="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={scrollY > 50 && 'collapse'}
          placeholder="Search Pokémon..."
        />
        <span className={`button ${scrollY <= 50 && 'collapse'}`} onClick={handleInputCollapse}>
          <IoIosSearch />
        </span>
      </div>
      <div className="filters-container">
        
      </div>
      {pokemonSearched.length > 0 &&
        <section id="searched">
          <h2>Results: {pokemonSearched.length}</h2>
          <PokemonList pokemonListProp={pokemonSearched} limit={10}/>
        </section>
      }
    </>
  )
}

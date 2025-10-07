import { useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";

export default function SearchPokemon({ onChange, pokemonList, setError, setLoader }) {
  const [input, setInput] = useState('');
  const [scrollY, setScrollY] = useState(window.scrollY);
  const inputField = useRef();
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!input || !pokemonList || pokemonList.length === 0) return;

    if (input.length >= 3) {
      setLoader(true);

      try {
        const filtered = pokemonList.filter(pokemon =>
          pokemon.name.toLowerCase().startsWith(input.toLowerCase())
        );
        onChange(filtered);
      } catch (error) {
        console.error(error);
        setError(true);
      }
      setLoader(false);
    }
  }, [input, pokemonList]);


  const handleInputCollapse = () => inputField.current?.classList.toggle('collapse');


  return (
    <div className="search-container">
      <input
        ref={inputField}
        type="search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={window.scrollY > 50 && 'collapse'}
        placeholder="Search Pokémon..."
      />
      <span className={`button ${window.scrollY <= 50 && 'collapse'}`} onClick={handleInputCollapse}>
        <IoIosSearch />
      </span>
    </div>
  )
}

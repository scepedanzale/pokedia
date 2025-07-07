import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";

export default function SearchPokemon({ onChange, pokemonList, setError, setLoader }) {
  const [input, setInput] = useState('');

  useEffect(() => {
    if (!input || !pokemonList || pokemonList.length === 0) return;

    if (input.length < 3) {
      onChange(pokemonList.slice(0, 30));
    } else {
      setLoader(true);

      try {
        const filtered = pokemonList.filter(pokemon =>
          pokemon.name.toLowerCase().startsWith(input.toLowerCase())
        );
        onChange(filtered);
        setLoader(false);
      } catch (error) {
        console.error(error);
        setLoader(false);
        setError(true);
      }
    }
  }, [input, pokemonList]);

  return (
    <div className="search-container">
      <input
        type="search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <span className="button">
        <IoIosSearch />
      </span>
    </div>
  )
}

import { useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import PokemonList from "./PokemonList";
import { BsPlus, BsX } from "react-icons/bs";
import { pokemonTypes } from "../../data/pokemonTypes";
import { fetchPage } from "../../utils/api";

export default function SearchPokemon({ pokemonList, setError, setLoader }) {
  const inputField = useRef();
  const [input, setInput] = useState('');
  const [pokemonSearched, setPokemonSearched] = useState([]);
  const [filtersOpened, setFiltersOpened] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [scrollY, setScrollY] = useState(window.scrollY);

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      try {
        const searchedPokemon = await fetchPage({maxResults: 1000, filters: { name: input }});
        setPokemonSearched(searchedPokemon.data)

        /* setPokemonSearched(filtered) */
      } catch (error) {
        console.error(error);
        setError(true);
      } finally { setLoader(false) }
    }

    if (!input || !pokemonList || pokemonList.length === 0) return;

    if (input.length < 3) setPokemonSearched([]);
    if (input.length >= 3) fetchData();

  }, [input, pokemonList]);

  const handleInputCollapse = () => inputField.current?.classList.toggle('collapse');



  // ------------------------------------------------------
  //                     FILTRI
  // ------------------------------------------------------

  const [filterType, setFilterType] = useState([]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    setFilterType(prev => {
      if (checked) {
        return [...prev, { filter: name, value }];
      } else {
        return prev.filter(f => !(f.filter === name && f.value === value));
      }
    })
  }

  const removeFilter = (element) => {
    const newFilters = filterType.filter(f => f.value !== element.value);
    setFilterType(newFilters);
  }

  useEffect(() => {
    console.log('Filters updated:', filterType);
  }, [filterType]);

  const applyFilters = () => {
    const filtered = pokemonList.filter(pokemon => {
      console.log(pokemon)  // -------------------- ritorna name + url
      return filterType.every(f => {
        if (f.filter === 'type') {
          // pokemon.types è un array di oggetti { name: 'fire' } → controlliamo se include il tipo selezionato
          return pokemon.types.some(t => t.name === f.value);
        }
        // altri filtri eventualmente
        return true;
      });
    });

    setPokemonSearched(filtered);
  };



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


      {/* ------------------------------------------------  filtri */}
      <div className="filters-container">

        {/* BTN: aggiungi/chiudi */}
        <button
          className={`button add-filters ${filtersOpened ? 'close' : ''}`}
          onClick={() => setFiltersOpened(prev => !prev)}
        >
          <span>Add filters</span>
          <BsPlus />
        </button>

        <div className={`filters ${filtersOpened ? 'open' : ''}`} >
          {/* Select  */}
          <ul >
            <li>
              <fieldset className="filter-group">
                <legend>Pokémon type</legend>
                {pokemonTypes.map((type, index) => (
                  <label key={index}>
                    <input
                      type="checkbox"
                      name="type"
                      value={type.name}
                      onChange={handleChange}
                      checked={filterType.some(f => f.filter === 'type' && f.value === type.name)}
                    />
                    {type.name}
                  </label>
                ))}
              </fieldset>
            </li>
          </ul>

          {/* BTN: applica */}
          <button
            className='button'
            onClick={applyFilters}
          >
            <span>Apply</span>
          </button>

          <div className="applied-filters badge-list">
            {filterType.map((filter, i) => (
              <div key={i} className="badge">
                {filter.value}
                <BsX onClick={() => removeFilter(filter)} />
              </div>
            ))}
          </div>
        </div>


        {/* colors */}
        {/* isLegendary */}
        {/* reset */}
      </div>


      {/* risultati */}
      {pokemonSearched.length > 0 &&
        <section id="searched">
          <h2>Results: {pokemonSearched.length}</h2>
          <PokemonList pokemonListProp={pokemonSearched} limit={10} />
        </section>
      }
    </>
  )
}

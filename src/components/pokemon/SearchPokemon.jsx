import { useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import PokemonList from "./PokemonList";
import { BsPlus, BsX } from "react-icons/bs";
import { pokemonTypes } from "../../data/pokemonTypes";
import { fetchPage } from "../../utils/api";

export default function SearchPokemon({ setSearch, setFilters, setError, setLoader }) {
  const inputField = useRef();
  const [input, setInput] = useState('');
  const [filtersOpened, setFiltersOpened] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [scrollY, setScrollY] = useState(window.scrollY);

  useEffect(() => {
    if (input.length < 3) setSearch('');
    else setSearch(input);
  }, [input]);

  const handleInputCollapse = () => inputField.current?.classList.toggle('collapse'); // collapse search bar



  // ------------------------------------------------------
  //                     FILTRI
  // ------------------------------------------------------


  /* const [filters, setFilters] = useState({}); */
  /* 
    {
      generations: [1, 2, 3],
      is_legendary: true,
      types: [bug, ghost]
    }
  */
  const [filterType, setFilterType] = useState([]); // types
  const [totalCount, setTotalCount] = useState(0);  // n tot risultati

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    setFilterType(prev => {
      if (checked) {
        return [...prev, value];
      } else {
        return prev.filter(f => !(f === value));
      }
    })
  }

  const removeFilter = (element) => {
    const newFilters = filterType.filter(f => f !== element);
    setFilterType(newFilters);
  }

  useEffect(() => {
    console.log('Filters updated:', filterType);
  }, [filterType]);

  const applyFilters = async () => {
    const filters = {
      types: filterType
    }
    setFilters(filters);
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
                      checked={filterType.some(f => f === type.name)}
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
                {filter}
                <BsX onClick={() => removeFilter(filter)} />
              </div>
            ))}
          </div>
        </div>


        {/* colors */}
        {/* isLegendary */}
        {/* reset */}
      </div>
    </>
  )
}

import { useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { BsPlus, BsX } from "react-icons/bs";
import { pokemonTypes } from "../../data/pokemonTypes";
import { formatString } from "../../utils/string";

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



  const [filtersToApply, setFiltersToApply] = useState();

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    setFiltersToApply(prev => {
      const next = { ...prev };

      switch (name) {
        case 'is_legendary':
          if (checked) next.is_legendary = true;
          else delete next.is_legendary;
          break;

        case 'type': {
          const types = new Set(next.types || []);
          types.has(value) ? types.delete(value) : types.add(value);
          types.size ? next.types = [...types] : delete next.types;
          break;
        }

        case 'generation': {
          const gens = new Set(next.generations || []);
          gens.has(value) ? gens.delete(value) : gens.add(value);
          gens.size ? next.generations = [...gens] : delete next.generations;
          break;
        }

        default:
          break;
      }

      return Object.keys(next).length ? next : {};
    });
  };


  const applyFilters = () => setFilters(filtersToApply || {});

  const removeFilter = (key, valueToRemove) => {
    setFiltersToApply(prev => {
      if (!prev) return prev;
      const next = { ...prev };

      console.log('NEXT', next)

      if (Array.isArray(next[key])) {
        next[key] = next[key].filter(v => v !== valueToRemove);
        if (!next[key].length) delete next[key];
      } else {
        delete next[key];
      }

      return Object.keys(next).length ? next : undefined;
    });
  };


  const resetAll = () => {
    setFilters([]);
    setFiltersToApply({});
    setSearch('');
  }

  const FilterBadge = ({ filter, onRemove }) => (
    <div className="badge">
      {filter}
      <BsX onClick={() => onRemove(filter)} />
    </div>
  );



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
          id="add-filters"
          className={`button ${filtersOpened ? 'close' : ''}`}
          onClick={() => setFiltersOpened(prev => !prev)}
        >
          <span>Add filters</span>
          <BsPlus />
        </button>

        <div className={`filters ${filtersOpened ? 'open' : ''}`} >
          {/* Select  */}
          <ul>
            <li>
              <h3>Pokémon Types</h3>
              <div className="filter-group">
                {pokemonTypes.map((type, index) => (
                  <label key={index} className="filter">
                    <input
                      type="checkbox"
                      name="type"
                      value={type.name}
                      onChange={handleChange}
                      checked={Array.isArray(filtersToApply?.types) && filtersToApply.types.includes(type.name)}
                    />
                    {type.name}
                  </label>

                ))}
              </div>
            </li>

            <li>
              <h3>Is Legendary</h3>
              <div className="filter-group">
                <label className="filter">
                  <input
                    type="checkbox"
                    name="is_legendary"
                    onChange={handleChange}
                    checked={!!filtersToApply?.is_legendary}
                  />
                  Is legendary
                </label>
              </div>
            </li>
          </ul>

          {/* ---------- BTN ----------- */}

          <div id="apply-reset-group-btn">
            {/* BTN: applica */}
            <button
              id="apply-filters-btn"
              className='button'
              onClick={applyFilters}
              disabled={!filtersToApply}
            >
              <span>Apply Filters</span>
            </button>
            {/* BTN: reset */}
            <button
              id="reset-all-btn"
              className='button'
              onClick={resetAll}
              disabled={!filtersToApply}
            >
              <span>Reset All</span>
            </button>
          </div>

          {/* Filtri applicati */}
          {/* Filtri applicati */}
          <div className="applied-filters badge-list">
            {filtersToApply &&
              Object.entries(filtersToApply).map(([key, value]) =>
                Array.isArray(value)
                  ? value.map((v, i) => (
                    <FilterBadge key={`${key}-${v}-${i}`} filter={v} onRemove={() => removeFilter(key, v)} />
                  ))
                  : <FilterBadge key={key} filter={String(formatString(key))} onRemove={() => removeFilter(key)} />
              )
            }
          </div>


        </div>


        {/* colors */}
        {/* isLegendary */}
        {/* reset */}
      </div>
    </>
  )
}

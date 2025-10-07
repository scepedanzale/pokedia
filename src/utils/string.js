

// iniziale maiuscola per ogni parola e spazio tra i nomi
export const formatPokemonName = (pokemonName) => {
  if (pokemonName) {
    const array = [];
    const splitName = pokemonName.split('-')
    splitName.map((word) => {
      const firstLetter = word.slice(0, 1);
      const firstLetterCap = firstLetter.toUpperCase();
      const newPokemonName = firstLetterCap + word.slice(1);
      array.push(newPokemonName);
    })
    const finalName = array.join(' ');
    return finalName;
  }
}

// sostituisce -_ con spazio e rende la prima lettera maiuscola
export const formatString = (input) => {
  if (!input) return '';
  return input
    .replace(/[_-]/g, ' ')                    // underscore → spazio
    .toLowerCase()                         // tutto minuscolo
    .replace(/^\w/, c => c.toUpperCase()); // prima lettera maiuscola
}

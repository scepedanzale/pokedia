
// numeri di pokemon
export const formatPokemonId = (id) => {
  if (id < 10) {
    return `000${id}`
  } else if (id < 100) {
    return `00${id}`
  } else if (id < 1000) {
    return `0${id}`
  } else {
    return id
  }
}

// calcolo statistiche
export const calculateStatsPercentage = (value) => {
  const result = (value * 100) / 255;
  return Math.trunc(result);
}

// probabilità genere
export const formatGenderRate = (num) => {
  switch (num) {
    case 0:
      return 'female 0% male 100%';
    case 1:
      return 'female 12.5% male 87.5%';
    case 2:
      return 'female 25% male 75%';
    case 3:
      return 'female 37.5% male 62.5%';
    case 4:
      return 'female 50% male 50%';
    case 5:
      return 'female 62.5% male 37.5%';
    case 6:
      return 'female 75% male 25%';
    case 7:
      return 'female 87.5% male 12.5%';
    case 8:
      return 'female 100% male 0%';
    case -1:
      return 'genderless';
    default:
      break;
  }
}


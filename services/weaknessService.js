const weaknessTable = {
  normal: ["rock", "ghost", "steel"],
  fighting: ["flying", "poison", "psychic", "bug", "ghost", "fairy"],
  flying: ["rock", "steel", "electric"],
  poison: ["poison", "ground", "rock", "ghost", "steel"],
  ground: ["flying", "bug", "grass"],
  rock: ["fighting", "ground", "steel"],
  bug: ["fighting", "flying", "poison", "ghost", "steel", "fire", "fairy"],
  ghost: ["normal", "dark"],
  steel: ["steel", "fire", "water", "electric"],
  fire: ["rock", "fire", "water", "dragon"],
  water: ["water", "grass", "dragon"],
  grass: ["flying", "poison", "bug", "steel", "fire", "grass", "dragon"],
  electric: ["ground", "grass", "electric", "dragon"],
  psychic: ["steel", "psychic", "dark"],
  ice: ["steel", "fire", "water", "ice"],
  dragon: ["steel", "fairy"],
  fairy: ["poison", "steel", "fire"],
  dark: ["fighting", "dark", "fairy"],
};

const getWeaknesses = (types) => {
  const weaknesses = [
    ...new Set([].concat(...types.map((e) => weaknessTable[e]))),
  ];
  return weaknesses;
};

export { getWeaknesses };

import { asyncPipe, pipe } from "@/utils/Functional";
import { encodePokemonId, encodePokemonName } from "@/utils/Text";
import { getWeaknesses } from "./weaknessService";

const getPokemons = async (filterBy = "", sortBy = "ID_ASC", page = 1) => {
  const pokemons = await fetchAllPokemon();
  const data = await asyncPipe(
    (e) => filter(e, filterBy),
    (e) => sort(e, sortBy),
    (e) => paginate(e, page)
  )(pokemons);
  return data;
};

const fetchAllPokemon = async () => {
  const listRes = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1281");
  const listData = await listRes.json();
  return listData.results.map((e) => {
    const parts = e.url.split("/");
    const lastSegment = parts.pop() || parts.pop();
    return {
      id: parseInt(lastSegment),
      name: e.name,
    };
  });
};

const filter = (pokemons, filter) => {
  return pokemons.filter(
    (pokemon) =>
      pokemon.id.toString().includes(filter) ||
      encodePokemonName(pokemon.name)
        .toLowerCase()
        .includes(filter.toLowerCase()) ||
      encodePokemonId(pokemon.id).includes(filter)
  );
};

const sort = (pokemons, sortBy) => {
  const comparator = {
    NAME_ASC: (a, b) => a.name.localeCompare(b.name),
    NAME_DSC: (a, b) => b.name.localeCompare(a.name),
    ID_ASC: (a, b) => a.id - b.id,
    ID_DSC: (a, b) => b.id - a.id,
  }[sortBy];
  pokemons.sort(comparator);
  return pokemons;
};

const paginate = (pokemons, page) => {
  const pageSize = 10;
  const pageCount = Math.floor(pokemons.length / pageSize) + 1;
  return {
    pageCount: pageCount,
    data: pokemons.slice((page - 1) * pageSize, page * pageSize),
  };
};

const getAllPokemonDetails = async (ids) => {
  return await Promise.all(ids.map(getPokemonDetails));
};

const getPokemonDetails = async (id) => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon/" + id);
  const data = await res.json();
  return {
    id: data.id,
    tag: data.name,
    name: encodePokemonName(data.name),
    height: data.height,
    weight: data.weight,
    abilities: data.abilities.map((e) => e.ability.name),
    photo:
      data.sprites.other["official-artwork"].front_default ||
      data.sprites.front_default,
    types: data.types.map((f) => f.type.name),
    stats: {
      hp: parseInt(data.stats[0].base_stat),
      attack: parseInt(data.stats[1].base_stat),
      defense: parseInt(data.stats[2].base_stat),
      specialAttack: parseInt(data.stats[3].base_stat),
      specialDefense: parseInt(data.stats[4].base_stat),
      speed: parseInt(data.stats[5].base_stat),
    },
    weaknesses: getWeaknesses(data.types.map((f) => f.type.name)),
  };
};

const getAdjacent = async (id, filterBy, sortBy) => {
  if (id == null) {
    return {
      previous: 0,
      next: 0,
    };
  }
  const pokemons = await pipe(
    (e) => filter(e, filterBy),
    (e) => sort(e, sortBy)
  )(await fetchAllPokemon());

  const index = pokemons.findIndex((e) => e.id === id);
  return {
    previous: index - 1 >= 0 && pokemons[index - 1].id,
    next: index + 1 < pokemons.length && pokemons[index + 1].id,
  };
};

export { getPokemons, getPokemonDetails, getAdjacent };

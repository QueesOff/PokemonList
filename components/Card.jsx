import {
  encodePokemonId,
  encodePokemonName,
} from "@/utils/Text";
import React, { useEffect } from "react";
import TypePill from "./TypePill";
import { getPokemonDetails } from "@/services/pokemonService";
import useAsyncData from "@/utils/useAsyncData";
import Loading from "./Loading";

export default function Card({ id, onClick }) {
  const data = useAsyncData(getPokemonDetails);
  const pokemon = data.data;
  useEffect(() => {
    if (id !== null) {
      data.request(id);
    }
  }, [id]);
  return (
    <div
      className="pokemon flex flex-col w-[230px] max-w-[230px] min-h-[300px] items-center bg-white rounded-lg p-4 hover:-translate-y-2 transition-all hover:shadow-lg cursor-pointer z-0"
      id={id}
      name={name}
      onClick={onClick}
    >
      {data.loading && (
        <div className="m-auto">
          <Loading />
        </div>
      )}
      {data.data && (
        <>
          <img
            src={pokemon.photo || "./pokemon-icon.png"}
            alt={`Image of ${pokemon.name}`}
            className="photo w-full h-auto mb-4 bg-slate-100 rounded-lg p-4"
            width="200"
            height="200"
          />
          <div className="flex flex-col items-center mb-2 text-center">
            <p className="id font-medium text-xs m-0">{encodePokemonId(id)}</p>
            <p className="name font-semibold text-xl m-0">
              {encodePokemonName(pokemon.name)}
            </p>
          </div>

          <div className="types flex flex-row gap-4 ">
            {pokemon.types.map((type) => (
              <TypePill type={type} key={type} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

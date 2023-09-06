import { typeColorMapping } from "@/utils/Colors";
import { encodePokemonId, encodePokemonName, toTitleCase } from "@/utils/Text";
import { GrClose, GrNext, GrPrevious } from "react-icons/gr";
import React, { useEffect } from "react";
import TypePill from "./TypePill";
import StatBar from "./StatBar";
import useAsyncData from "@/utils/useAsyncData";
import { getPokemonDetails } from "@/services/pokemonService";
import Loading from "./Loading";

export default function PokemonDetails({ id, setId, previous, next, onClose }) {
  const data = useAsyncData(getPokemonDetails);
  const details = data.data;
  useEffect(() => {
    if (id !== null) {
      data.request(id);
    }
  }, []);

  useEffect(() => {
    if (id !== null) {
      data.request(id);
    }
  }, [id]);

  return (
    <div
      className="pokemonDetails fixed w-full h-full top-0 left-0 flex flex-col justify-center items-center bg-black/25 z-10"
      onClick={(e) => {
        onClose();
      }}
    >
      <div className="flex flex-row items-center gap-10">
        {previous && (
          <div
            onClick={(e) => {
              setId(previous);
              e.stopPropagation();
            }}
            className="previous h-14 w-14 bg-white items-center justify-center rounded-full hover:-translate-y-1 transition-transform cursor-pointer hidden sm:flex"
          >
            <GrPrevious />
          </div>
        )}
        <div
          className=" sm:w-[600px] relative bg-white mx-auto flex flex-col  rounded-lg shadow-lg z-20 max-h-screen overflow-y-auto my-4"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-red-50 rounded-full w-8 h-8 hover:-translate-y-1 transition-all flex items-center justify-center"
          >
            <GrClose />
          </button>
          {data.loading && (
            <div className="w-full flex justify-center my-4">
              <Loading />
            </div>
          )}
          {data.data && (
            <div>
              <div
                className="flex"
                style={{ backgroundColor: typeColorMapping[details.types[0]] }}
              >
                <img
                  src={details.photo || "./pokemon-icon.png"}
                  className="w-[200px] mx-auto p-4"
                />
              </div>
              <div className="p-8 pt-4 flex flex-col gap-6">
                <div className="info flex flex-col items-center">
                  <p className="mb-2 text-center">
                    <span className="text-2xl font-bold name">
                      {encodePokemonName(details.name)}{" "}
                    </span>
                    <span className="font-medium id">
                      {encodePokemonId(details.id)}
                    </span>
                  </p>
                  <div className="types flex flex-row gap-4">
                    {details.types.map((type) => (
                      <TypePill type={type} key={type} />
                    ))}
                  </div>
                </div>
                <div className="">
                  <p className="font-semibold text-lg mb-3">Инфо</p>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row">
                      <div className="w-24">Высота:</div>{" "}
                      <div className="font-semibold height">
                        {details.height} dm
                      </div>
                    </div>
                    <div className="flex flex-row">
                      <div className="w-24">Ширина:</div>{" "}
                      <div className="font-semibold weight">
                        {details.weight} hg
                      </div>
                    </div>
                    <div className="flex flex-row">
                      <div className="w-24">Магия:</div>{" "}
                      <div className="font-semibold">
                        {details.abilities.map(toTitleCase).join(", ")}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-lg mb-3">Базовая статистика</p>
                  <div className="flex flex-col gap-2 stats">
                    <StatBar name="hp" label="Жизни" value={details.stats.hp} />
                    <StatBar
                      name="attack"
                      label="Атака"
                      value={details.stats.attack}
                    />
                    <StatBar
                      name="defense"
                      label="Защита"
                      value={details.stats.defense}
                    />
                    <StatBar
                      name="specialAttack"
                      label="СП. Атака"
                      value={details.stats.specialAttack}
                    />
                    <StatBar
                      name="specialDefense"
                      label="СП. защита"
                      value={details.stats.specialDefense}
                    />

                    <StatBar
                      name="speed"
                      label="Скорость"
                      value={details.stats.speed}
                    />
                  </div>
                </div>

                <div className="weaknesses">
                  <p className="font-semibold text-lg mb-3">Слабости</p>
                  <div className="flex gap-2 flex-wrap justify-center sm:justify-start">
                    {details.weaknesses.map((weakness) => (
                      <TypePill type={weakness} key={weakness} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          {data.error && <div className="h-20 w-20">Ошибка: {data.error}</div>}
        </div>
        {next && (
          <div
            onClick={(e) => {
              setId(next);
              e.stopPropagation();
            }}
            className="next h-14 w-14 bg-white items-center justify-center rounded-full hover:-translate-y-1 transition-transform cursor-pointer hidden sm:flex"
          >
            <GrNext />
          </div>
        )}
      </div>
    </div>
  );
}

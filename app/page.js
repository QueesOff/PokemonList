"use client";
import Sort from "@/components/Sort";
import { useEffect, useState } from "react";
import SearchFilter from "@/components/SearchFilter";
import PokemonDetails from "@/components/PokemonDetails";
import PokemonList from "@/components/PokemonList";
import { getAdjacent } from "@/services/pokemonService";
import { AiFillGithub } from "react-icons/ai"
import Link from "next/link";

export default function Home() {
  const [sortBy, setSortBy] = useState("ID_ASC");
  const [filterBy, setFilterBy] = useState("");
  const [detailsOpened, setDetailsOpened] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [adjacent, setAdjacent] = useState(null);

  useEffect(() => {
    const update = async () => {
      setAdjacent(await getAdjacent(selectedId, filterBy, sortBy));
    };
    update();
  }, [selectedId]);

  function reset() {
    setSortBy("ID_ASC");
    setFilterBy("");
  }

  return (
    <div className="bg-slate-100 w-full h-full min-h-[110vh] main-content">
      <div className="max-w-screen-xl mx-auto px-4 ">
        <div
          className="flex flex-row py-6 items-center gap-3 cursor-pointer"
          onClick={reset}
        >
          <img src="/pokemon.png" className="h-10 w-auto" />
          <p className="text-4xl font-bold">PokeAPI</p>
          <Link href="https://github.com/QueesOff/TestWork">
            <AiFillGithub className="text-5xl"/>
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row mb-4 gap-4">
          <SearchFilter onSubmit={setFilterBy} />
          <div className="sm:ml-auto">
            <Sort selected={sortBy} onSortSelected={setSortBy} />
          </div>
        </div>
        {detailsOpened && (
          <div className="z-10">
            <PokemonDetails
              id={selectedId}
              setId={setSelectedId}
              next={adjacent.next}
              previous={adjacent.previous}
              onClose={() => setDetailsOpened(false)}
            />
          </div>
        )}
        <PokemonList
          sortBy={sortBy}
          filterBy={filterBy}
          setSelectedId={(id) => {
            setSelectedId(id);
            setDetailsOpened(true);
          }}
        />
      </div>
    </div>
  );
}

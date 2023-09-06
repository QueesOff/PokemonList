import React, { useState } from "react";

export default function SearchFilter({ onSubmit }) {
  const [searchText, setSearchText] = useState();

  function reset() {
    setSearchText("");
    onSubmit("");
  }
  
  return (
    <div className="flex flex-row gap-3 items-center">
      <div className="relative">
        <input
          type="text"
          className="search rounded py-2 px-4 text-lg w-full sm:w-80"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Имя покемона или ID"
        />
        <button
          type="button"
          className="absolute right-3 top-0 h-full hidden sm:flex"
          onClick={reset}
        >
          <p className="my-auto text-slate-500">Очистить</p>
        </button>
      </div>

      <button
        className="submit-search bg-red-500 py-2 px-4 rounded text-white"
        type="button"
        onClick={() => onSubmit(searchText)}
      >
        Поиск
      </button>
    </div>
  );
}

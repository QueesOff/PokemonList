import React from "react";

export default function Sort({ selected, onSortSelected }) {
  return (
    <div className="flex gap-3 items-center border">
      <select
        className="sort rounded py-2 px-4 text-lg flex-grow"
        onChange={(e) => onSortSelected(e.currentTarget.value)}
        selected={selected}
      >
        <option value="ID_ASC">По убыванию</option>
        <option value="ID_DSC">По возрастанию</option>
        <option value="NAME_ASC">A до Z</option>
        <option value="NAME_DSC">Z до A</option>
      </select>
    </div>
  );
}

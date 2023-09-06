import { statColorMapping } from "@/utils/Colors";
import React from "react";

export default function StatBar({ name, label, value }) {
  const width = (value / 255) * 100 + "%";
  return (
    <div className="flex flex-row items-center gap-8">
      <p className="w-24">{label}</p>
      <p className="font-semibold stat w-12 text-center" id={name}>
        {value}
      </p>
      <div className="flex-grow">
        <div className="w-100 h-2 bg-slate-400 rounded-lg">
          <div
            className="rounded-lg h-2"
            style={{ width: width, backgroundColor: statColorMapping[name] }}
          />
        </div>
      </div>
    </div>
  );
}

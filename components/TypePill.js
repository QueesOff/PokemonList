import { typeColorMapping } from "@/utils/Colors";
import { getContrastTextColor, toTitleCase } from "@/utils/Text";
import React from "react";

export default function TypePill({ type }) {
  return (
    <div
      className="w-24 border-2 py-1 px-2 rounded-lg text-center"
      style={{ backgroundColor: typeColorMapping[type] }}
    >
      <p style={{ color: getContrastTextColor(typeColorMapping[type]) }}>
        {toTitleCase(type)}
      </p>
    </div>
  );
}

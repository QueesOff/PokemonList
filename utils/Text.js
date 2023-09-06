function toTitleCase(str) {
  return str.toLowerCase().replace(/(^|\s)\w/g, function (letter) {
    return letter.toUpperCase();
  });
}

function encodePokemonName(name) {
  const nameParts = name.split("-");
  const primaryName = toTitleCase(nameParts[0]);
  if (nameParts.length == 1) {
    return primaryName;
  }

  const details = toTitleCase(nameParts.slice(1).join(" "));
  return primaryName + " (" + details + ")";
}

function encodePokemonId(id) {
  return "#" + String(id).padStart(4, "0");
}

function getContrastTextColor(backgroundColor) {
  // Преобразование цвет фона в его компоненты RGB
  let rgb = backgroundColor.match(/\d+/g);
  let red = parseInt(rgb[0]);
  let green = parseInt(rgb[1]);
  let blue = parseInt(rgb[2]);

  // Вычислите относительную яркость цвета фона
  let luminance = (red * 0.299 + green * 0.587 + blue * 0.114) / 255;

  // Определите подходящий цвет текста на основе яркости
  if (luminance > 0.5) {
    return "black"; // Используйте черный текст для светлого фона
  } else {
    return "white"; // Используйте белый текст для темного фона
  }
}

export { toTitleCase,encodePokemonId, encodePokemonName, getContrastTextColor };

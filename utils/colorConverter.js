exports.rgbToHexConverter = (rgbColor) => {
  const { r, g, b } = rgbColor || {};
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

exports.hextToRgbConverter = (hexColor) => {
  const hex = hexColor.replaceAll("#", "");
  console.log(hex)
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const a = parseInt(hex.substring(6, 8), 16) ?? 1;

  return { r, g, b };
}

export const backgroundMapConfig = {
  type: "raster",
  tiles: [
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
  ],
  tileSize: 256,
  attribution: "OSM"
};

export const itemsLayerFill = {
  "fill-color": "#0080ff",
  "fill-opacity": 0.25,
};

export const itemsLayerOutline = {
  "line-color": "#0080ff",
  "line-width": 1,
};

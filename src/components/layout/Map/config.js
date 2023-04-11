export const backgroundMapConfig = {
  type: "raster",
  tiles: [
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
  ],
  tileSize: 256,
  attribution: "Background tiles: © <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap contributors</a>"
};

export const itemsLayerFill = {
  "fill-color": [
    "case",
    ["boolean", ["feature-state", "selected"], false],
    "#38A169",
    "#0080ff"
  ],
  "fill-opacity": [
    "case",
    ["boolean", ["feature-state", "hover"], false],
    0.5,
    0.25
  ]
};

export const itemsLayerOutline = {
  "line-color": [
    "case",
    ["boolean", ["feature-state", "selected"], false],
    "#38A169",
    "#0080ff"
  ],
  "line-width": [
    "case",
    ["boolean", ["feature-state", "selected"], false],
    2,
    1
  ],
};

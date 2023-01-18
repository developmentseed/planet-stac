import React from "react";
import T from "prop-types";

import { Map as GenericMap, Source, Layer } from "../shared/Map";
import { stac } from "../../types";

const backgroundMapConfig = {
  type: "raster",
  tiles: [
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
  ],
  tileSize: 256,
  attribution: "OSM"
};

const itemsLayerFill = {
  "fill-color": "#0080ff",
  "fill-opacity": 0.25,
};

const itemsLayerOutline = {
  "line-color": "#0080ff",
  "line-width": 1,
};

function Map({ results }) {
  return (
    <GenericMap>
      <Source id="background" config={backgroundMapConfig}>
        <Layer id="background-tiles" type="raster" />
      </Source>
      {results?.features.length > 0 && (
        <Source 
          id="items"
          config={{
            type: "geojson",
            data: results
          }}
        >
          <Layer id="items-layer-fill" type="fill" paint={itemsLayerFill} />
          <Layer id="items-layer-outline" type="line" paint={itemsLayerOutline} />
        </Source>
      )}
    </GenericMap>
  );
}

Map.propTypes = {
  results: T.shape({
    features: T.arrayOf(stac.Item).isRequired
  }),
};

export { Map };

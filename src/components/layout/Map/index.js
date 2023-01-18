import React from "react";
import T from "prop-types";

import { Map as GenericMap, Source, Layer } from "../shared/Map";
import { stac } from "../../types";
import { backgroundMapConfig, itemsLayerFill, itemsLayerOutline } from "./config";

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

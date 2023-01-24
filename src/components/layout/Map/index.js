import React, { useMemo } from "react";
import T from "prop-types";
import getBbox from "@turf/bbox";

import { Map as GenericMap, Source, Layer } from "../../shared/Map";
import { stac } from "../../../types";
import {
  backgroundMapConfig,
  itemsLayerFill,
  itemsLayerOutline,
} from "./config";
import { DrawBbox } from "../../shared/Map/Control/DrawBbox";

// MapLibre doesn't preserve IDs so we're adding the ID
// to the properties so we can identify the items for user interactions.
const addIdToProperties = (feature) => {
  if (feature.properties.id) return feature;

  return {
    ...feature,
    properties: {
      ...feature.properties,
      id: feature.id
    }
  };
};

function Map({ results, highlightItem, setHighlightItem, isBboxDrawEnabled, setBbox, bbox }) {
  const items = useMemo(() => {
    if (!results) return results;
    return {
      ...results,
      features: results.features.map(addIdToProperties)
    };
  }, [results]);

  const bounds = useMemo(() => {
    if (!results) return;
    return getBbox(results);
  }, [results]);

  return (
    <GenericMap bounds={bounds}>
      <Source id="background" config={backgroundMapConfig}>
        <Layer id="background-tiles" type="raster" />
      </Source>
      {items?.features.length > 0 && (
        <Source 
          id="items"
          config={{
            type: "geojson",
            data: items
          }}
        >
          <Layer
            id="items-layer-fill"
            type="fill"
            paint={itemsLayerFill}
            onMouseOver={(e) => setHighlightItem(e.features[0].properties.id)}
            onMouseOut={() => setHighlightItem()}
            highlightFeature={highlightItem}
          />
          <Layer id="items-layer-outline" type="line" paint={itemsLayerOutline} />
        </Source>
      )}
      <DrawBbox isEnabled={isBboxDrawEnabled} handleDrawComplete={setBbox} bbox={bbox} />
    </GenericMap>
  );
}

Map.propTypes = {
  results: T.shape({
    features: T.arrayOf(stac.Item).isRequired
  }),
  highlightItem: T.string,
  setHighlightItem: T.func.isRequired,
  isBboxDrawEnabled: T.bool,
  setBbox: T.func.isRequired,
  bbox: T.arrayOf(T.number)
};

export { Map };

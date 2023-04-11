import { useEffect, useState, useRef } from "react";
import T from "prop-types";

function Layer({ id, map, source, type, layout, paint, onMouseOver, onMouseOut, onClick, highlightFeature }) {
  const [mapLayer, setMapLayer] = useState();
  const highlightFeatureRef = useRef(highlightFeature);
  useEffect(
    () => {
      if (highlightFeatureRef.current) {
        // Remove the highlight from the existing highlighted feature
        map.setFeatureState(
          { source, id: highlightFeatureRef.current },
          { hover: false }
        );
      }
      if (highlightFeature) {
        // Add the highlight the newly highlighted feature
        map.setFeatureState(
          { source, id: highlightFeature },
          { hover: true }
        );
      }
      highlightFeatureRef.current = highlightFeature;
    },
    [highlightFeature, map, source]
  );

  useEffect(() => {
    if (map.getLayer(id)) return;

    const config = {
      id,
      type,
      source,
      layout,
      paint
    };
    const l = map.addLayer(config);
    setMapLayer(l);

    if (onMouseOver) {
      map.on(
        "mousemove",
        id,
        (e) => {
          if (e.features.length > 0) {
            map.getCanvas().style.cursor = "pointer";
            onMouseOver(e);
          }
        }
      );
    }
    if (onMouseOut) {
      map.on(
        "mouseleave",
        id,
        (e) => {
          map.getCanvas().style.cursor = "";
          onMouseOut(e);
        }
      );
    }
    if (onClick) {
      map.on("click", id, onClick);
    }

    return () => {
      if (mapLayer) {
        map.removeLayer(id);
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}

Layer.propTypes = {
  id: T.string.isRequired,
  type: T.string.isRequired,
  layout: T.object,
  paint: T.object,
  source: T.string,
  map: T.object,
  onMouseOver: T.func,
  onMouseOut: T.func,
  onClick: T.func,
  highlightFeature: T.string,
};

Layer.defaultProps = {
  layout: {},
  paint: {},
};

export default Layer;

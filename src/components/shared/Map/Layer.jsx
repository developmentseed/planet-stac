import { useEffect, useState } from "react";
import T from "prop-types";

function Layer({ id, map, source, type, layout, paint}) {
  const [mapLayer, setMapLayer] = useState();

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

    return () => {
      if (mapLayer) {
        map.removeLayer(id);
      }
    };
  }, []);

  return null;
}

Layer.propTypes = {
  id: T.string.isRequired,
  type: T.string.isRequired,
  layout: T.object,
  paint: T.object,
  source: T.string,
  map: T.object,
};

Layer.defaultProps = {
  layout: {},
  paint: {}
};

export default Layer;

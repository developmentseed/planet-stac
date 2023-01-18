import { useEffect, useState } from "react";
import T from "prop-types";

function Layer({ id, map, source, type }) {
  const [mapLayer, setMapLayer] = useState();

  useEffect(() => {
    if (map.getLayer(id)) return;

    const config = {
      id,
      type,
      source,
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
  source: T.string,
  type: T.string,
  map: T.object,
};

export default Layer;

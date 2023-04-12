import React, { useRef, useEffect } from "react";
import T from "prop-types";
import maplibregl from "maplibre-gl";
import { Box } from "@chakra-ui/react";

import "maplibre-gl/dist/maplibre-gl.css";

function Map({ center, zoom, bounds, children }) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return;
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      center: center,
      zoom: zoom,
      style: {version: 8,sources: {},layers: []}
    });
  });

  useEffect(() => {
    if (!map.current || !bounds) return;
    map.current.fitBounds(bounds, { padding: 50 });
  }, [bounds]);

  return (
    <Box
      ref={mapContainer}
      id="map"
      backgroundColor="gray.300"
      position="absolute"
      top="0"
      left="0"
      right="0"
      bottom="0"
      overflow="hidden"
    >
      {map.current && children && React.Children.map(
        children,
        (child) => {
          return child && React.cloneElement(child, { map: map.current });
        }
      )}
    </Box>
  );
}

Map.propTypes = {
  children: T.node,
  center: T.arrayOf(T.number),
  zoom: T.number,
  bounds: T.arrayOf(T.number),
};

Map.defaultProps = {
  center: [0, 0],
  zoom: 0
};

export default Map;

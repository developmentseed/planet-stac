import { useCallback, useEffect, useRef } from "react";
import T from "prop-types";

import MapboxDraw from "@mapbox/mapbox-gl-draw";
import StaticMode from "@mapbox/mapbox-gl-draw-static-mode";
import DrawRectangle from "mapbox-gl-draw-rectangle-mode";

const addDrawControl = (map, drawingCompleted) => {
  const { modes } = MapboxDraw;

  const options = {
    modes: {
      ...modes,
      draw_rectangle: DrawRectangle,
      static: StaticMode
    },
    boxSelect: false,
    displayControlsDefault: false,
  };
  const draw = new MapboxDraw(options);
  map.addControl(draw);
  map.on("draw.create", (e) => {
    const { features } = e;
    const feature = features[0];
    map.getCanvas().style.cursor = "";
    setTimeout(() => draw.changeMode("static"), 0);
    drawingCompleted(feature);
  });
  return draw;
};

function DrawBbox({ map, handleDrawComplete, isEnabled, bbox }) {
  const drawControlRef = useRef();

  // Callback when drawing is finished. Receives a feature and returns
  // its bounding box. With this control users can only draw squares
  // so the simple method is sufficient. 
  const handleDraw = useCallback((feature) => {
    const { coordinates } = feature.geometry;
    const bbox = [...coordinates[0][0], ...coordinates[0][2]];
    handleDrawComplete(bbox);
  }, [handleDrawComplete]);

  useEffect(() => {
    if (map && !drawControlRef.current) {
      drawControlRef.current = addDrawControl(map, handleDraw);
    }
  }, [map, handleDraw]);

  useEffect(() => {
    if (isEnabled) {
      drawControlRef.current.deleteAll();
      drawControlRef.current.changeMode("draw_rectangle");
      map.getCanvas().style.cursor = "crosshair";
    }
  }, [isEnabled, map]);

  useEffect(() => {
    if (!bbox) {
      drawControlRef.current.deleteAll();
    }
  }, [bbox]);

  return null;
}

DrawBbox.propTypes ={ 
  map: T.object,
  handleDrawComplete: T.func.isRequired,
  isEnabled: T.bool,
  bbox: T.arrayOf(T.number)
};

export { DrawBbox };

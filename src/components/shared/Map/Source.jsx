import React, {useState, useEffect} from "react";
import T from "prop-types";

function Source({ map, id, config, children }) {
  const [mapSource, setMapSource] = useState(null);

  useEffect(() => {
    if (map.getSource(id)) return;
    const s = map.addSource(id, {...config, promoteId: "id"});
    setMapSource(s);

    return () => {
      React.Children.map(children, (c) => map.getLayer(c.props.id) && map.removeLayer(c.props.id));
      if (config) map.removeSource(id);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const s = map.getSource(id);
    if (!s) return;

    if (config.data) {
      s.setData(config.data);
    }
  }, [config.data, id, map]);

  return (
    <>
      {mapSource &&
        children &&
        React.Children.map(children, (child) =>
          React.cloneElement(child, {
            map: map,
            source: id
          })
        )}
    </>
  );
}

Source.propTypes = {
  children: T.node,
  map: T.object,
  id: T.string.isRequired,
  config: T.object.isRequired,
};

export default Source;

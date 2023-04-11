import React, { useMemo } from "react";
import T from "prop-types";

import { Box, Text } from "@chakra-ui/react";
import { useCallback } from "react";

function Item({ id, title, collection, numberAssets, onMouseOver, onMouseOut, highlighted, selectItem, isSelected }) {
  const handleOnClick = useCallback(() => selectItem(id), [id, selectItem]);

  const color = useMemo(() => {
    if (highlighted) return "gray.800";
    if (isSelected) return "white";
    return "gray.800";
  }, [isSelected, highlighted]);

  const backgroundColor = useMemo(() => {
    if (highlighted) return "gray.200";
    if (isSelected) return "green.500";
    return "white";
  }, [isSelected, highlighted]);

  return (
    <Box
      borderTop="1px solid"
      borderColor="gray.200"
      backgroundColor={backgroundColor}
      color={color}
      p="3"
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={handleOnClick}
      _hover={{ cursor: "pointer" }}
    >
      <Text fontWeight="bold">{title || id}</Text>
      <Text>Collection: {collection}</Text>
      <Text>{numberAssets} assets</Text>
    </Box>
  );
}

Item.propTypes = {
  id: T.string.isRequired,
  title: T.string,
  onMouseOver: T.func.isRequired,
  onMouseOut: T.func.isRequired,
  highlighted: T.bool,
  collection: T.string.isRequired,
  numberAssets: T.number.isRequired,
  selectItem: T.func.isRequired,
  isSelected: T.bool,
};

export { Item };

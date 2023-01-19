import React from "react";
import T from "prop-types";

import { Box, Text } from "@chakra-ui/react";

function Item({ id, collection, numberAssets, onMouseOver, onMouseOut, highlighted }) {
  return (
    <Box
      borderTop="1px solid"
      borderColor="gray.200"
      backgroundColor={highlighted ? "gray.200" : "white"}
      p="3"
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      _hover={{
        backgroundColor: "gray.200",
        cursor: "pointer"
      }}
    >
      <Text fontWeight="bold">{id}</Text>
      <Text>Collection: {collection}</Text>
      <Text>{numberAssets} assets</Text>
    </Box>
  );
}

Item.propTypes = {
  id: T.string.isRequired,
  onMouseOver: T.func.isRequired,
  onMouseOut: T.func.isRequired,
  highlighted: T.bool,
  collection: T.string.isRequired,
  numberAssets: T.number.isRequired,
};

export { Item };

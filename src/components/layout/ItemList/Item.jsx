import React from "react";
import T from "prop-types";

import { Box, Text } from "@chakra-ui/react";

function Item({ id }) {
  return (
    <Box borderTop="1px solid" borderColor="gray.200" p="3">
      <Text>{id}</Text>
    </Box>
  );
}

Item.propTypes = {
  id: T.string.isRequired,
};

export { Item };

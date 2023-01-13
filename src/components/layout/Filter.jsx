import React from "react";
import { Flex, Text } from "@chakra-ui/react";

function Filter() {
  return (
    <Flex alignItems="baseline" gap="3">
      <Text fontWeight="bold" mr={3}>Filter:</Text>
    </Flex>
  );
}

export {Filter};

import React from "react";
import { Flex, Button, Text } from "@chakra-ui/react";

function Title() {
  return (
    <Flex alignItems="baseline" gap="3">
      <Text fontSize="2xl" fontWeight="bold" as="h1">Planet Super Dove Catalog</Text>
      <Button variant="link">Change</Button>
    </Flex>
  );
}

export {Title};

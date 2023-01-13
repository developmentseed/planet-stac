import React from "react";
import {
  ChakraProvider,
  Grid,
  GridItem,
  theme,
} from "@chakra-ui/react";

import { Title } from "./components/layout/Title";
import { Filter } from "./components/layout/Filter";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Grid minH="100vh" templateRows="max-content max-content 1fr">
        <GridItem p={3}><Title /></GridItem>
        <GridItem p={3}><Filter /></GridItem>
        <Grid templateColumns="repeat(2, 1fr)">
          <GridItem>Map</GridItem>
          <GridItem>Items</GridItem>
        </Grid>
      </Grid>
    </ChakraProvider>
  );
}

export default App;

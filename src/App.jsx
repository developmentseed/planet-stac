import React, { useState } from "react";
import {
  ChakraProvider,
  Grid,
  GridItem,
  theme,
} from "@chakra-ui/react";

import { Title } from "./components/layout/Title";
import { Filter } from "./components/layout/Filter";

function App() {
  // TODO: replace with useCollections
  const collections = [
    {id: "naruto", title: "Naruto"},
    {id: "sasuke", title: "Sasuke"},
    {id: "kakashi", title: "Kakashi"},
  ];

  // TODO: Replace with useStacSearch
  const [selectedCollections, setCollections] = useState([]);

  // TODO: Replace with useStacSearch
  const [dateRangeFrom, setDateRangeFrom] = useState("");
  const [dateRangeTo, setDateRangeTo] = useState("");

  return (
    <ChakraProvider theme={theme}>
      <Grid minH="100vh" templateRows="max-content max-content 1fr">
        <GridItem p={3} borderBottom="1px solid" borderColor="gray.200"><Title /></GridItem>
        <GridItem px={3} borderBottom="1px solid" borderColor="gray.200">
          <Filter
            collections={{collections, selectedCollections, setCollections}}
            dateRange={{dateRangeFrom, setDateRangeFrom, dateRangeTo, setDateRangeTo}}
          />
        </GridItem>
        <Grid templateColumns="repeat(2, 1fr)">
          <GridItem>Map</GridItem>
          <GridItem>Items</GridItem>
        </Grid>
      </Grid>
    </ChakraProvider>
  );
}

export default App;

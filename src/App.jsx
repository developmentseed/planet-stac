import React, { useCallback, useState } from "react";
import {
  ChakraProvider,
  Grid,
  GridItem,
  theme,
} from "@chakra-ui/react";

import { Title } from "./components/layout/Title";
import { Filter } from "./components/layout/Filter";
import { ItemList } from "./components/layout/ItemList";

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

  // TODO: Replace with useStacSearch
  const nextPage = useCallback(() => {}, []);
  const previousPage = useCallback(() => {}, []);
  const [result, _ ] = useState({
    features: [
      {id: "akljsdkjsad"},
      {id: "smdsnmwnmwn"},
      {id: "euyuwey"},
      {id: "pksaladasd"},
      {id: "opixmwqmwm"},
      {id: "sadopasdskadm"},
      {id: "akljsdkjsad 1"},
      {id: "smdsnmwnmwn 2"},
      {id: "euyuwey 3"},
      {id: "pksaladasd 4"},
      {id: "opixmwqmwm 5"},
      {id: "sadopasdskadm 6"},
      {id: "akljsdkjsad 2"},
      {id: "smdsnmwnmwn 3"},
      {id: "euyuwey 4"},
      {id: "pksaladasd 5"},
      {id: "opixmwqmwm 6"},
      {id: "sadopasdskadm 7"},
    ]
  });
  const loading = true;

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
        <Grid templateColumns="1fr 400px">
          <GridItem>Map</GridItem>
          <GridItem borderLeft="2px solid" borderColor="gray.200" position="relative">
            <ItemList
              nextPage={nextPage}
              previousPage={previousPage}
              result={result}
              loading={loading}
            />
          </GridItem>
        </Grid>
      </Grid>
    </ChakraProvider>
  );
}

export default App;

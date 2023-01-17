import React, { useEffect, useState } from "react";
import {
  ChakraProvider,
  Grid,
  GridItem,
  theme,
} from "@chakra-ui/react";
import { StacApi, useCollections, useStacSearch } from "@developmentseed/stac-react";

import { Header } from "./components/layout/Header";
import { Filter } from "./components/layout/Filter";
import { ItemList } from "./components/layout/ItemList";

function App() {
  const [stacApiUrl, setStacApiUrl] = useState(process.env.REACT_APP_DEFAULT_STAC_API);
  const [stacApi, setStacApi] = useState(new StacApi("https://planetarycomputer.microsoft.com/api/stac/v1"));

  const { collections } = useCollections(stacApi);  
  const {
    collections: selectedCollections,
    setCollections,
    dateRangeFrom,
    setDateRangeFrom,
    dateRangeTo,
    setDateRangeTo,
    nextPage,
    previousPage,
    results,
    state,
    submit
  } = useStacSearch(stacApi);

  useEffect(() => {
    setStacApi(new StacApi("https://planetarycomputer.microsoft.com/api/stac/v1"));
  }, [stacApiUrl]);

  // Automatically submit the search for STAC items
  useEffect(submit, [submit, selectedCollections, dateRangeFrom, dateRangeTo]);

  return (
    <ChakraProvider theme={theme}>
      <Grid minH="100vh" templateRows="max-content max-content 1fr">
        <GridItem p={3} borderBottom="1px solid" borderColor="gray.200">
          <Header
            title="Planet Super Dove Catalog"
            stacApiUrl={stacApiUrl}
            setStacApiUrl={setStacApiUrl}
          />
        </GridItem>
        <GridItem px={3} borderBottom="1px solid" borderColor="gray.200">
          <Filter
            collections={{
              collections: collections?.collections || [],
              selectedCollections: selectedCollections || [],
              setCollections
            }}
            dateRange={{dateRangeFrom, setDateRangeFrom, dateRangeTo, setDateRangeTo}}
          />
        </GridItem>
        <Grid templateColumns="1fr 400px">
          <GridItem>Map</GridItem>
          <GridItem borderLeft="2px solid" borderColor="gray.200" position="relative">
            <ItemList
              nextPage={nextPage}
              previousPage={previousPage}
              result={results}
              loading={state === "LOADING"}
            />
          </GridItem>
        </Grid>
      </Grid>
    </ChakraProvider>
  );
}

export default App;

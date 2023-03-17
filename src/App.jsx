import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { ItemView } from "./components/layout/ItemView";
import { Map } from "./components/layout/Map";

function App() {
  const [stacApiUrl, setStacApiUrl] = useState(process.env.REACT_APP_DEFAULT_STAC_API);
  const [authToken, setAuthtoken] = useState();
  const [isBboxDrawEnabled, setIsBboxDrawEnabled] = useState(false);
  const [ highlightItem, setHighlightItem ] = useState();
  const [ selectedItemId, setSelectedItemId ] = useState();

  const headers = useMemo(() => ({
    Authorization: authToken && "Basic " + btoa(authToken + ":")
  }), [authToken]);
  
  const stacApi = useMemo(() => new StacApi(stacApiUrl, { headers }), [stacApiUrl, headers]);
  const { collections } = useCollections(stacApi);  
  const {
    bbox,
    setBbox,
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

  const selectedItem = useMemo(() => {
    if (!selectedItemId || !results) return;

    return results.features.find(({ id }) => id === selectedItemId);
  }, [selectedItemId, results]);

  const handleBboxDrawComplete = useCallback((geom) => {
    setBbox(geom);
    setIsBboxDrawEnabled(false);
  }, [setBbox, setIsBboxDrawEnabled]);

  // Automatically submit the search for STAC items
  useEffect(
    () => {
      if (selectedCollections || dateRangeFrom || dateRangeTo) {
        submit();
      }
    },
    [submit, selectedCollections, dateRangeFrom, dateRangeTo]
  );

  return (
    <ChakraProvider theme={theme}>
      <Grid minH="100vh" templateRows="max-content max-content 1fr">
        <GridItem p={3} borderBottom="1px solid" borderColor="gray.200">
          <Header
            title="Planet Super Dove Catalog"
            stacApiUrl={stacApiUrl}
            setStacApiUrl={setStacApiUrl}
            authToken={authToken}
            setAuthtoken={setAuthtoken}
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
            bbox={{ setIsBboxDrawEnabled, bbox, setBbox }}
          />
        </GridItem>
        <Grid templateColumns="1fr 400px" position="relative">
          <GridItem position="relative">
            <Map
              results={results}
              highlightItem={highlightItem}
              setHighlightItem={setHighlightItem}
              isBboxDrawEnabled={isBboxDrawEnabled}
              setBbox={handleBboxDrawComplete}
              bbox={bbox}
            />
          </GridItem>
          <GridItem borderLeft="2px solid" borderColor="gray.200" position="relative">
            <ItemList
              nextPage={nextPage}
              previousPage={previousPage}
              result={results}
              loading={state === "LOADING"}
              highlightItem={highlightItem}
              setHighlightItem={setHighlightItem}
              setSelectedItem={setSelectedItemId}
            />
            <ItemView selectedItem={selectedItem} setSelectedItem={setSelectedItemId} />
          </GridItem>
        </Grid>
      </Grid>
    </ChakraProvider>
  );
}

export default App;

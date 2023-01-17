import React, { useCallback, useEffect, useState } from "react";
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

  useEffect(() => {
    setStacApi(new StacApi("https://planetarycomputer.microsoft.com/api/stac/v1"));
  }, [stacApiUrl]);

  const { collections } = useCollections(stacApi);  
  const { collections: selectedCollections, setCollections } = useStacSearch(stacApi);

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

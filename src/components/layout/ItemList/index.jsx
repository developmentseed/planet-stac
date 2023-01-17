import React from "react";
import T from "prop-types";
import { Grid, Box, Text, Spinner, Button, GridItem } from "@chakra-ui/react";

import { Item } from "./Item";
import { stac } from "../../../types";

function ItemList({ nextPage, previousPage, result, loading }) {
  return (
    <Grid templateRows="max-content 1fr" position="absolute" top="0" left="0" right="0" bottom="0">
      <Text p="3" fontSize="l" fontWeight="bold" as="h2">Item List</Text>
      {loading && !result && (
        <Box textAlign="center" mt="20">
          <Spinner
            thickness="8px"
            speed="1.5s"
            emptyColor="gray.100"
            color="gray.500"
            size="xl"
          />
        </Box>
      )}

      {result && (
        <>
          <Box overflowY="auto">
            {result.features.map(({ id }) => (
              <Item key={id} id={id} />
            ))}
          </Box>
          <Grid templateColumns="1fr 1fr" borderTop="1px solid" borderColor="gray.200">
            <GridItem p="3" borderRight="1px solid" borderColor="gray.200">
              <Button variant="link" disabled={!previousPage} onClick={previousPage}>← Previous Page</Button>
            </GridItem>
            <GridItem p="3" textAlign="right">
              <Button variant="link" disabled={!nextPage} onClick={nextPage}>Next Page →</Button>
            </GridItem>
          </Grid>
        </>
      )}
    </Grid>
  );
}

ItemList.propTypes = {
  nextPage: T.func,
  previousPage: T.func,
  result: T.shape({
    features: T.arrayOf(stac.Item).isRequired
  }),
  loading: T.bool,
};

export { ItemList };
import React from "react";
import T from "prop-types";
import {
  Button,
  Stack,
  Text,
  Divider,
} from "@chakra-ui/react";

import { DateSelect } from "./DateSelect";
import { CollectionSelect } from "./CollectionSelect";

import { stac } from "../../../types";

function Filter({ collections: collectionProps, dateRange: dateRangeProps }) {
  const { collections, selectedCollections, setCollections } = collectionProps;
  const { dateRangeFrom, setDateRangeFrom, dateRangeTo, setDateRangeTo } = dateRangeProps;

  return (
    <Stack direction="row" alignItems="center" gap="3" h="30px">
      <Text fontWeight="bold">Filter:</Text>
      <CollectionSelect
        collections={collections}
        selectedCollections={selectedCollections}
        setCollections={setCollections}
      />
      <Divider orientation="vertical" />
      <DateSelect
        dateRangeFrom={dateRangeFrom}
        setDateRangeFrom={setDateRangeFrom}
        dateRangeTo={dateRangeTo}
        setDateRangeTo={setDateRangeTo}
      />
      <Divider orientation="vertical" />
      <Button variant="link">Select area</Button>
    </Stack>
  );
}

Filter.propTypes = {
  collections: T.shape({
    collections: T.arrayOf(stac.Collection),
    selectedCollections: T.arrayOf(T.string),
    setCollections: T.func.isRequired,
  }).isRequired,
  dateRange: T.shape({
    dateRangeFrom: T.string.isRequired,
    setDateRangeFrom: T.func.isRequired,
    dateRangeTo: T.string.isRequired,
    setDateRangeTo: T.func.isRequired
  }).isRequired
};

export {Filter};

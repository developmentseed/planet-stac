import React, { useCallback } from "react";
import T from "prop-types";
import {
  Button,
  IconButton,
  Stack,
  Text,
  Divider,
  Box,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import { DateSelect } from "./DateSelect";
import { CollectionSelect } from "./CollectionSelect";

import { stac } from "../../../types";

function Filter({ collections: collectionProps, dateRange: dateRangeProps, bbox: bboxProps }) {
  const { collections, selectedCollections, setCollections } = collectionProps;
  const { dateRangeFrom, setDateRangeFrom, dateRangeTo, setDateRangeTo } = dateRangeProps;
  const { setIsBboxDrawEnabled, bbox, setBbox } = bboxProps;

  const handleClearCollections = useCallback(() => setCollections(), [setCollections]);
  const handleClearDateRange = useCallback(() => {
    setDateRangeFrom("");
    setDateRangeTo("");
  }, [setDateRangeFrom, setDateRangeTo]);
  const handleClearBbox = useCallback(() => setBbox(), [setBbox]);

  return (
    <Stack direction="row" alignItems="center" h="30px" gap="3">
      <Text fontWeight="bold">Filter:</Text>
      <Box>
        <CollectionSelect
          collections={collections}
          selectedCollections={selectedCollections}
          setCollections={setCollections}
        />
        {selectedCollections.length > 0 && (
          <IconButton
            w="3"
            minWidth="3"
            ml="3"
            aria-label="Clear collection selection"
            variant="link"
            icon={<DeleteIcon boxSize={3} />}
            onClick={handleClearCollections}
          />
        )}
      </Box>
      <Divider orientation="vertical" />
      <Box>
        <DateSelect
          dateRangeFrom={dateRangeFrom}
          setDateRangeFrom={setDateRangeFrom}
          dateRangeTo={dateRangeTo}
          setDateRangeTo={setDateRangeTo}
        />
        {(dateRangeFrom || dateRangeTo) && (
          <IconButton
            w="3"
            minWidth="3"
            ml="3"
            aria-label="Clear date-range selection"
            variant="link"
            icon={<DeleteIcon boxSize={3} />}
            onClick={handleClearDateRange}
          />
        )}
      </Box>
      <Divider orientation="vertical" />
      <Box>
        <Button
          variant="link"
          onClick={() => setIsBboxDrawEnabled(true)}
        >
          {bbox ? "Area selected" : "Select area"}
        </Button>
        {bbox && (
          <IconButton
            w="3"
            minWidth="3"
            ml="3"
            aria-label="Clear selected area"
            variant="link"
            icon={<DeleteIcon boxSize={3} />}
            onClick={handleClearBbox}
          />
        )}
      </Box>
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
  }).isRequired,
  bbox: T.shape({
    setIsBboxDrawEnabled: T.func.isRequired,
    bbox: T.arrayOf(T.number),
    setBbox: T.func.isRequired,
  }).isRequired
};

export {Filter};

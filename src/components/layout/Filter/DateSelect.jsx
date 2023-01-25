import React, { useCallback } from "react";
import T from "prop-types";
import {
  PopoverHeader,
  PopoverBody,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";

import { Disclosure } from "../../shared/Disclosure";
import { dateFormat } from "../../../config";

function getDateRangeLabel(fromDate, toDate) {
  let fromLabel;
  let toLabel;

  if (!(fromDate || toDate)) {
    return "Select date range";
  }

  if (fromDate) {
    fromLabel = new Date(fromDate).toLocaleString("en-US", dateFormat);
  }

  if (toDate) {
    toLabel = new Date(toDate).toLocaleString("en-US", dateFormat);
  }

  return `${fromLabel ? `From: ${fromLabel}` : ""} ${toLabel ? `To: ${toLabel}` : ""}`.trim();
}

function DateSelect({ dateRangeFrom, setDateRangeFrom, dateRangeTo, setDateRangeTo }) {
  const handleRangeFromChange = useCallback((e) => setDateRangeFrom(e.target.value), [setDateRangeFrom]);
  const handleRangeToChange = useCallback((e) => setDateRangeTo(e.target.value), [setDateRangeTo]);

  const rangeError = (!!dateRangeTo && !!dateRangeFrom) && dateRangeFrom >= dateRangeTo;

  return (
    <Disclosure title={getDateRangeLabel(dateRangeFrom, dateRangeTo)}>
      <fieldset>
        <PopoverHeader as="legend">Select dates</PopoverHeader>
        <PopoverBody>
          <Stack gap="2">
            <FormControl>
              <FormLabel>From:</FormLabel>
              <Input type="date" onChange={handleRangeFromChange} value={dateRangeFrom} />
            </FormControl>
            <FormControl isInvalid={rangeError}>
              <FormLabel>To:</FormLabel>
              <Input type="date" onChange={handleRangeToChange} value={dateRangeTo} />
              {rangeError && (
                <FormErrorMessage>
                  The to-date must be later than the from-date.
                </FormErrorMessage>
              )}
            </FormControl>
          </Stack>
        </PopoverBody>
      </fieldset>
    </Disclosure>
  );
}

DateSelect.propTypes = {
  dateRangeFrom: T.string.isRequired,
  setDateRangeFrom: T.func.isRequired,
  dateRangeTo: T.string.isRequired,
  setDateRangeTo: T.func.isRequired
};

export {DateSelect};

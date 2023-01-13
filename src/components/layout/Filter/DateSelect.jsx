import React, { useCallback } from "react";
import T from "prop-types";
import {
  PopoverHeader,
  PopoverBody,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import { Disclosure } from "../../shared/Disclosure";

function DateSelect({ dateRangeFrom, setDateRangeFrom, dateRangeTo, setDateRangeTo }) {
  const handleRangeFromChange = useCallback((e) => setDateRangeFrom(e.target.value), [setDateRangeFrom]);
  const handleRangeToChange = useCallback((e) => setDateRangeTo(e.target.value), [setDateRangeTo]);

  return (
    <Disclosure title="Select dates">
      <fieldset>
        <PopoverHeader as="legend">Select dates</PopoverHeader>
        <PopoverBody>
          <FormControl>
            <FormLabel>From:</FormLabel>
            <Input type="date" onChange={handleRangeFromChange} value={dateRangeFrom} />
          </FormControl>
          <FormControl>
            <FormLabel>To:</FormLabel>
            <Input type="date" onChange={handleRangeToChange} value={dateRangeTo} />
          </FormControl>
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

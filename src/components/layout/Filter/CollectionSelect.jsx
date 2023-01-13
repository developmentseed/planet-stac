import React, {useCallback} from "react";
import T from "prop-types";
import {
  Stack,
  PopoverHeader,
  PopoverBody,
  CheckboxGroup,
  Checkbox
} from "@chakra-ui/react";

import { Disclosure } from "../../shared/Disclosure";
import { stac } from "../../../types";

function CollectionSelect({ collections, selectedCollections, setCollections }) {
  const handleChange = useCallback((event) => {
    const { value } = event.target;

    const nextValues = selectedCollections.includes(value)
      ? selectedCollections.filter((v) => v !== value)
      : [ ...selectedCollections, value ];

    setCollections(nextValues);
  }, [selectedCollections, setCollections]);

  return (
    <Disclosure title="Select collections">
      <fieldset>
        <PopoverHeader as="legend">Select Collections</PopoverHeader>
        <PopoverBody>
        <CheckboxGroup>
          <Stack spacing="1" direction="column">
            { collections.map(({id, title}) => (
              <Checkbox
                value={id}
                key={id}
                checked={selectedCollections.includes(id)}
                onChange={handleChange}
              >
                {title}
              </Checkbox>
            ))}
          </Stack>
        </CheckboxGroup>
        </PopoverBody>
      </fieldset>
    </Disclosure>
  );
}

CollectionSelect.propTypes = {
  collections: T.arrayOf(stac.Collection),
  selectedCollections: T.arrayOf(T.string),
  setCollections: T.func.isRequired,
};

export { CollectionSelect };

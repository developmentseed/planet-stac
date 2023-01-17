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

function getCollectionLabel(selectedCollections) {
  const n = selectedCollections.length;
  switch (n) {
    case 0:
      return "Select collections";
    case 1:
      return "1 collection";
    default:
      return `${n} collections`;
  }
}

function CollectionSelect({ collections, selectedCollections, setCollections }) {
  const handleChange = useCallback((event) => {
    const { value } = event.target;

    const nextValues = selectedCollections.includes(value)
      ? selectedCollections.filter((v) => v !== value)
      : [ ...selectedCollections, value ];

    setCollections(nextValues);
  }, [selectedCollections, setCollections]);

  return (
    <Disclosure title={getCollectionLabel(selectedCollections)}>
      <fieldset>
        <PopoverHeader as="legend">Select collections</PopoverHeader>
        <PopoverBody maxHeight="300px" overflowY="scroll">
          <CheckboxGroup value={selectedCollections}>
            <Stack spacing="1" direction="column">
              { collections.map(({id, title}) => (
                <Checkbox
                  value={id}
                  key={id}
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
  collections: T.arrayOf(stac.Collection).isRequired,
  selectedCollections: T.arrayOf(T.string).isRequired,
  setCollections: T.func.isRequired,
};

export { CollectionSelect };

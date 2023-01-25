import React from "react";
import T from "prop-types";

import {
  Text,
  Table,
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/react";
import { dateFormat } from "../../../config";

function toDisplayValue(value) {
  const date = new Date(value);

  if (typeof value === "string" && date.getTime()) {
    return date.toLocaleString("en-US", dateFormat);
  }

  if (Array.isArray(value)) {
    return (
      <ul>
        {value.map(val => (<li key={val}>{val}</li>))}
      </ul>
    );
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return value;
}

function ItemProps({ itemProperties }) {
  const entries = Object.entries(itemProperties);
  if (entries.length === 0) return null;

  return (
    <>
      <Text as="h3" fontWeight="bold" fontSize="lg" p="3">Properties</Text>
      <Table variant="striped" size="sm">
        <Tbody>
          {Object.entries(itemProperties).map(([ key, val ]) => (
            <Tr key={key}>
              <Td>{key}</Td>
              <Td>{toDisplayValue(val)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}

ItemProps.propTypes = {
  itemProperties: T.object.isRequired
};

export { ItemProps };

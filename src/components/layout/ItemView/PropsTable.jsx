import React from "react";
import T from "prop-types";

import {
  Table,
  Tbody,
  Tr,
  Td,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { dateFormat } from "../../../config";

function toDisplayValue(value) {
  const date = new Date(value);

  if (typeof value === "string" && date.getTime()) {
    return date.toLocaleString("en-US", dateFormat);
  }

  if (Array.isArray(value)) {
    return (
      <UnorderedList>
        {value.map(val => (<ListItem key={val}>{toDisplayValue(val)}</ListItem>))}
      </UnorderedList>
    );
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return value;
}

function PropsTable({ itemProperties }) {
  const entries = Object.entries(itemProperties);
  if (entries.length === 0) return null;

  return (
    <>
      <Table variant="striped" size="sm" my="5">
        <Tbody>
          {Object.entries(itemProperties).map(([ key, val ]) => (
            <Tr key={key}>
              <Td verticalAlign="top">{key}</Td>
              <Td>{toDisplayValue(val)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}

PropsTable.propTypes = {
  itemProperties: T.object.isRequired
};

export { PropsTable };

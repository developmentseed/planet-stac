import React from "react";
import T from "prop-types";

import {
  Text,
  Table,
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/react";

const PropsObject = T.shape({
  extension: T.string,
  label: T.string,
  properties: T.object.isRequired
});

function PropertiesTable({ properties }) {
  const { label, properties: props } = properties;
  return (
    <>
      {label && <Text as="h4" fontWeight="bold" fontSize="md" px="3" mt="5" mb="3">{label}</Text>}
      <Table variant="striped" size="sm" mt="3">
        <Tbody>
          {Object.entries(props).map(([ key, val ]) => (
            <Tr key={key}>
              <Td verticalAlign="top" dangerouslySetInnerHTML={{__html: val.label}} />
              <Td dangerouslySetInnerHTML={{__html: val.formatted}} />
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}

PropertiesTable.propTypes = {
  properties: PropsObject.isRequired
};

function PropertiesView({ properties }) {
  return (
    properties.map((prop) => <PropertiesTable key={prop.extension || "default-props"} properties={prop} />)
  );
}

PropertiesView.propTypes = {
  properties: T.arrayOf(PropsObject).isRequired
};

export { PropertiesView };

import React, { useCallback } from "react";
import T from "prop-types";
import StacFields from "@radiantearth/stac-fields";

import {
  Text,
  Box,
  Flex,
  CloseButton,
  Button,
} from "@chakra-ui/react";
import { stac } from "../../../types";
import { PropsTable } from "./PropsTable";
import { PreviewImage } from "./PreviewImage";
import { PropertiesView } from "./PropertiesView";

function ItemView({ selectedItem, setSelectedItem }) {
  const handleClose = useCallback(() => setSelectedItem(), [setSelectedItem]);
  
  if (!selectedItem) return null;
  const { title, description, ...restProps } = selectedItem.properties;
  const formattedProps = StacFields.formatItemProperties({properties: restProps});

  return (
    <Box position="absolute" top="0" right="400px" bottom="0" width="600px" backgroundColor="white" overflowY="auto">
      <Flex alignItems="baseline" width="100%" gap="3">
        <Text as="h2" fontSize="xl" fontWeight="bold" p="3" overflow="hidden">{title || selectedItem.id}</Text>
        <CloseButton onClick={handleClose} marginLeft="auto" />
      </Flex>
      {description && <Text paddingX="3">{description}</Text>}

      <PreviewImage assets={selectedItem.assets} />

      <Text as="h3" fontWeight="bold" fontSize="lg" p="3">Properties</Text>
      <PropertiesView properties={formattedProps} />

      <Text as="h3" fontWeight="bold" fontSize="lg" p="3">Assets</Text>
      {Object.values(selectedItem.assets).map(({ title, description, href, ...assetProps }) => (
        <Box key={href} borderTop="1px solid" borderColor="gray.200" p="3">
          {title && <Text fontWeight="bold">{title}</Text>}
          {description && <Text>{description}</Text>}

          <PropsTable itemProperties={assetProps} />

          {href && (
            <Button
              size="xs"
              onClick={() => navigator.clipboard.writeText(href)}
              mt="3"
            >
              Copy asset URL to clipbord
            </Button>
          )}
        </Box>
      ))}
    </Box>
  );
}

ItemView.propTypes = {
  selectedItem: stac.Item,
  setSelectedItem: T.func.isRequired,
};

export { ItemView };

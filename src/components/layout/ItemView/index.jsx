import React, { useCallback } from "react";
import T from "prop-types";
import StacFields from "@radiantearth/stac-fields";

import {
  Text,
  Box,
  Flex,
  CloseButton,
  Button,
  ScaleFade
} from "@chakra-ui/react";
import { stac } from "../../../types";
import { PreviewImage } from "./PreviewImage";
import { PropertiesView } from "./PropertiesView";

function ItemView({ selectedItem, setSelectedItem }) {
  const handleClose = useCallback(() => setSelectedItem(), [setSelectedItem]);
  
  if (!selectedItem) return null;
  const { title, description, ...restProps } = selectedItem.properties;
  const formattedProps = StacFields.formatItemProperties({properties: restProps});

  return (
    <ScaleFade
      in={!!selectedItem}
      initialScale={0.9}
      style={{ zIndex: 10 }}
    >
      <Box
        position="absolute"
        top="0"
        right="0"
        bottom="0"
        width="500px"
        backgroundColor="white"
        overflowY="auto"
      >
        <Flex alignItems="baseline" width="100%" gap="3">
          <Text as="h2" fontSize="xl" fontWeight="bold" p="3" overflow="hidden">{title || selectedItem.id}</Text>
          <CloseButton onClick={handleClose} marginLeft="auto" />
        </Flex>
        {description && <Text paddingX="3">{description}</Text>}

        <PreviewImage assets={selectedItem.assets} />

        <Text as="h3" fontWeight="bold" fontSize="lg" p="3">Properties</Text>
        <PropertiesView properties={formattedProps} />

        <Text as="h3" fontWeight="bold" fontSize="lg" p="3" mt="5">Assets</Text>
        {Object.values(selectedItem.assets).map(({ title, description, href, ...assetProps }) => (
          <Box key={href} borderTop="1px solid" borderColor="gray.200" px="3" py="7">
            {title && <Text fontWeight="bold">{title}</Text>}
            {description && <Text>{description}</Text>}
            <PropertiesView properties={StacFields.formatItemProperties({ properties: assetProps })} />

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
    </ScaleFade>
  );
}

ItemView.propTypes = {
  selectedItem: stac.Item,
  setSelectedItem: T.func.isRequired,
};

export { ItemView };

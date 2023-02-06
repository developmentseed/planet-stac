import React, { useState, useEffect } from "react";
import T from "prop-types";
import { Box, Text } from "@chakra-ui/react";

function findPreviewAsset(assets) {
  return Object.values(assets).find(({ rel }) => rel === "preview");
}

/**
 * Displays a the preview image if the assets includes one with rel="preview".
 * Attempts to download the image before displaying and only returns content 
 * if the image was downloaded successfully. (This is because some STAC catalogs
 * advertise preview images but randomly return errors when downloaded.)
 */
function PreviewImage({ assets }) {
  const [ image, setImage ] = useState();
  const previewAsset = findPreviewAsset(assets);
  
  useEffect(() => {
    setImage();
    if (!previewAsset?.href) return;

    fetch(previewAsset.href).then(r => {
      if (r.status < 400) {
        r.arrayBuffer().then(b => {
          const url = window.URL.createObjectURL(new Blob([b]));
          setImage(url);
        });
      }
    });
  }, [previewAsset]);

  if (image) {
    return (
      <Box p="3">
        <Text as="h3" fontWeight="bold" fontSize="lg" mb="3">Preview</Text>
        <img src={image} alt="" width="50%" />
      </Box>
    );
  }

  return null;
}

PreviewImage.propTypes = {
  assets: T.object
};

export { PreviewImage };

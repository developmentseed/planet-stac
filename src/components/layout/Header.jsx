import React, { useState, useRef, useCallback } from "react";
import T from "prop-types";
import { Flex, Button, Text, useDisclosure } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input
} from "@chakra-ui/react";
import { useEffect } from "react";

function isStacSearchApi(meta) {
  const { stac_version, links } = meta;
  if (!stac_version) {
    return "This API is not a STAC catalog.";
  }

  const search = links.find(({ rel }) => rel === "search");
  if (!search) {
    return "This STAC catalog does not support STAC search.";
  }
}

function Header({ stacApiUrl, setStacApiUrl }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const [ title, setTitle ] = useState();
  const [ url, setUrl ] = useState(stacApiUrl);
  const [ urlError, setUrlError ] = useState();

  const handleUrlChange = useCallback((e) => setUrl(e.target.value), [setUrl]);

  const handleSubmit = useCallback(() => {
    if (!url) {
      setUrlError("Enter a URL to a STAC catalog.");
    } else {
      fetch(url)
        .then(r => r.json())
        .then(r => {
          const error = isStacSearchApi(r);
          if (error) {
            setUrlError(error);
          } else {
            setTitle(r.title || r.id);
            setStacApiUrl(url);
            onClose();
          }
        })
        .catch(() => setUrlError("Unable to open this STAC catalog"));
    }
  }, [onClose, setStacApiUrl, url]);

  const handleCancel = useCallback(() => {
    setUrl(stacApiUrl);
    onClose();
  }, [onClose, setUrl, stacApiUrl]);

  useEffect(() => {
    // Set the title when the app is initialised.
    if (!title) {
      fetch(url)
        .then(r => r.json())
        .then(({ id, title }) => setTitle(title || id));
    }
  }, [title, url]);

  return (
    <>
      <Flex alignItems="baseline" gap="3">
        <Text fontSize="2xl" fontWeight="bold" as="h1">{title}</Text>
        <Button variant="link" onClick={onOpen}>Change</Button>
      </Flex>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Select STAC API
            </AlertDialogHeader>

            <AlertDialogBody>
              <form>
                <FormControl isRequired isInvalid={urlError}>
                  <FormLabel>Enter STAC-API URL</FormLabel>
                  <Input value={url} onChange={handleUrlChange} />
                  {urlError && (
                    <FormErrorMessage>{urlError}</FormErrorMessage>
                  )}
                </FormControl>
              </form>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} ml={3}>
                Change STAC API
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

Header.propTypes = {
  stacApiUrl: T.string,
  setStacApiUrl: T.func.isRequired,
};

export {Header};

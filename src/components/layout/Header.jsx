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
  Input
} from "@chakra-ui/react";

function Header({ title, stacApiUrl, setStacApiUrl }) {
  const [ url, setUrl ] = useState(stacApiUrl);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleUrlChange = useCallback((e) => setUrl(e.target.value), [setUrl]);

  const handleSubmit = useCallback(() => {
    setStacApiUrl(url);
    onClose();
  }, [onClose, setStacApiUrl, url]);

  const handleCancel = useCallback(() => {
    setUrl(stacApiUrl);
    onClose();
  }, [onClose, setUrl, stacApiUrl]);

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
                <FormControl isRequired>
                  <FormLabel>Enter STAC-API URL</FormLabel>
                  <Input value={url} onChange={handleUrlChange} />
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
  title: T.string.isRequired,
  stacApiUrl: T.string,
  setStacApiUrl: T.func.isRequired,
};

export {Header};

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

function Header({ stacApiUrl, setStacApiUrl, authToken, setAuthtoken }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const [ title, setTitle ] = useState();
  const [ url, setUrl ] = useState(stacApiUrl);
  const [ urlError, setUrlError ] = useState();
  const [ token, setToken ] = useState(authToken);
  const [ tokenError, setTokenError ] = useState();
  const [ requireAuth, setRequireAuth ] = useState(false);

  const handleUrlChange = useCallback((e) => {
    setUrl(e.target.value);
    setToken();
    setRequireAuth(false);
  }, [setUrl]);
  const handleTokenChange = useCallback((e) => setToken(e.target.value), [setToken]);

  const isValid = useCallback(() => {
    setUrlError();
    setTokenError();

    if (!url) {
      setUrlError("Enter a URL to a STAC catalog.");
    }

    if (!(!requireAuth || token)) {
      setTokenError("Enter your authentication token for this API.");
    }
    return !(!url && (!requireAuth || token));
  }, [requireAuth, token, url]);

  const handleSubmit = useCallback(() => {
    if (isValid()) {
      const headers = new Headers();
      if (token) {
        headers.append("Authorization", "Basic " + btoa(token + ":"));
      }

      fetch(url, { headers })
        .then(async r => {
          if (r.status === 401) {
            setRequireAuth(true);
            return;
          } else {
            !token && setRequireAuth(false);
          }

          const responseJson = await r.json();
          const error = isStacSearchApi(responseJson);
          if (error) {
            setUrlError(error);
          } else {
            const { title, id } = responseJson;
            setTitle(title || id);
            setStacApiUrl(url);
            setAuthtoken(token);
            onClose();
          }
        })
        .catch(() => setUrlError("Unable to open this STAC catalog"));
    }
  }, [onClose, setStacApiUrl, url, token, setAuthtoken, isValid]);

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

                {requireAuth && (
                  <FormControl isRequired isInvalid={tokenError} mt="5">
                    <FormLabel>Enter auth token</FormLabel>
                    <Input value={token || ""} onChange={handleTokenChange} />
                    {tokenError && (
                      <FormErrorMessage>{tokenError}</FormErrorMessage>
                    )}
                  </FormControl>
                )}
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
  authToken: T.string,
  setAuthtoken: T.func.isRequired,
};

export {Header};

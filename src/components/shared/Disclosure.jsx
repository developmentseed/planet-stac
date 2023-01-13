import React from "react";
import T from "prop-types";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";

function Disclosure({ title, children }) {
  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <Button variant="link">{title}</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        { children }
      </PopoverContent>
    </Popover>
  );
}

Disclosure.propTypes = {
  title: T.string.isRequired,
  children: T.node.isRequired,
};

export { Disclosure };

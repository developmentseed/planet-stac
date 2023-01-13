import T from "prop-types";

export const Collection = T.shape({
  id: T.string.isRequired,
  title: T.string.isRequired
});

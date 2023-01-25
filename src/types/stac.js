import T from "prop-types";

export const Collection = T.shape({
  id: T.string.isRequired,
  title: T.string.isRequired
});

export const Asset = T.shape({
  title: T.string,
  description: T.string,
  href: T.string,
  type: T.string.isRequired
});

export const Item = T.shape({
  id: T.string.isRequired,
  collection: T.string.isRequired,
  assets: T.objectOf(Asset).isRequired,
  properties: T.shape({
    description: T.string,
  }).isRequired
});

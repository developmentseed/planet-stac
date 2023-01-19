import T from "prop-types";

export const Collection = T.shape({
  id: T.string.isRequired,
  title: T.string.isRequired
});

export const Asset = T.shape({});

export const Item = T.shape({
  id: T.string.isRequired,
  collection: T.string.isRequired,
  assets: Asset.isRequired,
});

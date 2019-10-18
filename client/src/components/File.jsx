// @flow
import React from "react";

import { GridListTile, GridListTileBar } from '@material-ui/core';

type Props = {
  alt: String,
  label: String,
  src: String
};

const File = (props: Props): React.Node => {
  const {alt, label, src, style } = props;

  return (
    <GridListTile className="file" style={{...style}} >
      <img alt={alt} src={src} style={{ maxHeight: "100%" }} />
      <GridListTileBar title={label} />
    </GridListTile>
  );
};

export default React.memo(File);

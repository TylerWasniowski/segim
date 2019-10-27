// @flow
import React from "react";

import { GridListTile, GridListTileBar } from '@material-ui/core';

import type { Node } from "react";


type Props = {
  alt: string,
  label: string,
  src: string,
  style?: JSON
};

const ImageTile = (props: Props): Node => {
  const {alt, label, src, style } = props;

  return (
    <GridListTile className="file" style={{...style}} >
      <img alt={alt} src={src} style={{ maxHeight: "100%" }} />
      <GridListTileBar title={label} />
    </GridListTile>
  );
};

export default React.memo<Props>(ImageTile);

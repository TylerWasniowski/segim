// @flow
import React from "react";
import { Link } from "react-router-dom";

import { GridListTile, GridListTileBar } from "@material-ui/core";

import type { Node } from "react";

type Props = {
  alt: string,
  imageSrc: string,
  label: string,
  link: ?string,
  style?: JSON
};

const ImageTile = (props: Props): Node => {
  const { alt, imageSrc, label, link, style } = props;

  const content = (
    <React.Fragment>
      <img alt={alt} src={imageSrc} style={{ maxHeight: "100%" }} />
      <GridListTileBar title={label} />
    </React.Fragment>
  );

  return (
    <GridListTile className="file" style={{ ...style }}>
      {link ? (
        <Link style={{ color: "inherit", textDecoration: "none" }} to={link}>
          {content}
        </Link>
      ) : (
        content
      )}
    </GridListTile>
  );
};

export default React.memo<Props>(ImageTile);

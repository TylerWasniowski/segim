// @flow
import paper from "paper";
import React from "react";

import type { Node } from "react";

type Props = {
  imageURL: string
};

const Canvas = ({ imageURL }: Props): Node => (
  <React.Fragment>
    <img
    alt="Uploaded by users."
    hidden
    id="selected-image"
    src={imageURL}
    />
    <canvas className="segment-image-canvas" id="paperjs"></canvas>
    <script
      canvas="paperjs"
      src={`${String(process.env.PUBLIC_URL)}/paperSegmentScript.js`}
      type="text/paperscript"
    />
  </React.Fragment>
);

export default Canvas;

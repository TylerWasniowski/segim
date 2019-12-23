// @flow
import paper from "paper";
import React, { useEffect } from "react";

import type { Node } from "react";

type Props = {
  imageURL: string
};

const Canvas = ({ imageURL }: Props): Node => {
  const canvasId = `paperjs-${imageURL}`;
  const imageId = "selected-image";
  const scriptId = "paperjs-segment-script";

  useEffect(() => {
    const imageEl = document.getElementById(imageId);

    if (imageEl) {
      imageEl.onload = () => {
        const scriptEl = document.getElementById(scriptId);
        paper.PaperScript.load(scriptEl);
      };
    } else {
      alert(`Error finding image: ${imageId}`);
    }
  });

  return (
    <React.Fragment>
      <img alt="Uploaded by users." hidden id={imageId} src={imageURL} />
      <canvas className="segment-image-canvas" id={canvasId}></canvas>
      <script
        canvas={canvasId}
        id={scriptId}
        src={`${String(process.env.PUBLIC_URL)}/paperSegmentScript.js`}
        type="text/paperscript"
      />
    </React.Fragment>
  );
};

export default Canvas;

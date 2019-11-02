// @flow
import Canvas from "./Canvas";
import React, { useEffect, useState } from "react";

import type { Node } from "react";
import type { Match } from "react-router-dom";

type Props = {
  match: Match
};

const SelectedImagePage = (props: Props): Node => {
  const { imageId } = props.match.params;

  const [imageURL, setImageURL] = useState("");
  useEffect(() => {
    if (!imageId) return;
    
    fetch(`http://localhost:3001/get-image-payload/${imageId}`)
      .then(res => {
        if (res.status !== 200) throw new Error("Could not get image data.");
        return res;
      })
      .then(res => res.blob())
      .then(imageData => setImageURL(URL.createObjectURL(imageData)))
      .catch(err => alert("Failed loading image data."));
  }, [imageId]);
  
  return (
    <React.Fragment>
      <p>{imageURL}</p>
      {imageURL &&
         <Canvas imageURL={imageURL} />
      }
    </React.Fragment>
  );
}

export default SelectedImagePage;
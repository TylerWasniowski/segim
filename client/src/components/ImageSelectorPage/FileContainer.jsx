// @flow
import ImageTile from "./ImageTile";
import React from "react";
import { useDropzone } from "react-dropzone";

import { GridList } from "@material-ui/core";

import type { Node } from "react";


async function addImageToDatabase(file, data) {
  const { lastModified, name, path, size, type } = file;

  const formData = new FormData();
  formData.append("image", new Blob([file]));
  formData.append("metadata", JSON.stringify({
    lastModified,
    name,
    path,
    size,
    type
  }));

  return fetch("http://localhost:3001/add-image", {
    body: formData,
    method: "POST",
  })
    .then(res => {
      if (res.status !== 200)
        throw new Error(`Adding ${name} failed.`);
    });
}

async function addImagesToDatabase(files) {
  files.forEach((file) => {
    let reader = new FileReader();
    reader.onload = (el) => {
      //$FlowFixMe el.target's type is not precise, result is a property of target
      addImageToDatabase(file, el.target.result)
        .catch(() => {
          alert(`Adding ${file.name} failed.`);
        });
    };

    // Read raw image data
    reader.readAsArrayBuffer(file);
  });
}

type Props = {
  className: string,
  search: string
};

const FileContainer = (props: Props): Node => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noClick: true,
    onDropAccepted: addImagesToDatabase
  });
  
  const dragImageInfo = {
    alt: "An icon showing a picture hovering over a boxed area",
    label: "Drag new images",
    src: `${String(process.env.PUBLIC_URL)}/drag-and-drop-icon.jpg`
  }

  const folderImageInfo = {
    alt: "An icon of a folder",
    src: `${String(process.env.PUBLIC_URL)}/folder-icon.jpg`
  }

  return (
    <div {...props}>
      <div {...getRootProps({
          className: "dropzone"
        })}>
        <input {...getInputProps()} />
        <GridList  className="grid-list" cols={6} spacing={30}>
          {acceptedFiles
            .filter(file => file.name.toLowerCase().includes(props.search.toLowerCase()))
            .map(file => (
              <ImageTile
                key={`${file.path}`}
                label={file.name}
                {...folderImageInfo}
              ></ImageTile>
            ))}

          <ImageTile
            key={`${dragImageInfo.label}-${dragImageInfo.src}`}
            {...dragImageInfo}
          />
        </GridList>
      </div>
    </div>
  );
};

export default FileContainer;

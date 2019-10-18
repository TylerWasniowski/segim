// @flow
import File from "./File";
import React from "react";
import { useDropzone } from "react-dropzone";

import { GridList } from "@material-ui/core";

type Props = {
  className: String,
  search: String
};

const FileBox = (props: Props): React.Node => {
  const { acceptedFiles, getRootProps, getInputProps, onDropAccepted } = useDropzone({
    accept: "image/jpeg, image/png",
    noClick: true,
    onDropAccepted: console.log
  });

  useDropzone()

  
  const dragImageInfo = {
    alt: "An icon showing a picture hovering over a boxed area",
    label: "Drag new files",
    src: `${process.env.PUBLIC_URL}/drag-and-drop-icon.jpg`
  }

  const folderImageInfo = {
    alt: "An icon of a folder",
    src: `${process.env.PUBLIC_URL}/folder-icon.jpg`
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
              <File
                key={`${file.path}`}
                label={file.name}
                {...folderImageInfo}
              ></File>
            ))}

          <File
            key={`${dragImageInfo.label}-${dragImageInfo.src}`}
            {...dragImageInfo}
          />
        </GridList>
      </div>
    </div>
  );
};

export default FileBox;

// @flow
import ImageTile from "./ImageTile";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { HomeRoute, ImageRoute } from "../../routes";

import { GridList } from "@material-ui/core";

import type { Node } from "react";

async function getImageDirectory() {
  return fetch("/get-image-directory").then(res =>
    res.json()
  );
}

async function getImageThumbnail(imageId) {
  return fetch(`/get-image-thumbnail/${imageId}`)
    .then(res => res.blob())
    .then(imageThumbnail => URL.createObjectURL(imageThumbnail));
}

async function addImageToDatabase(file, data) {
  const { lastModified, name, path, size, type } = file;

  const formData = new FormData();
  formData.append("image", new Blob([file]));
  formData.append(
    "metadata",
    JSON.stringify({
      lastModified,
      name,
      path,
      size,
      type
    })
  );

  return fetch("/add-image", {
    body: formData,
    method: "POST"
  }).then(res => {
    if (res.status !== 200) throw new Error(`Adding ${name} failed.`);
    return res;
  });
}

async function addImagesToDatabase(files) {
  return Promise.all(
    files.map(
      file =>
        new Promise((resolve, reject) => {
          let reader = new FileReader();
          reader.onload = el => {
            //$FlowFixMe el.target's type is not precise, result is a property of target
            addImageToDatabase(file, el.target.result)
              .then(resolve)
              .catch(err => {
                alert(`Adding ${file.name} failed.`);
                reject(err);
              });
          };

          // Read raw image data
          reader.readAsArrayBuffer(file);
        })
    )
  );
}

type Props = {
  className: string,
  search: string
};

const FileContainer = (props: Props): Node => {
  const [imageDirectory, setImageDirectory] = useState([]);
  const [imageIdToThumbnail, setImageIdToThumbnail] = useState({});

  useEffect(() => {
    getImageDirectory().then(setImageDirectory);
  }, []);

  useEffect(() => {
    imageDirectory.forEach(imageFile => {
      getImageThumbnail(imageFile._id).then(imageThumbnail => {
        setImageIdToThumbnail(oldImageIdToThumbnail => ({
          ...oldImageIdToThumbnail,
          [imageFile._id]: imageThumbnail
        }));
      });
    });
  }, [imageDirectory]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noClick: true,
    onDropAccepted: files => {
      addImagesToDatabase(files).then(() => {
        getImageDirectory().then(setImageDirectory);
      });
    }
  });

  const dragImageInfo = {
    alt: "An icon showing a picture hovering over a boxed area",
    imageSrc: `${String(process.env.PUBLIC_URL)}/drag-and-drop-icon.jpg`,
    label: "Drag new images"
  };

  // const folderImageInfo = {
  //   alt: "An icon of a folder",
  //   src: `${String(process.env.PUBLIC_URL)}/folder-icon.jpg`
  // }

  return (
    <div {...props}>
      <div
        {...getRootProps({
          className: "dropzone"
        })}
      >
        <input {...getInputProps()} />
        <GridList className="grid-list" cols={6} spacing={30}>
          {imageDirectory
            .filter(imageModule =>
              imageModule.name
                .toLowerCase()
                .includes(props.search.toLowerCase())
            )
            .map(imageFile => (
              <ImageTile
                alt={"An image uploaded by users."}
                key={imageFile._id}
                imageSrc={imageIdToThumbnail[imageFile._id]}
                label={imageFile.name}
                link={ImageRoute(imageFile._id)}
              ></ImageTile>
            ))}

          <ImageTile
            key={`${dragImageInfo.label}-${dragImageInfo.imageSrc}`}
            link={HomeRoute}
            {...dragImageInfo}
          />
        </GridList>
      </div>
    </div>
  );
};

export default FileContainer;

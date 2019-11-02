// @flow
import FileContainer from "./FileContainer";
import React, { useState } from "react";

import { TextField } from "@material-ui/core";

import type { Node } from "react";

const ImageSelectorPage = (): Node => {
  const [search, setSearch] = useState<string>("");

  return (
    <React.Fragment>
      <div id="search-container">
        <TextField
          id="search"
          fullWidth
          onChange={event => setSearch(event.target.value)}
          placeholder="Search images"
          variant="outlined"
        />
      </div>
      <FileContainer className="file-box" search={search}></FileContainer>
    </React.Fragment>
  );
}

export default ImageSelectorPage;
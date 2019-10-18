// @flow
import FileBox from "./FileBox";
import React, { useState } from "react";

import { Link, TextField } from "@material-ui/core";

function App() {
  const [search, setSearch] = useState("");

  return (
    <React.Fragment>
      <h1 id="logo">
        <Link color="inherit" href={window.location.href} underline="none">
          segim
        </Link>
      </h1>
      <div id="search-container">
        <TextField
          id="search"
          fullWidth
          onChange={event => setSearch(event.target.value)}
          placeholder="Search images"
          variant="outlined"
        />
      </div>
      <FileBox className="file-box" search={search}></FileBox>
    </React.Fragment>
  );
}

export default App;

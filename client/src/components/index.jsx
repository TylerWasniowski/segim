// @flow
import ImageSelectorPage from "./ImageSelectorPage";
import React from "react";
import { HomeRoute, ImageRoute } from "../routes";
import { HashRouter as Router, Link, Route, Switch } from "react-router-dom";
import SelectedImagePage from "./SelectedImagePage";

import type { Node } from "react";

const App = (): Node => {
  return (
    <React.Fragment>
      <Router>
        <h1 id="logo">
          <Link
            style={{ color: "inherit", textDecoration: "none" }}
            to={HomeRoute}
          >
            segim
          </Link>
        </h1>
        <Switch>
          <Route exact path={HomeRoute} component={ImageSelectorPage} />
          <Route path={ImageRoute()} component={SelectedImagePage} />
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default App;

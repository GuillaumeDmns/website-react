import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import DefaultLayout from "layouts/DefaultLayout";
import Home from "screens/home";
import Photos from "screens/photos";
import Videos from "screens/videos";

const AppRouter: React.FunctionComponent = () => (
  <Router>
    <DefaultLayout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/photos" component={Photos} />
        <Route exact path="/videos" component={Videos} />
      </Switch>
    </DefaultLayout>
  </Router>
);

export default AppRouter;

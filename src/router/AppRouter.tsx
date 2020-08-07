import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import Home from "screens/home";
import DefaultLayout from "../layouts/DefaultLayout";

const AppRouter: React.FunctionComponent = () => (
  <Router>
    <DefaultLayout>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </DefaultLayout>
  </Router>
);

export default AppRouter;

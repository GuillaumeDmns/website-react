import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import DefaultLayout from "layouts/DefaultLayout";
import Home from "screens/home";
import Photos from "screens/photos";
import Videos from "screens/videos";

const AppRouter: React.FunctionComponent = () => (
  <Router>
    <DefaultLayout>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/photos" element={<Photos/>}/>
        <Route path="/videos" element={<Videos/>}/>
      </Routes>
    </DefaultLayout>
  </Router>
);

export default AppRouter;

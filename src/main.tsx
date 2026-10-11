import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Legal from "./pages/Legal";
import NotFound from "./pages/NotFound";
import Photos from "./pages/Photos";
import Videos from "./pages/Videos";
import "./styles/global.css";

// Paths also listed in vite.config.ts (copies of index.html, so that the server finds them)
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/photos", element: <Photos /> },
      { path: "/videos", element: <Videos /> },
      { path: "/mentions-legales", element: <Legal /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

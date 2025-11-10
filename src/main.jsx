import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";

import DummyFrontpage from "./pages/DummyFrontpage.jsx";
import BrowseGames from "./pages/BrowseGames.jsx";
import SearchGames from "./pages/SearchGames.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <DummyFrontpage />,
      },
      {
        path: "browse",
        element: <BrowseGames />,
      },
      {
        path: "search",
        element: <SearchGames />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

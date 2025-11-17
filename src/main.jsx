import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import BrowseGames from "./components/BrowseGames.jsx";
import MyList from "./components/MyLists.jsx";
import GameList from "./components/GameList.jsx";
import CreateList from "./components/CreateList.jsx";
import MyGameList from "./components/MyGameList.jsx";
import Register from "./components/Register.jsx";
import Frontpage from "./components/Frontpage.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";

const router = createBrowserRouter([
  {
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Frontpage />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "browse",
        element: <BrowseGames />,
      },
      {
        path: "search",
        // element: <SearchGames />,
      },
      {
        path: "/:username/mylists",
        element: <MyList />,
      },
      {
        path: "/:username/mylists/:listID",
        element: <MyGameList />,
      },
      {
        path: "/:username/mylists/newlist",
        element: <CreateList />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);

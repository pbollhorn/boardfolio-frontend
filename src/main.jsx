import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ErrorPage from "./pages/ErrorPage.jsx";
import BrowseGames from "./pages/BrowseGames.jsx";
import MyList from "./pages/MyLists.jsx";
import CreateList from "./pages/CreateList.jsx";
import MyGameList from "./components/MyGameList.jsx";
import Register from "./pages/Register.jsx";
import Frontpage from "./pages/Frontpage.jsx";
import SearchGames from "./pages/SearchGames.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
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
        element: <SearchGames />,
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

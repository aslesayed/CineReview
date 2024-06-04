import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage.jsx";
import Connection from "./pages/Connection/Connection.jsx";
import Description from "./pages/Description/Description.jsx";
import Inscription from "./pages/Inscription/Inscription.jsx";
import MoviesList from "./pages/MoviesList/MoviesList.jsx";
import Profil from "./pages/Profil/Profil.jsx";
import SeriesList from "./pages/SeriesList/SeriesList.jsx";
import WatchList from "./pages/WatchList/WatchList.jsx";
import MovieDetail from "./pages/MovieDetail/MovieDetail.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/connection",
        element: <Connection />,
      },
      {
        path: "/description",
        element: <Description />,
      },
      {
        path: "/inscription",
        element: <Inscription />,
      },
      {
        path: "/movieslist",
        element: <MoviesList />,
      },
      {
        path: "/profil",
        element: <Profil />,
      },
      {
        path: "/serieslist",
        element: <SeriesList />,
      },
      {
        path: "/watchlist",
        element: <WatchList />,
      },
      {
        path: "/moviedetail",
        element: <MovieDetail />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

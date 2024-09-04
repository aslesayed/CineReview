import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { DataProvider } from "./contexts/DataContext";
import useUser, { UserProvider } from "./contexts/UserContext";
import Homepage from "./pages/Homepage/Homepage.jsx";
import Connection from "./pages/Connection/Connection.jsx";
import Description from "./pages/Description/Description.jsx";
import Inscription from "./pages/Inscription/Inscription.jsx";
import MoviesList from "./pages/MoviesList/MoviesList.jsx";
// import Profil from "./pages/Profil/Profil.jsx";
import SeriesList from "./pages/SeriesList/SeriesList.jsx";
import WatchList from "./pages/WatchList/WatchList.jsx";
import ContentManager from "./pages/ContentManager/ContentManager.jsx";
import MovieDetail from "./pages/MovieDetail/MovieDetail.jsx";
import Loader from "./composants/Loader/Loader.jsx";
import AdminRoute from "./composants/AdminRoute/AdminRoute.jsx"; // Import correct
import Unauthorized from "./pages/Unauthorized/Unauthorized.jsx";

// eslint-disable-next-line react-refresh/only-export-components
function PrivateRoute({ children }) {
  const { user, isLoading } = useUser();
  const [page, setPage] = useState(null);
  const redirect = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (isLoading) setPage(<Loader />);
    else if (!user) redirect("./connection");
    else setPage(children);
    return () => setPage(null);
  }, [user, isLoading, location, redirect, children]);
  return page;
}

function PublicRoute({ children }) {
  const { user, isLoading } = useUser();
  const [page, setPage] = useState(children);
  const redirect = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (isLoading) setPage(<Loader />);
    else if (user) redirect(-1);
    else setPage(children);
  }, [user, isLoading, location]);
  return page;
}

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
         element: (
          <PublicRoute>
            <Inscription />
          </PublicRoute>
        ),
      },
      {
        path: "/description",
        element: <Description />,
      },
      {
        path: "/inscription",
        element: (
          <PublicRoute>
            <Inscription />
          </PublicRoute>
        ),
      },
      {
        path: "/movieslist",
        element: <MoviesList />,
      },

      {
        path: "/serieslist",
        element: <SeriesList />,
      },
      {
        path: "/unauthorized",
        element: <Unauthorized />,
      },
      {
        path: "/watchlist",
        element: (
          <PrivateRoute>
            <WatchList />
          </PrivateRoute>
        ),
      },
      {
        path: "/contentmanager",
        element: (
          <AdminRoute>
            <ContentManager />
          </AdminRoute>
        ),
      },
      {
        path: "/moviedetail",
        element: <MovieDetail />,
      },
      {
        path: "/contents/:id",
        element: <MovieDetail />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <UserProvider>
      <DataProvider>
        <RouterProvider router={router} />
      </DataProvider>
    </UserProvider>
  </React.StrictMode>
);

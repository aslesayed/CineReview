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
import useUser, { UserProvider } from "./contexts/UserContext";
import Homepage from "./pages/Homepage/Homepage.jsx";
import Connection from "./pages/Connection/Connection.jsx";
import Description from "./pages/Description/Description.jsx";
import Inscription from "./pages/Inscription/Inscription.jsx";
import MoviesList from "./pages/MoviesList/MoviesList.jsx";
import Profil from "./pages/Profil/Profil.jsx";
import SeriesList from "./pages/SeriesList/SeriesList.jsx";
import WatchList from "./pages/WatchList/WatchList.jsx";
import ContentManager from "./pages/ContentManager/ContentManager.jsx";
import MovieDetail from "./pages/MovieDetail/MovieDetail.jsx";
import Loader from "./composants/Loader/Loader.jsx";


// eslint-disable-next-line react-refresh/only-export-components
function PrivateRoute({ children }) {
  const { user, isLoading } = useUser();
  const [page, setPage] = useState(null);
  const redirect = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (isLoading) setPage(<Loader />);
    else if (!user) redirect("./login");
    else setPage(children);
    return () => setPage(null);
  }, [user, isLoading, location, redirect, children]);
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
        element: (
          <PrivateRoute>
          <WatchList />
          </PrivateRoute>
        ),
        
      },
      {
        path: "/contentmanager",
        element: (
          <PrivateRoute>
           <ContentManager />
          </PrivateRoute>
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
    <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);

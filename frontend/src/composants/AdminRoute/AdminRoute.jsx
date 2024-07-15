import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useUser from '../../contexts/UserContext';
import Loader from '../Loader/Loader.jsx';

const AdminRoute = ({ children }) => {
  const { user, isLoading } = useUser();
  const [page, setPage] = useState(null);
  const redirect = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("User data:", user);
    if (isLoading) {
      setPage(<Loader />);
    } else if (!user || user.admin !== 1) {
      console.log("Redirecting to unauthorized. User is not admin or not logged in.");
      redirect('/unauthorized');
    } else {
      setPage(children);
    }
    return () => setPage(null);
  }, [user, isLoading, location, redirect, children]);

  return page;
};

export default AdminRoute;

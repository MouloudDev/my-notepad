import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
import restoreUser from '../thunks/restoreUser';
import Spinner from './spinner';

export default function ProtectedRoute({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const restore = async () => {
      try {
        await dispatch(restoreUser());
      } finally {
        setIsLoading(false);
      }
    };
    restore();
  }, [dispatch]);

  if (isLoading) return <Spinner />;

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

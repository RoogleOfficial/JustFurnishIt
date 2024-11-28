import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../Redux/Store/Store";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [isLoading, setIsLoading] = useState(true);
  console.log(token);

  useEffect(() => {
    // Simulate token loading (if token is being fetched from localStorage or an API)
    const checkToken = async () => {
      // Assume you load token from localStorage or some async logic
      if (token !== null) {
        setIsLoading(false);
      }
    };
    checkToken();
  }, [token]);

  // Display a loading state while waiting for token to load
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (token) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;

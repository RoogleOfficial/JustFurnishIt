import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../Redux/Store/Store"
interface OpenRouteProps {
  children: React.ReactNode;
}

const OpenRoute: React.FC<OpenRouteProps> = ({ children }) => {
  const {token,userDetails} = useSelector((state: RootState) => state.auth);


  if (token === null) {
    return <>{children}</>;
  } 
  else if(userDetails?.role === "user") {
    return <Navigate to="/" />;
  }
  else{
    return <Navigate to="/dashboard" />;
  };
}

export default OpenRoute;

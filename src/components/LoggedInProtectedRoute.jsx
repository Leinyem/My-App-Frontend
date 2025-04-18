import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export const LoggedInProtectedRoute = ({ children }) => {
  const { isLoading, isLoggedIn } = useContext(AuthContext);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isLoggedIn) {
    return <Navigate to="/profile" />;
  }
  return <div>{children}</div>;
};

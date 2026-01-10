import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { userDataContext } from "../Context/UserContext";

function ProtectedRoute({ allowedRoles, children }) {
  const { userData, loading } = useContext(userDataContext);

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>;
  }

  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userData.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default ProtectedRoute;

import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import Home from "./Pages/Home.jsx";
import Register from "./Pages/Register.jsx";
import Login from "./Pages/Login.jsx";
import Citizen from "./Pages/Citizen.jsx";
import Admin from "./Pages/Admin.jsx";
import MyGrievance from "./Pages/MyGrievance.jsx";
import Unauthorized from "./Pages/Unauthorized.jsx";

import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import { userDataContext } from "./Context/UserContext.jsx";
import AllGrievance from "./Pages/AllGrievance.jsx";
import AllOfficers from "./Pages/AllOfficers.jsx";

function App() {
  const { userData } = useContext(userDataContext);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />

      <Route
        path="/login"
        element={userData ? <Navigate to="/" /> : <Login />}
      />

      <Route
        path="/register"
        element={userData ? <Navigate to="/citizen" /> : <Register />}
      />

      {/* Citizen Routes */}
      <Route
        path="/citizen"
        element={
          <ProtectedRoute allowedRoles={["CITIZEN"]}>
            <Citizen />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my"
        element={
          <ProtectedRoute allowedRoles={["CITIZEN"]}>
            <MyGrievance />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <Admin />
          </ProtectedRoute>
        }
      />

      <Route 
        path="/admin/allGrievances"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AllGrievance />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/officers"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AllOfficers />
          </ProtectedRoute>
        }
      />

      {/* Unauthorized */}
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;

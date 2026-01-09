import { useState, createContext, useContext, useEffect } from "react";
import { authDataContext } from "./AuthContext.jsx";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export const userDataContext = createContext();

function UserContext({ children }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [grievance, setGrievance] = useState(false);

  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch current logged-in user from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(serverUrl + "/api/auth/me", {
          withCredentials: true,
        });
        setUserData(res.data.user); // {id, name, role}
      } catch (err) {
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [serverUrl]);

  // Redirect based on role only if on /login or /register
  useEffect(() => {
    if (loading) return;
    if (!userData) return;

    const path = location.pathname;

    if (path === "/login" || path === "/register") {
      switch (userData.role) {
        case "ADMIN":
          navigate("/admin", { replace: true });
          break;
        case "OFFICER":
          navigate("/officer", { replace: true });
          break;
        case "CITIZEN":
          navigate("/citizen", { replace: true });
          break;
        default:
          navigate("/", { replace: true });
      }
    }
  }, [userData, loading, navigate, location.pathname]);

  return (
    <userDataContext.Provider
      value={{ userData, setUserData, grievance, setGrievance, loading }}
    >
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;

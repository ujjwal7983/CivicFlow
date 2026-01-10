import { useState, createContext, useContext, useEffect } from "react";
import { authDataContext } from "./AuthContext.jsx";
import axios from "axios";

export const userDataContext = createContext();

function UserContext({ children }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Existing states (used in other components)
  const [grievance, setGrievance] = useState(false);
  const [officer, setOfficer] = useState(false);

  const { serverUrl } = useContext(authDataContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(serverUrl + "/api/auth/me", {
          withCredentials: true,
        });
        setUserData(res.data.user); // { id, name, email, role }
      } catch (err) {
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [serverUrl]);

  return (
    <userDataContext.Provider
      value={{
        userData,
        setUserData,
        loading,
        grievance,
        setGrievance,
        officer,
        setOfficer,
      }}
    >
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;

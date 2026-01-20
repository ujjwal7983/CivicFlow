import { useState, createContext, useContext, useEffect } from "react";
import { authDataContext } from "./AuthContext.jsx";
import axios from "axios";

export const userDataContext = createContext();

function UserContext({ children }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedGrievanceId, setSelectedGrievanceId] = useState(null);
  const [grievance, setGrievance] = useState(false);
  const [officer, setOfficer] = useState(false);
  const [assign, setAssign] = useState(false);
  const [refreshGrievance, setRefreshGrievance] = useState(0);

  const { serverUrl } = useContext(authDataContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(serverUrl + "/api/user/me", {
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
        assign,
        setAssign,
        selectedGrievanceId,
        setSelectedGrievanceId,
        refreshGrievance, 
        setRefreshGrievance
      }}
    >
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;

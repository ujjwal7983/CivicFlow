import {useState,createContext, useContext, useEffect} from 'react'
import {authDataContext} from './AuthContext.jsx'
import axios from 'axios';
export const userDataContext = createContext();
function UserContext({children}) {
    let [userData, setUserData] = useState(null);
    let {serverUrl} = useContext(authDataContext);

    const currentUserData = async () =>{
        try {
            let result = await axios.get(serverUrl+"/api/citizen",{withCredentials:true} );
            setUserData(result.data.user);
            console.log("Current User Data:", result.data);
        } catch(err) {
            console.log("Error in fetching user data", err);
            setUserData(null);
        }
    }

    useEffect(() => { 
        currentUserData();
    }, []);

  return (
    <div>
        <userDataContext.Provider value={{userData, setUserData}}>
      {children}
        </userDataContext.Provider>
    </div>
  )
}

export default UserContext
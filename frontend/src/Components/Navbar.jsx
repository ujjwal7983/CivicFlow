import React from 'react'
import {userDataContext} from '../Context/UserContext'
import {authDataContext} from '../Context/AuthContext'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

function Navbar() {
    let {userData,setUserData} = React.useContext(userDataContext);
    let {serverUrl} = React.useContext(authDataContext);
    let navigate = useNavigate();

    const handleSignOut = async () => {
        try{
            await axios.get(serverUrl+"/api/auth/signout",{withCredentials : true});
            setUserData(null);
            navigate("/login")
        } catch(err){
            console.error("Error during logout:", err.message);
            alert("Logout failed");
        }
    }
  return (
    <div className="w-full h-[65px] bg-white flex justify-between items-center p-[10px]">
        <div>Welcome Back, {userData?.name} </div>
        <div>Hello</div>
        <div><button onClick={handleSignOut}>Sign Out</button></div>

    </div>
  )
}

export default Navbar

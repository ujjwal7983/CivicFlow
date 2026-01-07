import React from 'react'
import { LiaSignOutAltSolid } from "react-icons/lia";
import {userDataContext} from '../Context/UserContext'
import {authDataContext} from '../Context/AuthContext'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

function Navbar() {
    let {userData,setUserData,loading} = React.useContext(userDataContext);
    let {serverUrl} = React.useContext(authDataContext);
    let navigate = useNavigate();

    const handleSignOut = async () => {
        try{
            await axios.get(serverUrl+"/api/auth/signout",{withCredentials : true});
            setUserData(null);
            navigate("/")
        } catch(err){
            console.error("Error during logout:", err.message);
            alert("Logout failed");
        }
    }

    const citizen = async ()=>{
        navigate('/citizen');
    }

    if (loading) {
    return (
        <div className="h-[65px] flex items-center px-4">
            Loading...
        </div>
    );
    }
  return (
    <div className="w-full h-[65px] bg-white flex justify-around items-center p-[10px] fixed z-[100]">
        <div className="font-serif lg:text-[30px] font-semibold sm:text-[20px]">Civic Flow</div>
        <div className="font-serif lg:text-[20px] sm:text-[12px]">Welcome Back, <span className="font-bold">{userData?.name}</span> </div>
        {!userData ? (
  
        <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 font-medium inline-flex items-center gap-2
                     bg-emerald-600 text-white border border-emerald-600
                       rounded-lg transition-all duration-200 hover:bg-emerald-700 hover:shadow-md">
                    <span className="hidden sm:inline">Log In</span>
        </button>
        ) : (
        <div className="flex items-center gap-3">
            <button onClick={citizen} className="px-4 py-2 font-medium inline-flex 
                                    items-center gap-2 bg-slate-100 text-slate-800
                                    border border-slate-300 rounded-lg transition-all 
                                    duration-200 hover:bg-slate-200 hover:shadow-sm">
                <span className="hidden sm:inline">Dashboard</span>
            </button>

            <button onClick={handleSignOut} className="px-4 py-2 font-medium inline-flex 
                    items-center gap-2 bg-red-600 text-white border border-red-600
                    rounded-lg transition-all duration-200 hover:bg-red-700 hover:shadow-md">
                <span className="hidden sm:inline">Log Out</span>
                <LiaSignOutAltSolid className="text-lg" />
            </button>
        </div>
    )}
    </div>
  )
}

export default Navbar
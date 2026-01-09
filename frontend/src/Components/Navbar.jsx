import React from 'react'
import { LiaSignOutAltSolid } from "react-icons/lia";
import { MdDashboard } from "react-icons/md";
import logo from '../assets/logo.png'
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

    const goToDashboard = () => {
        if (!userData) return;

        switch (userData.role) {
            case "ADMIN":
                navigate("/admin");
                break;
            case "OFFICER":
                navigate("/officer");
                break;
            case "CITIZEN":
                navigate("/citizen");
                break;
            default:
                navigate("/");
        }
    };


    if (loading) {
    return (
        <div className="h-[65px] flex items-center px-4">
            Loading...
        </div>
    );
    }
  return (
    <div className="w-full h-[65px] bg-white flex justify-around items-center p-[10px] fixed z-[100]">
        <div onClick={()=>navigate("/")} className="cursor-pointer"><img src={logo} className="w-[40px] h-[40px] md:w-[70px] md:h-[70px]"/></div>
        {userData && <div className="font-serif md:text-[20px] sm:text-[12px]">Welcome Back, <span className="font-bold">{userData?.name}</span> </div>}
        {!userData ? (
  
        <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 font-medium inline-flex items-center gap-2
                     bg-emerald-600 text-white border border-emerald-600
                       rounded-lg transition-all duration-200 hover:bg-emerald-700 hover:shadow-md">
                    <span className="sm:inline">Log In</span>
        </button>
        ) : (
        <div className="flex items-center gap-3">
            <button onClick={goToDashboard} className="px-4 py-2 font-medium inline-flex 
                                    items-center gap-2 bg-slate-100 text-slate-800
                                    border border-slate-300 rounded-lg transition-all 
                                    duration-200 hover:bg-slate-200 hover:shadow-sm">
                <span className="hidden md:inline">Dashboard</span>
                <MdDashboard className="text-lg" />
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
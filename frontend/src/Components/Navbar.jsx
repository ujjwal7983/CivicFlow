import React from 'react'
import { LiaSignOutAltSolid } from "react-icons/lia";
import { MdDashboard } from "react-icons/md";
import { HiOutlineLogin, HiOutlineUserAdd } from "react-icons/hi";
import logo from '../assets/logo.png'
import { userDataContext } from '../Context/UserContext'
import { authDataContext } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Navbar() {
  let { userData, setUserData, loading } = React.useContext(userDataContext);
  let { serverUrl } = React.useContext(authDataContext);
  let navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/signout", { withCredentials: true });
      setUserData(null);
      window.location.href = "/";
    } catch (err) {
      console.error("Error during logout:", err.message);
    }
  }

  const goToDashboard = () => {
    if (!userData) return;
    const routes = { ADMIN: "/admin", OFFICER: "/officer", CITIZEN: "/citizen" };
    navigate(routes[userData.role] || "/");
  };

  if (loading) {
    return (
      <div className="h-[72px] flex items-center justify-center px-6 bg-white/70 backdrop-blur-md fixed w-full z-[100]">
        <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <header className="fixed top-0 w-full z-[100] px-4 py-3 md:px-10">
      <div className="max-w-7xl mx-auto h-[68px] bg-white/70 backdrop-blur-lg border border-white/20 
                      flex items-center justify-between px-5 md:px-8 rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]">
        
        {/* Logo Section */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative">
            <img
              src={logo}
              alt="logo"
              className="w-9 h-9 md:w-11 md:h-11 object-contain transition-transform duration-300 group-hover:rotate-12"
            />
            <div className="absolute inset-0 bg-emerald-400/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <span className="text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-br from-slate-900 to-slate-600 bg-clip-text text-transparent">
            CivicFlow
          </span>
        </div>

        {/* Center: Welcome Message (Desktop) */}
        {userData && (
          <div className="hidden lg:flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100/50 border border-slate-200/50">
            <span className="text-sm text-slate-500 font-medium">Account:</span>
            <span className="text-sm font-bold text-slate-800">{userData?.name}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
        )}

        {/* Right Section: Actions */}
        <div className="flex items-center gap-3">
          {!userData ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-slate-700 
                           hover:bg-slate-100 rounded-xl transition-all active:scale-95"
              >
                <HiOutlineLogin className="text-lg" />
                <span className="hidden sm:inline">Log In</span>
              </button>

              <button
                onClick={() => navigate("/register")}
                className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white
                           bg-slate-900 hover:bg-slate-800 rounded-xl shadow-md 
                           transition-all active:scale-95 active:shadow-inner"
              >
                <HiOutlineUserAdd className="text-lg" />
                <span>Join Now</span>
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2 md:gap-4">
              <button
                onClick={goToDashboard}
                className="p-2.5 md:px-5 md:py-2.5 flex items-center gap-2 bg-emerald-50 text-emerald-700 
                           hover:bg-emerald-100 rounded-xl font-bold text-sm transition-all active:scale-95"
              >
                <MdDashboard className="text-xl md:text-lg" />
                <span className="hidden md:inline">Dashboard</span>
              </button>

              <div className="h-8 w-[1px] bg-slate-200 mx-1 hidden sm:block"></div>

              <button
                onClick={handleSignOut}
                className="p-2.5 md:px-5 md:py-2.5 flex items-center gap-2 group text-slate-500 
                           hover:text-red-600 hover:bg-red-50 rounded-xl font-bold text-sm transition-all active:scale-95"
              >
                <LiaSignOutAltSolid className="text-xl md:text-lg transition-transform group-hover:translate-x-1" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
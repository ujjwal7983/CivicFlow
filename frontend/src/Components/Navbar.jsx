import React from 'react'
import { LiaSignOutAltSolid } from "react-icons/lia";
import { MdDashboard } from "react-icons/md";
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
      <div className="h-[72px] flex items-center px-6 bg-white/70 backdrop-blur-md fixed w-full z-[100]">
        Loading...
      </div>
    );
  }

  return (
    <header className="fixed top-0 w-full z-[100]">
      <div className="h-[72px] bg-white/80 backdrop-blur-xl border-b border-gray-200
              flex items-center justify-between px-6 md:px-12 shadow-sm">
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <img
            src={logo}
            alt="logo"
            className="w-10 h-10 md:w-14 md:h-14 transition-transform group-hover:scale-105"
          />
          <span className="text-[24px] font-medium">CivicFlow</span>
        </div>

        {userData && (
          <div className="hidden md:block text-gray-700 text-lg font-medium">
            Welcome back,
            <span className="ml-1 font-bold text-gray-900">
              {userData?.name}
            </span>
          </div>
        )}

        {!userData ? (
          <div className="flex items-center gap-4">
            <button
            onClick={() => navigate("/login")}
            className="px-5 py-2.5 inline-flex items-center gap-2 font-semibold
                       bg-gradient-to-r from-emerald-600 to-emerald-700
                       text-white rounded-xl shadow-md
                       hover:from-emerald-700 hover:to-emerald-800
                       hover:shadow-lg transition-all"> Log In
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-5 py-2.5 md:inline-flex items-center gap-2 font-semibold
                       bg-gradient-to-r from-blue-600 to-blue-700
                       text-white rounded-xl shadow-md hidden
                       hover:from-blue-700 hover:to-blue-800
                       hover:shadow-lg transition-all"> Register
          </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">

            {/* Dashboard */}
            <button
              onClick={goToDashboard}
              className="px-4 py-2.5 inline-flex items-center gap-2
                         bg-slate-100/80 backdrop-blur
                         text-slate-800 border border-slate-300
                         rounded-xl font-medium
                         hover:bg-slate-200 hover:shadow transition-all"
            >
              <MdDashboard className="text-lg" />
              <span className="hidden md:inline">Dashboard</span>
            </button>

            {/* Logout */}
            <button
              onClick={handleSignOut}
              className="px-4 py-2.5 inline-flex items-center gap-2
                         bg-gradient-to-r from-red-600 to-red-700
                         text-white rounded-xl font-medium shadow-md
                         hover:from-red-700 hover:to-red-800
                         hover:shadow-lg transition-all"
            >
              <LiaSignOutAltSolid className="text-lg" />
              <span className="hidden sm:inline">Log Out</span>
            </button>

          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar

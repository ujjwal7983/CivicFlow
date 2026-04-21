import React from 'react'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import { HiOutlineShieldExclamation, HiOutlineArrowLeft } from "react-icons/hi";

function Unauthorized() {
  let navigate = useNavigate();

  return (
    <div className="bg-[#f8fafc] w-full min-h-screen flex flex-col justify-center items-center px-6 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-red-50 rounded-full blur-[120px] opacity-60"></div>

      <div className="max-w-md w-full text-center z-10">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <img 
            src={logo} 
            className="h-16 w-16 cursor-pointer hover:scale-110 transition-transform" 
            onClick={() => navigate("/")} 
            alt="CivicFlow Logo"
          />
        </div>

        {/* Error Illustration / Icon */}
        <div className="bg-white p-10 rounded-[3rem] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.08)] border border-slate-100">
          <div className="bg-red-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <HiOutlineShieldExclamation className="text-red-600 text-4xl" />
          </div>

          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-3">
            403 – Access Denied
          </h1>
          
          <p className="text-slate-500 font-medium leading-relaxed mb-8">
            It looks like you don't have the necessary permissions to view this section. 
            Please contact an administrator if you think this is a mistake.
          </p>

          <button
            onClick={() => navigate("/")}
            className="w-full bg-slate-900 text-white h-14 rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-[0.98] shadow-lg shadow-slate-200 flex items-center justify-center gap-2"
          >
            <HiOutlineArrowLeft className="text-xl" />
            Back to Safety
          </button>
        </div>

        <button 
          onClick={() => navigate("/login")}
          className="mt-8 text-sm font-bold text-blue-600 hover:underline underline-offset-4"
        >
          Sign in with a different account
        </button>
      </div>
    </div>
  );
}

export default Unauthorized;
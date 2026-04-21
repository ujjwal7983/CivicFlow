import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userDataContext } from "../Context/UserContext";
import { authDataContext } from "../Context/AuthContext";
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser, HiEye, HiEyeOff } from "react-icons/hi";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const { setUserData } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");

    try {
      const res = await axios.post(
        serverUrl + "/api/auth/register",
        { name, email, password },
        { withCredentials: true }
      );

      setUserData(res.data.user);
      navigate("/citizen", { replace: true });

      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setErr(error.response?.data?.message || "Registration failed. Please try again.");
      console.error("Error during registration:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f8fafc] flex justify-center items-center w-full min-h-screen px-4 relative overflow-hidden">
      {/* Background Decorative Blurs */}
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-blue-100 rounded-full blur-[120px] opacity-60"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-indigo-100 rounded-full blur-[120px] opacity-60"></div>

      <div className="w-full max-w-[460px] z-10">
        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.08)] border border-slate-100">
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Create Account</h1>
            <p className="text-slate-500 font-medium mt-2">Join CivicFlow to start reporting issues</p>
          </div>

          {err && (
            <div className="mb-6 flex items-center gap-2 w-full text-red-600 bg-red-50 p-4 rounded-2xl text-sm font-semibold border border-red-100">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
              {err}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleRegister}>
            {/* Name Field */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Full Name</label>
              <div className="relative group">
                <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl group-focus-within:text-blue-600 transition-colors" />
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-slate-50 border border-slate-200 h-13 pl-12 pr-4 py-3 rounded-2xl outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-800"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Email Address</label>
              <div className="relative group">
                <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl group-focus-within:text-blue-600 transition-colors" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full bg-slate-50 border border-slate-200 h-13 pl-12 pr-4 py-3 rounded-2xl outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-800"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Password</label>
              <div className="relative group">
                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl group-focus-within:text-blue-600 transition-colors" />
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 h-13 pl-12 pr-12 py-3 rounded-2xl outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-800"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPass ? <HiEyeOff className="text-xl" /> : <HiEye className="text-xl" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white h-14 rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-[0.98] shadow-lg shadow-slate-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </>
              ) : (
                "Register"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500 font-medium">
              Already have an account?{" "}
              <button 
                onClick={() => navigate("/login")}
                className="text-blue-600 font-bold hover:underline underline-offset-4"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../Context/AuthContext";
import { userDataContext } from "../Context/UserContext";
import { HiOutlineMail, HiOutlineLockClosed, HiEye, HiEyeOff } from "react-icons/hi";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const { serverUrl } = useContext(authDataContext);
  const { setUserData, loading: userLoading } = useContext(userDataContext);

  const navigate = useNavigate();

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");

    try {
      const res = await axios.post(
        serverUrl + "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      const user = res.data.user;
      setUserData(user);
      setEmail("");
      setPassword("");
    } catch (error) {
      setErr(error.response?.data?.message || "Invalid credentials. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f8fafc] flex justify-center items-center w-full min-h-screen px-4 relative overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-100 rounded-full blur-[120px] opacity-60"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-emerald-100 rounded-full blur-[120px] opacity-60"></div>

      <div className="w-full max-w-[440px] z-10">
        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.08)] border border-slate-100">
          
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Welcome Back</h1>
            <p className="text-slate-500 font-medium mt-2">Log in to manage your grievances</p>
          </div>

          {err && (
            <div className="mb-6 flex items-center gap-2 w-full text-red-600 bg-red-50 p-4 rounded-2xl text-sm font-semibold border border-red-100 animate-shake">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
              {err}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSignin}>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Email Address</label>
              <div className="relative group">
                <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl group-focus-within:text-blue-600 transition-colors" />
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full bg-slate-50 border border-slate-200 h-13 pl-12 pr-4 py-3 rounded-2xl outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-800"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

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
              className="w-full bg-slate-900 text-white h-14 rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-[0.98] shadow-lg shadow-slate-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Authenticating...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500 font-medium">
              New to CivicFlow?{" "}
              <button 
                onClick={() => navigate("/register")}
                className="text-blue-600 font-bold hover:underline underline-offset-4"
              >
                Create an account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
import React from 'react'
import { authDataContext } from '../Context/AuthContext';
import { userDataContext } from '../Context/UserContext';
import {Navigate, useNavigate} from 'react-router-dom'
import axios from 'axios'

function Login() {
  let [showPass, setShowPass] = React.useState(false);
  let [email,setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");
  let {userData, setUserData} = React.useContext(userDataContext);
  let {serverUrl} = React.useContext(authDataContext);
  let [loading, setLoading] = React.useState(false);
  let [err, setErr] = React.useState(false);
  const navigate = useNavigate();


  const handleSignin = async (e) =>{
      e.preventDefault();
      setLoading(true);
      try{
        let res = await axios.post(serverUrl+"/api/auth/login",{
          email,
          password
        },{withCredentials:true});
        console.log(res);
        setUserData(res.data);
        navigate('/citizen');
        setEmail("");
        setPassword("");
        setLoading(false);
        setErr(false);
      } catch(err){
        setErr(err.response?.data?.message || err.message);
        setLoading(false);
        console.log("Error during signin:", err);
      }
    }

  return (
    <div className="bg-[#F3F2F0] flex justify-center items-center w-full min-h-screen px-4">
      
      <div className="w-full max-w-[400px] shadow-lg bg-white flex flex-col justify-center items-center gap-5 p-6 rounded-lg">
        
        <div className="text-3xl font-bold">Login</div>

        <form className="w-full" onSubmit={handleSignin}>
          <label className="text-lg font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            className="mb-4 border border-gray-400 w-full h-10 p-2 rounded-lg"
            value={email} onChange={(e)=>setEmail(e.target.value)}
          />
  
          <label className="text-lg font-medium">Password</label>

          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Enter password"
              className="border border-gray-400 w-full h-10 p-2 rounded-lg pr-12"
              value={password} onChange={(e)=>setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 font-semibold text-sm"
            >
              {showPass ? "Hide" : "Show"}
            </button>
          </div>

          <button disabled={loading} className="w-full font-semibold bg-blue-500 text-white h-10 mt-6 rounded-lg">
            {loading ? "Signing In..." : "Log in"}
          </button>

        </form>
        <div>Not having an account? <a href="/register" className="text-blue-600">Register</a></div>
      </div>
    </div>
  )
}

export default Login

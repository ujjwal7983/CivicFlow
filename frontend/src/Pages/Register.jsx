import React from 'react'
import {userDataContext} from '../Context/UserContext'
import {authDataContext} from '../Context/AuthContext'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

function Register() {
  let [name, setName] = React.useState("");
  let [email, setEmail] = React.useState("");
  let [selectedRole, setRole] = React.useState("");
  let [password, setPassword] = React.useState("");
  let [showPass, setShowPass] = React.useState(false);
  let [loading, setLoading] = React.useState(false);
  let [show, setShow] = React.useState(false);
  let {userData, setUserData} = React.useContext(userDataContext);
  let {serverUrl} = React.useContext(authDataContext);
  let [err,setErr] = React.useState("");
  let navigate = useNavigate();

  const handleRegister = async(e) => {
    e.preventDefault();
    setLoading(true);
    try{
      let res = await axios.post(serverUrl+"/api/auth/register",{
        name,
        email,
        password,
        role : selectedRole.toUpperCase()
      },{withCredentials : true});
      console.log(true);
      setUserData(res.data.user);
      navigate("/citizen")
      setName("");
      setEmail("");
      setPassword("");
      setRole("");
      setLoading(false);
    } catch (err) {
      setErr(err.response?.data?.message || err.message);
      setLoading(false);
      console.log("Error during signup:", err)
    }
  }

  return (
    <div className="bg-[#F3F2F0] flex justify-center items-center w-full min-h-screen px-4">

      <div className="w-full max-w-[400px] shadow-lg bg-white flex flex-col justify-center items-center gap-5 p-6 rounded-lg">

        <div className="text-3xl font-bold">Register</div>

        <form className="w-full" onSubmit={handleRegister}>
          <label className="text-lg font-medium">Name:</label>
          <input
            type="text"
            placeholder="your name"
            className="mb-4 border border-gray-400 w-full h-10 p-2 rounded-lg"
            value={name} onChange={(e) => setName(e.target.value)}
          />

          <label className="text-lg font-medium">Email:</label>
          <input
            type="email"
            placeholder="enter email"
            className="mb-4 border border-gray-400 w-full h-10 p-2 rounded-lg"
            value={email} onChange={(e)=>setEmail(e.target.value)}
          />

          <label className="text-lg font-medium mb-2 block">Role:</label>

          <div className="mb-4 flex flex-col gap-2">
            {["Citizen", "Admin", "Officer", "Head"].map((role) => (
              <label
                key={role}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="role"
                  value={role}
                  checked={selectedRole === role}
                  onChange={(e) => setRole(e.target.value)}
                  className="accent-blue-600"
                />
                <span className="text-gray-700">{role}</span>
              </label>
            ))}
          </div>


          <label className="text-lg font-medium">Password:</label>

          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Enter password"
              className="border border-gray-400 w-full h-10 p-2 rounded-lg pr-12"
              value={password} onChange={(e) => setPassword(e.target.value)}
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
            {loading ? "Loading..." : "Register"}
          </button>

        </form>
        <div>Already have an account? <a href="/login" className="text-blue-600">Login</a></div>
      </div>
    </div>
  )
}

export default Register
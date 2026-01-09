import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userDataContext } from "../Context/UserContext";
import { authDataContext } from "../Context/AuthContext";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const { userData, setUserData } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");

    try {
      const res = await axios.post(
        serverUrl + "/api/auth/register",
        {
          name,
          email,
          password,
        },
        { withCredentials: true }
      );

      setUserData(res.data.user);
      navigate("/citizen", { replace: true });

      // clear form
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setErr(error.response?.data?.message || error.message);
      console.error("Error during registration:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F3F2F0] flex justify-center items-center w-full min-h-screen px-4">
      <div className="w-full max-w-[400px] shadow-lg bg-white flex flex-col justify-center items-center gap-5 p-6 rounded-lg">
        <div className="text-3xl font-bold">Register</div>

        {err && (
          <div className="w-full text-red-600 bg-red-100 p-2 rounded-lg text-center">
            {err}
          </div>
        )}

        <form className="w-full" onSubmit={handleRegister}>
          <label className="text-lg font-medium">Name:</label>
          <input
            type="text"
            placeholder="Your name"
            className="mb-4 border border-gray-400 w-full h-10 p-2 rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className="text-lg font-medium">Email:</label>
          <input
            type="email"
            placeholder="Enter email"
            className="mb-4 border border-gray-400 w-full h-10 p-2 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="text-lg font-medium">Password:</label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Enter password"
              className="border border-gray-400 w-full h-10 p-2 rounded-lg pr-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 font-semibold text-sm"
            >
              {showPass ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full font-semibold bg-blue-500 text-white h-10 mt-6 rounded-lg hover:bg-blue-600 transition-all"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}

export default Register;

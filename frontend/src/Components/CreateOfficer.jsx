import { useContext, useState } from 'react'
import { userDataContext } from '../Context/UserContext'
import { authDataContext } from '../Context/AuthContext'
import axios from 'axios'

function CreateOfficer() {
    let { officer, setOfficer } = useContext(userDataContext);
    let { serverUrl } = useContext(authDataContext);
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [role, setRole] = useState("");
    let [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            let res = await axios.post(serverUrl+"/api/auth/create",{
                name,
                email,
                password,
                role,
            }, {withCredentials : true})
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setRole("");
            setOfficer(false);
        } catch (err) {
            console.log(err.response?.data);
            setLoading(false);
        }
    }

    return (
        <div className="w-full h-[100vh] fixed inset-0 z-[200] flex justify-center items-center">

            {/* Overlay */}
            <div className="bg-black opacity-[0.6] w-full h-full absolute inset-0"></div>

            {/* Modal */}
            <div className="bg-white h-[520px] w-[90%] max-w-[400px] z-[200] rounded-lg relative">

                {/* Close Button */}
                <button
                    className="absolute bg-red-500 top-[10px] right-[10px] p-[10px]
      text-white text-[14px] rounded-full font-bold h-[40px] w-[40px]
      border border-red-500 hover:text-red-500 hover:bg-white"
                    onClick={() => setOfficer(false)}
                >
                    X
                </button>

                {/* Form */}
                <form
                    className="p-6 flex flex-col gap-4 mt-[18px]" onSubmit={handleSubmit}
                >

                    {/* Name */}
                    <div className="flex flex-col gap-1 text-[18px]">
                        <label className="font-semibold text-gray-700">Name</label>
                        <input
                            type="text"
                            placeholder="Enter officer name"
                            value={name}
                            required
                            onChange={(e) => setName(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2
          focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1 text-[18px]">
                        <label className="font-semibold text-gray-700">Email</label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2
          focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-1 text-[18px]">
                        <label className="font-semibold text-gray-700">Password</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2
          focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                    </div>

                    {/* Role */}
                    <div className="flex flex-col gap-1 text-[18px]">
                        <label className="font-semibold text-gray-700">Role</label>
                        <select
                            value={role}
                            required
                            onChange={(e) => setRole(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 bg-white
          focus:outline-none focus:ring-2 focus:ring-red-400"
                        >
                            <option value="">Select Role</option>
                            <option value="OFFICER">Officer</option>
                            <option value="HEAD">Head</option>
                        </select>
                    </div>

                    {/* Submit */}
                    <button
                        className="w-full bg-blue-500 mt-[20px] h-[50px]
        text-white rounded-lg hover:bg-white hover:text-blue-500
        border border-blue-500 font-bold text-[20px]"
                        disabled={loading}
                    >
                        {loading ? "..." : "Create Officer"}
                    </button>

                </form>
            </div>
        </div>

    )
}

export default CreateOfficer

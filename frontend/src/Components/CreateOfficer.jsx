import { useContext, useState } from 'react'
import { userDataContext } from '../Context/UserContext'
import { authDataContext } from '../Context/AuthContext'
import { HiX } from "react-icons/hi";
import axios from 'axios'

function CreateOfficer(props) {
    let { setOfficer } = useContext(userDataContext);
    let { serverUrl } = useContext(authDataContext);
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [role, setRole] = useState("");
    let [loading, setLoading] = useState(false);
    let [err, setErr] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setErr("");
            await axios.post(serverUrl + "/api/auth/create", {
                name,
                email,
                password,
                role,
            }, { withCredentials: true })
            
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setRole("");
            props.onOfficerAdded();
            setOfficer(false);
        } catch (err) {
            setErr(err.response?.data?.message || err.message);
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-[200] flex justify-center items-center px-4 animate-in fade-in duration-300">
            {/* Backdrop */}
            <div 
                className="bg-slate-900/40 backdrop-blur-md absolute inset-0 w-full h-full"
                onClick={() => !loading && setOfficer(false)}
            ></div>

            {/* Modal Card */}
            <div className="bg-white w-full max-w-[440px] z-[210] rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] relative overflow-hidden">
                
                {/* Close Icon */}
                <button
                    className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all disabled:opacity-50"
                    onClick={() => setOfficer(false)} 
                    disabled={loading}
                >
                    <HiX className="text-2xl" />
                </button>

                <div className="p-8 md:p-10">
                    <div className="mb-6">
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Onboard Officer</h2>
                        <p className="text-slate-500 font-medium text-sm mt-1">Register new personnel to the system.</p>
                    </div>

                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        {/* Name */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                            <input
                                type="text"
                                placeholder="e.g. Rahul Sharma"
                                value={name}
                                required
                                disabled={loading}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-800"
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Work Email</label>
                            <input
                                type="email"
                                placeholder="officer@civicflow.com"
                                value={email}
                                required
                                disabled={loading}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-800"
                            />
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Temp Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                required
                                disabled={loading}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-800"
                            />
                        </div>

                        {/* Role */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Access Level</label>
                            <select
                                value={role}
                                required
                                disabled={loading}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-800 appearance-none cursor-pointer"
                            >
                                <option value="" disabled>Select Role</option>
                                <option value="OFFICER">Officer</option>
                                <option value="HEAD">Department Head</option>
                            </select>
                        </div>

                        {/* Error Message */}
                        {err && (
                            <div className="text-red-500 text-xs font-bold bg-red-50 p-3 rounded-xl border border-red-100 flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-red-500"></span>
                                {err}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            className="w-full bg-slate-900 text-white h-14 rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-[0.98] shadow-lg shadow-slate-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-2"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Creating...</span>
                                </>
                            ) : "Confirm Onboarding"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateOfficer;
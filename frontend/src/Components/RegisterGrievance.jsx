import { useContext, useState } from 'react'
import { userDataContext } from '../Context/UserContext'
import { authDataContext } from '../Context/AuthContext'
import { HiX } from "react-icons/hi"; // Added for a cleaner close icon
import axios from 'axios'

function RegisterGrievance(props) {
    let { setGrievance } = useContext(userDataContext);
    let { serverUrl } = useContext(authDataContext);
    let [title, setTitle] = useState("");
    let [description, setDescription] = useState("");
    let [department, setDepartment] = useState("");
    let [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.post(serverUrl + "/api/grievances/", {
                title,
                description,
                department
            }, { withCredentials: true });
            
            setLoading(false);
            props.onGrievanceAdded();
            setGrievance(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
            setGrievance(false);
        }
    }

    return (
        <div className="fixed inset-0 z-[200] flex justify-center items-center px-4 animate-in fade-in duration-300">
            {/* Backdrop with Blur */}
            <div 
                className='bg-slate-900/40 backdrop-blur-md absolute inset-0 w-full h-full'
                onClick={() => setGrievance(false)}
            ></div>
            
            {/* Modal Container */}
            <div className="bg-white w-full max-w-[480px] z-[210] rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] relative overflow-hidden">
                
                {/* Close Button */}
                <button 
                    className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
                    onClick={() => setGrievance(false)}
                >
                    <HiX className="text-2xl" />
                </button>

                <div className="p-8 md:p-10">
                    <div className="mb-8">
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">New Grievance</h2>
                        <p className="text-slate-500 font-medium text-sm mt-1">Please provide detailed information about the issue.</p>
                    </div>

                    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                        {/* Title Input */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="title" className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                                Complaint Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                placeholder="e.g. Street light not working"
                                value={title}
                                required
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-800"
                            />
                        </div>

                        {/* Department Select */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="department" className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                                Department
                            </label>
                            <select
                                id="department"
                                value={department}
                                required
                                onChange={(e) => setDepartment(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-800 appearance-none"
                            >
                                <option value="" disabled>Select Category</option>
                                <option value="Water">Water Supply</option>
                                <option value="Electricity">Electricity</option>
                                <option value="Roads">Roads & Infrastructure</option>
                                <option value="Sanitation">Sanitation</option>
                                <option value="Municipal">Municipal Corporation</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>

                        {/* Description Textarea */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="description" className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                                Detailed Description
                            </label>
                            <textarea
                                id="description"
                                placeholder="Provide specific landmarks or timing details..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-800 h-[140px] resize-none"
                            />
                        </div>

                        {/* Submit Button */}
                        <button 
                            className="w-full bg-slate-900 text-white h-14 rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-[0.98] shadow-lg shadow-slate-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-4" 
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Submitting...</span>
                                </>
                            ) : "Submit Grievance"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterGrievance
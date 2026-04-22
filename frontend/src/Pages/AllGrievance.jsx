import { useState, useContext, useEffect } from 'react'
import { MdOutlineInbox } from "react-icons/md";
import axios from 'axios'
import Navbar from '../Components/Navbar'
import { authDataContext } from '../Context/AuthContext'
import Grievance from '../Components/Grievance'
import { userDataContext } from '../Context/UserContext';
import AssignGrievance from '../Components/AssignGrievance';

function AllGrievance() {
    const [grievances, setGrievances] = useState([]);
    const { serverUrl } = useContext(authDataContext);
    const {
        assign,
        setAssign,
        selectedGrievanceId,
        setSelectedGrievanceId,
        refreshGrievance
    } = useContext(userDataContext);

    const getGrievances = async () => {
        try {
            const res = await axios.get(
                serverUrl + "/api/grievances/all",
                { withCredentials: true }
            );
            setGrievances(res.data.grievances);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getGrievances();
    }, [serverUrl, refreshGrievance]);

    return (
        <>
            {assign && (
                <AssignGrievance selectedGrievanceId={selectedGrievanceId} />
            )}

            <Navbar />

            <div className="bg-[#f8fafc] w-full min-h-screen pt-28 pb-12 px-4 sm:px-8">
                
                <div className="max-w-6xl mx-auto">
                    {/* Page Branding */}
                    <div className="mb-8 ml-2">
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Grievances</h1>
                        <p className="text-slate-500 font-medium mt-1">Global view of all registered complaints</p>
                    </div>

                    {/* Table Header Wrapper */}
                    <div className="
                        w-full h-14 px-8 mb-4
                        flex items-center
                        bg-slate-900 rounded-2xl
                        shadow-lg shadow-slate-200
                        text-[11px] uppercase tracking-[0.2em]
                        font-black text-slate-400
                    ">
                        <div className="flex-1 text-left">Grievance Title</div>
                        <div className="flex-1 text-center hidden md:inline-block">Department</div>
                        <div className="flex-1 text-right">Status</div>
                    </div>

                    {/* Content Area */}
                    <div className="space-y-3">
                        {grievances.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2rem] border border-dashed border-slate-200">
                                <div className="bg-slate-50 p-5 rounded-full mb-4">
                                    <MdOutlineInbox size={50} className="text-slate-300" />
                                </div>
                                <h2 className="text-lg font-bold text-slate-800">No data available</h2>
                                <p className="text-sm text-slate-400 font-medium mt-1">
                                    The global grievance list is currently empty.
                                </p>
                            </div>
                        ) : (
                            grievances.map((grievance) => (
                                <div key={grievance._id} className="transition-transform active:scale-[0.99] cursor-pointer">
                                    <Grievance
                                        title={grievance.title}
                                        department={grievance.department}
                                        status={grievance.status}
                                        onClick={() => {
                                            setSelectedGrievanceId(grievance._id);
                                            setAssign(true);
                                        }}
                                    />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AllGrievance;
import { useState, useContext, useEffect } from 'react'
import { MdOutlineInbox } from "react-icons/md";
import axios from 'axios'
import Navbar from '../Components/Navbar'
import { authDataContext } from '../Context/AuthContext'
import Grievance from '../Components/Grievance'
import { userDataContext } from '../Context/UserContext'
import GrievanceTracker from '../Components/GrievanceTracker';

function MyGrievance() {
    let [grievances, setGrievances] = useState([]);
    let { serverUrl } = useContext(authDataContext);
    let { seeGrievance, setSeeGrievance, setSelectedGrievanceId, selectedGrievanceId } = useContext(userDataContext);

    const getGrievances = async () => {
        try {
            let res = await axios.get(serverUrl + "/api/grievances/my", { withCredentials: true });
            setGrievances(res.data.grievances)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getGrievances();
    }, []);

    return (
        <>
            {seeGrievance && <GrievanceTracker selectedGrievanceId={selectedGrievanceId} />}
            <Navbar />
            <div className="bg-[#f8fafc] w-full min-h-screen pt-28 pb-12 px-4 sm:px-8">

                <div className="max-w-6xl mx-auto">
                    {/* Page Header */}
                    <div className="mb-8 ml-2">
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">My Grievances</h1>
                        <p className="text-slate-500 font-medium mt-1">Track and manage your submitted reports</p>
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
                        <div className="flex-1 text-left">Title</div>
                        <div className="flex-1 text-center hidden md:inline-block">Department</div>
                        <div className="flex-1 text-right">Status</div>
                    </div>

                    {/* Content List */}
                    <div className="space-y-3">
                        {grievances.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2rem] border border-dashed border-slate-200">
                                <div className="bg-slate-50 p-5 rounded-full mb-4">
                                    <MdOutlineInbox size={50} className="text-slate-300" />
                                </div>
                                <h2 className="text-lg font-bold text-slate-800">No grievances found</h2>
                                <p className="text-sm text-slate-400 font-medium mt-1">
                                    Your submission history is empty
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
                                            setSeeGrievance(true);
                                            setSelectedGrievanceId(grievance._id);
                                        }}
                                    />
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>
        </>
    )
}

export default MyGrievance
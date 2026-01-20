import { useState, useContext, useEffect } from 'react';
import { userDataContext } from '../Context/UserContext';
import { authDataContext } from '../Context/AuthContext';
import axios from 'axios';

function HandleGrievance() {
    const { setAssign, selectedGrievanceId, setRefreshGrievance } = useContext(userDataContext);
    const { serverUrl } = useContext(authDataContext);

    const [loading, setLoading] = useState(false);
    const [grievance, setGrievance] = useState(null);

    const getData = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                `${serverUrl}/api/grievances/${selectedGrievanceId}`,
                { withCredentials: true }
            );
            setGrievance(res.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleStart = async (e) => {
        e.preventDefault();
        setLoading(true);
        try{
            let res = await axios.patch(serverUrl+`/api/grievances/${selectedGrievanceId}/start`, {}, { withCredentials: true });
            setRefreshGrievance(p=>p+1);
        } catch (err) {
            console.log(err);
        } finally{
            setLoading(false);
            setAssign(false);
        }
    }

    const handleResolve = async(e) =>{
        e.preventDefault();
        setLoading(true);

        try {
            let res = await axios.patch(serverUrl+`/api/grievances/${selectedGrievanceId}/resolve`, {}, { withCredentials: true });
            setRefreshGrievance(p=>p+1);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
            setAssign(false);
        }
    }

    useEffect(() => {
        if (selectedGrievanceId) {
            getData();
        }
    }, [selectedGrievanceId]);

    return (
        <div className="fixed inset-0 flex justify-center items-center z-[201]">
            <div className="bg-black opacity-60 w-full h-full absolute"></div>

            <div className="bg-white rounded-lg w-[90%] max-w-[500px] h-[400px] z-[202] relative p-6 overflow-y-auto">
                <button
                    className="absolute bg-red-500 top-3 right-3 p-2 text-white rounded-full
          border border-red-500 hover:text-red-500 hover:bg-white h-[40px] w-[40px]"
                    onClick={() => setAssign(false)}
                    disabled={loading}>X</button>

                {loading ? (
                    <p className="text-center text-gray-500">Loading grievance...</p>
                ) : grievance ? (
                    <div className="flex flex-col justify-center gap-[5px]">
                        <div><h2 className="text-xl font-bold mt-4 mb-4">Grievance Details</h2></div>

                        <div className="space-y-2 text-sm">
                            <p><b>Title:</b> {grievance.title}</p>
                            <p><b>Department:</b> {grievance.department}</p>

                            <p>
                                <b>Status:</b>{" "}
                                <span className={`font-semibold ${grievance.status === "SUBMITTED" ? "text-yellow-600" :
                                        grievance.status === "ASSIGNED" ? "text-blue-600" :
                                            grievance.status === "ESCALATED" ? "text-red-600" :
                                                "text-green-600"
                                    }`}>
                                    {grievance.status}
                                </span>
                            </p>

                            {grievance.status === "ASSIGNED" && grievance.assignedTo && (
                                <p><b>Assigned To:</b> {grievance.assignedTo.name}</p>
                            )}

                            <p><b>Description:</b> {grievance.description}</p>
                            <p><b>Submitted By:</b> {grievance.createdBy?.name}</p>
                            <p><b>Submitted On:</b> {new Date(grievance.createdAt).toLocaleString()}</p>
                            {grievance.status === "IN_PROGRESS" && grievance.assignedTo && (
                                <p><b>Started On:</b>{new Date(grievance.startedAt).toLocaleString()}</p>
                            )}

                            {grievance.status === "ASSIGNED" && (<div><button className='w-full h-[40px] rounded-lg bg-blue-400 text-white border border-blue-400
                      hover:bg-white hover:text-blue-400 mt-[40px]' onClick={handleStart} disabled={loading}>Start</button></div>)}

                      {grievance.status === "IN_PROGRESS" && (<div><button className='w-full h-[40px] rounded-lg bg-blue-400 text-white border border-blue-400
                      hover:bg-white hover:text-blue-400 mt-[40px]' onClick={handleResolve} disabled={loading}>Resolve</button></div>)}
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-400">No grievance found</p>
                )}
            </div>
        </div>
    );
}

export default HandleGrievance;

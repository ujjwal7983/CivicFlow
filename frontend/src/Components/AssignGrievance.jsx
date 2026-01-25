import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { authDataContext } from '../Context/AuthContext';
import { userDataContext } from '../Context/UserContext';

function AssignGrievance() {
    const { serverUrl } = useContext(authDataContext);
    const { setAssign, selectedGrievanceId } = useContext(userDataContext);
    const {refreshGrievance, setRefreshGrievance} = useContext(userDataContext);
    const [grievance, setGrievance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [officers, setOfficers] = useState([]);
    const [selectedOfficer, setSelectedOfficer] = useState("");
    const [showOfficerList, setShowOfficerList] = useState(false);
    const [assigning, setAssigning] = useState(false);

    useEffect(() => {
        const fetchOfficers = async () => {
            try {
                const res = await axios.get(
                    `${serverUrl}/api/grievances/getData`,
                    { withCredentials: true }
                );
                setOfficers(res.data.officers.filter(o=>o.role==="OFFICER"));
            } catch (err) {
                console.error("Failed to load officers", err);
            }
        };

        fetchOfficers();
    }, []);


    useEffect(() => {
        if (!selectedGrievanceId) return;

        const fetchGrievance = async () => {
            try {
                const res = await axios.get(
                    `${serverUrl}/api/grievances/${selectedGrievanceId}`,
                    { withCredentials: true }
                );
                setGrievance(res.data);
            } catch (err) {
                console.error("Failed to fetch grievance:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchGrievance();
    }, [selectedGrievanceId, serverUrl]);

    const handleAssign = async () => {
        if (!selectedOfficer) {
            alert("Select an Officer!");
            return
        }

        try {
            setAssigning(true);

            let res = await axios.patch(`${serverUrl}/api/grievances/${grievance._id}/assign`,
                { officerId: selectedOfficer },
                { withCredentials: true }
            )

            setGrievance(res.data.grievance);
            setShowOfficerList(false);
            setRefreshGrievance(p=>p+1);
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Assignment failed");
        } finally {
            setAssigning(false);
        }
    }

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center">
      <div onClick={() => setAssign(false)} className="absolute inset-0 bg-black/60" />
      <div className="relative z-[201] bg-white rounded-2xl shadow-xl w-[90%] max-w-[500px] p-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading grievance...</p>
        ) : grievance ? (
          <>
            <h2 className="text-xl font-bold mb-4">Grievance Details</h2>
            <div className="space-y-2 text-sm">
              <p><b>Title:</b> {grievance.title}</p>
              <p><b>Department:</b> {grievance.department}</p>
              <p><b>Status:</b>{" "}
                <span className={`font-semibold ${
                  grievance.status === "SUBMITTED" ? "text-yellow-600" :
                  grievance.status === "ASSIGNED" ? "text-blue-600" :
                  grievance.status === "Escalated" ? "text-red-600" : "text-green-600"
                }`}>{grievance.status}</span>
              </p>
              {grievance.status === "ASSIGNED" && grievance.assignedTo && (
                <p><b>Assigned To:</b> {grievance.assignedTo.name}</p>
              )}
              <p><b>Description:</b> {grievance.description}</p>
              <p><b>Submitted By:</b> {grievance.createdBy?.name}</p>
              <p><b>Submitted On:</b> {new Date(grievance.createdAt).toLocaleString()}</p>
            </div>

            {showOfficerList && grievance.status === "SUBMITTED" && (
              <div className="mt-4">
                <select value={selectedOfficer} onChange={e => setSelectedOfficer(e.target.value)} className="w-full p-2 border rounded-lg">
                  <option value="">Select Officer</option>
                  {officers.map(o => (
                    <option key={o._id} value={o._id}>{o.name} ({o.email})</option>
                  ))}
                </select>
                <div className="mt-3 flex justify-end gap-2">
                  <button onClick={() => setShowOfficerList(false)} className="px-3 py-2 bg-gray-200 rounded-lg">Cancel</button>
                  <button onClick={handleAssign} disabled={assigning} className="px-3 py-2 bg-green-600 text-white rounded-lg">
                    {assigning ? "Assigning..." : "Confirm"}
                  </button>
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setAssign(false)} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
              {grievance.status === "SUBMITTED" && !showOfficerList && (
                <button onClick={() => setShowOfficerList(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                  Assign Officer
                </button>
              )}
            </div>
          </>
        ) : (
          <p className="text-center text-red-500">Grievance not found</p>
        )}
      </div>
    </div>

    )
}

export default AssignGrievance;

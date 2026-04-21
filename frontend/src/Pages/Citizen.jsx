import { useContext, useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { MdReportProblem, MdTrackChanges } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import RegisterGrievance from '../Components/RegisterGrievance';
import { userDataContext } from '../Context/UserContext'
import { authDataContext } from '../Context/AuthContext';
import axios from 'axios';

function Citizen() {
  const navigate = useNavigate();
  let { grievance, setGrievance, userData } = useContext(userDataContext)
  let { serverUrl } = useContext(authDataContext);
  let [grievanceData, setGrievanceData] = useState([]);
  let [totalCount, setTotalCount] = useState(0);
  let [assignedCount, setAssignedCount] = useState(0);
  let [progressCount, setProgressCount] = useState(0);
  let [resolvedCount, setResolvedCount] = useState(0);
  let [refresh, setRefresh] = useState(0);

  let getData = async () => {
    try {
      let res = await axios.get(serverUrl + "/api/grievances/my", { withCredentials: true });
      setGrievanceData(res.data.grievances);
      setTotalCount(res.data.count);
    } catch (err) {
      console.log("Error fetching grievance data:", err);
    }
  }

  const handleRefresh = () => {setRefresh((prev) => prev + 1);};

  useEffect(() => {
    getData();
  }, [refresh]);

  useEffect(() => {
    let assigned = 0;
    let progress = 0;
    let resolved = 0;

    grievanceData.forEach((g) => {
      if (g.status === "ASSIGNED") assigned++;
      else if (g.status === "IN_PROGRESS") progress++;
      else if (g.status === "RESOLVED") resolved++;
    });

    setAssignedCount(assigned);
    setProgressCount(progress);
    setResolvedCount(resolved);
  }, [grievanceData]);

  return (
    <>
      {grievance && <RegisterGrievance onGrievanceAdded={handleRefresh} />}
      <Navbar />

      <div className="bg-[#f8fafc] w-full min-h-screen pt-24 pb-12 px-4 sm:px-8 lg:px-16">
        
        {/* Header Section */}
        <div className="max-w-7xl mx-auto mb-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Citizen Dashboard</h1>
          <p className="text-slate-500 font-medium mt-1">Manage your reports and track community progress.</p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Action Cards (Left Side) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            
            {/* Raise Complaint */}
            <div 
              onClick={() => setGrievance(true)}
              className="group relative overflow-hidden bg-white rounded-[2.5rem] p-8 border border-slate-200 
                         shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(239,68,68,0.15)] 
                         transition-all duration-500 cursor-pointer active:scale-[0.98]"
            >
              <div className="relative z-10">
                <div className="bg-red-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 
                                group-hover:bg-red-600 transition-colors duration-300">
                  <MdReportProblem className="text-red-600 text-3xl group-hover:text-white transition-colors" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Raise a Complaint</h2>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  Report issues like road damage, water supply, or electricity failures to your local authority.
                </p>
              </div>
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                 <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                    <span className="text-red-600 font-bold">→</span>
                 </div>
              </div>
            </div>

            {/* Track My Complaints */}
            <div 
              onClick={() => navigate("/my")}
              className="group relative overflow-hidden bg-white rounded-[2.5rem] p-8 border border-slate-200 
                         shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(20,184,166,0.15)] 
                         transition-all duration-500 cursor-pointer active:scale-[0.98]"
            >
              <div className="relative z-10">
                <div className="bg-teal-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 
                                group-hover:bg-teal-600 transition-colors duration-300">
                  <MdTrackChanges className="text-teal-600 text-3xl group-hover:text-white transition-colors" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Track Progress</h2>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  Monitor the real-time status and resolution updates for all your submitted grievances.
                </p>
              </div>
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                 <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                    <span className="text-teal-600 font-bold">→</span>
                 </div>
              </div>
            </div>
          </div>

          {/* Stats Card (Right Side) */}
          <div className="lg:col-span-5 w-full">
            <div className="relative bg-slate-900 rounded-[3rem] p-8 overflow-hidden shadow-2xl shadow-slate-200">
              {/* Animated Background Decor */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-[80px]" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-[80px]" />

              <div className="relative">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold text-white tracking-tight">Personal Statistics</h2>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-400 border border-white/10">
                    Live Updates
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    ["Submitted", totalCount, "bg-blue-500/10", "text-blue-400"],
                    ["Assigned", assignedCount, "bg-red-500/10", "text-red-400"],
                    ["In Progress", progressCount, "bg-amber-500/10", "text-amber-400"],
                    ["Resolved", resolvedCount, "bg-emerald-500/10", "text-emerald-400"],
                  ].map(([label, value, bgColor, textColor]) => (
                    <div key={label} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-6">
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">{label}</p>
                      <p className={`text-4xl font-black ${textColor}`}>{value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/5">
                    <p className="text-slate-500 text-xs text-center italic">
                      Data reflects grievances submitted via this account.
                    </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Citizen;
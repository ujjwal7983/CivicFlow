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
  let { grievance, setGrievance, userData, setUserData } = useContext(userDataContext)
  let { serverUrl } = useContext(authDataContext);
  let [grievanceData, setGrievanceData] = useState([]);
  let [totalCount, setTotalCount] = useState(0);
  let [assignedCount, setAssignedCount] = useState(0);
  let [progressCount, setProgressCount] = useState(0);
  let [resolvedCount, setResolvedCount] = useState(0);

  let getData = async () => {
    try {
      let res = await axios.get(serverUrl + "/api/grievances/my", { withCredentials: true });
      setGrievanceData(res.data.grievances);
      setTotalCount(res.data.count);
    } catch (err) {
      console.log("Error fetching grievance data:", err);
    }
  }

  let sortData = () => {
    grievanceData.map((g) => {
      if (g.status === "ASSIGNED") setAssignedCount(assignedCount + 1);
      else if (g.status === "IN_PROGRESS") setProgressCount(progressCount + 1);
      else if (g.status === "RESOLVED") setResolvedCount(resolvedCount + 1);
    })
  }

  useEffect(() => {
    getData();
  }, []);

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
      {grievance && <RegisterGrievance />}
      <Navbar />

      <div className="bg-[#F3F2F0] w-full min-h-screen pt-[65px] px-4 sm:px-6 lg:px-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-8 place-items-center">

          {/* Raise Complaint */}
          <div
            onClick={() => setGrievance(true)}
            className="w-full max-w-[360px] h-[250px] cursor-pointer
              rounded-2xl border border-red-200
              bg-gradient-to-br from-red-50 via-white to-red-100
              flex flex-col items-center justify-center gap-3
              transition-all duration-300
              hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="bg-red-100 p-4 rounded-full">
              <MdReportProblem className="text-red-600 text-[55px]" />
            </div>

            <h2 className="text-2xl font-semibold text-red-800 text-center">
              Raise a Complaint
            </h2>

            <p className="text-sm text-gray-600 text-center px-6">
              Report civic issues like road damage, water supply, electricity, and more.
            </p>
          </div>

          {/* Track Complaints */}
          <div
            onClick={() => navigate("/my")}
            className="w-full max-w-[360px] h-[250px] cursor-pointer
              rounded-2xl border border-teal-200
              bg-gradient-to-br from-teal-50 via-white to-teal-100
              flex flex-col items-center justify-center gap-3
              transition-all duration-300
              hover:shadow-xl hover:-translate-y-1"
          >
            <div className="bg-teal-100 p-4 rounded-full">
              <MdTrackChanges className="text-teal-600 text-[55px]" />
            </div>

            <h2 className="text-2xl font-semibold text-teal-800 text-center">
              Track My Complaints
            </h2>

            <p className="text-sm text-gray-600 text-center px-6">
              View status, updates, and resolution progress of your submitted complaints.
            </p>
          </div>

          <div
            className="relative w-full max-w-[420px] min-h-[270px] rounded-[32px] border border-emerald-300
              bg-gradient-to-br from-[#eafff5] via-[#d9fff1] to-[#c6fff0] p-6 shadow-[0_20px_40px_rgba(16,185,129,0.25)]
              overflow-hidden">

            <div className="absolute -top-24 -left-24 w-72 h-72 bg-emerald-300/40 
            rounded-full blur-3xl" />

            <div className="absolute bottom-[-6rem] right-[-6rem] w-80 h-80 
          bg-teal-300/40 rounded-full blur-3xl" />

            <h2 className="relative text-xl font-bold text-emerald-900 text-center mb-6">
              My Grievances
            </h2>

            <div className="relative grid grid-cols-2 gap-5">
              {[
                ["Submitted", totalCount, "text-blue-600"],
                ["Assigned", assignedCount, "text-red-600"],
                ["In Progress", progressCount, "text-amber-500"],
                ["Resolved", resolvedCount, "text-teal-600"],
              ].map(([label, value, color]) => (
                <div
                  key={label}
                  className="bg-white rounded-2xl p-4 text-center
                    shadow-[0_10px_25px_rgba(0,0,0,0.12)]
                    hover:shadow-[0_20px_40px_rgba(0,0,0,0.18)]
                    transition"
                >
                  <p className="text-sm text-gray-500 mb-1">{label}</p>
                  <p className={`text-3xl font-extrabold ${color}`}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Citizen;

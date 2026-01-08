import {useContext} from 'react'
import Navbar from '../Components/Navbar'
import { MdReportProblem, MdTrackChanges } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import RegisterGrievance from '../Components/RegisterGrievance';
import {userDataContext} from '../Context/UserContext'

function Citizen() {
  const navigate = useNavigate();
  let {grievance, setGrievance, userData, setUserData} = useContext(userDataContext)

  return (
    <>
    {grievance && <RegisterGrievance/>}
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
            onClick={() => navigate("/citizen/my-complaints")}
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

          {/* Placeholder / Future Card */}
          <div
            className="w-full max-w-[360px] h-[250px] cursor-pointer
              rounded-2xl border border-green-300
              bg-gradient-to-br from-green-50 to-green-100
              flex items-center justify-center
              transition-all duration-300 hover:shadow-lg"
          >
            <span className="text-green-700 font-semibold">
              Coming Soon
            </span>
          </div>

        </div>
      </div>
    </>
  );
}

export default Citizen;

import React from 'react'
import Navbar from '../Components/Navbar'
import { useNavigate } from 'react-router-dom'
import { MdOutlineReportProblem,MdPendingActions } from 'react-icons/md'

function Officer(){
  let navigate = useNavigate();
  return(
    <>
      <Navbar/>
      <div className="bg-[#F3F2F0] w-full min-h-screen pt-[100px] px-6 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          <div className="w-full h-[250px] cursor-pointer rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 via-white to-red-50 
            flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:shadow-xl"
            onClick={()=>navigate("/officer/pending")}>
            <div className="bg-orange-100 p-4 rounded-full">
              <MdPendingActions className="text-orange-600 text-[55px]"/>
            </div>
            <h2 className="text-2xl font-semibold text-orange-800 text-center">
              Pending Grievances
            </h2>
            <p className="text-sm text-gray-700 text-center px-10">
              View all complaints waiting to be taken up for action.
            </p>
          </div>

          <div className="w-full h-[250px] cursor-pointer rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-indigo-50 
            flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:shadow-xl"
            onClick={()=>navigate("/officer/in-progress")}>
            <div className="bg-blue-100 p-4 rounded-full">
              <MdOutlineReportProblem className="text-blue-600 text-[55px]"/>
            </div>
            <h2 className="text-2xl font-semibold text-blue-800 text-center">
              Grievances In Progress
            </h2>
            <p className="text-sm text-gray-700 text-center px-10">
              Track and manage grievances currently under resolution.
            </p>
          </div>

        </div>
      </div>
    </>
  )
}

export default Officer

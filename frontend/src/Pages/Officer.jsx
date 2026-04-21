import React from 'react'
import Navbar from '../Components/Navbar'
import { useNavigate } from 'react-router-dom'
import { MdOutlineReportProblem, MdPendingActions } from 'react-icons/md'

function Officer() {
  let navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="bg-[#f8fafc] w-full min-h-screen pt-28 pb-12 px-6 lg:px-16">
        
        {/* Header Branding */}
        <div className="max-w-7xl mx-auto mb-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Officer Dashboard</h1>
          <p className="text-slate-500 font-medium mt-1">Review and manage assigned public grievances.</p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">

          {/* Pending Grievances Card */}
          <div 
            className="group relative w-full h-[280px] cursor-pointer rounded-[2.5rem] border border-slate-200 bg-white 
                       flex flex-col items-center justify-center gap-4 transition-all duration-500 
                       hover:shadow-[0_20px_50px_-15px_rgba(249,115,22,0.15)] hover:-translate-y-1 active:scale-[0.98]"
            onClick={() => navigate("/officer/pending")}
          >
            <div className="bg-orange-50 w-20 h-20 rounded-3xl flex items-center justify-center transition-colors duration-300 group-hover:bg-orange-600">
              <MdPendingActions className="text-orange-600 text-4xl transition-colors duration-300 group-hover:text-white" />
            </div>
            
            <div className="text-center px-6">
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                Pending Grievances
              </h2>
              <p className="text-sm font-medium text-slate-500 mt-2 leading-relaxed">
                View all complaints waiting to be taken up for action.
              </p>
            </div>

            {/* Subtle "Arrow" hint */}
            <div className="absolute top-6 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
               <span className="text-orange-600 font-bold">→</span>
            </div>
          </div>

          {/* In Progress Card */}
          <div 
            className="group relative w-full h-[280px] cursor-pointer rounded-[2.5rem] border border-slate-200 bg-white 
                       flex flex-col items-center justify-center gap-4 transition-all duration-500 
                       hover:shadow-[0_20px_50px_-15px_rgba(59,130,246,0.15)] hover:-translate-y-1 active:scale-[0.98]"
            onClick={() => navigate("/officer/in-progress")}
          >
            <div className="bg-blue-50 w-20 h-20 rounded-3xl flex items-center justify-center transition-colors duration-300 group-hover:bg-blue-600">
              <MdOutlineReportProblem className="text-blue-600 text-4xl transition-colors duration-300 group-hover:text-white" />
            </div>

            <div className="text-center px-6">
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                Grievances In Progress
              </h2>
              <p className="text-sm font-medium text-slate-500 mt-2 leading-relaxed">
                Track and manage grievances currently under resolution.
              </p>
            </div>

            <div className="absolute top-6 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
               <span className="text-blue-600 font-bold">→</span>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Officer
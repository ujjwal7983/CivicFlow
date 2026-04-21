import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import CreateOfficer from '../Components/CreateOfficer';
import DataPanel from '../Components/DataPanel';
import { MdPersonAdd, MdPerson, MdOutlineReportProblem } from 'react-icons/md';
import { userDataContext } from '../Context/UserContext';

function Admin() {
  const { officer, setOfficer } = useContext(userDataContext);
  let [refreshTrigger, setRefreshTrigger] = React.useState(0);
  const navigate = useNavigate();

  const triggerRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  }

  return (
    <>
      {officer && <CreateOfficer onOfficerAdded={triggerRefresh} />}
      <Navbar />

      <div className="bg-[#f8fafc] w-full min-h-screen pt-24 pb-12 px-4 sm:px-8 lg:px-16 flex flex-col gap-10">
        
        {/* Statistics Section */}
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-6 ml-2">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Administration</h1>
            <p className="text-slate-500 font-medium mt-1">Monitor system health and manage personnel.</p>
          </div>
          <DataPanel refreshTrigger={refreshTrigger} />
        </div>

        {/* Action Grid */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Add Officer Card */}
          <div
            onClick={() => setOfficer(true)}
            className="group relative w-full h-[280px] cursor-pointer rounded-[2.5rem] border border-slate-200 bg-white 
                       flex flex-col items-center justify-center gap-4 transition-all duration-500 
                       hover:shadow-[0_20px_50px_-15px_rgba(59,130,246,0.15)] hover:-translate-y-1 active:scale-[0.98]"
          >
            <div className="bg-blue-50 w-20 h-20 rounded-3xl flex items-center justify-center transition-colors duration-300 group-hover:bg-blue-600">
              <MdPersonAdd className="text-blue-600 text-4xl transition-colors duration-300 group-hover:text-white" />
            </div>
            <div className="text-center px-8">
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">Add Officer</h2>
              <p className="text-sm font-medium text-slate-500 mt-2 leading-relaxed">
                Onboard new personnel and assign departmental roles.
              </p>
            </div>
            <div className="absolute top-6 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
               <span className="text-blue-600 font-bold">+</span>
            </div>
          </div>

          {/* All Grievances Card */}
          <div
            onClick={() => navigate('/admin/allGrievances')}
            className="group relative w-full h-[280px] cursor-pointer rounded-[2.5rem] border border-slate-200 bg-white 
                       flex flex-col items-center justify-center gap-4 transition-all duration-500 
                       hover:shadow-[0_20px_50px_-15px_rgba(249,115,22,0.15)] hover:-translate-y-1 active:scale-[0.98]"
          >
            <div className="bg-orange-50 w-20 h-20 rounded-3xl flex items-center justify-center transition-colors duration-300 group-hover:bg-orange-600">
              <MdOutlineReportProblem className="text-orange-600 text-4xl transition-colors duration-300 group-hover:text-white" />
            </div>
            <div className="text-center px-8">
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">System Records</h2>
              <p className="text-sm font-medium text-slate-500 mt-2 leading-relaxed">
                Monitor and oversee all registered grievances system-wide.
              </p>
            </div>
            <div className="absolute top-6 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
               <span className="text-orange-600 font-bold">→</span>
            </div>
          </div>

          {/* Officers Profile Card */}
          <div
            onClick={() => navigate('/admin/officers')}
            className="group relative w-full h-[280px] cursor-pointer rounded-[2.5rem] border border-slate-200 bg-white 
                       flex flex-col items-center justify-center gap-4 transition-all duration-500 
                       hover:shadow-[0_20px_50px_-15px_rgba(16,185,129,0.15)] hover:-translate-y-1 active:scale-[0.98]"
          >
            <div className="bg-emerald-50 w-20 h-20 rounded-3xl flex items-center justify-center transition-colors duration-300 group-hover:bg-emerald-600">
              <MdPerson className="text-emerald-600 text-4xl transition-colors duration-300 group-hover:text-white" />
            </div>
            <div className="text-center px-8">
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">Officer Profiles</h2>
              <p className="text-sm font-medium text-slate-500 mt-2 leading-relaxed">
                Manage active officers and audit their resolution history.
              </p>
            </div>
            <div className="absolute top-6 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
               <span className="text-emerald-600 font-bold">→</span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Admin;
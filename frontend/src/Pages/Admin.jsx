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

      <div className="bg-[#F3F2F0] w-full min-h-screen pt-[65px] px-4 sm:px-6 lg:px-12 flex flex-col gap-8">
        {/* Data panel */}
        <DataPanel refreshTrigger={refreshTrigger} />

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
          {/* Add Officer Card */}
          <div
            onClick={() => setOfficer(true)}
            className="w-full max-w-[360px] h-[250px] cursor-pointer
            rounded-2xl border border-blue-200
            bg-gradient-to-br from-blue-50 via-white to-blue-100
            flex flex-col items-center justify-center gap-3
            transition-all duration-300
            hover:shadow-xl hover:-translate-y-1"
          >
            <div className="bg-blue-100 p-4 rounded-full">
              <MdPersonAdd className="text-blue-600 text-[55px]" />
            </div>
            <h2 className="text-2xl font-semibold text-blue-800 text-center">
              Add New Officer
            </h2>
            <p className="text-sm text-gray-600 text-center px-6">
              Create a new officer account, assign roles, and manage departmental access.
            </p>
          </div>

          {/* All Grievances Card */}
          <div
            onClick={() => navigate('/admin/allGrievances')}
            className="w-full max-w-[360px] h-[250px] cursor-pointer
            rounded-2xl border border-orange-200
            bg-gradient-to-br from-orange-50 via-white to-red-50
            flex flex-col items-center justify-center gap-3
            transition-all duration-300
            hover:shadow-xl hover:-translate-y-1"
          >
            <div className="bg-orange-100 p-4 rounded-full">
              <MdOutlineReportProblem className="text-orange-600 text-[55px]" />
            </div>
            <h2 className="text-2xl font-semibold text-orange-800 text-center">
              All Grievances
            </h2>
            <p className="text-sm text-gray-700 text-center px-6">
              View, monitor, and manage all registered complaints across departments.
            </p>
          </div>

          {/* Officers Profile Card */}
          <div
            onClick={() => navigate('/admin/officers')}
            className="w-full max-w-[360px] h-[250px] cursor-pointer
            rounded-2xl border border-emerald-200
            bg-gradient-to-br from-emerald-50 via-white to-green-50
            flex flex-col items-center justify-center gap-3
            transition-all duration-300
            hover:shadow-xl hover:-translate-y-1"
          >
            <div className="bg-emerald-100 p-4 rounded-full">
              <MdPerson className="text-emerald-600 text-[55px]" />
            </div>
            <h2 className="text-2xl font-semibold text-emerald-800 text-center">
              Officers Profile
            </h2>
            <p className="text-sm text-gray-700 text-center px-6">
              View all officers, manage roles, and track assigned complaints.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;

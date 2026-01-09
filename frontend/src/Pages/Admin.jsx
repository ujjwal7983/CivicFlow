import { useContext } from 'react'
import Navbar from '../Components/Navbar'
import CreateOfficer from '../Components/CreateOfficer';
import { MdPersonAdd } from "react-icons/md";
import { userDataContext } from "../Context/UserContext"

function Admin() {
  let {officer, setOfficer} = useContext(userDataContext);
  return (
    <>
      {officer && <CreateOfficer/>}
      <Navbar />
      <div className="bg-[#F3F2F0] w-full min-h-screen pt-[65px] px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-8 place-items-center">
          <div onClick={()=>setOfficer(true)}
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

        </div>
      </div>

    </>
  )
}

export default Admin

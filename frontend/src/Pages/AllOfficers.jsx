import { useContext, useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import axios from 'axios'
import { authDataContext } from '../Context/AuthContext'
import { MdOutlineInbox } from "react-icons/md"
import OfficerCard from '../Components/OfficerCard'

function AllOfficers() {
  const [officers, setOfficers] = useState([])
  const [grievances, setGrievances] = useState([])
  const { serverUrl } = useContext(authDataContext)

  const fetchData = async () => {
    try {
      const res = await axios.get(
        serverUrl + "/api/user/getOfficerData",
        { withCredentials: true }
      )
      setOfficers(res.data.officers)
      setGrievances(res.data.grievances)
    } catch (err) {
      console.log("Error fetching officer data:", err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <Navbar />

      <div className="bg-[#f8fafc] w-full min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-12">
        
        {/* Page Header */}
        <div className="max-w-7xl mx-auto mb-10 ml-2">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Officer Directory</h1>
          <p className="text-slate-500 font-medium mt-1">Manage personnel and monitor departmental caseloads.</p>
        </div>

        <div className="max-w-7xl mx-auto">
          {officers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] border border-dashed border-slate-200">
              <div className="bg-slate-50 p-6 rounded-full mb-4">
                <MdOutlineInbox size={60} className="text-slate-300" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">No Officers found</h2>
              <p className="text-sm text-slate-400 font-medium mt-1">No personnel data available to display</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-4">
              {officers.map(officer => {
                const count = grievances.filter(g =>
                  (typeof g.assignedTo === "string"
                    ? g.assignedTo
                    : g.assignedTo?._id) === officer._id
                ).length

                return (
                  <div key={officer._id} className="w-full flex justify-center">
                    <OfficerCard
                      name={officer.name}
                      email={officer.email}
                      role={officer.role}
                      count={count}
                    />
                  </div>
                )
              })}
            </div>
          )}
        </div>

      </div>
    </>
  )
}

export default AllOfficers
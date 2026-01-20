import { useContext, useState, useEffect } from 'react'
import { authDataContext } from '../Context/AuthContext'
import axios from 'axios'
import Grievance from '../Components/Grievance'
import Navbar from '../Components/Navbar'
import { MdOutlineInbox } from "react-icons/md";
import HandleGrievance from '../Components/HandleGrievance';
import { userDataContext } from '../Context/UserContext'

function PendingGrievance() {
  const { serverUrl } = useContext(authDataContext)
  const [grievances, setGrievances] = useState([]);
  const {selectedGrievanceId, setSelectedGrievanceId, refreshGrievance} = useContext(userDataContext);
  let   {assign, setAssign} = useContext(userDataContext);

  const getData = async () => {
    try {
      const res = await axios.get(
        serverUrl + "/api/grievances/assigned",
        { withCredentials: true }
      )
      setGrievances(res.data.grievances.filter(g => g.status === "ASSIGNED"))
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getData()
  }, [serverUrl, refreshGrievance])

  return (
    <>
      {
        assign && (
          <HandleGrievance selectedGrievanceId={selectedGrievanceId} />
        )
      }
      <Navbar />
      <div className="bg-[#F3F2F0] w-full min-h-screen p-4 pt-[100px]">

        <div className="
                w-full max-w-6xl mx-auto
                h-[70px]
                px-6 lg:px-10
                flex items-center
                bg-white rounded-2xl
                shadow-md border border-gray-200
                text-sm sm:text-base lg:text-lg
                font-semibold text-gray-500
              ">
          <div className="flex-1 text-left">Title</div>
          <div className="flex-1 text-center hidden md:inline-block">Department</div>
          <div className="flex-1 text-right">Status</div>
        </div>

        {grievances.length === 0 && (
          <div className="flex flex-col items-center justify-center h-[300px] text-gray-500">
            <MdOutlineInbox size={60} className="mb-4 text-gray-400" />
            <h2 className="text-lg font-semibold">No grievances found</h2>
            <p className="text-sm text-gray-400 mt-1">
              No Data to show
            </p>
          </div>
        )}

        {grievances.map((grievance) => (
          <Grievance title={grievance.title} department={grievance.department} status={grievance.status} key={grievance._id}
                onClick={()=>{
                  setSelectedGrievanceId(grievance._id);
                  setAssign(true); 
                }}/>
        ))}

      </div>
    </>
  )
}

export default PendingGrievance

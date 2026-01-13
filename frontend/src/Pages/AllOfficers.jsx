import { useContext, useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import axios from 'axios'
import { authDataContext } from '../Context/AuthContext'
import { MdOutlineInbox } from "react-icons/md"
import OfficerCard from '../Components/OfficerCard'

function AllOfficers() {
  const [officers,setOfficers]=useState([])
  const [grievances,setGrievances]=useState([])
  const {serverUrl}=useContext(authDataContext)

  const fetchData=async()=>{
    try{
      const res=await axios.get(
        serverUrl+"/api/user/getOfficerData",
        {withCredentials:true}
      )
      setOfficers(res.data.officers)
      setGrievances(res.data.grievances)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    fetchData()
  },[])

  return(
    <>
      <Navbar/>

      <div className="bg-[#F3F2F0] w-full min-h-[100vh] pt-[80px] px-4 sm:px-6 lg:px-12">

        {officers.length===0 && (
          <div className="flex flex-col items-center justify-center h-[300px] text-gray-500">
            <MdOutlineInbox size={60} className="mb-4 text-gray-400"/>
            <h2 className="text-lg font-semibold">No Officers found</h2>
            <p className="text-sm text-gray-400 mt-1">No Data to show</p>
          </div>
        )}

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 py-8 place-items-center">
            {officers.map(officer=>{
              const count=grievances.filter(g =>
                (typeof g.assignedTo==="string"
                  ? g.assignedTo
                  : g.assignedTo?._id) === officer._id
              ).length

              return(
                <OfficerCard
                  key={officer._id}
                  name={officer.name}
                  email={officer.email}
                  role={officer.role}
                  count={count}
                />
              )
            })}
          </div>
        </div>

      </div>
    </>
  )
}

export default AllOfficers

import { useEffect, useState, useContext } from 'react'
import { authDataContext } from '../Context/AuthContext'
import axios from 'axios'
import moment from 'moment'
import { userDataContext } from '../Context/UserContext'

function GrievanceTracker() {
  let { serverUrl } = useContext(authDataContext)
  let { seeGrievance, setSeeGrievance, selectedGrievanceId } = useContext(userDataContext)
  let [grievance, setGrievance] = useState(null)

  const getInfo = async () => {
    try {
      let res = await axios.get(`${serverUrl}/api/grievances/${selectedGrievanceId}`, { withCredentials: true })
      setGrievance(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (selectedGrievanceId) getInfo()
  }, [selectedGrievanceId])

  if (!seeGrievance || !grievance) return null

 
  const steps = [
    { label: "Submitted", date: grievance.createdAt, color: "bg-blue-500" },
    { label: "Assigned", date: grievance.assignedAt, color: "bg-purple-500" },
    { label: "In Progress", date: grievance.startedAt, color: "bg-amber-500" },
    { label: "Escalated", date: grievance.lastEscalatedAt, color: "bg-red-500" },
    { label: "Resolved", date: grievance.resolvedAt, color: "bg-green-500" },
  ].filter(step => step.date); // Only show steps that have a timestamp

  return (
    <div className="fixed inset-0 flex justify-center items-center z-[201] p-4">
      <div className="bg-black/60 w-full h-full absolute backdrop-blur-sm" onClick={() => setSeeGrievance(false)} />

      <div className="bg-white max-w-[600px] w-full max-h-[90vh] z-[202] rounded-3xl overflow-hidden shadow-2xl flex flex-col">

        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 leading-tight">{grievance.title}</h2>
              <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-600 uppercase tracking-wider">
                {grievance.department}
              </span>
            </div>
            <button onClick={() => setSeeGrievance(false)} className="text-gray-400 hover:text-gray-600 transition text-2xl">&times;</button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar space-y-8">
    
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Description</h4>
            <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
              {grievance.description}
            </p>
          </div>


          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Status History</h4>
            <div className="relative ml-4">
     
              <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-gray-100" />

              <div className="space-y-8">
                {steps.map((step, index) => (
                  <div key={index} className="relative flex items-start group">
                   
                    <div className={`absolute left-0 w-4 h-4 rounded-full border-4 border-white shadow-sm z-10 transition-transform group-hover:scale-125 ${step.color}`} />
                    
                    <div className="ml-8">
                      <p className="text-xs font-medium text-gray-400 mb-0.5">
                        {moment(step.date).calendar(null, {
                          sameDay: '[Today at] h:mm A',
                          lastDay: '[Yesterday at] h:mm A',
                          lastWeek: 'MMM D, h:mm A',
                          sameElse: 'MMM D, YYYY'
                        })}
                      </p>
                      <h5 className="text-sm font-bold text-gray-800 uppercase tracking-tight">
                        {step.label}
                      </h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 flex justify-end">
          <button
            onClick={() => setSeeGrievance(false)}
            className="px-6 py-2.5 rounded-xl bg-gray-900 text-white font-medium hover:bg-black transition shadow-lg active:scale-95"
          >
            Close Tracker
          </button>
        </div>
      </div>
    </div>
  )
}

export default GrievanceTracker
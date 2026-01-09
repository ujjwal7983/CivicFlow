import React from 'react'

function Grievance({ title, department, status }) {

  const statusStyle = {
        SUBMITTED:   "bg-blue-100 text-blue-600",        
        ASSIGNED:    "bg-yellow-100 text-yellow-700",    
        IN_PROGRESS: "bg-orange-100 text-orange-700",   
        RESOLVED:    "bg-green-100 text-green-700",      
        ESCALATED:   "bg-red-100 text-red-700",          
        CLOSED:      "bg-gray-200 text-gray-700",        
    }

  return (
    <div className="
      w-full max-w-6xl mx-auto
      mt-3
      min-h-[70px]
      px-6 lg:px-10
      flex items-center
      bg-white rounded-2xl
      shadow-sm border border-gray-200
      text-sm sm:text-base lg:text-lg
      font-medium text-gray-700
      transition-all duration-200
      hover:shadow-md hover:bg-gray-50 cursor-pointer
    ">
      <div className="flex-1 text-left truncate">
        {title}
      </div>

      <div className="flex-1 text-center text-gray-600 hidden md:inline-block">
        {department}
      </div>

      <div className="flex-1 text-right">
        <span className={`
          px-4 py-1 rounded-full text-sm font-semibold
          ${statusStyle[status] || "bg-gray-100 text-gray-600"}
        `}>
          {status}
        </span>
      </div>
    </div>
  )
}

export default Grievance

import React from 'react'
import dp from '../assets/dp.png'

function OfficerCard({ name, email, role, count }) {
  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 relative overflow-hidden">
      
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600" />

      <div className="flex items-center gap-5">
        <img
          src={dp}
          alt="Officer"
          className="w-20 h-20 rounded-full object-cover border-4 border-blue-500"
        />

        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800 leading-tight">
            {name}
          </h3>
          <p className="text-sm text-gray-500 truncate">{email}</p>

          <span className="inline-block mt-2 text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-700">
            {role}
          </span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between bg-[#F3F6FF] rounded-2xl px-5 py-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">
            Assigned Grievances
          </p>
          <p className="text-3xl font-bold text-indigo-600 leading-none mt-1">
            {count}
          </p>
        </div>

        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
          <span className="text-indigo-600 text-lg font-bold">#</span>
        </div>
      </div>

    </div>
  )
}

export default OfficerCard

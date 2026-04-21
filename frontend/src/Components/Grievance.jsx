import React from 'react'

function Grievance({ title, department, status, onClick }) {

  // Refined color palette for a premium look
  const statusStyle = {
    SUBMITTED:   "bg-blue-50 text-blue-600 border-blue-100",        
    ASSIGNED:    "bg-amber-50 text-amber-700 border-amber-100",    
    IN_PROGRESS: "bg-indigo-50 text-indigo-700 border-indigo-100",   
    RESOLVED:    "bg-emerald-50 text-emerald-700 border-emerald-100",      
    ESCALATED:   "bg-rose-50 text-rose-700 border-rose-100",          
    CLOSED:      "bg-slate-100 text-slate-600 border-slate-200",        
  }

  // Subtle left-border indicator colors
  const borderAccent = {
    SUBMITTED:   "border-l-blue-500",
    ASSIGNED:    "border-l-amber-500",
    IN_PROGRESS: "border-l-indigo-500",
    RESOLVED:    "border-l-emerald-500",
    ESCALATED:   "border-l-rose-500",
    CLOSED:      "border-l-slate-400",
  }

  return (
    <div 
      className={`
        w-full max-w-6xl mx-auto
        min-h-[80px] py-3
        px-6 lg:px-10
        flex items-center
        bg-white rounded-[1.25rem]
        border-l-[6px] ${borderAccent[status] || "border-l-slate-200"}
        border-t border-r border-b border-slate-100
        shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)]
        transition-all duration-300
        hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08)] 
        hover:bg-slate-50/50 cursor-pointer
        active:scale-[0.99]
      `} 
      onClick={onClick}
    >
      {/* Title Column */}
      <div className="flex-[1.5] text-left">
        <h3 className="font-bold text-slate-800 tracking-tight truncate pr-4">
          {title}
        </h3>
        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider md:hidden mt-1">
          {department}
        </p>
      </div>

      {/* Department Column (Desktop only) */}
      <div className="flex-1 text-center hidden md:block">
        <span className="text-slate-500 font-semibold text-sm">
          {department}
        </span>
      </div>

      {/* Status Column */}
      <div className="flex-1 flex justify-end">
        <span className={`
          px-4 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-widest
          border ${statusStyle[status] || "bg-slate-50 text-slate-500 border-slate-100"}
          shadow-sm transition-colors
        `}>
          {status?.replace("_", " ")}
        </span>
      </div>
    </div>
  )
}

export default Grievance
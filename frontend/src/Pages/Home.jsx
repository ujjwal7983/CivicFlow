import React from 'react'
import Navbar from '../Components/Navbar'
import { FaRegEdit, FaClipboardList, FaUserShield } from "react-icons/fa";
import Footer from '../Components/Footer';

function Home() {
  return (
    <div className="bg-[#F8F9FA] w-full min-h-screen font-sans selection:bg-blue-100">
      <Navbar/>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-32 pb-20">
        <span className="mb-6 px-5 py-1.5 text-xs font-bold tracking-widest uppercase rounded-full bg-blue-50 text-blue-600 border border-blue-100/50">
          Secure • Transparent • Efficient
        </span>

        <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-tight tracking-tight">
          Grievance Redressal <br/>
          <span className="text-blue-600">System</span>
        </h1>

        <p className="mt-8 max-w-2xl text-slate-500 text-lg md:text-xl font-medium leading-relaxed">
          A transparent and efficient platform to submit, track, and resolve
          grievances seamlessly.
        </p>

        <div className="mt-12 h-1.5 w-20 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]"></div>
      </section>

      {/* Features Section */}
      <section className="px-8 pb-32">
        <h2 className="text-3xl font-extrabold text-center text-slate-800 mb-16 tracking-tight">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Card 1 */}
          <div className="group bg-white rounded-[2rem] p-10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.04)] border border-slate-100
                          hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-300">
            <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-8
                            group-hover:bg-blue-600 group-hover:rotate-6 transition-all duration-300">
              <FaRegEdit className="text-blue-600 text-2xl group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Submit Grievance
            </h3>
            <p className="text-slate-500 leading-relaxed font-medium">
              Easily submit your grievance with complete details and
              supporting documents.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group bg-white rounded-[2rem] p-10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.04)] border border-slate-100
                          hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-300">
            <div className="bg-green-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-8
                            group-hover:bg-green-600 group-hover:-rotate-6 transition-all duration-300">
              <FaClipboardList className="text-green-600 text-2xl group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Track Progress
            </h3>
            <p className="text-slate-500 leading-relaxed font-medium">
              Track grievance status in real-time with full transparency.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group bg-white rounded-[2rem] p-10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.04)] border border-slate-100
                          hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-300">
            <div className="bg-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-8
                            group-hover:bg-purple-600 group-hover:rotate-6 transition-all duration-300">
              <FaUserShield className="text-purple-600 text-2xl group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Secure Resolution
            </h3>
            <p className="text-slate-500 leading-relaxed font-medium">
              Grievances are handled by authorized officers ensuring fairness
              and accountability.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home
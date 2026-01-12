import React from 'react'
import Navbar from '../Components/Navbar'
import { FaRegEdit, FaClipboardList, FaUserShield } from "react-icons/fa";

function Home() {
  return (
    <div className="bg-gradient-to-br from-[#F3F2F0] via-[#f7f6f4] to-[#ecebe8] w-full min-h-screen">
      <Navbar/>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        <span className="mb-4 px-4 py-1 text-sm rounded-full bg-blue-100 text-blue-700 font-medium">
          Secure • Transparent • Efficient
        </span>

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
          Grievance Redressal System
        </h1>

        <p className="mt-6 max-w-2xl text-gray-600 text-lg">
          A transparent and efficient platform to submit, track, and resolve
          grievances seamlessly.
        </p>

        <div className="mt-10 h-1 w-24 bg-blue-600 rounded-full"></div>
      </section>

      {/* Features Section */}
      <section className="px-8 pb-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-14">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          
          {/* Card 1 */}
          <div className="group bg-white rounded-3xl p-7 shadow-lg border border-gray-100
                          hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-5
                            group-hover:scale-110 transition">
              <FaRegEdit className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-3">
              Submit Grievance
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Easily submit your grievance with complete details and
              supporting documents.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group bg-white rounded-3xl p-7 shadow-lg border border-gray-100
                          hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-5
                            group-hover:scale-110 transition">
              <FaClipboardList className="text-green-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-3">
              Track Progress
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Track grievance status in real-time with full transparency.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group bg-white rounded-3xl p-7 shadow-lg border border-gray-100
                          hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-5
                            group-hover:scale-110 transition">
              <FaUserShield className="text-purple-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-3">
              Secure Resolution
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Grievances are handled by authorized officers ensuring fairness
              and accountability.
            </p>
          </div>

        </div>
      </section>
    </div>
  )
}

export default Home
